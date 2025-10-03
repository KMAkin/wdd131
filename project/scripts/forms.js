// JavaScript for Contact Form - No Excuse Outdoors

// Array to store form submissions in memory (replacing localStorage)
let formSubmissions = [];

// Load submissions from memory on page load
function loadSubmissions() {
    // In a real application with localStorage, we would load from storage
    // For this implementation, we use the in-memory array
    return formSubmissions;
}

// Save submission to memory
function saveSubmission(submission) {
    formSubmissions.push(submission);
    const message = `Submission saved! Total submissions: ${formSubmissions.length}`;
    console.log(message);
}

// Form validation object
const formValidation = {
    firstName: {
        validate: (value) => value.trim().length > 0,
        message: 'First name is required'
    },
    lastName: {
        validate: (value) => value.trim().length > 0,
        message: 'Last name is required'
    },
    email: {
        validate: (value) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(value);
        },
        message: 'Please enter a valid email address'
    },
    phone: {
        validate: (value) => {
            if (value.trim().length === 0) return true; // Optional field
            const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
            return phonePattern.test(value);
        },
        message: 'Phone must be in format: 123-456-7890'
    },
    interest: {
        validate: () => {
            const checkboxes = document.querySelectorAll('input[name="interest"]:checked');
            return checkboxes.length > 0;
        },
        message: 'Please select at least one interest'
    }
};

// Function to show error message
function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement) {
        errorElement.textContent = message;
    }

    if (inputElement) {
        inputElement.classList.add('error');
        inputElement.setAttribute('aria-invalid', 'true');
    }
}

// Function to clear error message
function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement) {
        errorElement.textContent = '';
    }

    if (inputElement) {
        inputElement.classList.remove('error');
        inputElement.setAttribute('aria-invalid', 'false');
    }
}

// Function to validate field
function validateField(fieldName, value) {
    const validation = formValidation[fieldName];

    if (validation) {
        if (validation.validate(value)) {
            clearError(fieldName);
            return true;
        } else {
            showError(fieldName, validation.message);
            return false;
        }
    }

    return true;
}

// Function to validate entire form
function validateForm(formData) {
    let isValid = true;
    const fields = ['firstName', 'lastName', 'email', 'phone', 'interest'];

    fields.forEach(field => {
        if (field === 'interest') {
            if (!validateField(field, null)) {
                isValid = false;
            }
        } else {
            const value = formData.get(field) || '';
            if (!validateField(field, value)) {
                isValid = false;
            }
        }
    });

    return isValid;
}

// Function to format form data for display
function formatSubmissionData(formData) {
    const interests = [];
    formData.getAll('interest').forEach(interest => {
        interests.push(interest);
    });

    const timestamp = new Date();

    return {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        interests: interests,
        activities: formData.get('activities') || 'Not selected',
        message: formData.get('message') || 'No message',
        newsletter: formData.get('newsletter') ? 'Yes' : 'No',
        timestamp: timestamp.toLocaleString()
    };
}

// Function to display submissions
function displaySubmissions() {
    const submissionsList = document.getElementById('submissions-list');
    const submissions = loadSubmissions();

    if (submissionsList) {
        if (submissions.length === 0) {
            submissionsList.innerHTML = `<p>No submissions yet.</p>`;
        } else {
            submissionsList.innerHTML = '';

            submissions.forEach((submission, index) => {
                const submissionDiv = document.createElement('div');
                submissionDiv.className = 'submission-item';

                const interestsList = submission.interests.join(', ');

                submissionDiv.innerHTML = `
                    <h4>Submission #${index + 1}</h4>
                    <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
                    <p><strong>Email:</strong> ${submission.email}</p>
                    <p><strong>Phone:</strong> ${submission.phone}</p>
                    <p><strong>Interests:</strong> ${interestsList}</p>
                    <p><strong>Activities:</strong> ${submission.activities}</p>
                    <p><strong>Newsletter:</strong> ${submission.newsletter}</p>
                    <p><strong>Message:</strong> ${submission.message}</p>
                    <p class="timestamp">Submitted: ${submission.timestamp}</p>
                `;

                submissionsList.appendChild(submissionDiv);
            });
        }
    }
}

// Function to handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Clear all previous errors
    const fields = ['firstName', 'lastName', 'email', 'phone', 'interest'];
    fields.forEach(field => clearError(field));

    // Validate form
    if (!validateForm(formData)) {
        const errorMessage = `Please correct the errors in the form`;
        alert(errorMessage);
        return;
    }

    // Format and save submission
    const submissionData = formatSubmissionData(formData);
    saveSubmission(submissionData);

    // Show success message
    form.style.display = 'none';
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.style.display = 'block';
    }

    // Use template literal for success logging
    const logMessage = `Form submitted successfully by ${submissionData.firstName} ${submissionData.lastName}`;
    console.log(logMessage);
}

// Function to setup form event listeners
function setupFormListeners() {
    const form = document.getElementById('contact-form');

    if (form) {
        // Form submission
        form.addEventListener('submit', handleFormSubmit);

        // Real-time validation
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                const fieldName = e.target.id;
                const value = e.target.value;
                validateField(fieldName, value);
            });
        });

        // Interest checkboxes validation
        const interestCheckboxes = form.querySelectorAll('input[name="interest"]');
        interestCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                validateField('interest', null);
            });
        });

        // Form reset
        form.addEventListener('reset', () => {
            const fields = ['firstName', 'lastName', 'email', 'phone', 'interest'];
            fields.forEach(field => clearError(field));
        });
    }
}

// Function to setup view submissions button
function setupViewSubmissions() {
    const viewButton = document.getElementById('view-submissions');
    const submissionsSection = document.getElementById('submissions-section');
    const closeButton = document.getElementById('close-submissions');

    if (viewButton && submissionsSection) {
        viewButton.addEventListener('click', () => {
            displaySubmissions();
            submissionsSection.style.display = 'block';
            submissionsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (closeButton && submissionsSection) {
        closeButton.addEventListener('click', () => {
            submissionsSection.style.display = 'none';
        });
    }
}

// Function to add conditional behavior based on form selections
function setupConditionalBehavior() {
    const volunteerCheckbox = document.getElementById('interest-volunteer');
    const activitiesSelect = document.getElementById('activities');

    if (volunteerCheckbox && activitiesSelect) {
        volunteerCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                const message = `Thank you for your interest in volunteering! Please select your preferred activities below.`;
                console.log(message);
                activitiesSelect.setAttribute('aria-label', 'Select activities you would like to volunteer for');
            }
        });
    }
}

// Initialize all form functions
document.addEventListener('DOMContentLoaded', () => {
    setupFormListeners();
    setupViewSubmissions();
    setupConditionalBehavior();
});