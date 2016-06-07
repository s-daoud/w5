class Goal < ActiveRecord::Base
  include Commentable

  validates :user_id, :title, presence: true

  belongs_to :user
  has_many :cheers


  # has_many :goal_comments
end
