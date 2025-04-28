import React, { useState, useEffect } from 'react';
import AuthModal from '../Auth/AuthModal';

const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleModalClose = (loginSuccess) => {
    setIsModalOpen(false);
    if (loginSuccess) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    setIsLoggedIn(false);
  };

  return (
    <div className="auth-button">
      {isLoggedIn ? (
        <div className="user-menu" onClick={handleLogout}>
          <span className="material-icons">account_circle</span>
          <span>Мій профіль (Вийти)</span>
        </div>
      ) : (
        <button className="login-button" onClick={() => setIsModalOpen(true)}>
          <span className="material-icons">login</span>
          <span>Увійти</span>
        </button>
      )}

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
      />
    </div>
  );
};

export default AuthButton;
