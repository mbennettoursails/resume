/**
 * Experience Section Handling for Different Resume Types
 * This script extends the resume-switcher.js functionality to handle showing/hiding
 * experience timeline items based on the selected resume type.
 */

// Function to update the experience section based on resume type
function updateExperienceSection(resumeType) {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Show/hide items based on resume type
    timelineItems.forEach(item => {
        const itemResumeType = item.getAttribute('data-resume-type');
        
        // If the item should appear in both resume types or matches the current type
        if (itemResumeType === 'both' || itemResumeType === resumeType) {
            item.style.display = '';
            
            // Show/hide specific content within the item
            item.querySelectorAll(`.product-specific`).forEach(el => {
                el.style.display = resumeType === 'product' ? '' : 'none';
            });
            
            item.querySelectorAll(`.sap-specific`).forEach(el => {
                el.style.display = resumeType === 'sap' ? '' : 'none';
            });
        } else {
            // Hide items that don't belong in this resume type
            item.style.display = 'none';
        }
    });
}

// Extend the existing updateResumeUI function
const originalUpdateResumeUI = window.updateResumeUI;
if (typeof originalUpdateResumeUI === 'function') {
    window.updateResumeUI = function(resumeType) {
        // Call the original function first
        originalUpdateResumeUI(resumeType);
        
        // Then update the experience section
        updateExperienceSection(resumeType);
    };
} else {
    // If the original function isn't available yet, set up a function
    // that will be called once the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        const checkAndExtend = function() {
            if (typeof window.updateResumeUI === 'function') {
                const originalFunc = window.updateResumeUI;
                window.updateResumeUI = function(resumeType) {
                    originalFunc(resumeType);
                    updateExperienceSection(resumeType);
                };
                
                // Initial call to update experience section
                const currentResumeType = localStorage.getItem('resumeType') || 'product';
                updateExperienceSection(currentResumeType);
                
                clearInterval(checkInterval);
            }
        };
        
        // Check periodically until updateResumeUI is defined
        const checkInterval = setInterval(checkAndExtend, 100);
        
        // Stop checking after 5 seconds to prevent endless checking
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 5000);
    });
}

// Export the function for potential use elsewhere
window.updateExperienceSection = updateExperienceSection;

// Initialize experience section immediately if possible
document.addEventListener('DOMContentLoaded', function() {
    // If resume type is already set in localStorage, use it
    // Otherwise default to 'product'
    const currentResumeType = localStorage.getItem('resumeType') || 'product';
    
    // Update experience section
    if (document.querySelectorAll('.timeline-item').length > 0) {
        updateExperienceSection(currentResumeType);
    }
});