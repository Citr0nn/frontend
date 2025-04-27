import React, { useState } from 'react';

const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // В реальном приложении состояние будет получаться из AuthContext
  
  return (
    <div className="auth-button">
      {isLoggedIn ? (
        <div className="user-menu">
          <span className="material-icons">account_circle</span>
          <span>Мой профиль</span>
        </div>
      ) : (
        <button className="login-button">
          <span className="material-icons">login</span>
          <span>Войти</span>
        </button>
      )}
    </div>
  );
};

export default AuthButton;