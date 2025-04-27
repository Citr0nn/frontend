import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Здесь будет логика поиска книг
    console.log("Пошук за запитом:", searchQuery);
  };
  
  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Пошук книг..."
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