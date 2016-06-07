require 'rails_helper'
require 'spec_helper'

describe User do

  describe "validations" do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:session_token) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe "associations" do
    it { should have_many(:goals) }
  end

  describe ".find_by_credentials" do

    before :each do
      @user = User.create!(username: "John", password: "password")
    end

    it "finds user by credentials" do
      expect(User.find_by_credentials("John", "password")).to eq(@user)
    end

    it "doesn't find unsaved users" do
      expect(User.find_by_credentials("Jane", "helloo")).to eq(nil)
    end

  end
end
