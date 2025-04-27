import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Здесь будет логика авторизации/регистрации
    console.log('Form submitted:', formData);
    
    // Имитация успешного входа
    onClose(true);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Сбросить форму при переключении
    setFormData({
      email: '',
      password: '',
      name: ''
    });
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
          </div>
          
          <button type="submit" className="btn-primary">
            {isLogin ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>
        
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