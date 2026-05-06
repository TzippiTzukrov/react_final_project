import {
  findAllAlbums, findAlbumById, insertAlbum, updateAlbumById, deleteAlbumById,
  findAllPhotos, findPhotoWithOwner, insertPhoto, updatePhotoById, deletePhotoById
} from '../services/albumsService.js';

// Albums
export const getAllAlbums = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    res.json(await findAllAlbums({ userId }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const album = await findAlbumById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAlbum = async (req, res) => {
  try {
    const albumData = { ...req.body, user_id: req.user.id };
    res.status(201).json(await insertAlbum(albumData));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const existing = await findAlbumById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Album not found' });
    
    if (existing.user_id !== req.user.id)
      return res.status(403).json({ error: 'Access denied. You can only edit your own albums.' });
    
    const updated = await updateAlbumById(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const existing = await findAlbumById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Album not found' });
    
    if (existing.user_id !== req.user.id)
      return res.status(403).json({ error: 'Access denied. You can only delete your own albums.' });
    
    await deleteAlbumById(req.params.id);
    res.json({ message: 'Album deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPhotos = async (req, res) => {
  try {
    const { albumId } = req.query;
    if (!albumId) return res.status(400).json({ error: 'albumId is required' });
    res.json(await findAllPhotos(req.query));
  } catch (err) {
    console.error('getAllPhotos error:', err.message, '| query:', req.query);
    res.status(500).json({ error: err.message });
  }
};

export const createPhoto = async (req, res) => {
  try {
    const albumId = req.body.albumId;
    const album = await findAlbumById(albumId);
    if (!album) return res.status(404).json({ error: `Album not found (albumId: ${albumId})` });
    if (album.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied. You can only add photos to your own albums.' });
    }
    res.status(201).json(await insertPhoto(req.body));
  } catch (err) {
    console.error('createPhoto error:', err.message, '| body:', req.body);
    res.status(500).json({ error: err.message });
  }
};

export const updatePhoto = async (req, res) => {
  try {
    const photo = await findPhotoWithOwner(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    if (photo.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied. You can only edit your own photos.' });
    }
    const updated = await updatePhotoById(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const photo = await findPhotoWithOwner(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    if (photo.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied. You can only delete your own photos.' });
    }
    await deletePhotoById(req.params.id);
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};