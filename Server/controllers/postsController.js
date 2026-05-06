import { findAllPosts, findPostById, insertPost, updatePostById, deletePostById } from '../services/postsService.js';

export const getAllPosts = async (req, res) => {
  try {
    res.json(await findAllPosts(req.query));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await findPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const postData = { ...req.body, user_id: req.user.id };
    res.status(201).json(await insertPost(postData));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const existing = await findPostById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    
    if (existing.user_id !== req.user.id)
      return res.status(403).json({ error: 'Access denied. You can only edit your own posts.' });
    
    res.json(await updatePostById(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const existing = await findPostById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    
    if (existing.user_id !== req.user.id)
      return res.status(403).json({ error: 'Access denied. You can only delete your own posts.' });
    
    await deletePostById(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};