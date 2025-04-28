import React, { useEffect, useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [errors, setErrors] = useState({});
  const [refreshTimer, setRefreshTimer] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && expiration) {
      setupAutoRefresh(expiration);
    }

    return () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
    };
  }, [isOpen]);

  const setupAutoRefresh = (expirationTime) => {
    const now = Date.now();
    const timeLeft = Number(expirationTime) - now;

    if (timeLeft <= 0) {
      refreshToken();
      return;
    }

    const refreshTime = timeLeft - 5 * 60 * 1000; // За 5 минут до окончания

    const timer = setTimeout(() => {
      refreshToken();
    }, refreshTime > 0 ? refreshTime : 0);

    setRefreshTimer(timer);
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:8000/refresh', {
        method: 'POST',
        credentials: 'include', // важно если refresh через куки
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Не удалось обновить токен');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiration', Date.now() + data.tokenExpiration);

      setupAutoRefresh(Date.now() + data.tokenExpiration);
    } catch (error) {
      console.error('Ошибка обновления токена:', error.message);
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      onClose(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Електронна пошта обов'язкова";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат електронної пошти";
    }
    
    if (!formData.password) {
      newErrors.password = "Пароль обов'язковий";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль має містити мінімум 6 символів";
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Ім'я обов'язкове";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Підтвердження пароля обов'язкове";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Паролі не співпадають";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    try {
      const url = isLogin
        ? 'http://localhost:8000/users/login'
        : 'http://localhost:8000/users/register';
  
      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password
          }
        : {
            username: formData.name,
            email: formData.email,
            password: formData.password,
            confirmedPassword: formData.confirmPassword
          };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Щось пішло не так');
      }
  
      if (isLogin) {
        console.log('Успішний вхід', data);
        localStorage.setItem('token', data.user.token);
        
        // сохраняем время окончания токена
        const expirationTime = Date.now() + data.user.tokenExpiration; 
        localStorage.setItem('tokenExpiration', expirationTime.toString());
      
        onClose(true);
      } else {
        console.log('Успішна реєстрація', data.message);
        alert('Реєстрація успішна! Перевірте пошту для підтвердження.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Помилка:', error.message);
      alert(error.message);
    }
  };
  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/users/google';
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-button" onClick={() => onClose(false)}>
          <span className="material-icons">close</span>
        </button>
        
        <h2>{isLogin ? 'Вхід' : 'Реєстрація'}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Ім'я</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Електронна пошта</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Підтвердження пароля</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
          )}
          
          <button type="submit" className="btn-primary">
            {isLogin ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>
        
        <div className="social-login">
          <p className="or-divider">або</p>
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <span className="google-icon">G</span>
            <span>Продовжити з Google</span>
          </button>
        </div>
        
        <div className="auth-toggle">
          <p>
            {isLogin 
              ? 'Немає облікового запису?' 
              : 'Вже маєте обліковий запис?'}
            <button 
              className="toggle-button" 
              onClick={toggleForm}
            >
              {isLogin ? 'Зареєструватися' : 'Увійти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
