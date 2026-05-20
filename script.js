// === 1. Зберігання даних про ОС та Браузер ===
const osInfo = `ОС: ${navigator.platform}, Браузер: ${navigator.userAgent}`;
localStorage.setItem('browserInfo', osInfo);

// Відображення у футері
const footer = document.querySelector('footer');
const infoParagraph = document.createElement('p');
infoParagraph.style.fontSize = '10px';
infoParagraph.textContent = "Інфо з localStorage: " + localStorage.getItem('browserInfo');
footer.appendChild(infoParagraph);


// === 2. Завантаження коментарів (AJAX/Fetch) ===
async function loadComments() {
    const variant = 29; // 
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`);
    const comments = await response.json();
    
    const commentsSection = document.createElement('section');
    commentsSection.innerHTML = '<h2>Відгуки роботодавців</h2>';
    
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.style.marginBottom = '15px';
        div.innerHTML = `<strong>${comment.name}</strong><br><small>${comment.email}</small><p>${comment.body}</p>`;
        commentsSection.appendChild(div);
    });
    
    document.querySelector('.container').appendChild(commentsSection);
}
loadComments();


// === 3. Модальне вікно через 1 хвилину ===
setTimeout(() => {
    // Створюємо просте модальне вікно (стилі додамо в CSS)
    const modal = document.createElement('div');
    modal.id = "contactModal";
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Зворотній зв'язок</h3>
            <form action="https://formspree.io/f/xbdpbarz" method="POST">
                <input type="text" name="name" placeholder="Ім'я" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="tel" name="phone" placeholder="Номер телефону" required>
                <textarea name="message" placeholder="Ваш текст"></textarea>
                <button type="submit">Відправити</button>
                <button type="button" onclick="this.parentElement.parentElement.parentElement.remove()">Закрити</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}, 60000); // 60000 мс = 1 хвилина


// === 4. Нічний / Денний режим ===
function setTheme(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Автоматичне перемикання за часом
const hour = new Date().getHours();
if (hour >= 7 && hour < 21) {
    setTheme('light');
} else {
    setTheme('dark');
}

// Додамо кнопку-перемикач у шапку
const themeBtn = document.createElement('button');
themeBtn.textContent = "Змінити тему";
themeBtn.style.margin = "10px";
themeBtn.onclick = () => document.body.classList.toggle('dark-mode');
document.querySelector('header').appendChild(themeBtn);