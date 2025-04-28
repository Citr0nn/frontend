import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
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
      <button className="add-to-cart">До кошика</button>
    </div>
  );
};

export default BookCard;