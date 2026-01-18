import { useState, useEffect } from 'react';
import { useComments } from '../Hooks/useComments';
import PostItem from '../Components/PostItem';
import { apiService } from '../Services/apiService';

function PostsList({
  filteredPosts,
  userId,
  comments,
  user,
  isCurrentUser,
  handleEditPost,
  handleDeletePost,
  expandedPost,
  handleToggleExpand
}) {
  const [allUsers, setAllUsers] = useState([]);
  const [postOwner, setPostOwner] = useState(null);

  const {
    showComments,
    toggleComments,
    addComment,
    updateComment,
    deleteComment
  } = useComments(() => {}, user);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await apiService.getUsers();
      setAllUsers(users);
      const owner = users.find(u => u.id == userId);
      setPostOwner(owner);
    };
    fetchUsers();
  }, [userId]);

  if (!postOwner) return <div className="loading">Loading...</div>;

  return (
    <>
      {filteredPosts.length === 0 ? (
        <div className="empty-state">No posts found</div>
      ) : (
        filteredPosts.map(post => (
          <PostItem
            key={post.id}
            post={post}
            user={postOwner}
            comments={comments?.[post.id] || []}
            allUsers={allUsers}
            showComments={showComments?.[post.id]}
            currentUser={user}
            onToggleComments={toggleComments}
            onAddComment={addComment}
            onEditComment={updateComment}
            onDeleteComment={deleteComment}
            onEditPost={isCurrentUser ? handleEditPost : null}
            onDeletePost={isCurrentUser ? handleDeletePost : null}
            isCollapsed={expandedPost?.id !== post.id}
            onToggleExpand={handleToggleExpand}
            allowComments={true}
          />
        ))
      )}
    </>
  );
}

export default PostsList;
