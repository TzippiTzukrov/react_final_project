import "../styles/UserProfile.css";
import { getAvatarColor, getInitial } from "../Utils/avatarUtils";

function UserProfile({ 
  user, 
  onViewAlbums, 
  onViewPosts, 
  onViewTodos, 
  isEditing = false, 
  isCurrentUser = false, 
  onFieldChange,
  onBackToHome,
  onStartEdit,
  onSave,
  onCancel
}) {
  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-section info-page-profile">
            {onBackToHome && (
              <button onClick={onBackToHome} className="back-btn-avatar" title="Back to Home">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>
            )}
            {isCurrentUser && (
              <div className="edit-controls-avatar">
                {!isEditing ? (
                  onStartEdit && (
                    <button className="edit-btn-avatar" onClick={onStartEdit} title="Edit Info">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </button>
                  )
                ) : (
                  <div className="edit-actions-avatar">
                    {onSave && (
                      <button className="save-btn-avatar" onClick={onSave} title="Save">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </button>
                    )}
                    {onCancel && (
                      <button className="cancel-btn-avatar" onClick={onCancel} title="Cancel">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            <div 
              className="profile-avatar" 
              style={{ backgroundColor: getAvatarColor(user.name) }} 
            >
              {getInitial(user.name)}
            </div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-username">@{user.username}</p>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <h3>Contact Information</h3>
              
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                {isEditing && isCurrentUser ? (
                  <input 
                    type="email" 
                    value={user.email || ''} 
                    onChange={(e) => onFieldChange('email', e.target.value)}
                    className="detail-input"
                  />
                ) : (
                  <span className="detail-value">{user.email}</span>
                )}
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                {isEditing && isCurrentUser ? (
                  <input 
                    type="text" 
                    value={user.phone || ''} 
                    onChange={(e) => onFieldChange('phone', e.target.value)}
                    className="detail-input"
                  />
                ) : (
                  <span className="detail-value">{user.phone}</span>
                )}
              </div>
              
              {isEditing && isCurrentUser && (
                <div className="detail-item">
                  <span className="detail-label">Website:</span>
                  <input 
                    type="url" 
                    value={user.website || ''} 
                    onChange={(e) => onFieldChange('website', e.target.value)}
                    className="detail-input"
                  />
                </div>
              )}
            </div>

            <div className="detail-section">
              <h3>Address</h3>
              
              <div className="detail-item">
                <span className="detail-label">Street:</span>
                {isEditing && isCurrentUser ? (
                  <input 
                    type="text" 
                    value={user.address?.street || ''} 
                    onChange={(e) => onFieldChange('street', e.target.value, 'address')}
                    className="detail-input"
                  />
                ) : (
                  <span className="detail-value">{user.address?.street} {user.address?.suite}</span>
                )}
              </div>
              
              <div className="detail-item">
                <span className="detail-label">City:</span>
                {isEditing && isCurrentUser ? (
                  <input 
                    type="text" 
                    value={user.address?.city || ''} 
                    onChange={(e) => onFieldChange('city', e.target.value, 'address')}
                    className="detail-input"
                  />
                ) : (
                  <span className="detail-value">{user.address?.city}</span>
                )}
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Zipcode:</span>
                {isEditing && isCurrentUser ? (
                  <input 
                    type="text" 
                    value={user.address?.zipcode || ''} 
                    onChange={(e) => onFieldChange('zipcode', e.target.value, 'address')}
                    className="detail-input"
                  />
                ) : (
                  <span className="detail-value">{user.address?.zipcode}</span>
                )}
              </div>
              
              {user.address?.geo && (
                <div className="map-container">
                  <span className="detail-label">Location:</span>
                  <iframe
                    src={`https://maps.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '8px', marginTop: '8px' }}
                    title={`Map for ${user.name}`}
                  />
                </div>
              )}
            </div>

            <div className="detail-section">
              <h3>Company</h3>
              
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                {isEditing && isCurrentUser ? (
                  <input 
                    type="text" 
                    value={user.company?.name || ''} 
                    onChange={(e) => onFieldChange('name', e.target.value, 'company')}
                    className="detail-input"
                  />
                ) : (
                  <span className="detail-value">{user.company?.name}</span>
                )}
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Catchphrase:</span>
                {isEditing && isCurrentUser ? (
                  <input 
                    type="text" 
                    value={user.company?.catchPhrase || ''} 
                    onChange={(e) => onFieldChange('catchPhrase', e.target.value, 'company')}
                    className="detail-input"
                  />
                ) : (
                  <span className="detail-value">{user.company?.catchPhrase}</span>
                )}
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Business:</span>
                {isEditing && isCurrentUser ? (
                  <input 
                    type="text" 
                    value={user.company?.bs || ''} 
                    onChange={(e) => onFieldChange('bs', e.target.value, 'company')}
                    className="detail-input"
                  />
                ) : (
                  <span className="detail-value">{user.company?.bs}</span>
                )}
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button 
              className="action-btn albums-btn" 
              onClick={() => onViewAlbums && onViewAlbums()}
            >
              Albums
            </button>
            
            <button 
              className="action-btn posts-btn" 
              onClick={() => onViewPosts && onViewPosts()}
            >
              Posts
            </button>
            
            {isCurrentUser && (
              <button 
                className="action-btn todos-btn" 
                onClick={() => onViewTodos && onViewTodos()}
              >
                Todos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;