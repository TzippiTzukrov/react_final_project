import { useUser } from "../Context/UserContext";
import { getAvatarColor, getInitial } from "../Utils/avatarUtils";
import "../styles/ProfileSidebar.css";

function ProfileSidebar() {
  const { user } = useUser();

  return (
    <div className="sidebar">
      <div className="profile-card">
        <div className="user-profile-header">
          <div className="profile-background"></div>
          <div
            className="profile-avatar"
            style={{ backgroundColor: getAvatarColor(user?.name) }}
            onClick={() => window.location.href = `/users/${user.id}/info`}
          >
            {getInitial(user?.name)}
          </div>
          <h3 className="profile-name" onClick={() => window.location.href = `/users/${user.id}/info`}>{user?.name}</h3>
          <p className="profile-company">{user?.company?.name}</p>
          <p className="profile-description">{user?.company?.catchPhrase}</p>
          <p className="profile-description">{user?.company?.bs}</p>
        </div>

        <div className="profile-links">
          <div
            className="profile-link"
            data-type="posts"
            onClick={() => window.location.href = `/users/${user.id}/posts`}
          >
            <span>Posts</span>
          </div>
          <div
            className="profile-link"
            data-type="albums"
            onClick={() => window.location.href = `/users/${user.id}/albums`}
          >
            <span>Albums</span>
          </div>
          <div
            className="profile-link"
            data-type="todos"
            onClick={() => window.location.href = `/users/${user.id}/todos`}
          >
            <span>Todos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
