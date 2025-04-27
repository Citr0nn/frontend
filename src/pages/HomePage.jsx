import React, { useState } from 'react';
import Header from '../components/Header/Header';
import BookSection from '../components/BookSection/BookSection';
import CategorySidebar from '../components/Sidebar/CategorySidebar';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Моковые данные для секций книг (в реальном приложении будут из API)
  const bookSections = [
    {
      id: 1,
      title: "Бестселлеры",
      books: [
        { id: 1, title: "1984", author: "Джордж Оруэлл", price: 599, imageUrl: "/api/placeholder/200/300" },
        { id: 2, title: "Мастер и Маргарита", author: "Михаил Булгаков", price: 649, imageUrl: "/api/placeholder/200/300" },
        { id: 3, title: "Преступление и наказание", author: "Федор Достоевский", price: 549, imageUrl: "/api/placeholder/200/300" },
        { id: 4, title: "Гарри Поттер и философский камень", author: "Дж. К. Роулинг", price: 699, imageUrl: "/api/placeholder/200/300" },
        { id: 5, title: "Три товарища", author: "Эрих Мария Ремарк", price: 629, imageUrl: "/api/placeholder/200/300" },
        { id: 6, title: "Маленький принц", author: "Антуан де Сент-Экзюпери", price: 499, imageUrl: "/api/placeholder/200/300" },
      ]
    },
    {
      id: 2,
      title: "Новинки",
      books: [
        { id: 7, title: "Происхождение", author: "Дэн Браун", price: 749, imageUrl: "/api/placeholder/200/300" },
        { id: 8, title: "Тревожные люди", author: "Фредрик Бакман", price: 679, imageUrl: "/api/placeholder/200/300" },
        { id: 9, title: "Шантарам", author: "Грегори Дэвид Робертс", price: 899, imageUrl: "/api/placeholder/200/300" },
        { id: 10, title: "Клуб любителей книг и пирогов", author: "Мэри Энн Шаффер", price: 599, imageUrl: "/api/placeholder/200/300" },
        { id: 11, title: "Дом, в котором...", author: "Мариам Петросян", price: 849, imageUrl: "/api/placeholder/200/300" },
        { id: 12, title: "Зулейха открывает глаза", author: "Гузель Яхина", price: 629, imageUrl: "/api/placeholder/200/300" },
      ]
    },
    {
      id: 3,
      title: "Скидки",
      books: [
        { id: 13, title: "Убить пересмешника", author: "Харпер Ли", price: 439, imageUrl: "/api/placeholder/200/300" },
        { id: 14, title: "Гордость и предубеждение", author: "Джейн Остин", price: 399, imageUrl: "/api/placeholder/200/300" },
        { id: 15, title: "Сто лет одиночества", author: "Габриэль Гарсиа Маркес", price: 459, imageUrl: "/api/placeholder/200/300" },
        { id: 16, title: "Тихий Дон", author: "Михаил Шолохов", price: 499, imageUrl: "/api/placeholder/200/300" },
        { id: 17, title: "Война и мир", author: "Лев Толстой", price: 549, imageUrl: "/api/placeholder/200/300" },
        { id: 18, title: "Анна Каренина", author: "Лев Толстой", price: 429, imageUrl: "/api/placeholder/200/300" },
      ]
    }
  ];

  return (
    <div className="home-page">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="main-content">
        {isSidebarOpen && <CategorySidebar />}
        
        <div className="book-sections">
          {bookSections.map(section => (
            <BookSection 
              key={section.id} 
              title={section.title} 
              books={section.books} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;