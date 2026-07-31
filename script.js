/* ===================================================================
   CAREER LAUNCHPAD 2026 — shared behaviour
   Loaded by every page. Each block checks the element exists before
   wiring it up, so this one file is safe to include everywhere.
   =================================================================== */

const CONFIG = {
  EVENT_DATE_ISO: "2026-09-12T09:00:00+01:00",
  ORGANISER_EMAIL: "tasiuaminu882@gmail.com",
  ORGANISER_WHATSAPP: "2349035598053",
  GOOGLE_FORM_URL: "https://docs.google.com/forms/d/e/REPLACE_WITH_YOUR_FORM_ID/viewform"
};

/* ===================================================================
   SCROLL REVEAL
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* Staggered reveal for groups */
  const revealGroupEls = document.querySelectorAll('.reveal-group');
  const ioGroup = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        ioGroup.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealGroupEls.forEach(el => ioGroup.observe(el));
});

/* ===================================================================
   NAVBAR SCROLL EFFECT
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.site');
  if (!header) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
});

/* ===================================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

/* ===================================================================
   BUTTON RIPPLE EFFECT (mouse position)
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--x', x + '%');
      btn.style.setProperty('--y', y + '%');
    });
  });
});

/* ===================================================================
   PARALLAX EFFECT FOR HERO IMAGES
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const heroImages = document.querySelectorAll('.hero-image-wrap .img-frame img');
  if (heroImages.length === 0) return;
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        heroImages.forEach(img => {
          const speed = 0.15;
          img.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
});

/* ===================================================================
   COUNTDOWN
   =================================================================== */
function updateCountdown() {
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs')
  };
  if (!els.d) return;

  const target = new Date(CONFIG.EVENT_DATE_ISO).getTime();
  const diff = target - Date.now();

  if (diff <= 0) {
    els.d.textContent = els.h.textContent = els.m.textContent = els.s.textContent = '00';
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  els.d.textContent = String(days).padStart(2, '0');
  els.h.textContent = String(hours).padStart(2, '0');
  els.m.textContent = String(mins).padStart(2, '0');
  els.s.textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ===================================================================
   TOAST
   =================================================================== */
function showToast(msg, ms = 3600) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

/* ===================================================================
   SPONSOR MODAL + FORM
   =================================================================== */
const sponsorOverlay = document.getElementById('sponsorOverlay');
const sponsorTierSelect = document.getElementById('sponsorTier');

if (sponsorTierSelect) {
  const TIERS = [
    "Ignition — Venue & Setup — ₦100,000",
    "Signal — Branding, Publicity & Media — ₦260,000",
    "Payload — Participant Materials — ₦750,000",
    "Fuel — Refreshments — ₦1,250,000",
    "Ground Crew — Security & Operations — ₦300,000",
    "Reserve Tank — Contingency — ₦200,000",
    "Full Mission Partner — ₦2,860,000",
    "Not sure yet — let's talk"
  ];
  TIERS.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t;
    sponsorTierSelect.appendChild(opt);
  });
}

function openSponsorModal(preselect) {
  if (!sponsorOverlay) {
    window.location.href = 'sponsors.html' + (preselect ? '#sponsors' : '');
    return;
  }
  if (preselect && sponsorTierSelect) {
    const match = Array.from(sponsorTierSelect.options).find(o => o.value.includes(preselect));
    if (match) sponsorTierSelect.value = match.value;
    const modalSub = document.getElementById('modalSub');
    if (modalSub) modalSub.textContent = 'You selected: ' + preselect + '. Confirm your details and we\'ll follow up directly.';
  }
  sponsorOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSponsorModal() {
  if (!sponsorOverlay) return;
  sponsorOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (sponsorOverlay) {
  sponsorOverlay.addEventListener('click', (e) => {
    if (e.target === sponsorOverlay) closeSponsorModal();
  });
}

const sponsorForm = document.getElementById('sponsorForm');
if (sponsorForm) {
  sponsorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const orgName = document.getElementById('orgName').value.trim();
    const contactName = document.getElementById('contactName').value.trim();
    const sponsorPhone = document.getElementById('sponsorPhone').value.trim();
    const sponsorEmail = document.getElementById('sponsorEmail').value.trim();
    const tier = sponsorTierSelect ? sponsorTierSelect.value : '';
    const msg = document.getElementById('sponsorMsg').value.trim();

    if (!orgName || !contactName || !sponsorPhone || !sponsorEmail) {
      showToast('Please fill in all required fields.');
      return;
    }

    const subject = encodeURIComponent('Career Launchpad 2026 Sponsorship — ' + orgName);
    const body = encodeURIComponent(
      `Organisation: ${orgName}\nContact person: ${contactName}\nPhone: ${sponsorPhone}\nEmail: ${sponsorEmail}\nInterested in: ${tier}\n\nMessage:\n${msg || '(none)'}`
    );
    window.location.href = `mailto:${CONFIG.ORGANISER_EMAIL}?subject=${subject}&body=${body}`;

    showToast('Opening your email client to send the request…', 4500);
    closeSponsorModal();
    e.target.reset();
  });
}

/* ===================================================================
   NAV MOBILE: close menu on link click
   =================================================================== */
document.querySelectorAll('nav.links a').forEach(link => {
  link.addEventListener('click', () => {
    const toggle = document.getElementById('navToggle');
    if (toggle) toggle.checked = false;
  });
});