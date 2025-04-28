import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <button onClick={goToHome}>
      На головну
    </button>
  );
};

export default HomeButton;
