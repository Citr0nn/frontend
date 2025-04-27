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
          <p className="book-price">{book.price} ₽</p>
        </div>
      </Link>
      <button className="add-to-cart">В корзину</button>
    </div>
  );
};

export default BookCard;
