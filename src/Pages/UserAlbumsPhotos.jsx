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
import "../styles/UserAlbumsPhotos.css";

const PHOTOS_PER_PAGE = 15;

function UserAlbumsPhotos() {
  const { userId, albumid } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { showToast } = useToast();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '', thumbnailUrl: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { filteredItems: filteredPhotos, handleSearch } = useSearch(photos, ['title', 'id']);

  const isCurrentUser = user && selectedUser && user.id === selectedUser.id;

  useEffect(() => {
    loadUserAlbumAndPhotos();
  }, [userId, albumid]);

  const loadUserAlbumAndPhotos = async () => {
    setLoading(true);
    try {
      const targetUser = await getUserById(userId);
      if (!targetUser) {
        navigate("/404");
        return;
      }
      
      const targetAlbum = await albumService.getAlbumById(albumid);
      
      if (!targetAlbum || targetAlbum.userId != userId) {
        navigate("/404");
        return;
      }
      
      setSelectedUser(targetUser);
      setSelectedAlbum(targetAlbum);
      await fetchPhotos(0, targetAlbum);
    } catch (error) {
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotos = async (page, album = selectedAlbum) => {
    if (page === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    const start = page * PHOTOS_PER_PAGE;
    const photosData = await albumService.getPhotosPaginated(album.id, start, PHOTOS_PER_PAGE);
    
    if (page === 0) {
      setPhotos(photosData);
    } else {
      setPhotos(prev => [...prev, ...photosData]);
    }
    
    setHasMore(photosData.length === PHOTOS_PER_PAGE);
    setCurrentPage(page);
    setLoading(false);
    setLoadingMore(false);
  };

  const loadMorePhotos = () => {
    if (!loadingMore && hasMore) {
      const nextPage = currentPage + 1;
      fetchPhotos(nextPage);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!newPhoto.title.trim() || !newPhoto.url.trim()) return;

    const photoData = {
      ...newPhoto,
      albumId: selectedAlbum.id,
      thumbnailUrl: newPhoto.thumbnailUrl || newPhoto.url
    };
    const createdPhoto = await albumService.createPhoto(photoData);
    setPhotos(prev => [...prev, createdPhoto]);
    setNewPhoto({ title: '', url: '', thumbnailUrl: '' });
    setShowAddPhotoForm(false);
    showToast("Photo added successfully", "success");
  };

  const handleDeletePhoto = async (photoId) => {
    setDeleteConfirm(photoId);
  };

  const confirmDelete = async () => {
    await albumService.deletePhoto(deleteConfirm);
    setPhotos(prev => prev.filter(photo => photo.id !== deleteConfirm));
    showToast("Photo deleted successfully", "success");
    setDeleteConfirm(null);
  };

  const handleBackToAlbums = () => {
    navigate(`/users/${userId}/albums`);
  };

  if (loading) {
    return (
      <div className="photos-page">
        <Header />
        <div className="photos-content">
          <div className="loading">Loading photos...</div>
        </div>
      </div>
    );
  }

  if (!selectedUser || !selectedAlbum) {
    return (
      <div className="photos-page">
        <Header />
        <div className="error">Album not found</div>
      </div>
    );
  }

  return (
    <div className="photos-page">
      <Header 
        onSearch={handleSearch}
        searchOptions={[
          { value: 'title', label: 'Search by Title' },
          { value: 'id', label: 'Search by ID' }
        ]}
      />
      <div className="photos-content">
        <div className="photos-layout">
          <div className="photos-list-container">
            <div className="photos-header">
              <button 
                className="back-btn-avatar"
                onClick={handleBackToAlbums}
                title="Back to Albums"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>
              <h2 className="photos-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path fill="currentColor" d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
                </svg>
                {selectedAlbum.title}
              </h2>
              {isCurrentUser && (
                <button 
                  className="add-btn-avatar"
                  onClick={() => setShowAddPhotoForm(true)}
                  title="Add Photo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </button>
              )}
            </div>
        
            <div className="photos-grid">
              {filteredPhotos.map((photo) => (
                <div key={photo.id} className="photo-card">
                  <div className="photo-info">
                    <h4 className="photo-title">{photo.title}</h4>
                    {isCurrentUser && (
                      <button 
                        className="delete-icon-btn"
                        onClick={() => handleDeletePhoto(photo.id)}
                        title="Delete Photo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <img 
                    src={photo.thumbnailUrl} 
                    alt={photo.title}
                    className="photo-thumbnail"
                  />
                </div>
              ))}
            </div>

            {hasMore && filteredPhotos.length > 0 && (
              <div className="load-more-container">
                <button 
                  className="load-more-btn" 
                  onClick={loadMorePhotos}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Discover more"}
                </button>
              </div>
            )}

            {!hasMore && filteredPhotos.length > 0 && (
              <div className="no-more-photos">
                <p>You've reached the end</p>
              </div>
            )}

            {filteredPhotos.length === 0 && (
              <div className="empty-state">No photos found</div>
            )}
          </div>
        </div>
      </div>

      <GenericFormModal
        isOpen={showAddPhotoForm && isCurrentUser}
        onClose={() => setShowAddPhotoForm(false)}
        title="Add New Photo"
        onSubmit={handleAddPhoto}
        submitText="Add Photo"
      >
        <input
          type="text"
          placeholder="Photo title"
          value={newPhoto.title}
          onChange={(e) => setNewPhoto(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        <input
          type="url"
          placeholder="Photo URL"
          value={newPhoto.url}
          onChange={(e) => setNewPhoto(prev => ({ ...prev, url: e.target.value }))}
          required
        />
        <input
          type="url"
          placeholder="Thumbnail URL (optional)"
          value={newPhoto.thumbnailUrl}
          onChange={(e) => setNewPhoto(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
        />
      </GenericFormModal>

      <GenericFormModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Photo"
        onSubmit={(e) => { e.preventDefault(); confirmDelete(); }}
        submitText="Delete"
      >
        <p style={{ margin: 0, fontSize: '15px', color: 'rgba(0,0,0,0.9)' }}>
          Are you sure you want to delete this photo? This action cannot be undone.
        </p>
      </GenericFormModal>
    </div>
  );
}

export default UserAlbumsPhotos;
