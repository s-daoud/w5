class CheersController < ApplicationController

  before_action :user_cheer_count, only: :create

  def index
    @goals = Goal.all
  end

  def create
    @cheer = Cheer.new(cheer_params)
    @cheer.user_id = current_user.id
    if @cheer.save
      redirect_to :back
    else
      flash[:errors] = @cheer.errors.full_messages
      redirect_to :back
    end
  end

  def cheer_params
    params.require(:cheer).permit(:goal_id)
  end

  def user_cheer_count
    if current_user.cheers.length > 4
      flash[:errors] = ["Too many cheers used"]
      redirect_to :back
    end
  end
end
