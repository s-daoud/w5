# class GoalComment < ActiveRecord::Base
#   validates :author_id, :goal_id, :body, presence: true
#
#   belongs_to :author,
#     primary_key: :id,
#     foreign_key: :author_id,
#     class_name: "User"
#
#   belongs_to :goal
# end
