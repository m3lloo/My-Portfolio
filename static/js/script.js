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
    if (typingElement) {
        typingElement.textContent = "";
        setTimeout(typeWriter, startDelay);
    }
});

// 2. THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Check local storage
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

// 3. GENERAL SCROLL REVEAL
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

// 4. SKILLS PROGRESS ANIMATION
const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.getAttribute('data-width');
            observer.unobserve(bar);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.progress').forEach(bar => {
    skillsObserver.observe(bar);
});

// 5. MOBILE MENU & NAV SCROLL LOGIC
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('is-active'); // Triggers hamburger animation
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
    }
});

// 6. SCROLL SPY (Highlight Active Link) & NAVBAR SHADOW
// --- FIX: Logic updated to handle "Bottom of Page" correctly ---
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // A. Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    const scrollPosition = window.scrollY;

    // B. Standard Scroll Spy Logic
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // 150px offset allows link to switch slightly before the section hits the very top
        if (scrollPosition >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    // C. FIX: Check if user is at the very bottom of the page
    // If so, override 'current' to be the last section (Contact)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        if(sections.length > 0) {
            current = sections[sections.length - 1].getAttribute('id');
        }
    }

    // D. Apply active class
    navLi.forEach(li => {
        li.classList.remove('active-link');
        // Check if the link's href matches the current section ID
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active-link');
        }
    });
});

// 7. LOCAL TIME CLOCK
function updateLocalTime() {
    const timeElement = document.getElementById('local-time');
    if (timeElement) {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        timeElement.textContent = now.toLocaleTimeString(undefined, options);
    }
}

setInterval(updateLocalTime, 1000);
updateLocalTime();