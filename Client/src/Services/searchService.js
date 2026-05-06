import { get } from './apiService';

export const unifiedSearch = async ({ searchValue, excludeUserId = null }) => {
  const [postsByTitle, postsByBody, usersByName, usersByEmail] = await Promise.all([
    get(`/posts?title_like=${encodeURIComponent(searchValue)}`),
    get(`/posts?body_like=${encodeURIComponent(searchValue)}`),
    get(`/users?name_like=${encodeURIComponent(searchValue)}`),
    get(`/users?email_like=${encodeURIComponent(searchValue)}`)
  ]);

  const searchLower = searchValue.toLowerCase();
  const filteredPostsByTitle = postsByTitle.filter(p => p.title?.toLowerCase().includes(searchLower));
  const filteredPostsByBody = postsByBody.filter(p => p.body?.toLowerCase().includes(searchLower));
  const filteredUsersByName = usersByName.filter(u => u.name?.toLowerCase().includes(searchLower));
  const filteredUsersByEmail = usersByEmail.filter(u => u.email?.toLowerCase().includes(searchLower));

  let posts = [...new Map([...filteredPostsByTitle, ...filteredPostsByBody].map(p => [p.id, p])).values()];
  const users = [...new Map([...filteredUsersByName, ...filteredUsersByEmail].map(u => [u.id, u])).values()];

  if (excludeUserId) posts = posts.filter(post => post.userId != excludeUserId);

  const allResults = [
    ...users.map(item => ({ ...item, type: 'user' })),
    ...posts.map(item => ({ ...item, type: 'post' }))
  ];

  return {
    results: allResults,
    totalResults: allResults.length,
    breakdown: { posts: posts.length, users: users.length }
  };
};
