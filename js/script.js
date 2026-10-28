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

form.addEventListener('submit', (event) => {
    event.preventDefault();        // отменяем перезагрузку

    const name = document.querySelector('#name').value.trim();

    statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
    statusMsg.classList.add('visible');

    form.reset();                  // очищаем поля
});


// ==========================================
// 4. КНОПКА «НАВЕРХ» ПОЯВЛЯЕТСЯ ПРИ ПРОКРУТКЕ
// ==========================================
const upBtn = document.querySelector('#to-top');

if (upBtn) {
    window.addEventListener('scroll', () => {
        upBtn.classList.toggle('visible', window.scrollY > 400);
    });

    upBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    );
}

// ==========================================
// 5. КНОПКА ОЗВУЧИВАНИЯ ТЕКСТА
// ==========================================
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
    );
}