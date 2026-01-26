/* ============================================
   XENON PORTFOLIO - PREMIUM JAVASCRIPT
   Awwwards-Nominee Quality Interactions
   ============================================ */

// ===========================================
// LOADER WITH SCRAMBLE ANIMATION
// ===========================================
const loader = document.getElementById('loader');
const loaderText = document.getElementById('loader-text');

// Loader Text Scramble Animation
class LoaderScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[—=+*^?@$%&XENO';
        this.originalText = 'XENON';
        this.frame = 0;
        this.frameRequest = null;
    }

    start() {
        this.scramble();

        // After scrambling, reveal the final text
        setTimeout(() => {
            this.stopScramble();
            this.reveal();
        }, 250);
    }

    stopScramble() {
        // Cancel any ongoing scramble animation
        if (this.frameRequest) {
            cancelAnimationFrame(this.frameRequest);
            this.frameRequest = null;
        }
        this.frame = 0;
    }

    scramble() {
        const animate = () => {
            let output = '';
            for (let i = 0; i < this.originalText.length; i++) {
                const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                output += `<span class="scramble-char">${char}</span>`;
            }
            this.el.innerHTML = output;

            this.frame++;
            // Continue scrambling indefinitely until stopScramble is called
            this.frameRequest = requestAnimationFrame(animate);
        };
        animate();
    }

    reveal() {
        const duration = 800;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            let output = '';
            for (let i = 0; i < this.originalText.length; i++) {
                const charProgress = (progress - (i * 0.1)) * 2;
                if (charProgress >= 1) {
                    output += this.originalText[i];
                } else if (charProgress > 0) {
                    const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    output += `<span class="scramble-char">${char}</span>`;
                }
            }
            this.el.innerHTML = output;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.el.textContent = this.originalText;
                // Hide loader after reveal
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = 'visible';
                    initAnimations();
                }, 400);
            }
        };
        requestAnimationFrame(animate);
    }
}

// Initialize loader animation
window.addEventListener('load', () => {
    if (loaderText) {
        const scramble = new LoaderScramble(loaderText);
        scramble.start();
    } else {
        // Fallback if loader text not found
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
            initAnimations();
        }, 2000);
    }
});

// ===========================================
// CUSTOM CURSOR
// ===========================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// Check if device supports hover (not touch)
const supportsHover = window.matchMedia('(hover: hover)').matches;

if (supportsHover && cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Follower has more lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects (excluding nav links, social links, primary buttons, nav logo, and email)
    const hoverElements = document.querySelectorAll('a:not(.nav-link):not(.social-link):not(.btn-primary):not(.nav-logo):not(.contact-email), button, [data-magnetic]:not(.nav-link):not(.social-link):not(.btn-primary):not(.nav-logo):not(.contact-email)');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // Simple hover effects (increase size only) - for primary buttons and email
    const simpleHoverElements = document.querySelectorAll('.btn-primary, .contact-email');

    simpleHoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('simple-hover');
            cursorFollower.classList.add('simple-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('simple-hover');
            cursorFollower.classList.remove('simple-hover');
        });
    });

    // Project card cursor text
    const projectCards = document.querySelectorAll('[data-cursor-text]');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursor.classList.add('text-mode');
            cursor.setAttribute('data-text', card.dataset.cursorText);
        });

        card.addEventListener('mouseleave', () => {
            cursor.classList.remove('text-mode');
            cursor.removeAttribute('data-text');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

// ===========================================
// MAGNETIC HOVER EFFECT
// ===========================================
const magneticElements = document.querySelectorAll('[data-magnetic]');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

// ===========================================
// MOBILE MENU
// ===========================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===========================================
// SMOOTH SCROLL
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================================
// SCROLL REVEAL ANIMATIONS
// ===========================================
function initAnimations() {
    const revealElements = document.querySelectorAll('.project-card, .skills-group, .stat-item, .section-header');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// ===========================================
// COUNTER ANIMATION
// ===========================================
const statNumbers = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            const duration = 2000;
            const start = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function
                const easeOutExpo = 1 - Math.pow(2, -10 * progress);
                const current = Math.floor(easeOutExpo * target);

                el.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    el.textContent = target;
                }
            }

            requestAnimationFrame(updateCount);
            counterObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(el => counterObserver.observe(el));

// ===========================================
// NAVBAR SCROLL EFFECT
// ===========================================
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        nav.style.padding = '1rem 3rem';
        nav.style.background = 'rgba(10, 10, 10, 0.9)';
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.padding = '1.5rem 3rem';
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
    }

    // Hide/show on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
});

// ===========================================
// PARALLAX FLOATING SHAPES
// ===========================================
const shapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ===========================================
// FOOTER TIME
// ===========================================
function updateTime() {
    const timeEl = document.getElementById('footer-time');
    if (timeEl) {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short'
        };
        timeEl.textContent = now.toLocaleTimeString('en-US', options);
    }
}

updateTime();
setInterval(updateTime, 60000);

// ===========================================
// TILT EFFECT ON PROJECT CARDS
// ===========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================================
// TEXT SCRAMBLE EFFECT (for links)
// ===========================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

// Apply scramble effect to mobile menu links
const scrambleLinks = document.querySelectorAll('.mobile-link span');

scrambleLinks.forEach(link => {
    const originalText = link.dataset.text;
    const fx = new TextScramble(link);

    link.parentElement.addEventListener('mouseenter', () => {
        fx.setText(originalText);
    });
});

// ===========================================
// PRELOAD IMAGES (if any)
// ===========================================
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
        const src = img.dataset.src;
        img.src = src;
        img.removeAttribute('data-src');
    });
}

// ===========================================
// PERFORMANCE: Throttle scroll events
// ===========================================
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================================
// CONSOLE EASTER EGG
// ===========================================
console.log(`
%c✦ XENON PORTFOLIO ✦

%cDesigned & Developed with ♥
Check out the source code!

`,
    'color: #6366f1; font-size: 24px; font-weight: bold;',
    'color: #888; font-size: 12px;'
);

// ===========================================
// Initialize everything
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();

    // Add loaded class to body for animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});