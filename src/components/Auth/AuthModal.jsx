import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  // Состояние для ошибок валидации
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Очистка ошибки для поля при изменении значения
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Базовая валидация email
    if (!formData.email) {
      newErrors.email = "Електронна пошта обов'язкова";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат електронної пошти";
    }
    
    // Валидация пароля
    if (!formData.password) {
      newErrors.password = "Пароль обов'язковий";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль має містити мінімум 6 символів";
    }
    
    // Валидация подтверждения пароля при регистрации
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
    // Сбросить форму и ошибки при переключении
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