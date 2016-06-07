require 'bcrypt'

class User < ActiveRecord::Base
  include Commentable

  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  has_many :goals
  has_many :cheers

  has_many :authored_comments,
  class_name: :Comment,
  primary_key: :id,
  foreign_key: :author_id

  # has_many :user_comments,
  #   primary_key: :id,
  #   foreign_key: :author_id,
  #   class_name: "UserComment"
  #
  # has_many :goal_comments,
  #   primary_key: :id,
  #   foreign_key: :author_id,
  #   class_name: "GoalComment"
  #
  # has_many :received_comments,
  #   primary_key: :id,
  #   foreign_key: :user_id,
  #   class_name: "UserComment"

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil if user.nil?
    if BCrypt::Password.new(user.password_digest).is_password?(password)
      return user
    else
      return nil
    end
  end

  def reset_session_token
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

  def public_goals
    self.goals.where(public: true)
  end

end
