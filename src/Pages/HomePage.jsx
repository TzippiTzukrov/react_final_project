import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext"; 
import { useHomeSearch } from "../Hooks/useHomeSearch"; 
import Header from "../Common/Header"; 
import ProfileSidebar from "../Components/ProfileSidebar"; 
import SearchResults from "../Components/SearchResults"; 
import PostsFeed from "../Components/PostFeed"; 
import PeopleFeed from "../Components/PeopleFeed"; 
import "../styles/HomePage.css";

function HomePage() {
  const { user } = useUser();

  const [dataLoaded, setDataLoaded] = useState(false);

  const {
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
  } = useHomeSearch(user, dataLoaded);

  useEffect(() => {
    setDataLoaded(true);
  }, []);

  const handleUserSelect = (selectedUser) => {
    window.location.href = `/users/${selectedUser.id}/info`;
  };

  return (
    <div className="home-page">
      <Header onSearch={handleSearch} />

      <div className="home-content">
        {user && <ProfileSidebar />}

        <div className="main-content">
          <SearchResults
            currentSearchValue={currentSearchValue}
            loading={loading}
            totalResults={totalResults}
            searchResults={searchResults}
            resetSearch={resetSearch}
            user={user}
            getUserById={getUserById}
            handleUserSelect={handleUserSelect}
            hasMore={hasMore}
            loadMoreUnified={loadMoreUnified}
            allUsers={users}
          />

          {!currentSearchValue && (
            <>
              <PostsFeed
                emptyMessage="No posts available from other users"
                loadingMessage="Loading feed..."
              />
              <PeopleFeed onUserSelect={handleUserSelect} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
