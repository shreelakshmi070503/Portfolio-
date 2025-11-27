// Cursor Glow Effect
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Floating Shapes Mouse Movement
const shapes = document.querySelectorAll('.shape');

document.addEventListener('mousemove', (e) => {
    const mouseXPercent = e.clientX / window.innerWidth;
    const mouseYPercent = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseXPercent - 0.5) * 50 * speed;
        const y = (mouseYPercent - 0.5) * 50 * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.setProperty('--progress-width', progress + '%');
                }
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll('.skill-card, .project-card, .bio-text, .experience-card, .future-card, .tool-badge');
animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// 3D Card Tilt Effect
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', handleTiltReset);
});

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function handleTiltReset(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
}

// Parallax Scroll Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content, .profile-frame');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Dynamic Particles Background
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(16, 185, 129, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Skill Card Hover Glow Effect
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 25px 50px rgba(16, 185, 129, 0.4), 0 0 70px rgba(16, 185, 129, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Scroll Progress Indicator (optional enhancement)
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can use this value to update a progress bar if needed
    // For now, we'll use it to adjust the cursor glow intensity
    const intensity = Math.min(scrolled / 100, 1);
    cursorGlow.style.opacity = 0.5 + (intensity * 0.5);
}

window.addEventListener('scroll', updateScrollProgress);

// Add stagger animation to bio text paragraphs
const bioTexts = document.querySelectorAll('.bio-text');
bioTexts.forEach((text, index) => {
    text.style.animationDelay = `${index * 0.1}s`;
});

// Tool badges hover animation
const toolBadges = document.querySelectorAll('.tool-badge');
toolBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.05}s`;
    badge.classList.add('fade-in');
});

// Add intersection observer for tool badges
toolBadges.forEach(badge => {
    observer.observe(badge);
});

// Responsive adjustments
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable some heavy animations on mobile for better performance
        shapes.forEach(shape => {
            shape.style.display = 'none';
        });
    } else {
        shapes.forEach(shape => {
            shape.style.display = 'block';
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on load

// Add glitch effect to name on hover (subtle)
const nameElement = document.querySelector('.name');
if (nameElement) {
    nameElement.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.6)';
    });
    
    nameElement.addEventListener('mouseleave', function() {
        this.style.textShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
    });
}

// Console message for visitors
console.log('%c👋 Hello there!', 'font-size: 20px; color: #10b981; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #34d399;');
console.log('%c- Shreelakshmi C', 'font-size: 12px; color: #e5e5e5;');