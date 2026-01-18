import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useToast } from "../Context/ToastContext";
import "../styles/CommentsList.css";

function CommentsList({ 
  postId, 
  comments = [], 
  users = [], 
  currentUserEmail, 
  onAddComment, 
  onEditComment, 
  onDeleteComment,
  allowAddComment = true 
}) {
  const { showToast } = useToast();
  
  const getCommentUserByEmail = (email) => {
    if (!email || users.length === 0) return null;
    
    const user = users.find(u => 
      u.email && u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );
    
    return user || null;
  };

  const isMyComment = (comment) => {
    return currentUserEmail && comment.email === currentUserEmail;
  };

  const handleAddComment = (commentText, commentTitle) => 
    onAddComment(postId, commentText, commentTitle);

  const handleEditComment = (commentId, newBody) => 
    onEditComment(commentId, postId, newBody);

  const handleDeleteComment = (commentId) => 
    onDeleteComment(commentId, postId);

  return (
    <div className="comments-section">
      <div className="comments-list">
        {comments.map((comment) => {
          const commentUser = getCommentUserByEmail(comment.email);
          
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              commentUser={commentUser}
              isMyComment={isMyComment(comment)}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          );
        })}
      </div>
      
      {allowAddComment && (
        <CommentForm 
          onSubmit={handleAddComment}
          disabled={!currentUserEmail}
        />
      )}
    </div>
  );
}

export default CommentsList;
