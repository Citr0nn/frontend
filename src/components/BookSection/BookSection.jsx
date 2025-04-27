import React from 'react';
import BookCard from './BookCard';
import HorizontalScroller from './HorizontalScroller';
import './BookSection.css';

const BookSection = ({ title, books }) => {
  return (
    <div className="book-section">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="view-all">Дивитися всі</button>
      </div>
      
      <HorizontalScroller>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </HorizontalScroller>
    </div>
  );
};

export default BookSection;