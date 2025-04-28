import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  // Функция для добавления книги в LocalStorage
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // если пусто, создаём новый массив
    if (!cart.includes(book.id)) { // не добавлять повторно одну и ту же книгу
      cart.push(book.id);
      localStorage.setItem('cart', JSON.stringify(cart)); // сохраняем обратно
    }
  };

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`}>
        <div className="book-cover">
          <img src={book.imageUrl} alt={book.title} />
        </div>
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <div className="book-price-container">
            {book.hasDiscount && (
              <span className="book-original-price">{book.originalPrice} ₴</span>
            )}
            <p className="book-price">{book.price} ₴</p>
          </div>
        </div>
      </Link>
      <button className="add-to-cart" onClick={addToCart}>
        До кошика
      </button>
    </div>
  );
};

export default BookCard;
