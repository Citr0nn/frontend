import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import BookSection from '../components/BookSection/BookSection';
import CategorySidebar from '../components/Sidebar/CategorySidebar';
import { getBookSections } from '../api/bookstoreApi';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookSections, setBookSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadBookSections = async () => {
      try {
        const data = await getBookSections();
        setBookSections(data);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження секцій книг:", error);
        setError("Не вдалося завантажити книги. Спробуйте пізніше.");
        setLoading(false);
      }
    };
    
    loadBookSections();
  }, []);

  return (
    <div className="home-page">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="main-content" style={{ display: 'flex' }}>
        {isSidebarOpen && <CategorySidebar />}
        
        <div className="book-sections" style={{ 
          flex: 1, 
          paddingLeft: isSidebarOpen ? '270px' : '20px',
          transition: 'padding-left 0.3s'
        }}>
          {loading ? (
            <div className="loading" style={{ 
              textAlign: 'center', 
              padding: '50px',
              fontSize: '18px'
            }}>
              Завантаження книг...
            </div>
          ) : error ? (
            <div className="error" style={{ 
              textAlign: 'center', 
              padding: '50px',
              color: 'red',
              fontSize: '18px'
            }}>
              {error}
            </div>
          ) : (
            bookSections.map(section => (
              section.books.length > 0 && (
                <BookSection 
                  key={section.id} 
                  title={section.title} 
                  books={section.books} 
                />
              )
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;