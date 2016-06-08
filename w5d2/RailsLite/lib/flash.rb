require 'json'

class Flash
  def initialize(req)
    cookie = req.cookies['_rails_lite_app_flash']
    @flash_now = cookie.nil? ? {} : JSON.parse(cookie)
    @flash = {}
  end

  def [](key)
    @flash_now[key] || @flash[key]
  end

  def []=(key, val)
    @flash[key] = val
  end

  def store_flash(res)
    res.set_cookie('_rails_lite_app_flash', { path: '/', value: @flash.to_json })
  end

  def now
    @flash_now
  end

end
