/**
 * Enhanced Layout Interactions
 * JavaScript for the three-column layout with improved animations and interactions
 */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initStickyHeader();
    initActiveNavHighlighting();
    initContentCardAnimations();
    initSearchFunctionality();
    
    // Call original script functions
    if (typeof generateQRCode === 'function') {
        generateQRCode();
    }
    
    if (typeof setupEventListeners === 'function') {
        setupEventListeners();
    }
    
    if (typeof checkUrlParams === 'function') {
        checkUrlParams();
    }
    
    if (typeof initSkillsMatrix === 'function') {
        initSkillsMatrix();
    }
    
    if (typeof initTimelineInteraction === 'function') {
        initTimelineInteraction();
    }
});

/**
 * Initialize scroll animations for content sections
 */
function initScrollAnimations() {
    // Add animation class to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.15, // 15% of the item is visible
        rootMargin: '0px 0px -50px 0px' // Slightly before it's in the viewport
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize sticky header with scroll-triggered styling
 */
function initStickyHeader() {
    const header = document.querySelector('.main-content > div:first-child');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('bg-white', 'shadow-md', 'py-3', 'fixed', 'top-0', 'left-0', 'right-0', 'z-10');
            header.classList.remove('mb-8');
            
            // Add padding to the main content to prevent jump
            if (!document.querySelector('.header-spacer')) {
                const spacer = document.createElement('div');
                spacer.classList.add('header-spacer');
                spacer.style.height = `${header.offsetHeight}px`;
                header.parentNode.insertBefore(spacer, header.nextSibling);
            }
        } else {
            header.classList.remove('bg-white', 'shadow-md', 'py-3', 'fixed', 'top-0', 'left-0', 'right-0', 'z-10');
            header.classList.add('mb-8');
            
            // Remove the spacer
            const spacer = document.querySelector('.header-spacer');
            if (spacer) {
                spacer.remove();
            }
        }
    });
}

/**
 * Highlight active navigation link based on scroll position
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar nav a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-300', 'bg-gray-800');
            
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('text-blue-300', 'bg-gray-800');
            }
        });
    });
}

/**
 * Add hover animations to content cards
 */
function initContentCardAnimations() {
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add a subtle glow effect
            card.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Remove the effect
            card.style.boxShadow = '';
        });
    });
}

/**
 * Initialize search functionality
 */
function initSearchFunctionality() {
    const searchInput = document.querySelector('input[type="text"][placeholder="Search..."]');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            // Reset visibility of all sections if search term is too short
            document.querySelectorAll('section').forEach(section => {
                section.style.display = '';
                section.style.opacity = '';
            });
            return;
        }
        
        // Search through all headings and paragraphs
        document.querySelectorAll('section').forEach(section => {
            const headings = section.querySelectorAll('h2, h3, h4');
            const paragraphs = section.querySelectorAll('p');
            const listItems = section.querySelectorAll('li');
            
            let found = false;
            
            // Check headings
            headings.forEach(heading => {
                if (heading.textContent.toLowerCase().includes(searchTerm)) {
                    found = true;
                }
            });
            
            // Check paragraphs
            paragraphs.forEach(paragraph => {
                if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
                    found = true;
                }
            });
            
            // Check list items
            listItems.forEach(item => {
                if (item.textContent.toLowerCase().includes(searchTerm)) {
                    found = true;
                }
            });
            
            // Show/hide section based on search results
            if (found) {
                section.style.display = '';
                section.style.opacity = '1';
            } else {
                section.style.display = 'none';
                section.style.opacity = '0';
            }
        });
    }, 300));
}

/**
 * Utility function to debounce frequent events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
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

/**
 * Add smooth scrolling to all internal links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get height of sticky header if it exists
                const header = document.querySelector('.main-content > div:first-child');
                const headerHeight = header ? header.offsetHeight : 0;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Add mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('#mobile-menu-button');
    const sidebar = document.querySelector('.sidebar');
    
    if (!mobileMenuButton || !sidebar) return;
    
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('translate-x-0');
        sidebar.classList.toggle('-translate-x-full');
    });
    
    // Close menu when clicking a link on mobile
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('translate-x-0');
                sidebar.classList.add('-translate-x-full');
            }
        });
    });
}