// script.js

document.getElementById("current-year").textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll(".section");

// Nasconde tutte le sezioni
function hideAllSections() {
    sections.forEach(section => {
        section.style.display = "none";
    });
}

// Mostra la sezione selezionata
function showSection(id) {
    hideAllSections();
    const sectionToShow = document.getElementById(id);
    if (sectionToShow) {
        sectionToShow.style.display = "block";
        //sectionToShow.scrollIntoView({ behavior: 'smooth' });
    }
}

// Imposta gli event listener
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        // Rimuovi "active" da tutti i link
        navLinks.forEach(l => l.classList.remove("active"));
        // Aggiungi "active" al link cliccato
        link.classList.add("active");

        const targetId = link.getAttribute("href").substring(1);
        showSection(targetId);
    });
});

// All'avvio mostra solo la prima sezione
hideAllSections();
document.getElementById("about").style.display = "block";
navLinks[0].classList.add("active");
