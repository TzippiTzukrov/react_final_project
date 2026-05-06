import { useState } from "react";
import { getAvatarColor, getInitial } from "../Utils/avatarUtils";
import "../styles/CommentItem.css";

function CommentItem({
  comment,
  commentUser,
  isMyComment,
  onEdit,
  onDelete
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.body);

  const handleSaveEdit = async () => {
    await onEdit(comment.id, editText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(comment.body);
    setIsEditing(false);
  };

  return (
    <div className="comment">
      {commentUser && (
        <div
          className="comment-avatar"
          style={{ backgroundColor: getAvatarColor(commentUser.name) }}
          onClick={() => window.location.href = `/users/${commentUser.id}/info`}
        >
          {getInitial(commentUser.name)}
        </div>
      )}
      <div className="comment-info">
        <div className="comment-header">
          <div className="comment-author-info">
            {commentUser && (
              <strong
                className="comment-author"
                onClick={() => window.location.href = `/users/${commentUser.id}/info`}
              >
                {commentUser.name}
              </strong>
            )}
          </div>
          {isMyComment && (
            <div className="comment-actions">
              <button
                className="edit-comment-btn"
                onClick={() => setIsEditing(true)}
                title="Edit comment"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>
              <button
                className="delete-comment-btn"
                onClick={() => onDelete(comment.id)}
                title="Delete comment"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {comment.name && (
          <div className="comment-title">{comment.name}</div>
        )}

        {isEditing ? (
          <div className="edit-comment">
            <textarea
              className="edit-comment-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={2}
            />
            <div className="edit-comment-buttons">
              <button
                className="save-edit-btn"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="cancel-edit-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="comment-body">{comment.body}</p>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
