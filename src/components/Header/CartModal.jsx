import React, { useState } from 'react';

const CartModal = ({ cartItems, setCartItems, isOpen, onClose }) => {
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const buyItems = () => {
    // Пока просто заглушка
    alert('Покупка не реализована');
  };

  return (
    isOpen && (
      <div className="cart-modal">
        <div className="cart-modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Ваши товары в корзине</h2>
          <ul>
            {cartItems.length === 0 ? (
              <li>Корзина пуста</li>
            ) : (
              cartItems.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  <button onClick={() => removeItem(index)}>Удалить</button>
                </li>
              ))
            )}
          </ul>
          <button className="buy-button" onClick={buyItems}>Купить</button>
        </div>
      </div>
    )
  );
};

export default CartModal;
