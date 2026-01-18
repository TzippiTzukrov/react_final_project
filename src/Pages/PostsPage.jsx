import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { useToast } from '../Context/ToastContext';
import { postService } from '../Services/postService';
import { getUserById } from '../Services/userService';
import { apiService } from '../Services/apiService';
import { useSearch } from '../Hooks/useSearch';
import PostsList from '../Components/PostsList';
import Header from '../Common/Header';
import GenericFormModal from '../Components/GenericFormModal';
import '../styles/GenericFormModal.css';
import '../styles/PostsPage.css';

function PostsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { showToast } = useToast();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const { filteredItems: filteredPosts, handleSearch } = useSearch(posts, ['title', 'id']);
  const [expandedPost, setExpandedPost] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const isCurrentUser = user && user.id == userId;

  useEffect(() => {
    if (userId) {
      loadUserAndPosts();
    }
  }, [userId]);

  const loadUserAndPosts = async () => {
    setLoading(true);
    try {
      const userData = await getUserById(userId);
      if (!userData) {
        navigate("/404");
        return;
      }
      const postsData = await postService.getPostsByUserId(userId);
      setPosts(postsData);
      
      const allComments = {};
      for (const post of postsData) {
        const postComments = await apiService.get(`/comments?postId=${post.id}`);
        allComments[post.id] = postComments;
      }
      setComments(allComments);
    } catch (error) {
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleExpand = (post) => {
    setExpandedPost(expandedPost?.id === post?.id ? null : post);
  };

  const handleEditPost = (post) => {
    setEditingPost({ ...post });
    setShowEditForm(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingPost.title.trim() || !editingPost.body.trim()) return;

    const updatedPost = await postService.updatePost(editingPost.id, {
      title: editingPost.title,
      body: editingPost.body
    });
    setPosts(prev => prev.map(p => 
      p.id === editingPost.id ? updatedPost : p
    ));
    if (expandedPost?.id === editingPost.id) {
      setExpandedPost(updatedPost);
    }
    setShowEditForm(false);
    setEditingPost(null);
    showToast("Post updated successfully", "success");
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    setPostToDelete(postId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    await postService.deletePost(postToDelete);
    setPosts(prev => prev.filter(post => post.id !== postToDelete));
    if (expandedPost?.id === postToDelete) {
      setExpandedPost(null);
    }
    setShowDeleteConfirm(false);
    setPostToDelete(null);
    showToast("Post deleted successfully", "success");
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;

    const postData = {
      ...newPost,
      userId: user.id
    };
    const createdPost = await postService.createPost(postData);
    setPosts(prev => [...prev, createdPost]);
    setNewPost({ title: '', body: '' });
    setShowAddForm(false);
    showToast("Post added successfully", "success");
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div className="posts-page">
      <Header 
        onSearch={handleSearch} 
        searchOptions={[
          { value: 'title', label: 'Search by Title' },
          { value: 'id', label: 'Search by ID' }
        ]}
      />
      <div className="posts-content">
        <div className="posts-layout">
          <div className="posts-list">
            <div className="posts-header">
              <button 
                className="back-btn-avatar"
                onClick={handleBackToHome}
                title="Back to Home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>
              <h2 className="posts-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                  <path fill="currentColor" d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
                </svg>
                POSTS
              </h2>
              {isCurrentUser && (
                <button 
                  className="add-btn-avatar"
                  onClick={() => setShowAddForm(true)}
                  title="Add Post"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </button>
              )}
            </div>
            {filteredPosts.length === 0 ? (
              <div className="empty-state">No posts found</div>
            ) : (
              <PostsList
                filteredPosts={filteredPosts}
                userId={userId}
                comments={comments}
                user={user}
                isCurrentUser={isCurrentUser}
                handleEditPost={handleEditPost}
                handleDeletePost={handleDeletePost}
                expandedPost={expandedPost}
                handleToggleExpand={handleToggleExpand}
              />
            )}
          </div>
        </div>
      </div>

      <GenericFormModal
        isOpen={showAddForm && isCurrentUser}
        onClose={() => setShowAddForm(false)}
        title="Add New Post"
        onSubmit={handleAddPost}
        submitText="Add Post"
      >
        <input
          type="text"
          placeholder="Post title"
          value={newPost.title}
          onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        <textarea
          placeholder="Post content"
          value={newPost.body}
          onChange={(e) => setNewPost(prev => ({ ...prev, body: e.target.value }))}
          rows="4"
          required
        />
      </GenericFormModal>

      <GenericFormModal
        isOpen={showEditForm && isCurrentUser}
        onClose={handleCancelEdit}
        title="Edit Post"
        onSubmit={handleSaveEdit}
        submitText="Save Changes"
      >
        <input
          type="text"
          placeholder="Post title"
          value={editingPost?.title || ''}
          onChange={(e) => setEditingPost(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        <textarea
          placeholder="Post content"
          value={editingPost?.body || ''}
          onChange={(e) => setEditingPost(prev => ({ ...prev, body: e.target.value }))}
          rows="4"
          required
        />
      </GenericFormModal>

      <GenericFormModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Post"
        onSubmit={confirmDelete}
        submitText="Delete"
      >
        <p style={{ margin: 0, fontSize: '15px', color: 'rgba(0,0,0,0.9)' }}>
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
      </GenericFormModal>
    </div>
  );
}

export default PostsPage;