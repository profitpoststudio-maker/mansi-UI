
// MEDLENS - NAVBAR COMPONENT (PERMANENTLY ACCESSIBLE)


export function createBrandLogoHtml() {
  return `
    <div class="brand-logo" onclick="window.MedLensApp.navigateTo('landing')">
      <div class="logo-icon">
        <i data-lucide="activity" style="width:20px;height:20px;"></i>
      </div>
      <span class="logo-text">
        <span class="med">Med</span><span class="lens">Lens</span>
      </span>
    </div>
  `;
}

export function renderNavbar(containerEl) {
  containerEl.innerHTML = `
    <nav class="navbar" id="main-navbar">
      <div class="container">
        <div class="navbar-container">
          ${createBrandLogoHtml()}
          
          <ul class="nav-links">
            <li><a class="nav-link active" data-scroll="hero">Home</a></li>
            <li><a class="nav-link" data-scroll="features">Features</a></li>
            <li><a class="nav-link" data-scroll="how-it-works">How It Works</a></li>
            <li><a class="nav-link" data-scroll="interactive-demo">Interactive Demo</a></li>
          </ul>

          <div class="nav-actions">
            <button class="btn btn-secondary btn-sm" id="nav-signin-btn">Sign In</button>
            <button class="btn btn-primary btn-sm" id="nav-getstarted-btn">Get Started</button>
          </div>

          <button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Toggle navigation">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation Drawer -->
    <div class="drawer-overlay" id="drawer-overlay"></div>
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="mobile-drawer-header">
        ${createBrandLogoHtml()}
        <button id="drawer-close-btn" style="color:var(--color-text-secondary); padding:0.4rem;" aria-label="Close menu">
          <i data-lucide="x"></i>
        </button>
      </div>
      <ul class="mobile-drawer-links">
        <li><a class="nav-link drawer-link active" data-scroll="hero">Home</a></li>
        <li><a class="nav-link drawer-link" data-scroll="features">Features</a></li>
        <li><a class="nav-link drawer-link" data-scroll="how-it-works">How It Works</a></li>
        <li><a class="nav-link drawer-link" data-scroll="interactive-demo">Interactive Demo</a></li>
      </ul>
      <div style="margin-top:auto; display:flex; flex-direction:column; gap:0.75rem;">
        <button class="btn btn-secondary btn-full" id="drawer-signin-btn">Sign In</button>
        <button class="btn btn-primary btn-full" id="drawer-getstarted-btn">Get Started</button>
      </div>
    </div>
  `;

  // Attach Auth Button Handlers (Go to /auth - NEVER straight to Dashboard)
  const navSignIn = containerEl.querySelector('#nav-signin-btn');
  const navGetStarted = containerEl.querySelector('#nav-getstarted-btn');
  const drawerSignIn = containerEl.querySelector('#drawer-signin-btn');
  const drawerGetStarted = containerEl.querySelector('#drawer-getstarted-btn');

  const goToAuth = () => {
    closeMobileDrawer();
    window.MedLensApp.navigateTo('auth');
  };

  if (navSignIn) navSignIn.addEventListener('click', goToAuth);
  if (navGetStarted) navGetStarted.addEventListener('click', goToAuth);
  if (drawerSignIn) drawerSignIn.addEventListener('click', goToAuth);
  if (drawerGetStarted) drawerGetStarted.addEventListener('click', goToAuth);

  // Mobile Menu Controls
  const mobileToggle = containerEl.querySelector('#mobile-toggle-btn');
  const drawerClose = containerEl.querySelector('#drawer-close-btn');
  const drawerOverlay = containerEl.querySelector('#drawer-overlay');
  const mobileDrawer = containerEl.querySelector('#mobile-drawer');

  function openMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('active');
  }

  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeMobileDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);

  // Smooth Scroll Target Function without Page Reload or Re-render
  function scrollToTarget(targetId) {
    closeMobileDrawer();

    if (window.MedLensApp.currentPage !== 'landing') {
      window.MedLensApp.navigateTo('landing');
      setTimeout(() => {
        performScroll(targetId);
      }, 150);
    } else {
      performScroll(targetId);
    }
  }

  function performScroll(targetId) {
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(targetId) || document.getElementById('demo');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Attach Section Scroll Listeners to All Nav Links
  containerEl.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('data-scroll');
      scrollToTarget(targetId);

      // Highlight active link immediately
      containerEl.querySelectorAll('[data-scroll]').forEach(l => l.classList.remove('active'));
      containerEl.querySelectorAll(`[data-scroll="${targetId}"]`).forEach(l => l.classList.add('active'));
    });
  });

  // Sticky/Fixed Navbar Elevation on Scroll
  const scrollElevationHandler = () => {
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      if (window.scrollY > 15) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  };
  window.removeEventListener('scroll', scrollElevationHandler);
  window.addEventListener('scroll', scrollElevationHandler);

  // Active Section Spy via IntersectionObserver
  const sectionsToObserve = ['hero', 'features', 'how-it-works', 'interactive-demo'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        containerEl.querySelectorAll('[data-scroll]').forEach(l => l.classList.remove('active'));
        containerEl.querySelectorAll(`[data-scroll="${id}"]`).forEach(l => l.classList.add('active'));
      }
    });
  }, {
    root: null,
    rootMargin: '-80px 0px -50% 0px',
    threshold: 0.15
  });

  setTimeout(() => {
    sectionsToObserve.forEach(secId => {
      const secEl = document.getElementById(secId) || document.getElementById('demo');
      if (secEl) observer.observe(secEl);
    });
  }, 300);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
