import React, { useEffect, useState } from 'react';
import AuthModal from '../Auth/AuthModal';

const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && expiration) {
      const now = Date.now();
      if (now < Number(expiration)) {
        setIsLoggedIn(true);
      } else {
        // Токен истек
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        setIsLoggedIn(false);
      }
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
    window.location.reload();
  };

  return (
    <div className="auth-button">
      {isLoggedIn ? (
        <div className="user-menu" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <span className="material-icons">account_circle</span>
          <span>Вийти з профілю</span>
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
