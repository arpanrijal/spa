import React from 'react';
import { Search, RefreshCw } from 'lucide-react'; 

function SearchBar({ setQuery }) {
  const handleSearch = (event) => {
    
    setQuery(event.target.value);
  };

  const handleRefresh = () => {
    
    console.log("Search refresh clicked");
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <Search size={20} className="search-bar-icon" />
        <input
          type="text"
          placeholder="Search stocks by symbol or name..."
          onChange={handleSearch}
        />
        <RefreshCw size={20} className="search-bar-icon" onClick={handleRefresh} />
      </div>
    </div>
  );
}

export default SearchBar;