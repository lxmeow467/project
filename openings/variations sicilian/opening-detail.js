document.addEventListener('DOMContentLoaded', () => {
    // Проверяем загрузку необходимых библиотек
    if (typeof Chess === 'undefined' || typeof Chessboard === 'undefined') {
        console.error('Chess.js или Chessboard.js не загружены');
        return;
    }

    // Получаем данные о Сицилианской защите из массива openings
    // Сицилианская защита имеет id 0 в массиве openings
    const sicilianOpening = openings[0];
    
    if (!sicilianOpening) {
        console.error('Данные о Сицилианской защите не найдены');
        return;
    }
    
    // Заполняем основную информацию о дебюте
    document.getElementById('openingName').textContent = sicilianOpening.name;
    document.getElementById('openingMoves').textContent = sicilianOpening.moves;
    document.getElementById('openingPopularity').textContent = sicilianOpening.popularity;
    document.getElementById('openingStyle').textContent = sicilianOpening.style;
    document.getElementById('openingPosition').textContent = sicilianOpening.position;
    document.getElementById('openingRisk').textContent = sicilianOpening.risk;
    document.getElementById('openingColor').textContent = sicilianOpening.color;
    document.getElementById('openingLevel').textContent = sicilianOpening.level;
    
    // Заполняем историю дебюта
    if (sicilianOpening.history) {
        document.getElementById('openingHistory').textContent = sicilianOpening.history;
    }
    
    // Заполняем ключевые идеи
    if (sicilianOpening.ideas) {
        document.getElementById('openingIdeas').textContent = sicilianOpening.ideas;
    }
    
    // Заполняем варианты
    if (sicilianOpening.variations && sicilianOpening.variations.length > 0) {
        const variationsContainer = document.getElementById('openingVariations');
        variationsContainer.innerHTML = '';
        
        // Создаем список вариантов
        const variationsList = document.createElement('ul');
        variationsList.className = 'variations-list';
        
        sicilianOpening.variations.forEach(variation => {
            const variationItem = document.createElement('li');
            
            // Проверяем, есть ли URL для варианта
            if (variation.url) {
                // Если есть URL, делаем заголовок кликабельным
                variationItem.innerHTML = `
                    <a href="${variation.url}">${variation.name}</a> - 
                    <span class="notation">${variation.moves}</span>
                `;
            } else {
                // Если URL нет, оставляем обычный заголовок
                variationItem.innerHTML = `
                    <strong>${variation.name}</strong> - 
                    <span class="notation">${variation.moves}</span>
                `;
            }
            
            variationsList.appendChild(variationItem);
        });
        
        variationsContainer.appendChild(variationsList);
    }
    
    // Инициализация шахматной доски для демонстрации ходов
    const boardContainer = document.getElementById('chessboard');
    if (boardContainer) {
        try {
            // Инициализация доски
            const chess = new Chess();
            const movesString = sicilianOpening.moves;
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
            if (movesList) {
                movesList.innerHTML = '';
                
                // Форматируем и отображаем ходы
                let moveNumber = 1;
                for (let i = 0; i < movesArray.length; i += 2) {
                    const moveElement = document.createElement('div');
                    moveElement.className = 'move';
                    
                    const whiteMove = movesArray[i];
                    const blackMove = i + 1 < movesArray.length ? movesArray[i + 1] : '';
                    
                    moveElement.innerHTML = `
                        <span class="move-number">${moveNumber}.</span>
                        <span class="move-notation" data-index="${i + 1}">${whiteMove}</span>
                        ${blackMove ? `<span class="move-notation" data-index="${i + 2}">${blackMove}</span>` : ''}
                    `;
                    
                    movesList.appendChild(moveElement);
                    moveNumber++;
                }
                
                // Добавляем обработчики событий для ходов
                document.querySelectorAll('.move-notation').forEach(moveEl => {
                    moveEl.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        updateBoard(index);
                    });
                });
            }
            
            // Добавляем обработчики событий для кнопок управления
            const startBtn = document.getElementById('startBtn');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const endBtn = document.getElementById('endBtn');
            
            if (startBtn) {
                startBtn.addEventListener('click', function() {
                    updateBoard(0);
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    updateBoard(Math.max(0, currentMoveIndex - 1));
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    updateBoard(Math.min(positions.length - 1, currentMoveIndex + 1));
                });
            }
            
            if (endBtn) {
                endBtn.addEventListener('click', function() {
                    updateBoard(positions.length - 1);
                });
            }
            
            console.log('Доска успешно инициализирована');
        } catch (error) {
            console.error('Ошибка при инициализации доски:', error);
        }
    }
});