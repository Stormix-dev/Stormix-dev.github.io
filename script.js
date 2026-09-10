(function() {
    'use strict';

    // ═══ LANGUAGE SYSTEM ═══
    const navLabels = {
        it: { about: '~/chi-sono', education: '~/formazione', experience: '~/esperienza', certs: '~/certificazioni', projects: '~/progetti', skills: '~/skills', contact: '~/contatti' },
        en: { about: '~/about', education: '~/education', experience: '~/experience', certs: '~/certs', projects: '~/projects', skills: '~/skills', contact: '~/contact' }
    };

    let currentLang = localStorage.getItem('lang') || 'it';

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.getElementById('langBtn').innerHTML = '<i class="fas fa-language"></i> ' + lang.toUpperCase();
        const sbLang = document.getElementById('sb-lang');
        if (sbLang) sbLang.textContent = lang.toUpperCase();

        // Update nav links
        document.querySelectorAll('nav a[data-section]').forEach(a => {
            const section = a.getAttribute('data-section');
            if (navLabels[lang] && navLabels[lang][section]) {
                a.textContent = navLabels[lang][section];
            }
        });

        // Update all bilingual elements
        document.querySelectorAll('[data-it][data-en]').forEach(el => {
            const val = el.getAttribute('data-' + lang);
            if (val !== null) {
                if (el.children.length === 0 && !val.includes('<')) {
                    el.textContent = val;
                } else {
                    el.innerHTML = val;
                }
            }
        });
    }

    window.toggleLang = function() {
        applyLang(currentLang === 'it' ? 'en' : 'it');
    };

    // ═══ THEME TOGGLE ═══
    const themes = ['blue', 'cyan', 'green', 'purple'];
    let themeIndex = parseInt(localStorage.getItem('themeIndex') || '0');

    window.toggleTheme = function() {
        themeIndex = (themeIndex + 1) % themes.length;
        localStorage.setItem('themeIndex', themeIndex);
        document.body.setAttribute('data-theme', themes[themeIndex]);
    };

    // Apply saved theme
    if (themes[themeIndex] !== 'blue') {
        document.body.setAttribute('data-theme', themes[themeIndex]);
    }

    // ═══ TYPEWRITER ═══
    const typewriterEl = document.getElementById('typewriter');
    const fullName = 'Gianmarco Simeoni';
    let charIndex = 0;

    function typeNext() {
        if (charIndex < fullName.length) {
            typewriterEl.textContent += fullName[charIndex];
            charIndex++;
            setTimeout(typeNext, 80 + Math.random() * 40);
        }
    }
    setTimeout(typeNext, 300);

    // ═══ SCROLL REVEAL ═══
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ═══ STATS COUNTER ═══
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.stat-item');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add('stat-visible');
                        const numEl = item.querySelector('.stat-number');
                        const target = parseInt(numEl.getAttribute('data-count'));
                        animateCount(numEl, target);
                    }, i * 150);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) statsObserver.observe(statsBar);

    function animateCount(el, target) {
        let current = 0;
        const step = Math.max(1, Math.floor(target / 30));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            el.textContent = current + (target > 3 ? '+' : '');
            if (target <= 3) el.textContent = current;
        }, 40);
    }

    // ═══ HEADER SCROLL ═══
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);

        // Back to top
        const btn = document.getElementById('backToTop');
        btn.classList.toggle('visible', window.scrollY > 500);

        // Scroll progress
        const scrollProg = document.getElementById('scroll-progress');
        if (scrollProg) {
            const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            scrollProg.textContent = Math.min(pct, 100) + '%';
        }

        // Active nav
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 200) current = s.id;
        });
        document.querySelectorAll('nav a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('data-section') === current);
        });
        const sbSection = document.getElementById('sb-section');
        if (sbSection && current) sbSection.textContent = '~/' + current;
    });

    // ═══ STATUS BAR CLOCK ═══
    function updateClock() {
        const now = new Date();
        const t = now.toLocaleTimeString('it-IT', { hour12: false });
        const el = document.getElementById('sb-clock');
        if (el) el.textContent = t;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // ═══ FOOTER YEAR ═══
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ═══ APPLY SAVED LANG ═══
    applyLang(currentLang);

})();