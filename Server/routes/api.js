import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postsController.js';
import { getAllComments, getCommentById, createComment, updateComment, deleteComment } from '../controllers/commentsController.js';
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todosController.js';
import { getAllAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum,
         getAllPhotos, createPhoto, updatePhoto, deletePhoto } from '../controllers/albumsController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', verifyToken, createPost);
router.put('/posts/:id', verifyToken, updatePost);
router.patch('/posts/:id', verifyToken, updatePost);
router.delete('/posts/:id', verifyToken, deletePost);

router.get('/comments', getAllComments);
router.get('/comments/:id', getCommentById);
router.post('/comments', verifyToken, createComment);
router.put('/comments/:id', verifyToken, updateComment);
router.patch('/comments/:id', verifyToken, updateComment);
router.delete('/comments/:id', verifyToken, deleteComment);

router.get('/todos', verifyToken, getAllTodos);
router.get('/todos/:id', verifyToken, getTodoById);
router.post('/todos', verifyToken, createTodo);
router.put('/todos/:id', verifyToken, updateTodo);
router.patch('/todos/:id', verifyToken, updateTodo);
router.delete('/todos/:id', verifyToken, deleteTodo);

router.get('/albums', getAllAlbums);
router.get('/albums/:id', getAlbumById);
router.post('/albums', verifyToken, createAlbum);
router.put('/albums/:id', verifyToken, updateAlbum);
router.patch('/albums/:id', verifyToken, updateAlbum);
router.delete('/albums/:id', verifyToken, deleteAlbum);

router.get('/photos', getAllPhotos);
router.post('/photos', verifyToken, createPhoto);
router.put('/photos/:id', verifyToken, updatePhoto);
router.patch('/photos/:id', verifyToken, updatePhoto);
router.delete('/photos/:id', verifyToken, deletePhoto);

export default router;