// Данные о дебютах
const openings = [
  {
    name: 'Сицилианская защита',
    description: 'Самый острый ответ на 1.e4. Черные немедленно борются за центр, создавая асимметричную позицию с богатой тактической игрой.',
    moves: '1.e4 c5',
    popularity: 'Очень высокая'
  },
  {
    name: 'Защита Каро-Канн',
    description: 'Надёжный и солидный дебют за черных. Создает прочную пешечную структуру и предоставляет хорошие шансы на контригру.',
    moves: '1.e4 c6',
    popularity: 'Высокая'
  },
  {
    name: 'Дебют четырёх коней',
    description: 'Классический дебют с симметричным развитием фигур. Ведет к равным шансам с обеих сторон при правильной игре.',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6',
    popularity: 'Средняя'
  },
  {
    name: 'Защита Грюнфельда',
    description: 'Гипермодернистский дебют, где черные контратакуют в центре, не занимая его пешками сразу.',
    moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5',
    popularity: 'Высокая'
  },
  {
    name: 'Английское начало',
    description: 'Гибкий фланговый дебют, позволяющий белым избежать наиболее изученных продолжений.',
    moves: '1.c4',
    popularity: 'Высокая'
  }
];

// Данные о шахматистах
const players = [
  {
    name: 'Магнус Карлсен',
    title: 'Гроссмейстер',
    rating: 2847,
    country: 'Норвегия',
    bestOpening: 'Итальянская партия',
    fideId: '1503014',
    rsfId: null
  },
  {
    name: 'Ян Непомнящий',
    title: 'Гроссмейстер',
    rating: 2789,
    country: 'Россия',
    bestOpening: 'Сицилианская защита',
    fideId: '4168119',
    rsfId: '34168119'
  },
  {
    name: 'Алиреза Фирузджа',
    title: 'Гроссмейстер',
    rating: 2777,
    country: 'Франция',
    bestOpening: 'Защита Грюнфельда',
    fideId: '12573981',
    rsfId: null
  },
  {
    name: 'Дин Лижэнь',
    title: 'Гроссмейстер',
    rating: 2780,
    country: 'Китай',
    bestOpening: 'Каталонское начало',
    fideId: '8603677',
    rsfId: null
  }
];

// Инициализация страницы с оптимизацией производительности
document.addEventListener('DOMContentLoaded', () => {
  // Определяем, является ли устройство мобильным
  const isMobile = window.innerWidth < 768;
  
  // Используем requestIdleCallback для неприоритетных задач
  // или fallback на setTimeout для браузеров без поддержки
  const scheduleTask = window.requestIdleCallback || 
    ((callback) => setTimeout(callback, 1));
  
  // Инициализируем основные компоненты с учетом приоритета
  requestAnimationFrame(() => {
    // Инициализируем форму сразу, так как она может быть в верхней части страницы
    initializeForm();
    
    // Используем Intersection Observer для отложенной загрузки компонентов
    setupLazyLoading();
    
    // Настраиваем плавную прокрутку
    setupSmoothScrolling();
    
    // Настраиваем кнопку "Начать изучение"
    setupEnrollButton();
    
    // Настраиваем мобильную навигацию
    setupMobileNavigation();
  });
});

// Настройка отложенной загрузки компонентов
function setupLazyLoading() {
  // Создаем Intersection Observer для отслеживания видимости элементов
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        // Инициализируем компоненты только когда они становятся видимыми
        if (sectionId === 'players' || entry.target.classList.contains('players-section')) {
          initializePlayers();
          observer.unobserve(entry.target);
        } else if (sectionId === 'ratings' || entry.target.classList.contains('ratings-section')) {
          initializeRatingSearch();
          observer.unobserve(entry.target);
        }
      }
    });
  }, {
    rootMargin: '100px', // Предзагрузка за 100px до появления в видимой области
    threshold: 0.1
  });
  
  // Наблюдаем за секциями
  const playerSection = document.getElementById('players') || document.querySelector('.players-section');
  const ratingSection = document.getElementById('ratings') || document.querySelector('.ratings-section');
  
  if (playerSection) observer.observe(playerSection);
  if (ratingSection) observer.observe(ratingSection);
}

// Инициализация секции шахматистов с оптимизацией
function initializePlayers() {
  const playersGrid = document.getElementById('playersGrid');
  if (!playersGrid) return;
  
  console.log("Инициализация секции шахматистов");
  
  // Создаем фрагмент для оптимизации DOM-операций
  const fragment = document.createDocumentFragment();
  
  // Разбиваем добавление карточек на батчи для предотвращения блокировки основного потока
  const batchSize = 2;
  let currentIndex = 0;
  
  function addBatch() {
    const endIndex = Math.min(currentIndex + batchSize, players.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
      const player = players[i];
      const card = document.createElement('div');
      card.className = 'player-card';
      
      // Используем шаблонные строки для оптимизации создания HTML
      card.innerHTML = `
        <h3>${player.name}</h3>
        <p>${player.title}</p>
        <p>Рейтинг: ${player.rating}</p>
        <p>${player.country}</p>
        <p>Любимый дебют: ${player.bestOpening}</p>
      `;
      
      // Добавляем анимацию с помощью CSS вместо JavaScript
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.transitionDelay = `${i * 0.05}s`;
      
      // Используем will-change для оптимизации анимации
      card.style.willChange = 'opacity, transform';
      
      fragment.appendChild(card);
    }
    
    // Если это первый батч, добавляем фрагмент в DOM
    if (currentIndex === 0) {
      playersGrid.appendChild(fragment);
    }
    
    // Запускаем анимацию появления карточек
    requestAnimationFrame(() => {
      const cards = playersGrid.querySelectorAll('.player-card');
      for (let i = currentIndex; i < endIndex; i++) {
        if (cards[i]) {
          cards[i].style.opacity = '1';
          cards[i].style.transform = 'translateY(0)';
        }
      }
    });
    
    currentIndex = endIndex;
    
    // Если есть еще карточки, планируем следующий батч
    if (currentIndex < players.length) {
      requestAnimationFrame(addBatch);
    } else {
      // После добавления всех карточек сбрасываем will-change для экономии ресурсов
      setTimeout(() => {
        const cards = playersGrid.querySelectorAll('.player-card');
        cards.forEach(card => {
          card.style.willChange = 'auto';
        });
      }, 1000);
    }
  }
  
  // Запускаем добавление первого батча
  requestAnimationFrame(addBatch);
}

// Функционал поиска рейтингов ФШР и FIDE удалён по просьбе пользователя

// Инициализация формы обратной связи с валидацией
function initializeForm() {
  const form = document.getElementById('supportForm');
  if (!form) return;
  
  console.log("Инициализация формы обратной связи");
  
  // Предварительная валидация формы
  const validateForm = () => {
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    // Простая валидация полей
    if (nameInput && !nameInput.value.trim()) {
      isValid = false;
    }
    
    if (emailInput && !isEmailValid(emailInput.value)) {
      isValid = false;
    }
    
    if (messageInput && !messageInput.value.trim()) {
      isValid = false;
    }
    
    return isValid;
  };
  
  // Проверка валидности email
  const isEmailValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Используем requestAnimationFrame для плавного отображения сообщения
      requestAnimationFrame(() => {
        alert('Спасибо за ваше сообщение! Мы рассмотрим его в ближайшее время.');
        form.reset();
      });
    } else {
      alert('Пожалуйста, заполните все поля корректно.');
    }
  });
}

// Настройка кнопки "Начать изучение"
function setupEnrollButton() {
  const enrollButton = document.getElementById('enrollButton');
  const aboutSection = document.getElementById('about');

  if (enrollButton && aboutSection) {
    enrollButton.addEventListener('click', () => {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Настройка плавной прокрутки с оптимизацией производительности
function setupSmoothScrolling() {
  const anchors = document.querySelectorAll('a[href^="#"]:not([href="index.html"])');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Используем requestAnimationFrame для плавной анимации
        requestAnimationFrame(() => {
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        });
      }
    });
  });
  
  // Оптимизация обработки прокрутки
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        // Здесь можно добавить логику, зависящую от прокрутки
        // Например, анимацию появления элементов при прокрутке
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// Настройка мобильной навигации
function setupMobileNavigation() {
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  
  // Обработка кликов по элементам мобильной навигации
  mobileNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Удаляем класс active у всех элементов
      mobileNavItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // Добавляем класс active к текущему элементу
      this.classList.add('active');
      
      // Если ссылка ведет на якорь на текущей странице
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Используем requestAnimationFrame для плавной анимации
          requestAnimationFrame(() => {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          });
        }
      }
    });
  });
  
  // Обновление активного элемента при прокрутке страницы
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateActiveNavItem();
        ticking = false;
      });
      
      ticking = true;
    }
  });
  
  // Функция для обновления активного элемента навигации
  function updateActiveNavItem() {
    const scrollPosition = window.scrollY;
    
    // Получаем все секции на странице
    const sections = document.querySelectorAll('section[id]');
    
    // Находим текущую видимую секцию
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Удаляем класс active у всех элементов
        mobileNavItems.forEach(item => {
          item.classList.remove('active');
        });
        
        // Находим соответствующий элемент навигации и делаем его активным
        const activeNavItem = document.querySelector(`.mobile-nav-item[href="#${sectionId}"]`);
        if (activeNavItem) {
          activeNavItem.classList.add('active');
        }
      }
    });
  }
  
  // Инициализация активного элемента при загрузке страницы
  updateActiveNavItem();
}

// Обработка кликов по ссылкам на главную страницу
document.addEventListener('DOMContentLoaded', function() {
  const mainPageLinks = document.querySelectorAll('a[href="index.html"], a[href="index.html#about"]');
  
  mainPageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'index.html';
      window.scrollTo(0, 0);
    });
  });
});