/**
 * Experience Timeline Visualization
 * Interactive D3.js visualization of professional experience
 */

// Initialize the visualization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for visualization container
    const containerElement = document.getElementById('experience-visualization');
    if (!containerElement) return;
    
    // Initialize the visualization with current resume type
    const currentResumeType = localStorage.getItem('resumeType') || 'product';
    initExperienceVisualization(currentResumeType);
    
    // Listen for resume type changes
    document.querySelectorAll('.resume-toggle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const resumeType = this.dataset.resumeType;
            initExperienceVisualization(resumeType);
        });
    });
});

/**
 * Initialize or update the experience visualization
 * @param {string} resumeType - Current resume type (product or sap)
 */
function initExperienceVisualization(resumeType) {
    // Get the container for visualization
    const container = document.getElementById('experience-visualization');
    if (!container) return;
    
    // Clear previous visualization
    container.innerHTML = '';
    
    // Set dimensions
    const margin = {top: 50, right: 30, bottom: 50, left: 100};
    const width = container.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select('#experience-visualization')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Define the data based on resume type
    const experienceData = getExperienceData(resumeType);
    
    // Create time scale
    const timeScale = d3.scaleTime()
        .domain([
            d3.min(experienceData, d => d.startDate),
            d3.max(experienceData, d => d.endDate || new Date())
        ])
        .range([0, width]);
    
    // Create y scale (for vertical positioning)
    const yScale = d3.scaleBand()
        .domain(experienceData.map(d => d.company))
        .range([0, height])
        .padding(0.2);
    
    // Create axes
    const xAxis = d3.axisBottom(timeScale)
        .ticks(d3.timeYear.every(1))
        .tickFormat(d3.timeFormat('%Y'));
    
    const yAxis = d3.axisLeft(yScale);
    
    // Add x-axis
    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .selectAll('text')
        .style('font-size', '11px')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');
    
    // Add y-axis
    svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)
        .selectAll('text')
        .style('font-size', '12px')
        .style('font-weight', 'bold');
    
    // Create a tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'timeline-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('padding', '10px')
        .style('box-shadow', '0 2px 8px rgba(0,0,0,0.2)')
        .style('max-width', '300px')
        .style('z-index', '10');
    
    // Draw timeline bars
    svg.selectAll('.timeline-bar')
        .data(experienceData)
        .enter()
        .append('rect')
        .attr('class', 'timeline-bar')
        .attr('x', d => timeScale(d.startDate))
        .attr('y', d => yScale(d.company))
        .attr('width', d => timeScale(d.endDate || new Date()) - timeScale(d.startDate))
        .attr('height', yScale.bandwidth())
        .attr('rx', 4)
        .attr('ry', 4)
        .style('fill', d => d.color)
        .style('opacity', 0.8)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            // Highlight the bar
            d3.select(this)
                .style('opacity', 1)
                .style('stroke', '#333')
                .style('stroke-width', 1);
            
            // Show tooltip
            tooltip.html(`
                <div class="font-bold text-lg">${d.title}</div>
                <div class="text-sm font-medium text-gray-600">${d.company}</div>
                <div class="text-xs text-gray-500">${formatDate(d.startDate)} - ${d.endDate ? formatDate(d.endDate) : 'Present'}</div>
                <div class="mt-2 text-sm">${d.description}</div>
                ${d.achievements ? `<div class="mt-1 text-xs text-blue-600">Click for key achievements</div>` : ''}
            `)
            .style('visibility', 'visible')
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY + 10) + 'px');
        })
        .on('mouseout', function() {
            // Remove highlight
            d3.select(this)
                .style('opacity', 0.8)
                .style('stroke', 'none');
            
            // Hide tooltip
            tooltip.style('visibility', 'hidden');
        })
        .on('click', function(event, d) {
            // Scroll to the corresponding experience section
            if (d.elementId) {
                const element = document.getElementById(d.elementId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Flash highlight effect
                    element.classList.add('timeline-highlight');
                    setTimeout(() => {
                        element.classList.remove('timeline-highlight');
                    }, 2000);
                    
                    // If it has achievements and a toggle button, expand it
                    const toggleBtn = element.querySelector('.timeline-toggle-btn');
                    if (toggleBtn) {
                        const achievements = element.querySelector('ul');
                        if (achievements && achievements.classList.contains('hidden')) {
                            toggleBtn.click();
                        }
                    }
                }
            }
        });
    
    // Add labels for major companies
    svg.selectAll('.timeline-label')
        .data(experienceData.filter(d => d.showLabel))
        .enter()
        .append('text')
        .attr('class', 'timeline-label')
        .attr('x', d => timeScale(d.startDate) + (timeScale(d.endDate || new Date()) - timeScale(d.startDate))/2)
        .attr('y', d => yScale(d.company) + yScale.bandwidth()/2 + 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .style('fill', '#fff')
        .style('pointer-events', 'none')
        .text(d => d.title.length > 15 ? d.title.substring(0, 15) + '...' : d.title);
    
    // Add a title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -20)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('Career Timeline');
    
    // Add a legend
    const legendData = [
        {label: 'Product Role', color: '#1e40af'},
        {label: 'Technical Implementation', color: '#3b82f6'},
        {label: 'Leadership Position', color: '#8b5cf6'}
    ];
    
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width - 200}, -40)`);
    
    legend.selectAll('.legend-item')
        .data(legendData)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`)
        .each(function(d) {
            // Add color box
            d3.select(this)
                .append('rect')
                .attr('width', 14)
                .attr('height', 14)
                .attr('rx', 2)
                .attr('ry', 2)
                .style('fill', d.color);
            
            // Add label
            d3.select(this)
                .append('text')
                .attr('x', 20)
                .attr('y', 12)
                .style('font-size', '12px')
                .text(d.label);
        });
    
    // Add resize handler
    window.addEventListener('resize', debounce(() => {
        initExperienceVisualization(resumeType);
    }, 300));
}

/**
 * Get experience data based on resume type
 * @param {string} resumeType - Current resume type
 * @returns {Array} Array of experience objects
 */
function getExperienceData(resumeType) {
    // Base experience data that appears in both resume types
    const baseData = [
        {
            company: 'OurSails',
            title: 'Head of Product & Co-founder',
            startDate: new Date('2023-01-01'),
            endDate: new Date('2024-12-31'),
            description: 'Co-founded a SaaS startup, managing product development and operations with lean methodologies.',
            color: '#8b5cf6',
            showLabel: true,
            elementId: 'oursails-experience'
        },
        {
            company: 'Avertra Corp',
            title: 'Product Operations Manager',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2023-01-01'),
            description: 'Managed product portfolio for a global team and established standards for product road mapping.',
            color: '#8b5cf6',
            showLabel: true,
            elementId: 'avertra-product-ops'
        }
    ];
    
    // SAP-specific experience
    const sapData = [
        {
            company: 'Avertra Corp',
            title: 'Product Owner',
            startDate: new Date('2016-01-01'),
            endDate: new Date('2021-01-01'),
            description: 'Managed product development for MiCustomer platform, spearheading six product developments.',
            color: '#1e40af',
            showLabel: true,
            elementId: 'avertra-product-owner'
        },
        {
            
            company: 'HCL',
            title: 'SAP ISU Consultant - National Fuel & Gas',
            startDate: new Date('2014-01-01'),
            endDate: new Date('2016-01-01'),
            description: 'Configured SAP IS-U Device Management and Energy Data Management modules.',
            color: '#3b82f6',
            showLabel: true,
            elementId: 'hcl-nfg-experience'
        },
        {
            company: 'HCL',
            title: 'SAP ISU Consultant - Hydro One',
            startDate: new Date('2012-01-01'),
            endDate: new Date('2014-01-01'),
            description: 'Managed synchronization of 1.4M smart meters between SAP and Itron IEE systems.',
            color: '#3b82f6',
            showLabel: false,
            elementId: 'hcl-hydro-experience'
        },
        {
            company: 'HCL',
            title: 'SAP Consultant - Fortis BC',
            startDate: new Date('2011-01-01'),
            endDate: new Date('2012-01-01'),
            description: 'Led implementation of iEM customer self-service product with SAP integration.',
            color: '#3b82f6',
            showLabel: false,
            elementId: 'hcl-fortis-experience'
        },
        {
            company: 'HCL',
            title: 'SAP ISU Solutions Developer',
            startDate: new Date('2010-01-01'),
            endDate: new Date('2011-01-01'),
            description: 'Provided support for SAP IS-U solutions development and pre-sales activities.',
            color: '#3b82f6',
            showLabel: false,
            elementId: 'hcl-dev-experience'
        }
    ];
    
    // Product-specific experience
    const productData = [
     
        {
            company: 'Avertra Corp',
            title: 'Product Owner - Halifax Water',
            startDate: new Date('2020-01-01'),
            endDate: new Date('2021-01-01'),
            description: 'Led MiCustomer platform integration with SAP backend systems for utility company.',
            color: '#3b82f6',
            showLabel: false,
            elementId: 'halifax-experience'
        },
        {
            company: 'Avertra Corp',
            title: 'Process Engineer - SWG',
            startDate: new Date('2019-01-01'),
            endDate: new Date('2020-01-01'),
            description: 'Designed BPMN 2.0 workflows to automate SAP BPEM exception handling.',
            color: '#3b82f6',
            showLabel: false,
            elementId: 'swg-experience'
        },
        {
            company: 'Avertra Corp',
            title: 'Product Owner - PSE',
            startDate: new Date('2017-01-01'),
            endDate: new Date('2018-12-31'),
            description: 'Translated SAP-specific requirements into technical specifications for development teams.',
            color: '#3b82f6',
            showLabel: false,
            elementId: 'pse-experience'
        },
        {
            company: 'Avertra Corp',
            title: 'Product Owner - Loudoun Water',
            startDate: new Date('2016-01-01'),
            endDate: new Date('2018-12-31'),
            description: 'Managed MiCustomer platform with focus on SAP IS-U integration points.',
            color: '#3b82f6',
            showLabel: false,
            elementId: 'loudoun-experience'
        },
        {
            company: 'HCL',
            title: 'SAP Functional Solutions Consultant',
            startDate: new Date('2010-01-01'),
            endDate: new Date('2016-01-01'),
            description: 'Led implementation and optimization of utility solutions across North America.',
            color: '#3b82f6',
            showLabel: true,
            elementId: 'hcl-experience'
        }
    ];
    
    // Return appropriate data based on resume type
    return resumeType === 'sap' ? [...baseData, ...sapData] : [...baseData, ...productData];
}

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
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

// Add CSS styles for the visualization
function addVisualizationStyles() {
    // Check if styles already exist
    if (document.getElementById('d3-styles')) return;
    
    // Create style element
    const style = document.createElement('style');
    style.id = 'd3-styles';
    style.textContent = `
        .timeline-bar {
            transition: all 0.3s ease;
        }
        
        .timeline-tooltip {
            transition: all 0.2s ease;
            font-family: system-ui, -apple-system, sans-serif;
        }
        
        .timeline-highlight {
            animation: pulse-highlight 1.5s ease-in-out;
        }
        
        @keyframes pulse-highlight {
            0%, 100% {
                background-color: transparent;
            }
            50% {
                background-color: rgba(59, 130, 246, 0.2);
            }
        }
        
        .x-axis line,
        .x-axis path,
        .y-axis line,
        .y-axis path {
            stroke: #e2e8f0;
        }
    `;
    
    // Add to document head
    document.head.appendChild(style);
}

// Call to add styles
addVisualizationStyles();