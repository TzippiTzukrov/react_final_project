import { query } from '../config/db.js';

export const formatComment = (r) => ({ ...r, postId: r.post_id });

export const findAllComments = async ({ postId }) => {
  const rows = await query('SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC', [parseInt(postId)]);
  return rows.map(formatComment);
};

export const findCommentById = async (id) => {
  const rows = await query('SELECT * FROM comments WHERE id = ?', [id]);
  return rows.length ? formatComment(rows[0]) : null;
};

export const insertComment = async ({ postId, name, email, body }) => {
  const result = await query(
    'INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)',
    [postId, name, email, body]
  );
  const rows = await query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
  return formatComment(rows[0]);
};

export const updateCommentById = async (id, { name, email, body }) => {
  await query('UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ?', [name, email, body, id]);
  const rows = await query('SELECT * FROM comments WHERE id = ?', [id]);
  return rows.length ? formatComment(rows[0]) : null;
};

export const deleteCommentById = async (id) => {
  const result = await query('DELETE FROM comments WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
