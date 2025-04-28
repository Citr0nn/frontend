// API функции для работы с бекендом

import axios from 'axios';

// API для категорий
export const getCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/categories');
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке категорий:", error);
    return [];
  }
};

// API для получения книг по секциям
export const getBookSections = async () => {
  try {
    const response = await axios.get('http://localhost:8000/books');
    
    // Преобразуем полученные данные в формат, ожидаемый нашими компонентами
    return [
      {
        id: 1,
        title: "Новинки",
        books: response.data.newBooks.map(item => ({
          id: item.book.id,
          title: item.book.title,
          author: item.book.authors && item.book.authors.length > 0 
            ? item.book.authors.map(author => author.fullName).join(', ') 
            : 'Автор не вказаний',
          price: item.book.discountedPrice && parseFloat(item.book.discountedPrice) > 0 
            ? parseFloat(item.book.discountedPrice) 
            : parseFloat(item.book.originalPrice),
          originalPrice: parseFloat(item.book.originalPrice),
          hasDiscount: item.book.discountedPrice && parseFloat(item.book.discountedPrice) > 0,
          imageUrl: item.book.coverImageLink || "/api/placeholder/200/300",
          favorited: item.favorited
        }))
      },
      {
        id: 2,
        title: "Знижки",
        books: response.data.salesBooks.map(item => ({
          id: item.book.id,
          title: item.book.title,
          author: item.book.authors && item.book.authors.length > 0 
            ? item.book.authors.map(author => author.fullName).join(', ') 
            : 'Автор не вказаний',
          price: parseFloat(item.book.discountedPrice),
          originalPrice: parseFloat(item.book.originalPrice),
          hasDiscount: true,
          imageUrl: item.book.coverImageLink || "/api/placeholder/200/300",
          favorited: item.favorited
        }))
      },
      {
        id: 3,
        title: "Бестселери",
        books: response.data.bestsellerBooks.map(item => ({
          id: item.book.id,
          title: item.book.title,
          author: item.book.authors && item.book.authors.length > 0 
            ? item.book.authors.map(author => author.fullName).join(', ') 
            : 'Автор не вказаний',
          price: item.book.discountedPrice && parseFloat(item.book.discountedPrice) > 0 
            ? parseFloat(item.book.discountedPrice) 
            : parseFloat(item.book.originalPrice),
          originalPrice: parseFloat(item.book.originalPrice),
          hasDiscount: item.book.discountedPrice && parseFloat(item.book.discountedPrice) > 0,
          imageUrl: item.book.coverImageLink || "/api/placeholder/200/300",
          favorited: item.favorited
        }))
      }
    ];
  } catch (error) {
    console.error("Ошибка при загрузке книг:", error);
    return [];
  }
};

// API для получения книг в конкретной категории
export const getBooksByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`http://localhost:8000/categories/${categoryId}/books`);
    return response.data.map(item => ({
      id: item.book.id,
      title: item.book.title,
      author: item.book.authors && item.book.authors.length > 0 
        ? item.book.authors.map(author => author.fullName).join(', ') 
        : 'Автор не вказаний',
      price: item.book.discountedPrice && parseFloat(item.book.discountedPrice) > 0 
        ? parseFloat(item.book.discountedPrice) 
        : parseFloat(item.book.originalPrice),
      originalPrice: parseFloat(item.book.originalPrice),
      hasDiscount: item.book.discountedPrice && parseFloat(item.book.discountedPrice) > 0,
      imageUrl: item.book.coverImageLink || "/api/placeholder/200/300",
      favorited: item.favorited
    }));
  } catch (error) {
    console.error("Ошибка при загрузке книг по категории:", error);
    return [];
  }
};