// Form validation and submission handling

// 1. OBJECTS - Store form data
const formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interests: [],
    activities: '',
    message: '',
    newsletter: false,
    timestamp: ''
};

// 2. ARRAY METHODS & CONDITIONAL BRANCHING - Validation functions
const validators = {
    validateName: (name) => {
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        return '';
    },

    validateEmail: (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    },

    validateInterests: (interests) => {
        if (interests.length === 0) {
            return 'Please select at least one interest';
        }
        return '';
    }
};

// 3. DOM INTERACTION - Get form elements
function initializeForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const viewSubmissionsBtn = document.getElementById('view-submissions');
    const closeSubmissionsBtn = document.getElementById('close-submissions');

    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    if (viewSubmissionsBtn) {
        viewSubmissionsBtn.addEventListener('click', displaySubmissions);
    }

    if (closeSubmissionsBtn) {
        closeSubmissionsBtn.addEventListener('click', closeSubmissions);
    }
}

// 4. EVENT HANDLING - Form submission
function handleSubmit(event) {
    event.preventDefault();

    // Clear previous errors
    clearErrors();

    // Gather form data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
        .map(checkbox => checkbox.value);
    const activities = document.getElementById('activities').value;
    const message = document.getElementById('message').value;
    const newsletter = document.getElementById('newsletter').checked;

    // Validate
    let isValid = true;

    const firstNameError = validators.validateName(firstName);
    if (firstNameError) {
        showError('first-name', firstNameError);
        isValid = false;
    }

    const lastNameError = validators.validateName(lastName);
    if (lastNameError) {
        showError('last-name', lastNameError);
        isValid = false;
    }

    const emailError = validators.validateEmail(email);
    if (emailError) {
        showError('email', emailError);
        isValid = false;
    }

    const interestsError = validators.validateInterests(interests);
    if (interestsError) {
        showError('interest', interestsError);
        isValid = false;
    }

    // If valid, save to localStorage
    if (isValid) {
        saveSubmission({
            firstName,
            lastName,
            email,
            phone,
            interests,
            activities,
            message,
            newsletter,
            timestamp: new Date().toISOString()
        });

        // Show success message
        document.getElementById('contact-form').style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
    }
}

// 5. LOCALSTORAGE - Save submission
function saveSubmission(data) {
    const submissions = getSubmissions();
    submissions.push(data);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
}

// 6. LOCALSTORAGE - Retrieve submissions
function getSubmissions() {
    const stored = localStorage.getItem('contactSubmissions');
    if (stored) {
        return JSON.parse(stored);
    }
    return [];
}

// 7. TEMPLATE LITERALS - Display submissions
function displaySubmissions() {
    const submissions = getSubmissions();
    const submissionsList = document.getElementById('submissions-list');
    const submissionsSection = document.getElementById('submissions-section');

    if (submissions.length === 0) {
        submissionsList.innerHTML = `<p>No previous submissions found.</p>`;
    } else {
        // Use template literals to build output
        const submissionsHTML = submissions.map((sub, index) => `
            <div class="submission-item">
                <h4>Submission ${index + 1}</h4>
                <p><strong>Name:</strong> ${sub.firstName} ${sub.lastName}</p>
                <p><strong>Email:</strong> ${sub.email}</p>
                ${sub.phone ? `<p><strong>Phone:</strong> ${sub.phone}</p>` : ''}
                <p><strong>Interests:</strong> ${sub.interests.join(', ')}</p>
                ${sub.activities ? `<p><strong>Activities:</strong> ${sub.activities}</p>` : ''}
                ${sub.message ? `<p><strong>Message:</strong> ${sub.message}</p>` : ''}
                <p><strong>Newsletter:</strong> ${sub.newsletter ? 'Yes' : 'No'}</p>
                <p class="timestamp">Submitted: ${new Date(sub.timestamp).toLocaleString()}</p>
            </div>
        `).join('');

        submissionsList.innerHTML = submissionsHTML;
    }

    submissionsSection.style.display = 'block';
}

// 8. DOM MODIFICATION - Show/hide elements
function closeSubmissions() {
    document.getElementById('submissions-section').style.display = 'none';
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement) {
        errorElement.textContent = message;
    }
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');

    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeForm);