import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CategorySidebar.css';

const CategorySidebar = () => {
  const navigate = useNavigate();
  
  // Состояние для хранения категорий и жанров
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Состояние для индикаторов загрузки
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [loadingPublishers, setLoadingPublishers] = useState(true);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  
  // Состояние для выбранных фильтров
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  
  // Состояние для диапазона цен
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000
  });
  
  // Загрузка категорий при монтировании компонента
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories');
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Помилка завантаження категорій:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    
    loadCategories();
  }, []);
  
  // Загрузка жанров при монтировании компонента
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await axios.get('http://localhost:8000/genres/');
        const data = response.data;
        setGenres(data);
      } catch (error) {
        console.error("Помилка завантаження жанрів:", error);
      } finally {
        setLoadingGenres(false);
      }
    };
    
    loadGenres();
  }, []);

//мови
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/languages');
        const data = response.data;
        setLanguages(data);
      } catch (error) {
        console.error("Помилка завантаження мов:", error);
      } finally {
        setLoadingLanguages(false);
      }
    };
    
    loadLanguages();
  }, []);
  
  //издательства
  useEffect(() => {
    const loadPublishers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/publishers');
        const data = response.data.authors;
        setPublishers(data);
      } catch (error) {
        console.error("Помилка завантаження видавництв:", error);
      } finally {
        setLoadingPublishers(false);
      }
    };
    
    loadPublishers();
  }, []);

  //авторы
  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/authors');
        const data = response.data.authors;
        setAuthors(data);
      } catch (error) {
        console.error("Помилка завантаження авторів:", error);
      } finally {
        setLoadingAuthors(false);
      }
    };
    
    loadAuthors();
  }, []);

  // Обработчик изменения чекбокса категорий
  const handleCategoryChange = (categoryName) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(categoryName)
        ? prevSelected.filter(id => id !== categoryName)
        : [...prevSelected, categoryName]
    );
  };
  
  // Обработчик изменения чекбокса жанров
  const handleGenreChange = (genreId) => {
    setSelectedGenres(prevSelected =>
      prevSelected.includes(genreId)
        ? prevSelected.filter(id => id !== genreId)
        : [...prevSelected, genreId]
    );
  };

  // Обработчик изменения чекбокса языков
  const handleLanguagesChange = (languageId) => {
    setSelectedLanguages(prevSelected =>
      prevSelected.includes(languageId)
        ? prevSelected.filter(id => id !== languageId)
        : [...prevSelected, languageId]
    );
  };

  // Обработчик изменения чекбокса издателей
  const handlePublishersChange = (publisherId) => {
    setSelectedPublishers(prevSelected =>
      prevSelected.includes(publisherId)
        ? prevSelected.filter(id => id !== publisherId)
        : [...prevSelected, publisherId]
    );
  };

  // Обработчик изменения чекбокса издателей
  const handleAuthorsChange = (authorId) => {
    setSelectedAuthors(prevSelected =>
      prevSelected.includes(authorId)
        ? prevSelected.filter(id => id !== authorId)
        : [...prevSelected, authorId]
    );
  };
  
  // Обработчик изменения диапазона цен
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prevRange => ({
      ...prevRange,
      [name]: parseInt(value, 10) || 0
    }));
  };
  
  // Применение фильтров
  const applyFilters = async () => {
  if (selectedCategories.length === 0) {
    alert("Оберіть хоча б одну категорію.");
    return;
  }

  const category = selectedCategories[0]; // или обработка нескольких позже
  const queryParams = new URLSearchParams();

  if (selectedGenres.length > 0) {
    queryParams.set('genre', selectedGenres[0]); // адаптируй под множественный выбор при необходимости
  }

  if (selectedLanguages.length > 0) {
    queryParams.set('language', selectedLanguages[0]);
  }

  if (selectedAuthors.length > 0) {
    queryParams.set('authors', selectedAuthors.join(','));
  }

  if (selectedPublishers.length > 0) {
    queryParams.set('publishers', selectedPublishers.join(','));
  }

  queryParams.set('price', `${priceRange.min}-${priceRange.max}`);

  try {
    const response = await axios.get(
      `http://localhost:8000/books/category/${encodeURIComponent(category)}?${queryParams.toString()}`
    );
    const books = response.data.books;

    navigate(`/books/category/${category}?${queryParams.toString()}`, {
      state: { books }
    });
  } catch (error) {
    console.error('Помилка при отриманні книг:', error);
  }
};

  
  
  return (
    <div className="category-sidebar">
      <h3>Фільтри</h3>
      
      <div className="filter-section">
        <h4>Категорії книг</h4>
        {loadingCategories ? (
          <p>Завантаження категорій...</p>
        ) : (
          <ul className="categories-list">
            {categories.map(category => (
              <li key={category.name}>
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                  />
                  <span>{category.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="filter-section">
        <h4>Жанри</h4>
        {loadingGenres ? (
          <p>Завантаження жанрів...</p>
        ) : (
          <ul className="categories-list">
            {genres.map(genre => (
              <li key={genre.name}>
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.name)}
                    onChange={() => handleGenreChange(genre.name)}
                  />
                  <span>{genre.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filter-section">
        <h4>Мови</h4>
        {loadingLanguages ? (
          <p>Завантаження мов...</p>
        ) : (
          <ul className="categories-list">
            {languages.map(languages => (
              <li key={languages.name}>
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(languages.name)}
                    onChange={() => handleLanguagesChange(languages.name)}
                  />
                  <span>{languages.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filter-section">
        <h4>Видавництва</h4>
        {loadingPublishers ? (
          <p>Завантаження видавництв...</p>
        ) : (
          <ul className="categories-list">
            {publishers.map(publishers => (
              <li key={publishers.name}>
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedPublishers.includes(publishers.name)}
                    onChange={() => handlePublishersChange(publishers.name)}
                  />
                  <span>{publishers.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filter-section">
        <h4>Автори</h4>
        {loadingAuthors ? (
          <p>Завантаження авторів...</p>
        ) : (
          <ul className="categories-list">
            {authors.map(authors => (
              <li key={authors.fullName}>
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedAuthors.includes(authors.fullName)}
                    onChange={() => handleAuthorsChange(authors.fullName)}
                  />
                  <span>{authors.fullName}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="filter-section">
        <h4>Ціна</h4>
        <div className="price-slider">
          <div className="price-inputs">
            <div>
              <label htmlFor="min-price">Від:</label>
              <input
                type="number"
                id="min-price"
                name="min"
                min="0"
                max={priceRange.max}
                value={priceRange.min}
                onChange={handlePriceChange}
              />
            </div>
            <div>
              <label htmlFor="max-price">До:</label>
              <input
                type="number"
                id="max-price"
                name="max"
                min={priceRange.min}
                value={priceRange.max}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          
          <div className="range-sliders">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.min}
              name="min"
              onChange={handlePriceChange}
              className="range-slider"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              name="max"
              onChange={handlePriceChange}
              className="range-slider"
            />
          </div>
        </div>
      </div>
      
      <button className="apply-filters-btn" onClick={applyFilters}>
        Застосувати фільтри
      </button>
    </div>
  );
};

export default CategorySidebar;