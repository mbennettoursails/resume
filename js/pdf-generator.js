/**
 * PDF Resume Generator
 * Functions to create a professionally formatted PDF version of the resume
 */

// Initialize PDF functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for PDF generation button
    const pdfButton = document.getElementById('generate-pdf');
    if (pdfButton) {
        pdfButton.addEventListener('click', generateResumePDF);
    }
});

/**
 * Generate a PDF version of the resume
 * Uses html2pdf.js library for conversion
 */
function generateResumePDF() {
    // Show loading modal
    showLoadingModal('Preparing your PDF...');
    
    // Get the resume container
    const element = document.getElementById('resume-container');
    
    // Create a clone of the element to modify for PDF generation
    const pdfElement = element.cloneNode(true);
    
    // Add PDF-specific class to the clone
    pdfElement.classList.add('pdf-generation-mode');
    
    // Ensure all sections are visible for PDF
    pdfElement.querySelectorAll('.hidden').forEach(el => {
        el.classList.remove('hidden');
        el.style.opacity = '1';
        el.style.maxHeight = 'none';
    });
    
    // Append clone to the document temporarily (hidden)
    pdfElement.style.position = 'absolute';
    pdfElement.style.left = '-9999px';
    document.body.appendChild(pdfElement);
    
    // Configure PDF options
    const options = {
        margin: [10, 10, 10, 10],
        filename: 'matt-bennett-resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false,
            allowTaint: true,
            backgroundColor: '#ffffff'
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { mode: 'avoid-all', before: '.page-break-before' }
    };
    
    // Generate the PDF
    html2pdf()
        .from(pdfElement)
        .set(options)
        .save()
        .then(() => {
            // Remove the temporary element
            document.body.removeChild(pdfElement);
            
            // Hide loading modal
            hideLoadingModal();
            
            // Show success message
            showSuccessMessage('Resume PDF successfully generated!');
        })
        .catch(error => {
            console.error('PDF generation error:', error);
            
            // Remove the temporary element
            if (document.body.contains(pdfElement)) {
                document.body.removeChild(pdfElement);
            }
            
            hideLoadingModal();
            showErrorMessage('Could not generate PDF. Please try again.');
        });
}

/**
 * Show a loading modal while PDF is being generated
 * @param {string} message - Message to display in modal
 */
function showLoadingModal(message) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('pdf-loading-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'pdf-loading-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        const modalContent = `
            <div class="bg-white p-6 rounded-lg max-w-sm mx-auto text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
                <p class="mt-4 text-gray-800 text-lg font-medium" id="pdf-loading-message"></p>
                <p class="mt-2 text-gray-600 text-sm">This may take a few moments...</p>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
    }
    
    // Update message
    document.getElementById('pdf-loading-message').textContent = message || 'Processing...';
    
    // Show modal
    modal.style.display = 'flex';
}

/**
 * Hide the loading modal
 */
function hideLoadingModal() {
    const modal = document.getElementById('pdf-loading-modal');
    if (modal) {
        // Fade out effect
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        
        // Remove after transition
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.opacity = '1';
        }, 300);
    }
}

/**
 * Show a success message to the user
 * @param {string} message - Success message to display
 */
function showSuccessMessage(message) {
    showToast(message, 'success');
}

/**
 * Show an error message to the user
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    showToast(message, 'error');
}

/**
 * Create and show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, info)
 */
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-4 right-4 z-50';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    
    // Set class based on type
    let bgColor, textColor, iconSVG;
    
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
            break;
        default:
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    }
    
    // Set toast content
    toast.className = `${bgColor} ${textColor} rounded-lg p-4 mb-3 flex items-center shadow-lg transform translate-y-2 opacity-0 transition-all duration-300 ease-in-out`;
    
    toast.innerHTML = `
        <div class="mr-3">${iconSVG}</div>
        <div class="flex-1">${message}</div>
        <button class="ml-4 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);
    
    // Close button functionality
    toast.querySelector('button').addEventListener('click', () => {
        closeToast(toast);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeToast(toast);
    }, 5000);
}

/**
 * Close and remove a toast notification
 * @param {HTMLElement} toast - Toast element to close
 */
function closeToast(toast) {
    // Animate out
    toast.classList.add('translate-y-2', 'opacity-0');
    
    // Remove after animation
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Export functions for use in other modules
window.resumePDF = {
    generate: generateResumePDF,
    showLoading: showLoadingModal,
    hideLoading: hideLoadingModal,
    showSuccess: showSuccessMessage,
    showError: showErrorMessage
};