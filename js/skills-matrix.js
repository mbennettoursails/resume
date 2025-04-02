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
        },
        {
            name: "Tools & Software",
            skills: [
                { name: "Agile Tools (Jira, HPQC, Aha!)", level: 95 },
                { name: "Design Tools (Figma, Canvas, Adobe)", level: 80 },
                { name: "AI Tools (ChatGPT, Midjourney, Copilot)", level: 90 },
                { name: "Office Suites (Microsoft, Google)", level: 95 },
                { name: "Project Management Tools", level: 90 }
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
    tabsContainer.className = 'flex flex-wrap border-b border-gray-200 mb-6';
    skillsContainer.appendChild(tabsContainer);

    function initSkillsLegend() {
        // Get the skills container
        const skillsContainer = document.getElementById('skills-matrix');
        if (!skillsContainer) return;
        
        // Get or create the legend container
        let legendContainer = document.getElementById('skills-legend');
        if (!legendContainer) {
            // If the legend HTML is already added to the page, this won't be needed
            // This is a fallback in case the HTML wasn't added
            const legendHTML = `
            <div id="skills-legend" class="skills-legend bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r mb-6">
                <div class="flex items-start">
                    <div class="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-semibold text-blue-800 mb-1">How to Interpret Skill Levels</h3>
                        <p class="text-sm text-gray-700 mb-2">
                            The percentages represent relative proficiency and experience across different skill areas:
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div class="flex items-center">
                                <div class="w-16 bg-gray-200 h-2.5 rounded-full mr-2">
                                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 95%"></div>
                                </div>
                                <span class="text-gray-700">90-100%: Expert Level</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-16 bg-gray-200 h-2.5 rounded-full mr-2">
                                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 80%"></div>
                                </div>
                                <span class="text-gray-700">80-89%: Advanced</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-16 bg-gray-200 h-2.5 rounded-full mr-2">
                                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 70%"></div>
                                </div>
                                <span class="text-gray-700">70-79%: Proficient</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-16 bg-gray-200 h-2.5 rounded-full mr-2">
                                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 60%"></div>
                                </div>
                                <span class="text-gray-700">60-69%: Competent</span>
                            </div>
                        </div>
                    </div>
                    <div class="ml-2">
                        <button id="skills-legend-toggle" class="text-blue-600 hover:text-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>`;
            
            // Create temporary element to parse HTML
            const temp = document.createElement('div');
            temp.innerHTML = legendHTML;
            legendContainer = temp.firstElementChild;
            
            // Insert legend at the top of skills container, before tabs
            skillsContainer.insertBefore(legendContainer, skillsContainer.firstChild);
        }
        
        // Add toggle functionality if a toggle button exists
        const toggleBtn = document.getElementById('skills-legend-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                // Find the content part of the legend (the div after the button)
                const legendContent = toggleBtn.closest('.skills-legend');
                if (legendContent) {
                    legendContent.remove();
                }
            });
        }
    }

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
// Initialize timeline interaction
function initTimelineInteraction() {
    document.querySelectorAll('.timeline-item').forEach(item => {
        // Get the description and achievements elements
        const description = item.querySelector('p');
        const achievementsHeading = item.querySelector('h4');
        const achievements = item.querySelector('ul');
        
        // If elements don't exist or a toggle button already exists, exit
        if (!description || !achievements || item.querySelector('.timeline-toggle-btn')) return;
        
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'timeline-toggle-btn text-blue-600 text-sm mt-1 mb-3 flex items-center focus:outline-none';
        toggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span>View Details</span>
        `;
        
        // Insert toggle button after the achievements heading if it exists,
        // otherwise after the description
        if (achievementsHeading) {
            achievementsHeading.parentNode.insertBefore(toggleBtn, achievementsHeading.nextSibling);
        } else {
            description.parentNode.insertBefore(toggleBtn, description.nextSibling);
        }
        
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