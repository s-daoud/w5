class Static
  attr_reader :app

  def initialize(app)
    @app = app
  end

  def call(env)
    req = Rack::Request.new(env)
    res = Rack::Response.new
    path = req.path
    path = "." + path
    if File.file?(path)
      file = File.read(path)
      res['Content-type'] = File.extname(path) == '.txt' ? 'text/plain' : 'image/jpeg'
      res.write(file)
      res.finish
    else
      res.status = 404
      res.write("File doesn't exist")
      res.finish
      app.call(env)
    end
    res
  end
end
