// ====================================================
// 1. АКТУАЛЬНЫЙ ГОД В ПОДВАЛЕ
// ====================================================
const yearEl = document.querySelector('#year');
yearEl.textContent = new Date().getFullYear();


// ====================================================
// 2. ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ ТЕМЫ
//    JS переключает класс на <html>, а стили описаны в CSS
// ====================================================
const themeBtn = document.querySelector('#theme-toggle');

themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    const isDark = document.documentElement.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
});


// ====================================================
// 3. ОТПРАВКА ФОРМЫ БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ
// ====================================================
const form = document.querySelector('form');
const statusMsg = document.querySelector('#form-status');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Останавливаем перезагрузку страницы

    const formData = new FormData(form); // Собираем все данные из полей
    const name = formData.get('name');

    // ВОТ ГЛАВНОЕ ДЕЙСТВИЕ: Отправляем данные на сервер (Formspree)
    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    // Если сервер говорит "ОК", показываем сообщение
    if (response.ok) {
        statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
        statusMsg.classList.add('visible');
        form.reset();
    }
});


// 1. КНОПКА «НАВЕРХ»
const upBtn = document.querySelector('#to-top');

if (upBtn) {
    window.addEventListener('scroll', () => {
        upBtn.classList.toggle('visible', window.scrollY > 400);
    });

    upBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
	// ====================================================
// 5. ИЗМЕНЕНИЕ РАЗМЕРА ШРИФТА (КНОПКИ A+ и A-)
// ====================================================
const btnPlus = document.querySelector('#btn-plus');
const btnMinus = document.querySelector('#btn-minus');

// Проверяем, есть ли кнопки на странице (чтобы не было ошибки)
if (btnPlus && btnMinus) {
    // Получаем текущий базовый размер шрифта body (у вас это 16px из CSS)
    let currentFontSize = parseInt(window.getComputedStyle(document.body).fontSize);

    function changeFontSize(delta) {
        currentFontSize += delta;
        
        // Ограничиваем размер (чтобы не сломать верстку)
        if (currentFontSize < 10) currentFontSize = 10;
        if (currentFontSize > 30) currentFontSize = 30;
        
        // Меняем размер шрифта для всего body (и всего текста внутри)
        document.body.style.fontSize = currentFontSize + "px";
    }

    // Вешаем обработчики кликов на кнопки
    btnPlus.addEventListener("click", () => changeFontSize(2));  // Увеличить на 2px
    btnMinus.addEventListener("click", () => changeFontSize(-2)); // Уменьшить на 2px
}
}

// 2. КНОПКА ОЗВУЧИВАНИЯ
const speakBtn = document.getElementById('speak-btn');

if (speakBtn) {
    speakBtn.addEventListener('click', () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }

        const mainContent = document.querySelector('main');
        if (!mainContent) return;

        const textToSpeak = mainContent.innerText;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        utterance.lang = 'ru-RU';
        utterance.rate = 1;

        window.speechSynthesis.speak(utterance);
    });
}
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');
const projectsSection = document.getElementById('projects');

let currentSize = 16; // Начальный размер (в пикселях)

// Увеличиваем
btnPlus.addEventListener('click', () => {
    currentSize += 2;
    projectsSection.style.fontSize = currentSize + 'px';
});

// Уменьшаем
btnMinus.addEventListener('click', () => {
    if (currentSize > 10) { 
        currentSize -= 2; 
        projectsSection.style.fontSize = currentSize + 'px';
    }
});