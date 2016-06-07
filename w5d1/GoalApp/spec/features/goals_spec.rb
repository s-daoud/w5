require 'spec_helper'
require 'rails_helper'

feature "user can create goals" do

  it "has a new goal page" do
    visit(new_goal_url)
    expect(page).to have_content("Set goal")
  end

  feature "adding a goal" do

    it "shows goal" do
      visit(new_user_url)
      fill_in("Username", with: "John")
      fill_in("Password", with: "password")
      click_on("Sign Up")

      visit(new_goal_url)
      fill_in("Title", with: "Pass the test")
      click_on("Set goal")

      expect(current_path).to eq(goals_path)
      expect(page).to have_content("Pass the test")
    end
  end
end

feature "user can edit goals" do

  it "allows user to track goals" do
    user = User.create!(username: "John", password: "password")
    goal = Goal.create!(title: "Pass the test", user_id: 1)
    visit(edit_goal_url(goal))

    expect(page).to have_content("Edit goal")
    choose("Completed")
    click_on("Update Goal")

    expect(current_path).to eq(user_goal_path(user, goal))
    expect(page).to have_content("Completed")
  end

end

feature "user can delete goals" do

  it "allows user to delete goals" do
    user = User.create!(username: "John", password: "password")
    goal = Goal.create!(title: "Pass the test", user_id: 1)
    visit(user_goal_url(user, goal))
    click_on("Delete")

    expect(page).to_not have_content("Pass the test")
  end

end

feature "user can see goals" do

  it "displays goal title" do
    user = User.create!(username: "John", password: "password")
    goal = Goal.create!(title: "Pass the test", user_id: 1)
    visit(user_goal_url(user, goal))

    expect(page).to have_content(goal.title)
  end
end
