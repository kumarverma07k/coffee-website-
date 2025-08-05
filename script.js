// Btechian Coffee's - JavaScript Functions

// Mobile menu toggle functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and WhatsApp integration
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const gymAddress = document.getElementById('gymAddress').value.trim();
    const menuItem = document.getElementById('menuItem').value;
    
    // Validate form fields
    if (!validateForm(customerName, customerPhone, gymAddress, menuItem)) {
        return;
    }
    
    // Create WhatsApp message
    const message = createWhatsAppMessage(customerName, customerPhone, gymAddress, menuItem);
    
    // Send to WhatsApp
    sendToWhatsApp(message);
    
    // Show success message and reset form
    showSuccessMessage();
    resetForm();
});

// Form validation function
function validateForm(name, phone, address, item) {
    // Remove any existing error messages
    removeErrorMessages();
    
    let isValid = true;
    
    // Validate name
    if (name.length < 2) {
        showFieldError('customerName', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        showFieldError('customerPhone', 'Please enter a valid 10-digit mobile number');
        isValid = false;
    }
    
    // Validate gym address
    if (address.length < 10) {
        showFieldError('gymAddress', 'Please enter a complete gym address (at least 10 characters)');
        isValid = false;
    }
    
    // Validate menu item selection
    if (!item) {
        showFieldError('menuItem', 'Please select an item from the menu');
        isValid = false;
    }
    
    return isValid;
}

// Show field-specific error message
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.parentElement;
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    // Add error message to form group
    formGroup.appendChild(errorDiv);
    
    // Highlight the field
    field.style.borderColor = '#f44336';
    field.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.2)';
}

// Remove all error messages
function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(error => error.remove());
    
    // Reset field styles
    const fields = document.querySelectorAll('#orderForm input, #orderForm select, #orderForm textarea');
    fields.forEach(field => {
        field.style.borderColor = '#ddd';
        field.style.boxShadow = 'none';
    });
}

// Create formatted WhatsApp message
function createWhatsAppMessage(name, phone, address, item) {
    const message = `🔥 *NEW ORDER FROM BTECHIAN COFFEE'S* 🔥

📝 *Customer Details:*
👤 Name: ${name}
📱 Phone: ${phone}
🏋️ Gym Address: ${address}

☕ *Order Details:*
🛒 Item: ${item}

⏰ *Order Time:* ${new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}

📍 *Please confirm this order and arrange delivery to the gym address mentioned above.*

Thank you for choosing Btechian Coffee's! ☕✨`;

    return message;
}

// Send message to WhatsApp
function sendToWhatsApp(message) {
    const phoneNumber = '917379667920'; // Your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}

// Show success message
function showSuccessMessage() {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create success message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = `
        <strong>✅ Order Sent Successfully!</strong><br>
        Your order has been sent to our WhatsApp. We'll contact you shortly to confirm delivery details.
    `;
    
    // Add message after the form
    const orderForm = document.querySelector('.order-form');
    orderForm.appendChild(messageDiv);
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Reset form after successful submission
function resetForm() {
    document.getElementById('orderForm').reset();
    removeErrorMessages();
}

// Phone number formatting (optional enhancement)
document.getElementById('customerPhone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 10 digits
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    // Format as needed (you can customize this)
    e.target.value = value;
});

// Add loading state to submit button
function setLoadingState(isLoading) {
    const submitButton = document.querySelector('#orderForm button[type="submit"]');
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending Order...';
        submitButton.style.opacity = '0.7';
    } else {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Order';
        submitButton.style.opacity = '1';
    }
}

// Enhanced form submission with loading state
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Set loading state
    setLoadingState(true);
    
    // Small delay to show loading state
    setTimeout(() => {
        // Get form values
        const customerName = document.getElementById('customerName').value.trim();
        const customerPhone = document.getElementById('customerPhone').value.trim();
        const gymAddress = document.getElementById('gymAddress').value.trim();
        const menuItem = document.getElementById('menuItem').value;
        
        // Validate form
        if (!validateForm(customerName, customerPhone, gymAddress, menuItem)) {
            setLoadingState(false);
            return;
        }
        
        // Create and send WhatsApp message
        const message = createWhatsAppMessage(customerName, customerPhone, gymAddress, menuItem);
        sendToWhatsApp(message);
        
        // Show success and reset
        showSuccessMessage();
        resetForm();
        setLoadingState(false);
        
    }, 1000); // 1 second delay for better UX
});

// Navbar scroll effect (optional enhancement)
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(101, 67, 33, 0.98)';
    } else {
        header.style.background = 'rgba(101, 67, 33, 0.95)';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code can go here
    console.log('Btechian Coffee\'s website loaded successfully!');
    
    // Add focus effects to form fields
    const formFields = document.querySelectorAll('#orderForm input, #orderForm select, #orderForm textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Initialize feedback functionality
    initializeFeedback();
});

// Feedback functionality
function initializeFeedback() {
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackType = this.getAttribute('data-type');
            sendFeedbackToWhatsApp(feedbackType);
        });
    });
}

// Send feedback to WhatsApp
function sendFeedbackToWhatsApp(type) {
    let message = '';
    
    switch(type) {
        case 'general':
            message = `🔥 *FEEDBACK FOR BTECHIAN COFFEE'S* 🔥

Hi! I'd like to share my feedback about my experience with Btechian Coffee's:

📝 *My Feedback:*
[Please write your feedback here]

⏰ *Feedback Time:* ${new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                day: '2-digit',
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}

Thank you for listening to your customers! ☕✨`;
            break;
            
        case 'rating':
            message = `⭐ *RATING FOR BTECHIAN COFFEE'S* ⭐

Hi! I'd like to rate my experience with Btechian Coffee's:

🌟 *My Rating:* [Please rate from 1-5 stars]

📝 *What I liked:*
[Please share what you enjoyed]

💡 *What can be improved:*
[Please share suggestions for improvement]

⏰ *Rating Time:* ${new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                day: '2-digit',
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}

Thank you for asking for our opinion! ☕✨`;
            break;
            
        case 'suggestion':
            message = `💡 *SUGGESTIONS FOR BTECHIAN COFFEE'S* 💡

Hi! I have some suggestions for Btechian Coffee's:

🆕 *New Menu Ideas:*
[Please suggest new items you'd like to see]

🛠️ *Service Improvements:*
[Please suggest how we can serve you better]

📍 *Location Suggestions:*
[Any new gym locations you'd like us to consider]

⏰ *Suggestion Time:* ${new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                day: '2-digit',
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}

Thank you for helping us improve! ☕✨`;
            break;
            
        default:
            message = `Hi! I'd like to share my feedback about Btechian Coffee's. Thank you!`;
    }
    
    const phoneNumber = '917379667920'; // Your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show feedback confirmation
    showFeedbackConfirmation(type);
}

// Show feedback confirmation message
function showFeedbackConfirmation(type) {
    // Create confirmation message
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'feedback-confirmation';
    confirmationDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    let typeText = '';
    switch(type) {
        case 'general': typeText = 'General Feedback'; break;
        case 'rating': typeText = 'Rating'; break;
        case 'suggestion': typeText = 'Suggestion'; break;
        default: typeText = 'Feedback';
    }
    
    confirmationDiv.innerHTML = `
        <strong>✅ ${typeText} Opened!</strong><br>
        <small>WhatsApp opened with pre-filled message</small>
    `;
    
    // Add to page
    document.body.appendChild(confirmationDiv);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (confirmationDiv.parentNode) {
            confirmationDiv.remove();
        }
    }, 4000);
}

// Add CSS animation for confirmation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
