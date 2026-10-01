
// MEDLENS - ONBOARDING / BASIC DETAILS COMPONENT (/onboarding)


import { createBrandLogoHtml } from './navbar.js';

export function renderOnboardingPage(containerEl) {
  const userDetails = window.MedLensApp.getUserDetails() || {};

  containerEl.innerHTML = `
    <div style="min-height:100vh; background:var(--color-bg); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:2rem 1rem;">
      <div style="width:100%; max-width:480px; background:var(--color-white); border-radius:var(--radius-xl); border:1px solid var(--color-border); box-shadow:var(--shadow-xl); padding:2.25rem;">
        
        <div style="text-align:center; margin-bottom:1.75rem;">
          ${createBrandLogoHtml()}
          <div class="badge badge-mint" style="margin-top:1rem; margin-bottom:0.5rem;">Step 1 of 1 • Profile Setup</div>
          <h2 style="font-size:1.75rem; color:var(--color-dark-green); margin-bottom:0.4rem;">Complete Your Basic Details</h2>
          <p style="font-size:0.9rem; color:var(--color-text-secondary);">Help us personalize your MedLens health record.</p>
        </div>

        <form id="onboarding-form">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" id="ob-fullname" class="form-input" placeholder="e.g. Full Name" value="${userDetails.fullName || ''}" required>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.85rem;">
            <div class="form-group">
              <label class="form-label">Date of Birth *</label>
              <input type="text" id="ob-dob" class="form-input" placeholder="DD/MM/YYYY" value="${userDetails.dob || ''}" required>
            </div>

            <div class="form-group">
              <label class="form-label">Gender *</label>
              <select id="ob-gender" class="form-input" required>
                <option value="Female" ${userDetails.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option value="Male" ${userDetails.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option value="Other" ${userDetails.gender === 'Other' ? 'selected' : ''}>Other</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:0.85rem;">
            <div class="form-group">
              <label class="form-label">Email Address *</label>
              <input type="email" id="ob-email" class="form-input" placeholder="name@example.com" value="${userDetails.email || ''}" required>
            </div>

            <div class="form-group">
              <label class="form-label">Blood Group *</label>
              <select id="ob-blood" class="form-input" required>
                <option value="O+" ${userDetails.bloodGroup === 'O+' || !userDetails.bloodGroup ? 'selected' : ''}>O+</option>
                <option value="A+" ${userDetails.bloodGroup === 'A+' ? 'selected' : ''}>A+</option>
                <option value="B+" ${userDetails.bloodGroup === 'B+' ? 'selected' : ''}>B+</option>
                <option value="AB+" ${userDetails.bloodGroup === 'AB+' ? 'selected' : ''}>AB+</option>
                <option value="O-" ${userDetails.bloodGroup === 'O-' ? 'selected' : ''}>O-</option>
                <option value="A-" ${userDetails.bloodGroup === 'A-' ? 'selected' : ''}>A-</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Phone Number *</label>
            <input type="tel" id="ob-phone" class="form-input" placeholder="+91 98765 43210" value="${userDetails.phone || ''}" required>
          </div>

          <div class="form-group">
            <label class="form-label">Known Allergies (Optional)</label>
            <input type="text" id="ob-allergies" class="form-input" placeholder="e.g. Penicillin, Dust, Peanuts" value="${userDetails.allergies || ''}">
          </div>

          <div class="form-group">
            <label class="form-label">Emergency Contact (Optional)</label>
            <input type="text" id="ob-emergency" class="form-input" placeholder="Name & Phone Number" value="${userDetails.emergencyContact || ''}">
          </div>

          <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top:1rem;">
            <span>Continue →</span>
          </button>
        </form>

      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  const form = containerEl.querySelector('#onboarding-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const basicData = {
        fullName: containerEl.querySelector('#ob-fullname').value,
        dob: containerEl.querySelector('#ob-dob').value,
        gender: containerEl.querySelector('#ob-gender').value,
        email: containerEl.querySelector('#ob-email').value,
        bloodGroup: containerEl.querySelector('#ob-blood').value,
        phone: containerEl.querySelector('#ob-phone').value,
        allergies: containerEl.querySelector('#ob-allergies').value,
        emergencyContact: containerEl.querySelector('#ob-emergency').value,
        avatar: userDetails.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
      };

      window.MedLensApp.completeOnboarding(basicData);
    });
  }
}
