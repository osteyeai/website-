/* ═══════════ SET CURRENT YEAR ═══════════ */
document.getElementById('currentYear').textContent = new Date().getFullYear();

/* ═══════════ PARTICLES.JS CONFIG (with error handling) ═══════════ */
let isMobile = window.innerWidth < 768;

function initParticles() {
    try {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: isMobile ? 30 : 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#00e5ff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
                    size: { value: 2.5, random: true },
                    line_linked: { enable: true, distance: 150, color: '#00e5ff', opacity: 0.15, width: 1 },
                    move: { enable: true, speed: 1.2, direction: 'none', random: true, out_mode: 'out' }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: !isMobile, mode: 'grab' }, resize: true },
                    modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } } }
                },
                retina_detect: true
            });
        }
    } catch (e) {
        console.warn('Particles.js failed to initialize:', e);
    }
}

/* ═══════════ NAVBAR SCROLL ═══════════ */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 80);
    backToTop.classList.toggle('visible', y > 400);
}, { passive: true });

/* ═══════════ HAMBURGER MENU ═══════════ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { hamburger.classList.remove('active'); navLinks.classList.remove('open'); });
});

/* ═══════════ INTERSECTION OBSERVER — REVEAL ═══════════ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════ GSAP — SINGLE LOAD HANDLER ═══════════ */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize particles
    if (typeof initParticles === 'function') initParticles();

    // Hero animations
    if (!prefersReduced) {
        gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 0.6, delay: 0.1, ease: 'power2.out' });
        gsap.from('.hero-h1', { opacity: 0, y: 30, duration: 0.7, delay: 0.2, ease: 'power2.out' });
        gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.6, delay: 0.3, ease: 'power2.out' });
        gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.6, delay: 0.4, ease: 'power2.out' });
        gsap.from('.live-feed', { opacity: 0, scale: 0.95, y: 20, duration: 0.7, delay: 0.5, ease: 'back.out(1.2)', clearProps: 'all' });
        gsap.from('.timeline-step', {
            scrollTrigger: { trigger: '.timeline', start: 'top 80%' },
            opacity: 0, y: 30, stagger: 0.1, duration: 0.6,
            clearProps: 'all'
        });

        gsap.from('.service-overview-card', {
            scrollTrigger: { trigger: '.services-overview-grid', start: 'top 85%' },
            opacity: 0, y: 30, stagger: 0.08, duration: 0.5, clearProps: 'all'
        });

        gsap.from('.solution-card', {
            scrollTrigger: { trigger: '.solutions-grid', start: 'top 85%' },
            opacity: 0, y: 30, stagger: 0.1, duration: 0.6, clearProps: 'all'
        });

        gsap.from('.number-card', {
            scrollTrigger: { trigger: '.numbers-grid', start: 'top 85%' },
            opacity: 0, scale: 0.8, stagger: 0.15, duration: 0.5, clearProps: 'all'
        });

        gsap.from('.scene-container', {
            scrollTrigger: { trigger: '.scene-container', start: 'top 80%' },
            opacity: 0, y: 30, duration: 0.8, clearProps: 'all'
        });

        gsap.from('.automation-scene', {
            scrollTrigger: { trigger: '.automation-scene', start: 'top 80%' },
            opacity: 0, y: 30, duration: 0.8, clearProps: 'all'
        });

        gsap.from('.cta-section', {
            scrollTrigger: { trigger: '.cta-section', start: 'top 85%' },
            opacity: 0, y: 40, duration: 0.8, clearProps: 'all'
        });
    }

    ScrollTrigger.refresh();
});

/* ═══════════ FAQ ACCORDION (Event Delegation) ═══════════ */
document.querySelector('.faq-list').addEventListener('click', function (e) {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
});

/* ═══════════ CONTACT FORM — WhatsApp + Email Fallback ═══════════ */
document.getElementById('quoteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nm = document.getElementById('fullName').value.trim();
    const ph = document.getElementById('phone').value.trim();
    const ct = document.getElementById('city').value.trim();
    const sv = document.getElementById('serviceReq').value;
    const ms = document.getElementById('message').value.trim();

    /* Basic phone validation — must be 10+ digits */
    const phoneDigits = ph.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
        alert('Please enter a valid phone number (at least 10 digits).');
        document.getElementById('phone').focus();
        return;
    }

    /* 1. Primary: WhatsApp */
    const waText = `Hello OWLLEYE! I need a quote.\n\n*Name:* ${nm}\n*Phone:* ${ph}\n*Location:* ${ct}\n*Service:* ${sv}\n*Message:* ${ms}`;
    const waLink = `https://wa.me/919391609598?text=${encodeURIComponent(waText)}`;
    const waWindow = window.open(waLink, '_blank');

    /* 2. Fallback: mailto (if WhatsApp popup is blocked) */
    if (!waWindow || waWindow.closed || typeof waWindow.closed === 'undefined') {
        const emailSubject = `New Enquiry from ${nm} — ${sv}`;
        const emailBody = `Name: ${nm}\nPhone: ${ph}\nCity/Area: ${ct}\nService: ${sv}\nMessage: ${ms}`;
        const mailtoLink = `mailto:contact@owlleye.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
    }

    /* 3. Backup: Store lead in localStorage so data is never lost */
    try {
        const leads = JSON.parse(localStorage.getItem('owlleye_leads') || '[]');
        leads.push({ name: nm, phone: ph, city: ct, service: sv, message: ms, timestamp: new Date().toISOString() });
        localStorage.setItem('owlleye_leads', JSON.stringify(leads));
    } catch (e) { /* localStorage full or unavailable — silently continue */ }

    this.style.display = 'none';
    const success = document.getElementById('formSuccess');
    success.style.display = 'block';
    setTimeout(() => {
        success.style.display = 'none';
        this.reset();
        this.style.display = 'block';
    }, 6000);
});

/* ═══════════ TESTIMONIAL AUTO-SCROLL + DOTS ═══════════ */
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('testimonialDots');
let scrollDir = 1;
let autoScrollPaused = false;
let pauseTimeout;
let testimonialVisible = false;

// Generate dots
const testimonialCards = track.querySelectorAll('.testimonial-card');
testimonialCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        autoScrollPaused = true;
        clearTimeout(pauseTimeout);
        const cardWidth = testimonialCards[0].offsetWidth + 24;
        track.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
        pauseTimeout = setTimeout(() => { autoScrollPaused = false; }, 5000);
    });
    dotsContainer.appendChild(dot);
});

// Update active dot on scroll
function updateDots() {
    const scrollLeft = track.scrollLeft;
    const cardWidth = testimonialCards[0].offsetWidth + 24;
    const activeIdx = Math.round(scrollLeft / cardWidth);
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
    });
}
track.addEventListener('scroll', updateDots, { passive: true });

/* Pause auto-scroll on touch so it doesn't fight finger swipe */
track.addEventListener('touchstart', () => {
    autoScrollPaused = true;
    clearTimeout(pauseTimeout);
}, { passive: true });
track.addEventListener('touchend', () => {
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => { autoScrollPaused = false; }, 4000);
}, { passive: true });
/* Also pause on mouse interaction (desktop drag) */
track.addEventListener('mousedown', () => { autoScrollPaused = true; });
track.addEventListener('mouseup', () => {
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => { autoScrollPaused = false; }, 4000);
});

/* FIX: Use rAF instead of 80ms setInterval, gated by visibility */
const testimonialVisObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { testimonialVisible = entry.isIntersecting; });
}, { threshold: 0.1 });
testimonialVisObserver.observe(track);

let lastScrollTime = 0;
function autoScrollTestimonials(timestamp) {
    if (testimonialVisible && !autoScrollPaused && track) {
        // Throttle to ~80ms intervals (original speed)
        if (timestamp - lastScrollTime > 80) {
            track.scrollLeft += scrollDir;
            if (track.scrollLeft >= track.scrollWidth - track.clientWidth) scrollDir = -1;
            if (track.scrollLeft <= 0) scrollDir = 1;
            lastScrollTime = timestamp;
        }
    }
    requestAnimationFrame(autoScrollTestimonials);
}
requestAnimationFrame(autoScrollTestimonials);

/* ═══════════ LIVE FEED TIMESTAMP (visibility-gated) ═══════════ */
const feedTs = document.getElementById('feedTimestamp');
let feedVisible = false;
let feedInterval = null;

if (feedTs) {
    const feedSection = document.getElementById('hero');
    const feedVisObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            feedVisible = entry.isIntersecting;
            if (feedVisible && !feedInterval) {
                feedInterval = setInterval(updateFeedTimestamp, 1000);
                updateFeedTimestamp(); // immediate update
            } else if (!feedVisible && feedInterval) {
                clearInterval(feedInterval);
                feedInterval = null;
            }
        });
    }, { threshold: 0.1 });
    feedVisObserver.observe(feedSection);

    function updateFeedTimestamp() {
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        feedTs.textContent = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
}

/* ═══════════ CINEMATIC SECURITY SCENE CONTROLLER ═══════════ */
const scenePerson = document.getElementById('scenePerson');
const sceneDetectBox = document.getElementById('sceneDetectBox');
const sceneCone = document.getElementById('sceneCone');
const sceneBadge1 = document.getElementById('sceneBadge1');
const sceneBadge2 = document.getElementById('sceneBadge2');
const sLight1 = document.getElementById('sLight1');
const sLight2 = document.getElementById('sLight2');
const sBeam1 = document.getElementById('sBeam1');
const sBeam2 = document.getElementById('sBeam2');
const sLightLabel1 = document.getElementById('sLightLabel1');
const sLightLabel2 = document.getElementById('sLightLabel2');

let sceneDetected = false;
let sceneVisible = false;

/* FIX: Only run detection loop when scene is visible */
const sceneContainer = document.getElementById('securityScene');
if (sceneContainer) {
    const sceneVisObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            sceneVisible = entry.isIntersecting;
            if (sceneVisible) {
                requestAnimationFrame(checkDetection);
            }
        });
    }, { threshold: 0.1 });
    sceneVisObserver.observe(sceneContainer);
}

function checkDetection() {
    if (!scenePerson || !sceneVisible) return;
    const container = sceneContainer;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const personRect = scenePerson.getBoundingClientRect();
    const personCenter = personRect.left + personRect.width / 2;
    const containerWidth = containerRect.width;
    const relativePos = (personCenter - containerRect.left) / containerWidth;

    if (relativePos > 0.50 && relativePos < 0.88 && !sceneDetected) {
        sceneDetected = true;
        sceneDetectBox.classList.add('visible');
        sceneCone.classList.add('detected');
        document.getElementById('sceneCamHead').classList.add('locked');
        sceneBadge1.textContent = '';
        sceneBadge1.innerHTML = '<span class="status-dot"></span>PERSON DETECTED';
        sceneBadge1.classList.add('alert');
        setTimeout(() => {
            sceneBadge2.style.opacity = '1';
            sceneBadge2.innerHTML = '<span class="status-dot"></span>LIGHTS ON';
            sceneBadge2.classList.add('success');
            sLight1.classList.add('on'); sLight2.classList.add('on');
            sBeam1.classList.add('on'); sBeam2.classList.add('on');
            sLightLabel1.classList.add('on'); sLightLabel2.classList.add('on');
        }, 500);
    }

    if ((relativePos > 0.95 || relativePos < 0.0) && sceneDetected) {
        sceneDetected = false;
        sceneDetectBox.classList.remove('visible');
        sceneCone.classList.remove('detected');
        document.getElementById('sceneCamHead').classList.remove('locked');
        sceneBadge1.innerHTML = '<span class="status-dot"></span>SCANNING';
        sceneBadge1.classList.remove('alert');
        sceneBadge2.style.opacity = '0';
        sceneBadge2.classList.remove('success');
        sLight1.classList.remove('on'); sLight2.classList.remove('on');
        sBeam1.classList.remove('on'); sBeam2.classList.remove('on');
        sLightLabel1.classList.remove('on'); sLightLabel2.classList.remove('on');
    }

    /* Only continue the loop if scene is still visible */
    if (sceneVisible) {
        requestAnimationFrame(checkDetection);
    }
}

/* ═══════════ NUMBER COUNTER ANIMATION ═══════════ */
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.number-card');
            cards.forEach((card, i) => {
                setTimeout(() => { card.classList.add('counted'); }, i * 200);
            });
            numberObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const numbersGrid = document.querySelector('.numbers-grid');
if (numbersGrid) numberObserver.observe(numbersGrid);

/* ═══════════ GALLERY LIGHTBOX ═══════════ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');
const galleryImages = [];
let currentLightboxIdx = 0;

/* FIX: Gallery items don't have <img> tags — use background or placeholder approach */
galleryItems.forEach((item, i) => {
    // Use the aria-label as a descriptive fallback
    const label = item.getAttribute('aria-label') || `Installation ${i + 1}`;
    // Store a reference (images can be added later when real photos are available)
    galleryImages.push({ label: label, index: i });

    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter') openLightbox(i); });
});

function openLightbox(idx) {
    if (galleryImages.length === 0) return;
    currentLightboxIdx = idx;
    const item = galleryItems[idx];
    const img = item.querySelector('img');
    if (img) {
        lightboxImg.src = img.src.replace('w=600', 'w=1200');
        lightboxImg.alt = galleryImages[idx].label;
        lightboxCounter.textContent = `${idx + 1} / ${galleryImages.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    // If no images exist yet, don't open an empty lightbox
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    currentLightboxIdx = (currentLightboxIdx + dir + galleryImages.length) % galleryImages.length;
    const item = galleryItems[currentLightboxIdx];
    const img = item.querySelector('img');
    if (img) {
        lightboxImg.src = img.src.replace('w=600', 'w=1200');
        lightboxImg.alt = galleryImages[currentLightboxIdx].label;
        lightboxCounter.textContent = `${currentLightboxIdx + 1} / ${galleryImages.length}`;
    }
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

/* ═══════════ COOKIE CONSENT ═══════════ */
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');

if (!localStorage.getItem('owlleye_cookie_accepted')) {
    setTimeout(() => { cookieBanner.classList.add('show'); }, 2000);
}

cookieAccept.addEventListener('click', () => {
    cookieBanner.classList.remove('show');
    localStorage.setItem('owlleye_cookie_accepted', 'true');
});