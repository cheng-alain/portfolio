window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

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

const navDots = document.querySelectorAll('.nav-dot');
const sections = ['hero', 'projects', 'contact'];

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const section = document.getElementById(sections[index]);
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - window.innerHeight / 2) {
            current = sectionId;
        }
    });

    navDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (sections[index] === current) {
            dot.classList.add('active');
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    card.addEventListener('click', function() {
        this.style.transform = 'translateY(-5px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }, 100);
        
        const url = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (url !== '#') {
            window.open(url, '_blank');
        }
    });
});

let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${rate * 0.3}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Portfolio chargé en ${Math.round(loadTime)}ms`);
    
    if ('performance' in window) {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`📊 Temps de chargement complet: ${loadTime}ms`);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextIndex = Math.min(sections.indexOf(currentSection) + 1, sections.length - 1);
        document.getElementById(sections[nextIndex]).scrollIntoView({ behavior: 'smooth' });
    }
    
    if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevIndex = Math.max(sections.indexOf(currentSection) - 1, 0);
        document.getElementById(sections[prevIndex]).scrollIntoView({ behavior: 'smooth' });
    }
});

function getCurrentSection() {
    let current = 'hero';
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - window.innerHeight / 2) {
            current = sectionId;
        }
    });
    return current;
}