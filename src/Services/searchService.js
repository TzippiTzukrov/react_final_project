import { apiService } from './apiService';

const ITEMS_PER_PAGE = 10;

export const searchService = {
  async unifiedSearch({ searchValue, excludeUserId = null }) {
    try {
      const [postsByTitle, postsByBody, usersByName, usersByEmail] = await Promise.all([
        apiService.get(`/posts?title_like=${encodeURIComponent(searchValue)}`),
        apiService.get(`/posts?body_like=${encodeURIComponent(searchValue)}`),
        apiService.get(`/users?name_like=${encodeURIComponent(searchValue)}`),
        apiService.get(`/users?email_like=${encodeURIComponent(searchValue)}`)
      ]);
      
      const searchLower = searchValue.toLowerCase();
      const filteredPostsByTitle = postsByTitle.filter(p => p.title?.toLowerCase().includes(searchLower));
      const filteredPostsByBody = postsByBody.filter(p => p.body?.toLowerCase().includes(searchLower));
      const filteredUsersByName = usersByName.filter(u => u.name?.toLowerCase().includes(searchLower));
      const filteredUsersByEmail = usersByEmail.filter(u => u.email?.toLowerCase().includes(searchLower));
      
      let posts = [...new Map([...filteredPostsByTitle, ...filteredPostsByBody].map(p => [p.id, p])).values()];
      const users = [...new Map([...filteredUsersByName, ...filteredUsersByEmail].map(u => [u.id, u])).values()];
      
      if (excludeUserId) {
        posts = posts.filter(post => post.userId != excludeUserId);
      }
      
      const allResults = [
        ...users.map(item => ({ ...item, type: 'user' })),
        ...posts.map(item => ({ ...item, type: 'post' }))
      ];
      
      return {
        results: allResults,
        totalResults: allResults.length,
        breakdown: {
          posts: posts.length,
          users: users.length
        }
      };
    } catch (error) {
      return {
        results: [],
        totalResults: 0,
        breakdown: {
          posts: 0,
          users: 0
        }
      };
    }
  }
};