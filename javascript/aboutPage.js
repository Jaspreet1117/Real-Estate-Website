const heroText = document.querySelector('.hero span');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    function typeEffect() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 120);
    }
    }
    typeEffect();
}

// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// Dark mode toggle
const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Scroll reveal
const containers = document.querySelectorAll('.container');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

containers.forEach(cont => {
    observer.observe(cont);
});

// *** NEW: Improved Counter animation ***
const counters = document.querySelectorAll('.stat-box h3');
let started = false;

const countObserver = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 0;
            
            const duration = 2000; // All counters finish in 2 seconds
            const stepTime = 20; // 20ms interval
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString(); // Add commas
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString(); // Add commas
                }
            }, stepTime);
        });
        countObserver.unobserve(entry.target);
    }
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    countObserver.observe(statsSection);
}


// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.style.display = 'block';
    else backToTop.style.display = 'none';
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});