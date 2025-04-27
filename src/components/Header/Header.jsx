import React from 'react';
import SearchBar from './SearchBar';
import AuthButton from './AuthButton';
import CartButton from './CartButton';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="sidebar-toggle" 
          onClick={onToggleSidebar}
        >
          <span className="material-icons">menu</span>
          <span>Категорії</span>
        </button>
      </div>
      
      <div className="header-center">
        <SearchBar />
      </div>
      
      <div className="header-right">
        <AuthButton />
        <CartButton />
      </div>
    </header>
  );
};

export default Header;