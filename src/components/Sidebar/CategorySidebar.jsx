import React from 'react';
import { Link } from 'react-router-dom';
import './CategorySidebar.css';

const CategorySidebar = () => {
  // Моковые данные для категорий (в реальном приложении будут из API)
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
  
  return (
    <div className="category-sidebar">
      <h3>Категории книг</h3>
      <ul className="categories-list">
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
