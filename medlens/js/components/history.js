
// MEDLENS - ANALYSIS HISTORY COMPONENT (/history)


import { createBrandLogoHtml } from './navbar.js';

export function renderHistoryPage(containerEl) {
  const historyList = window.MedLensApp.getAnalysisHistory() || [];

  containerEl.innerHTML = `
    <div style="min-height:100vh; background:var(--color-bg); display:flex; flex-direction:column; padding-bottom:80px;">
      
      <!-- Top Navigation Bar -->
      <header class="dashboard-topbar">
        ${createBrandLogoHtml()}
        <h4 style="font-size:1.1rem; color:var(--color-dark-green);">Analysis History</h4>
      </header>

      <main class="container" style="padding-top:1.5rem; max-width:900px;">
        <div style="margin-bottom:1.25rem;">
          <h2 style="font-size:1.6rem; color:var(--color-dark-green);">Analysis History</h2>
          <p style="font-size:0.88rem; color:var(--color-text-secondary);">Historical medical interpretation records and status</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${historyList.map(item => `
            <div style="background:var(--color-white); border-radius:var(--radius-lg); border:1px solid var(--color-border); padding:1.35rem; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:0.75rem;" class="animate-fade-in">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <h4 style="font-size:1.1rem; color:var(--color-dark-green); margin-bottom:0.2rem;">${item.title}</h4>
                  <div style="font-size:0.82rem; font-weight:600; color:var(--color-emerald);">${item.date}</div>
                </div>
                <span class="badge badge-mint">Status: ${item.status}</span>
              </div>
              
              <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5;">"${item.summary}"</p>

              <div style="border-top:1px solid var(--color-border); padding-top:0.75rem; display:flex; justify-content:flex-end;">
                <button class="btn btn-secondary btn-sm history-view-btn" data-title="${item.title}">
                  <i data-lucide="eye" style="width:14px;height:14px;"></i> View Analysis
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </main>

      <!-- Bottom Mobile Navigation Bar -->
      <nav class="mobile-bottom-nav">
        <div class="bottom-nav-item" onclick="window.MedLensApp.navigateTo('dashboard')">
          <i data-lucide="home" style="width:20px;height:20px;"></i>
          <span>Dashboard</span>
        </div>
        <div class="bottom-nav-item" onclick="window.MedLensApp.navigateTo('reports')">
          <i data-lucide="folder" style="width:20px;height:20px;"></i>
          <span>Reports</span>
        </div>
        <div class="bottom-nav-item active" onclick="window.MedLensApp.navigateTo('history')">
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

  // View Analysis Button (Opens ON HOLD modal per product specification)
  containerEl.querySelectorAll('.history-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.MedLensApp.openModal('analysis-on-hold');
    });
  });
}
