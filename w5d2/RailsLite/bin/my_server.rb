require 'rack'
require_relative '../lib/controller_base.rb'
require_relative '../lib/router'
require_relative '../lib/flash.rb'
require_relative '../lib/show_exceptions.rb'
require_relative '../lib/static.rb'
require_relative '../../../../w3/w3d5/ActiveRecordLite/lib/01_sql_object.rb'

class User < SQLObject
  attr_reader :name

  def self.all
    @users ||= []
  end

  def initialize(params = {})
    params ||= {}
    @name = params["name"]
  end

  def errors
    @errors ||= []
  end

  def valid?
    unless @name.present?
      errors << "Name can't be blank"
      return false
    end
    true
  end

  def save
    return false unless valid?

    User.all << self
    true
  end

  def inspect
    { name: name }.inspect
  end
end

class UsersController < ControllerBase

  def create
    @user = User.new(params["user"])
    if @user.save
      redirect_to "/users"
    else
      # flash.now[:errors] = @user.errors
      render :new
    end
  end

  def index
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  # def show
  #   @user = User.find(params[:id])
  #   render :show
  # end
end

router = Router.new
router.draw do
  get Regexp.new("^/users$"), UsersController, :index
  get Regexp.new("^/users/new$"), UsersController, :new
  post Regexp.new("^/users$"), UsersController, :create
  # get Regexp.new("^/users/(?<id>\\d+)$"), UsersController, :show
end

app = Proc.new do |env|
  req = Rack::Request.new(env)
  res = Rack::Response.new
  router.run(req, res)
  res.finish
end

Rack::Server.start(
 app: app,
 Port: 3000
)
