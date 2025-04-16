/**
 * Resume Switcher Component
 * Handles toggling between different resume versions and updating UI accordingly
 */

// Resume types and their data
const resumeTypes = {
    product: {
        title: "Strategic Product Leader",
        pdfPath: "./assets/MATT BENNETT - Product Manager - 2025.pdf",
        skillCategories: [
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
        ],
        summary: `
            <p class="text-lg leading-relaxed">
                As a strategic product leader with 10+ years of dedicated product ownership and management experience, 
                I excel at bridging technical and business objectives while leading agile development teams to deliver innovative solutions. 
                My experience spans from scaling a SaaS startup to managing enterprise-level products, demonstrating expertise in 
                translating complex business requirements into clear technical specifications and actionable user stories.
            </p>
            <p class="text-lg leading-relaxed mt-4">
                My technical background in Computer Information Systems, combined with my MBA, enables me to effectively
                communicate across all organizational levels—from development teams to C-suite stakeholders. I've demonstrated 
                success in implementing emerging technologies like AI/ML and RPA, reducing operational costs by 50% through 
                strategic automation, and scaling products from concept to market success.
            </p>
        `
    },
    sap: {
        title: "SAP ISU Consultant",
        pdfPath: "./assets/Matt Bennett - SAP - 2025.pdf",
        skillCategories: [
            {
                name: "SAP Expertise",
                skills: [
                    { name: "IS-U Device Management", level: 95 },
                    { name: "Energy Data Management", level: 90 },
                    { name: "MDUS", level: 85 },
                    { name: "Customer Information Systems", level: 85 },
                    { name: "SAP Configuration", level: 90 }
                ]
            },
            {
                name: "Technical Integration",
                skills: [
                    { name: "SAP Web Services", level: 85 },
                    { name: "Smart Grid & AMI Integration", level: 80 },
                    { name: "BPEM", level: 85 },
                    { name: "Meter Reading Solutions", level: 90 },
                    { name: "ABAP Debugging", level: 75 }
                ]
            },
            {
                name: "Product Leadership",
                skills: [
                    { name: "Requirements Analysis", level: 90 },
                    { name: "Gap Analysis", level: 85 },
                    { name: "Functional Design", level: 80 },
                    { name: "UI/UX Development", level: 75 },
                    { name: "Business Process Design", level: 85 }
                ]
            },
            {
                name: "Metering Systems",
                skills: [
                    { name: "Itron IEE Platform", level: 85 },
                    { name: "MV90", level: 80 },
                    { name: "Smart Meter Integration", level: 90 },
                    { name: "Meter Reading Upload/Download", level: 85 },
                    { name: "Data Management", level: 80 }
                ]
            }
        ],
        summary: `
            <p class="text-lg leading-relaxed">
                Senior SAP ISU Consultant with 10+ years of specialized experience implementing and
                optimizing utility solutions across North America. Expert in SAP IS-U Device
                Management (DM), Energy Data Management (EDM), and MDUS with proven success
                in AMI integration and smart metering systems.
            </p>
            <p class="text-lg leading-relaxed mt-4">
                Demonstrated leadership in full lifecycle implementations, web service integrations, and 
                user-centered product design. Adept at cross-functional collaboration with business stakeholders, 
                technical teams, and offshore resources using Agile methodologies. Strong problem-solver
                with experience in managing critical implementations with zero post-launch defects.
            </p>
        `
    }
};

// Initialize the resume switcher
document.addEventListener('DOMContentLoaded', function() {
    // Set default resume type or get from localStorage
    const currentResumeType = localStorage.getItem('resumeType') || 'product';
    
    // Update UI for the current resume type
    updateResumeUI(currentResumeType);
    
    // Add event listeners for toggle buttons
    document.querySelectorAll('.resume-toggle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const resumeType = this.dataset.resumeType;
            updateResumeUI(resumeType);
            localStorage.setItem('resumeType', resumeType);
        });
    });
});

/**
 * Update UI based on the selected resume type
 * @param {string} resumeType - The type of resume to display (product or sap)
 */
function updateResumeUI(resumeType) {
    if (!resumeTypes[resumeType]) return;
    
    const resumeData = resumeTypes[resumeType];
    
    // Update title in header and sidebar
    document.title = `Matt Bennett - ${resumeData.title}`;
    
    const resumeTitle = document.getElementById('resume-title');
    if (resumeTitle) {
        resumeTitle.textContent = resumeData.title;
    }
    
    // Update download button
    const downloadBtn = document.getElementById('download-resume-btn');
    if (downloadBtn) {
        downloadBtn.href = resumeData.pdfPath;
        downloadBtn.download = `Matt Bennett - ${resumeData.title} Resume.pdf`;
    }
    
    // Update summary section
    const summaryContent = document.querySelector('#summary .prose');
    if (summaryContent) {
        summaryContent.innerHTML = resumeData.summary;
    }
    
    // Update skills section if skills matrix is initialized
    if (typeof window.updateSkillsMatrix === 'function') {
        window.updateSkillsMatrix(resumeData.skillCategories);
    } else {
        // Store the skills data for later when the skills matrix is initialized
        window.resumeSkillsData = resumeData.skillCategories;
    }
    
    // Update toggle button styles
    document.querySelectorAll('.resume-toggle-btn').forEach(button => {
        if (button.dataset.resumeType === resumeType) {
            button.classList.add('bg-blue-600', 'text-white');
            button.classList.remove('bg-gray-700', 'text-gray-300');
        } else {
            button.classList.add('bg-gray-700', 'text-gray-300');
            button.classList.remove('bg-blue-600', 'text-white');
        }
    });
    
    // Update experience section if the function exists
    if (typeof window.updateExperienceSection === 'function') {
        window.updateExperienceSection(resumeType);
    }
}

// Export the update function for use in skills-matrix.js
window.updateResumeUI = updateResumeUI;