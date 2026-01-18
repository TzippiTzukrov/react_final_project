import { getAvatarColor, getInitial } from "../Utils/avatarUtils";
import PostItem from "./PostItem";
import { useState } from "react";
import { useComments } from "../Hooks/useComments";
import { apiService } from "../Services/apiService";

function SearchResults({ 
  currentSearchValue,  
  loading,             
  totalResults,        
  searchResults,       
  user,                
  getUserById,         
  handleUserSelect,   
  hasMore,            
  loadMoreUnified,     
  allUsers            
}) {
  const [comments, setComments] = useState({});

  const {
    showComments,
    toggleComments,
    addComment,
    updateComment,
    deleteComment
  } = useComments(setComments, user);
  const handleToggleComments = async (postId) => {
    if (!showComments[postId] && !comments[postId]) {
      const postComments = await apiService.getCommentsByPost(postId);
      setComments(prev => ({ ...prev, [postId]: postComments }));
    }
    toggleComments(postId);
  };

  if (!currentSearchValue) return null;

  return (
    <div className="search-results">
      <div className="search-header">
        <h3>Search Results for "{currentSearchValue}"</h3>
      </div>
      
      {loading && searchResults.length === 0 && (
        <div className="loading-message">
          <p>Searching...</p>
        </div>
      )}
      
      {totalResults === 0 && !loading && (
        <div className="no-results">
          <p>NOT AVAILABLE RESULTS for "{currentSearchValue}"</p>
          <p>The database contains content in English only. Try searching for:</p>
          <ul>
            <li>User names (e.g., "Leanne", "Bret")</li>
            <li>Post content (e.g., "sunt", "qui")</li>
            <li>Numbers (e.g., "1", "2")</li>
          </ul>
        </div>
      )}
      
      <div className="search-list">
        {searchResults.map((item) => {
          if (item.type === 'post') {
            if (user && item.userId == user.id) {
              return null;
            }
            const postAuthor = item.userInfo || getUserById(item.userId) || { id: item.userId, name: 'Unknown User', email: '' };
            const postComments = comments[item.id] || [];
            return (
              <PostItem
                key={`post-${item.id}`}
                post={item}
                user={postAuthor}
                comments={postComments}
                allUsers={allUsers}
                showComments={showComments[item.id]}
                currentUser={user}
                onToggleComments={handleToggleComments}
                onAddComment={addComment}
                onEditComment={updateComment}
                onDeleteComment={deleteComment}
              />
            );
          } 
          else if (item.type === 'user') {
            return (
              <div 
                key={`user-${item.id}`} 
                className="search-item user-item"
                onClick={() => handleUserSelect(item)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}
              >
                <div className="user-avatar" style={{ 
                  backgroundColor: getAvatarColor(item.name),
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {getInitial(item.name)}
                </div>
                <div className="user-details">
                  <span className="item-type">👤 User</span>
                  <h4>{item.name}</h4>
                  <p>{item.email}</p>
                  <p>{item.company?.name}</p>
                </div>
              </div>
            );
          } 
          return null;
        })}
      </div>
      
      {hasMore && searchResults.length > 0 && (
        <div className="load-more-container">
          <button 
            className="load-more-btn" 
            onClick={loadMoreUnified}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Results"}
          </button>
        </div>
      )}
      
      {!hasMore && searchResults.length > 0 && (
        <div className="no-more-results">
          <p>No more results to load</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
