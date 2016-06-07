require 'json'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    cookie = req.cookies['_rails_lite_app']
    @cookie_info = cookie.nil? ? {} : JSON.parse(cookie)
  end

  def [](key)
    @cookie_info[key]
  end

  def []=(key, val)
    @cookie_info[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    res.set_cookie('_rails_lite_app', { path: '/', value: @cookie_info.to_json })
  end
end
