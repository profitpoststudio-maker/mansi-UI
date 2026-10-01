
// MEDLENS - ANALYSIS PAGE PLACEHOLDER (/analysis - ON HOLD)


import { createBrandLogoHtml } from './navbar.js';

export function renderAnalysisPlaceholderPage(containerEl) {
  containerEl.innerHTML = `
    <div style="min-height:100vh; background:var(--color-bg); display:flex; flex-direction:column; padding-bottom:80px;">
      
      <!-- Top Navigation Bar -->
      <header class="dashboard-topbar">
        ${createBrandLogoHtml()}
        <h4 style="font-size:1.1rem; color:var(--color-dark-green);">Medical Analysis</h4>
      </header>

      <main class="container" style="padding-top:3rem; max-width:650px; text-align:center;">
        <div style="background:var(--color-white); border-radius:var(--radius-xl); border:1px solid var(--color-border); padding:3.5rem 2rem; box-shadow:var(--shadow-xl);">
          
          <div style="width:72px; height:72px; border-radius:50%; background:var(--color-mint-bg); color:var(--color-emerald); display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem;">
            <i data-lucide="cpu" style="width:36px;height:36px;"></i>
          </div>

          <div class="badge badge-mint" style="margin-bottom:1rem;">Feature Status • ON HOLD</div>
          <h2 style="font-size:1.85rem; color:var(--color-dark-green); margin-bottom:0.75rem;">AI Medical Analysis Engine</h2>
          <p style="font-size:0.98rem; color:var(--color-text-secondary); line-height:1.6; margin-bottom:2rem;">
            The detailed medical interpretation engine is currently kept on hold pending final clinical evaluation guidelines. You can upload and organize all your reports in your <strong>Report Locker</strong>.
          </p>

          <div style="display:flex; justify-content:center; gap:1rem;">
            <button class="btn btn-secondary" onclick="window.MedLensApp.navigateTo('reports')">View Report Locker</button>
            <button class="btn btn-primary" onclick="window.MedLensApp.navigateTo('home')">Return to Home</button>
          </div>

        </div>
      </main>

      <!-- Bottom Mobile Navigation Bar -->
      <nav class="mobile-bottom-nav">
        <div class="bottom-nav-item" onclick="window.MedLensApp.navigateTo('home')">
          <i data-lucide="home" style="width:20px;height:20px;"></i>
          <span>Home</span>
        </div>
        <div class="bottom-nav-item" onclick="window.MedLensApp.navigateTo('reports')">
          <i data-lucide="folder" style="width:20px;height:20px;"></i>
          <span>Reports</span>
        </div>
        <div class="bottom-nav-item" onclick="window.MedLensApp.navigateTo('history')">
          <i data-lucide="clock" style="width:20px;height:20px;"></i>
          <span>History</span>
        </div>
        <div class="bottom-nav-item" onclick="window.MedLensApp.navigateTo('profile')">
          <i data-lucide="user" style="width:20px;height:20px;"></i>
          <span>Profile</span>
        </div>
      </nav>

    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}
