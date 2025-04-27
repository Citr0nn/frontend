// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import BookSection from '../components/BookSection/BookSection';
import CategorySidebar from '../components/Sidebar/CategorySidebar';
import { getBookSections } from '../api/bookstoreApi';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookSections, setBookSections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadBookSections = async () => {
      try {
        const data = await getBookSections();
        setBookSections(data);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження секцій книг:", error);
        setLoading(false);
      }
    };
    
    loadBookSections();
  }, []);

  return (
    <div className="home-page">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="main-content">
        {isSidebarOpen && <CategorySidebar />}
        
        <div className="book-sections">
          {loading ? (
            <div className="loading">Завантаження книг...</div>
          ) : (
            bookSections.map(section => (
              <BookSection 
                key={section.id} 
                title={section.title} 
                books={section.books} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;