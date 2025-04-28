import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();  // Используем navigate для редиректа

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/books/search`, {
        params: { text: searchQuery }
      });
      console.log("Результаты поиска:", response.data);
      
      // Перенаправляем на страницу с результатами
      const results = response.data.books;
      navigate('/search-results', { state: { books: results } });
    } catch (error) {
      console.error("Ошибка поиска:", error);
    }
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
