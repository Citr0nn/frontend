import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Здесь будет логика поиска книг
    console.log("Поиск по запросу:", searchQuery);
  };
  
  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Поиск книг..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">
        <span className="material-icons">search</span>
      </button>
    </form>
  );
};

export default SearchBar;