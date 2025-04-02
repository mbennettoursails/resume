// Skills Matrix Visualization
function initSkillsMatrix() {
    const skillCategories = [
        {
            name: "Product Management",
            skills: [
                { name: "Product Strategy", level: 95 },
                { name: "Agile Methodologies", level: 90 },
                { name: "Product Roadmapping", level: 95 },
                { name: "User Story Definition", level: 85 },
                { name: "Market Research", level: 80 }
            ]
        },
        {
            name: "Technical",
            skills: [
                { name: "Mendix Development", level: 85 },
                { name: "UI/UX Design", level: 75 },
                { name: "API Integration", level: 80 },
                { name: "SAP Implementation", level: 85 },
                { name: "Data Analysis", level: 70 }
            ]
        },
        {
            name: "Leadership",
            skills: [
                { name: "Team Management", level: 90 },
                { name: "Stakeholder Communication", level: 95 },
                { name: "Cross-functional Collaboration", level: 90 },
                { name: "Client Relations", level: 85 },
                { name: "Strategic Planning", level: 85 }
            ]
        }
    ];

    // Create container for each category
    const skillsContainer = document.getElementById('skills-matrix');
    if (!skillsContainer) return;

    // Clear existing content
    skillsContainer.innerHTML = '';

    // Create tabs
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'flex border-b border-gray-200 mb-6';
    skillsContainer.appendChild(tabsContainer);

    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'skills-content';
    skillsContainer.appendChild(contentContainer);

    // Create tabs and content
    skillCategories.forEach((category, index) => {
        // Create tab
        const tab = document.createElement('button');
        tab.className = `py-2 px-4 font-medium ${index === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`;
        tab.textContent = category.name;
        tab.dataset.category = index.toString();
        tab.addEventListener('click', () => switchCategory(index));
        tabsContainer.appendChild(tab);

        // Create content panel
        const panel = document.createElement('div');
        panel.className = `skills-panel ${index === 0 ? 'block' : 'hidden'}`;
        panel.dataset.category = index.toString();
        contentContainer.appendChild(panel);

        // Add skills to panel
        category.skills.forEach(skill => {
            const skillRow = document.createElement('div');
            skillRow.className = 'mb-4';

            const skillHeader = document.createElement('div');
            skillHeader.className = 'flex justify-between mb-1';

            const skillName = document.createElement('span');
            skillName.className = 'text-gray-700';
            skillName.textContent = skill.name;

            const skillLevel = document.createElement('span');
            skillLevel.className = 'text-gray-500 text-sm';
            skillLevel.textContent = `${skill.level}%`;

            skillHeader.appendChild(skillName);
            skillHeader.appendChild(skillLevel);

            const progressContainer = document.createElement('div');
            progressContainer.className = 'w-full bg-gray-200 rounded-full h-2.5';

            const progressBar = document.createElement('div');
            progressBar.className = 'bg-blue-600 h-2.5 rounded-full';
            progressBar.style.width = '0%'; // Start at 0% width
            progressBar.dataset.level = skill.level.toString();
            
            progressContainer.appendChild(progressBar);
            skillRow.appendChild(skillHeader);
            skillRow.appendChild(progressContainer);
            panel.appendChild(skillRow);
        });
    });

    // Initial animation for the first tab
    animateSkillBars(0);

    // Tab switching function
    function switchCategory(categoryIndex) {
        // Convert to string for dataset comparison
        const categoryIndexStr = categoryIndex.toString();
        
        // Update tab styles
        document.querySelectorAll('button[data-category]').forEach(button => {
            if (button.dataset.category === categoryIndexStr) {
                button.className = 'py-2 px-4 font-medium text-blue-600 border-b-2 border-blue-600';
            } else {
                button.className = 'py-2 px-4 font-medium text-gray-500 hover:text-blue-600';
            }
        });
        
        // Show/hide panels
        document.querySelectorAll('.skills-panel').forEach(panel => {
            if (panel.dataset.category === categoryIndexStr) {
                panel.classList.remove('hidden');
                panel.classList.add('block');
                
                // Animate the progress bars in this panel
                animateSkillBars(categoryIndex);
            } else {
                panel.classList.add('hidden');
                panel.classList.remove('block');
            }
        });
    }
    
    // Function to animate skill bars
    function animateSkillBars(categoryIndex) {
        const panel = document.querySelector(`.skills-panel[data-category="${categoryIndex}"]`);
        if (!panel) return;
        
        const progressBars = panel.querySelectorAll('.bg-blue-600');
        
        // Reset all bars first
        progressBars.forEach(bar => {
            bar.style.transition = 'none';
            bar.style.width = '0%';
        });
        
        // Force reflow
        void panel.offsetWidth;
        
        // Animate bars to their target values
        setTimeout(() => {
            progressBars.forEach(bar => {
                const level = bar.dataset.level;
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = `${level}%`;
            });
        }, 50);
    }
}

// Initialize timeline interaction
function initTimelineInteraction() {
    document.querySelectorAll('.timeline-item').forEach(item => {
        // Get the description and achievements elements
        const description = item.querySelector('p');
        const achievements = item.querySelector('ul');
        
        if (!description || !achievements) return;
        
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'text-blue-600 text-sm mt-2 mb-3 flex items-center focus:outline-none';
        toggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span>View Details</span>
        `;
        
        // Insert toggle button after description
        description.parentNode.insertBefore(toggleBtn, description.nextSibling);
        
        // Hide achievements initially
        achievements.classList.add('hidden');
        achievements.style.maxHeight = '0px';
        achievements.style.opacity = '0';
        
        // Toggle functionality
        toggleBtn.addEventListener('click', () => {
            const isHidden = achievements.classList.contains('hidden');
            
            // Show/hide achievements
            if (isHidden) {
                achievements.classList.remove('hidden');
                
                // Animate showing
                setTimeout(() => {
                    achievements.style.maxHeight = achievements.scrollHeight + 'px';
                    achievements.style.opacity = '1';
                }, 10);
                
                toggleBtn.querySelector('span').textContent = 'Hide Details';
                toggleBtn.querySelector('svg').style.transform = 'rotate(180deg)';
            } else {
                achievements.style.maxHeight = '0px';
                achievements.style.opacity = '0';
                
                // Hide after animation completes
                setTimeout(() => {
                    achievements.classList.add('hidden');
                }, 300);
                
                toggleBtn.querySelector('span').textContent = 'View Details';
                toggleBtn.querySelector('svg').style.transform = 'rotate(0)';
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skills matrix with animation
    initSkillsMatrix();
    
    // Initialize timeline interaction
    initTimelineInteraction();
    
    // Initialize scroll animations
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        // Add initial state class
        item.classList.add('opacity-0', 'translate-y-8');
        
        // Create observer for animation
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger the animations
                    setTimeout(() => {
                        item.classList.add('transition-all', 'duration-700');
                        item.classList.remove('opacity-0', 'translate-y-8');
                        observer.unobserve(entry.target);
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(item);
    });
});