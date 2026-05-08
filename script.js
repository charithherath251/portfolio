// ===== MATRIX RAIN BACKGROUND =====
(function initMatrix() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソタチツテト';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 14, 23, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ffaa';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);

  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });
})();

// ===== NAVBAR SCROLL & ACTIVE LINK =====
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close on link click (mobile)
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
})();

// ===== SCROLL REVEAL =====
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

// ===== CONTACT FORM =====
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    alert(`Message sent (demo) — Thanks ${name}, I'll get back to you at ${email} soon!`);
    form.reset();
  });
})();

// ===== TYPING EFFECT FOR HERO SUBTITLE (optional enhancement) =====
(function initTypingCaret() {
  const el = document.querySelector('.typing-cursor');
  if (!el) return;
  setInterval(() => {
    el.style.opacity = el.style.opacity === '0' ? '1' : '0';
  }, 530);
})();

// ===== SKILL BAR ANIMATION =====
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        bar.classList.add('animated');
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

// ===== SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
