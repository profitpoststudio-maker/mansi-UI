
// MEDLENS - MAIN APPLICATION ROUTER & STATE ENGINE


import { renderLandingPage } from './components/landing.js';
import { renderAuthPage } from './components/auth.js';
import { renderOnboardingPage } from './components/onboarding.js';
import { renderDashboardHomePage } from './components/dashboardHome.js';
import { renderReportsPage } from './components/reports.js';
import { renderHistoryPage } from './components/history.js';
import { renderProfilePage } from './components/profile.js';
import { renderAnalysisPlaceholderPage } from './components/analysisPlaceholder.js';
import { renderModalContent } from './components/modals.js';
import { INITIAL_USER_STATE, INITIAL_USER_PROFILE } from './data/mockData.js';

class MedLensAppEngine {
  constructor() {
    this.appContainer = document.getElementById('app');
    this.toastContainer = document.getElementById('toast-container');
    this.modalOverlay = document.getElementById('modal-container');
    
    // Auth State
    const storedAuth = localStorage.getItem('medlens_auth');
    this.isAuthenticated = storedAuth === 'true';

    // User Details State (CRITICAL: PRESERVE EXISTING USER PROFILE!)
    const storedUser = localStorage.getItem('medlens_user');
    if (storedUser) {
      try {
        this.userDetails = JSON.parse(storedUser);
      } catch (e) {
        this.userDetails = { ...INITIAL_USER_PROFILE };
      }
    } else {
      this.userDetails = { ...INITIAL_USER_PROFILE };
    }

    // Register active user in per-user database if not already present
    const usersDb = this.getUsersDb();
    if (this.userDetails && this.userDetails.email) {
      const normEmail = this.normalizeEmail(this.userDetails.email);
      if (!usersDb[normEmail]) {
        const wasCompleted = localStorage.getItem('medlens_profile_completed') === 'true' || !!(this.userDetails.dob && this.userDetails.bloodGroup);
        usersDb[normEmail] = {
          ...this.userDetails,
          onboardingCompleted: wasCompleted
        };
        this.saveUsersDb(usersDb);
      }
    }

    // Profile Completed State (User-Specific)
    this.profileCompleted = this.isUserOnboardingCompleted(this.userDetails ? this.userDetails.email : null);
    localStorage.setItem('medlens_profile_completed', this.profileCompleted ? 'true' : 'false');

    // Reports Array State
    const storedReports = localStorage.getItem('medlens_reports');
    this.reportsList = storedReports ? JSON.parse(storedReports) : INITIAL_USER_STATE.reports;

    // Analysis History State
    const storedHistory = localStorage.getItem('medlens_history');
    this.analysisHistory = storedHistory ? JSON.parse(storedHistory) : INITIAL_USER_STATE.analysisHistory;

    // Active Route
    this.currentPage = 'landing';
  }

  normalizeEmail(email) {
    return (email || '').toLowerCase().trim();
  }

  getUsersDb() {
    const storedDb = localStorage.getItem('medlens_users_db');
    if (storedDb) {
      try {
        return JSON.parse(storedDb) || {};
      } catch (e) {
        return {};
      }
    }
    return {};
  }

  saveUsersDb(db) {
    try {
      localStorage.setItem('medlens_users_db', JSON.stringify(db));
    } catch (e) {
      console.error('Error saving usersDb', e);
    }
  }

  isUserOnboardingCompleted(email) {
    const normEmail = this.normalizeEmail(email);
    if (normEmail) {
      const usersDb = this.getUsersDb();
      if (usersDb[normEmail] && typeof usersDb[normEmail].onboardingCompleted === 'boolean') {
        return usersDb[normEmail].onboardingCompleted;
      }
    }

    if (this.userDetails) {
      const activeNorm = this.normalizeEmail(this.userDetails.email);
      if (!normEmail || activeNorm === normEmail) {
        if (typeof this.userDetails.onboardingCompleted === 'boolean') {
          return this.userDetails.onboardingCompleted;
        }
        if (this.userDetails.dob && this.userDetails.bloodGroup) {
          return true;
        }
      }
    }

    const legacyFlag = localStorage.getItem('medlens_profile_completed');
    if (legacyFlag === 'true') {
      return true;
    }

    return false;
  }

  init() {
    window.MedLensApp = this;

    window.addEventListener('hashchange', () => {
      this.handleRouteFromHash();
    });

    this.handleRouteFromHash();

    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  handleRouteFromHash() {
    const rawHash = window.location.hash.replace('#', '').replace('/', '');
    let route = 'landing';
    
    if (['auth', 'onboarding', 'dashboard', 'home', 'reports', 'history', 'profile', 'analysis'].includes(rawHash)) {
      route = rawHash === 'home' ? 'dashboard' : rawHash;
    } else if (['hero', 'features', 'how-it-works', 'interactive-demo', 'demo'].includes(rawHash)) {
      route = rawHash;
    } else {
      route = 'landing';
    }

    this.navigateTo(route);
  }

  navigateTo(page) {
    const protectedPages = ['onboarding', 'dashboard', 'home', 'reports', 'history', 'profile', 'analysis'];

    // 1. Protected Route Guard: Requires authentication
    if (protectedPages.includes(page) && !this.isAuthenticated) {
      this.showToast('Please sign in to access MedLens.');
      this.currentPage = 'auth';
      window.location.hash = 'auth';
      this.render();
      return;
    }

    // 2. User-Specific Onboarding Guard:
    // If authenticated and this user has NOT completed onboarding, redirect to onboarding
    if (this.isAuthenticated && !this.profileCompleted && page !== 'onboarding' && page !== 'auth') {
      this.currentPage = 'onboarding';
      window.location.hash = 'onboarding';
      this.render();
      return;
    }

    // If user HAS completed onboarding and attempts to visit 'onboarding', redirect to dashboard
    if (this.isAuthenticated && this.profileCompleted && page === 'onboarding') {
      this.currentPage = 'dashboard';
      window.location.hash = 'dashboard';
      this.render();
      return;
    }

    // 3. Auth Page: Render Auth page when requested
    if (page === 'auth') {
      this.currentPage = 'auth';
      window.location.hash = 'auth';
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 4. Intro Landing Page & Section Links (DO NOT RE-RENDER if already on landing)
    if (['landing', 'hero', 'features', 'how-it-works', 'interactive-demo', 'demo'].includes(page)) {
      if (this.currentPage !== 'landing') {
        this.currentPage = 'landing';
        this.render();
      }

      if (page === 'landing' || page === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetId = page === 'demo' ? 'interactive-demo' : page;
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
      return;
    }

    // 5. Standard Core Routes (dashboard, reports, history, profile, analysis)
    const canonicalPage = page === 'home' ? 'dashboard' : page;
    this.currentPage = canonicalPage;
    window.location.hash = canonicalPage;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loginSuccess(userPartial, isFirstTime = false) {
    this.isAuthenticated = true;
    localStorage.setItem('medlens_auth', 'true');

    const normEmail = this.normalizeEmail(userPartial ? userPartial.email : '');
    const usersDb = this.getUsersDb();

    if (isFirstTime) {
      // -------------------------------------------------------------
      // NEW USER SIGN UP FLOW: Always force onboarding for new registration
      // -------------------------------------------------------------
      // Preserve previous active user's state in usersDb before switching
      if (this.userDetails && this.userDetails.email) {
        const prevEmail = this.normalizeEmail(this.userDetails.email);
        usersDb[prevEmail] = {
          ...this.userDetails,
          onboardingCompleted: this.isUserOnboardingCompleted(prevEmail)
        };
      }

      const newAccount = {
        fullName: (userPartial && userPartial.fullName) || 'New Patient',
        email: (userPartial && userPartial.email) || '',
        dob: '',
        gender: 'Female',
        bloodGroup: 'O+',
        phone: '',
        allergies: '',
        emergencyContact: '',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        ...userPartial,
        onboardingCompleted: false
      };

      if (normEmail) {
        usersDb[normEmail] = newAccount;
        this.saveUsersDb(usersDb);
      }

      this.userDetails = newAccount;
      localStorage.setItem('medlens_user', JSON.stringify(this.userDetails));

      this.profileCompleted = false;
      localStorage.setItem('medlens_profile_completed', 'false');

      this.showToast('Account created! Please complete your basic details.');
      this.navigateTo('onboarding');
      return;
    }

    // -------------------------------------------------------------
    // RETURNING USER LOGIN FLOW:
    // -------------------------------------------------------------
    if (normEmail && usersDb[normEmail]) {
      this.userDetails = { ...usersDb[normEmail] };
    } else if (normEmail && this.userDetails && this.normalizeEmail(this.userDetails.email) === normEmail) {
      this.userDetails = { ...this.userDetails };
    } else if (userPartial && userPartial.email) {
      this.userDetails = { ...this.userDetails, ...userPartial };
    }

    localStorage.setItem('medlens_user', JSON.stringify(this.userDetails));

    // Check whether THIS specific user has completed onboarding
    const hasCompleted = this.isUserOnboardingCompleted(normEmail || (this.userDetails ? this.userDetails.email : ''));
    this.profileCompleted = hasCompleted;
    localStorage.setItem('medlens_profile_completed', hasCompleted ? 'true' : 'false');

    this.showToast('Authentication Successful');

    if (hasCompleted) {
      this.navigateTo('dashboard');
    } else {
      this.navigateTo('onboarding');
    }
  }

  completeOnboarding(basicDetailsData) {
    this.userDetails = {
      ...this.userDetails,
      ...basicDetailsData,
      onboardingCompleted: true
    };
    localStorage.setItem('medlens_user', JSON.stringify(this.userDetails));

    const normEmail = this.normalizeEmail(this.userDetails.email);
    if (normEmail) {
      const usersDb = this.getUsersDb();
      usersDb[normEmail] = {
        ...(usersDb[normEmail] || {}),
        ...this.userDetails,
        onboardingCompleted: true
      };
      this.saveUsersDb(usersDb);
    }

    this.profileCompleted = true;
    localStorage.setItem('medlens_profile_completed', 'true');
    
    this.showToast('✓ Profile Setup Completed!');
    this.navigateTo('dashboard');
  }

  logout() {
    if (this.userDetails && this.userDetails.email) {
      const normEmail = this.normalizeEmail(this.userDetails.email);
      const usersDb = this.getUsersDb();
      usersDb[normEmail] = {
        ...this.userDetails,
        onboardingCompleted: this.profileCompleted === true || usersDb[normEmail]?.onboardingCompleted === true
      };
      this.saveUsersDb(usersDb);
    }

    this.isAuthenticated = false;
    localStorage.removeItem('medlens_auth');
    this.showToast('Logged out successfully.');
    this.navigateTo('auth');
  }

  getUserDetails() {
    return this.userDetails;
  }

  getUserProfile() {
    return this.userDetails;
  }

  updateUserProfile(newData) {
    this.userDetails = {
      ...this.userDetails,
      ...newData
    };
    localStorage.setItem('medlens_user', JSON.stringify(this.userDetails));

    const normEmail = this.normalizeEmail(this.userDetails.email);
    if (normEmail) {
      const usersDb = this.getUsersDb();
      usersDb[normEmail] = {
        ...(usersDb[normEmail] || {}),
        ...this.userDetails
      };
      this.saveUsersDb(usersDb);
    }

    this.render();
  }

  getReportsList() {
    return this.reportsList;
  }

  addReportFile(reportObj) {
    reportObj.id = 'rep-' + Date.now();
    this.reportsList.unshift(reportObj);
    localStorage.setItem('medlens_reports', JSON.stringify(this.reportsList));
  }

  deleteReportFile(reportId) {
    this.reportsList = this.reportsList.filter(r => r.id !== reportId);
    localStorage.setItem('medlens_reports', JSON.stringify(this.reportsList));
  }

  getAnalysisHistory() {
    return this.analysisHistory;
  }

  openModal(modalType, payload = {}) {
    if (!this.modalOverlay) return;
    renderModalContent(modalType, payload);
    this.modalOverlay.classList.remove('hidden');
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.add('hidden');
  }

  showToast(message) {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="check-circle" style="color:var(--color-light-mint);width:18px;height:18px;"></i>
      <span>${message}</span>
    `;
    this.toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  render() {
    if (!this.appContainer) return;

    switch (this.currentPage) {
      case 'landing':
        renderLandingPage(this.appContainer);
        break;

      case 'auth':
        renderAuthPage(this.appContainer);
        break;

      case 'onboarding':
        renderOnboardingPage(this.appContainer);
        break;

      case 'dashboard':
      case 'home':
        renderDashboardHomePage(this.appContainer);
        break;

      case 'reports':
        renderReportsPage(this.appContainer);
        break;

      case 'history':
        renderHistoryPage(this.appContainer);
        break;

      case 'profile':
        renderProfilePage(this.appContainer);
        break;

      case 'analysis':
        renderAnalysisPlaceholderPage(this.appContainer);
        break;

      default:
        renderLandingPage(this.appContainer);
        break;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new MedLensAppEngine();
  app.init();
});
