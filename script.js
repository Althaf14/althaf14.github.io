// DOM Elements
const header = document.getElementById('main-header');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');

// -- Scroll Handling (Show/Hide Header) --
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // Scrolling down
        header.classList.add('header-hidden');
        header.classList.remove('header-visible');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
    }
    lastScrollY = window.scrollY;
});

// -- Mobile Menu Toggle --
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// -- Theme Handling --
// Check local storage or system preference
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const iconSun = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
const iconMoon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;

const setTheme = (theme) => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
    themeIcon.innerHTML = theme === 'dark' ? iconSun : iconMoon;
    if (mobileThemeIcon) {
        mobileThemeIcon.innerHTML = theme === 'dark' ? iconSun : iconMoon;
    }
};

// Initial Setup
if (userTheme) {
    setTheme(userTheme);
} else {
    setTheme(systemTheme ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// Mobile Theme Toggle Event Listener
if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
}

// -- Contact Form Handling --
const contactForm = document.querySelector('form');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const originalBtnText = submitBtn.innerText;

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (response.status === 200) {
            // Success
            submitBtn.innerText = 'Message Sent!';
            // Reset button styles to default state (removing Red only)
            submitBtn.classList.remove('from-emerald-600', 'to-teal-600', 'dark:from-red-700', 'dark:to-red-600');
            submitBtn.classList.add('bg-green-600'); // Simple solid green indicating success

            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerText = 'Send Another Message';
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-green-600');
                // Re-add the hybrid gradients
                submitBtn.classList.add('from-emerald-600', 'to-teal-600', 'dark:from-red-700', 'dark:to-red-600');
            }, 3000);
        } else {
            console.log(response);
            submitBtn.innerText = 'Error. Try Again.';
            submitBtn.disabled = false;
        }
    } catch (error) {
        console.log(error);
        submitBtn.innerText = 'Something went wrong';
        submitBtn.disabled = false;
    }
});
