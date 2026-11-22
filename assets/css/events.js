/* ============================================
   EVENTS PAGE - JAVASCRIPT FUNCTIONALITY
   Rajalakshmi Medical College & Hospital
   ============================================ */

// ============================================
// 1. AOS INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: false,
        mirror: true,
        offset: 100,
        delay: 0,
    });

    // Initialize Counter Animations
    initializeCounters();
    
    // Initialize Other Features
    initializeScrollEffects();
    initializeInteractiveElements();
});

// ============================================
// 2. COUNTER ANIMATION
// ============================================

function initializeCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const speed = 2000; // Animation duration in ms

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target, speed);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, duration) {
    const target = parseInt(element.getAttribute('data-counter'));
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// 3. SCROLL EFFECTS
// ============================================

function initializeScrollEffects() {
    // Hero Banner Parallax Effect
    const heroBanner = document.querySelector('.events-hero-banner');
    if (heroBanner) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const shapes = heroBanner.querySelectorAll('.hero-shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// 4. INTERACTIVE ELEMENTS
// ============================================

function initializeInteractiveElements() {
    // Breadcrumb Interaction
    initializeBreadcrumbs();
    
    // Event Card Hover Effects
    initializeEventCards();
    
    // Gallery Modal Enhancement
    initializeGalleryModals();
    
    // Button Ripple Effect
    initializeButtonRipples();
}

function initializeBreadcrumbs() {
    const breadcrumbItems = document.querySelectorAll('.breadcrumb-item a');
    breadcrumbItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigating to:', this.textContent);
            // Add custom navigation logic here
        });
    });
}

function initializeEventCards() {
    const eventCards = document.querySelectorAll('.event-showcase');
    
    eventCards.forEach(card => {
        const image = card.querySelector('.event-image');
        const button = card.querySelector('.btn-event-cta');

        if (image) {
            image.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease-in-out';
            });
        }

        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const eventTitle = card.querySelector('.event-title').textContent;
                console.log('Event Details:', eventTitle);
                // Add event details modal or navigation
            });
        }
    });
}

function initializeGalleryModals() {
    const modalButtons = document.querySelectorAll('[data-toggle="modal"]');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetModal = this.getAttribute('data-target');
            console.log('Opening modal:', targetModal);
            
            // Add animation class
            const modal = document.querySelector(targetModal);
            if (modal) {
                setTimeout(() => {
                    modal.classList.add('modal-animated');
                }, 100);
            }
        });
    });

    // Handle modal close
    const closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('modal-animated');
            }
        });
    });
}

function initializeButtonRipples() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ============================================
// 5. MOBILE NAVIGATION ENHANCEMENTS
// ============================================

function initializeMobileEnhancements() {
    // Check if device is mobile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Adjust touch targets for mobile
        document.querySelectorAll('.btn, a').forEach(element => {
            element.style.minHeight = '44px';
            element.style.minWidth = '44px';
        });

        // Initialize touch events
        initializeTouchEvents();
    }

    // Handle window resize
    window.addEventListener('resize', debounce(function() {
        const isMobileNow = window.innerWidth < 768;
        if (isMobileNow !== isMobile) {
            location.reload();
        }
    }, 250));
}

function initializeTouchEvents() {
    // Add touch feedback
    const touchElements = document.querySelectorAll('.event-showcase, .stat-card, .achievement-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });

        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// ============================================
// 6. UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// 7. PAGE PERFORMANCE OPTIMIZATION
// ============================================

// Lazy Load Images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ============================================
// 8. ANALYTICS & EVENT TRACKING
// ============================================

function trackEvent(eventName, eventData = {}) {
    // Google Analytics or custom tracking
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log('Event Tracked:', eventName, eventData);
}

function initializeEventTracking() {
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_click', {
                button_text: this.textContent.trim(),
                button_class: this.className
            });
        });
    });

    // Track form interactions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            trackEvent('form_submission', {
                form_id: this.id || 'unknown'
            });
        });
    });

    // Track modal opens
    document.querySelectorAll('[data-toggle="modal"]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-target');
            trackEvent('modal_opened', {
                modal_id: modalId
            });
        });
    });
}

// ============================================
// 9. DOCUMENT READY & INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeLazyLoading();
    initializeMobileEnhancements();
    initializeEventTracking();

    // Add loaded class to body
    document.body.classList.add('page-loaded');

    console.log('Events Page Initialized Successfully');
});

// ============================================
// 10. ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to Content Link
document.addEventListener('keydown', function(e) {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #1e40af;
            color: white;
            padding: 8px;
            z-index: 100;
        `;
        document.body.insertBefore(skipLink, document.body.firstChild);
        skipLink.focus();
    }
});

// Enhanced Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Tab Navigation Enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// ============================================
// 11. RESPONSIVE BEHAVIOR
// ============================================

const mediaQueryList = window.matchMedia('(max-width: 768px)');

function handleMediaChange(e) {
    if (e.matches) {
        // Mobile behavior
        document.body.classList.add('mobile');
        adjustMobileLayout();
    } else {
        // Desktop behavior
        document.body.classList.remove('mobile');
        adjustDesktopLayout();
    }
}

mediaQueryList.addListener(handleMediaChange);

function adjustMobileLayout() {
    // Mobile-specific adjustments
    const timeline = document.querySelector('.timeline-container');
    if (timeline) {
        timeline.classList.add('mobile-timeline');
    }
}

function adjustDesktopLayout() {
    // Desktop-specific adjustments
    const timeline = document.querySelector('.timeline-container');
    if (timeline) {
        timeline.classList.remove('mobile-timeline');
    }
}

// ============================================
// 12. CUSTOM ANIMATIONS & INTERACTIONS
// ============================================

// Staggered Animation for Event Cards
function staggerEventCards() {
    const cards = document.querySelectorAll('.event-showcase');
    cards.forEach((card, index) => {
        card.style.setProperty('--stagger-index', index);
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    });
}

// Counter Animation on Scroll
function setupScrollCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                animateValue(entry.target, 0, target, 2000);
                entry.target.setAttribute('data-counted', 'true');
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize on page load
window.addEventListener('load', function() {
    staggerEventCards();
    setupScrollCounters();
});

// ============================================
// 13. ERROR HANDLING
// ============================================

window.addEventListener('error', function(event) {
    console.error('Application Error:', event.error);
    // Send error to analytics or monitoring service
    if (window.gtag) {
        gtag('event', 'exception', {
            description: event.error.message,
            fatal: false
        });
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// ============================================
// 14. EXPORT FUNCTIONS FOR DEBUGGING
// ============================================

window.EventsPageDebug = {
    trackEvent: trackEvent,
    initializeCounters: initializeCounters,
    animateCounter: animateCounter,
    debounce: debounce,
    throttle: throttle
};
