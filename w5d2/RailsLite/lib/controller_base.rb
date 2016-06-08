require 'active_support'
require 'active_support/core_ext'
require 'active_support/inflector'
require 'erb'
require_relative './session'

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res, route_params = {})
    @req = req
    @res = res
    @params = route_params.merge(req.params)
    @already_built_response = false
    @@forgery_token = false
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    raise StandardError if already_built_response?
    res['location'] = url
    res.status = 302
    @already_built_response = true
    session.store_session(@res)
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    raise StandardError if already_built_response?
    res.write(content)
    res['Content-Type'] = content_type
    @already_built_response = true
    session.store_session(@res)
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    path = "views/#{(self.class).to_s.underscore}/#{template_name}.html.erb"
    contents = File.read(path)
    template = ERB.new(contents).result(binding)
    render_content(template, 'text/html')
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    form_authenticity_token if @@forgery_token
    if req.request_method != 'GET' && @@forgery_token
      check_authenticity_token
    end
    send(name)
    render(name) unless already_built_response?
  end

  def form_authenticity_token
    @token ||= SecureRandom::urlsafe_base64(16)
    res.set_cookie('authenticity_token', { path: '/', value: @token })
    @token
  end

  def check_authenticity_token
    auth_token = req.cookies["authenticity_token"]
    if auth_token.nil? || auth_token != params["authenticity_token"]
      raise "Invalid authenticity token"
    end
  end

  def self.protect_from_forgery
    @@forgery_token = true
  end
end
