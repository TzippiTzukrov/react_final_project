import { query } from '../config/db.js';

export const formatPost = (r) => ({ ...r, userId: r.user_id });

export const findAllPosts = async ({ userId, _start, _limit, _page, _sort, _order } = {}) => {
  let sql = 'SELECT * FROM posts';
  const params = [];

  if (userId) { sql += ' WHERE user_id = ?'; params.push(parseInt(userId)); }

  const sortCol = ['id', 'title', 'user_id'].includes(_sort) ? _sort : 'id';
  sql += ` ORDER BY ${sortCol} ${_order === 'desc' ? 'DESC' : 'ASC'}`;

  if (_page && _limit) {
    const limit = Number(_limit);
    const offset = (Number(_page) - 1) * limit;
    sql += ` LIMIT ${limit} OFFSET ${offset}`;
  } else if (_limit) {
    const limit = Number(_limit);
    const offset = Number(_start) || 0;
    sql += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const rows = await query(sql, params);
  return rows.map(formatPost);
};

export const findPostById = async (id) => {
  const rows = await query('SELECT * FROM posts WHERE id = ?', [parseInt(id)]);
  return rows.length ? formatPost(rows[0]) : null;
};

export const insertPost = async ({ userId, user_id, title, body }) => {
  const finalUserId = user_id || userId;
  const result = await query(
    'INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)',
    [finalUserId, title, body]
  );
  const rows = await query('SELECT * FROM posts WHERE id = ?', [result.insertId]);
  return formatPost(rows[0]);
};

export const updatePostById = async (id, { title, body }) => {
  await query('UPDATE posts SET title = ?, body = ? WHERE id = ?', [title, body, id]);
  const rows = await query('SELECT * FROM posts WHERE id = ?', [id]);
  return rows.length ? formatPost(rows[0]) : null;
};

export const deletePostById = async (id) => {
  const result = await query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows > 0;
};