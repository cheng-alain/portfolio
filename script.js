// Smooth scrolling for navigation links
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

// Add typing effect to command line
const commandElement = document.querySelector('.command-line');
const originalText = 'kubectl get developer --name=votreNom';
let i = 0;

function typeWriter() {
    if (i < originalText.length) {
        commandElement.innerHTML = originalText.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        commandElement.innerHTML = '<span class="cursor">|</span>';
        i = 0;
        typeWriter();
    }, 1000);
});

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add scroll animation for timeline items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

// Initialize timeline animations
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        // Observe for animation
        observer.observe(item);
    });
    
    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(category);
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        observer.observe(card);
    });
});

// Add active navigation state
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add particle effect on mouse move (optional cool effect)
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '4px';
    cursor.style.height = '4px';
    cursor.style.background = '#34d399';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.opacity = '0.7';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'opacity 0.5s ease';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.style.opacity = '0';
        setTimeout(() => {
            if (cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
            }
        }, 500);
    }, 200);
});

// Console easter egg
console.log(`
    ╔══════════════════════════════════════╗
    ║          🚀 Portfolio DevOps          ║
    ║                                      ║
    ║  Merci d'avoir visité mon portfolio! ║
    ║  Si tu vois ce message, tu es        ║
    ║  probablement un développeur... 👨‍💻   ║
    ║                                      ║
    ║  N'hésite pas à me contacter !       ║
    ╚══════════════════════════════════════╝
`);

// Add performance monitoring
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Page chargée en ${loadTime}ms`);
});