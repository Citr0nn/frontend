import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResultsPage.css'; // Добавьте это в начало компонента
import Header from '../components/Header/Header';  // Добавим хедер, если он у вас есть

const SearchResultsPage = () => {
  const location = useLocation();
  const { books } = location.state || { books: [] };

  return (
    <div className="search-results-page">
      {/* Хедер остается на странице */}
      <Header />

      <div className="result">
        <h2>Результати пошуку</h2>
      </div>
      {books.length === 0 ? (
        <p>Немає знайдених книг за вашим запитом.</p>
      ) : (
        <div className="books-list">
          {books.map((book) => (
            <div key={book.book.id} className="book-item">
              <div className="book-image">
                <img src={book.book.coverImageLink} alt={book.book.title} />
              </div>
              <div className="book-info">
                <h3>{book.book.title}</h3>
                <p>Автор: {book.book.authors.map((author) => author.fullName).join(', ')}</p>
                <p>Ціна: {book.book.discountedPrice} грн</p>
                <p>Опис: {book.book.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
