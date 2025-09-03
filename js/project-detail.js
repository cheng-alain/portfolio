// JavaScript pour les pages de détail projet
// À sauvegarder dans js/project-detail.js

document.addEventListener('DOMContentLoaded', () => {
    initializeProjectPage();
});

function initializeProjectPage() {
    // Navigation smooth scroll
    initSmoothScroll();
    
    // Active nav link highlighting
    initNavHighlight();
    
    // Animations on scroll
    initScrollAnimations();
    
    // Performance logging
    logPagePerformance();
}

// Navigation avec smooth scroll
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .back-btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si c'est un lien vers une section de la page
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = document.querySelector('.project-nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Mise en surbrillance du lien de navigation actif
function initNavHighlight() {
    const sections = document.querySelectorAll('.project-section, .project-hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.project-nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Si on est dans le hero, on considère overview comme actif
        if (current === 'hero' || current === '') {
            current = 'overview';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animations au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animation spéciale pour les métriques
                if (entry.target.classList.contains('metric-card')) {
                    animateMetric(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    const animateElements = document.querySelectorAll('.content-block, .metric-card, .info-card');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(element);
    });
    
    // Style pour les éléments animés
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Animation des métriques avec compteur
function animateMetric(metricCard) {
    const metricValue = metricCard.querySelector('.metric-value');
    const finalValue = metricValue.textContent;
    
    // Extraire le nombre de la métrique
    const numMatch = finalValue.match(/(\d+)/);
    if (!numMatch) return;
    
    const finalNumber = parseInt(numMatch[1]);
    const duration = 1500; // 1.5 secondes
    const steps = 60;
    const increment = finalNumber / steps;
    let currentNumber = 0;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        
        // Remplacer le nombre dans le texte original
        const newText = finalValue.replace(/\d+/, Math.round(currentNumber).toString());
        metricValue.textContent = newText;
    }, duration / steps);
}

// Navigation clavier
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const sections = ['overview', 'architecture', 'technologies', 'results'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        switch(e.key) {
            case 'ArrowDown':
            case 'j':
                e.preventDefault();
                if (currentIndex < sections.length - 1) {
                    scrollToSection(sections[currentIndex + 1]);
                }
                break;
                
            case 'ArrowUp':
            case 'k':
                e.preventDefault();
                if (currentIndex > 0) {
                    scrollToSection(sections[currentIndex - 1]);
                }
                break;
                
            case 'Home':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
                
            case 'End':
                e.preventDefault();
                window.scrollTo({ 
                    top: document.documentElement.scrollHeight, 
                    behavior: 'smooth' 
                });
                break;
        }
    });
}

function getCurrentSection() {
    const sections = ['overview', 'architecture', 'technologies', 'results'];
    const navHeight = document.querySelector('.project-nav').offsetHeight;
    
    for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= navHeight + 100 && rect.bottom > navHeight + 100) {
                return section;
            }
        }
    }
    return 'overview';
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const navHeight = document.querySelector('.project-nav').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Effet parallax subtil
function initParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.project-hero-content');
        const heroVisual = document.querySelector('.project-hero-visual');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * -0.05}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Performance et analytics
function logPagePerformance() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`🚀 Page projet chargée en ${Math.round(loadTime)}ms`);
        
        // Analytics de navigation si disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
        
        // Timing API pour plus de détails
        if ('performance' in window && 'timing' in performance) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            console.log(`📊 Temps de chargement complet: ${loadTime}ms`);
            console.log(`📊 Temps DOM: ${timing.domContentLoadedEventEnd - timing.navigationStart}ms`);
        }
    });
}

// Gestion des liens externes
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https://github.com"], a[href^="https://gitlab.com"]');
    
    externalLinks.forEach(link => {
        // Ajouter target="_blank" si pas déjà présent
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Analytics pour les clics externes
        link.addEventListener('click', (e) => {
            const url = e.target.href;
            console.log(`🔗 Clic vers: ${url}`);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'external_link',
                    event_label: url
                });
            }
        });
    });
}

// Gestion du mode sombre/clair (si implémenté)
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Écouter les changements de thème depuis la page principale
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
            document.documentElement.setAttribute('data-theme', e.newValue);
        }
    });
}

// Préchargement des pages suivantes
function initPreloadNextPages() {
    const nextProjectLink = document.querySelector('.next-project');
    const prevProjectLink = document.querySelector('.prev-project');
    
    // Précharger au hover
    [nextProjectLink, prevProjectLink].forEach(link => {
        if (link) {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (href && !document.querySelector(`link[href="${href}"]`)) {
                    const preloadLink = document.createElement('link');
                    preloadLink.rel = 'prefetch';
                    preloadLink.href = href;
                    document.head.appendChild(preloadLink);
                }
            });
        }
    });
}

// Copy to clipboard pour les snippets de code
function initCodeSnippets() {
    const codeBlocks = document.querySelectorAll('pre, .code-snippet');
    
    codeBlocks.forEach(block => {
        // Ajouter un bouton de copie
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '📋 Copier';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(96, 165, 250, 0.2);
            color: #60a5fa;
            border: 1px solid rgba(96, 165, 250, 0.3);
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyBtn);
        
        // Montrer au hover
        block.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
        
        // Fonctionnalité de copie
        copyBtn.addEventListener('click', async () => {
            try {
                const text = block.textContent.replace('📋 Copier', '').trim();
                await navigator.clipboard.writeText(text);
                
                copyBtn.innerHTML = '✅ Copié';
                setTimeout(() => {
                    copyBtn.innerHTML = '📋 Copier';
                }, 2000);
            } catch (err) {
                console.error('Erreur lors de la copie:', err);
                copyBtn.innerHTML = '❌ Erreur';
                setTimeout(() => {
                    copyBtn.innerHTML = '📋 Copier';
                }, 2000);
            }
        });
    });
}

// Initialisation complète
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectPage();
    initKeyboardNavigation();
    initParallaxEffect();
    initExternalLinks();
    initThemeToggle();
    initPreloadNextPages();
    initCodeSnippets();
});

// Nettoyage au déchargement
window.addEventListener('beforeunload', () => {
    // Nettoyage des event listeners si nécessaire
    console.log('🧹 Nettoyage de la page projet');
});