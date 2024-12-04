const githubUsername = 'RadHamm';
const apiUrl = 'https://api.github.com/users/RadHamm/repos';


function toggleDetails(detailsId) {
    const detailsElement = document.getElementById(detailsId); // gets element from ID
    const isVisible = detailsElement.style.display === 'block'; // checks if element is visible

    if (!isVisible) {
        fetchRepos();
    }
    projectsContainer.style.display = isVisible ? 'none' : 'block'; // toggle between hidden or not

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

// fetch function for github api
async function fetchRepos() {

    try {
        const response = await fetch(apiUrl);

// error checking fetch data from github api
if (!response.ok) {
    console.error('error fetch data', response.status);
    return;
}
        //json parse to extra api data
        const repos = await response.json();
        // container getter for project details
        const projectsContainer = document.getElementById('projects-container');

        projectsContainer.innerHTML = '';

// Loop through each repo and display its HTML URL
        // Loop through each repo and display its HTML URL
        repos.forEach(repo => {
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;  // Set the href to the repository URL
            repoLink.classList.add('project-link');
            repoLink.textContent = repo.name;  // Set the link text to the repository name
            
            // Append the link to the projects container
            projectsContainer.appendChild(repoLink);
        });


    } catch (error) {
        console.error('Error fetching repos:', error);
    }
}


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
