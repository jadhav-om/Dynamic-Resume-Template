// Utility Functions
const createElement = (type, className = '', content = '') => {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
};

const createInput = (type, placeholder, className = '') => {
    const input = createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.className = className;
    return input;
};

// Dynamic List Management
function createRemoveButton() {
    const removeBtn = createElement('button', 'remove-btn', '×');
    removeBtn.onclick = function() {
        this.parentElement.remove();
    };
    return removeBtn;
}

function addExperience() {
    const experienceEntry = createElement('div', 'entry');
    const fields = [
        createInput('text', 'Company Name', 'company-name'),
        createInput('text', 'Position', 'position'),
        createInput('text', 'Location', 'location'),
        createInput('date', 'Start Date', 'start-date'),
        createInput('date', 'End Date', 'end-date'),
        createElement('textarea', 'responsibilities', '')
    ];
    fields[5].placeholder = 'Key responsibilities and achievements...';
    
    fields.forEach(field => experienceEntry.appendChild(field));
    experienceEntry.appendChild(createRemoveButton());
    document.getElementById('experienceList').appendChild(experienceEntry);
}

function addEducation() {
    const educationEntry = createElement('div', 'entry');
    const fields = [
        createInput('text', 'Institution Name', 'institution'),
        createInput('text', 'Degree', 'degree'),
        createInput('text', 'Field of Study', 'field'),
        createInput('date', 'Graduation Date', 'grad-date'),
        createInput('text', 'GPA (optional)', 'gpa')
    ];
    
    fields.forEach(field => educationEntry.appendChild(field));
    educationEntry.appendChild(createRemoveButton());
    document.getElementById('educationList').appendChild(educationEntry);
}

function addTechnicalSkills() {
    const category = document.getElementById('skillCategory').value;
    const skills = document.getElementById('skillList').value;
    
    if (!category || !skills) return;
    
    const skillEntry = createElement('div', 'entry');
    const skillContent = createElement('div', 'skill-content');
    skillContent.innerHTML = `<strong>${category}:</strong> ${skills}`;
    
    skillEntry.appendChild(skillContent);
    skillEntry.appendChild(createRemoveButton());
    document.getElementById('technicalSkillsList').appendChild(skillEntry);
    
    // Clear inputs
    document.getElementById('skillCategory').value = '';
    document.getElementById('skillList').value = '';
}

function addCertification() {
    const certEntry = createElement('div', 'entry');
    const fields = [
        createInput('text', 'Certification Name', 'cert-name'),
        createInput('text', 'Issuing Organization', 'issuer'),
        createInput('date', 'Issue Date', 'issue-date'),
        createInput('date', 'Expiry Date (if applicable)', 'expiry-date')
    ];
    
    fields.forEach(field => certEntry.appendChild(field));
    certEntry.appendChild(createRemoveButton());
    document.getElementById('certificationsList').appendChild(certEntry);
}

function addTraining() {
    const trainingEntry = createElement('div', 'entry');
    const fields = [
        createInput('text', 'Training Program', 'training-name'),
        createInput('text', 'Institution', 'institution'),
        createInput('date', 'Completion Date', 'completion-date'),
        createElement('textarea', 'description', '')
    ];
    fields[3].placeholder = 'Brief description of the training...';
    
    fields.forEach(field => trainingEntry.appendChild(field));
    trainingEntry.appendChild(createRemoveButton());
    document.getElementById('trainingList').appendChild(trainingEntry);
}

function addAchievement() {
    const achievementEntry = createElement('div', 'entry');
    const fields = [
        createInput('text', 'Achievement Title', 'achievement-title'),
        createInput('date', 'Date', 'achievement-date'),
        createElement('textarea', 'description', '')
    ];
    fields[2].placeholder = 'Describe your achievement...';
    
    fields.forEach(field => achievementEntry.appendChild(field));
    achievementEntry.appendChild(createRemoveButton());
    document.getElementById('achievementsList').appendChild(achievementEntry);
}

// Resume Generation
function generateResume() {
    const resumeContent = document.getElementById('resumeContent');
    resumeContent.innerHTML = '';
    
    // Personal Information
    const personalInfo = createElement('div', 'resume-section personal-info');
    personalInfo.innerHTML = `
        <h1>${document.getElementById('fullName').value}</h1>
        <p>${document.getElementById('email').value} | ${document.getElementById('phone').value}</p>
        <p>${document.getElementById('location').value}</p>
        ${document.getElementById('linkedin').value ? `<p>LinkedIn: ${document.getElementById('linkedin').value}</p>` : ''}
        ${document.getElementById('portfolio').value ? `<p>Portfolio: ${document.getElementById('portfolio').value}</p>` : ''}
    `;
    resumeContent.appendChild(personalInfo);

    // Professional Summary
    if (document.getElementById('summary').value) {
        const summarySection = createElement('div', 'resume-section');
        summarySection.innerHTML = `
            <h2>Professional Summary</h2>
            <p>${document.getElementById('summary').value}</p>
        `;
        resumeContent.appendChild(summarySection);
    }

    // Work Experience
    const experienceEntries = document.querySelectorAll('#experienceList .entry');
    if (experienceEntries.length > 0) {
        const experienceSection = createElement('div', 'resume-section');
        experienceSection.innerHTML = '<h2>Work Experience</h2>';
        experienceEntries.forEach(entry => {
            experienceSection.innerHTML += `
                <div class="experience-item">
                    <h3>${entry.querySelector('.company-name').value}</h3>
                    <p><strong>${entry.querySelector('.position').value}</strong> - ${entry.querySelector('.location').value}</p>
                    <p>${entry.querySelector('.start-date').value} - ${entry.querySelector('.end-date').value}</p>
                    <p>${entry.querySelector('.responsibilities').value}</p>
                </div>
            `;
        });
        resumeContent.appendChild(experienceSection);
    }

    // Education
    const educationEntries = document.querySelectorAll('#educationList .entry');
    if (educationEntries.length > 0) {
        const educationSection = createElement('div', 'resume-section');
        educationSection.innerHTML = '<h2>Education</h2>';
        educationEntries.forEach(entry => {
            educationSection.innerHTML += `
                <div class="education-item">
                    <h3>${entry.querySelector('.institution').value}</h3>
                    <p>${entry.querySelector('.degree').value} in ${entry.querySelector('.field').value}</p>
                    <p>Graduation: ${entry.querySelector('.grad-date').value}</p>
                    ${entry.querySelector('.gpa').value ? `<p>GPA: ${entry.querySelector('.gpa').value}</p>` : ''}
                </div>
            `;
        });
        resumeContent.appendChild(educationSection);
    }

    // Technical Skills
    const skillEntries = document.querySelectorAll('#technicalSkillsList .entry');
    if (skillEntries.length > 0) {
        const skillsSection = createElement('div', 'resume-section');
        skillsSection.innerHTML = '<h2>Technical Skills</h2>';
        skillEntries.forEach(entry => {
            skillsSection.innerHTML += `<p>${entry.querySelector('.skill-content').innerHTML}</p>`;
        });
        resumeContent.appendChild(skillsSection);
    }

    // Certifications
    const certEntries = document.querySelectorAll('#certificationsList .entry');
    if (certEntries.length > 0) {
        const certSection = createElement('div', 'resume-section');
        certSection.innerHTML = '<h2>Certifications</h2>';
        certEntries.forEach(entry => {
            certSection.innerHTML += `
                <div class="cert-item">
                    <h3>${entry.querySelector('.cert-name').value}</h3>
                    <p>${entry.querySelector('.issuer').value}</p>
                    <p>Issued: ${entry.querySelector('.issue-date').value}</p>
                    ${entry.querySelector('.expiry-date').value ? `<p>Expires: ${entry.querySelector('.expiry-date').value}</p>` : ''}
                </div>
            `;
        });
        resumeContent.appendChild(certSection);
    }

    // Training
    const trainingEntries = document.querySelectorAll('#trainingList .entry');
    if (trainingEntries.length > 0) {
        const trainingSection = createElement('div', 'resume-section');
        trainingSection.innerHTML = '<h2>Training</h2>';
        trainingEntries.forEach(entry => {
            trainingSection.innerHTML += `
                <div class="training-item">
                    <h3>${entry.querySelector('.training-name').value}</h3>
                    <p>${entry.querySelector('.institution').value}</p>
                    <p>Completed: ${entry.querySelector('.completion-date').value}</p>
                    <p>${entry.querySelector('.description').value}</p>
                </div>
            `;
        });
        resumeContent.appendChild(trainingSection);
    }

    // Achievements
    const achievementEntries = document.querySelectorAll('#achievementsList .entry');
    if (achievementEntries.length > 0) {
        const achievementSection = createElement('div', 'resume-section');
        achievementSection.innerHTML = '<h2>Achievements</h2>';
        achievementEntries.forEach(entry => {
            achievementSection.innerHTML += `
                <div class="achievement-item">
                    <h3>${entry.querySelector('.achievement-title').value}</h3>
                    <p>${entry.querySelector('.achievement-date').value}</p>
                    <p>${entry.querySelector('.description').value}</p>
                </div>
            `;
        });
        resumeContent.appendChild(achievementSection);
    }
}

function downloadResume() {
    const resumeContent = document.getElementById('resumeContent');
    const fullName = document.getElementById('fullName').value;
    
    // Configure PDF options
    const opt = {
        margin: 1,
        filename: `${fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(resumeContent).save();
}