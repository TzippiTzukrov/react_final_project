import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import "../styles/Header.css";

function Header({ onSearch, searchOptions, searchDisabled = false }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [selectedSearchType, setSelectedSearchType] = useState('title');
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasSearchOptions = searchOptions && searchOptions.length > 0;

  const handleLogout = () => {
    logout();
    window.history.go(-(window.history.length - 1));
    window.history.replaceState(null, null, "/entry");
    window.location.replace("/entry");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      clearSearch();
      return;
    }
    if (onSearch) {
      if (hasSearchOptions) {
        onSearch(searchQuery.trim(), selectedSearchType);
      } else {
        onSearch(searchQuery.trim());
      }
    }
  };

  const handleSearchTypeSelect = (type) => {
    setSelectedSearchType(type);
    setShowSearchOptions(false);
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim(), type);
    }
  };

  const handleInputFocus = () => {
    if (hasSearchOptions && !searchDisabled) {
      setShowSearchOptions(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      if (hasSearchOptions) {
        onSearch("", selectedSearchType);
      } else {
        onSearch("");
      }
    }
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={goToHome}>
          <img 
            src="/short-logo.png" 
            alt="ConnectPro" 
            className="connectpro-logo-img"
          />
        </div>

        <div className="search-container" ref={searchRef}>
          <form className="search-form" onSubmit={handleSearch}>
            <span className="search-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="search-icon">
                <path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM2.5 6.5a4 4 0 114 4 4 4 0 01-4-4z"></path>
              </svg>
            </span>
            <input
              type="text"
              className={`search-input ${searchDisabled ? 'disabled' : ''}`}
              placeholder={searchDisabled ? "Search not available" : (hasSearchOptions ? `Search by ${selectedSearchType}` : "Search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleInputFocus}
              disabled={searchDisabled}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={clearSearch}
              >
                ×
              </button>
            )}
          </form>
          
          {hasSearchOptions && showSearchOptions && !searchDisabled && (
            <div className="search-options-dropdown">
              {searchOptions.map(option => (
                <button
                  key={option.value}
                  className={`search-option ${selectedSearchType === option.value ? 'active' : ''}`}
                  onClick={() => handleSearchTypeSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;