import { useState } from 'react';
import { createComment, updateComment, deleteComment } from '../Services/commentService';

export const useComments = (setComments, currentUser) => {
  const [showComments, setShowComments] = useState({});

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const addComment = async (postId, commentText, commentTitle = "") => {
    if (!commentText.trim() || !currentUser) return null;
    const newCommentData = {
      postId,
      name: commentTitle || `Comment by ${currentUser.name}`,
      email: currentUser.email,
      body: commentText,
      authorName: currentUser.name
    };
    const savedComment = await createComment(newCommentData);
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), savedComment]
    }));
    return savedComment;
  };

  const handleUpdateComment = async (commentId, postId, newBody) => {
    const updatedComment = await updateComment(commentId, { body: newBody });
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment =>
        comment.id === commentId ? updatedComment : comment
      )
    }));
    return updatedComment;
  };

  const handleDeleteComment = async (commentId, postId) => {
    await deleteComment(commentId);
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].filter(comment => comment.id !== commentId)
    }));
  };

  return {
    showComments,
    toggleComments,
    addComment,
    updateComment: handleUpdateComment,
    deleteComment: handleDeleteComment
  };
};