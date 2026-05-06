import { get, post, patch, del } from './apiService';

export const getAlbums = (userId) => get(`/albums?userId=${userId}`);

export const getAlbumById = (albumId) => get(`/albums/${albumId}`);

export const createAlbum = (data) => post('/albums', data);


export const deleteAlbum = (id) => del(`/albums/${id}`);

export const getPhotos = (albumId) => get(`/photos?albumId=${albumId}`);

export const getPhotosPaginated = (albumId, start = 0, limit = 15) =>
  get(`/photos?albumId=${albumId}&_start=${start}&_limit=${limit}`);

export const createPhoto = (data) => post('/photos', data);


export const deletePhoto = (id) => del(`/photos/${id}`);
