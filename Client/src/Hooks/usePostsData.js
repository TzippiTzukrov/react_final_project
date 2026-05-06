import { useState, useEffect } from 'react';
import { getUsers } from '../Services/userService';
import { getPosts } from '../Services/postService';
import { getCommentsByPost } from '../Services/commentService';

const POSTS_PER_LOAD = 10;

export function usePostsData(currentUser) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [comments, setComments] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [postsBuffer, setPostsBuffer] = useState([]); // מאגר פוסטים מסוננים

  useEffect(() => {
    fetchInitialData();
  }, [currentUser]);

  const fetchInitialData = async () => {
    if (!currentUser || loading) return;
    setLoading(true);
    try {
      const allUsers = await getUsers();
      const usersMap = allUsers.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setUsers(usersMap);
      await loadMorePosts(true);
    } catch (error) {
      console.error('Failed to load feed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (userId) => {
    return users[userId] || { id: userId, name: 'Unknown User', email: '' };
  };

  const getCommentsForPost = async (postId) => {
    if (comments[postId]) return comments[postId];
    
    const postComments = await getCommentsByPost(postId);
    if (!postComments || postComments.length === 0) return [];
    
    setComments(prev => ({ ...prev, [postId]: postComments }));
    return postComments;
  };

  const loadMorePosts = async (isInitial = false) => {
    if (loading) return;

    if (postsBuffer.length > 0 && !isInitial) {
      const postsToAdd = postsBuffer.slice(0, POSTS_PER_LOAD);
      const remainingBuffer = postsBuffer.slice(POSTS_PER_LOAD);
      setPosts(prev => [...prev, ...postsToAdd]);
      setPostsBuffer(remainingBuffer);
      if (postsToAdd.length < POSTS_PER_LOAD && remainingBuffer.length === 0 && hasMorePosts)
        await loadMorePosts(false);
      return;
    }

    setLoading(true);
    try {
      const startIndex = isInitial ? 0 : currentIndex;
      const newPosts = await getPosts(startIndex, POSTS_PER_LOAD * 3);

      if (newPosts.length === 0) {
        setHasMorePosts(false);
        return;
      }

      let filteredPosts = currentUser
        ? newPosts.filter(post => post.userId != currentUser.id)
        : newPosts;
      filteredPosts = filteredPosts.sort(() => Math.random() - 0.5);

      const postsToShow = filteredPosts.slice(0, POSTS_PER_LOAD);
      const postsToBuffer = filteredPosts.slice(POSTS_PER_LOAD);

      if (isInitial) {
        setPosts(postsToShow);
        setPostsBuffer(postsToBuffer);
      } else {
        setPosts(prev => [...prev, ...postsToShow]);
        setPostsBuffer(prev => [...prev, ...postsToBuffer]);
      }

      setCurrentIndex(startIndex + newPosts.length);
      setHasMorePosts(newPosts.length >= POSTS_PER_LOAD || postsBuffer.length > 0);
    } catch (error) {
      console.error('Failed to load posts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    setPosts,
    users,
    comments,
    setComments,
    loading,
    hasMorePosts,
    loadMorePosts,
    getUserById,
    getCommentsForPost
  };
}