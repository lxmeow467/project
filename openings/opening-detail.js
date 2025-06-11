document.addEventListener('DOMContentLoaded', () => {
    // Проверяем загрузку необходимых библиотек
    if (typeof Chess === 'undefined' || typeof Chessboard === 'undefined') {
        console.error('Chess.js или Chessboard.js не загружены');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const openingId = urlParams.get('id');
    
    // Проверяем наличие openings
    if (typeof openings === 'undefined') {
        console.error('Массив openings не определен');
        return;
    }
    
    if (openingId !== null && openings[openingId]) {
        const opening = openings[openingId];
        
        // Проверяем наличие контейнеров перед инициализацией
        const boardContainer = document.getElementById('chessboard');
        const movesList = document.getElementById('movesList');
        
        if (!boardContainer || !movesList) {
            console.error('Контейнеры для доски или списка ходов не найдены');
            return;
        }

        // Инициализация доски
        try {
            initializeChessBoard(opening);
            console.log('Доска успешно инициализирована');
        } catch (error) {
            console.error('Ошибка при инициализации доски:', error);
        }
        
        // Инициализация вариантов дебюта
        try {
            initializeVariations(opening);
            console.log('Варианты дебюта успешно инициализированы');
        } catch (error) {
            console.error('Ошибка при инициализации вариантов дебюта:', error);
        }
        
        // Заполняем основную информацию о дебюте
        document.getElementById('openingName').textContent = opening.name;
        document.getElementById('openingMoves').textContent = opening.moves;
        document.getElementById('openingPopularity').textContent = opening.popularity;
        document.getElementById('openingStyle').textContent = opening.style;
        document.getElementById('openingPosition').textContent = opening.position;
        document.getElementById('openingRisk').textContent = opening.risk;
        document.getElementById('openingColor').textContent = opening.color;
        document.getElementById('openingLevel').textContent = opening.level;
        
        // Заполняем историю дебюта
        if (opening.history) {
            document.getElementById('openingHistory').textContent = opening.history;
        }
        
        // Заполняем ключевые идеи
        if (opening.ideas) {
            document.getElementById('openingIdeas').textContent = opening.ideas;
        }
        
        // Заполняем варианты
        if (opening.variations && opening.variations.length > 0) {
            const variationsContainer = document.getElementById('openingVariations');
            variationsContainer.innerHTML = '';
            
            opening.variations.forEach(variation => {
                const variationElement = document.createElement('div');
                variationElement.className = 'variation';
                
                // Проверяем, есть ли URL для варианта
                if (variation.url) {
                    // Если есть URL, делаем заголовок кликабельным
                    variationElement.innerHTML = `
                        <h4><a href="${variation.url}" class="variation-link">${variation.name}</a></h4>
                        <p><strong>Ходы:</strong> ${variation.moves}</p>
                        <p>${variation.description}</p>
                    `;
                } else {
                    // Если URL нет, оставляем обычный заголовок
                    variationElement.innerHTML = `
                        <h4>${variation.name}</h4>
                        <p><strong>Ходы:</strong> ${variation.moves}</p>
                        <p>${variation.description}</p>
                    `;
                }
                
                variationsContainer.appendChild(variationElement);
            });
        }
        }
        
        // Заполняем примерные партии
        if (opening.games && opening.games.length > 0) {
            const gamesContainer = document.getElementById('openingGames');
            gamesContainer.innerHTML = '';
            
            opening.games.forEach(game => {
                const gameElement = document.createElement('div');
                gameElement.className = 'game';
                gameElement.innerHTML = `
                    <p><strong>${game.white}</strong> - <strong>${game.black}</strong>, ${game.year}, ${game.result}</p>
                    <a href="${game.link}" target="_blank" rel="noopener noreferrer">Посмотреть партию</a>
                `;
                gamesContainer.appendChild(gameElement);
            });
        }
        
        // Обновляем интерактивную доску Lichess, если есть URL
        if (opening.lichessBoardUrl) {
            // Добавляем параметры для улучшения отображения доски
            let boardUrl = opening.lichessBoardUrl;
            // Добавляем параметры только если их еще нет в URL
            if (!boardUrl.includes('?')) {
                boardUrl += '?theme=brown&bg=dark&pieceSet=cburnett&boardSize=large&hideMoveAfter=true&analysisMode=true&showWhoIsOnline=false&showTimestamps=false&showComments=false&showTactic=false&showCaptured=false&showComputer=true&showTablebase=true&showExplorer=false&showMoveAnnotation=false&showPlayerRatings=false&menu=false&clocks=false&controlsOnBoard=false';
            } else {
                // Если URL уже содержит параметры, добавляем дополнительные параметры
                boardUrl += '&hideMoveAfter=true&menu=false&clocks=false&controlsOnBoard=false';
            }
            document.getElementById('lichessBoard').src = boardUrl;
        }
    else {
        // Обработка ошибки - дебют не найден
        document.getElementById('openingName').textContent = 'Дебют не найден';
        document.getElementById('openingMoves').textContent = '';
    }
});

/**
 * Инициализирует шахматную доску с ходами дебюта
 * @param {Object} opening - Объект с информацией о дебюте
 */
function initializeChessBoard(opening) {
    // Создаем экземпляр шахматной игры
    const chess = new Chess();
    
    // Получаем ходы дебюта и преобразуем их в массив
    const movesString = opening.moves;
    const movesArray = movesString.split(/\s+/).filter(move => move.match(/^\d+\./) === null && move.trim() !== '');
    
    // Создаем массив позиций для каждого хода
    const positions = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'];
    
    // Применяем каждый ход и сохраняем позицию
    for (let i = 0; i < movesArray.length; i++) {
        try {
            chess.move(movesArray[i]);
            positions.push(chess.fen());
        } catch (error) {
            console.error(`Ошибка при выполнении хода ${movesArray[i]}:`, error);
        }
    }
    
    // Сбрасываем шахматную игру в начальное положение
    chess.reset();
    
    // Инициализируем доску
    const board = Chessboard('chessboard', {
        position: 'start',
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
    });
    
    // Текущий индекс хода
    let currentMoveIndex = 0;
    
    // Функция для обновления доски
    function updateBoard(index) {
        if (index >= 0 && index < positions.length) {
            board.position(positions[index]);
            currentMoveIndex = index;
            
            // Обновляем выделение текущего хода в списке
            const moveElements = document.querySelectorAll('.move-notation');
            moveElements.forEach((el, i) => {
                if (i === index - 1) {
                    el.classList.add('current-move');
                } else {
                    el.classList.remove('current-move');
                }
            });
        }
    }
    
    // Создаем список ходов
    const movesList = document.getElementById('movesList');
    movesList.innerHTML = '';
    
    // Форматируем и отображаем ходы
    let moveNumber = 1;
    let moveRow = document.createElement('div');
    moveRow.className = 'move-row';
    
    // Добавляем номер хода
    const moveNumberSpan = document.createElement('span');
    moveNumberSpan.className = 'move-number';
    moveNumberSpan.textContent = moveNumber + '.';
    moveRow.appendChild(moveNumberSpan);
    
    for (let i = 0; i < movesArray.length; i++) {
        // Создаем элемент для хода
        const moveElement = document.createElement('span');
        moveElement.className = 'move-notation ' + (i % 2 === 0 ? 'white' : 'black');
        moveElement.textContent = movesArray[i];
        moveElement.dataset.index = i + 1; // +1 потому что первая позиция - начальная
        
        // Добавляем обработчик клика
        moveElement.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            updateBoard(index);
        });
        
        moveRow.appendChild(moveElement);
        
        // Если это ход черных, создаем новую строку для следующего номера хода
        if (i % 2 === 1) {
            movesList.appendChild(moveRow);
            moveNumber++;
            
            // Создаем новую строку для следующего хода
            moveRow = document.createElement('div');
            moveRow.className = 'move-row';
            
            // Добавляем номер хода
            const moveNumberSpan = document.createElement('span');
            moveNumberSpan.className = 'move-number';
            moveNumberSpan.textContent = moveNumber + '.';
            moveRow.appendChild(moveNumberSpan);
        }
    }
    
    // Добавляем последнюю строку, если она не пустая
    if (moveRow.childNodes.length > 1) {
        movesList.appendChild(moveRow);
    }
    
    // Настраиваем кнопки управления
    document.getElementById('startBtn').addEventListener('click', function() {
        updateBoard(0);
    });
    
    document.getElementById('prevBtn').addEventListener('click', function() {
        if (currentMoveIndex > 0) {
            updateBoard(currentMoveIndex - 1);
        }
    });
    
    document.getElementById('nextBtn').addEventListener('click', function() {
        if (currentMoveIndex < positions.length - 1) {
            updateBoard(currentMoveIndex + 1);
        }
    });
    
    document.getElementById('endBtn').addEventListener('click', function() {
        updateBoard(positions.length - 1);
    });
}

/**
 * Инициализирует варианты дебюта с шахматной доской
 * @param {Object} opening - Объект с информацией о дебюте
 */
function initializeVariations(opening) {
    // Проверяем наличие вариантов
    if (!opening.variations || opening.variations.length === 0) {
        // Если вариантов нет, скрываем блок с вариантами
        const variationsDisplay = document.querySelector('.variations-display');
        if (variationsDisplay) {
            variationsDisplay.style.display = 'none';
        }
        return;
    }
    
    // Получаем контейнер для табов вариантов
    const variationTabs = document.getElementById('variationTabs');
    if (!variationTabs) {
        console.error('Контейнер для табов вариантов не найден');
        return;
    }
    
    // Очищаем контейнер
    variationTabs.innerHTML = '';
    
    // Создаем табы для каждого варианта
    opening.variations.forEach((variation, index) => {
        const tab = document.createElement('button');
        tab.className = 'variation-tab' + (index === 0 ? ' active' : '');
        tab.textContent = variation.name;
        tab.dataset.index = index;
        
        // Добавляем обработчик клика
        tab.addEventListener('click', function() {
            // Удаляем класс active у всех табов
            document.querySelectorAll('.variation-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Добавляем класс active текущему табу
            this.classList.add('active');
            
            // Инициализируем доску с выбранным вариантом
            initializeVariationBoard(opening.variations[this.dataset.index]);
        });
        
        variationTabs.appendChild(tab);
    });
    
    // Инициализируем доску с первым вариантом
    initializeVariationBoard(opening.variations[0]);
}

/**
 * Инициализирует шахматную доску для выбранного варианта дебюта
 * @param {Object} variation - Объект с информацией о варианте дебюта
 */
function initializeVariationBoard(variation) {
    // Создаем экземпляр шахматной игры
    const chess = new Chess();
    
    // Получаем ходы варианта и преобразуем их в массив
    const movesString = variation.moves;
    const movesArray = movesString.split(/\s+/).filter(move => move.match(/^\d+\./) === null && move.trim() !== '');
    
    // Создаем массив позиций для каждого хода
    const positions = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'];
    
    // Применяем каждый ход и сохраняем позицию
    for (let i = 0; i < movesArray.length; i++) {
        try {
            chess.move(movesArray[i]);
            positions.push(chess.fen());
        } catch (error) {
            console.error(`Ошибка при выполнении хода ${movesArray[i]}:`, error);
        }
    }
    
    // Сбрасываем шахматную игру в начальное положение
    chess.reset();
    
    // Инициализируем доску
    const board = Chessboard('variationBoard', {
        position: 'start',
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
    });
    
    // Текущий индекс хода
    let currentMoveIndex = 0;
    
    // Функция для обновления доски
    function updateBoard(index) {
        if (index >= 0 && index < positions.length) {
            board.position(positions[index]);
            currentMoveIndex = index;
            
            // Обновляем выделение текущего хода в списке
            const moveElements = document.querySelectorAll('.variation-move-notation');
            moveElements.forEach((el, i) => {
                if (i === index - 1) {
                    el.classList.add('current-move');
                } else {
                    el.classList.remove('current-move');
                }
            });
        }
    }
    
    // Создаем список ходов
    const movesList = document.getElementById('variationMovesList');
    movesList.innerHTML = '';
    
    // Форматируем и отображаем ходы
    let moveNumber = 1;
    let moveRow = document.createElement('div');
    moveRow.className = 'move-row';
    
    // Добавляем номер хода
    const moveNumberSpan = document.createElement('span');
    moveNumberSpan.className = 'move-number';
    moveNumberSpan.textContent = moveNumber + '.';
    moveRow.appendChild(moveNumberSpan);
    
    for (let i = 0; i < movesArray.length; i++) {
        // Создаем элемент для хода
        const moveElement = document.createElement('span');
        moveElement.className = 'move-notation variation-move-notation ' + (i % 2 === 0 ? 'white' : 'black');
        moveElement.textContent = movesArray[i];
        moveElement.dataset.index = i + 1; // +1 потому что первая позиция - начальная
        
        // Добавляем обработчик клика
        moveElement.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            updateBoard(index);
        });
        
        moveRow.appendChild(moveElement);
        
        // Если это ход черных, создаем новую строку для следующего номера хода
        if (i % 2 === 1) {
            movesList.appendChild(moveRow);
            moveNumber++;
            
            // Создаем новую строку для следующего хода
            moveRow = document.createElement('div');
            moveRow.className = 'move-row';
            
            // Добавляем номер хода
            const moveNumberSpan = document.createElement('span');
            moveNumberSpan.className = 'move-number';
            moveNumberSpan.textContent = moveNumber + '.';
            moveRow.appendChild(moveNumberSpan);
        }
    }
    
    // Добавляем последнюю строку, если она не пустая
    if (moveRow.childNodes.length > 1) {
        movesList.appendChild(moveRow);
    }
    
    // Настраиваем кнопки управления
    document.getElementById('varStartBtn').addEventListener('click', function() {
        updateBoard(0);
    });
    
    document.getElementById('varPrevBtn').addEventListener('click', function() {
        if (currentMoveIndex > 0) {
            updateBoard(currentMoveIndex - 1);
        }
    });
    
    document.getElementById('varNextBtn').addEventListener('click', function() {
        if (currentMoveIndex < positions.length - 1) {
            updateBoard(currentMoveIndex + 1);
        }
    });
    
    document.getElementById('varEndBtn').addEventListener('click', function() {
        updateBoard(positions.length - 1);
    });
    
    // Показываем конечную позицию
    updateBoard(positions.length - 1);
}

// Данные о дебютах
const openings = [
    {
      id: 0,
      name: 'Сицилианская защита',
      description: 'Самый острый ответ на 1.e4. Черные немедленно борются за центр, создавая асимметричную позицию с богатой тактической игрой.',
      moves: '1.e4 c5',
      popularity: 'Очень высокая',
      style: 'Тактический',
      position: 'Открытая',
      risk: 'Высокий',
      color: 'Черные',
      level: 'Средний',
      timeRequired: 'Умеренно',
      history: 'Сицилианская защита - один из старейших дебютов, впервые упомянутый в шахматной литературе в 16 веке. Название происходит от итальянского шахматиста Пьетро Карреры из Сицилии, который анализировал этот дебют в 1617 году. Популярность дебюта значительно возросла в 20 веке благодаря его использованию такими чемпионами мира, как Михаил Таль, Гарри Каспаров и Бобби Фишер.',
      ideas: 'Основная идея Сицилианской защиты - асимметричная борьба за центр. Вместо прямого противостояния пешке e4 ходом e5, черные атакуют центр сбоку ходом c5. Это создает дисбаланс в пешечной структуре и часто приводит к динамичной игре с обоюдными шансами. Черные обычно стремятся к контригре на ферзевом фланге, в то время как белые часто атакуют на королевском фланге.',
      variations: [
        {
          name: 'Вариант Найдорфа',
          moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6',
          description: 'Один из самых острых и теоретически нагруженных вариантов Сицилианской защиты. Черные готовят продвижение b5 и развитие слона на b7.'
        },
        {
          name: 'Вариант Дракона',
          moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6',
          description: 'Агрессивный вариант, где черные фианкеттируют слона на g7, создавая мощную диагональ h8-a1, напоминающую дракона.'
        },
        {
          name: 'Вариант Свешникова',
          moves: '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5',
          description: 'Современный вариант, где черные сразу борются за центр ходом e5, создавая динамичную игру с обоюдными шансами.'
        }
      ],
      games: [
        {
          white: 'Гарри Каспаров',
          black: 'Вишванатан Ананд',
          year: '1995',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1018574'
        },
        {
          white: 'Бобби Фишер',
          black: 'Борис Спасский',
          year: '1972',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1044366'
        }
      ],
      lichessBoardUrl: 'https://lichess.org/study/embed/XtFCFYlM/GCUTf1EY'
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
      timeRequired: 'Минимально',
      history: 'Защита Каро-Канн названа в честь двух шахматистов 19 века - Горацио Каро и Маркуса Канна, которые анализировали этот дебют в 1880-х годах. Дебют стал особенно популярен в 20 веке, когда его часто использовали чемпионы мира Хосе Рауль Капабланка и Анатолий Карпов.',
      ideas: 'Основная идея защиты Каро-Канн - создание солидной пешечной структуры перед развитием фигур. Ход c6 готовит продвижение d5, после чего черные стремятся к равной игре путем размена центральных пешек. Этот дебют считается одним из самых надежных ответов на 1.e4, хотя и менее динамичным, чем Сицилианская защита.',
      variations: [
        {
          name: 'Классический вариант',
          moves: '1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4',
          description: 'Основной вариант, где черные стремятся к равной позиции через размены в центре.'
        },
        {
          name: 'Вариант Панова',
          moves: '1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4',
          description: 'Агрессивный вариант, где белые атакуют центр черных и стремятся к преимуществу в дебюте.'
        },
        {
          name: 'Вариант защиты',
          moves: '1.e4 c6 2.d4 d5 3.Nd2',
          description: 'Спокойный вариант, где белые избегают немедленных разменов и готовят длительную позиционную борьбу.'
        }
      ],
      games: [
        {
          white: 'Гарри Каспаров',
          black: 'Анатолий Карпов',
          year: '1984',
          result: '0-1',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1067317'
        },
        {
          white: 'Магнус Карлсен',
          black: 'Вишванатан Ананд',
          year: '2013',
          result: '1/2-1/2',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1737460'
        }
      ],
      lichessBoardUrl: 'https://lichess.org/study/embed/XtFCFYlM/GCUTf1EY'
    },
    {
      id: 2,
      name: 'Дебют четырёх коней',
      description: 'Классический дебют с симметричным развитием фигур. Ведет к равным шансам с обеих сторон при правильной игре.',
      moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6',
      popularity: 'Средняя',
      style: 'Универсальный',
      position: 'Нейтральная',
      risk: 'Средний',
      color: 'Оба',
      level: 'Начальный',
      timeRequired: 'Минимально',
      history: 'Дебют четырех коней - один из старейших шахматных дебютов, известный еще с 16 века. Он был особенно популярен в 19 веке, когда его часто использовали такие мастера, как Пол Морфи и Вильгельм Стейниц. В современной практике встречается реже из-за появления более агрессивных дебютных систем.',
      ideas: 'Основная идея дебюта четырех коней - быстрое развитие фигур и контроль центра. Обе стороны развивают коней на естественные позиции, создавая симметричную позицию с равными шансами. Этот дебют считается очень надежным и подходит для начинающих шахматистов, так как следует основным принципам дебютной игры.',
      variations: [
        {
          name: 'Испанский вариант',
          moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bb5',
          description: 'Переход к испанской партии, где белые оказывают давление на коня c6.'
        },
        {
          name: 'Шотландский вариант',
          moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.d4',
          description: 'Переход к шотландской партии, где белые немедленно открывают центр.'
        },
        {
          name: 'Симметричный вариант',
          moves: '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.g3',
          description: 'Спокойный вариант, где белые готовят фианкеттирование слона на g2.'
        }
      ],
      games: [
        {
          white: 'Пол Морфи',
          black: 'Адольф Андерсен',
          year: '1858',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1019060'
        },
        {
          white: 'Гарри Каспаров',
          black: 'Найджел Шорт',
          year: '1993',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1070167'
        }
      ],
      lichessBoardUrl: 'https://lichess.org/study/embed/XtFCFYlM/GCUTf1EY'
    },
    {
      id: 3,
      name: 'Защита Грюнфельд',
      description: 'Гипермодернистский дебют, где черные контратакуют в центре, не занимая его пешками сразу.',
      moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5',
      popularity: 'Высокая',
      style: 'Тактический',
      position: 'Открытая',
      risk: 'Средний',
      color: 'Черные',
      level: 'Продвинутый',
      timeRequired: 'Много',
      history: 'Защита Грюнфельд названа в честь австрийского гроссмейстера Эрнста Грюнфельда, который впервые применил ее в 1922 году. Дебют стал особенно популярен в 1970-х и 1980-х годах благодаря его использованию Гарри Каспаровым и Анатолием Карповым в их матчах на первенство мира.',
      ideas: 'Основная идея защиты Грюнфельда - позволить белым создать мощный пешечный центр, а затем атаковать его фигурами. Черные фианкеттируют слона на g7 и оказывают давление на центр ходом d5. После разменов в центре черные стремятся использовать силу дальнобойного слона g7 и активность фигур для контригры.',
      variations: [
        {
          name: 'Классический вариант',
          moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 Bg7 7.Bc4',
          description: 'Основной вариант, где белые стремятся к активной игре в центре и на королевском фланге.'
        },
        {
          name: 'Русский вариант',
          moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.Nf3 Bg7 5.Qb3',
          description: 'Агрессивный вариант, где белые сразу атакуют пешку d5 ферзем.'
        },
        {
          name: 'Вариант с 4.Bf4',
          moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.Bf4',
          description: 'Современный вариант, где белые быстро развивают слона и готовят e3 и Rc1.'
        }
      ],
      games: [
        {
          white: 'Гарри Каспаров',
          black: 'Вишванатан Ананд',
          year: '1995',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1018574'
        },
        {
          white: 'Магнус Карлсен',
          black: 'Фабиано Каруана',
          year: '2018',
          result: '1/2-1/2',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1933354'
        }
      ],
      lichessBoardUrl: 'https://lichess.org/study/embed/XtFCFYlM/GCUTf1EY'
    },
    {
      id: 4,
      name: 'Английское начало',
      description: 'Гибкий фланговый дебют, позволяющий белым избежать наиболее изученных продолжений.',
      moves: '1.c4',
      popularity: 'Высокая',
      style: 'Позиционный',
      position: 'Закрытая',
      risk: 'Низкий',
      color: 'Белые',
      level: 'Средний',
      timeRequired: 'Умеренно',
      history: 'Английское начало названо в честь английского шахматиста Говарда Стаунтона, который популяризировал этот дебют в 19 веке. Однако широкое распространение дебют получил только в 20 веке, особенно после его использования Михаилом Ботвинником и Анатолием Карповым.',
      ideas: 'Основная идея Английского начала - контроль центра сбоку, не занимая его пешками напрямую. Белые часто переходят к системам, похожим на Сицилианскую защиту с обратными цветами. Дебют отличается гибкостью и позволяет белым избежать многих подготовленных вариантов черных против 1.e4 или 1.d4.',
      variations: [
        {
          name: 'Симметричный вариант',
          moves: '1.c4 c5',
          description: 'Черные отвечают симметрично, создавая равную позицию с обоюдными шансами.'
        },
        {
          name: 'Англо-индийский вариант',
          moves: '1.c4 Nf6 2.Nc3 e6',
          description: 'Черные развиваются по типу защиты Нимцовича или Новоиндийской защиты.'
        },
        {
          name: 'Англо-Грюнфельд',
          moves: '1.c4 Nf6 2.Nc3 d5 3.cxd5 Nxd5 4.g3',
          description: 'Переход к позициям, похожим на защиту Грюнфельда, но с дополнительными возможностями для белых.'
        }
      ],
      games: [
        {
          white: 'Михаил Ботвинник',
          black: 'Василий Смыслов',
          year: '1954',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1032076'
        },
        {
          white: 'Анатолий Карпов',
          black: 'Гарри Каспаров',
          year: '1984',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1067446'
        }
      ],
      lichessBoardUrl: 'https://lichess.org/study/embed/XtFCFYlM/GCUTf1EY'
    },
    {
      id: 5,
      name: 'Испанская партия',
      description: 'Один из самых популярных дебютов, создающий сложную стратегическую борьбу с множеством вариантов.',
      moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5',
      popularity: 'Очень высокая',
      style: 'Универсальный',
      position: 'Нейтральная',
      risk: 'Средний',
      color: 'Белые',
      level: 'Средний',
      timeRequired: 'Много',
      history: 'Испанская партия названа в честь испанского священника Руя Лопеса де Сегуры, который анализировал этот дебют в своей книге 1561 года. Это один из старейших и наиболее изученных дебютов в шахматах, который до сих пор регулярно встречается на самом высоком уровне.',
      ideas: 'Основная идея Испанской партии - давление на коня c6, который защищает пешку e5. Белые создают угрозу выиграть пешку e5 и стремятся к длительному позиционному преимуществу. Черные имеют множество способов защиты, что привело к возникновению огромного количества вариантов и подвариантов.',
      variations: [
        {
          name: 'Закрытый вариант',
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.0-0 Be7',
          description: 'Классический вариант, где черные создают солидную позицию и готовятся к длительной борьбе.'
        },
        {
          name: 'Открытый вариант',
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.0-0 Nxe4',
          description: 'Острый вариант, где черные жертвуют пешку за активную игру и атаку.'
        },
        {
          name: 'Вариант Маршалла',
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.0-0 Be7 6.Re1 b5 7.Bb3 0-0 8.c3 d5',
          description: 'Агрессивный гамбит, названный в честь американского шахматиста Фрэнка Маршалла, где черные жертвуют пешку за сильную атаку.'
        }
      ],
      games: [
        {
          white: 'Гарри Каспаров',
          black: 'Найджел Шорт',
          year: '1993',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1070167'
        },
        {
          white: 'Магнус Карлсен',
          black: 'Фабиано Каруана',
          year: '2018',
          result: '1/2-1/2',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1933354'
        }
      ],
      lichessBoardUrl: 'https://lichess.org/study/embed/XtFCFYlM/GCUTf1EY'
    },
    {
      id: 6,
      name: 'Защита Нимцовича',
      description: 'Гипермодернистский дебют, где черные контролируют центр фигурами, а не пешками.',
      moves: '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4',
      popularity: 'Высокая',
      style: 'Позиционный',
      position: 'Закрытая',
      risk: 'Средний',
      color: 'Черные',
      level: 'Продвинутый',
      timeRequired: 'Много',
      history: 'Защита Нимцовича названа в честь датского гроссмейстера Арона Нимцовича, который разработал и популяризировал этот дебют в 1920-х годах. Дебют стал особенно популярен в послевоенный период и до сих пор регулярно встречается на высшем уровне.',
      ideas: 'Основная идея защиты Нимцовича - контроль центра фигурами, а не пешками, в соответствии с гипермодернистскими принципами. Черные сразу атакуют коня c3, который защищает пешку d4, и создают давление на центр белых. После размена слона на коня черные стремятся использовать сдвоенные пешки белых как слабость.',
      variations: [
        {
          name: 'Классический вариант',
          moves: '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.e3',
          description: 'Солидный вариант, где белые укрепляют центр и готовятся к длительной позиционной борьбе.'
        },
        {
          name: 'Вариант Рубинштейна',
          moves: '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.e3 0-0 5.Bd3 d5 6.Nf3 c5 7.0-0 dxc4 8.Bxc4',
          description: 'Классический вариант, названный в честь Акибы Рубинштейна, где белые стремятся к активной игре в центре.'
        },
        {
          name: 'Вариант Каспарова',
          moves: '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.Nf3 0-0 5.Bg5',
          description: 'Агрессивный вариант, популяризированный Гарри Каспаровым, где белые быстро развивают фигуры и создают угрозы.'
        }
      ],
      games: [
        {
          white: 'Гарри Каспаров',
          black: 'Анатолий Карпов',
          year: '1985',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1067317'
        },
        {
          white: 'Магнус Карлсен',
          black: 'Вишванатан Ананд',
          year: '2014',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1761430'
        }
      ],
      lichessBoardUrl: 'https://lichess.org/study/embed/XtFCFYlM/GCUTf1EY'
    },
    {
      id: 7,
      name: 'Ферзевый гамбит',
      description: 'Классический дебют, где белые жертвуют пешку для быстрого развития и контроля центра.',
      moves: '1.d4 d5 2.c4',
      popularity: 'Высокая',
      style: 'Универсальный',
      position: 'Нейтральная',
      risk: 'Средний',
      color: 'Белые',
      level: 'Средний',
      timeRequired: 'Умеренно',
      history: 'Ферзевый гамбит - один из старейших шахматных дебютов, известный еще с 15 века. Он был особенно популярен в первой половине 20 века, когда его регулярно использовали чемпионы мира Хосе Рауль Капабланка и Александр Алехин. В последние годы дебют вновь приобрел популярность благодаря его использованию Магнусом Карлсеном.',
      ideas: 'Основная идея Ферзевого гамбита - жертва пешки c4 для быстрого развития фигур и контроля центра. Белые стремятся к активной игре и давлению на позицию черных. В большинстве случаев черные не принимают гамбит, предпочитая более солидную игру, что приводит к сложным позиционным борьбам.',
      variations: [
        {
          name: 'Принятый Ферзевый гамбит',
          moves: '1.d4 d5 2.c4 dxc4',
          description: 'Черные принимают жертву пешки, но должны быть готовы к активной игре белых и давлению на пешку c4.'
        },
        {
          name: 'Отказанный Ферзевый гамбит',
          moves: '1.d4 d5 2.c4 e6',
          description: 'Классический отказ, где черные укрепляют пешку d5 и готовятся к солидной игре.'
        },
        {
          name: 'Славянская защита',
          moves: '1.d4 d5 2.c4 c6',
          description: 'Популярный ответ, где черные защищают пешку d5 и готовятся к контригре в центре.'
        }
      ],
      games: [
        {
          white: 'Хосе Рауль Капабланка',
          black: 'Эмануил Ласкер',
          year: '1921',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1241487'
        },
        {
          white: 'Магнус Карлсен',
          black: 'Фабиано Каруана',
          year: '2018',
          result: '1-0',
          link: 'https://www.chessgames.com/perl/chessgame?gid=1937926'
        }
      ],
      lichessBoardUrl: 'https://lichess.org/analysis'
    }
  ];