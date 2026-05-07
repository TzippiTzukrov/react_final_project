import {
  findAllUsers, findUsersPaginated, findUserById, findUserByUsername,
  checkUserExists, insertUser, insertPassword,
  updateUserById, deleteUserById,
  findUserWithPasswordByUsername, verifyPassword, formatUser
} from '../services/usersService.js';
import { generateToken } from '../middleware/auth.js';

export const getAllUsers = async (req, res) => {
  try {
    if (req.query._start !== undefined || req.query._end !== undefined) {
      const start = parseInt(req.query._start) || 0;
      const end = parseInt(req.query._end) || 6;
      const limit = end - start;
      const users = await findUsersPaginated(start, limit);
      return res.json(users);
    }
    res.json(await findAllUsers());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    res.json(await findUserByUsername(req.query.username));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  const { password, ...userData } = req.body;
  try {
    const exists = await checkUserExists(userData.username, userData.email);
    if (exists) return res.status(409).json({ error: 'Username or email already exists' });

    const userId = await insertUser(userData);
    if (password) await insertPassword(userId, password);

    const newUser = await findUserById(userId);
    const token = generateToken(newUser);
    
    res.status(201).json({
      user: newUser,
      token,
      message: 'User created successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await updateUserById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(await findUserById(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserById(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserWithPasswordByUsername(username);
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const hash = user.password_hash || '';
    const valid = hash.startsWith('$2') 
      ? await verifyPassword(password, hash)
      : password === hash;
    if (!valid) return res.status(401).json({ error: 'Invalid username or password' });

    const { password_hash, ...safeUser } = user;
    const formattedUser = formatUser(safeUser);
    const token = generateToken(formattedUser);
    
    res.json({ 
      user: formattedUser,
      token,
      message: 'Login successful'
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};
