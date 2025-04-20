// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Dark Mode Toggle
const darkModeToggle = document.createElement('div');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = `
    <button class="toggle-btn" id="darkModeBtn">
        <i class="fas fa-moon"></i>
        <span>Dark Mode</span>
    </button>
`;
document.body.insertBefore(darkModeToggle, document.body.firstChild);

const darkModeBtn = document.getElementById('darkModeBtn');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let darkMode = localStorage.getItem('darkMode') === 'true' || prefersDark;

// Apply dark mode on load
if (darkMode) {
    document.body.classList.add('dark-mode');
    updateDarkModeButton();
}

// Toggle function
function updateDarkModeButton() {
    const icon = darkModeBtn.querySelector('i');
    const text = darkModeBtn.querySelector('span');
    
    if (darkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        text.textContent = ' Light Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        text.textContent = ' Dark Mode';
    }
}

// Click event
darkModeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkMode);
    updateDarkModeButton();
});

// Scroll Reveal Animation
const scrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

// Add reveal class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
});
// Collapsible Sections
document.querySelectorAll('section').forEach(section => {
    const header = section.querySelector('.section-header');
    
    // Add click event to header
    header.addEventListener('click', () => {
        section.classList.toggle('collapsed');
    });
    
    // Initialize all sections as expanded by default
    section.classList.remove('collapsed');
});
// Text rotation configuration
const designations = [
    { text: "Software Engineer", color: "#3498db" },
    { text: "Techbee Solution Ltd.", color: "#e74c3c" },
    { text: "Edision Group", color: "#2ecc71" },
    { text: "C# Developer", color: "#9b59b6" },
    { text: ".Net Core Specialist", color: "#f1c40f" },
    { text: "Fullstack Developer", color: "#e67e22" },
    { text: "Tech Enthusiast", color: "#1abc9c" }
];

let currentIndex = 0;
const designationContainer = document.querySelector('.animated-designation');

function createTextElement(designation) {
    const span = document.createElement('span');
    span.className = 'designation-text';
    span.textContent = designation.text;
    span.style.color = designation.color;
    return span;
}

function rotateDesignation() {
    // Create new text element
    const newText = createTextElement(designations[currentIndex]);
    designationContainer.prepend(newText);
    
    // Remove old elements after animation
    const oldElements = document.querySelectorAll('.designation-text:not(:first-child)');
    oldElements.forEach(el => el.remove());
    
    // Update index
    currentIndex = (currentIndex + 1) % designations.length;
}

// Initial setup
designationContainer.prepend(createTextElement(designations[0]));
setInterval(rotateDesignation, 3000);
// Scroll handler for squishing header
let lastScrollY = 0;
let ticking = false;
const scrollThreshold = 50; // How many pixels to scroll before squishing
const buffer = 10; // Buffer to prevent flickering

function updateHeader() {
    const header = document.querySelector('header');
    if (lastScrollY >= scrollThreshold) {
        header.classList.add('header-squished');
    } else if (lastScrollY <= (scrollThreshold - buffer)) {
        header.classList.remove('header-squished');
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Initialize header state on load
document.addEventListener('DOMContentLoaded', function() {
    // Make sure header starts expanded
    document.querySelector('header').classList.remove('header-squished');
    
    // Set initial scroll position
    lastScrollY = window.scrollY;
    updateHeader();
});