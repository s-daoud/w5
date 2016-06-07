require 'spec_helper'
require 'rails_helper'

feature "the signup process" do

  it "has a new user page" do
    visit(new_user_url)
    expect(page).to have_content("Sign Up")
  end

  feature "signing up a user" do

    it "shows username on the homepage after signup" do
      visit(new_user_url)
      fill_in("Username", with: "John")
      fill_in("Password", with: "password")
      click_on("Sign Up")

      expect(current_path).to eq(goals_path)
      expect(page).to have_content("John")
    end

  end

end

feature "logging in" do

  it "shows username on the homepage after login" do
    visit(new_user_url)
    fill_in("Username", with: "John")
    fill_in("Password", with: "password")
    click_on("Sign Up")

    click_on("Sign Out")

    visit(new_session_url)
    fill_in("Username", with: "John")
    fill_in("Password", with: "password")
    click_on("Sign In")

    expect(current_path).to eq(goals_path)
    expect(page).to have_content("John")
  end

end

feature "logging out" do

  it "doesn't show username on the homepage after logout" do
    visit(new_user_url)
    fill_in("Username", with: "John")
    fill_in("Password", with: "password")
    click_on("Sign Up")

    click_on("Sign Out")
    
    expect(page).to_not have_content("John")
  end

end
