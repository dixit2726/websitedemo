import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Link Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Initial Animations
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .to('.text-reveal span', {
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out'
    }, '-=0.5')
    .from('.hero p', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power4.out'
    }, '-=1')
    .from('.hero-btns', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.8');
});

// Scroll Reveal Animations
const reveals = document.querySelectorAll('.section-title, .about-img, .menu-card, .glass, .gallery-item');

reveals.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Parallax Effect on Hero
gsap.to('.hero', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    backgroundPositionY: '50%',
    ease: 'none'
});

// Menu Tab Switching & Filtering
const tabs = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filter animation
        gsap.to('.menu-grid', {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                menuCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });

                gsap.to('.menu-grid', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
                
                // Refresh ScrollTrigger as height might change
                ScrollTrigger.refresh();
            }
        });
    });
});

// Image Hover Parallax
document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        gsap.to(card.querySelector('img'), {
            x: x * 20,
            y: y * 20,
            rotationY: x * 10,
            rotationX: -y * 10,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('img'), {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Particle Generation
const particleContainer = document.getElementById('particles');
if (particleContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particleContainer.appendChild(particle);
    }
}
