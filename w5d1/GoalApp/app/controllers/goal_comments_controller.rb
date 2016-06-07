# class GoalCommentsController < ApplicationController
#   def create
#     @goal_comment = GoalComment.new(goal_comment_params)
#     @goal_comment.author_id = current_user.id
#     if @goal_comment.save
#       redirect_to user_goal_url(@goal_comment.goal.user_id, @goal_comment.goal)
#     else
#       flash[:errors] = @goal_comment.errors.full_messages
#       redirect_to user_goal_url(@goal_comment.goal.user_id, @goal_comment.goal)
#     end
#   end
#
#   def goal_comment_params
#     params.require(:goal_comment).permit(:body, :goal_id)
#   end
# end
