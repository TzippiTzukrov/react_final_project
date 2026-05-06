import { query } from '../config/db.js';
import bcrypt from 'bcrypt';

export const USER_FIELDS = `
  id, name, username, email, phone, website,
  street, suite, city, zipcode,
  company_name, company_catchphrase, company_bs, created_at
`;

export const formatUser = (row) => ({
  id: row.id,
  name: row.name,
  username: row.username,
  email: row.email,
  phone: row.phone,
  website: row.website,
  address: {
    street: row.street,
    suite: row.suite,
    city: row.city,
    zipcode: row.zipcode,
  },
  company: {
    name: row.company_name,
    catchPhrase: row.company_catchphrase,
    bs: row.company_bs,
  },
});

export const findAllUsers = async () => {
  const rows = await query(`SELECT ${USER_FIELDS} FROM users ORDER BY id`);
  return rows.map(formatUser);
};

export const findUsersPaginated = async (offset = 0, limit = 6) => {
  const rows = await query(
    `SELECT ${USER_FIELDS} FROM users ORDER BY id LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`
  );
  return rows.map(formatUser);
};

export const findUserById = async (id) => {
  const rows = await query(`SELECT ${USER_FIELDS} FROM users WHERE id = ?`, [parseInt(id)]);
  return rows.length ? formatUser(rows[0]) : null;
};

export const findUserByUsername = async (username) => {
  const rows = await query(`SELECT ${USER_FIELDS} FROM users WHERE username = ?`, [username]);
  return rows.map(formatUser);
};

export const checkUserExists = async (username, email) => {
  const rows = await query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
  return rows.length > 0;
};

export const insertUser = async ({ name, username, email, phone, website, address = {}, company = {} }) => {
  const result = await query(
    `INSERT INTO users (name, username, email, phone, website, street, suite, city, zipcode, company_name, company_catchphrase, company_bs)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, username, email, phone || '', website || '',
     address.street || '', address.suite || '', address.city || '', address.zipcode || '',
     company.name || '', company.catchPhrase || '', company.bs || '']
  );
  return result.insertId;
};

export const insertPassword = async (userId, plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, 10);
  await query('INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)', [userId, hash]);
};

export const updateUserById = async (id, { name, email, phone, website, address = {}, company = {} }) => {
  const result = await query(
    `UPDATE users SET name=?, email=?, phone=?, website=?, street=?, suite=?, city=?, zipcode=?,
     company_name=?, company_catchphrase=?, company_bs=? WHERE id=?`,
    [name, email, phone, website,
     address.street, address.suite, address.city, address.zipcode,
     company.name, company.catchPhrase, company.bs, id]
  );
  return result.affectedRows > 0;
};

export const deleteUserById = async (id) => {
  const result = await query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

export const findUserWithPasswordByUsername = async (username) => {
  const rows = await query(
    `SELECT u.*, p.password_hash FROM users u
     LEFT JOIN passwords p ON u.id = p.user_id WHERE u.username = ?`,
    [username]
  );
  return rows.length ? rows[0] : null;
};

export const verifyPassword = async (plain, hash) => bcrypt.compare(plain, hash);
