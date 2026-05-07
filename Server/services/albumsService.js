import { query } from '../config/db.js';
import pool from '../config/db.js';

export const formatAlbum = (r) => ({ ...r, userId: r.user_id });
export const formatPhoto = (r) => ({ ...r, albumId: r.album_id, thumbnailUrl: r.thumbnail_url });

export const findAllAlbums = async ({ userId }) => {
  const rows = await query('SELECT * FROM albums WHERE user_id = ? ORDER BY id ASC', [parseInt(userId)]);
  return rows.map(formatAlbum);
};

export const findAlbumById = async (id) => {
  const rows = await query('SELECT * FROM albums WHERE id = ?', [id]);
  return rows.length ? formatAlbum(rows[0]) : null;
};

export const insertAlbum = async ({ user_id, title }) => {
  const result = await query('INSERT INTO albums (user_id, title) VALUES (?, ?)', [user_id, title]);
  const rows = await query('SELECT * FROM albums WHERE id = ?', [result.insertId]);
  return formatAlbum(rows[0]);
};

export const updateAlbumById = async (id, { title }) => {
  const result = await query('UPDATE albums SET title = ? WHERE id = ?', [title, id]);
  if (!result.affectedRows) return null;
  const rows = await query('SELECT * FROM albums WHERE id = ?', [id]);
  return formatAlbum(rows[0]);
};

export const deleteAlbumById = async (id) => {
  const result = await query('DELETE FROM albums WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

export const findAllPhotos = async ({ albumId, _start, _limit }) => {
  const id = parseInt(albumId);
  let sql = `SELECT * FROM photos WHERE album_id = ${id} ORDER BY id ASC`;
  if (_limit !== undefined) {
    sql += ` LIMIT ${parseInt(_limit)} OFFSET ${parseInt(_start) || 0}`;
  }
  const [rows] = await pool.query(sql);
  return rows.map(formatPhoto);
};

export const findPhotoWithOwner = async (id) => {
  const rows = await query(
    'SELECT p.*, a.user_id FROM photos p JOIN albums a ON p.album_id = a.id WHERE p.id = ?',
    [id]
  );
  return rows.length ? rows[0] : null;
};

export const insertPhoto = async ({ albumId, title, url, thumbnailUrl }) => {
  const result = await query(
    'INSERT INTO photos (album_id, title, url, thumbnail_url) VALUES (?, ?, ?, ?)',
    [albumId, title, url, thumbnailUrl || url]
  );
  const rows = await query('SELECT * FROM photos WHERE id = ?', [result.insertId]);
  return formatPhoto(rows[0]);
};

export const updatePhotoById = async (id, { title, url, thumbnailUrl }) => {
  const result = await query(
    'UPDATE photos SET title = ?, url = ?, thumbnail_url = ? WHERE id = ?',
    [title, url, thumbnailUrl || url, id]
  );
  if (!result.affectedRows) return null;
  const rows = await query('SELECT * FROM photos WHERE id = ?', [id]);
  return formatPhoto(rows[0]);
};

export const deletePhotoById = async (id) => {
  const result = await query('DELETE FROM photos WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
