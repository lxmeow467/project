document.addEventListener('DOMContentLoaded', () => {
    // Проверяем загрузку необходимых библиотек
    if (typeof Chess === 'undefined' || typeof Chessboard === 'undefined') {
        console.error('Chess.js или Chessboard.js не загружены');
        return;
    }
    
    // Инициализация доски
    initializeChessBoard();
});

/**
 * Инициализирует шахматную доску с ходами варианта
 */
function initializeChessBoard() {
    // Создаем экземпляр шахматной игры
    const chess = new Chess();
    
    // Ходы варианта Панова-Ботвинника
    const movesString = '1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 e6 6.Nf3';
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
    let isWhiteMove = true;
    
    for (let i = 0; i < movesArray.length; i++) {
        const moveElement = document.createElement('span');
        moveElement.className = 'move-notation';
        
        if (isWhiteMove) {
            moveElement.innerHTML = `<span class="move-number">${moveNumber}.</span> ${movesArray[i]} `;
        } else {
            moveElement.innerHTML = `${movesArray[i]} `;
            moveNumber++;
        }
        
        moveElement.addEventListener('click', () => {
            updateBoard(i + 1);
        });
        
        movesList.appendChild(moveElement);
        
        isWhiteMove = !isWhiteMove;
    }
    
    // Добавляем обработчики событий для кнопок управления
    document.getElementById('startBtn').addEventListener('click', () => updateBoard(0));
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentMoveIndex > 0) {
            updateBoard(currentMoveIndex - 1);
        }
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentMoveIndex < positions.length - 1) {
            updateBoard(currentMoveIndex + 1);
        }
    });
    document.getElementById('endBtn').addEventListener('click', () => updateBoard(positions.length - 1));
    
    // Показываем начальную позицию
    updateBoard(0);
}
