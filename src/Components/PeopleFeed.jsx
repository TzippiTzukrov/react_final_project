import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { apiService } from "../Services/apiService";
import { getAvatarColor, getInitial } from "../Utils/avatarUtils";
import "../styles/PeopleFeed.css";

const USERS_PER_LOAD = 6;

function PeopleFeed({ onUserSelect }) {
  const { user: currentUser } = useUser();
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  useEffect(() => {
    loadMoreUsers(true);
  }, []);

  const loadMoreUsers = async (isInitial = false) => {
    if (loading) return;

    setLoading(true);
    const startIndex = isInitial ? 0 : currentIndex;

    const newUsers = await apiService.getUsersPaginated(startIndex, USERS_PER_LOAD);

    if (newUsers.length === 0) {
      setHasMoreUsers(false);
    } else {
      const filteredUsers = currentUser
        ? newUsers.filter(user => user.id != currentUser.id)
        : newUsers;

      if (isInitial) {
        setUsers(filteredUsers);
      } else {
        setUsers(prev => [...prev, ...filteredUsers]);
      }

      setCurrentIndex(startIndex + USERS_PER_LOAD);

      if (newUsers.length < USERS_PER_LOAD) {
        setHasMoreUsers(false);
      }
    }
    setLoading(false);
  };

  const handleViewProfile = (user) => {
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="people-feed">
        <div className="people-loading">Loading people...</div>
      </div>
    );
  }

  return (
    <div className="people-feed">
      {users.length > 0 && (
        <div className="people-feed-header">
          <p className="people-count">{users.length} People</p>
        </div>
      )}

      <div className="people-grid">
        {users.map((user) => (
          <div key={user.id} className="person-card">
            <div className="person-header">
              <div
                className="person-avatar"
                style={{ backgroundColor: getAvatarColor(user.name) }}
              >
                {getInitial(user.name)}
              </div>
              <div className="person-info">
                <h4 className="person-name">{user.name}</h4>
                <p className="person-company">{user.company?.name || 'No company'}</p>
                <p className="person-email">{user.email}</p>
              </div>
            </div>
            <button
              className="view-profile-btn"
              onClick={() => handleViewProfile(user)}
            >
              View Full Profile
            </button>
          </div>
        ))}
      </div>

      {hasMoreUsers && users.length > 0 && (
        <div className="load-more-container">
          <button
            id="load-more-global-btn"
            className="load-more-people-btn"
            onClick={() => loadMoreUsers()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More People"}
          </button>
        </div>
      )}

      {!hasMoreUsers && users.length > 0 && (
        <div className="no-more-people">
          <p>You've seen all people!</p>
        </div>
      )}

      {users.length === 0 && !loading && (
        <div className="no-people">
          <p>No people available</p>
        </div>
      )}
    </div>
  );
}

export default PeopleFeed;
