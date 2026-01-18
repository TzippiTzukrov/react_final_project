import { apiService } from './apiService';

export const albumService = {
  getAlbums: (userId = null) => userId ? apiService.getAlbums(userId) : apiService.get('/albums'),
  getAlbumById: (albumId) => apiService.get(`/albums/${albumId}`),
  getPhotosPaginated: (albumId, start = 0, limit = 15) => apiService.getPhotosPaginated(albumId, start, limit),
  createAlbum: (data) => apiService.createAlbum({ ...data, id: Date.now().toString() }),
  updateAlbum: (id, updates) => apiService.updateAlbum(id, updates),
  deleteAlbum: (id) => apiService.deleteAlbum(id),

  async getPhotos(albumId, page = 0, limit = 10) {
    try {
      const start = page * limit;
      const photos = await apiService.get(`/photos?albumId=${albumId}&_start=${start}&_limit=${limit}`);
      const totalPhotos = await apiService.get(`/photos?albumId=${albumId}`);
      const hasMore = start + limit < totalPhotos.length;
      return { photos, hasMore, total: totalPhotos.length };
    } catch (error) {
      console.error("Error fetching photos:", error);
      throw error;
    }
  },

  createPhoto: (data) => apiService.createPhoto({ ...data, id: Date.now().toString() }),
  updatePhoto: (id, updates) => apiService.updatePhoto(id, updates),
  deletePhoto: (id) => apiService.deletePhoto(id),

  filterAlbums(albums, searchTerm, searchBy) {
    if (!searchTerm) return albums;
    return albums.filter(album => {
      switch (searchBy) {
        case 'id':
          return album.id.toString().includes(searchTerm);
        case 'title':
          return album.title.toLowerCase().includes(searchTerm.toLowerCase());
        default:
          return album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 album.id.toString().includes(searchTerm);
      }
    });
  }
};