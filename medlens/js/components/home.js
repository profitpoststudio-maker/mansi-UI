
// MEDLENS - MAIN MOBILE-CENTRIC HOME PAGE (/home)


import { createBrandLogoHtml } from './navbar.js';

export function renderHomePage(containerEl) {
  const userProfile = window.MedLensApp.getUserDetails() || {};
  const reportsList = window.MedLensApp.getReportsList() || [];       
  const analysisHistory = window.MedLensApp.getAnalysisHistory() || [];

  containerEl.innerHTML = `
    <div style="min-height:100vh; background:var(--color-bg); display:flex; flex-direction:column; padding-bottom:80px;">
      
      <!-- Top Mobile/Desktop Navigation Bar -->
      <header class="dashboard-topbar">
        ${createBrandLogoHtml()}

        <div class="topbar-right">
          <div class="icon-btn-badge" id="home-notifications-btn">
            <i data-lucide="bell" style="width:18px;height:18px;"></i>
            <span class="notification-dot"></span>
          </div>

          <div class="user-profile-menu" onclick="window.MedLensApp.navigateTo('profile')">
            <img src="${userProfile.avatar}" alt="Avatar" class="avatar-img">
            <div class="user-info-text">
              <span class="user-info-name">${userProfile.fullName}</span>
              <span class="user-info-role">Blood Group: ${userProfile.bloodGroup || 'O+'}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Home Workspace -->
      <main class="container" style="padding-top:1.5rem;">
        
        <!-- Welcome User Greeting Card -->
        <div style="background:linear-gradient(135deg, var(--color-dark-green) 0%, #033628 100%); color:var(--color-white); border-radius:var(--radius-xl); padding:1.75rem; margin-bottom:1.75rem; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--shadow-md);">
          <div>
            <span style="font-size:0.85rem; color:var(--color-light-mint); font-weight:600;">Welcome back 👋</span>
            <h2 style="color:var(--color-white); font-size:1.65rem; margin-top:0.2rem;">${userProfile.fullName}</h2>
            <p style="font-size:0.88rem; color:var(--color-light-mint); margin-top:0.4rem;">Upload your latest medical test report to add it to your secure locker.</p>
          </div>
          <div style="display:none; @media(min-width:768px){display:block;}">
            <i data-lucide="shield-check" style="width:56px;height:56px;color:var(--color-light-mint);opacity:0.8;"></i>
          </div>
        </div>

        <!-- Desktop Grid Wrapper -->
        <div class="dashboard-grid">
          
          <!-- LEFT COLUMN: MAIN DIRECT UPLOAD CARD (iLovePDF Concept) -->
          <div style="display:flex; flex-direction:column; gap:1.5rem;">
            
            <div style="background:var(--color-white); border-radius:var(--radius-xl); border:2px dashed var(--color-emerald); padding:2.5rem 1.5rem; text-align:center; box-shadow:var(--shadow-lg); position:relative;" id="home-dropzone">
              
              <div style="width:68px; height:68px; border-radius:50%; background:var(--color-mint-bg); color:var(--color-emerald); display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem;">
                <i data-lucide="file-up" style="width:34px;height:34px;"></i>
              </div>

              <h3 style="font-size:1.4rem; color:var(--color-dark-green); margin-bottom:0.4rem;">Upload Medical Report</h3>
              <p style="font-size:0.88rem; color:var(--color-text-secondary); margin-bottom:1.5rem;">Supports PDF, JPG, PNG files up to 15MB</p>

              <!-- Upload Button & File Input -->
              <input type="file" id="home-file-input" accept=".pdf,.png,.jpg,.jpeg" style="display:none;">
              <button class="btn btn-primary btn-lg btn-full" id="home-browse-btn" style="max-width:320px; margin:0 auto; font-size:1.05rem;">
                <i data-lucide="upload" style="width:20px;height:20px;"></i>
                Upload Report
              </button>

              <div style="margin-top:1rem; font-size:0.82rem; color:var(--color-text-secondary);">
                or drag & drop your report file here
              </div>

              <!-- Upload Progress Indicator (Hidden by default) -->
              <div id="upload-progress-box" style="display:none; margin-top:1.5rem; text-align:left; background:var(--color-bg); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--color-border);">
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; color:var(--color-dark-green); margin-bottom:0.4rem;">
                  <span id="upload-filename">Blood_Test_Sept_2026.pdf</span>
                  <span id="upload-percent">75%</span>
                </div>
                <div class="param-bar-bg" style="height:8px;">
                  <div class="param-bar-fill fill-emerald" id="upload-bar-fill" style="width:75%; transition:width 0.3s ease;"></div>
                </div>
              </div>
            </div>

            <!-- Recent Uploaded Reports Section -->
            <div class="dashboard-panel">
              <div class="panel-header">
                <h3 class="panel-title">Recent Uploads</h3>
                <span class="panel-link" onclick="window.MedLensApp.navigateTo('reports')">View Locker →</span>
              </div>

              <div class="reports-list" id="home-reports-list">
                ${reportsList.map(rep => `
                  <div class="report-row-card">
                    <div class="report-row-info">
                      <div class="report-icon-box">
                        <i data-lucide="file-text"></i>
                      </div>
                      <div>
                        <div class="report-title">${rep.fileName}</div>
                        <div class="report-date">${rep.uploadDate} • <span class="badge ${rep.badgeClass || 'badge-normal'}">${rep.status}</span></div>
                      </div>
                    </div>
                    <div style="display:flex; gap:0.5rem;">
                      <button class="btn btn-secondary btn-sm rep-view-btn" data-repid="${rep.id}">View</button>
                      <button class="btn btn-primary btn-sm rep-analyze-btn" data-repid="${rep.id}">Analyze</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: REPORT LOCKER SUMMARY & ANALYSIS HISTORY -->
          <div style="display:flex; flex-direction:column; gap:1.5rem;">
            
            <!-- Quick Actions Panel -->
            <div class="dashboard-panel">
              <div class="panel-header">
                <h3 class="panel-title">Quick Health Hub</h3>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.85rem;">
                <div class="action-card" onclick="window.MedLensApp.navigateTo('reports')" style="padding:1rem;">
                  <div class="action-icon" style="width:38px;height:38px;"><i data-lucide="folder" style="width:20px;height:20px;"></i></div>
                  <div>
                    <h5 style="font-size:0.9rem;">Report Locker</h5>
                    <p style="font-size:0.75rem;">${reportsList.length} Saved Files</p>
                  </div>
                </div>

                <div class="action-card" onclick="window.MedLensApp.navigateTo('history')" style="padding:1rem;">
                  <div class="action-icon" style="width:38px;height:38px;"><i data-lucide="clock" style="width:20px;height:20px;"></i></div>
                  <div>
                    <h5 style="font-size:0.9rem;">Analysis History</h5>
                    <p style="font-size:0.75rem;">${analysisHistory.length} Summaries</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analysis History Preview Panel -->
            <div class="dashboard-panel">
              <div class="panel-header">
                <h3 class="panel-title">Analysis History</h3>
                <span class="panel-link" onclick="window.MedLensApp.navigateTo('history')">Full History →</span>
              </div>

              <div class="timeline-vertical">
                ${analysisHistory.map(his => `
                  <div class="timeline-event-item">
                    <div class="timeline-date">${his.date} • <span class="badge badge-mint">${his.status}</span></div>
                    <div class="timeline-event-title">${his.title}</div>
                    <p style="font-size:0.8rem; color:var(--color-text-secondary); margin-top:0.2rem;">${his.summary}</p>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

        </div>
      </main>

      <!-- Bottom Mobile Navigation Bar -->
      <nav class="mobile-bottom-nav">
        <div class="bottom-nav-item active" onclick="window.MedLensApp.navigateTo('home')">
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

  // Uploader Handlers
  const fileInput = containerEl.querySelector('#home-file-input');
  const browseBtn = containerEl.querySelector('#home-browse-btn');
  const dropzone = containerEl.querySelector('#home-dropzone');
  const progressBox = containerEl.querySelector('#upload-progress-box');
  const filenameEl = containerEl.querySelector('#upload-filename');
  const percentEl = containerEl.querySelector('#upload-percent');
  const fillEl = containerEl.querySelector('#upload-bar-fill');

  function startUploadProcess(fileName) {
    if (!progressBox) return;
    progressBox.style.display = 'block';
    filenameEl.innerText = fileName;
    fillEl.style.width = '20%';
    percentEl.innerText = '20%';

    setTimeout(() => {
      fillEl.style.width = '75%';
      percentEl.innerText = '75%';
    }, 400);

    setTimeout(() => {
      fillEl.style.width = '100%';
      percentEl.innerText = '100%';
      
      window.MedLensApp.addReportFile({
        fileName: fileName,
        reportType: 'General Medical Report',
        fileSize: '2.1 MB',
        uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Uploaded',
        badgeClass: 'badge-normal'
      });

      window.MedLensApp.showToast('✓ Report Uploaded Successfully');
      renderHomePage(containerEl);
    }, 900);
  }

  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        startUploadProcess(e.target.files[0].name);
      }
    });
  }

  if (dropzone) {
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--color-emerald-hover)';
      dropzone.style.background = 'var(--color-mint-bg)';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--color-emerald)';
      dropzone.style.background = 'var(--color-white)';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--color-emerald)';
      dropzone.style.background = 'var(--color-white)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        startUploadProcess(e.dataTransfer.files[0].name);
      }
    });
  }

  // View & Analyze Buttons
  containerEl.querySelectorAll('.rep-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const repId = e.currentTarget.getAttribute('data-repid');
      const rep = reportsList.find(r => r.id === repId);
      window.MedLensApp.openModal('report-view-file', rep);
    });
  });

  containerEl.querySelectorAll('.rep-analyze-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.MedLensApp.openModal('analysis-on-hold');
    });
  });

  // Notifications Button
  const notifBtn = containerEl.querySelector('#home-notifications-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => window.MedLensApp.openModal('notifications'));
  }
}
