import React from 'react';
import { Link } from 'react-router-dom';

const CartButton = () => {
  // В реальном приложении данные корзины будут получаться из CartContext
  const cartItems = 0;
  
  return (
    <Link to="/cart" className="cart-button">
      <span className="material-icons">shopping_cart</span>
      <span>Корзина</span>
      {cartItems > 0 && <span className="cart-counter">{cartItems}</span>}
    </Link>
  );
};

export default CartButton;