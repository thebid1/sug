/* ===================================================================
   CAREER LAUNCHPAD 2026 — shared behaviour
   Loaded by every page. Each block checks the element exists before
   wiring it up, so this one file is safe to include everywhere.
   =================================================================== */

const CONFIG = {
  EVENT_DATE_ISO: "2026-09-12T09:00:00+01:00",
  ORGANISER_EMAIL: "tasiuaminu882@gmail.com",
  ORGANISER_WHATSAPP: "2349035598053",
  GOOGLE_FORM_URL: "https://forms.gle/maYBADxgQ5cT174L6"
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
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
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
    if (countdownTimer) clearInterval(countdownTimer);
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

/* Only tick on pages that actually show a countdown. */
let countdownTimer = null;
if (document.getElementById('cd-days')) {
  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
}

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
  resetSponsorModal();
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
const sponsorSuccess = document.getElementById('sponsorSuccess');
const sponsorIntro = document.getElementById('sponsorIntro');

/* Reset the modal back to the form view. */
function resetSponsorModal() {
  if (!sponsorForm || !sponsorSuccess) return;
  sponsorForm.hidden = false;
  sponsorSuccess.hidden = true;
  if (sponsorIntro) sponsorIntro.hidden = false;
}

if (sponsorForm) {
  const submitBtn = sponsorForm.querySelector('.submit-btn');
  const submitLabel = submitBtn ? submitBtn.textContent : '';

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

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    fetch(sponsorForm.action, {
      method: 'POST',
      body: new FormData(sponsorForm),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (!response.ok) throw new Error('Formspree returned ' + response.status);

      /* The Formspree POST is the record of the enquiry. WhatsApp is an
         optional fast-track, offered as a link the sponsor taps themselves —
         calling window.open() here would depend on the browser's transient
         user activation still being alive, which it is not on a slow
         connection. */
      const whatsappLink = document.getElementById('sponsorWhatsapp');
      if (whatsappLink) {
        const whatsappMsg = encodeURIComponent(
          `New Sponsorship Inquiry for Career Launchpad 2026\n\n` +
          `Organisation: ${orgName}\n` +
          `Contact: ${contactName}\n` +
          `Phone: ${sponsorPhone}\n` +
          `Email: ${sponsorEmail}\n` +
          `Interest: ${tier}\n` +
          `Message: ${msg || '(none)'}`
        );
        whatsappLink.href = `https://wa.me/${CONFIG.ORGANISER_WHATSAPP}?text=${whatsappMsg}`;
      }

      if (sponsorSuccess) {
        sponsorForm.hidden = true;
        sponsorSuccess.hidden = false;
        if (sponsorIntro) sponsorIntro.hidden = true;
      } else {
        showToast('Sponsorship request sent. We will be in touch.', 4500);
        closeSponsorModal();
      }
      sponsorForm.reset();
    }).catch(() => {
      showToast('Could not send your request. Please check your connection and try again.', 4500);
    }).finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    });
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