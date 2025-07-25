// Typing Animation
const typingText = document.getElementById('typing-text');
const textToType = 'Khe_Keh';
let currentText = '';
let index = 0;
let isDeleting = false;

function typeWriter() {
    if (!isDeleting && index < textToType.length) {
        currentText += textToType.charAt(index);
        index++;
    } else if (isDeleting && index > 0) {
        currentText = currentText.slice(0, -1);
        index--;
    }
    
    typingText.textContent = currentText;
    
    if (!isDeleting && index === textToType.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && index === 0) {
        setTimeout(() => {
            isDeleting = false;
        }, 500);
    }
    
    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(typeWriter, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.classList.remove('hidden');
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'slideInUp 0.6s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop; // No need for navbar offset since it's not fixed
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Tech Stack Cube Animation Enhancement
const techCards = document.querySelectorAll('.tech-card');

techCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        const cube = card.querySelector('.cube');
        cube.style.animationPlayState = 'paused';
    });
    
    card.addEventListener('mouseleave', () => {
        const cube = card.querySelector('.cube');
        cube.style.animationPlayState = 'running';
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const phone = contactForm.querySelector('input[type="text"]:nth-of-type(3)').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Intersection Observer for Animation Triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// Back to Top Functionality
const backToTopBtn = document.querySelector('footer p:first-child');

if (backToTopBtn) {
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Remove navbar scroll behavior since it's no longer fixed

// Add loading animation for project cards
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card:not(.hidden)');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for project cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    // Animate cards after a short delay
    setTimeout(animateProjectCards, 500);
});

// Add hover effects for social links
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced cube rotation on hover
techCards.forEach(card => {
    let isHovered = false;
    
    card.addEventListener('mouseenter', () => {
        isHovered = true;
        const cube = card.querySelector('.cube');
        cube.style.transform = 'rotateX(-15deg) rotateY(15deg)';
        cube.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        isHovered = false;
        const cube = card.querySelector('.cube');
        cube.style.transform = 'rotateX(0) rotateY(0)';
        setTimeout(() => {
            if (!isHovered) {
                cube.style.transition = 'transform 0.8s ease';
            }
        }, 300);
    });
});