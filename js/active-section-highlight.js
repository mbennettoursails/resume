/**
 * Active Section Highlighting
 * Adds highlighting to the navigation item of the currently visible section
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections that should be tracked
    const sections = document.querySelectorAll('section[id]');
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    
    // Function to handle scroll events
    function onScroll() {
        // Current scroll position
        const scrollY = window.scrollY;
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Offset for header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active', 'highlight-current-section');
                });
                
                // Add active class to corresponding navigation link
                const correspondingLink = document.querySelector(`.sidebar nav ul li a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active', 'highlight-current-section');
                }
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', onScroll);
    
    // Call once on page load
    onScroll();
    
    // Make nav links scroll smoothly
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering page jump
                history.pushState(null, null, targetId);
                
                // Update active class
                navLinks.forEach(link => {
                    link.classList.remove('active', 'highlight-current-section');
                });
                this.classList.add('active', 'highlight-current-section');
            }
        });
    });
    
    // Check if hash exists on page load and scroll to it
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            // Slight delay to ensure page is fully loaded
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active class for the navigation link
                const correspondingLink = document.querySelector(`.sidebar nav ul li a[href="${window.location.hash}"]`);
                if (correspondingLink) {
                    navLinks.forEach(link => {
                        link.classList.remove('active', 'highlight-current-section');
                    });
                    correspondingLink.classList.add('active', 'highlight-current-section');
                }
            }, 300);
        }
    }
});