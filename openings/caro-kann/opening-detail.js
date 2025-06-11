document.addEventListener('DOMContentLoaded', () => {
    // Находим дебют Каро-Канн в массиве дебютов
    const caroKannOpening = openings.find(opening => opening.id === 1);
    
    if (!caroKannOpening) {
        console.error('Дебют Каро-Канн не найден в массиве дебютов');
        return;
    }
    
    // Инициализация вариантов дебюта
    try {
        initializeVariations(caroKannOpening);
        console.log('Варианты дебюта успешно инициализированы');
    } catch (error) {
        console.error('Ошибка при инициализации вариантов дебюта:', error);
    }
});

/**
 * Инициализирует варианты дебюта
 * @param {Object} opening - Объект с информацией о дебюте
 */
function initializeVariations(opening) {
    // Заполняем информацию о дебюте
    document.getElementById('openingName').textContent = opening.name;
    document.getElementById('openingMoves').textContent = opening.moves;
    
    // Заполняем детали дебюта
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
