// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Generate QR Code
    generateQRCode();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check for URL parameters (for sharing functionality)
    checkUrlParams();
});

/**
 * Generate QR Code with vCard information
 */
function generateQRCode() {
    // Create vCard format
    const vCardData = createVCard();
    
    // Generate QR code in the specified element
    new QRCode(document.getElementById("qrcode"), {
        text: vCardData,
        width: 128,
        height: 128,
        colorDark: "#1e40af",  // Blue matching the site theme
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

/**
 * Create vCard format string with personal information
 */
function createVCard() {
    return `BEGIN:VCARD
VERSION:3.0
N:Bennett;Matt;;;
FN:Matt Bennett
TITLE:Strategic Product Leader
EMAIL:mjbennett14@gmail.com
URL:https://www.linkedin.com/in/matt-bennett83
NOTE:10+ years of product leadership experience
END:VCARD`;
}

/**
 * Set up all event listeners for the page
 */
function setupEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Share button functionality
    const shareButton = document.getElementById('shareButton');
    if (shareButton) {
        shareButton.addEventListener('click', shareVCard);
    }
    
    // Add modal close functionality
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

/**
 * Share vCard functionality
 */
function shareVCard() {
    // Create vCard format
    const vCard = createVCard();
    
    // Check if the Web Share API is available
    if (navigator.share) {
        // Create a Blob with the vCard data
        const vCardBlob = new Blob([vCard], { type: 'text/vcard' });
        
        // Create a File from the Blob
        const vCardFile = new File([vCardBlob], 'matt-bennett.vcf', { type: 'text/vcard' });
        
        // Use the Web Share API
        navigator.share({
            title: 'Matt Bennett - Product Leader',
            text: 'Contact information for Matt Bennett',
            files: [vCardFile]
        })
        .catch(error => {
            console.error('Error sharing:', error);
            // Fallback to download if sharing fails
            downloadVCard(vCard);
        });
    } else {
        // Fallback for browsers that don't support the Web Share API
        downloadVCard(vCard);
    }
}

/**
 * Download vCard as a file
 */
function downloadVCard(vCardData) {
    // Create an invisible link element
    const element = document.createElement('a');
    
    // Create a blob with the vCard data
    const vCardBlob = new Blob([vCardData], { type: 'text/vcard' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(vCardBlob);
    
    // Set the attributes for the download link
    element.setAttribute('href', url);
    element.setAttribute('download', 'matt-bennett.vcf');
    
    // Hide the element
    element.style.display = 'none';
    
    // Add to document, click, and remove
    document.body.appendChild(element);
    element.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(element);
        URL.revokeObjectURL(url);
    }, 100);
}

/**
 * Check for URL parameters
 * This can be used for tracking or showing specific sections
 */
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Example: If 'section' parameter exists, scroll to that section
    const section = urlParams.get('section');
    if (section) {
        const targetElement = document.getElementById(section);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
}

/**
 * Dynamic content loading (for potential future use)
 */
function loadDynamicContent(url, targetElementId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(targetElementId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading dynamic content:', error);
        });
}

/**
 * Add a modal to the page dynamically
 */
function createModal(id, title, content) {
    // Create the modal structure
    const modalHTML = `
        <div id="${id}" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${title}</h2>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    // Add to the document
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Set up close button functionality
    document.querySelector(`#${id} .close-modal`).addEventListener('click', function() {
        document.getElementById(id).style.display = 'none';
    });
    
    return document.getElementById(id);
}

// Performance monitoring (optional)
if ('performance' in window && 'PerformanceObserver' in window) {
    // Create performance observer
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            // Log performance metrics (useful for debugging)
            console.log(`[Performance] ${entry.name}: ${entry.startTime.toFixed(0)}ms`);
        });
    });
    
    // Start observing paint timing events
    perfObserver.observe({ entryTypes: ['paint'] });
}