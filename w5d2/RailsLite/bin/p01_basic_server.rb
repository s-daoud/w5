require 'rack'

app = Proc.new do |env|
  req = Rack::Request.new(env)
  res = Rack::Response.new
  res['Content-type'] = 'text/html'
  path = req.path
  res.write(path)
  res.finish
end

Rack::Server.start(
  app: app,
  Port: 3000
)
