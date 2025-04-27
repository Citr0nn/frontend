// Эмуляция ответов API для категорий и книг

// Данные категорий
const categories = [
    { id: 1, name: "Художня література" },
    { id: 2, name: "Наукова література" },
    { id: 3, name: "Дитяча література" },
    { id: 4, name: "Бізнес-література" },
    { id: 5, name: "Саморозвиток" },
    { id: 6, name: "Історія" },
    { id: 7, name: "Психологія" },
    { id: 8, name: "Філософія" },
    { id: 9, name: "Фантастика" },
    { id: 10, name: "Детективи" }
  ];
  
  // Данные книг
  const books = {
    bestsellers: [
      { id: 1, title: "1984", author: "Джордж Орвелл", price: 599, imageUrl: "/api/placeholder/200/300" },
      { id: 2, title: "Майстер і Маргарита", author: "Михайло Булгаков", price: 649, imageUrl: "/api/placeholder/200/300" },
      { id: 3, title: "Злочин і кара", author: "Федір Достоєвський", price: 549, imageUrl: "/api/placeholder/200/300" },
      { id: 4, title: "Гаррі Поттер і філософський камінь", author: "Дж. К. Роулінг", price: 699, imageUrl: "/api/placeholder/200/300" },
      { id: 5, title: "Три товариші", author: "Еріх Марія Ремарк", price: 629, imageUrl: "/api/placeholder/200/300" },
      { id: 6, title: "Маленький принц", author: "Антуан де Сент-Екзюпері", price: 499, imageUrl: "/api/placeholder/200/300" },
    ],
    new: [
      { id: 7, title: "Походження", author: "Ден Браун", price: 749, imageUrl: "/api/placeholder/200/300" },
      { id: 8, title: "Тривожні люди", author: "Фредрік Бакман", price: 679, imageUrl: "/api/placeholder/200/300" },
      { id: 9, title: "Шантарам", author: "Грегорі Девід Робертс", price: 899, imageUrl: "/api/placeholder/200/300" },
      { id: 10, title: "Клуб любителів книг та пирогів", author: "Мері Енн Шаффер", price: 599, imageUrl: "/api/placeholder/200/300" },
      { id: 11, title: "Дім, в якому...", author: "Маріам Петросян", price: 849, imageUrl: "/api/placeholder/200/300" },
      { id: 12, title: "Зулейха відкриває очі", author: "Гузель Яхіна", price: 629, imageUrl: "/api/placeholder/200/300" },
    ],
    discounts: [
      { id: 13, title: "Убити пересмішника", author: "Гарпер Лі", price: 439, imageUrl: "/api/placeholder/200/300" },
      { id: 14, title: "Гордість і упередження", author: "Джейн Остін", price: 399, imageUrl: "/api/placeholder/200/300" },
      { id: 15, title: "Сто років самотності", author: "Габріель Гарсія Маркес", price: 459, imageUrl: "/api/placeholder/200/300" },
      { id: 16, title: "Тихий Дон", author: "Михайло Шолохов", price: 499, imageUrl: "/api/placeholder/200/300" },
      { id: 17, title: "Війна і мир", author: "Лев Толстой", price: 549, imageUrl: "/api/placeholder/200/300" },
      { id: 18, title: "Анна Кареніна", author: "Лев Толстой", price: 429, imageUrl: "/api/placeholder/200/300" },
    ]
  };
  
  // Имитация задержки сети
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // API для категорий
  export const getCategories = async () => {
    // Имитация сетевого запроса
    await delay(300);
    return categories;
  };
  
  // API для получения книг по секциям
  export const getBookSections = async () => {
    await delay(500);
    return [
      {
        id: 1,
        title: "Бестселери",
        books: books.bestsellers
      },
      {
        id: 2,
        title: "Новинки",
        books: books.new
      },
      {
        id: 3,
        title: "Знижки",
        books: books.discounts
      }
    ];
  };
  
  // API для получения книг в конкретной категории
  export const getBooksByCategory = async (categoryId) => {
    await delay(400);
    const allBooks = [
      ...books.bestsellers,
      ...books.new, 
      ...books.discounts
    ];
    
    // В реальном API здесь был бы фильтр по категории
    // здесь мы случайно выбираем несколько книг для имитации
    return allBooks.filter(() => Math.random() > 0.6);
  };