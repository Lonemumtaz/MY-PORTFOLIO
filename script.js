// ==================== PROFILE IMAGE UPLOAD ==================== 
const imageUpload = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            profileImage.src = event.target.result;
            // Save to localStorage
            localStorage.setItem('profileImage', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load saved profile image on page load
window.addEventListener('load', function() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }
});

// ==================== MOBILE MENU TOGGLE ==================== 
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL NAVIGATION ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ==================== 
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and project items
document.querySelectorAll('.card, .project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add slideInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== ACTIVE NAV LINK ==================== 
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// ==================== COPY TO CLIPBOARD ==================== 
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ==================== FORM VALIDATION (if needed) ==================== 
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== COUNTER ANIMATION ==================== 
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const quickStats = document.querySelector('.quick-stats');
if (quickStats) {
    statsObserver.observe(quickStats);
}

// ==================== TYPING EFFECT (Optional) ==================== 
function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== DARK MODE TOGGLE (Optional) ==================== 
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ==================== KEYBOARD SHORTCUTS ==================== 
document.addEventListener('keydown', function(e) {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== CONSOLE MESSAGE ==================== 
console.log('%cWelcome to Mumtaz Lone\'s Portfolio!', 'color: #2563EB; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code and get in touch!', 'color: #64748B; font-size: 14px;');
console.log('%cGitHub: https://github.com/Lonemumtaz', 'color: #2563EB; font-size: 12px;');
console.log('%cLinkedIn: https://www.linkedin.com/in/mumtazlone', 'color: #2563EB; font-size: 12px;');

// ==================== PERFORMANCE OPTIMIZATION ==================== 
// Lazy load images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.removeAttribute('data-src');
                imageObserver.unobserve(entry.target);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// ==================== ACCESSIBILITY IMPROVEMENTS ==================== 
// Add focus visible styles
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ==================== RESPONSIVE MENU ==================== 
function setupResponsiveMenu() {
    const width = window.innerWidth;
    const navLinks = document.querySelector('.nav-links');
    
    if (width <= 768) {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
}

window.addEventListener('resize', setupResponsiveMenu);
setupResponsiveMenu();

// ==================== PAGE LOAD COMPLETE ==================== 
window.addEventListener('load', function() {
    console.log('Portfolio loaded successfully!');
    document.body.style.opacity = '1';
});
