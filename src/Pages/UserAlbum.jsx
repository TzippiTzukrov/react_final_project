import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { albumService } from "../Services/albumService";
import { getUserById } from "../Services/userService";
import { useUser } from "../Context/UserContext";
import { useToast } from "../Context/ToastContext";
import { useSearch } from "../Hooks/useSearch";
import GenericFormModal from "../Components/GenericFormModal";
import "../styles/GenericFormModal.css";
import Header from "../Common/Header";
import "../styles/UserAlbum.css";

function UserAlbum() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { showToast } = useToast();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filteredItems: filteredAlbums, handleSearch } = useSearch(albums, ['title', 'id']);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const isCurrentUser = user && user.id == userId;

  useEffect(() => {
    loadAlbums();
  }, [userId]);

  const loadAlbums = async () => {
    setLoading(true);
    try {
      const targetUser = await getUserById(userId);
      
      if (!targetUser) {
        navigate("/404");
        return;
      }
      
      const albumsData = await albumService.getAlbums(userId);
      setAlbums(albumsData);
    } catch (error) {
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const handleAlbumClick = (album) => {
    navigate(`/users/${userId}/albums/${album.id}/photos`);
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  const handleAddAlbum = async (e) => {
    e.preventDefault();
    if (!newAlbum.title.trim()) return;

    const albumData = {
      ...newAlbum,
      userId: userId
    };
    const createdAlbum = await albumService.createAlbum(albumData);
    setAlbums(prev => [...prev, createdAlbum]);
    setNewAlbum({ title: '' });
    setShowAddAlbumForm(false);
    showToast("Album added successfully", "success");
  };

  const handleDeleteAlbum = (albumId) => {
    setDeleteConfirm(albumId);
  };

  const confirmDelete = async () => {
    await albumService.deleteAlbum(deleteConfirm);
    setAlbums(prev => prev.filter(album => album.id !== deleteConfirm));
    if (selectedAlbum?.id === deleteConfirm) {
      setSelectedAlbum(null);
    }
    showToast("Album deleted successfully", "success");
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="albums-page">
        <Header />
        <div className="albums-content">
          <div className="loading">Loading albums...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="albums-page">
      <Header 
        onSearch={handleSearch}
        searchOptions={[
          { value: 'title', label: 'Search by Title' },
          { value: 'id', label: 'Search by ID' }
        ]}
      />
      <div className="albums-content">
        <div className="albums-layout">
          <div className="albums-list">
            <div className="albums-header">
              <button 
                onClick={handleBackToHome} 
                className="back-btn-avatar"
                title="Back to Home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>
              <h2 className="albums-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path fill="currentColor" d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
                </svg>
                ALBUMS
              </h2>
              {isCurrentUser && (
                <button 
                  className="add-btn-avatar"
                  onClick={() => setShowAddAlbumForm(true)}
                  title="Add Album"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </button>
              )}
            </div>

        <div className="albums-grid">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map((album) => (
              <div key={album.id} className="album-card">
                <div className="album-id">#{album.id}</div>
                <div className="album-info" onClick={() => handleAlbumClick(album)}>
                  <h3 className="album-title">{album.title}</h3>
                </div>
                {isCurrentUser && (
                  <button 
                    className="delete-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAlbum(album.id);
                    }}
                    title="Delete Album"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">No albums found</div>
          )}
        </div>
          </div>
        </div>
      </div>

      <GenericFormModal
        isOpen={showAddAlbumForm && isCurrentUser}
        onClose={() => setShowAddAlbumForm(false)}
        title="Add New Album"
        onSubmit={handleAddAlbum}
        submitText="Add Album"
      >
        <input
          type="text"
          placeholder="Album title"
          value={newAlbum.title}
          onChange={(e) => setNewAlbum(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </GenericFormModal>

      <GenericFormModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Album"
        onSubmit={(e) => { e.preventDefault(); confirmDelete(); }}
        submitText="Delete"
      >
        <p style={{ margin: 0, fontSize: '15px', color: 'rgba(0,0,0,0.9)' }}>
          Are you sure you want to delete this album? This action cannot be undone.
        </p>
      </GenericFormModal>
    </div>
  );
}

export default UserAlbum;
