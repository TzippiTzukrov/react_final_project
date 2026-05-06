import { useState, useEffect } from 'react';

export const useSearch = (items, searchFields = ['title'], sortBy = 'id') => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState(searchFields[0]);
  const [currentSortBy, setCurrentSortBy] = useState(sortBy);
  const [filteredItems, setFilteredItems] = useState([]);

  const sortItems = (itemsToSort, sortField) => {
    return [...itemsToSort].sort((a, b) => {
      switch (sortField) {
        case 'id':
          return parseInt(a.id) - parseInt(b.id);
        case 'title':
          return a.title?.localeCompare(b.title) || 0;
        case 'completed':
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    let result = items;
    
    if (searchTerm) {
      result = items.filter(item => {
        switch (searchBy) {
          case 'id':
            return item.id.toString().includes(searchTerm);
          case 'title':
            return item.title?.toLowerCase().includes(searchTerm.toLowerCase());
          case 'completed':
            const isCompleted = searchTerm.toLowerCase() === 'true' || searchTerm.toLowerCase() === 'completed';
            const isNotCompleted = searchTerm.toLowerCase() === 'false' || searchTerm.toLowerCase() === 'pending';
            return isCompleted ? item.completed : isNotCompleted ? !item.completed : false;
          default:
            return false;
        }
      });
    }
    
    result = sortItems(result, currentSortBy);
    setFilteredItems(result);
  }, [items, searchTerm, searchBy, currentSortBy]);

  const handleSearch = (searchValue, searchType = searchFields[0]) => {
    setSearchTerm(searchValue);
    setSearchBy(searchType);
  };

  const handleSort = (sortField) => {
    setCurrentSortBy(sortField);
  };

  return {
    searchTerm,
    searchBy,
    currentSortBy,
    filteredItems,
    handleSearch,
    handleSort,
    setSearchBy
  };
};