require 'rails_helper'

RSpec.describe UsersController, :type => :controller do

  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    it "redirects with valid params" do
      post :create, user: {username: "John", password: "password"}
      expect(response).to redirect_to(goals_url)
    end

    it "renders new with invalid params" do
      post :create, user: {username: "Jane", password: "hello"}
      expect(response).to render_template("new")
    end

  end

end
