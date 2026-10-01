
// MEDLENS - USER PROFILE COMPONENT (/profile)


import { createBrandLogoHtml } from './navbar.js';

export function renderProfilePage(containerEl) {
  const userDetails = window.MedLensApp.getUserDetails() || {};

  containerEl.innerHTML = `
    <div style="min-height:100vh; background:var(--color-bg); display:flex; flex-direction:column; padding-bottom:80px;">
      
      <!-- Top Navigation Bar -->
      <header class="dashboard-topbar">
        ${createBrandLogoHtml()}
        <h4 style="font-size:1.1rem; color:var(--color-dark-green);">My Profile</h4>
      </header>

      <main class="container" style="padding-top:1.5rem; max-width:800px;">
        <!-- Large Profile Card -->
        <div class="profile-card" style="margin-bottom:1.5rem;">
          <img src="${userDetails.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'}" alt="Avatar" class="profile-avatar-large">
          
          <div class="profile-details-main">
            <span class="profile-welcome-tag">Personal Health Profile</span>
            <h2>${userDetails.fullName || 'Anshika Sharma'}</h2>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-top:1rem; font-size:0.9rem;">
              <div><span style="color:var(--color-text-secondary);">Email:</span> <strong>${userDetails.email || 'anshika@example.com'}</strong></div>
              <div><span style="color:var(--color-text-secondary);">Phone:</span> <strong>${userDetails.phone || '+91 98765 43210'}</strong></div>
              <div><span style="color:var(--color-text-secondary);">Date of Birth:</span> <strong>${userDetails.dob || '26 Oct 2001'}</strong></div>
              <div><span style="color:var(--color-text-secondary);">Gender:</span> <strong>${userDetails.gender || 'Female'}</strong></div>
              <div><span style="color:var(--color-text-secondary);">Blood Group:</span> <strong style="color:var(--color-emerald);">${userDetails.bloodGroup || 'O+'}</strong></div>
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" id="profile-edit-btn">
            <i data-lucide="edit-3" style="width:14px;height:14px;"></i> Edit Profile
          </button>
        </div>

        <!-- Medical & Emergency Info Card -->
        <div class="dashboard-panel" style="margin-bottom:1.5rem;">
          <div class="panel-header">
            <h3 class="panel-title">Medical Overview & Health Info</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.85rem; font-size:0.9rem;">
            <div>
              <strong style="color:var(--color-dark-green);">Known Allergies:</strong>
              <div style="color:var(--color-text-secondary); margin-top:0.2rem;">${userDetails.allergies || 'None reported'}</div>
            </div>
            <div style="border-top:1px solid var(--color-border); padding-top:0.75rem;">
              <strong style="color:var(--color-dark-green);">Emergency Contact:</strong>
              <div style="color:var(--color-text-secondary); margin-top:0.2rem;">${userDetails.emergencyContact || 'Not specified'}</div>
            </div>
          </div>
        </div>

        <!-- Logout Action -->
        <button class="btn btn-secondary btn-full" id="profile-logout-btn" style="color:#BE123C; border-color:#FECDD3;">
          <i data-lucide="log-out" style="width:18px;height:18px;"></i>
          Logout of Account
        </button>
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
        <div class="bottom-nav-item" onclick="window.MedLensApp.navigateTo('history')">
          <i data-lucide="clock" style="width:20px;height:20px;"></i>
          <span>History</span>
        </div>
        <div class="bottom-nav-item active" onclick="window.MedLensApp.navigateTo('profile')">
          <i data-lucide="user" style="width:20px;height:20px;"></i>
          <span>Profile</span>
        </div>
      </nav>

    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  const editBtn = containerEl.querySelector('#profile-edit-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      window.MedLensApp.openModal('edit-profile', userDetails);
    });
  }

  const logoutBtn = containerEl.querySelector('#profile-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => window.MedLensApp.logout());
  }
}
