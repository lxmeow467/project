// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
  initializeRatingCalculator();
  initializeEnrollButton();
  initializeAccordion();
});

// Инициализация кнопки "Начать изучение"
function initializeEnrollButton() {
  const enrollButton = document.getElementById('enrollButton');
  if (enrollButton) {
    enrollButton.addEventListener('click', () => {
      document.querySelector('#rating-info').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Функция инициализации калькулятора рейтинга
function initializeRatingCalculator() {
  const calculatorForm = document.getElementById('ratingCalculatorForm');
  const addGameBtn = document.getElementById('addGameBtn');
  const gamesList = document.getElementById('gamesList');
  const resultDiv = document.getElementById('calculationResult');
  const stepsList = document.getElementById('stepsList');
  const stepResults = document.getElementById('stepByStepResults');
  
  if (!calculatorForm || !gamesList) return;
  
  // Инициализация обработчиков для K-фактора
  initializeKFactorHandlers();
  
  // Обработчик добавления новой партии
  if (addGameBtn) {
    addGameBtn.addEventListener('click', () => {
      addNewGame();
      updateDeleteButtons();
    });
  }
  
  // Обработчик отправки формы (расчет рейтинга)
  calculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Валидация формы
    if (!validateCalculatorForm()) {
      alert('Пожалуйста, заполните все поля корректно.');
      return;
    }
    
    // Получаем начальный рейтинг
    const initialRating = parseFloat(document.getElementById('playerRating').value);
    
    // Получаем данные о партиях
    const games = getGamesData();
    
    // Рассчитываем изменение рейтинга
    const calculationResults = calculateMultiGameRating(initialRating, games);
    
    // Отображаем результаты
    displayMultiGameResult(initialRating, calculationResults, resultDiv);
    displayStepByStepResults(initialRating, calculationResults, stepsList);
    
    // Показываем пошаговые результаты
    stepResults.classList.add('visible');
    
    // Сохраняем историю расчетов
    saveCalculationHistory(initialRating, games, calculationResults[calculationResults.length - 1].newRating);
  });
  
  // Делегирование событий для кнопок удаления
  if (gamesList) {
    gamesList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-game-btn')) {
        const gameRow = e.target.closest('.game-row');
        if (gameRow) {
          gameRow.remove();
          renumberGames();
          updateDeleteButtons();
        }
      }
    });
    
    // Делегирование событий для селекторов K-фактора
    gamesList.addEventListener('change', (e) => {
      if (e.target.classList.contains('k-factor')) {
        const gameRow = e.target.closest('.game-row');
        if (gameRow) {
          const customKInput = gameRow.querySelector('.custom-k-factor');
          if (customKInput) {
            customKInput.style.display = e.target.value === 'custom' ? 'inline-block' : 'none';
          }
        }
      }
    });
  }
  
  // Инициализация обработчиков для K-фактора
  function initializeKFactorHandlers() {
    const kFactorSelects = document.querySelectorAll('.k-factor');
    kFactorSelects.forEach(select => {
      const gameRow = select.closest('.game-row');
      if (gameRow) {
        const customKInput = gameRow.querySelector('.custom-k-factor');
        if (customKInput) {
          select.addEventListener('change', () => {
            customKInput.style.display = select.value === 'custom' ? 'inline-block' : 'none';
          });
        }
      }
    });
  }
  
  // Функция добавления новой партии
  function addNewGame() {
    const gameCount = gamesList.querySelectorAll('.game-row').length;
    const newGameRow = document.createElement('div');
    newGameRow.className = 'game-row';
    newGameRow.dataset.index = gameCount + 1;
    
    newGameRow.innerHTML = `
      <div class="game-cell game-number">${gameCount + 1}</div>
      <div class="game-cell" data-label="Рейтинг соперника">
        <input type="number" class="opponent-rating" placeholder="Рейтинг соперника" required min="100" max="3000" value="1600">
      </div>
      <div class="game-cell" data-label="Результат">
        <select class="game-result" required>
          <option value="win">Победа</option>
          <option value="draw">Ничья</option>
          <option value="loss">Поражение</option>
        </select>
      </div>
      <div class="game-cell" data-label="Коэффициент K">
        <select class="k-factor" required>
          <option value="10">K=10</option>
          <option value="20" selected>K=20</option>
          <option value="40">K=40</option>
          <option value="custom">Другой</option>
        </select>
        <input type="number" class="custom-k-factor" placeholder="K" min="1" max="100" value="20" style="display: none;">
      </div>
      <div class="game-cell" data-label="Действия">
        <button type="button" class="delete-game-btn">Удалить</button>
      </div>
    `;
    
    gamesList.appendChild(newGameRow);
    
    // Инициализируем обработчики для нового K-фактора
    const newKFactorSelect = newGameRow.querySelector('.k-factor');
    const newCustomKInput = newGameRow.querySelector('.custom-k-factor');
    
    if (newKFactorSelect && newCustomKInput) {
      newKFactorSelect.addEventListener('change', () => {
        newCustomKInput.style.display = newKFactorSelect.value === 'custom' ? 'inline-block' : 'none';
      });
    }
  }
  
  // Функция обновления нумерации партий
  function renumberGames() {
    const gameRows = gamesList.querySelectorAll('.game-row');
    gameRows.forEach((row, index) => {
      row.dataset.index = index + 1;
      const numberCell = row.querySelector('.game-number');
      if (numberCell) {
        numberCell.textContent = index + 1;
      }
    });
  }
  
  // Функция обновления кнопок удаления
  function updateDeleteButtons() {
    const gameRows = gamesList.querySelectorAll('.game-row');
    const deleteButtons = gamesList.querySelectorAll('.delete-game-btn');
    
    // Если партия только одна, кнопка удаления неактивна
    if (gameRows.length === 1) {
      deleteButtons[0].disabled = true;
    } else {
      // Иначе все кнопки активны
      deleteButtons.forEach(btn => {
        btn.disabled = false;
      });
    }
  }
  
  // Функция валидации формы
  function validateCalculatorForm() {
    const initialRating = document.getElementById('playerRating');
    if (!initialRating.value || isNaN(parseFloat(initialRating.value)) || parseFloat(initialRating.value) < 100) {
      return false;
    }
    
    const opponentRatings = gamesList.querySelectorAll('.opponent-rating');
    for (let i = 0; i < opponentRatings.length; i++) {
      if (!opponentRatings[i].value || isNaN(parseFloat(opponentRatings[i].value)) || parseFloat(opponentRatings[i].value) < 100) {
        return false;
      }
    }
    
    const kFactorSelects = gamesList.querySelectorAll('.k-factor');
    const customKInputs = gamesList.querySelectorAll('.custom-k-factor');
    
    for (let i = 0; i < kFactorSelects.length; i++) {
      if (kFactorSelects[i].value === 'custom') {
        const customKInput = customKInputs[i];
        if (!customKInput.value || isNaN(parseInt(customKInput.value)) || parseInt(customKInput.value) < 1) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  // Функция получения данных о партиях
  function getGamesData() {
    const gameRows = gamesList.querySelectorAll('.game-row');
    const games = [];
    
    gameRows.forEach(row => {
      const opponentRating = parseFloat(row.querySelector('.opponent-rating').value);
      const result = row.querySelector('.game-result').value;
      const kFactorSelect = row.querySelector('.k-factor');
      
      let kFactor;
      if (kFactorSelect.value === 'custom') {
        kFactor = parseInt(row.querySelector('.custom-k-factor').value);
      } else {
        kFactor = parseInt(kFactorSelect.value);
      }
      
      games.push({
        opponentRating,
        result,
        kFactor
      });
    });
    
    return games;
  }
  
  // Инициализация первой партии и кнопок
  updateDeleteButtons();
}

// Функция расчета нового рейтинга по формуле Эло
function calculateNewRating(playerRating, opponentRating, result, kFactor) {
  // Рассчитываем ожидаемый результат
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  
  // Определяем фактический результат
  let actualScore;
  switch(result) {
    case 'win':
      actualScore = 1;
      break;
    case 'draw':
      actualScore = 0.5;
      break;
    case 'loss':
      actualScore = 0;
      break;
    default:
      actualScore = 0;
  }
  
  // Рассчитываем новый рейтинг
  const ratingChange = Math.round(kFactor * (actualScore - expectedScore));
  const newRating = playerRating + ratingChange;
  
  return {
    newRating: newRating,
    ratingChange: ratingChange,
    expectedScore: expectedScore
  };
}

// Функция расчета рейтинга для серии партий
function calculateMultiGameRating(initialRating, games) {
  let currentRating = initialRating;
  const results = [];
  
  games.forEach((game, index) => {
    // Рассчитываем рейтинг после текущей партии
    const result = calculateNewRating(
      currentRating,
      game.opponentRating,
      game.result,
      game.kFactor
    );
    
    // Добавляем результат в массив
    results.push({
      gameNumber: index + 1,
      opponentRating: game.opponentRating,
      result: game.result,
      ratingChange: result.ratingChange,
      newRating: result.newRating,
      expectedScore: result.expectedScore
    });
    
    // Обновляем текущий рейтинг для следующей партии
    currentRating = result.newRating;
  });
  
  return results;
}

// Функция отображения итогового результата
function displayMultiGameResult(initialRating, results, resultDiv) {
  if (results.length === 0) return;
  
  // Получаем итоговое изменение рейтинга
  const finalRating = results[results.length - 1].newRating;
  const totalChange = finalRating - initialRating;
  const changeSymbol = totalChange >= 0 ? '+' : '';
  const changeClass = totalChange >= 0 ? 'positive-change' : 'negative-change';
  
  // Считаем статистику
  let wins = 0, draws = 0, losses = 0;
  results.forEach(result => {
    switch(result.result) {
      case 'win': wins++; break;
      case 'draw': draws++; break;
      case 'loss': losses++; break;
    }
  });
  
  resultDiv.innerHTML = `
    <div class="calculation-result">
      <h4>Итоговый результат:</h4>
      <p>Начальный рейтинг: <strong>${initialRating}</strong></p>
      <p>Статистика: <strong>${wins} побед, ${draws} ничьих, ${losses} поражений</strong></p>
      <p>Общее изменение рейтинга: <strong class="${changeClass}">${changeSymbol}${totalChange}</strong></p>
      <p>Итоговый рейтинг: <strong>${finalRating}</strong></p>
    </div>
  `;
}

// Функция отображения пошаговых результатов
function displayStepByStepResults(initialRating, results, stepsList) {
  // Очищаем предыдущие результаты
  stepsList.innerHTML = '';
  
  // Добавляем строки с результатами каждой партии
  results.forEach(result => {
    const changeSymbol = result.ratingChange >= 0 ? '+' : '';
    const changeClass = result.ratingChange >= 0 ? 'positive-change' : 'negative-change';
    
    // Преобразуем результат в текст
    let resultText;
    switch(result.result) {
      case 'win': resultText = 'Победа'; break;
      case 'draw': resultText = 'Ничья'; break;
      case 'loss': resultText = 'Поражение'; break;
      default: resultText = 'Неизвестно';
    }
    
    const stepRow = document.createElement('div');
    stepRow.className = 'step-row';
    stepRow.dataset.gameNumber = result.gameNumber;
    stepRow.innerHTML = `
      <div class="step-cell" data-label="№ партии">${result.gameNumber}</div>
      <div class="step-cell" data-label="Рейтинг соперника">${result.opponentRating}</div>
      <div class="step-cell" data-label="Результат">${resultText}</div>
      <div class="step-cell ${changeClass}" data-label="Изменение">${changeSymbol}${result.ratingChange}</div>
      <div class="step-cell" data-label="Новый рейтинг">${result.newRating}</div>
    `;
    
    stepsList.appendChild(stepRow);
  });
  
  // Показываем блок с пошаговыми результатами
  const stepResults = document.getElementById('stepByStepResults');
  if (stepResults) {
    stepResults.classList.add('visible');
  }
}

// Функция для сохранения истории расчетов в localStorage
function saveCalculationHistory(initialRating, games, finalRating) {
  try {
    // Получаем существующую историю или создаем новую
    const history = JSON.parse(localStorage.getItem('ratingCalculationHistory')) || [];
    
    // Добавляем новый расчет
    history.push({
      date: new Date().toISOString(),
      initialRating,
      games,
      finalRating
    });
    
    // Ограничиваем историю 10 последними расчетами
    if (history.length > 10) {
      history.shift();
    }
    
    // Сохраняем обновленную историю
    localStorage.setItem('ratingCalculationHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Ошибка при сохранении истории:', error);
  }
}

// Функция для загрузки истории расчетов из localStorage
function loadCalculationHistory() {
  try {
    return JSON.parse(localStorage.getItem('ratingCalculationHistory')) || [];
  } catch (error) {
    console.error('Ошибка при загрузке истории:', error);
    return [];
  }
}

// Инициализация аккордеона рейтингов
function initializeAccordion() {
    const headers = document.querySelectorAll('.rating-category-header');

    headers.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const targetContent = document.getElementById(targetId);
            const toggleIcon = this.querySelector('.toggle-icon');

            // Закрываем все другие открытые секции
            headers.forEach(otherHeader => {
                const otherTargetId = otherHeader.dataset.target;
                const otherTargetContent = document.getElementById(otherTargetId);
                const otherToggleIcon = otherHeader.querySelector('.toggle-icon');

                if (otherTargetContent && otherTargetContent.id !== targetId && otherTargetContent.classList.contains('active')) {
                    otherTargetContent.classList.remove('active');
                    otherToggleIcon.textContent = '+';
                    otherToggleIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Переключаем текущую секцию
            if (targetContent) {
                targetContent.classList.toggle('active');
                if (targetContent.classList.contains('active')) {
                    toggleIcon.textContent = '−';
                    toggleIcon.style.transform = 'rotate(180deg)';
                } else {
                    toggleIcon.textContent = '+';
                    toggleIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}