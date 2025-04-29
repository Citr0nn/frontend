// FilteredBooksPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './FilteredBooksPage.css'; // подключим стили отдельно

const FilteredBooksPage = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = decodeURIComponent(window.location.pathname.split('/').pop());

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const query = searchParams.toString();
        const response = await axios.get(`http://localhost:8000/books/category/${category}?${query}`);
        setBooks(response.data.books || []);
      } catch (error) {
        console.error('Помилка завантаження книг:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category, searchParams]);

  return (
    <div className="filtered-books-page">
      <h2 className="page-title">Результати пошуку: {category}</h2>

      {loading ? (
        <p>Завантаження книг...</p>
      ) : books.length === 0 ? (
        <p>Книги не знайдено за заданими параметрами.</p>
      ) : (
        <div className="book-list">
          {books.map(({ book, favorited }) => (
            <div className="book-card" key={book.id}>
              <img src={book.coverImageLink} alt={book.title} className="book-image" />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p><strong>Автор:</strong> {book.authors.map(a => a.fullName).join(', ')}</p>
                <p><strong>Мова:</strong> {book.language.name}</p>
                <p><strong>Ціна:</strong> {book.discountedPrice} грн <del>{book.originalPrice} грн</del></p>
                <p><strong>Рік:</strong> {book.publicationYear}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredBooksPage;
