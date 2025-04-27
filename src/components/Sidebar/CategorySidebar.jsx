import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Импортируем axios
import './CategorySidebar.css';

const CategorySidebar = () => {
  const navigate = useNavigate();
  
  // Состояние для хранения категорий
  const [categories, setCategories] = useState([]);
  // Состояние для индикатора загрузки
  const [loading, setLoading] = useState(true);
  
  // Состояние для выбранных категорий
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Состояние для диапазона цен
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000
  });
  
  // Загрузка категорий при монтировании компонента
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories/');
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Помилка завантаження категорій:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  // Обработчик изменения чекбокса категорий
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter(id => id !== categoryId)
        : [...prevSelected, categoryId]
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
    
    queryParams.set('minPrice', priceRange.min);
    queryParams.set('maxPrice', priceRange.max);
    
    navigate(`/search?${queryParams.toString()}`);
  };
  
  return (
    <div className="category-sidebar">
      <h3>Фільтри</h3>
      
      <div className="filter-section">
        <h4>Категорії книг</h4>
        {loading ? (
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
