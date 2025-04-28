import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && expiration) {
      const now = Date.now();
      if (now < Number(expiration)) {
        setIsAuthenticated(true);

        // Автоматический выход через timeout
        const timeout = Number(expiration) - now;
        const timer = setTimeout(() => {
          logout();
        }, timeout);

        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    setIsAuthenticated(false);
    console.log('Токен истёк. Пользователь разлогинен.');
  };

  return (
    <Router>
      <div className="app">
        {/* Для теста покажем статус */}
        

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
