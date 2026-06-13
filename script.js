// NexaCyber - script.js

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Sticky nav shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 2px 20px rgba(26,86,219,0.10)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// Animate elements on scroll (fade-in)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .stat, .hero__card, .feature').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Contact form handler
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sent!';
  btn.style.background = '#16a34a';
  btn.style.borderColor = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// Cart toast notifications
document.querySelectorAll('.btn--full').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const card = btn.closest('.product-card');
    const name = card ? card.querySelector('h3').textContent : 'Item';
    showToast(name + ' added to cart!');
  });
});

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #1a56db;
    color: #fff;
    padding: .85rem 1.5rem;
    border-radius: 10px;
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: .9rem;
    box-shadow: 0 8px 32px rgba(26,86,219,0.25);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
