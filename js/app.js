// Remove loader when page is fully loaded
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => loader.remove(), 500);
        }, 500); // Adjust timing as needed
    }
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    } else {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Close mobile menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Menu category switching
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');
            
            // Update button states
            categoryButtons.forEach(btn => {
                if (btn === button) {
                    // Active button styling
                    btn.classList.remove('bg-white', 'text-dunkin-orange', 'border-2', 'border-dunkin-orange');
                    btn.classList.add('bg-dunkin-orange', 'text-white');
                } else {
                    // Inactive button styling
                    btn.classList.remove('bg-dunkin-orange', 'text-white');
                    btn.classList.add('bg-white', 'text-dunkin-orange', 'border-2', 'border-dunkin-orange');
                }
            });

            // Show/hide menu sections
            menuSections.forEach(section => {
                if (section.id === targetCategory) {
                    section.classList.remove('hidden');
                    section.classList.add('grid');
                } else {
                    section.classList.remove('grid');
                    section.classList.add('hidden');
                }
            });
        });
    });
});

// Newsletter subscription
const newsletterForm = document.querySelector('#newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.innerHTML = '<i class="fas fa-check mr-2"></i>Subscribed!';
        button.disabled = true;
        button.classList.add('bg-green-500', 'hover:bg-green-500');
        button.classList.remove('bg-dunkin-orange', 'hover:bg-dunkin-magenta');
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.classList.remove('bg-green-500', 'hover:bg-green-500');
            button.classList.add('bg-dunkin-orange', 'hover:bg-dunkin-magenta');
            newsletterForm.reset();
        }, 3000);
    });
}

// Countdown timer for hot deal
function addCountdownTimer() {
    const timerHTML = `
        <div class="mt-4 text-2xl font-fredoka">
            Ends in: <span id="countdown" class="text-dunkin-magenta"></span>
        </div>
    `;
    
    const hotDealSection = document.querySelector('.font-fredoka.space-y-4');
    hotDealSection.insertAdjacentHTML('beforeend', timerHTML);
    
    // Set end time (24 hours from now)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    setInterval(updateTimer, 1000);
}

addCountdownTimer();

// Smooth back to top
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'fixed bottom-8 right-8 bg-dunkin-orange text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 opacity-0 z-40 hover:bg-dunkin-magenta';

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.transform = 'translateY(0)';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'translateY(100px)';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

