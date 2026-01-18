import { useState } from "react";
import "../styles/CommentForm.css";

function CommentForm({ onSubmit, disabled = false }) {
  const [commentText, setCommentText] = useState("");
  const [commentTitle, setCommentTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    await onSubmit(commentText, commentTitle);
    
    setCommentText("");
    setCommentTitle("");
  };

  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <div className="comment-form">
        <input
          type="text"
          className="comment-title-input"
          placeholder="Comment title (optional)"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
        />
        <textarea
          className="comment-input"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
        />
      </div>
      <button 
        type="submit"
        className="comment-submit-btn"
        disabled={disabled || !commentText.trim()}
      >
        Post Comment
      </button>
    </form>
  );
}

export default CommentForm;
