import { useState } from "react";
import { searchService } from "../Services/searchService";
import { apiService } from "../Services/apiService";

const ITEMS_PER_PAGE = 10;

export function useHomeSearch(user, dataLoaded) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentSearchValue, setCurrentSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const [allSearchResults, setAllSearchResults] = useState([]);

  const handleSearch = (searchValue) => {
    if (searchValue.trim()) {
      setCurrentSearchValue(searchValue.trim());
      setSearchResults([]);
      setCurrentPage(0);
      setHasMore(false);
      setTotalResults(0);
      setAllSearchResults([]);
      
      if (dataLoaded) {
        performUnifiedSearch(searchValue.trim());
      } else {
        const checkData = setInterval(() => {
          if (dataLoaded) {
            clearInterval(checkData);
            performUnifiedSearch(searchValue.trim());
          }
        }, 100);
      }
    } else {
      resetSearch();
    }
  };

  const performUnifiedSearch = async (searchValue) => {
    setLoading(true);
    let currentUsers = users;
    if (currentUsers.length === 0) {
      const usersData = await apiService.getUsers();
      setUsers(usersData);
      currentUsers = usersData;
    }
    
    const result = await searchService.unifiedSearch({
      searchValue,
      excludeUserId: user?.id
    });
    
    const resultsWithUsers = result.results.map(item => {
      if (item.type === 'post') {
        return {
          ...item,
          userInfo: getUserById(item.userId, currentUsers)
        };
      }
      return item;
    });
    
    setAllSearchResults(resultsWithUsers);
    setTotalResults(result.totalResults);
    const firstPageResults = resultsWithUsers.slice(0, ITEMS_PER_PAGE);
    setSearchResults(firstPageResults);
    setHasMore(resultsWithUsers.length > ITEMS_PER_PAGE);
    setCurrentPage(0);
    setLoading(false);
  };

  const getUserById = (userId, usersList = users) => {
    const foundUser = usersList.find(u => u.id == userId);
    if (!foundUser) {
      return { id: userId, name: 'Unknown User', email: '' };
    }
    return foundUser;
  };

  const resetSearch = () => {
    setSearchResults([]);
    setCurrentPage(0);
    setHasMore(false);
    setTotalResults(0);
    setCurrentSearchValue('');
    setAllSearchResults([]);
  };

  const loadMoreUnified = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      const startIndex = nextPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newResults = allSearchResults.slice(startIndex, endIndex);
      
      setSearchResults([...searchResults, ...newResults]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < allSearchResults.length);
    }
  };

  return {
    searchResults,
    loading,
    hasMore,
    totalResults,
    currentSearchValue,
    handleSearch,
    resetSearch,
    loadMoreUnified,
    getUserById,
    users
  };
}