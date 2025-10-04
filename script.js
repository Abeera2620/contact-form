document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (optional but must be valid if provided)
        if (phone !== '' && !isValidPhone(phone)) {
            showError('phoneError', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate subject
        if (subject === '') {
            showError('subjectError', 'Subject is required');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            contactForm.reset();
            successMessage.style.display = 'block';
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    // Helper functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        
        // Add error class to input
        const inputId = elementId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        inputElement.style.borderColor = '#e74c3c';
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        // Reset input borders
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#e1e8ed';
        });
        
        // Hide success message
        successMessage.style.display = 'none';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    // Real-time validation for better UX
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        // Reset field error
        document.getElementById(fieldId + 'Error').textContent = '';
        field.style.borderColor = '#e1e8ed';
        
        // Validate based on field type
        switch(fieldId) {
            case 'name':
                if (value === '') {
                    showError(fieldId + 'Error', 'Name is required');
                } else if (value.length < 2) {
                    showError(fieldId + 'Error', 'Name must be at least 2 characters');
                }
                break;
            case 'email':
                if (value === '') {
                    showError(fieldId + 'Error', 'Email is required');
                } else if (!isValidEmail(value)) {
                    showError(fieldId + 'Error', 'Please enter a valid email address');
                }
                break;
            case 'phone':
                if (value !== '' && !isValidPhone(value)) {
                    showError(fieldId + 'Error', 'Please enter a valid phone number');
                }
                break;
            case 'subject':
                if (value === '') {
                    showError(fieldId + 'Error', 'Subject is required');
                }
                break;
            case 'message':
                if (value === '') {
                    showError(fieldId + 'Error', 'Message is required');
                } else if (value.length < 10) {
                    showError(fieldId + 'Error', 'Message must be at least 10 characters');
                }
                break;
        }
    }
});