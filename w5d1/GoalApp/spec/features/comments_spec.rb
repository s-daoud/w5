require 'spec_helper'
require 'rails_helper'

feature "comments" do

  feature "user comments" do

    it "posts a comment to user page" do
      visit(new_user_url)
      fill_in("Username", with: "John")
      fill_in("Password", with: "password")
      click_on("Sign Up")

      visit(user_url(User.find_by_username("John")))
      fill_in('Body', with: "wow")
      click_on("Add Comment")

      expect(page).to have_content("wow")
    end

  end

  feature "goal comments" do

    it "posts a comment to goal page" do
      visit(new_user_url)
      fill_in("Username", with: "John")
      fill_in("Password", with: "password")
      click_on("Sign Up")

      goal = Goal.create!(title: "Pass the test", user_id: 1)
      visit(user_goal_url(User.find_by_username("John"), goal))

      fill_in('Body', with: "wow")
      click_on("Add Comment")

      expect(page).to have_content("wow")
    end

  end
end
