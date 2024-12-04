function toggleDetails(detailsId) {
    const detailsElement = document.getElementById(detailsId); // gets element from ID
    const isVisible = detailsElement.style.display === 'block'; // checks if element is visible
    detailsElement.style.display = isVisible ? 'none' : 'block'; // toggle between hidden or not
}

// Get form elements
const form = document.getElementById('contact-form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');
// Get error ellements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Function to check if name is empty
function validateName() {
    if (nameField.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

// Comprehensive Regex Function to check if email is valid
function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailField.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

// Function to check if message is empty or too short
function validateMessage() {
    if (messageField.value.trim().length < 5) {
        messageError.textContent = 'Message must be at least 5 characters long.';
        return false;
    } else {
        messageError.textContent = '';
        return true;
    }
}

// Function to validate the entire form
function validateForm(event) {
    event.preventDefault(); // Prevent form submission if validation fails

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    // If all fields are valid, submit the form
    if (isNameValid && isEmailValid && isMessageValid) {
        alert('Form submitted successfully!');
        form.reset(); // Reset the form after successful submission
    } else {
        alert('Please correct the errors before submitting.'); // message from error submitting
    }
}

// validateForm function to form submit
form.addEventListener('submit', validateForm);

fetch('https://api.github.com/users/${RadHamm}/repos')
    .then(response => response.json())
    .then(data => {
    
        const projectUploadDate = data.uploadDate;
        
        // parse variables
        const uploadDate = moment(projectUploadDate);
        const currentDate = moment();
        
        // Display the upload date and time difference
        document.getElementById('upload-date').textContent = uploadDate.format('MM DD YYYY');
        document.getElementById('time-since-update').textContent = uploadDate.fromNow();
    })
    .catch(error => {
        console.error('Error fetching upload date:', error);
    });

   // Toggle light mode
// Get the buttons for toggling light and dark modes
const lightModeButton = document.getElementById('light-mode');
const darkModeButton = document.getElementById('dark-mode');

// Function to activate light mode
function enableLightMode() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
}

// Function to activate dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
}

// Add event listeners to the buttons
lightModeButton.addEventListener('click', enableLightMode);
darkModeButton.addEventListener('click', enableDarkMode);

// Optional: Persist the mode across sessions using localStorage
window.addEventListener('load', () => {
    if (localStorage.getItem('mode') === 'dark') {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});

// Store the mode in localStorage
lightModeButton.addEventListener('click', () => {
    localStorage.setItem('mode', 'light');
});

darkModeButton.addEventListener('click', () => {
    localStorage.setItem('mode', 'dark');
});
