import { useUser } from "../Context/UserContext";
import { usePostsData } from "../Hooks/usePostsData";
import { useComments } from "../Hooks/useComments";
import PostItem from "./PostItem";
import "../styles/PostFeed.css";

function PostsFeed({ 
  emptyMessage = "No posts available",
  loadingMessage = "Loading posts..."
}) {
  const { user: currentUser } = useUser();
  
  const {
    posts,
    users,
    comments,
    setComments,
    loading,
    hasMorePosts,
    loadMorePosts,
    getCommentsForPost
  } = usePostsData(currentUser);

  const {
    showComments,
    toggleComments,
    addComment,
    updateComment,
    deleteComment
  } = useComments(setComments, currentUser);

  const handleToggleComments = async (postId) => {
    if (!showComments[postId] && !comments[postId]) {
      await getCommentsForPost(postId);
    }
    
    toggleComments(postId);
  };



  if (loading && posts.length === 0) {
    return (
      <div className="posts-feed">
        <div className="posts-loading">{loadingMessage}</div>
      </div>
    );
  }

  return (
    <div className="posts-feed">
      {posts.length > 0 && (
        <div className="posts-feed-header">
          <p className="posts-count">
            {posts.length} Posts
          </p>
        </div>
      )}

      <div className="posts-list">
        {posts.map((post) => {
          const postAuthor = users[post.userId] || { id: post.userId, name: 'Loading...', email: '' };
          const postComments = comments[post.id] || [];
          
          return (
            <PostItem
              key={post.id}
              post={post}
              user={postAuthor}
              comments={postComments}
              allUsers={Object.values(users)}
              showComments={showComments[post.id]}
              currentUser={currentUser}
              onToggleComments={handleToggleComments}
              onAddComment={addComment}
              onEditComment={updateComment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
      
      {hasMorePosts && posts.length > 0 && (
        <div className="load-more-container">
          <button 
            className="load-more-btn" 
            onClick={() => loadMorePosts()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Posts"}
          </button>
        </div>
      )}
      
      {!hasMorePosts && posts.length > 0 && (
        <div className="no-more-posts">
          <p>You've seen all posts!</p>
        </div>
      )}
      
      {posts.length === 0 && !loading && (
        <div className="no-posts">
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

export default PostsFeed;
