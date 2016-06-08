require 'json'

class Flash
  def initialize(req)
    cookie = req.cookies['_rails_lite_app_flash']
    @cookie_info = cookie.nil? ? {} : JSON.parse(cookie)
    
  end

  def [](key)
    @cookie_info[key]
  end

  def []=(key, val)
    @cookie_info[key] = val
  end

  def store_flash(res)
    res.set_cookie('_rails_lite_app_flash', { path: '/', value: @cookie_info.to_json })
  end

  def now
      self
  end

end
