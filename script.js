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

// ===== BILINGUAL (VI / EN) TRANSLATION ENGINE =====
const i18nTranslations = {
  vi: {
    "meta.title": "NGUYỄN TRẦN TIẾN PHÚC | Portfolio",
    "meta.description": "Portfolio cá nhân - Nguyễn Trần Tiến Phúc | Sinh viên chuyên ngành Thị trường Chứng khoán UEH & Nhà phát triển FinTech/AI",
    "nav.logoTitle": "TIẾN PHÚC",
    "nav.logoSub": "— Tài chính & Công nghệ —",
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.portfolio": "Dự án",
    "nav.contact": "Liên hệ",
    "marquee.about": "VỀ BẢN THÂN",
    "about.label": "✦ Đam mê Tài chính & Lập trình Công nghệ ✦",
    "about.title": "XIN CHÀO, TÔI LÀ",
    "about.name": "NGUYỄN TRẦN TIẾN PHÚC",
    "about.bio": "Tôi là sinh viên ngành <strong>Thị trường Chứng khoán</strong> tại UEH (Khóa K51) nhưng sở hữu niềm đam mê lớn với Công nghệ và Đổi mới sáng tạo. Tôi luôn hướng tới việc kết hợp kiến thức Tài chính với năng lực Lập trình để tạo ra các giải pháp FinTech tối ưu, đồng thời có tư duy mạnh mẽ về các dự án công nghệ tạo tác động xã hội.",
    "about.quote": "\"Kết hợp Tài chính và Công nghệ để kiến tạo những giá trị xã hội bền vững.\"",
    "about.downloadCv": "<i class=\"fa-solid fa-download\"></i> Tải CV",
    "about.portraitAlt": "Chân dung",
    "about.creativity": "Sáng tạo",
    "about.skillsTitle": "Kỹ Năng Nổi Bật",
    "about.skill1": "Phân tích Chứng khoán",
    "about.skill2": "Lập trình FinTech/AI",
    "about.skill3": "Xử lý dữ liệu",
    "about.skill4": "Thiết kế UI/UX",
    "journey.ticket1Desc": "Phân tích thị trường chứng khoán",
    "journey.ticket2Desc": "Tự động hóa & xử lý dữ liệu",
    "journey.ticket3Desc": "Giao diện Dashboard khẩn cấp",
    "journey.ticket4Desc": "Trưởng nhóm & điều phối dự án",
    "journey.notebookTitle": "NHẬT KÝ CỦA TÔI",
    "journey.notebookHint": "~ Nhấn để mở ~",
    "journey.expTitle": "Kinh Nghiệm",
    "journey.exp1": "Sáng lập & Phát triển dự án VNDEER",
    "journey.exp2": "Phát triển AI Chatbot Chứng khoán",
    "journey.exp3": "Trưởng nhóm Bond & Benefit (B&B)",
    "journey.skillsTitle": "Kỹ Năng",
    "journey.doodle1": "Tài chính",
    "journey.doodle2": "AI Code",
    "journey.doodle3": "Lãnh đạo",
    "portfolio.label": "Kho lưu trữ",
    "portfolio.title": "<span class=\"accent\">DỰ ÁN</span> NỔI BẬT",
    "portfolio.proj1Title": "Dự án VNDEER",
    "portfolio.proj1Desc": "Nền tảng công nghệ hỗ trợ điều phối cứu trợ và sơ tán khẩn cấp khi gặp thiên tai tại Việt Nam.",
    "portfolio.proj2Title": "AI Chatbot Chứng khoán",
    "portfolio.proj2Desc": "Công cụ tự động hóa hỗ trợ nhà đầu tư trích xuất thông tin, phân tích dữ liệu thị trường chứng khoán theo thời gian thực.",
    "portfolio.proj3Title": "Dashboard Điều phối",
    "portfolio.proj3Desc": "Hệ thống bảng điều khiển trực quan cho nhà điều phối cứu trợ thiên tai và sơ tán khẩn cấp.",
    "portfolio.proj4Title": "Dự án Tình nguyện",
    "portfolio.proj4Desc": "Dẫn dắt đội ngũ thực hiện chiến dịch tình nguyện và gây quỹ hỗ trợ cộng đồng bị ảnh hưởng bởi thiên tai.",
    "portfolio.stat1": "Dự án sáng lập",
    "portfolio.stat2": "Quỹ gây dựng (Tr.đ)",
    "portfolio.stat3": "Khóa K51 UEH",
    "cert.label": "Thành tích",
    "cert.title": "<span class=\"accent\">CHỨNG CHỈ</span> CÁ NHÂN",
    "cert.featuredTitle": "<i class=\"fa-solid fa-star\" style=\"color: var(--color-accent);\"></i> Chứng Chỉ Tiêu Biểu (Featured)",
    "cert.featuredBadge": "<i class=\"fa-solid fa-star\"></i> TIÊU BIỂU",
    "cert.otherTitle": "<i class=\"fa-solid fa-award\"></i> Chứng Chỉ Khác",
    "gallery.label": "Ảnh nghệ thuật",
    "gallery.title": "<span class=\"accent\">MASONRY</span> GALLERY",
    "contact.label": "Kết nối",
    "contact.title": "<span class=\"accent\">LIÊN HỆ</span> VỚI TÔI",
    "contact.emailLabel": "Email",
    "contact.phoneLabel": "Điện thoại",
    "contact.addressLabel": "Địa chỉ",
    "contact.addressValue": "Đại học Kinh tế TP.HCM (UEH), TP. Hồ Chí Minh",
    "contact.githubLabel": "GitHub",
    "contact.formName": "Họ và tên",
    "contact.formNamePlaceholder": "Nhập họ tên...",
    "contact.formEmail": "Email",
    "contact.formEmailPlaceholder": "Nhập email...",
    "contact.formSubject": "Chủ đề",
    "contact.formSubjectPlaceholder": "Nhập chủ đề...",
    "contact.formMessage": "Tin nhắn",
    "contact.formMessagePlaceholder": "Nhập tin nhắn...",
    "contact.formSubmit": "<i class=\"fa-solid fa-paper-plane\"></i> Gửi Tin Nhắn",
    "contact.alertSuccess": "Cảm ơn bạn đã gửi tin nhắn!",
    "footer.copyright": "&copy; 2026 <span class=\"primary\">NGUYỄN TRẦN TIẾN PHÚC</span>. Thiết kế với <i class=\"fa-solid fa-heart\" style=\"color:#FF6B6B\"></i> và niềm đam mê công nghệ."
  },
  en: {
    "meta.title": "NGUYEN TRAN TIEN PHUC | Portfolio",
    "meta.description": "Personal Portfolio - Nguyen Tran Tien Phuc | Stock Market Student at UEH & FinTech/AI Developer",
    "nav.logoTitle": "TIEN PHUC",
    "nav.logoSub": "— Finance & Technology —",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.portfolio": "Projects",
    "nav.contact": "Contact",
    "marquee.about": "ABOUT ME",
    "about.label": "✦ Passion for Finance & Tech Programming ✦",
    "about.title": "HELLO, I AM",
    "about.name": "NGUYEN TRAN TIEN PHUC",
    "about.bio": "I am a <strong>Stock Market</strong> student at UEH (Batch K51) with a strong passion for Technology and Innovation. I always strive to combine Financial knowledge with Programming capabilities to build optimal FinTech solutions, driven by a strong mindset for social-impact technology projects.",
    "about.quote": "\"Combining Finance and Technology to create sustainable social values.\"",
    "about.downloadCv": "<i class=\"fa-solid fa-download\"></i> Download CV",
    "about.portraitAlt": "Portrait",
    "about.creativity": "Creativity",
    "about.skillsTitle": "Core Skills",
    "about.skill1": "Stock Analysis",
    "about.skill2": "FinTech/AI Dev",
    "about.skill3": "Data Processing",
    "about.skill4": "UI/UX Design",
    "journey.ticket1Desc": "Stock market analysis",
    "journey.ticket2Desc": "Automation & data processing",
    "journey.ticket3Desc": "Emergency Dashboard UI/UX",
    "journey.ticket4Desc": "Team Lead & project coordination",
    "journey.notebookTitle": "MY JOURNAL",
    "journey.notebookHint": "~ Click to open ~",
    "journey.expTitle": "Experience",
    "journey.exp1": "Founded & Developed VNDEER Project",
    "journey.exp2": "Developed Stock Market AI Chatbot",
    "journey.exp3": "Team Leader of Bond & Benefit (B&B)",
    "journey.skillsTitle": "Skills",
    "journey.doodle1": "Finance",
    "journey.doodle2": "AI Code",
    "journey.doodle3": "Leadership",
    "portfolio.label": "Archive",
    "portfolio.title": "<span class=\"accent\">FEATURED</span> PROJECTS",
    "portfolio.proj1Title": "VNDEER Project",
    "portfolio.proj1Desc": "A technology platform supporting emergency relief coordination and evacuation during natural disasters in Vietnam.",
    "portfolio.proj2Title": "Stock Market AI Chatbot",
    "portfolio.proj2Desc": "An automation tool assisting investors in extracting insights and analyzing real-time stock market data.",
    "portfolio.proj3Title": "Coordination Dashboard",
    "portfolio.proj3Desc": "An intuitive control panel system for disaster relief coordinators and emergency evacuation.",
    "portfolio.proj4Title": "Community Volunteer Project",
    "portfolio.proj4Desc": "Led teams in executing volunteer campaigns and fundraising to support communities affected by natural disasters.",
    "portfolio.stat1": "Founded Projects",
    "portfolio.stat2": "Funds Raised (M VND)",
    "portfolio.stat3": "UEH Batch K51",
    "cert.label": "Achievements",
    "cert.title": "<span class=\"accent\">PERSONAL</span> CERTIFICATES",
    "cert.featuredTitle": "<i class=\"fa-solid fa-star\" style=\"color: var(--color-accent);\"></i> Featured Certificates",
    "cert.featuredBadge": "<i class=\"fa-solid fa-star\"></i> FEATURED",
    "cert.otherTitle": "<i class=\"fa-solid fa-award\"></i> Other Certificates",
    "gallery.label": "Art Gallery",
    "gallery.title": "<span class=\"accent\">MASONRY</span> GALLERY",
    "contact.label": "Get in Touch",
    "contact.title": "<span class=\"accent\">CONTACT</span> ME",
    "contact.emailLabel": "Email",
    "contact.phoneLabel": "Phone",
    "contact.addressLabel": "Location",
    "contact.addressValue": "University of Economics Ho Chi Minh City (UEH), HCMC",
    "contact.githubLabel": "GitHub",
    "contact.formName": "Full Name",
    "contact.formNamePlaceholder": "Enter your full name...",
    "contact.formEmail": "Email",
    "contact.formEmailPlaceholder": "Enter your email...",
    "contact.formSubject": "Subject",
    "contact.formSubjectPlaceholder": "Enter subject...",
    "contact.formMessage": "Message",
    "contact.formMessagePlaceholder": "Write your message...",
    "contact.formSubmit": "<i class=\"fa-solid fa-paper-plane\"></i> Send Message",
    "contact.alertSuccess": "Thank you for your message!",
    "footer.copyright": "&copy; 2026 <span class=\"primary\">NGUYEN TRAN TIEN PHUC</span>. Designed with <i class=\"fa-solid fa-heart\" style=\"color:#FF6B6B\"></i> and a passion for technology."
  }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'vi';

// Helper to build split-text spans while preserving .accent styling
const buildSplitText = (el, htmlString) => {
  const temp = document.createElement('div');
  temp.innerHTML = htmlString;
  el.innerHTML = '';
  let charIndex = 0;

  const processNode = (node, isAccent = false) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split('').forEach((char) => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        if (isAccent) span.classList.add('accent');
        span.style.transitionDelay = `${charIndex * 30}ms`;
        el.appendChild(span);
        charIndex++;
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const accent = isAccent || node.classList.contains('accent');
      node.childNodes.forEach(child => processNode(child, accent));
    }
  };

  temp.childNodes.forEach(node => processNode(node, false));
};

function applyLanguage(lang) {
  const dict = i18nTranslations[lang] || i18nTranslations.vi;
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);

  // Update HTML lang, title, and meta description
  document.documentElement.lang = lang;
  if (dict["meta.title"]) document.title = dict["meta.title"];
  const metaDesc = document.getElementById('meta-description');
  if (metaDesc && dict["meta.description"]) {
    metaDesc.setAttribute('content', dict["meta.description"]);
  }

  // Plain text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // HTML elements
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Image alt attributes
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    if (dict[key] !== undefined) {
      el.setAttribute('alt', dict[key]);
    }
  });

  // Split-text headings
  document.querySelectorAll('[data-i18n-split]').forEach(el => {
    const key = el.getAttribute('data-i18n-split');
    if (dict[key] !== undefined) {
      buildSplitText(el, dict[key]);
    }
  });

  // Update toggle button states
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-lang-opt') === lang);
  });
  const floatingCode = document.getElementById('langFloatingCode');
  if (floatingCode) {
    floatingCode.textContent = lang.toUpperCase();
  }
}

function toggleLanguage() {
  const nextLang = currentLang === 'vi' ? 'en' : 'vi';
  applyLanguage(nextLang);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const dict = i18nTranslations[currentLang] || i18nTranslations.vi;
  alert(dict["contact.alertSuccess"]);
}

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

    // Twinkle effect — organic breathing
    this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(this.life + this.twinklePhase));

    // Gentle mouse interaction — stars drift away softly
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

// Soft connections between nearby stars — like constellation lines
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


// ===== SPLIT TEXT ENGINE =====
const initSplitText = () => {
  const elements = document.querySelectorAll('.split-text');
  elements.forEach(el => {
    if (!el.hasAttribute('data-i18n-split')) {
      buildSplitText(el, el.innerHTML);
    }
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

  safeInit('applyLanguage', () => applyLanguage(currentLang));
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
