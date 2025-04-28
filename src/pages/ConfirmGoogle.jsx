import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConfirmGoogle.css'; // Подключаем стили

const ConfirmGoogle = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
      localStorage.setItem('token', urlToken); // Сохраняем токен
    } else {
      alert('Токен відсутній');
      navigate('/');
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/success-google-auth', {
        username,
        token
      });
      console.log('Ім\'я успішно відправлено');
      navigate('/'); // Переход на главную
    } catch (error) {
      console.error('Помилка відправки імені', error);
      alert('Сталася помилка при відправленні. Спробуйте ще раз.');
    }
  };

  return (
    <div className="confirm-google">
      <div className="form-container">
        <h2>Введіть ваше ім'я</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Ваше ім'я" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Підтвердити</button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmGoogle;
