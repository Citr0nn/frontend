import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CartButton = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Получаем товары из localStorage при загрузке компонента
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  return (
    <Link to="#" className="cart-button" onClick={() => setCartItems(JSON.parse(localStorage.getItem('cart')) || [])}>
      <span className="material-icons">shopping_cart</span>
      <span>Кошик</span>
      {cartItems.length > 0 && <span className="cart-counter">{cartItems.length}</span>}
    </Link>
  );
};

export default CartButton;
