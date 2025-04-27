import React, { useState } from 'react';
import AuthModal from '../Auth/AuthModal';

const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // В реальном приложении состояние будет получаться из AuthContext
  
  const handleModalClose = (loginSuccess) => {
    setIsModalOpen(false);
    if (loginSuccess) {
      setIsLoggedIn(true);
    }
  };
  
  return (
    <div className="auth-button">
      {isLoggedIn ? (
        <div className="user-menu">
          <span className="material-icons">account_circle</span>
          <span>Мій профіль</span>
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