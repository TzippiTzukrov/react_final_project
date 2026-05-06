import { query } from '../config/db.js';

export const formatTodo = (r) => ({ ...r, userId: r.user_id, completed: !!r.completed });

export const findAllTodos = async ({ userId, completed, _sort, _order }) => {
  const params = [parseInt(userId)];
  const conditions = ['user_id = ?'];

  if (completed !== undefined) { conditions.push('completed = ?'); params.push(completed === 'true'); }

  const sortCol = ['id', 'title', 'completed'].includes(_sort) ? _sort : 'id';
  const sql = `SELECT * FROM todos WHERE ${conditions.join(' AND ')} ORDER BY ${sortCol} ${_order === 'desc' ? 'DESC' : 'ASC'}`;

  const rows = await query(sql, params);
  return rows.map(formatTodo);
};

export const findTodoById = async (id) => {
  const rows = await query('SELECT * FROM todos WHERE id = ?', [id]);
  return rows.length ? formatTodo(rows[0]) : null;
};

export const insertTodo = async ({ userId, user_id, title, completed = false }) => {
  const finalUserId = user_id || userId;
  const result = await query(
    'INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)',
    [finalUserId, title, completed]
  );
  const rows = await query('SELECT * FROM todos WHERE id = ?', [result.insertId]);
  return formatTodo(rows[0]);
};

export const updateTodoById = async (id, { title, completed }) => {
  const existing = await query('SELECT * FROM todos WHERE id = ?', [id]);
  if (!existing.length) return null;
  const newTitle = title !== undefined ? title : existing[0].title;
  const newCompleted = completed !== undefined ? completed : existing[0].completed;
  await query('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [newTitle, newCompleted, id]);
  const rows = await query('SELECT * FROM todos WHERE id = ?', [id]);
  return formatTodo(rows[0]);
};

export const deleteTodoById = async (id) => {
  const result = await query('DELETE FROM todos WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
