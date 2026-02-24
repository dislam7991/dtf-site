/* shared.js — injects nav and footer, handles active state, fade-up observer */

const NAV_HTML = `
<nav>
  <a href="index.html" class="nav-logo">
    <img class="nav-logo-mark" src="DTF-logo-mono.png" alt="DTF Logo">
    <span class="nav-logo-text">Dynamic Technical Formulations</span>
  </a>
  <ul class="nav-center">
    <li><a href="index.html" data-page="index">Home</a></li>
    <li><a href="services.html" data-page="services">Services</a></li>
    <li><a href="about.html" data-page="about">About</a></li>
    <li><a href="blog.html" data-page="blog">Insights</a></li>
  </ul>
  <div class="nav-right">
    <button class="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <a href="contact.html" class="btn-nav-contact">Contact Us</a>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="dtf-full">Dynamic Technical Formulations</div>
      <div class="footer-tagline">From Formulation to Innovation</div>
    </div>
    <nav class="footer-nav">
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="about.html">About</a>
      <a href="blog.html">Insights</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="footer-logo-wrap">
      <img class="footer-dtf-svg" src="DTF-logo-mono.png" alt="DTF Logo">
      <div class="footer-copy">© ${new Date().getFullYear()} Dynamic Technical Formulations</div>
    </div>
  </div>
  <img class="footer-watermark" src="DTF-logo-mono.png" alt="">
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navEl = document.createElement('div');
  navEl.innerHTML = NAV_HTML;
  document.body.prepend(navEl.firstElementChild);

  // Inject footer
  const footerEl = document.createElement('div');
  footerEl.innerHTML = FOOTER_HTML;
  document.body.appendChild(footerEl.firstElementChild);

  // Set active nav link
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-center a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  // Hamburger menu toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu = document.querySelector('.nav-center');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // Fade-up observer
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Netlify AJAX form submission
  document.querySelectorAll('form[data-netlify]').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      })
      .then(res => {
        if (res.ok) {
          if (btn) btn.textContent = '✓ Sent!';
          form.reset();
          setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 4000);
        } else {
          if (btn) btn.textContent = 'Error — please try again';
          setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 4000);
        }
      })
      .catch(() => {
        if (btn) btn.textContent = 'Error — please try again';
        setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 4000);
      });
    });
  });
});
