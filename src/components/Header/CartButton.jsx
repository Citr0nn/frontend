import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CartButton.css';

const CartButton = () => {
  const [cartBooks, setCartBooks] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  const [orderData, setOrderData] = useState({
    username: '',
    lastName: '',
    phoneNumber: '',
    Email: '',
    city: '',
    paymentMethod: 'card',
    deliveryMethod: 'Nova Poshta',
    branchAddress: ''
  });

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    fetchBooks(cartItems);
  }, []);

  const fetchBooks = async (ids) => {
    try {
      const books = await Promise.all(ids.map(async (id) => {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        return response.data;
      }));
      setCartBooks(books);
      calculateTotalSum(books);
    } catch (error) {
      console.error('Помилка завантаження книг:', error);
    }
  };

  const calculateTotalSum = (books) => {
    const total = books.reduce((sum, book) => {
      const price = Number(book.discountedPrice) > 0
        ? Number(book.discountedPrice)
        : Number(book.originalPrice);
      return sum + price;
    }, 0);
    setTotalSum(total);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartBooks.filter(book => book.id !== id);
    setCartBooks(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.map(book => book.id)));
    calculateTotalSum(updatedCart);
  };

  const handleOrder = () => {
    setIsCartOpen(false);
    setIsOrderFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async () => {
    const payload = {
      ...orderData,
      totalSum: totalSum,
      books: cartBooks.map(book => book.id.toString()),
      quantityOfBooks: cartBooks.length,
    };
    console.log('Данные отправки заказа:', payload);
  
    try {
      const response = await axios.post('http://localhost:8000/orders/checkout', payload);
      console.log('Ответ от сервера:', response.data);
  
      const orderId = response.data; // сервер вернул строку
  
      if (!orderId) {
        throw new Error('Сервер не вернул ID заказа');
      }
  
      // Перенаправляем пользователя на оплату
      window.location.href = `http://localhost:8000/payments/pay/${orderId}`;
  
      // (код ниже уже не выполнится после редиректа)
    } catch (error) {
      console.error('Помилка при оформленні або оплаті:', error);
      alert('Сталася помилка. Замовлення не завершено.');
    }
  };
  

  

  return (
    <>
      <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
        🛒 Кошик
      </button>

      {isCartOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ваш кошик</h2>
            <ul className="cart-list">
              {cartBooks.map(book => (
                <li key={book.id} className="cart-item">
                  <img src={book.imageUrl} alt={book.title} className="cart-book-image" />
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
            <p>Сума: {totalSum.toFixed(2)} ₴</p>
            <div className="cart-buttons">
              <button onClick={handleOrder} className="order-btn">Замовити</button>
              <button onClick={() => setIsCartOpen(false)} className="close-btn">Закрити</button>
            </div>
          </div>
        </div>
      )}

      {isOrderFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Оформлення замовлення</h2>
            <form className="order-form">
              <input type="text" name="username" placeholder="Ім'я" value={orderData.username} onChange={handleInputChange} required />
              <input type="text" name="lastName" placeholder="Прізвище" value={orderData.lastName} onChange={handleInputChange} required />
              <input type="tel" name="phoneNumber" placeholder="Телефон" value={orderData.phoneNumber} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={orderData.email} onChange={handleInputChange} required />
              <input type="text" name="city" placeholder="Місто" value={orderData.city} onChange={handleInputChange} required />
              <select name="paymentMethod" value={orderData.paymentMethod} onChange={handleInputChange}>
                <option value="card">Картка</option>
                <option value="cash">Готівка</option>
              </select>
              <select name="deliveryMethod" value={orderData.deliveryMethod} onChange={handleInputChange}>
                <option value="Nova Poshta">Нова Пошта</option>
                <option value="pickup">Самовивіз</option>
              </select>
              <input type="text" name="branchAddress" placeholder="Адреса відділення" value={orderData.branchAddress} onChange={handleInputChange} required />
              <div className="order-buttons">
                <button type="button" onClick={handleSubmitOrder} className="submit-btn">Підтвердити замовлення</button>
                <button type="button" onClick={() => {
                  setIsOrderFormOpen(false);
                  setIsCartOpen(true);
                }} className="back-btn">Назад до кошика</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CartButton;
