import { findAllComments, findCommentById, insertComment, updateCommentById, deleteCommentById } from '../services/commentsService.js';

export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.query;
    if (!postId) return res.status(400).json({ error: 'postId is required' });
    res.json(await findAllComments(req.query));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await findCommentById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const commentData = {
      ...req.body,
      email: req.user.email
    };
    res.status(201).json(await insertComment(commentData));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const existing = await findCommentById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Comment not found' });
    
    if (existing.email !== req.user.email)
      return res.status(403).json({ error: 'Access denied. You can only edit your own comments.' });
    
    res.json(await updateCommentById(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const existing = await findCommentById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Comment not found' });
    
    if (existing.email !== req.user.email)
      return res.status(403).json({ error: 'Access denied. You can only delete your own comments.' });
    
    await deleteCommentById(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};