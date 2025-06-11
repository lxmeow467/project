document.addEventListener('DOMContentLoaded', () => {
  // Проверяем загрузку необходимых библиотек
  if (typeof Chess === 'undefined' || typeof Chessboard === 'undefined') {
    console.error('Chess.js или Chessboard.js не загружены');
    return;
  }
  
  // Инициализация доски
  const chess = new Chess();
  const movesString = '[ХОДЫ_ВАРИАНТА]'; // Замените на реальные ходы варианта
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
  
  // Обработка событий для заметок пользователя
  const saveButton = document.getElementById('saveNotes');
  const userNotesTextarea = document.getElementById('userNotes');
  
  if (saveButton && userNotesTextarea) {
    // Загружаем сохраненные заметки, если они есть
    const variantId = '[ID_ВАРИАНТА]'; // Замените на уникальный идентификатор варианта
    const savedNotes = localStorage.getItem(`userNotes_${variantId}`);
    
    if (savedNotes) {
      userNotesTextarea.value = savedNotes;
    }
    
    saveButton.addEventListener('click', () => {
      const notes = userNotesTextarea.value;
      localStorage.setItem(`userNotes_${variantId}`, notes);
      alert('Заметки сохранены!');
    });
  }
}); 