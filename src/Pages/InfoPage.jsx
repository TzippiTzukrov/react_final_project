import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { useToast } from "../Context/ToastContext";
import { updateUser } from "../Services/infoService";
import { getUserById } from "../Services/userService";
import Header from "../Common/Header";
import UserProfile from "../Components/UserProfile";
import "../styles/InfoPage.css";

function InfoPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { showToast } = useToast();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const isCurrentUser = user && selectedUser && user.id == selectedUser.id;

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    setLoading(true);
    const targetUser = await getUserById(userId);
    if (targetUser) {
      setSelectedUser(targetUser);
      setEditedUser({ ...targetUser });
    } else {
      navigate("/404");
    }
    setLoading(false);
  };

  const handleViewAlbums = () => {
    navigate(`/users/${userId}/albums`);
  };

  const handleViewPosts = () => {
    navigate(`/users/${userId}/posts`);
  };

  const handleViewTodos = () => {
    navigate(`/users/${userId}/todos`);
  };
  const handleBackToHome = () => {
    navigate("/home");
  };

  const handleSave = async () => {
    const updatedUser = await updateUser(selectedUser.id, editedUser);
    showToast('Profile updated successfully', 'success');
    setTimeout(() => {
      setUser(updatedUser);
      setSelectedUser(updatedUser);
      setIsEditing(false);
    }, 3000);
  };

  const handleCancel = () => {
    setEditedUser({ ...selectedUser });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="user-profile-page">
        <Header />
        <div className="loading">Loading user...</div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <Header searchDisabled={true} />
      <div className="profile-page-content">
        <UserProfile 
          user={isEditing ? editedUser : selectedUser} 
          onViewAlbums={handleViewAlbums}
          onViewPosts={handleViewPosts}
          onViewTodos={handleViewTodos}
          isEditing={isEditing}
          isCurrentUser={isCurrentUser}
          onBackToHome={handleBackToHome}
          onStartEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          onFieldChange={(field, value, nested) => {
            if (nested) {
              setEditedUser(prev => ({
                ...prev,
                [nested]: {
                  ...prev[nested],
                  [field]: value
                }
              }));
            } else {
              setEditedUser(prev => ({
                ...prev,
                [field]: value
              }));
            }
          }}
        />
      </div>
    </div>
  );
}

export default InfoPage;
