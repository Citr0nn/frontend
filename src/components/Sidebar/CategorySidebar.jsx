import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CategorySidebar.css';

const CategorySidebar = () => {
  const navigate = useNavigate();
  
  // Состояние для хранения категорий и жанров
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  // Состояние для индикаторов загрузки
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  
  // Состояние для выбранных фильтров
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  
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
  
  // Обработчик изменения чекбокса категорий
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter(id => id !== categoryId)
        : [...prevSelected, categoryId]
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
  
  // Обработчик изменения диапазона цен
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prevRange => ({
      ...prevRange,
      [name]: parseInt(value, 10) || 0
    }));
  };
  
  // Применение фильтров
  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      queryParams.set('categories', selectedCategories.join(','));
    }
    
    if (selectedGenres.length > 0) {
      queryParams.set('genres', selectedGenres.join(','));
    }
    
    queryParams.set('minPrice', priceRange.min);
    queryParams.set('maxPrice', priceRange.max);
    
    navigate(`/search?${queryParams.toString()}`);
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
              <li key={category.id}>
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
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
              <li key={genre.id}>
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreChange(genre.id)}
                  />
                  <span>{genre.name}</span>
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