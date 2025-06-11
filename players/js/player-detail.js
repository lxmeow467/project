// Добавление обработчика ошибок для всего скрипта
(function() {
try {
  console.log('Загрузка скрипта player-detail.js, версия 2.4 (с улучшенными анимациями)');
  console.log('URL страницы:', window.location.href);
  
  // Определяем, является ли устройство мобильным (используем расширенный паттерн)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent) || 
                  (window.innerWidth <= 768) || 
                  ('ontouchstart' in window) || 
                  (navigator.maxTouchPoints > 0);
  console.log('Тип устройства:', isMobile ? 'Мобильное' : 'Десктоп');
  
  // Определяем тип хоста - Cloudflare или локальный
  const isCloudflare = window.location.hostname.includes('trycloudflare.com');
  console.log('Тип хоста:', isCloudflare ? 'Cloudflare' : 'Локальный');

  // Данные о шахматистах
  const players = [
  {
    id: 0,
    name: 'Магнус Карлсен',
    title: 'Гроссмейстер',
    rating: 2847,
    country: 'Норвегия',
    bestOpening: 'Итальянская партия',
    fideId: '1503014',
    rsfId: null,
    photoUrl: '../images/carlsen.jpg',
    bio: 'Магнус Карлсен родился 30 ноября 1990 года в Тёнсберге, Норвегия. Научился играть в шахматы в 5 лет, а в 13 лет стал гроссмейстером. В 2013 году завоевал титул чемпиона мира, победив Вишванатана Ананда, и удерживал этот титул до 2023 года. Карлсен известен своим универсальным стилем игры, феноменальной памятью и способностью извлекать преимущество из технически равных позиций. Он установил высший исторический рейтинг Эло 2882 и считается одним из величайших шахматистов всех времён.',
    achievements: 'Чемпион мира (2013-2023), многократный чемпион мира по рапиду и блицу (2014, 2015, 2019, 2022), высший исторический рейтинг 2882. Победитель более 15 супертурниров с 2010 года.',
    tournaments: 'Рекордное количество побед в супертурнирах: Вейк-ан-Зее (8 раз), Norway Chess (4 раза), турниры Grand Chess Tour, Мемориал Таля, London Chess Classic.',
    style: 'Универсальный стиль с великолепным пониманием эндшпиля и позиционной игры. Способен извлекать преимущество из равных позиций. Обладает исключительной интуицией и способностью к точным расчетам.'
  },
  {
    id: 1,
    name: 'Ян Непомнящий',
    title: 'Гроссмейстер',
    rating: 2789,
    country: 'Россия',
    bestOpening: 'Сицилианская защита',
    fideId: '4168119',
    rsfId: '34168119',
    photoUrl: '../images/Ian.jpg',
    bio: 'Ян Непомнящий родился 14 июля 1990 года в Брянске, Россия. Начал играть в шахматы с 4 лет. В юношеские годы дважды становился чемпионом Европы среди юниоров (2007, 2008). Звание гроссмейстера получил в 2007 году. В 2021 году выиграл турнир претендентов, что дало ему право сыграть матч на первенство мира против Магнуса Карлсена, который он проиграл со счётом 3.5:7.5. В 2022 году вновь выиграл турнир претендентов. Является одним из сильнейших шахматистов мира, известен острым тактическим зрением и агрессивным стилем игры.',
    achievements: 'Победитель турнира претендентов (2021, 2022), чемпион Европы (2010), двукратный чемпион России (2010, 2020), четырехкратный победитель командного чемпионата мира в составе сборной России.',
    tournaments: 'Участник матча на первенство мира против Магнуса Карлсена в 2021 году, победитель турниров в Дортмунде (2018), Лондон Шахматный классик (2019).',
    style: 'Агрессивный стиль с акцентом на острые тактические продолжения и активную игру фигурами. Известен своим умением находить нестандартные решения в сложных позициях и тонким пониманием динамических факторов.'
  },
  {
    id: 2,
    name: 'Алиреза Фирузджа',
    title: 'Гроссмейстер',
    rating: 2777,
    country: 'Франция',
    bestOpening: 'Защита Грюнфельда',
    fideId: '12573981',
    rsfId: null,
    photoUrl: '../images/alireza.jpg',
    bio: 'Алиреза Фирузджа родился 18 июня 2003 года в Иране. В 2021 году сменил шахматное гражданство на французское. Шахматный вундеркинд, который стал гроссмейстером в возрасте 14 лет и 8 месяцев. В 16 лет вошел в топ-100 шахматистов мира, а в 18 лет преодолел отметку рейтинга 2800 и стал вторым в мировом рейтинге. В декабре 2019 года выиграл чемпионат Ирана по шахматам, став самым молодым победителем в истории. В 2021 году произвел фурор, заняв второе место на престижном турнире Tata Steel в Вейк-ан-Зее, а затем выиграв Grand Swiss Tournament. Многие эксперты рассматривают его как будущего чемпиона мира.',
    achievements: 'Победитель Grand Swiss 2021, серебряный призёр Tata Steel Chess 2021, второе место на турнире претендентов 2022. Самый молодой шахматист, достигший рейтинга 2800.',
    tournaments: 'Сильнейшие выступления на турнирах Вейк-ан-Зее, Norway Chess, Grand Swiss, победа в чемпионате Ирана в 16 лет.',
    style: 'Динамичный, активный стиль игры с великолепным тактическим зрением и нестандартным мышлением. Отличается смелым и агрессивным подходом, любит сложные позиции с обоюдными шансами.'
  },
  {
    id: 3,
    name: 'Дин Лижэнь',
    title: 'Гроссмейстер',
    rating: 2780,
    country: 'Китай',
    bestOpening: 'Каталонское начало',
    fideId: '8603677',
    rsfId: null,
    photoUrl: '../images/ding.jpg',
    bio: 'Дин Лижэнь родился 24 октября 1992 года в провинции Чжэцзян, Китай. В шахматы научился играть в возрасте 4 лет. Титул гроссмейстера получил в 2009 году. Первым значительным международным успехом стала победа на чемпионате мира среди юниоров в 2009 году. В марте 2016 года вошел в топ-10 мирового рейтинга ФИДЕ. В 2019 году выиграл Кубок мира ФИДЕ. После победы в турнире претендентов 2022/23 встретился с Яном Непомнящим в матче за звание чемпиона мира и победил со счетом 8½:6½. В апреле 2023 года стал 17-м чемпионом мира по шахматам, первым из Китая. Является одним из лучших быстрых шахматистов мира.',
    achievements: 'Чемпион мира (2023-2024), победитель Кубка мира 2019, победитель турнира претендентов 2022/23, серебряный призер Олимпиады 2018 в составе сборной Китая. Первый китайский шахматист, преодолевший рубеж 2800 пунктов рейтинга.',
    tournaments: 'Победитель супертурниров в Шэньчжэне, Синкфилде. Чемпион мира среди юниоров 2009.',
    style: 'Позиционный стиль с глубоким стратегическим пониманием и точной техникой эндшпиля. Отличается хладнокровием в критических позициях и выдающейся защитной техникой.'
  },
  {
    id: 4,
    name: 'Фабиано Каруана',
    title: 'Гроссмейстер',
    rating: 2786,
    country: 'США',
    bestOpening: 'Испанская партия',
    fideId: '2020009',
    rsfId: null,
    photoUrl: '../images/caruana.jpg',
    bio: 'Фабиано Каруана родился 30 июля 1992 года в Майами, США, в итало-американской семье. Начал играть в шахматы в пять лет. В детстве жил в Бруклине, затем его семья переехала в Мадрид, а позже в Будапешт для развития его шахматной карьеры. Звание гроссмейстера получил в 14 лет и 11 месяцев. До 2015 года выступал за Италию, затем вернулся под флаг США. В 2018 году выиграл турнир претендентов, что дало ему право сыграть матч на первенство мира против Магнуса Карлсена, который завершился вничью в классических партиях (6:6), но Каруана уступил в тай-брейке. В 2014 году на супертурнире в Синкфилде показал выдающийся результат — 8,5 из 10 очков с рейтингом перформанса 3103, что является историческим достижением.',
    achievements: 'Победитель турнира претендентов 2018, участник матча на первенство мира 2018, чемпион США 2016-2018 годов. Достиг второго в истории рейтинга 2844 (октябрь 2014).',
    tournaments: 'Победитель турнира в Синкфилде 2014 с рекордными 8,5 из 10 и рейтингом перформанса 3098. Победы в Дортмунде, Вейк-ан-Зее, Лондоне и других престижных турнирах.',
    style: 'Универсальный стиль с глубокой дебютной подготовкой и точным расчетом вариантов. Отличается трудолюбием, дисциплинированным подходом к игре и умением вести сложные теоретические споры.'
  },
  {
    id: 5,
    name: 'Хикару Накамура',
    title: 'Гроссмейстер',
    rating: 2768,
    country: 'США',
    bestOpening: 'Сицилианская защита',
    fideId: '2016192',
    rsfId: null,
    photoUrl: '../images/hikaru.jpg',
    bio: 'Хикару Накамура родился 9 декабря 1987 года в Хирацуке, Япония, в семье японско-американского происхождения. В возрасте двух лет его семья переехала в США. Шахматами начал заниматься в 7 лет под руководством отчима, ФИДЕ-мастера Сунила Вишванатана. В 2003 году в возрасте 15 лет и 79 дней стал самым молодым американским гроссмейстером, побив рекорд Бобби Фишера. Пятикратный чемпион США (2005, 2009, 2012, 2015, 2019). Один из сильнейших блиц-игроков в мире. В последние годы приобрёл огромную популярность как стример на платформе Twitch, где у него более 1,5 миллиона подписчиков. Его каналы на Twitch и YouTube значительно способствовали популяризации шахмат во время пандемии COVID-19.',
    achievements: 'Пятикратный чемпион США (2005, 2009, 2012, 2015, 2019), обладатель Кубка мира по рапиду 2018, финалист Кубка мира 2015. Один из самых популярных шахматных стримеров с более чем 1,5 млн подписчиков на Twitch.',
    tournaments: 'Победитель турниров Лондон Шахматный классик, Гибралтар Мастерс, чемпион США пять раз. Многократный победитель турниров по быстрым шахматам и блицу.',
    style: 'Агрессивный, креативный стиль с великолепной игрой в блиц и быстрые шахматы. Отличное тактическое зрение и интуитивное понимание динамичных позиций. Известен смелыми жертвами и нестандартными решениями.'
  },
  {
    id: 6,
    name: 'Аниш Гири',
    title: 'Гроссмейстер',
    rating: 2760,
    country: 'Нидерланды',
    bestOpening: 'Защита Нимцовича',
    fideId: '24116068',
    rsfId: null,
    photoUrl: '../images/anish.jpg',
    bio: 'Аниш Гири родился 28 июня 1994 года в Санкт-Петербурге, Россия, в семье непальского отца и русской матери. Начал играть в шахматы в возрасте 6 лет. В 2002 году его семья переехала в Нидерланды, за которые он и выступает. Стал гроссмейстером в 2009 году в возрасте 14 лет. Многократный чемпион Нидерландов. Участник нескольких турниров претендентов. В 2015 году разделил первое место на престижном турнире в Вейк-ан-Зее. Помимо шахмат, известен своим интеллектом и лингвистическими способностями — владеет русским, английским, нидерландским и непальским языками. Имеет математическое образование. Женат на грузинской шахматистке Софико Гурамишвили, с которой воспитывает сына Даниэля.',
    achievements: 'Неоднократный чемпион Нидерландов, участник трех турниров претендентов (2016, 2020, 2022). Совместная победа на супертурнире в Вейк-ан-Зее в 2015 году. Серебряный призер шахматной олимпиады 2016 в составе команды Нидерландов.',
    tournaments: 'Победитель и призер супертурниров в Вейк-ан-Зее и других престижных соревнованиях, включая Лондон Классик и Шамкир.',
    style: 'Надежный, солидный стиль с глубоким пониманием позиции и обширными теоретическими знаниями. Известен своими энциклопедическими знаниями дебютов и аналитическим подходом к игре.'
  },
  {
    id: 7,
    name: 'Сергей Карякин',
    title: 'Гроссмейстер',
    rating: 2747,
    country: 'Россия',
    bestOpening: 'Сицилианская защита',
    fideId: '14109603',
    rsfId: '34109603',
    photoUrl: '../images/sergey.jpg',
    bio: 'Сергей Карякин родился 12 января 1990 года в Симферополе, Украина. До 2009 года выступал за Украину, затем принял российское гражданство. В 2002 году в возрасте 12 лет и 7 месяцев стал самым молодым гроссмейстером в истории шахмат, этот рекорд был побит только в 2021 году. В 2016 году выиграл турнир претендентов и сыграл матч на первенство мира против Магнуса Карлсена, в котором уступил только на тай-брейке. В том же году стал чемпионом мира по блицу. Известен как "Министр обороны" благодаря своим выдающимся защитным навыкам и умению спасать, казалось бы, безнадежные позиции. Активно пропагандирует развитие детских шахмат и много работает с юными талантами.',
    achievements: 'Участник матча на первенство мира 2016, победитель Кубка мира 2015, чемпион мира по блицу 2012. Самый молодой гроссмейстер в истории шахмат (12 лет и 7 месяцев), этот титул удерживал 19 лет.',
    tournaments: 'Победитель Norway Chess 2013 и 2014, многократный победитель командных чемпионатов мира и Европы в составе сборной России.',
    style: 'Сверхнадежный защитный стиль с исключительной выдержкой в сложных позициях. Отличное чувство опасности и способность к упорному сопротивлению в трудных позициях.'
  }
];

  // Функция для анимации появления элементов при загрузке данных
  function animateElements() {
    // Анимируем секции с небольшой задержкой для последовательного появления
    const sections = document.querySelectorAll('.player-section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 100 * (index + 1));
    });
    
    // Анимируем детали
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 100 * (index + 1) + 200);
    });
    
    // Пульсирующая анимация для фото
    const photoContainer = document.querySelector('.player-photo-container');
    if (photoContainer) {
      setTimeout(() => {
        photoContainer.classList.add('pulse-animation');
      }, 500);
    }
  }

  // Функция для создания эффекта перехода при изменении игрока
  function createTransitionEffect() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(52, 152, 219, 0.2)';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    overlay.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(overlay);
    
    // Показываем оверлей
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    // Скрываем и удаляем оверлей
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 500);
    }, 500);
  }

  // Функция для загрузки данных игрока с указанным ID
  function loadPlayerData(playerId) {
    console.log('Загрузка данных для игрока с ID:', playerId);
    
    // Создаем эффект перехода
    createTransitionEffect();
    
    // Сбрасываем анимации, устанавливая начальные значения
    const sections = document.querySelectorAll('.player-section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
    });
    
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
    });
    
    // Проверка корректности ID
    if (isNaN(playerId) || playerId < 0 || playerId >= players.length) {
      console.warn('Некорректный ID игрока:', playerId, '. Используем значение по умолчанию 0');
      playerId = 0;
    }
    
    // Получаем данные игрока
    const player = players.find(p => p.id === playerId) || players[0];
    console.log('Загружаем данные игрока:', player.name);
    
    // Задержка для эффекта загрузки
    setTimeout(() => {
      // Обновляем данные на странице
      document.getElementById('playerName').textContent = player.name;
      document.getElementById('playerTitle').textContent = player.title;
      document.getElementById('playerRating').textContent = player.rating;
      document.getElementById('playerCountry').textContent = player.country;
      document.getElementById('playerOpening').textContent = player.bestOpening;
      document.getElementById('playerFideId').textContent = player.fideId;
      
      // Обновляем фото игрока
      const photoElement = document.getElementById('playerPhoto');
      if (photoElement) {
        // Добавляем класс для затухания старого фото
        photoElement.classList.add('photo-fade');
        
        // После короткой задержки меняем фото и убираем класс
        setTimeout(() => {
          photoElement.src = player.photoUrl;
          photoElement.alt = 'Фото ' + player.name;
          photoElement.onerror = function() { this.src = '../images/placeholder.jpg'; };
          photoElement.classList.remove('photo-fade');
        }, 200);
      }
      
      // Показываем контейнер с фото
      const photoContainer = document.getElementById('photoContainer');
      if (photoContainer) {
        photoContainer.style.display = 'block';
      }
      
      // Обновляем содержимое биографии с анимацией
      const bioElement = document.getElementById('playerBio');
      if (bioElement) {
        bioElement.style.opacity = '0';
        setTimeout(() => {
          bioElement.innerHTML = `<p>${player.bio}</p>`;
          bioElement.style.opacity = '1';
        }, 200);
      }
      
      // Обновляем достижения, если есть
      if (player.achievements) {
        const achievementsElement = document.getElementById('playerAchievements');
        if (achievementsElement) {
          achievementsElement.style.opacity = '0';
          setTimeout(() => {
            achievementsElement.innerHTML = `<p>${player.achievements}</p>`;
            achievementsElement.style.opacity = '1';
          }, 250);
        }
      }
      
      // Обновляем турниры, если есть
      if (player.tournaments) {
        const tournamentsElement = document.getElementById('playerTournaments');
        if (tournamentsElement) {
          tournamentsElement.style.opacity = '0';
          setTimeout(() => {
            tournamentsElement.innerHTML = `<p>${player.tournaments}</p>`;
            tournamentsElement.style.opacity = '1';
          }, 300);
        }
      }
      
      // Обновляем стиль игры, если есть
      if (player.style) {
        const styleElement = document.getElementById('playerStyle');
        if (styleElement) {
          styleElement.style.opacity = '0';
          setTimeout(() => {
            styleElement.innerHTML = `<p>${player.style}</p>`;
            styleElement.style.opacity = '1';
          }, 350);
        }
      }
      
      // Обновляем заголовок страницы
      document.title = player.name + ' - Профиль шахматиста';
      
      // Запускаем анимацию элементов
      setTimeout(animateElements, 100);
      
      console.log('Данные игрока успешно загружены');
    }, 300);
    
    return true;
  }
  
  // Основная логика загрузки - вызывается при загрузке скрипта
  function initialize() {
    console.log('Инициализация скрипта player-detail.js');
    
    // Получаем ID игрока из хэша в URL
    let playerId = window.location.hash ? parseInt(window.location.hash.substring(1), 10) : 0;
    
    // Добавляем стили для анимаций динамически
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .detail-item {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.4s ease, transform 0.4s ease;
      }
      .photo-fade {
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }
      .pulse-animation {
        animation: pulseGlow 2s infinite;
      }
      #playerBio, #playerAchievements, #playerTournaments, #playerStyle {
        transition: opacity 0.4s ease;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Загружаем данные выбранного игрока
    loadPlayerData(playerId);
    
    // Обработчик изменения хэша
    window.addEventListener('hashchange', function() {
      console.log('Обнаружено изменение хэша URL');
      const newPlayerId = window.location.hash ? parseInt(window.location.hash.substring(1), 10) : 0;
      
      // Если ID изменился - загружаем новые данные
      if (newPlayerId !== playerId) {
        console.log('Изменен ID игрока:', newPlayerId);
        playerId = newPlayerId;
        loadPlayerData(playerId);
      }
    });
    
    console.log('Инициализация завершена успешно');
  }
  
  // Запускаем инициализацию
  initialize();
  
} catch (error) {
  console.error('Критическая ошибка в скрипте player-detail.js:', error);
  alert('Произошла ошибка при загрузке данных. Пожалуйста, обновите страницу.');
}
})();