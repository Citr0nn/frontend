import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategorySidebar.css';

const CategorySidebar = () => {
  const navigate = useNavigate();
  
  // Моковые данные для категорий
  const categories = [
    { id: 1, name: "Художественная литература" },
    { id: 2, name: "Научная литература" },
    { id: 3, name: "Детская литература" },
    { id: 4, name: "Бизнес-литература" },
    { id: 5, name: "Саморазвитие" },
    { id: 6, name: "История" },
    { id: 7, name: "Психология" },
    { id: 8, name: "Философия" },
    { id: 9, name: "Фантастика" },
    { id: 10, name: "Детективы" }
  ];
  
  // Состояние для выбранных категорий
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Состояние для диапазона цен
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000
  });
  
  // Обработчик изменения чекбокса категорий
  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  // Обработчик изменения диапазона цен
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({
      ...priceRange,
      [name]: parseInt(value)
    });
  };
  
  // Применение фильтров
  const applyFilters = () => {
    // Формирование URL с параметрами
    const queryParams = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      queryParams.set('categories', selectedCategories.join(','));
    }
    
    queryParams.set('minPrice', priceRange.min);
    queryParams.set('maxPrice', priceRange.max);
    
    // Перенаправление на страницу с фильтрами
    navigate(`/search?${queryParams.toString()}`);
  };
  
  return (
    <div className="category-sidebar">
      <h3>Фильтры</h3>
      
      <div className="filter-section">
        <h4>Категории книг</h4>
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
      </div>
      
      <div className="filter-section">
        <h4>Цена</h4>
        <div className="price-slider">
          <div className="price-inputs">
            <div>
              <label htmlFor="min-price">От:</label>
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
              max="10000"
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
        Применить фильтры
      </button>
    </div>
  );
};

export default CategorySidebar;