document.addEventListener('DOMContentLoaded', () => {
    // Проверяем загрузку необходимых библиотек
    if (typeof Chess === 'undefined' || typeof Chessboard === 'undefined') {
        console.error('Chess.js или Chessboard.js не загружены');
        return;
    }
    
    // Инициализация заметок пользователя
    const userNotes = document.getElementById('userNotes');
    const saveNotesBtn = document.getElementById('saveNotes');
    
    if (userNotes && saveNotesBtn) {
        // Определяем идентификатор для заметок на основе URL страницы
        const pageUrl = window.location.pathname;
        const notesKey = pageUrl.split('/').pop().replace('.html', '') + 'VariationNotes';
        
        // Загружаем сохраненные заметки, если они есть
        const savedNotes = localStorage.getItem(notesKey);
        if (savedNotes) {
            userNotes.value = savedNotes;
        }
        
        // Сохраняем заметки в localStorage
        saveNotesBtn.addEventListener('click', function() {
            localStorage.setItem(notesKey, userNotes.value);
            alert('Заметки сохранены!');
        });
    }
    
    // Удаляем любые потенциальные нотации или обозначения ходов
    const chessBoardElement = document.getElementById('chessboard');
    if (chessBoardElement) {
        // Удаляем все дочерние элементы, которые могут содержать нотацию
        const notationElements = document.querySelectorAll('.notation-container, .move-notation, .moves-list');
        notationElements.forEach(element => element.remove());
    }
});