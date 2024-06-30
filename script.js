document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backToTopButton = document.getElementById('back-to-top');
    const header = document.querySelector('header');
    const newsletterForm = document.getElementById('newsletter-form');
    const contractAddressElement = document.getElementById('contract-address');
    const copyAddressButton = document.getElementById('copy-address');
    // Hamburger menu functionality
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(event) {
            event.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

 // Fade-in effect for sections and list items
 const sections = document.querySelectorAll('.content-section');
 const howToBuyItems = document.querySelectorAll('#how-to-buy ol li');

 const fadeInOptions = {
     threshold: 0.1,
     rootMargin: "0px 0px -100px 0px"
 };

 const fadeInObserver = new IntersectionObserver(function(entries, observer) {
     entries.forEach(entry => {
         if (!entry.isIntersecting) {
             return;
         }
         if (entry.target.classList.contains('fade-in-section')) {
             entry.target.classList.add('is-visible');
         } else if (entry.target.classList.contains('fade-in-item')) {
             setTimeout(() => {
                 entry.target.classList.add('is-visible');
             }, entry.target.dataset.delay);
         }
         observer.unobserve(entry.target);
     });
 }, fadeInOptions);

 sections.forEach(section => {
     section.classList.add('fade-in-section');
     fadeInObserver.observe(section);
 });

 howToBuyItems.forEach((item, index) => {
     item.classList.add('fade-in-item');
     item.dataset.delay = index * 200; // 200ms delay between each item
     fadeInObserver.observe(item);
 });

    // Back to top button functionality
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Price ticker functionality
    async function updatePriceTicker() {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
            const tonPrice = response.data['the-open-network'].usd;
            const ton2000lbsPrice = tonPrice / 2000;

            document.getElementById('current-ton-price').textContent = `$${tonPrice.toFixed(2)}`;
            // document.getElementById('current-2000lbs-price').textContent = `$${ton2000lbsPrice.toFixed(6)}`;
        } catch (error) {
            console.error('Error fetching price data:', error);
        }
    }

    // Update price every 60 seconds
    setInterval(updatePriceTicker, 60000);
    updatePriceTicker(); // Initial update

    // Header color change on scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(30, 58, 138, 0.9)';
            } else {
                header.style.background = 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))';
            }
        });
    }

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            try {
                // Replace with actual API endpoint
                await axios.post('/api/subscribe', { email });
                alert('Thank you for subscribing!');
                this.reset();
            } catch (error) {
                console.error('Error subscribing:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Copy contract address functionality
    if (contractAddressElement && copyAddressButton) {
        const contractAddress = 'Loading...'; // Replace with actual address
        contractAddressElement.textContent = contractAddress;

        copyAddressButton.addEventListener('click', function() {
            navigator.clipboard.writeText(contractAddress).then(function() {
                const originalText = copyAddressButton.innerHTML;
                copyAddressButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                setTimeout(() => {
                    copyAddressButton.innerHTML = originalText;
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy text: ', err);
            });
        });
    }
});