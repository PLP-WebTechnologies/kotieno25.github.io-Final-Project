// Form Validation
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const messagesDiv = document.getElementById('formMessages');
    
    messagesDiv.innerHTML = '';
    let errors = [];
    
    if (name.trim() === '') errors.push('Name is required');
    if (!validateEmail(email)) errors.push('Valid email is required');
    if (message.trim() === '') errors.push('Message is required');
    
    if (errors.length > 0) {
        errors.forEach(error => {
            messagesDiv.innerHTML += `<p class="error">${error}</p>`;
        });
    } else {
        messagesDiv.innerHTML = `<p class="success">Message sent successfully!</p>`;
        this.reset();
    }
});

// Read More/Less Functionality
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.closest('.post-excerpt').nextElementSibling;
        button.parentElement.classList.add('hidden');
        content.classList.remove('hidden');
    });
});

document.querySelectorAll('.read-less').forEach(button => {
    button.addEventListener('click', () => {
        const excerpt = button.closest('.post-content').previousElementSibling;
        button.parentElement.classList.add('hidden');
        excerpt.classList.remove('hidden');
    });
});

// Email Validation Helper
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Add interactive elements to script.js
// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Image lazy loading
const images = document.querySelectorAll('.responsive-img');
const config = {
    rootMargin: '0px 0px 100px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            self.unobserve(entry.target);
        }
    });
}, config);

images.forEach(image => {
    image.dataset.src = image.src;
    image.src = '';
    observer.observe(image);
});