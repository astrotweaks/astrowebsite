// Añadir clase para animar la opacidad al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');
});

// Scroll animations for smooth transitions in header
document.addEventListener('scroll', function () {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 50) {
        header.classList.add('solid');
    } else {
        header.classList.remove('solid');
    }
});

// Smooth scroll for the "Shop Now" button
document.querySelector('.shop-scroll').addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
    });
});

// Handle form submission to show the pop-up
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Prevent spamming the button
    const submitButton = document.querySelector('.cta-btn');
    submitButton.disabled = true;

    // Send data to Discord webhook (replace with actual webhook logic)
    const webhookURL = "https://discord.com/api/webhooks/1298800675324559380/5N2gTB2ZTLiW2e_SNwjg6yboh9XS-vpj3frtcOKXCW-qAMUyPcCIL-AeedPoHGcVah2m"; // Replace with your actual webhook URL
    const data = {
        content: `New Contact Us submission: \nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the data
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            // Show the pop-up
            const popup = document.getElementById('popup');
            popup.classList.add('active');
        }
    }).catch(error => console.error('Error:', error));

    // Re-enable the button after 3 seconds
    setTimeout(() => {
        submitButton.disabled = false;
    }, 3000);
});

// Close the pop-up
document.getElementById('close-popup').addEventListener('click', function () {
    const popup = document.getElementById('popup');
    popup.classList.add('inactive');

    // Hide pop-up after the animation
    setTimeout(() => {
        popup.classList.remove('active');
        popup.classList.remove('inactive');
    }, 500);
});
