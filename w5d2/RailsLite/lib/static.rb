class Static
  attr_reader :app

  def initialize(app)
    @app = app
  end

  def call(env)
    req = Rack::Request.new(env)
    res = Rack::Response.new
    path = req.path

    if path
      # res['Content-type'] =
      # app.call(env)
      res.write(File.read(path))
      res.finish
    end

  end
end
