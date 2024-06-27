document.addEventListener('DOMContentLoaded', function() {
    // Animated weight bouncing effect
    const heroImage = document.querySelector('.hero-image');
    let bounceHeight = 0;
    let bounceDirection = 1;

    function animateWeight() {
        bounceHeight += 0.5 * bounceDirection;
        if (bounceHeight > 10 || bounceHeight < 0) {
            bounceDirection *= -1;
        }
        heroImage.style.transform = `translateY(${bounceHeight}px)`;
        requestAnimationFrame(animateWeight);
    }

    animateWeight();

    // Placeholder for contract address (replace with actual address)
    const contractAddress = '0x1234567890123456789012345678901234567890';
    document.getElementById('contract-address').textContent = contractAddress;

    // Add click event to copy contract address
    document.getElementById('copy-address').addEventListener('click', function() {
        navigator.clipboard.writeText(contractAddress).then(function() {
            alert('Contract address copied to clipboard!');
        });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});