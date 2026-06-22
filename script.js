const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('musicToggle');
const musicFloatingBtn = document.getElementById('musicFloatingBtn');
let isMusicPlaying = false;

function toggleMusic() {
  if (!bgMusic) return;
  if (isMusicPlaying) {
    bgMusic.pause();
    if (musicToggle) musicToggle.classList.remove('playing');
    if (musicFloatingBtn) musicFloatingBtn.classList.remove('playing');
  } else {
    bgMusic.play().catch(e => console.warn("Music play failed:", e));
    if (musicToggle) musicToggle.classList.add('playing');
    if (musicFloatingBtn) musicFloatingBtn.classList.add('playing');
  }
  isMusicPlaying = !isMusicPlaying;
}

// Initial attempt to play music or on first user interaction
const initMusic = () => {
  // Attempt play on any click if not started
  document.addEventListener('click', () => {
    if (!isMusicPlaying && bgMusic) {
      bgMusic.play().then(() => {
        isMusicPlaying = true;
        if (musicToggle) musicToggle.classList.add('playing');
        if (musicFloatingBtn) musicFloatingBtn.classList.add('playing');
      }).catch(e => console.log("Music blocked by browser policy"));
    }
  }, { once: true });
};
initMusic();

// ===== STARLIGHT PARTICLES SYSTEM =====
// Warm floating stars inspired by Van Gogh's Starry Night
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Warm star colors palette
const starColors = [
  { r: 212, g: 165, b: 116 },  // gold
  { r: 232, g: 197, b: 146 },  // light gold
  { r: 193, g: 123, b: 69 },   // sienna
  { r: 240, g: 232, b: 216 },  // warm cream
  { r: 180, g: 190, b: 220 },  // pale blue (starlight)
  { r: 160, g: 170, b: 210 },  // soft blue
];

class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.15;
    this.speedY = (Math.random() - 0.5) * 0.15 - 0.05; // gentle upward drift
    this.color = starColors[Math.floor(Math.random() * starColors.length)];
    this.opacity = Math.random() * 0.6 + 0.1;
    this.maxOpacity = this.opacity;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.life = 0;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life += this.twinkleSpeed;

    // Twinkle effect â€” organic breathing
    this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(this.life + this.twinklePhase));

    // Gentle mouse interaction â€” stars drift away softly
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        this.x -= dx * 0.005;
        this.y -= dy * 0.005;
        this.opacity = Math.min(this.maxOpacity * 1.5, 1); // brighten near cursor
      }
    }

    if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
      this.reset();
    }
  }
  draw() {
    const { r, g, b } = this.color;

    // Glow halo
    if (this.size > 1.2) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.15})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Star core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    ctx.fill();
  }
}

function initStars() {
  stars = [];
  const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000));
  for (let i = 0; i < count; i++) {
    stars.push(new Star());
  }
}
initStars();

// Soft connections between nearby stars â€” like constellation lines
function connectStars() {
  for (let a = 0; a < stars.length; a++) {
    for (let b = a + 1; b < stars.length; b++) {
      const dx = stars[a].x - stars[b].x;
      const dy = stars[a].y - stars[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const avgColor = {
          r: (stars[a].color.r + stars[b].color.r) / 2,
          g: (stars[a].color.g + stars[b].color.g) / 2,
          b: (stars[a].color.b + stars[b].color.b) / 2
        };
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${0.04 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(stars[a].x, stars[a].y);
        ctx.lineTo(stars[b].x, stars[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => { s.update(); s.draw(); });
  connectStars();
  requestAnimationFrame(animateStars);
}
animateStars();

// ===== PARALLAX HERO BACKGROUND =====
const heroParallax = document.getElementById('heroParallax');
if (heroParallax) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.3;
    heroParallax.style.transform = `scale(1.05) translateY(${rate}px)`;
  }, { passive: true });

  // Subtle mouse parallax on hero
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    document.addEventListener('mousemove', (e) => {
      if (window.scrollY < window.innerHeight) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        heroParallax.style.transform = `scale(1.05) translate(${moveX}px, ${moveY + window.scrollY * 0.3}px)`;
      }
    });
  }
}

// Typing effect removed as per new typography style

// ===== NAVBAR SCROLL (Show past Hero) =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  // Show navbar only after scrolling past 70% of the viewport height (Approaching About section)
  navbar.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.7);
});

// ===== NAV ACTIVE LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===== MOBILE NAV TOGGLE =====
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});



// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== COUNT UP ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const increment = target / 80; // slower, more elegant
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(counter);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 30);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => countObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// Initialize// ===== SPLIT TEXT ENGINE =====
const initSplitText = () => {
  const elements = document.querySelectorAll('.split-text');
  elements.forEach(el => {
    const text = el.innerText;
    el.innerHTML = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${i * 30}ms`;
      el.appendChild(span);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
};

// ===== SHAPE BLUR & SPOTLIGHT TRACKING =====
const initMouseEffects = () => {
  const mouseBlur = document.getElementById('mouse-blur');
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  window.addEventListener('mousemove', (e) => {
    // Shape Blur move
    if (mouseBlur) {
      const x = e.clientX - 250;
      const y = e.clientY - 250;
      mouseBlur.style.transform = `translate(${x}px, ${y}px)`;
    }

    // Spotlight Cards update
    spotlightCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
};

// ===== PHOTOBOOTH VINTAGE =====
// Redundant initPhotobooth removed to consolidate logic in initAntiGravity

// ===== CIRCULAR GALLERY LOGIC =====
// ===== PERSPECTIVE GALLERY INTERACTION =====
const initPerspectiveGallery = () => {
  const items = document.querySelectorAll('.gallery-item-perspective');
  if (items.length === 0) return;

  items.forEach(item => {
    // Re-apply tilt when not hovered
    const resetTilt = () => {
      const baseTilt = item.getAttribute('data-tilt') || '0';
      item.style.transform = `perspective(1000px) rotateY(${baseTilt}deg)`;
    };

    item.addEventListener('mouseenter', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });

    // Subtle mouse tilt for each card
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;

      item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.15) translateZ(100px)`;
    });

    item.addEventListener('mouseleave', () => {
      resetTilt();
    });

    // Initialize tilt
    resetTilt();
  });
};


const initAll = () => {
  const safeInit = (name, fn) => {
    try {
      fn();
    } catch (e) {
      console.error(`Error initializing ${name}:`, e);
    }
  };

  safeInit('initSplitText', initSplitText);
  safeInit('initMouseEffects', initMouseEffects);
  safeInit('initPerspectiveGallery', initPerspectiveGallery);

  // Video background adjustments
  try {
    const globalVideo = document.getElementById('globalVideo');
    if (globalVideo) {
      globalVideo.currentTime = 3.0;
      globalVideo.play().catch(e => console.warn("Autoplay failed:", e));

      // Custom loop: always start from 3.0s
      globalVideo.addEventListener('ended', () => {
        globalVideo.currentTime = 3.0;
        globalVideo.play();
      });
    }
  } catch (e) {
    console.error("Error initializing video background:", e);
  }

  safeInit('initAntiGravity', initAntiGravity);
  safeInit('Lanyard', () => {
    if (typeof Lanyard !== 'undefined') {
      new Lanyard();
    } else {
      console.warn("Lanyard class is not defined");
    }
  });
  safeInit('initLetterModal', initLetterModal);
  safeInit('initCertLightbox', initCertLightbox);
  safeInit('initCertCarousels', initCertCarousels);
};

// Update DOM load
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

// ===== LETTER ENVELOPE CLICK → OPEN MODAL =====
const initLetterModal = () => {
  const letterWrapper = document.getElementById('interactive-letter');
  const letterModal = document.getElementById('letter-modal');
  if (!letterWrapper || !letterModal) return;

  const closeBtn = letterModal.querySelector('.close-btn');
  const overlay = letterModal.querySelector('.popup-overlay');

  // Open letter modal on envelope click
  letterWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    letterModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  // Close on close button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      letterModal.classList.remove('show');
      document.body.style.overflow = '';
    });
  }

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      letterModal.classList.remove('show');
      document.body.style.overflow = '';
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && letterModal.classList.contains('show')) {
      letterModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
};

// ===== CERTIFICATE LIGHTBOX =====
const initCertLightbox = () => {
  const lightbox = document.getElementById('cert-lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('cert-lightbox-img');
  const closeBtn = lightbox.querySelector('.cert-lightbox-close');
  const overlay = lightbox.querySelector('.cert-lightbox-overlay');

  // Click on any cert-card to open lightbox
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.cert-img');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (overlay) overlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
  });
};

// ===== ANTI-GRAVITY GSAP ANIMATIONS =====
const initAntiGravity = () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn("GSAP or ScrollTrigger not loaded");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.starry-night-section');
  const tickets = document.querySelectorAll('.ticket-card');
  const notebook = document.querySelector('.vintage-notebook');
  const floatingEls = document.querySelectorAll('.floating-el');
  const parallaxWraps = document.querySelectorAll('.parallax-wrap');
  const notebookWrapper = document.querySelector('.notebook-wrapper');
  const notebookCloseBtn = document.querySelector('.notebook-close-btn');

  if (!section) return;

  // 1. Entrance Animation - High-end fly in
  gsap.fromTo(tickets,
    { y: 100, rotation: -5, opacity: 0 },
    {
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out"
    }
  );

  gsap.fromTo(notebook,
    { y: 80, rotation: 15, scale: 0.9, opacity: 0 },
    {
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none reverse"
      },
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 1.8,
      ease: "power2.out"
    }
  );

  // 2. Continuous Anti-gravity floating (Bobbing)
  floatingEls.forEach((el, i) => {
    gsap.to(el, {
      y: "-=20",
      rotation: "random(-2, 2)",
      duration: "random(2.5, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.2
    });
  });

  // 3. Notebook Click Interaction (3D Page Flip)
  if (notebook) {
    // Use mousedown for more reliable click detection during GSAP animations
    notebook.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
    notebook.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      notebook.classList.toggle('open');
    });
    // Touch support
    notebook.addEventListener('touchend', (e) => {
      e.stopPropagation();
      e.preventDefault();
      notebook.classList.toggle('open');
    });
  }

  // Helper function for shutter sound
  const playShutterSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio context failed:", e);
    }
  };

  // 3b. Countdown Camera Interaction
  const countdownOverlay = document.getElementById('countdown-overlay');
  const flash = document.getElementById('camera-flash');
  const capturedLetterModal = document.getElementById('captured-letter-popup');
  const letterCloseBtn = document.getElementById('letter-close-btn');

  const cameraTrigger = document.getElementById('camera-trigger');
  const photoPopup = document.getElementById('photo-popup');
  const photoPopupClose = document.getElementById('photo-popup-close');

  if (cameraTrigger && countdownOverlay) {
    cameraTrigger.addEventListener('click', () => {
      if (cameraTrigger.classList.contains('capturing')) return;
      cameraTrigger.classList.add('capturing');

      let count = 3;
      countdownOverlay.style.opacity = '1';
      countdownOverlay.textContent = count;

      // Initial count animation
      gsap.fromTo(countdownOverlay,
        { scale: 0.5, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: "back.out(2)" }
      );

      const countdownInt = setInterval(() => {
        count--;
        if (count > 0) {
          countdownOverlay.textContent = count;
          gsap.fromTo(countdownOverlay,
            { scale: 0.5, opacity: 0, filter: 'blur(10px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: "back.out(2)" }
          );
        } else {
          clearInterval(countdownInt);
          countdownOverlay.textContent = "";
          countdownOverlay.style.opacity = '0';

          // Flash & Sound
          playShutterSound();
          if (flash) {
            flash.classList.remove('flash-anim');
            void flash.offsetWidth;
            flash.classList.add('flash-anim');
          }

          // Camera Shake
          gsap.to(cameraTrigger, {
            x: () => (Math.random() - 0.5) * 20,
            y: () => (Math.random() - 0.5) * 20,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
              gsap.to(cameraTrigger, { x: 0, y: 0, duration: 0.1 });
              cameraTrigger.classList.remove('capturing');

              // Show Polaroid Popup with smooth entrance
              setTimeout(() => {
                if (photoPopup) {
                  photoPopup.classList.add('show');
                  gsap.fromTo(photoPopup.querySelector('.polaroid'),
                    { opacity: 0, scale: 0.7, y: 100, rotate: -10 },
                    { opacity: 1, scale: 1, y: 0, rotate: -2, duration: 1.2, ease: "elastic.out(1, 0.75)" }
                  );
                }
              }, 400);
            }
          });
        }
      }, 1000);
    });

    if (photoPopupClose) {
      photoPopupClose.addEventListener('click', () => {
        photoPopup.classList.remove('show');
      });
    }
  }

  // 5. Parallax Effect (SCRUB)
  parallaxWraps.forEach(wrap => {
    const depth = parseFloat(wrap.getAttribute('data-depth')) || 0.1;
    gsap.to(wrap, {
      y: -250 * depth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });
  });
};

// ===== CERTIFICATE CAROUSEL CONTROL =====
const initCertCarousels = () => {
  document.querySelectorAll('.cert-carousel-container').forEach(container => {
    const track = container.querySelector('.cert-carousel-track');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    if (!track) return;

    const getScrollAmount = () => track.clientWidth * 0.8;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
    }

    // Toggle button visibility/state based on scroll position
    const updateButtons = () => {
      const isScrollable = track.scrollWidth > track.clientWidth;
      if (!isScrollable) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
      }

      if (prevBtn) {
        prevBtn.style.display = 'flex';
        if (track.scrollLeft <= 10) {
          prevBtn.style.opacity = '0.2';
          prevBtn.style.pointerEvents = 'none';
        } else {
          prevBtn.style.opacity = '1';
          prevBtn.style.pointerEvents = 'auto';
        }
      }

      if (nextBtn) {
        nextBtn.style.display = 'flex';
        const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
        if (isAtEnd) {
          nextBtn.style.opacity = '0.2';
          nextBtn.style.pointerEvents = 'none';
        } else {
          nextBtn.style.opacity = '1';
          nextBtn.style.pointerEvents = 'auto';
        }
      }
    };

    track.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    
    // Initial checks (delayed to allow CSS styles/layouts to calculate)
    setTimeout(updateButtons, 500);
    setTimeout(updateButtons, 1500); // Back up check


  });
};

