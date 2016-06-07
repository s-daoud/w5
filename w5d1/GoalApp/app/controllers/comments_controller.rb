class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    if @comment.commentable_type == "User"
      c_type = user_url(User.find(@comment.commentable_id))
    else
      c_type = user_goal_url(Goal.find(@comment.commentable_id).user, Goal.find(@comment.commentable_id))
    end
    if @comment.save
      redirect_to c_type
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to c_type
    end
  end

  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type)
  end
end
