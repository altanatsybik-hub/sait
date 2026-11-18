// 1. АКТУАЛЬНЫЙ ГОД В ПОДВАЛЕ
const yearEl = document.querySelector('#year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// 2. ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ ТЕМЫ
const themeBtn = document.querySelector('#theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
    });
}

// 3. ОТПРАВКА ФОРМЫ (ЧЕРЕЗ FORMSPREE)
const form = document.querySelector('form');
const statusMsg = document.querySelector('#form-status');

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name') || 'друг';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
                statusMsg.classList.add('visible');
                statusMsg.style.color = "green";
                form.reset();
            } else {
                statusMsg.textContent = `Ошибка отправки. Проверьте настройки Formspree.`;
                statusMsg.classList.add('visible');
                statusMsg.style.color = "red";
            }
        } catch (error) {
            statusMsg.textContent = `Ошибка соединения. Попробуйте позже.`;
            statusMsg.classList.add('visible');
            statusMsg.style.color = "red";
        }
    });
}

// 4. КНОПКА «НАВЕРХ»
const upBtn = document.querySelector('#to-top');
if (upBtn) {
    window.addEventListener('scroll', () => {
        upBtn.classList.toggle('visible', window.scrollY > 400);
    });

    upBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 5. КНОПКИ РАЗМЕРА ШРИФТА (A+ и A-)
const btnPlus = document.querySelector('#btn-plus');
const btnMinus = document.querySelector('#btn-minus');

if (btnPlus && btnMinus) {
    let currentFontSize = 16;

    btnPlus.addEventListener('click', () => {
        currentFontSize += 2;
        if (currentFontSize > 30) currentFontSize = 30;
        document.body.style.fontSize = currentFontSize + 'px';
    });

    btnMinus.addEventListener('click', () => {
        currentFontSize -= 2;
        if (currentFontSize < 10) currentFontSize = 10;
        document.body.style.fontSize = currentFontSize + 'px';
    });
}

// 6. КНОПКА ОЗВУЧИВАНИЯ
const speakBtn = document.getElementById('speak-btn');
if (speakBtn) {
    speakBtn.addEventListener('click', () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }
        const mainContent = document.querySelector('main');
        if (!mainContent) return;

        const utterance = new SpeechSynthesisUtterance(mainContent.innerText);
        utterance.lang = 'ru-RU';
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    });
}