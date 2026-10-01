
// MEDLENS - SHARED MODAL SYSTEM


export function renderModalContent(modalType, payload = {}) {
  const modalContent = document.getElementById('modal-content');
  if (!modalContent) return;

  let bodyHtml = '';

  switch (modalType) {
    case 'share-report':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div style="text-align:center; margin-bottom:1.5rem;">
          <div style="width:54px; height:54px; border-radius:50%; background:var(--color-very-light-mint); color:var(--color-emerald); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; border:1px solid var(--color-light-mint);">
            <i data-lucide="share-2" style="width:26px;height:26px;"></i>
          </div>
          <h3 style="font-size:1.4rem; color:var(--color-dark-green); margin-bottom:0.3rem;">Share Medical Report</h3>
          <p style="font-size:0.85rem; color:var(--color-text-secondary);">${payload.fileName || payload.name || 'Report.pdf'}</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.85rem; margin-bottom:1.5rem;">
          <button class="btn btn-secondary btn-full" id="share-copy-link-btn" style="justify-content:flex-start; padding:0.9rem 1.25rem;">
            <i data-lucide="link" style="color:var(--color-emerald);"></i>
            <span>Copy Secure View Link</span>
          </button>

          <button class="btn btn-secondary btn-full" id="share-download-pdf-btn" style="justify-content:flex-start; padding:0.9rem 1.25rem;">
            <i data-lucide="download" style="color:var(--color-emerald);"></i>
            <span>Download Report Document</span>
          </button>

          <button class="btn btn-secondary btn-full" id="share-native-btn" style="justify-content:flex-start; padding:0.9rem 1.25rem;">
            <i data-lucide="send" style="color:var(--color-emerald);"></i>
            <span>Share via Email / Messaging</span>
          </button>
        </div>

        <div style="text-align:right;">
          <button class="btn btn-primary" onclick="window.MedLensApp.closeModal()">Done</button>
        </div>
      `;
      break;

    case 'report-details':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem;">
          <div>
            <div class="badge badge-mint" style="margin-bottom:0.4rem;">Medical Report View</div>
            <h3 style="font-size:1.4rem; color:var(--color-dark-green);">${payload.title || 'Laboratory Report'}</h3>
            <span style="font-size:0.85rem; color:var(--color-text-secondary);">Tested Date: ${payload.date || '2026'}</span>
          </div>
          <span class="badge badge-normal">Analyzed ✓</span>
        </div>

        <div style="background:var(--color-pale-green); border:1px solid var(--color-light-mint); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.25rem; font-size:0.88rem; color:var(--color-dark-green); line-height:1.5;">
          <strong>AI Clinical Summary:</strong> ${(payload.aiSummary && payload.aiSummary.note) || 'All primary parameters within healthy reference ranges.'}
        </div>

        <div style="max-height:260px; overflow-y:auto; margin-bottom:1.5rem;">
          <table class="demo-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Result</th>
                <th>Status</th>
                <th>Standard Range</th>
              </tr>
            </thead>
            <tbody>
              ${(payload.parameters || []).map(p => `
                <tr>
                  <td><strong>${p.name}</strong></td>
                  <td><strong>${p.value}</strong></td>
                  <td><span class="badge ${p.status === 'Normal' ? 'badge-normal' : 'badge-review'}">${p.status}</span></td>
                  <td style="color:var(--color-text-secondary);">${p.range}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-secondary" onclick="window.MedLensApp.openModal('share-report', ${JSON.stringify(payload).replace(/"/g, '&quot;')})">Share</button>
          <button class="btn btn-primary" onclick="window.MedLensApp.closeModal()">Close</button>
        </div>
      `;
      break;

    case 'upload-report':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div style="text-align:center; margin-bottom:1.5rem;">
          <div style="width:58px; height:58px; border-radius:50%; background:var(--color-very-light-mint); color:var(--color-emerald); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; border:1px solid var(--color-light-mint);">
            <i data-lucide="upload-cloud" style="width:30px;height:30px;"></i>
          </div>
          <h3 style="font-size:1.4rem; color:var(--color-dark-green); margin-bottom:0.3rem;">Upload Medical Report</h3>
          <p style="font-size:0.88rem; color:var(--color-text-secondary);">Select digital lab results or scanned paper reports</p>
        </div>

        <div style="border:2px dashed var(--color-emerald); border-radius:var(--radius-lg); padding:2rem 1.5rem; text-align:center; background:var(--color-pale-green); margin-bottom:1.5rem; cursor:pointer;" id="modal-upload-dropzone">
          <i data-lucide="file-text" style="width:36px;height:36px;color:var(--color-emerald);margin-bottom:0.5rem;"></i>
          <p style="font-weight:700; color:var(--color-dark-green); margin-bottom:0.25rem;">Choose File or Drag & Drop</p>
          <p style="font-size:0.8rem; color:var(--color-text-secondary);">PDF, JPG, JPEG, PNG up to 15MB</p>
          <input type="file" id="modal-file-input" accept=".pdf,.png,.jpg,.jpeg" style="display:none;">
          <button class="btn btn-primary btn-sm" style="margin-top:1rem;" onclick="document.getElementById('modal-file-input').click()">Browse Device</button>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-secondary" onclick="window.MedLensApp.closeModal()">Cancel</button>
        </div>
      `;
      break;

    case 'compare-reports':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div style="margin-bottom:1.5rem;">
          <div class="badge badge-mint" style="margin-bottom:0.4rem;">Comparative Diagnostics</div>
          <h3 style="font-size:1.4rem; color:var(--color-dark-green); margin-bottom:0.3rem;">Compare Medical Reports</h3>
          <p style="font-size:0.88rem; color:var(--color-text-secondary);">Review biomarker changes between your consecutive tests.</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
          <div style="padding:1rem; background:var(--color-pale-green); border:1px solid var(--color-light-mint); border-radius:var(--radius-md);">
            <strong>Test A (Baseline):</strong>
            <div style="font-size:0.82rem; color:var(--color-text-secondary); margin-top:0.25rem;">Complete Blood Count (18 Sep 2026)</div>
            <div style="font-size:0.85rem; color:var(--color-dark-green); margin-top:0.5rem;">Hemoglobin: <strong>13.2 g/dL</strong></div>
          </div>
          <div style="padding:1rem; background:var(--color-soft-mint); border:1px solid var(--color-light-mint); border-radius:var(--radius-md);">
            <strong>Test B (Comparison):</strong>
            <div style="font-size:0.82rem; color:var(--color-text-secondary); margin-top:0.25rem;">CBC Panel (15 Jul 2026)</div>
            <div style="font-size:0.85rem; color:var(--color-dark-green); margin-top:0.5rem;">Hemoglobin: <strong>13.0 g/dL</strong> (+0.2 g/dL)</div>
          </div>
        </div>

        <div style="text-align:right;">
          <button class="btn btn-primary" onclick="window.MedLensApp.closeModal()">Close Comparison</button>
        </div>
      `;
      break;

    case 'view-trends':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div style="margin-bottom:1.25rem;">
          <div class="badge badge-mint" style="margin-bottom:0.4rem;">Trend Analysis</div>
          <h3 style="font-size:1.4rem; color:var(--color-dark-green);">Fasting Blood Glucose Longitudinal Trend</h3>
          <p style="font-size:0.88rem; color:var(--color-text-secondary);">Historical progression over consecutive tests</p>
        </div>

        <div class="trend-chart-box" style="height:150px; margin-bottom:1.5rem;">
          <svg width="100%" height="100%" viewBox="0 0 500 120" preserveAspectRatio="none">
            <line x1="0" y1="30" x2="500" y2="30" stroke="#E2E8F0" stroke-dasharray="4"/>
            <line x1="0" y1="60" x2="500" y2="60" stroke="#E2E8F0" stroke-dasharray="4"/>
            <line x1="0" y1="90" x2="500" y2="90" stroke="#E2E8F0" stroke-dasharray="4"/>
            <path d="M0,95 L125,80 L250,65 L375,40 L500,25" fill="none" stroke="#10B981" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="0" cy="95" r="5" fill="#064E3B"/>
            <circle cx="125" cy="80" r="5" fill="#064E3B"/>
            <circle cx="250" cy="65" r="5" fill="#064E3B"/>
            <circle cx="375" cy="40" r="5.5" fill="#F59E0B"/>
            <circle cx="500" cy="25" r="6" fill="#F43F5E"/>
          </svg>
        </div>

        <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--color-text-secondary); margin-bottom:1.5rem;">
          <span>20 May (92 mg/dL)</span>
          <span>03 Jun (98 mg/dL)</span>
          <span>15 Jul (102 mg/dL)</span>
          <span>28 Aug (108 mg/dL)</span>
        </div>

        <div style="text-align:right;">
          <button class="btn btn-primary" onclick="window.MedLensApp.closeModal()">Close Trends</button>
        </div>
      `;
      break;

    case 'export-summary':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div style="text-align:center; margin-bottom:1.5rem;">
          <div style="width:58px; height:58px; border-radius:50%; background:var(--color-very-light-mint); color:var(--color-emerald); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; border:1px solid var(--color-light-mint);">
            <i data-lucide="download" style="width:28px;height:28px;"></i>
          </div>
          <h3 style="font-size:1.4rem; color:var(--color-dark-green); margin-bottom:0.3rem;">Export Health Summary</h3>
          <p style="font-size:0.88rem; color:var(--color-text-secondary);">Download a consolidated physician-ready medical record.</p>
        </div>

        <div style="padding:1.25rem; background:var(--color-pale-green); border:1px solid var(--color-light-mint); border-radius:var(--radius-md); margin-bottom:1.5rem; font-size:0.88rem; line-height:1.5; color:var(--color-dark-green);">
          Includes all 12 verified lab parameters, longitudinal glucose tracking, timeline milestones, and clinical disclaimers for Dr. Consultation.
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-secondary" onclick="window.MedLensApp.closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="window.MedLensApp.showToast('✓ Medical PDF Summary Generated & Downloaded!'); window.MedLensApp.closeModal();">Download PDF</button>
        </div>
      `;
      break;

    case 'analysis-on-hold':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div style="text-align:center; padding:1rem 0;">
          <i data-lucide="alert-circle" style="width:48px;height:48px;color:#F59E0B;margin-bottom:1rem;"></i>
          <h3 style="font-size:1.4rem; color:var(--color-dark-green); margin-bottom:0.5rem;">Detailed Analysis ON HOLD</h3>
          <p style="font-size:0.9rem; color:var(--color-text-secondary); line-height:1.5; margin-bottom:1.5rem;">
            The detailed medical interpretation engine is currently kept on hold pending clinical compliance protocols. Your document has been stored securely in your Report Locker.
          </p>
          <button class="btn btn-primary" onclick="window.MedLensApp.closeModal()">Understood</button>
        </div>
      `;
      break;

    case 'edit-profile':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <h3 style="font-size:1.4rem; color:var(--color-dark-green); margin-bottom:0.5rem;">Edit Profile</h3>
        <p style="font-size:0.85rem; color:var(--color-text-secondary); margin-bottom:1.5rem;">Update your health account personal information.</p>

        <form id="edit-profile-form">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="edit-name" class="form-input" value="${payload.fullName || ''}" required>
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="edit-email" class="form-input" value="${payload.email || ''}" required>
          </div>

          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" id="edit-phone" class="form-input" value="${payload.phone || ''}" required>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Date of Birth</label>
              <input type="text" id="edit-dob" class="form-input" value="${payload.dob || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Gender</label>
              <select id="edit-gender" class="form-input">
                <option ${payload.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option ${payload.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option ${payload.gender === 'Other' ? 'selected' : ''}>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Blood Group</label>
              <input type="text" id="edit-blood" class="form-input" value="${payload.bloodGroup || 'O+'}">
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem;">
            <button type="button" class="btn btn-secondary" onclick="window.MedLensApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      `;
      break;

    case 'feature-detail':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div class="badge badge-mint" style="margin-bottom:0.75rem;">MedLens Capability</div>
        <h3 style="font-size:1.5rem; color:var(--color-dark-green); margin-bottom:0.75rem;">${payload.title || 'Feature Explanation'}</h3>
        
        <p style="font-size:0.98rem; color:var(--color-text-main); line-height:1.6; margin-bottom:1.5rem;">
          ${payload.summary || 'MedLens provides comprehensive medical report interpretation and health timeline tracking.'}
        </p>

        <div style="background:var(--color-very-light-mint); border-left:4px solid var(--color-emerald); padding:1rem; border-radius:var(--radius-md); font-size:0.88rem; color:var(--color-dark-green); line-height:1.5;">
          <strong>Key Benefit:</strong> Reduces complexity, eliminates confusing medical jargon, and gives patients and doctors a shared baseline.
        </div>

        <div style="margin-top:1.75rem; text-align:right;">
          <button class="btn btn-primary" onclick="window.MedLensApp.closeModal()">Understood</button>
        </div>
      `;
      break;

    case 'parameter-explanation':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <div class="badge badge-mint" style="margin-bottom:0.75rem;">${payload.category || 'Biomarker'}</div>
        <h3 style="font-size:1.5rem; color:var(--color-dark-green); margin-bottom:0.5rem;">${payload.title || 'Parameter Explanation'}</h3>
        <p style="font-size:0.85rem; color:var(--color-emerald); font-weight:700; margin-bottom:1rem;">Standard Reference: ${payload.normalRange || 'Normal range varies'}</p>

        <p style="font-size:0.95rem; color:var(--color-text-main); line-height:1.6; margin-bottom:1rem;">
          ${payload.summary || ''}
        </p>

        <div style="background:var(--color-pale-green); border-radius:var(--radius-md); padding:1rem; margin-bottom:1rem; border:1px solid var(--color-light-mint);">
          <strong style="color:var(--color-dark-green); font-size:0.9rem;">What it means:</strong>
          <p style="font-size:0.88rem; color:var(--color-text-secondary); margin-top:0.25rem;">${payload.whatItMeans || ''}</p>
        </div>

        <div style="background:var(--color-soft-mint); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.5rem; border:1px solid var(--color-light-mint);">
          <strong style="color:var(--color-dark-green); font-size:0.9rem;">Lifestyle Support:</strong>
          <p style="font-size:0.88rem; color:var(--color-text-secondary); margin-top:0.25rem;">${payload.lifestyleTip || ''}</p>
        </div>

        <div style="text-align:right;">
          <button class="btn btn-primary" onclick="window.MedLensApp.closeModal()">Got it</button>
        </div>
      `;
      break;

    case 'notifications':
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <h3 style="font-size:1.3rem; color:var(--color-dark-green); margin-bottom:1rem;">Notifications</h3>
        
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <div style="padding:0.85rem; background:var(--color-very-light-mint); border-radius:var(--radius-md); border-left:3px solid var(--color-emerald);">
            <strong style="font-size:0.88rem; color:var(--color-dark-green);">Report Successfully Uploaded</strong>
            <p style="font-size:0.8rem; color:var(--color-text-secondary);">CBC_Report_Sept_2026.pdf is now saved in your Locker.</p>
          </div>
          <div style="padding:0.85rem; background:var(--color-pale-green); border-radius:var(--radius-md); border-left:3px solid var(--color-emerald);">
            <strong style="font-size:0.88rem; color:var(--color-dark-green);">Profile Synced</strong>
            <p style="font-size:0.8rem; color:var(--color-text-secondary);">Basic onboarding details completed for Anshika Sharma.</p>
          </div>
        </div>
      `;
      break;

    default:
      bodyHtml = `
        <button class="modal-close-btn" onclick="window.MedLensApp.closeModal()">
          <i data-lucide="x"></i>
        </button>
        <h3 style="font-size:1.4rem; color:var(--color-dark-green); margin-bottom:0.5rem;">${payload.title || 'Notification'}</h3>
        <p style="font-size:0.9rem; color:var(--color-text-secondary); margin-bottom:1.5rem;">MedLens feature ready.</p>
        <div style="text-align:right;">
          <button class="btn btn-primary" onclick="window.MedLensApp.closeModal()">OK</button>
        </div>
      `;
      break;
  }

  modalContent.innerHTML = bodyHtml;
  if (window.lucide) window.lucide.createIcons();

  // Attach modal form handlers
  const editProfileForm = modalContent.querySelector('#edit-profile-form');
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = modalContent.querySelector('#edit-name').value;
      const emailVal = modalContent.querySelector('#edit-email').value;
      const phoneVal = modalContent.querySelector('#edit-phone').value;
      const dobVal = modalContent.querySelector('#edit-dob').value;
      const genderVal = modalContent.querySelector('#edit-gender').value;
      const bloodVal = modalContent.querySelector('#edit-blood').value;

      window.MedLensApp.updateUserProfile({
        fullName: nameVal,
        email: emailVal,
        phone: phoneVal,
        dob: dobVal,
        gender: genderVal,
        bloodGroup: bloodVal
      });

      window.MedLensApp.closeModal();
      window.MedLensApp.showToast('Profile updated successfully.');
    });
  }

  const copyBtn = modalContent.querySelector('#share-copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href);
      window.MedLensApp.showToast('✓ Share link copied to clipboard!');
    });
  }

  const downloadBtn = modalContent.querySelector('#share-download-pdf-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      window.MedLensApp.showToast('✓ Document download started.');
      window.MedLensApp.closeModal();
    });
  }

  const modalFileInput = modalContent.querySelector('#modal-file-input');
  if (modalFileInput) {
    modalFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        window.MedLensApp.addReportFile({
          fileName: file.name,
          name: file.name.replace(/\.[^/.]+$/, ''),
          reportType: 'Uploaded Medical Report',
          fileSize: '2.2 MB',
          uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'Uploaded',
          badgeClass: 'badge-normal'
        });
        window.MedLensApp.showToast('✓ Report Uploaded to Locker!');
        window.MedLensApp.closeModal();
        window.MedLensApp.render();
      }
    });
  }
}
