
// MEDLENS - REPORT LOCKER COMPONENT (/reports)


import { createBrandLogoHtml } from './navbar.js';

export function renderReportsPage(containerEl) {
  let reportsList = window.MedLensApp.getReportsList() || [];
  let searchQuery = '';

  function renderLockerView() {
    const filteredReports = reportsList.filter(rep => 
      rep.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rep.reportType && rep.reportType.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    containerEl.innerHTML = `
      <div style="min-height:100vh; background:var(--color-bg); display:flex; flex-direction:column; padding-bottom:80px;">
        
        <!-- Top Navigation Bar -->
        <header class="dashboard-topbar">
          ${createBrandLogoHtml()}
          <h4 style="font-size:1.1rem; color:var(--color-dark-green);">My Report Locker</h4>
        </header>

        <main class="container" style="padding-top:1.5rem; max-width:900px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; flex-wrap:wrap; gap:0.75rem;">
            <div>
              <h2 style="font-size:1.6rem; color:var(--color-dark-green);">Report Locker</h2>
              <p style="font-size:0.88rem; color:var(--color-text-secondary);">${reportsList.length} Secure Medical Documents Stored</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="window.MedLensApp.navigateTo('dashboard')">
              <i data-lucide="plus" style="width:16px;height:16px;"></i>
              Upload New
            </button>
          </div>

          <!-- Search & Filter Bar -->
          <div style="margin-bottom:1.25rem;">
            <div class="input-wrapper">
              <input type="text" id="locker-search-input" class="form-input" placeholder="Search reports by name or type..." value="${searchQuery}" style="padding-left:2.5rem;">
              <i data-lucide="search" style="position:absolute; left:0.85rem; color:var(--color-text-secondary); width:18px; height:18px;"></i>
            </div>
          </div>

          ${filteredReports.length === 0 ? `
            <div style="background:var(--color-white); border-radius:var(--radius-xl); padding:3rem 1.5rem; text-align:center; border:1px solid var(--color-border); box-shadow:var(--shadow-sm);">
              <i data-lucide="folder-open" style="width:48px;height:48px;color:var(--color-text-secondary);margin-bottom:1rem;"></i>
              <h3 style="color:var(--color-dark-green); margin-bottom:0.4rem;">No Reports Found</h3>
              <p style="font-size:0.88rem; color:var(--color-text-secondary); margin-bottom:1.5rem;">Try a different search term or upload a new medical report.</p>
              <button class="btn btn-primary" onclick="window.MedLensApp.navigateTo('dashboard')">Upload Report Now</button>
            </div>
          ` : `
            <div style="display:flex; flex-direction:column; gap:1rem;">
              ${filteredReports.map(rep => `
                <div style="background:var(--color-white); border-radius:var(--radius-lg); border:1px solid var(--color-border); padding:1.25rem; display:flex; flex-direction:column; gap:1rem; box-shadow:var(--shadow-sm); transition:transform var(--transition-fast);" class="animate-fade-in">
                  
                  <div style="display:flex; align-items:flex-start; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:0.85rem;">
                      <div class="report-icon-box" style="width:46px; height:46px; background:var(--color-mint-bg);">
                        <i data-lucide="file-text" style="width:24px;height:24px;color:var(--color-emerald);"></i>
                      </div>
                      <div>
                        <h4 style="font-size:1.05rem; color:var(--color-dark-green); margin-bottom:0.15rem;">${rep.fileName}</h4>
                        <span style="font-size:0.8rem; color:var(--color-text-secondary);">${rep.reportType || 'Medical Report'} • ${rep.fileSize || '2.1 MB'}</span>
                      </div>
                    </div>
                    <span class="badge ${rep.badgeClass || 'badge-normal'}">✓ ${rep.status}</span>
                  </div>

                  <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--color-border); padding-top:0.85rem; font-size:0.82rem; color:var(--color-text-secondary); flex-wrap:wrap; gap:0.5rem;">
                    <span>Uploaded on ${rep.uploadDate}</span>
                    
                    <div style="display:flex; gap:0.5rem;">
                      <button class="btn btn-secondary btn-sm locker-view-btn" data-repid="${rep.id}">
                        <i data-lucide="eye" style="width:14px;height:14px;"></i> View
                      </button>
                      <button class="btn btn-secondary btn-sm locker-share-btn" data-repid="${rep.id}">
                        <i data-lucide="share-2" style="width:14px;height:14px;"></i> Share
                      </button>
                      <button class="btn btn-secondary btn-sm locker-delete-btn" data-repid="${rep.id}" style="color:#BE123C; border-color:#FECDD3;">
                        <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
                      </button>
                    </div>
                  </div>

                </div>
              `).join('')}
            </div>
          `}
        </main>

        <!-- Bottom Mobile Navigation Bar -->
        <nav class="mobile-bottom-nav">
          <div class="bottom-nav-item" onclick="window.MedLensApp.navigateTo('dashboard')">
            <i data-lucide="home" style="width:20px;height:20px;"></i>
            <span>Dashboard</span>
          </div>
          <div class="bottom-nav-item active" onclick="window.MedLensApp.navigateTo('reports')">
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

    // Search Input Listener
    const searchInput = containerEl.querySelector('#locker-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderLockerView();
      });
    }

    // Button Action Handlers
    containerEl.querySelectorAll('.locker-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const repId = e.currentTarget.getAttribute('data-repid');
        const rep = reportsList.find(r => r.id === repId);
        window.MedLensApp.openModal('report-view-file', rep);
      });
    });

    containerEl.querySelectorAll('.locker-share-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const repId = e.currentTarget.getAttribute('data-repid');
        const rep = reportsList.find(r => r.id === repId);
        window.MedLensApp.openModal('share-report', rep);
      });
    });

    containerEl.querySelectorAll('.locker-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const repId = e.currentTarget.getAttribute('data-repid');
        window.MedLensApp.deleteReportFile(repId);
        reportsList = window.MedLensApp.getReportsList() || [];
        window.MedLensApp.showToast('Report removed from Locker.');
        renderLockerView();
      });
    });
  }

  renderLockerView();
}
