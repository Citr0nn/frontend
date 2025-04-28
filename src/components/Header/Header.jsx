import React from 'react';
import SearchBar from './SearchBar';
import AuthButton from './AuthButton';
import CartButton from './CartButton';
import HomeButton from './HomeButton';
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
        <button className="sidebar-toggle" onClick={HomeButton}>
            <span className="material-icons">home</span>
            <span>Chapter One</span>
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