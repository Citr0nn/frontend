import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CartButton.css';

const CartButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);

  // Загрузка данных из localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, [isModalOpen]);

  // Загрузка данных о книгах по ID
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookDataPromises = cartItems.map(id => 
          axios.get(`http://localhost:8000/books/${id}`)
        );
        const responses = await Promise.all(bookDataPromises);
        const books = responses.map(res => res.data);
        setBookDetails(books);
      } catch (error) {
        console.error('Помилка завантаження книг:', error);
      }
    };

    if (cartItems.length > 0) {
      fetchBooks();
    } else {
      setBookDetails([]);
    }
  }, [cartItems]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const removeFromCart = (idToRemove) => {
    const updatedCart = cartItems.filter(id => id !== idToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleModal}>
        <span className="material-icons">shopping_cart</span>
        Кошик
      </button>

      {isModalOpen && (
        <div className="cart-modal-overlay" onClick={toggleModal}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Ваш кошик</h2>
            {bookDetails.length === 0 ? (
              <p>Кошик порожній 😔</p>
            ) : (
              <ul className="cart-items-list">
                {bookDetails.map((book) => (
                  <li key={book.id} className="cart-item">
                    <img src={book.coverImageLink} alt={book.title} className="cart-book-image" />
                    <div className="cart-book-info">
                      <p className="cart-book-title">{book.title}</p>
                    </div>
                    <button 
                      className="remove-btn" 
                      onClick={() => removeFromCart(book.id)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button className="close-modal-btn" onClick={toggleModal}>Закрити</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartButton;
