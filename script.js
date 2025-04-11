// Disable right-click and show popup
document.addEventListener('contextmenu', e => {
    e.preventDefault();
    alert('Right click is disabled for security reasons.');
});

// Mobile-friendly viewport adjustments
function adjustViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (window.innerWidth <= 768) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        // Adjust font size and text wrapping for mobile
        const typingEffect = document.querySelector('.typing-effect');
        typingEffect.style.fontSize = '1.2rem';
        typingEffect.style.whiteSpace = 'normal'; // Allow text wrapping
        typingEffect.style.overflow = 'visible';
        typingEffect.style.width = '95%'; // Slightly less than full width
        typingEffect.style.margin = '0 auto'; // Center the text

        // Adjust nav links for mobile
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.fontSize = '0.9rem';
            navLinks.style.gap = '0.5rem';
        }
    } else {
        const typingEffect = document.querySelector('.typing-effect');
        typingEffect.style.fontSize = '2rem';
        typingEffect.style.whiteSpace = 'nowrap';
        typingEffect.style.overflow = 'visible';
        typingEffect.style.width = 'auto';
        typingEffect.style.margin = '';

        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.fontSize = '';
            navLinks.style.gap = '';
        }
    }
}
window.addEventListener('resize', adjustViewport);
adjustViewport();

// GSAP Animations with mobile optimization
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const animationDuration = isMobile ? 0.5 : 1;

gsap.from("#hero h1", { opacity: 0, y: -25, duration: animationDuration, delay: 0.3 });
gsap.from("#hero p", { opacity: 0, y: 25, duration: animationDuration, delay: 0.6 });

gsap.utils.toArray('section').forEach(section => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top 90%',
        onEnter: () => section.classList.add('visible'),
        onLeaveBack: () => section.classList.remove('visible'),
    });
});

// Improved Typing Effect
const typingEffect = document.querySelector(".typing-effect");
const text = "root@hacker:~$ Welcome to my network";
typingEffect.textContent = "";
typingEffect.style.minHeight = "1.2em";

let i = 0;

function typeEffect() {
    if (i < text.length) {
        typingEffect.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, isMobile ? 50 : 100);
    }
}
typeEffect();

// Mobile-friendly Interactive Terminal
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

terminalInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const input = terminalInput.value;
        const sanitizedInput = input.replace(/[<>]/g, ''); // Prevent script injection
        terminalOutput.innerHTML += `<div>root@hacker:~$ ${sanitizedInput}</div>`;
        terminalInput.value = "";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Prevent iframe embedding
if (window.self !== window.top) {
    window.top.location.href = window.self.location.href;
}

// Fix smooth scrolling for nav links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Highlight active section in navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});