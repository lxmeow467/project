// Данные о дебютах
const openings = [
  {
    id: 0,
    name: 'Сицилианская защита',
    description: 'Самый острый ответ на 1.e4. Черные немедленно борются за центр, создавая асимметричную позицию с богатой тактической игрой.',
    moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6',
    popularity: 'Очень высокая',
    style: 'tactical',
    position: 'open',
    risk: 'high',
    color: 'black',
    level: 'intermediate',
    timeRequired: 'moderate',
    category: 'полуоткрытый',
    history: 'Сицилианская защита - один из старейших дебютов, впервые упомянутый в шахматной литературе в 16 веке. Название происходит от итальянского шахматиста Пьетро Карреры из Сицилии, который анализировал этот дебют в 1617 году. Популярность дебюта значительно возросла в 20 веке благодаря его использованию такими чемпионами мира, как Михаил Таль, Гарри Каспаров и Бобби Фишер.',
    ideas: 'Основная идея Сицилианской защиты - асимметричная борьба за центр. Вместо прямого противостояния пешке e4 ходом e5, черные атакуют центр сбоку ходом c5. Это создает дисбаланс в пешечной структуре и часто приводит к динамичной игре с обоюдными шансами. Черные обычно стремятся к контригре на ферзевом фланге, в то время как белые часто атакуют на королевском фланге.',
    variations: [
      {
        name: 'Вариант Найдорфа',
        moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6',
        description: 'Один из самых популярных и теоретически нагруженных вариантов Сицилианской защиты. Ход a6 готовит продвижение b5 и развитие слона на b7.',
        url: '/openings/variations sicilian/najdorf.html'
      },
      {
        name: 'Вариант Дракона',
        moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6',
        description: 'Агрессивный вариант, где черные фианкеттируют слона на g7, создавая мощную диагональ h8-a1, напоминающую дракона.',
        url: '/openings/variations sicilian/dragon.html'
      },
      {
        name: 'Московский вариант',
        moves: '1.e4 c5 2.Nf3 d6 3.Bb5+',
        description: 'Альтернативный вариант, где белые развивают слона на b5 с шахом, создавая угрозу и вынуждая защитную реакцию черных.',
        url: '/openings/variations sicilian/moscowskiy.html'
      },
      {
        name: 'Классический вариант',
        moves: '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 d6',
        description: 'Солидное продолжение с развитием фигур и борьбой в центре.',
        url: '/openings/variations sicilian/sicilian_classical.html'
      },
      {
        name: 'Челябинский вариант',
        moves: '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5',
        description: 'Агрессивный вариант, где черные немедленно контратакуют в центре с ходом e5.',
        url: '/openings/variations sicilian/sicilian_scheveningen.html'
      },
      {
        name: 'Вариант Паульсена',
        moves: '1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6',
        description: 'Позиционный вариант, где черные откладывают развитие коня на f6 и готовят продвижение b5.',
        url: '/openings/variations sicilian/sicilian_paulsen.html'
      },
      {
        name: 'Ранний Дракон',
        moves: '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6',
        description: 'Упрощенная версия варианта Дракона, где черные сразу начинают фианкеттирование слона.',
        url: '/openings/variations sicilian/sicilian_early_dragon.html'
      },
      {
        name: 'Вариант Россолимо',
        moves: '1.e4 c5 2.Nf3 Nc6 3.Bb5',
        description: 'Альтернатива основным линиям Сицилианской защиты, где белые развивают слона на b5, атакуя коня на c6.',
        url: '/openings/variations sicilian/sicilian_rossolimo.html'
      }
    ]
  },
  {
    id: 1,
    name: 'Защита Каро-Канн',
    description: 'Надёжный и солидный дебют за черных. Создает прочную пешечную структуру и предоставляет хорошие шансы на контригру.',
    moves: '1.e4 c6',
    popularity: 'Высокая',
    style: 'Позиционный',
    position: 'Закрытая',
    risk: 'Низкий',
    color: 'Черные',
    level: 'Начальный',
    timeRequired: 'minimal',
    category: 'полуоткрытый',
    history: 'Защита Каро-Канн названа в честь двух шахматистов: Горацио Каро и Маркуса Канна, которые анализировали этот дебют в 1880-х годах. Дебют стал особенно популярен в 20 веке и считается одним из самых надежных ответов на 1.e4.',
    ideas: 'Основная идея защиты Каро-Канн - создать прочную пешечную структуру и затем контратаковать в центре. Черные сначала укрепляют пешку d5 ходом c6, а затем развивают фигуры для контригры. Этот дебют часто ведет к позиционной игре с долгосрочными стратегическими планами.',
    variations: [
      {
        name: 'Классический вариант',
        moves: '1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Ng3 Bg6 6.h4 h6',
        description: 'Основной вариант, где черные развивают чернопольного слона на f5 и готовятся к долгой позиционной борьбе.'
      },
      {
        name: 'Вариант Панова-Ботвинника',
        moves: '1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 e6 6.Nf3',
        description: 'Агрессивный вариант, где белые стремятся к изолированной пешке d5 и активной фигурной игре. Часто ведет к острым позициям с обоюдными шансами.'
      },
      {
        name: 'Вариант с 3.e5',
        moves: '1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 Nd7',
        description: 'Белые захватывают пространство в центре, а черные готовятся к подрыву пешечной цепи белых. Ведет к закрытым позициям с маневренной борьбой.'
      },
      {
        name: 'Атака Фантазии',
        moves: '1.e4 c6 2.d4 d5 3.f3 dxe4 4.fxe4 e5 5.Nf3 Bg4 6.Bc4',
        description: 'Редкий, но острый вариант, где белые жертвуют пешку для быстрого развития и атаки. Требует точной игры от обеих сторон.'
      },
      {
        name: 'Система двух коней',
        moves: '1.e4 c6 2.Nf3 d5 3.Nc3 dxe4 4.Nxe4 Nf6 5.Qe2 Nxe4 6.Qxe4',
        description: 'Простой вариант с быстрым развитием коней. Белые стремятся к небольшому, но стабильному преимуществу в дебюте.'
      }
    ]
  },
  {
    id: 2,
    name: 'Дебют четырёх коней',
    description: 'Классический дебют с симметричным развитием фигур. Ведет к равным шансам с обеих сторон при правильной игре.',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6',
    popularity: 'Средняя',
    style: 'universal',
    position: 'neutral',
    risk: 'medium',
    color: 'both',
    level: 'beginner',
    timeRequired: 'minimal',
    category: 'открытый',
    url: 'four-knights.html',
    history: 'Дебют четырех коней - один из старейших шахматных дебютов, известный еще с 16 века. Он был особенно популярен в 19 веке, когда шахматисты стремились к быстрому развитию фигур и контролю центра. В современной практике этот дебют встречается реже, но остается солидным выбором для начинающих игроков.',
    ideas: 'Основная идея дебюта четырех коней - быстрое развитие легких фигур и борьба за центр. Обе стороны развивают коней на естественные поля, создавая симметричную позицию. Дальнейшая игра часто зависит от выбора плана в середине игры, так как дебют предоставляет равные шансы обеим сторонам.',
    variations: [
      {
        name: 'Испанский вариант',
        moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bb5 Bb4 5.O-O O-O 6.d3',
        description: 'Спокойный вариант с развитием слона на b5, напоминающий испанскую партию. Ведет к равной позиции с небольшими стратегическими нюансами.'
      },
      {
        name: 'Шотландский вариант',
        moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.d4 exd4 5.Nxd4 Bb4 6.Nxc6 bxc6',
        description: 'Активный вариант с ранним продвижением d4, создающий открытую позицию с обоюдными возможностями для атаки.'
      },
      {
        name: 'Симметричный вариант',
        moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bc4 Bc5 5.O-O O-O 6.d3 d6',
        description: 'Классическое продолжение с развитием слонов на естественные поля. Позиция остается симметричной с равными шансами.'
      },
      {
        name: 'Вариант Рубинштейна',
        moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bb5 Nd4 5.Ba4 Bc5 6.Nxe5 O-O',
        description: 'Острый вариант, где черные жертвуют пешку за активную фигурную игру и атаку на короля белых.'
      }
    ]
  },
  {
    id: 3,
    name: 'Защита Грюнфельда',
    description: 'Гипермодернистский дебют, где черные контратакуют в центре, не занимая его пешками сразу.',
    moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5',
    popularity: 'Высокая',
    style: 'tactical',
    position: 'open',
    risk: 'medium',
    color: 'black',
    level: 'advanced',
    timeRequired: 'extensive',
    category: 'закрытый',
    url: 'grunfeld.html',
    history: 'Защита Грюнфельд названа в честь австрийского гроссмейстера Эрнста Грюнфельда, который впервыше применил ее в 1922 году. Дебют стал особенно популярен в 1970-х и 1980-х годах благодаря его использованию Гарри Каспаровым и Анатолием Карповым в их матчах на первенство мира.',
    ideas: 'Основная идея защиты Грюнфельда - позволить белым создать мощный пешечный центр, а затем атаковать его фигурами. Черные фианкеттируют слона на g7 и оказывают давление на центр ходом d5. После разменов в центре черные стремятся использовать силу дальнобойного слона g7 и активность фигур для контригры.',
    variations: [
      {
        name: 'Классический вариант с 4.Bg5',
        moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.Bg5 Ne4 5.Bh4 Nxc3 6.bxc3 dxc4',
        description: 'Острый вариант с ранним развитием слона на g5. Белые стремятся к активной фигурной игре и давлению на черных.'
      },
      {
        name: 'Русская система',
        moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.Nf3 Bg7 5.Qb3 dxc4 6.Qxc4 O-O 7.e4',
        description: 'Агрессивный вариант, где белые быстро возвращают пожертвованную пешку и стремятся к атаке на королевском фланге.'
      },
      {
        name: 'Вариант разменов',
        moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 Bg7 7.Bc4',
        description: 'Прямолинейный вариант с ранними разменами в центре. Белые получают пространственное преимущество и инициативу.'
      },
      {
        name: 'Венгерский вариант',
        moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.Nf3 Bg7 5.Bf4 O-O 6.Rc1 c5',
        description: 'Позиционный вариант с развитием слона на f4. Белые стремятся к небольшому, но стабильному преимуществу в дебюте.'
      },
      {
        name: 'Система Смыслова',
        moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.Nf3 Bg7 5.Qb3 dxc4 6.Qxc4 O-O 7.Bf4',
        description: 'Гибкий вариант, где белые развивают слона на f4 и сохраняют напряжение в центре. Ведет к сложной стратегической борьбе.'
      }
    ]
  },
  {
    id: 7,
    name: 'Ферзевый гамбит',
    description: 'Классический дебют, где белые жертвуют пешку для быстрого развития и контроля центра.',
    moves: '1.d4 d5 2.c4',
    popularity: 'Высокая',
    style: 'universal',
    position: 'neutral',
    risk: 'medium',
    color: 'white',
    level: 'intermediate',
    timeRequired: 'moderate',
    category: 'закрытый',
    url: 'queens-gambit.html',
    history: 'Ферзевый гамбит - один из старейших дебютов, известный еще с 15 века. Он стал особенно популярен в начале 20 века благодаря матчам за звание чемпиона мира между Ласкером и Капабланкой. В современной практике это один из основных способов борьбы белых против 1...d5.',
    ideas: 'Основная идея ферзевого гамбита - пожертвовать пешку c4 для быстрого развития фигур и контроля центра. Белые стремятся к активной фигурной игре и давлению на позицию черных. В большинстве случаев черные возвращают пешку, но получают равную игру.',
    variations: [
      {
        name: 'Принятый ферзевый гамбит',
        moves: '1.d4 d5 2.c4 dxc4 3.Nf3 Nf6 4.e3 e6 5.Bxc4 c5 6.O-O',
        description: 'Черные принимают жертву пешки, но белые быстро возвращают ее, получая активную фигурную игру.'
      },
      {
        name: 'Отказанный ферзевый гамбит (ортодоксальная защита)',
        moves: '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7 5.e3 O-O 6.Nf3 Nbd7',
        description: 'Классический вариант, где черные отказываются от взятия пешки c4 и строят солидную позицию с пешкой на e6.'
      },
      {
        name: 'Славянская защита',
        moves: '1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 dxc4 5.a4 Bf5 6.e3 e6',
        description: 'Черные укрепляют пешку d5 ходом c6, создавая прочную пешечную структуру. Один из самых надежных ответов на ферзевый гамбит.'
      },
      {
        name: 'Полуславянская защита',
        moves: '1.d4 d5 2.c4 e6 3.Nc3 c6 4.Nf3 Nf6 5.e3 Nbd7 6.Bd3 dxc4 7.Bxc4',
        description: 'Гибридный вариант, сочетающий элементы славянской защиты и отказанного ферзевого гамбита. Ведет к сложной стратегической борьбе.'
      },
      {
        name: 'Тарраша защита',
        moves: '1.d4 d5 2.c4 e6 3.Nc3 c5 4.cxd5 exd5 5.Nf3 Nc6 6.g3 Nf6',
        description: 'Черные немедленно контратакуют в центре ходом c5, создавая асимметричную пешечную структуру с динамичной игрой.'
      }
    ]
  }
];

// Делаем массив доступным глобально
window.openings = openings;

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
  initializeOpenings();
  initializeQuiz();
  const chessboard = Chessboard('chessboard', {
    position: 'start'
  });
  const chess = new Chess();

  function loadOpening(openingId) {
    const opening = openings.find(o => o.id === openingId);
    const moves = opening.moves.split(' ');
    const moveList = document.getElementById('moveList');
    moveList.innerHTML = '';

    moves.forEach(move => {
      const moveItem = document.createElement('li');
      moveItem.textContent = move;
      moveItem.onclick = () => makeMove(move);
      moveList.appendChild(moveItem);
    });
  }

  function makeMove(move) {
    if (chess.move(move)) {
      chessboard.position(chess.fen());
    }
  }
});

// Инициализация секции дебютов
function initializeOpenings() {
  const openingsGrid = document.getElementById('openingsGrid');
  const filterButtons = document.querySelectorAll('.filter-button');
  
  // Функция для отображения дебютов с фильтрацией по категории
  function displayOpenings(category = 'all') {
    // Очищаем текущее содержимое сетки
    openingsGrid.innerHTML = '';
    
    // Фильтруем дебюты по категории
    const filteredOpenings = category === 'all' 
      ? openings 
      : openings.filter(opening => opening.category === category);
    
    // Если нет дебютов, соответствующих фильтру
    if (filteredOpenings.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'Дебютов, соответствующих выбранному фильтру, не найдено.';
      openingsGrid.appendChild(noResults);
      return;
    }
    
    // Отображаем отфильтрованные дебюты
    filteredOpenings.forEach((opening, index) => {
      const card = document.createElement('div');
      card.className = 'opening-card';
      
      // Создаем содержимое карточки
      let cardContent = `
        <h3>${opening.name}</h3>
        <p>${opening.description}</p>
      `;
      
      // Проверяем, является ли дебют Московским вариантом для особого отображения ходов
      if (opening.name === 'Московский вариант') {
        cardContent += `
          <p><strong>Ходы:</strong> 1.e4 c5 2.Nf3 d6 3.Bb5+</p>
        `;
      } else {
        cardContent += `
          <p><strong>Ходы:</strong> ${opening.moves}</p>
        `;
      }
      
      cardContent += `
        <p><strong>Популярность:</strong> ${opening.popularity}</p>
        <p><strong>Категория:</strong> ${opening.category || 'Не указана'}</p>
      `;
      
      card.innerHTML = cardContent;
      
      // Исправляем обработчик клика для корректного перехода на страницу с деталями дебюта
      card.addEventListener('click', () => {
        // Явная проверка для дебюта четырёх коней
        if (opening.name === 'Дебют четырёх коней') {
          window.location.href = 'four-knights.html';
          return;
        }
        // Проверяем наличие URL для варианта и переходим по нему
        if (opening.id === 0) { // Для Сицилианской защиты переходим на страницу деталей
          window.location.href = `openings/variations sicilian/opening-detail.html`;
        } else if (opening.id === 1) { // Для Защиты Каро-Канн переходим на специальную страницу
          window.location.href = `openings/caro-kann/opening-detail.html`;
        } else if (opening.variations && opening.variations.length > 0 && opening.variations[0].url) {
          window.location.href = opening.variations[0].url;
        } else if (opening.url) {
          window.location.href = opening.url;
        } else {
          // Для других дебютов
          window.location.href = `openings-detail.html?id=${opening.id}`;
        }
      });
      
      // Добавляем стиль курсора, чтобы показать, что карточка кликабельна
      card.style.cursor = 'pointer';
      
      openingsGrid.appendChild(card);
    });
  }
  
  // Добавляем обработчики событий для кнопок фильтрации
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Удаляем класс active у всех кнопок
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Добавляем класс active к нажатой кнопке
      button.classList.add('active');
      
      // Получаем категорию из атрибута data-category
      const category = button.getAttribute('data-category');
      
      // Отображаем дебюты с выбранной категорией
      displayOpenings(category);
    });
  });
  
  // Инициализируем отображение всех дебютов при загрузке страницы
  displayOpenings();
}

// Инициализация анкеты
function initializeQuiz() {
  const submitButton = document.getElementById('submit-quiz');
  const restartButton = document.getElementById('restart-quiz');
  const quizForm = document.getElementById('quiz-form');
  const quizResult = document.getElementById('quiz-result');
  const recommendedOpening = document.getElementById('recommended-opening');

  submitButton.addEventListener('click', () => {
    // Собираем ответы пользователя
    const position = document.querySelector('input[name="position"]:checked')?.value;
    const style = document.querySelector('input[name="style"]:checked')?.value;
    const time = document.querySelector('input[name="time"]:checked')?.value;
    const risk = document.querySelector('input[name="risk"]:checked')?.value;
    const level = document.querySelector('input[name="level"]:checked')?.value;
    const color = document.querySelector('input[name="color"]:checked')?.value;
    const priority = document.querySelector('input[name="priority"]:checked')?.value;

    // Проверяем, что на все вопросы даны ответы
    if (!position || !style || !time || !risk || !level || !color || !priority) {
      alert('Пожалуйста, ответьте на все вопросы');
      return;
    }

    // Находим подходящий дебют
    const recommendedOpenings = findRecommendedOpenings({
      position,
      style,
      timeRequired: time,
      risk,
      level,
      color
    });

    // Отображаем результат
    if (recommendedOpenings.length > 0) {
      // Выбираем лучший дебют из списка рекомендованных
      const bestOpening = recommendedOpenings[0];
      
      recommendedOpening.innerHTML = `
        <h4>${bestOpening.name}</h4>
        <p>${bestOpening.description}</p>
        <p><strong>Ходы:</strong> ${bestOpening.moves}</p>
        <p><strong>Популярность:</strong> ${bestOpening.popularity}</p>
        <p><strong>Почему этот дебют подходит вам:</strong> Этот дебют соответствует вашим предпочтениям 
        по стилю игры (${getStyleDescription(bestOpening.style)}), 
        отношению к риску (${getRiskDescription(bestOpening.risk)}) 
        и уровню подготовки (${getLevelDescription(bestOpening.level)}).</p>
      `;

      // Если есть другие рекомендации, показываем их тоже
      if (recommendedOpenings.length > 1) {
        recommendedOpening.innerHTML += `
          <p><strong>Также стоит обратить внимание на:</strong></p>
          <ul>
            ${recommendedOpenings.slice(1, 3).map(opening => `
              <li>${opening.name} - ${opening.description.substring(0, 100)}...</li>
            `).join('')}
          </ul>
        `;
      }
    } else {
      recommendedOpening.innerHTML = `
        <p>К сожалению, мы не смогли подобрать дебют, точно соответствующий вашим критериям. 
        Попробуйте изменить некоторые параметры.</p>
      `;
    }

    // Показываем результат
    quizForm.style.display = 'none';
    quizResult.style.display = 'block';
  });

  restartButton.addEventListener('click', () => {
    // Сбрасываем форму
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.checked = false;
    });

    // Показываем форму снова
    quizResult.style.display = 'none';
    quizForm.style.display = 'block';
  });
}

// Функция для поиска рекомендуемых дебютов
function findRecommendedOpenings(preferences) {
  // Создаем систему оценки для каждого дебюта
  const scoredOpenings = openings.map(opening => {
    let score = 0;

    // Оцениваем соответствие по каждому критерию
    if (opening.position === preferences.position) score += 2;
    if (opening.style === preferences.style) score += 3; // Стиль игры - важный критерий
    if (opening.timeRequired === preferences.timeRequired) score += 1;
    if (opening.risk === preferences.risk) score += 2;
    if (opening.level === preferences.level) score += 2;
    if (opening.color === preferences.color || opening.color === 'both') score += 1;

    return { ...opening, score };
  });

  // Сортируем дебюты по убыванию оценки
  return scoredOpenings
    .sort((a, b) => b.score - a.score)
    .filter(opening => opening.score > 5); // Отбираем только те, которые набрали достаточно баллов
}

// Вспомогательные функции для описания характеристик
function getStyleDescription(style) {
  switch (style) {
    case 'tactical': return 'тактический';
    case 'positional': return 'позиционный';
    case 'universal': return 'универсальный';
    default: return style;
  }
}

function getRiskDescription(risk) {
  switch (risk) {
    case 'low': return 'низкий уровень риска';
    case 'medium': return 'умеренный риск';
    case 'high': return 'высокий уровень риска';
    default: return risk;
  }
}

function getLevelDescription(level) {
  switch (level) {
    case 'beginner': return 'начинающий';
    case 'intermediate': return 'средний';
    case 'advanced': return 'продвинутый';
    default: return level;
  }
}

// Example: Load the first opening
loadOpening(0);