import { getAvatarColor, getInitial } from "../Utils/avatarUtils";
import CommentsList from "./CommentsList";
import "../styles/PostItem.css";

function PostItem({
  post,
  user,
  comments = [],
  allUsers = [],
  showComments,
  currentUser,
  onToggleComments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onEditPost,
  onDeletePost,
  isCollapsed = false,
  onToggleExpand,
}) {
  const isMyPost = currentUser && post.userId == currentUser.id;

  const ActionButtons = ({ isMyPost, onEditPost, onDeletePost, post, onToggleExpand, stopPropagation = false }) => (
    <>
      {isMyPost && onEditPost && (
        <button
          className="collapsed-action-btn"
          onClick={(e) => {
            if (stopPropagation) e.stopPropagation();
            onEditPost(post);
          }}
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
      )}
      {isMyPost && onDeletePost && (
        <button
          className="collapsed-action-btn"
          onClick={(e) => {
            if (stopPropagation) e.stopPropagation();
            onDeletePost(post.id);
          }}
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      )}
      {onToggleExpand && (
        <button
          className="collapsed-action-btn"
          onClick={(e) => {
            if (stopPropagation) e.stopPropagation();
            onToggleExpand(post ? post : null);
          }}
          title={post ? "Expand" : "Collapse"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={post ? "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" : "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"} />
          </svg>
        </button>
      )}
    </>
  );

  const CommentIcon = ({ isActive }) => (
    <span 
      className={`comment-icon ${isActive ? 'active' : ''}`}
    />
  );

  if (isCollapsed) {
    return (
      <div className="post-card collapsed">
        <div className="post-overview" onClick={() => onToggleExpand && onToggleExpand(post)}>
          <span className="post-id">#{post.id}</span>
          <h4 className="post-title">{post.title}</h4>
          <div className="collapsed-actions">
            <ActionButtons 
              isMyPost={isMyPost}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
              post={post}
              onToggleExpand={onToggleExpand}
              stopPropagation={true}
            />
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="post-card">
      <div className="post-card-header">
        {!isMyPost && (
          <div className="post-header">
            <div
              className="post-avatar"
              style={{ backgroundColor: getAvatarColor(user.name), cursor: 'pointer' }}
              onClick={() => window.location.href = `/users/${user.id}/info`}
            >
              {getInitial(user.name)}
            </div>
            <div className="post-user-info" onClick={() => window.location.href = `/users/${user.id}/info`} style={{ cursor: 'pointer' }}>
              <h4 className="post-user-name">{user.name || 'Unknown User'}</h4>
              <p className="post-user-company">{user.company?.name || ''}</p>
            </div>
          </div>
        )}
        <div className="collapsed-actions">
          <ActionButtons 
            isMyPost={isMyPost}
            onEditPost={onEditPost}
            onDeletePost={onDeletePost}
            post={null}
            onToggleExpand={onToggleExpand}
          />
        </div>
      </div>

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.body}</p>
      </div>

      <div className="post-actions">
        <button
          className={`post-action-btn comment-btn ${showComments ? 'active' : ''}`}
          onClick={() => onToggleComments(post.id)}
        >
          <CommentIcon isActive={showComments} />
          Comments{comments.length > 0 || showComments ? ` (${comments.length})` : ''}
        </button>
      </div>

      {showComments && (
        <CommentsList
          postId={post.id}
          comments={comments}
          users={allUsers}
          currentUserEmail={currentUser?.email}
          onAddComment={onAddComment}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
          allowAddComment={!isMyPost}
        />
      )}
    </div>
  );
}

export default PostItem;
