// LOADER
const loader = document.getElementById('loader');
const loaderPct = document.getElementById('loader-pct');
if (loader && loaderPct) {
  const steps = [0, 15, 30, 55, 75, 90, 100];
  let i = 0;
  const tick = () => {
    if (i < steps.length) {
      loaderPct.textContent = steps[i] + '%';
      i++;
      setTimeout(tick, i === steps.length ? 250 : 150 + Math.random() * 250);
    } else {
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
  };
  window.addEventListener('load', () => setTimeout(tick, 150));
}

// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
if (cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  const animRing = () => {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  };
  animRing();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('big'); ring.classList.remove('big'); });
  });
}

// WORK ITEM HOVER IMAGE FOLLOW CURSOR
document.querySelectorAll('.work-item').forEach(item => {
  const img = item.querySelector('.work-hover-img');
  if (!img) return;
  item.addEventListener('mousemove', e => {
    img.style.left = (e.clientX + 20) + 'px';
    img.style.top = (e.clientY - 80) + 'px';
  });
});

// NAV SCROLL
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// SCROLL REVEAL
const reveals = document.querySelectorAll('.section-label, .about-heading, .about-star, .about-body, .about-skills, .about-aside, .work-item, .contact-heading, .contact-email, .contact-links, .contact-footer, .project-hero, .overview-grid, .highlight-card, .tech-list, .resume-section');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal') || [])];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => observer.observe(el));

// ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));
