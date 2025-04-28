import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/search`, {
        params: { text: searchQuery }  // <-- правильная передача параметра
      });
      console.log("Результаты поиска:", response.data);
      setResults(response.data);  // сохраняем полученные данные
    } catch (error) {
      console.error("Ошибка поиска:", error);
    }
  };
  
  return (
    <>
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

      {/* Отображение результатов поиска */}
      <div className="search-results">
        {results.map((book) => (
          <div key={book.id}>
            {book.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
