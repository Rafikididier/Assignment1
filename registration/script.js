document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validation
    let isValid = true;

    const fields = [
        { id: 'firstName', message: 'First Name is required' },
        { id: 'lastName', message: 'Last Name is required' },
        { id: 'nationality', message: 'Nationality is required' },
        { id: 'age', message: 'Age must be a positive number' },
        { id: 'sex', message: 'Please select a sex' },
        { id: 'phone', message: 'Please enter a valid phone number (10 digits)' },
        { id: 'email', message: 'Please enter a valid email address' },
        { id: 'faculty', message: 'Please select a faculty' },
        { id: 'department', message: 'Department is required' },
        { id: 'program', message: 'Please select a program' },
        { id: 'fatherName', message: 'Father\'s Name is required' },
        { id: 'motherName', message: 'Mother\'s Name is required' }
    ];

    fields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        const errorMessage = document.querySelector(`#${field.id}-error`);

        if (field.id === 'sex' || field.id === 'program') {
            const checked = document.querySelector(`input[name="${field.id}"]:checked`);
            if (!checked) {
                isValid = false;
                displayError(inputElement, errorMessage, field.message);
            } else {
                removeError(inputElement, errorMessage);
            }
        } else if (field.id === 'phone') {
            const phoneRegex = /^\d{10}$/;
            if (!inputElement.value.match(phoneRegex)) {
                isValid = false;
                displayError(inputElement, errorMessage, field.message);
            } else {
                removeError(inputElement, errorMessage);
            }
        } else if (field.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!inputElement.value.match(emailRegex)) {
                isValid = false;
                displayError(inputElement, errorMessage, field.message);
            } else {
                removeError(inputElement, errorMessage);
            }
        } else if (inputElement.value.trim() === '') {
            isValid = false;
            displayError(inputElement, errorMessage, field.message);
        } else {
            removeError(inputElement, errorMessage);
        }
    });

    if (isValid) {
        alert('Form submitted successfully!');
        // You can send the form data to a server here
    }
});
document.getElementById('faculty').addEventListener('change', function() {
    const selectedFaculty = this.value;
    const departmentSelect = document.getElementById('department');

    // Reset options
    departmentSelect.innerHTML = '';

    if (selectedFaculty === 'IT') {
        addOption(departmentSelect, 'Networking', 'Networking');
        addOption(departmentSelect, 'Software and Information', 'Software_Information');
    } else if (selectedFaculty === 'Accounting') {
        addOption(departmentSelect, 'Finance', 'Finance');
        addOption(departmentSelect, 'Accounting 1', 'Accounting_1');
    } else if (selectedFaculty === 'Marketing') {
        addOption(departmentSelect, 'Digital Marketing', 'Digital_Marketing');
        addOption(departmentSelect, 'Trade', 'Trade');
    }
});

function addOption(selectElement, text, value) {
    const option = document.createElement('option');
    option.text = text;
    option.value = value;
    selectElement.add(option);
}

function displayError(inputElement, errorMessageElement, message) {
    if (!errorMessageElement) {
        const errorMessage = document.createElement('div');
        errorMessage.id = `${inputElement.id}-error`;
        errorMessage.classList.add('error-message');
        errorMessage.innerText = message;
        errorMessage.style.color = 'red';
        inputElement.parentNode.appendChild(errorMessage);
    }
}

function removeError(inputElement, errorMessageElement) {
    if (errorMessageElement) {
        errorMessageElement.remove();
    }
}
