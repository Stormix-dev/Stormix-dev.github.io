// =========================
// Robust Theme Toggle con FontAwesome e fallback
// =========================
(function () {
    function initThemeToggle() {
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle') || document.querySelector('.theme-toggle');
        if (!themeToggle) return console.warn('Theme toggle non trovato');

        // Crea icona FontAwesome se non esiste
        let faIcon = themeToggle.querySelector('i');
        if (!faIcon) {
            faIcon = document.createElement('i');
            themeToggle.prepend(faIcon);
        }

        // Crea fallback testuale se non esiste
        let fallback = themeToggle.querySelector('.theme-fallback');
        if (!fallback) {
            fallback = document.createElement('span');
            fallback.className = 'theme-fallback';
            fallback.setAttribute('aria-hidden', 'true');
            fallback.style.marginLeft = '0.15rem';
            themeToggle.appendChild(fallback);
        }

        // Leggi tema salvato o fallback a 'dark'
        const saved = localStorage.getItem('theme');
        const initialTheme = saved === 'light' || saved === 'dark' ? saved : 'dark';
        html.setAttribute('data-theme', initialTheme);

        // Funzione per aggiornare UI
        function updateUI(theme) {
            html.setAttribute('data-theme', theme);
            
            // Aggiorna icona FontAwesome
            faIcon.className = '';
            faIcon.classList.add('fas', theme === 'dark' ? 'fa-moon' : 'fa-sun');

            // Aggiorna fallback testuale
            fallback.textContent = theme === 'dark' ? '☾' : '☀';

            // Aggiorna aria-label
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Tema scuro. Clicca per tema chiaro' : 'Tema chiaro. Clicca per tema scuro');
        }

        // Inizializza UI
        updateUI(initialTheme);

        // Click toggle
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            updateUI(next);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();
