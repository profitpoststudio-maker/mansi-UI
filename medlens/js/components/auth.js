
// MEDLENS - AUTHENTICATION COMPONENT (PAGE 2)


import { createBrandLogoHtml } from './navbar.js';

export function renderAuthPage(containerEl) {
  let isSignUpMode = false;
  let showPassword = false;

  function updateAuthRender() {
    containerEl.innerHTML = `
      <div class="auth-wrapper">
        <!-- LEFT: Branding Side -->
        <div class="auth-brand-side">
          <div style="position:relative; z-index:2;" onclick="window.MedLensApp.navigateTo('landing')">
            ${createBrandLogoHtml()}
          </div>

          <div class="auth-brand-content">
            <h2>Welcome to MedLens</h2>
            <p>Your health information, organized and easier to understand.</p>
            
            <div class="auth-illustration-box">
              <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer Glow -->
                <circle cx="100" cy="100" r="80" fill="url(#mintGlow)" opacity="0.3"/>
                <!-- Shield Base -->
                <path d="M100 30L150 50V100C150 135 125 165 100 175C75 165 50 135 50 100V50L100 30Z" 
                      fill="url(#shieldGrad)" stroke="#A7F3D0" stroke-width="3"/>
                <!-- Medical Cross inside Shield -->
                <path d="M100 70V120M75 95H125" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
                <defs>
                  <radialGradient id="mintGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) scale(80)">
                    <stop stop-color="#10B981"/>
                    <stop offset="1" stop-color="#064E3B" stop-opacity="0"/>
                  </radialGradient>
                  <linearGradient id="shieldGrad" x1="50" y1="30" x2="150" y2="175" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#10B981"/>
                    <stop offset="1" stop-color="#064E3B"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div style="position:relative; z-index:2; font-size:0.85rem; color:var(--color-light-mint);">
            <i data-lucide="lock" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i>
            Protected by end-to-end healthcare data standards.
          </div>
        </div>

        <!-- RIGHT: Form Side -->
        <div class="auth-form-side">
          <div class="auth-card">
            <div class="auth-header">
              <h3>${isSignUpMode ? 'Create Your Account' : 'Sign In to Your Account'}</h3>
              <p>${isSignUpMode ? 'Start tracking your medical timeline today.' : 'Access your health dashboard'}</p>
            </div>

            <form id="auth-form" novalidate>
              ${isSignUpMode ? `
                <div class="form-group">
                  <label class="form-label" for="auth-fullname">Full Name</label>
                  <div class="input-wrapper">
                    <input type="text" id="auth-fullname" class="form-input" placeholder="e.g. Your Full Name" value="" required>
                  </div>
                  <span class="field-error" id="err-fullname" style="color:#F43F5E;font-size:0.75rem;display:none;"></span>
                </div>
              ` : ''}

              <div class="form-group">
                <label class="form-label" for="auth-email">Email Address</label>
                <div class="input-wrapper">
                  <input type="email" id="auth-email" class="form-input" placeholder="e.g. name@example.com" value="" required>
                </div>
                <span class="field-error" id="err-email" style="color:#F43F5E;font-size:0.75rem;display:none;"></span>
              </div>

              <div class="form-group">
                <label class="form-label" for="auth-password">Password</label>
                <div class="input-wrapper">
                  <input type="${showPassword ? 'text' : 'password'}" id="auth-password" class="form-input" placeholder="Enter your password" value="" required>
                  <i data-lucide="${showPassword ? 'eye-off' : 'eye'}" class="input-icon-right" id="toggle-pw-btn"></i>
                </div>
                ${isSignUpMode ? `
                  <div class="password-strength-bar">
                    <div class="password-strength-fill" id="pw-strength-fill"></div>
                  </div>
                ` : ''}
                <span class="field-error" id="err-password" style="color:#F43F5E;font-size:0.75rem;display:none;"></span>
              </div>

              ${isSignUpMode ? `
                <div class="form-group">
                  <label class="form-label" for="auth-confirm-password">Confirm Password</label>
                  <div class="input-wrapper">
                    <input type="${showPassword ? 'text' : 'password'}" id="auth-confirm-password" class="form-input" placeholder="Re-enter your password" value="" required>
                  </div>
                  <span class="field-error" id="err-confirm-password" style="color:#F43F5E;font-size:0.75rem;display:none;"></span>
                </div>

                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" id="auth-terms" checked>
                    <span>I agree to the Terms of Service & Privacy Policy</span>
                  </label>
                  <span class="field-error" id="err-terms" style="color:#F43F5E;font-size:0.75rem;display:none;"></span>
                </div>
              ` : `
                <div class="form-options">
                  <label class="checkbox-label">
                    <input type="checkbox" checked>
                    <span>Remember me</span>
                  </label>
                  <a href="#" class="forgot-link" id="auth-forgot-btn">Forgot Password?</a>
                </div>
              `}

              <button type="submit" class="btn btn-primary btn-full btn-lg" id="auth-submit-btn">
                <span id="btn-text">${isSignUpMode ? 'Create Account' : 'Sign In'}</span>
                <i data-lucide="arrow-right" style="width:18px;height:18px;"></i>
              </button>
            </form>

            ${!isSignUpMode ? `
              <div class="divider">
                <span>OR</span>
              </div>

              <button class="btn btn-secondary btn-full" id="google-auth-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" style="margin-right:8px;">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>
            ` : ''}

            <div class="auth-switch-text">
              ${isSignUpMode ? 'Already have an account?' : "Don't have an account?"}
              <span class="auth-switch-link" id="toggle-auth-mode">
                ${isSignUpMode ? 'Sign In' : 'Create Account'}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Re-initialize Lucide Icons
    if (window.lucide) window.lucide.createIcons();

    // Toggle Password Visibility Listener
    const togglePwBtn = containerEl.querySelector('#toggle-pw-btn');
    if (togglePwBtn) {
      togglePwBtn.addEventListener('click', () => {
        showPassword = !showPassword;
        updateAuthRender();
      });
    }

    // Toggle Sign In / Sign Up Mode
    const toggleModeLink = containerEl.querySelector('#toggle-auth-mode');
    if (toggleModeLink) {
      toggleModeLink.addEventListener('click', () => {
        isSignUpMode = !isSignUpMode;
        updateAuthRender();
      });
    }

    // Password Strength Meter listener (Sign Up Mode)
    const pwInput = containerEl.querySelector('#auth-password');
    const pwStrengthFill = containerEl.querySelector('#pw-strength-fill');
    if (pwInput && pwStrengthFill) {
      pwInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val.length === 0) {
          pwStrengthFill.style.width = '0%';
        } else if (val.length < 6) {
          pwStrengthFill.style.width = '33%';
          pwStrengthFill.style.backgroundColor = '#F43F5E';
        } else if (val.length < 10) {
          pwStrengthFill.style.width = '66%';
          pwStrengthFill.style.backgroundColor = '#F59E0B';
        } else {
          pwStrengthFill.style.width = '100%';
          pwStrengthFill.style.backgroundColor = '#10B981';
        }
      });
    }

    // Forgot Password Trigger
    const forgotBtn = containerEl.querySelector('#auth-forgot-btn');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.MedLensApp) {
          window.MedLensApp.openModal('forgot-password');
        }
      });
    }

    // Google Auth Simulation Trigger
    const googleBtn = containerEl.querySelector('#google-auth-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        if (window.MedLensApp) {
          const current = window.MedLensApp.getUserDetails() || {};
          window.MedLensApp.loginSuccess({
            fullName: current.fullName || 'User',
            email: current.email || 'user@example.com'
          }, false);
        }
      });
    }

    // Form Submission & Validation
    const authForm = containerEl.querySelector('#auth-form');
    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const emailInput = containerEl.querySelector('#auth-email');
        const passwordInput = containerEl.querySelector('#auth-password');
        const errEmail = containerEl.querySelector('#err-email');
        const errPassword = containerEl.querySelector('#err-password');

        // Reset errors
        if (errEmail) errEmail.style.display = 'none';
        if (errPassword) errPassword.style.display = 'none';

        // Validate Email
        if (!emailInput.value || !emailInput.value.includes('@')) {
          if (errEmail) {
            errEmail.innerText = 'Please enter a valid email address';
            errEmail.style.display = 'block';
          }
          isValid = false;
        }

        // Validate Password
        if (!passwordInput.value || passwordInput.value.length < 6) {
          if (errPassword) {
            errPassword.innerText = 'Password must be at least 6 characters long';
            errPassword.style.display = 'block';
          }
          isValid = false;
        }

        // Additional Sign Up Validations
        let fullNameVal = '';
        if (isSignUpMode) {
          const fullnameInput = containerEl.querySelector('#auth-fullname');
          const confirmPwInput = containerEl.querySelector('#auth-confirm-password');
          const termsInput = containerEl.querySelector('#auth-terms');
          const errFullname = containerEl.querySelector('#err-fullname');
          const errConfirm = containerEl.querySelector('#err-confirm-password');
          const errTerms = containerEl.querySelector('#err-terms');

          if (errFullname) errFullname.style.display = 'none';
          if (errConfirm) errConfirm.style.display = 'none';
          if (errTerms) errTerms.style.display = 'none';

          if (!fullnameInput.value.trim()) {
            if (errFullname) {
              errFullname.innerText = 'Please enter your full name';
              errFullname.style.display = 'block';
            }
            isValid = false;
          } else {
            fullNameVal = fullnameInput.value.trim();
          }

          if (passwordInput.value !== confirmPwInput.value) {
            if (errConfirm) {
              errConfirm.innerText = 'Passwords do not match';
              errConfirm.style.display = 'block';
            }
            isValid = false;
          }

          if (!termsInput.checked) {
            if (errTerms) {
              errTerms.innerText = 'You must accept the terms to continue';
              errTerms.style.display = 'block';
            }
            isValid = false;
          }
        }

        if (isValid) {
          const submitBtn = containerEl.querySelector('#auth-submit-btn');
          const btnText = containerEl.querySelector('#btn-text');
          
          if (submitBtn) submitBtn.disabled = true;
          if (btnText) btnText.innerText = isSignUpMode ? 'Creating Account...' : 'Signing In...';

          setTimeout(() => {
            if (window.MedLensApp) {
              if (isSignUpMode) {
                // NEW USER SIGN UP: Force isFirstTime = true
                window.MedLensApp.loginSuccess({
                  fullName: fullNameVal,
                  email: emailInput.value.trim()
                }, true);
              } else {
                // RETURNING USER LOGIN: isFirstTime = false
                window.MedLensApp.loginSuccess({
                  email: emailInput.value.trim()
                }, false);
              }
            }
          }, 350);
        }
      });
    }
  }

  updateAuthRender();
}
