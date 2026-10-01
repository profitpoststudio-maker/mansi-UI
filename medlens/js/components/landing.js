
// MEDLENS - LANDING PAGE COMPONENT (PAGE 1)


import { renderNavbar } from './navbar.js';
import { DEMO_REPORTS, MEDICAL_EXPLANATIONS } from '../data/mockData.js';

export function renderLandingPage(containerEl) {
  let activeTab = 'CBC';

  containerEl.innerHTML = `
    <!-- Permanently Accessible Fixed Navbar Slot -->
    <div id="navbar-slot"></div>

    <div class="landing-content-wrapper">
      <!-- HERO SECTION (TWO-COLUMN SAAS LAYOUT WITH FLOATING ANIMATIONS) -->
      <section class="hero-section" id="hero">
        <!-- Background Animated Mint Blobs & Shapes -->
        <div class="hero-bg-blobs" aria-hidden="true">
          <div class="mint-blob blob-1"></div>
          <div class="mint-blob blob-2"></div>
          <div class="mint-blob blob-3"></div>
          <div class="floating-circle-shape circle-shape-1"></div>
          <div class="floating-circle-shape circle-shape-2"></div>
          <div class="floating-circle-shape circle-shape-3"></div>
        </div>

        <div class="container">
          <div class="hero-grid">
            <!-- LEFT COLUMN -->
            <div class="hero-content">
              <div class="badge badge-mint hero-badge">
                <i data-lucide="sparkles" style="width:14px;height:14px;color:var(--color-emerald);"></i>
                AI-Powered • Secure • Trusted
              </div>
              <h1 class="hero-title">
                Understand Your Medical Reports.<br>
                <span class="text-emerald">Track Your Health Journey.</span>
              </h1>
              <p class="hero-description">
                MedLens intelligently interprets medical reports and organizes your health information into a simple, easy-to-understand timeline.
              </p>
              <div class="hero-ctas">
                <button class="btn btn-primary btn-lg" id="hero-getstarted-btn">Get Started</button>
                <button class="btn btn-secondary btn-lg" id="hero-signin-btn">Sign In</button>
              </div>
              <div class="hero-trust-indicators">
                <div class="trust-item">
                  <i data-lucide="check-circle-2" class="trust-icon" style="width:18px;height:18px;"></i>
                  <span>Smart Insights</span>
                </div>
                <div class="trust-item">
                  <i data-lucide="shield-check" class="trust-icon icon-shield-glowing" style="width:18px;height:18px;"></i>
                  <span>Easy to Use</span>
                </div>
                <div class="trust-item">
                  <i data-lucide="lock" class="trust-icon" style="width:18px;height:18px;"></i>
                  <span>100% Secure</span>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: REALISTIC DASHBOARD PREVIEW CARD WITH SUBTLE FLOATING BADGES -->
            <div class="hero-visual">
              <div class="floating-badge floating-badge-top">
                <i data-lucide="file-text" class="icon-file-floating" style="color:var(--color-emerald);width:16px;height:16px;"></i>
                <span>Medical Report • Blood Panel</span>
              </div>

              <div class="floating-badge floating-badge-1">
                <i data-lucide="check-circle" style="color:var(--color-emerald);width:16px;height:16px;"></i>
                <span>Report Analyzed ✓</span>
              </div>

              <div class="floating-badge floating-badge-midleft">
                <i data-lucide="heart-pulse" class="icon-heart-pulsing" style="color:#F59E0B;width:16px;height:16px;"></i>
                <span>Glucose: 108 mg/dL • Review</span>
              </div>
              
              <div class="floating-badge floating-badge-2">
                <i data-lucide="line-chart" style="color:var(--color-emerald);width:16px;height:16px;"></i>
                <span>Health Timeline Updated</span>
              </div>

              <div class="floating-badge floating-badge-3">
                <i data-lucide="activity" class="icon-heart-pulsing" style="color:var(--color-emerald);width:16px;height:16px;"></i>
                <span>5 Parameters Normal</span>
              </div>

              <div class="preview-card">
                <div class="preview-header">
                  <div class="preview-title-group">
                    <h4>Medical Report</h4>
                    <p>Blood Test • 28 Aug 2026</p>
                  </div>
                  <span class="badge badge-normal">Analyzed ✓</span>
                </div>

                <div class="preview-parameters">
                  <div class="param-item">
                    <div class="param-row">
                      <span class="param-name">Hemoglobin</span>
                      <span class="param-val">13.2 g/dL</span>
                      <span class="badge badge-normal">Normal</span>
                    </div>
                    <div class="param-bar-bg">
                      <div class="param-bar-fill fill-emerald" style="width: 70%;"></div>
                    </div>
                  </div>

                  <div class="param-item">
                    <div class="param-row">
                      <span class="param-name">Glucose</span>
                      <span class="param-val">108 mg/dL</span>
                      <span class="badge badge-review">Review</span>
                    </div>
                    <div class="param-bar-bg">
                      <div class="param-bar-fill fill-amber" style="width: 82%;"></div>
                    </div>
                  </div>

                  <div class="param-item">
                    <div class="param-row">
                      <span class="param-name">Vitamin D</span>
                      <span class="param-val">21 ng/mL</span>
                      <span class="badge badge-review">Review</span>
                    </div>
                    <div class="param-bar-bg">
                      <div class="param-bar-fill fill-amber" style="width: 45%;"></div>
                    </div>
                  </div>
                </div>

                <div class="preview-footer-link" id="hero-preview-view-btn">
                  <span>View Full Report</span>
                  <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FEATURES SECTION (2x2 CARD GRID WITH VISUAL DEPTH) -->
      <section class="section features-section" id="features">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Healthcare Information, Made Simple</h2>
            <p class="section-subtitle">Everything you need to understand your medical tests and monitor health changes over time.</p>
          </div>

          <div class="features-grid">
            <div class="feature-card" data-feature="interpretation">
              <div class="feature-icon-wrapper">
                <i data-lucide="brain" style="width:26px;height:26px;"></i>
              </div>
              <h3>Intelligent Report Interpretation</h3>
              <p>Transform complex medical reports into simple, understandable insights without confusing medical jargon.</p>
              <span class="feature-link">Learn More <i data-lucide="arrow-right" style="width:14px;height:14px;"></i></span>
            </div>

            <div class="feature-card" data-feature="timeline">
              <div class="feature-icon-wrapper">
                <i data-lucide="calendar" style="width:26px;height:26px;"></i>
              </div>
              <h3>Health Timeline</h3>
              <p>Organize medical reports and health events chronologically to see your entire medical history in one secure timeline.</p>
              <span class="feature-link">Learn More <i data-lucide="arrow-right" style="width:14px;height:14px;"></i></span>
            </div>

            <div class="feature-card" data-feature="trends">
              <div class="feature-icon-wrapper">
                <i data-lucide="trending-up" style="width:26px;height:26px;"></i>
              </div>
              <h3>Health Trends</h3>
              <p>Track important health parameters and understand changes and fluctuations over time with visual chart graphs.</p>
              <span class="feature-link">Learn More <i data-lucide="arrow-right" style="width:14px;height:14px;"></i></span>
            </div>

            <div class="feature-card" data-feature="insights">
              <div class="feature-icon-wrapper">
                <i data-lucide="sparkles" style="width:26px;height:26px;"></i>
              </div>
              <h3>Smart Insights</h3>
              <p>Highlight important changes, flagged parameters, and health patterns across your consecutive medical reports.</p>
              <span class="feature-link">Learn More <i data-lucide="arrow-right" style="width:14px;height:14px;"></i></span>
            </div>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS SECTION (5 CONNECTED STEP CARDS) -->
      <section class="section" id="how-it-works" style="background:var(--color-white); border-bottom:1px solid var(--color-border);">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">How MedLens Works</h2>
            <p class="section-subtitle">A simple 5-step process to turn complicated medical reports into clear health guidance.</p>
          </div>

          <div class="how-it-works-steps">
            <div class="how-it-works-line"></div>
            
            <div class="step-card">
              <div class="step-number">01</div>
              <h4>Upload Report</h4>
              <p>Upload digital lab PDF or scanned image</p>
            </div>

            <div class="step-card">
              <div class="step-number">02</div>
              <h4>Extract Information</h4>
              <p>OCR engine extracts medical test parameters</p>
            </div>

            <div class="step-card">
              <div class="step-number">03</div>
              <h4>Analyze Data</h4>
              <p>Values evaluated against standard ranges</p>
            </div>

            <div class="step-card">
              <div class="step-number">04</div>
              <h4>Generate Insights</h4>
              <p>Simple plain-language summary created</p>
            </div>

            <div class="step-card">
              <div class="step-number">05</div>
              <h4>Track Timeline</h4>
              <p>Health history automatically updated</p>
            </div>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE DEMO SECTION -->
      <section class="section" id="interactive-demo" style="background:var(--color-pale-green);">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">See How MedLens Simplifies Your Reports</h2>
            <p class="section-subtitle">Click the tabs below to explore sample reports and test our simple explanation engine.</p>
          </div>

          <div class="demo-box">
            <div class="demo-tabs">
              <button class="demo-tab-btn active" data-tab="CBC">CBC</button>
              <button class="demo-tab-btn" data-tab="Blood Sugar">Blood Sugar</button>
              <button class="demo-tab-btn" data-tab="Liver">Liver</button>
              <button class="demo-tab-btn" data-tab="Kidney">Kidney</button>
            </div>

            <div id="demo-tab-content">
              <!-- Dynamic Tab Content Rendered Here -->
            </div>

            <div class="demo-disclaimer">
              <i data-lucide="shield-alert" style="width:18px;height:18px;flex-shrink:0;"></i>
              <span><strong>Medical Disclaimer:</strong> MedLens provides informational insights and does not replace professional medical advice. Always consult a physician for clinical evaluation.</span>
            </div>
          </div>
        </div>
      </section>

      <!-- FUTURE CAPABILITIES GRID -->
      <section class="section" style="background:var(--color-white);">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Comprehensive Health Capabilities</h2>
            <p class="section-subtitle">Built with a future-ready architectural foundation for complete health monitoring.</p>
          </div>

          <div class="capabilities-grid">
            <div class="capability-card">
              <div class="capability-icon"><i data-lucide="cpu"></i></div>
              <div>
                <h5>AI Report Interpretation</h5>
                <p>Translates complex lab terms into clear insights.</p>
              </div>
            </div>

            <div class="capability-card">
              <div class="capability-icon"><i data-lucide="clock"></i></div>
              <div>
                <h5>Health Timeline</h5>
                <p>Organizes all reports chronologically.</p>
              </div>
            </div>

            <div class="capability-card">
              <div class="capability-icon"><i data-lucide="git-compare"></i></div>
              <div>
                <h5>Report Comparison</h5>
                <p>Compares changes between two consecutive tests.</p>
              </div>
            </div>

            <div class="capability-card">
              <div class="capability-icon"><i data-lucide="activity"></i></div>
              <div>
                <h5>Health Trend Detection</h5>
                <p>Tracks historical parameter increases & drops.</p>
              </div>
            </div>

            <div class="capability-card">
              <div class="capability-icon"><i data-lucide="book-open"></i></div>
              <div>
                <h5>Medical Term Dictionary</h5>
                <p>Instant plain-language term definitions.</p>
              </div>
            </div>

            <div class="capability-card">
              <div class="capability-icon"><i data-lucide="bell"></i></div>
              <div>
                <h5>Smart Change Alerts</h5>
                <p>Notifications when values require review.</p>
              </div>
            </div>

            <div class="capability-card">
              <div class="capability-icon"><i data-lucide="scan"></i></div>
              <div>
                <h5>OCR for Scanned Reports</h5>
                <p>Parses paper reports and handwritten notes.</p>
              </div>
            </div>

            <div class="capability-card">
              <div class="capability-icon"><i data-lucide="download"></i></div>
              <div>
                <h5>Health Summary Export</h5>
                <p>Download consolidated medical PDFs for doctors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA BANNER SECTION -->
      <section class="section" style="padding-top:2rem; background:var(--color-soft-green-tint);">
        <div class="container">
          <div class="cta-banner">
            <h2>Start Understanding Your Health Better</h2>
            <p>Turn complicated medical information into a clearer health journey today.</p>
            <button class="btn btn-primary btn-lg" id="cta-getstarted-btn" style="background:var(--color-emerald);">
              Get Started Now →
            </button>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="container">
          <div class="footer-container">
            <div class="footer-brand">
              <div class="brand-logo">
                <div class="logo-icon"><i data-lucide="activity"></i></div>
                <span class="logo-text"><span class="med">Med</span><span class="lens">Lens</span></span>
              </div>
              <p>Understand your medical reports.<br>Track your health journey.</p>
            </div>
            
            <div class="footer-col">
              <h5>Company</h5>
              <ul class="footer-links">
                <li><a class="drawer-link" data-scroll="hero">About Us</a></li>
                <li><a class="drawer-link" data-scroll="features">Features</a></li>
                <li><a class="drawer-link" data-scroll="how-it-works">How It Works</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h5>Legal</h5>
              <ul class="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Medical Disclaimer</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h5>Support</h5>
              <ul class="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <span>© 2026 MedLens. All rights reserved.</span>
            <span>Intelligent Medical Interpretation Engine</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Mount Fixed Navbar into Slot
  const navbarSlot = containerEl.querySelector('#navbar-slot');
  if (navbarSlot) {
    renderNavbar(navbarSlot);
  }

  // Render Interactive Demo Tab Content Function
  function renderDemoTab(tabKey) {
    const reportData = DEMO_REPORTS[tabKey] || DEMO_REPORTS['CBC'];
    const contentEl = containerEl.querySelector('#demo-tab-content');
    if (!contentEl) return;

    let rowsHtml = reportData.parameters.map(param => `
      <tr>
        <td><strong>${param.name}</strong></td>
        <td><strong style="color:var(--color-dark-green);">${param.value}</strong></td>
        <td>
          <span class="badge ${param.status === 'Normal' ? 'badge-normal' : 'badge-review'}">
            ${param.status}
          </span>
        </td>
        <td style="color:var(--color-text-secondary);">${param.range}</td>
        <td>
          ${param.code ? `
            <button class="explain-btn" data-explain="${param.code}">
              <i data-lucide="help-circle" style="width:14px;height:14px;"></i>
              View Explanation
            </button>
          ` : ''}
        </td>
      </tr>
    `).join('');

    contentEl.innerHTML = `
      <div class="demo-content-grid animate-fade-in">
        <div class="demo-table-wrapper">
          <table class="demo-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
                <th>Status</th>
                <th>Reference Range</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>

        <div class="demo-ai-card">
          <h4>
            <i data-lucide="sparkles"></i>
            MedLens AI Summary
          </h4>
          <ul class="demo-ai-summary-list">
            <li><i data-lucide="check" style="color:var(--color-light-mint);"></i> ${reportData.aiSummary.totalAnalyzed} Parameters Analyzed</li>
            <li><i data-lucide="check" style="color:var(--color-light-mint);"></i> ${reportData.aiSummary.normalCount} Normal Parameters</li>
            ${reportData.aiSummary.reviewCount > 0 ? `
              <li><i data-lucide="alert-circle" style="color:#FDE68A;"></i> ${reportData.aiSummary.reviewCount} Need Review</li>
            ` : ''}
          </ul>
          <p style="font-size:0.88rem; color:var(--color-light-mint); line-height:1.5;">
            "${reportData.aiSummary.note}"
          </p>
        </div>
      </div>
    `;

    // Attach "View Explanation" button handlers
    contentEl.querySelectorAll('[data-explain]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.getAttribute('data-explain');
        const detail = MEDICAL_EXPLANATIONS[code];
        if (detail && window.MedLensApp) {
          window.MedLensApp.openModal('parameter-explanation', detail);
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Initial Demo Tab Render
  renderDemoTab(activeTab);

  // Demo Tab Switching Listener
  const tabBtns = containerEl.querySelectorAll('.demo-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeTab = e.currentTarget.getAttribute('data-tab');
      renderDemoTab(activeTab);
    });
  });

  // CTA & Hero Navigation Buttons -> Auth Page (NEVER directly to Dashboard)
  const goToAuth = () => window.MedLensApp.navigateTo('auth');

  const heroGetStarted = containerEl.querySelector('#hero-getstarted-btn');
  const heroSignIn = containerEl.querySelector('#hero-signin-btn');
  const ctaGetStarted = containerEl.querySelector('#cta-getstarted-btn');
  const previewViewBtn = containerEl.querySelector('#hero-preview-view-btn');

  if (heroGetStarted) heroGetStarted.addEventListener('click', goToAuth);
  if (heroSignIn) heroSignIn.addEventListener('click', goToAuth);
  if (ctaGetStarted) ctaGetStarted.addEventListener('click', goToAuth);
  if (previewViewBtn) previewViewBtn.addEventListener('click', () => {
    if (window.MedLensApp) {
      window.MedLensApp.openModal('report-details', DEMO_REPORTS['CBC']);
    }
  });

  // Feature cards click handlers ("Learn More →")
  const featureDescriptions = {
    interpretation: {
      title: 'Intelligent Report Interpretation',
      summary: 'MedLens parses complex PDF lab reports and images using medical NLP to translate raw numerical results into plain-language health explanations.'
    },
    timeline: {
      title: 'Health Timeline',
      summary: 'Automatically stores and structures all your lab reports chronologically, giving you and your physicians a complete historical health record.'
    },
    trends: {
      title: 'Health Parameter Trends',
      summary: 'Tracks key metrics over time (e.g. Glucose, Hemoglobin, Cholesterol) to identify subtle rising or falling trends before symptoms occur.'
    },
    insights: {
      title: 'Smart Insights & Alerts',
      summary: 'Detects out-of-range values and highlights changes between consecutive tests to keep you proactive about your wellness.'
    }
  };

  containerEl.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
      const featureKey = card.getAttribute('data-feature');
      const details = featureDescriptions[featureKey] || {
        title: 'MedLens Health Feature',
        summary: 'Designed for intelligent report processing and timeline tracking.'
      };
      if (window.MedLensApp) {
        window.MedLensApp.openModal('feature-detail', details);
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();
}
