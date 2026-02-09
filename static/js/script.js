// 1. TYPING EFFECT
const text = "John Mello J. Regencia";
const typingElement = document.getElementById("typewriter");
let index = 0;
const speed = 50;
const startDelay = 2000;

function typeWriter() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, startDelay);
});

// 2. THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// 3. GENERAL SCROLL REVEAL (Sections/Cards)
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom').forEach(el => {
    revealObserver.observe(el);
});

// 4. SKILLS PROGRESS ANIMATION (Specific Logic)
const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            // Get value from data-width and apply it to style.width
            bar.style.width = bar.getAttribute('data-width');
            observer.unobserve(bar); // Only animate once
        }
    });
}, { threshold: 0.2 }); // Triggers when 20% of the bar is visible

document.querySelectorAll('.progress').forEach(bar => {
    skillsObserver.observe(bar);
});

// 5. MOBILE MENU
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});