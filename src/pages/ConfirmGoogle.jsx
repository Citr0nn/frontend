import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmGoogle = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/success-google-auth', {
        username,
        token
      });
      
      // Предположим, сервер вернёт новый токен для сессии
      const { authToken, expirationTime } = response.data;

      localStorage.setItem('token', authToken);
      localStorage.setItem('tokenExpiration', expirationTime);
      
      navigate('/'); // после успешной авторизации — на главную
    } catch (error) {
      console.error('Ошибка подтверждения Google авторизации', error);
      alert('Ошибка! Попробуйте ещё раз.');
    }
  };

  if (!token) {
    return <div>Некорректная ссылка авторизации</div>;
  }

  return (
    <div className="confirm-google">
      <h2>Введите имя для завершения регистрации</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Имя пользователя" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
};

export default ConfirmGoogle;
