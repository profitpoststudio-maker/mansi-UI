/*
 * Read-only audit reproductions for the shipped MedLens bundle.
 * Executes source in an isolated Node VM with synthetic storage and a minimal
 * DOM stub. Does not modify medlens/, use the real browser's storage, or send
 * network requests. The stub cannot prove browser JavaScript execution or
 * layout; those observations are recorded separately in REPORT.md.
 * Run from the repository root: node audit/reproduce.cjs
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const bundle = fs.readFileSync(path.join(root, 'medlens/js/bundle.js'), 'utf8');
const exportMarker = '  // Start app on DOM ready';
assert.ok(bundle.includes(exportMarker), 'Expected bundle bootstrap marker');
const instrumented = bundle.replace(exportMarker, `
  globalThis.auditExports = {
    MedLensAppEngine, renderAuthPage, renderDashboardHomePage,
    renderReportsPage, renderModalContent, renderNavbar,
    INITIAL_USER_STATE, INITIAL_USER_PROFILE, DEMO_REPORTS,
    MEDICAL_EXPLANATIONS
  };
${exportMarker}`);

function attributes(text) {
  const result = {};
  for (const match of text.matchAll(/([\w-]+)\s*=\s*"([^"]*)"/g)) {
    result[match[1]] = match[2];
  }
  return result;
}

class Element {
  constructor(attrs = {}) {
    this.attrs = attrs;
    this.value = attrs.value || '';
    this.checked = true;
    this.style = {};
    this.handlers = {};
    this.children = [];
    this.nodes = [];
    this.classList = { add() {}, remove() {}, contains() { return false; } };
    this._html = '';
  }
  set innerHTML(html) {
    this._html = html;
    this.nodes = [...html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)]
      .map(match => {
        const el = new Element(attributes(match[2]));
        el.tag = match[1];
        return el;
      });
  }
  get innerHTML() { return this._html; }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  querySelectorAll(selector) {
    if (selector.startsWith('#')) {
      return this.nodes.filter(el => el.attrs.id === selector.slice(1));
    }
    if (selector.startsWith('.')) {
      return this.nodes.filter(el => (el.attrs.class || '').split(/\s+/).includes(selector.slice(1)));
    }
    const attr = selector.match(/^\[([\w-]+)\]$/);
    return attr ? this.nodes.filter(el => attr[1] in el.attrs) : [];
  }
  addEventListener(type, callback) {
    (this.handlers[type] ||= []).push(callback);
  }
  emit(type, data = {}) {
    for (const callback of this.handlers[type] || []) {
      callback({ target: this, currentTarget: this, preventDefault() {}, ...data });
    }
  }
  getAttribute(name) { return this.attrs[name] ?? null; }
  appendChild(child) { this.children.push(child); }
  remove() {}
  click() { this.emit('click'); }
  scrollIntoView() {}
}

function createEnvironment(seed = {}, options = {}) {
  const storage = options.storageMap || new Map(Object.entries(seed));
  const timers = [];
  const listeners = {};
  const observers = [];
  class VmDate extends Date {
    static now() { return options.now === undefined ? Date.now() : options.now; }
  }
  const appEl = new Element();
  const modalEl = new Element();
  const elements = {
    app: appEl,
    'toast-container': new Element(),
    'modal-container': new Element(),
    'modal-content': modalEl
  };
  const window = {
    location: { hash: '', href: 'http://127.0.0.1:8765/#reports' },
    scrollTo() {},
    addEventListener(type, callback) { (listeners[type] ||= []).push(callback); },
    removeEventListener(type, callback) {
      listeners[type] = (listeners[type] || []).filter(item => item !== callback);
    }
  };
  const context = vm.createContext({
    window,
    document: {
      readyState: 'loading',
      getElementById(id) { return elements[id] || appEl.querySelector('#' + id) || modalEl.querySelector('#' + id); },
      createElement() { return new Element(); },
      addEventListener() {}
    },
    localStorage: {
      getItem(key) {
        if (options.storageUnavailable) throw new Error('SecurityError');
        return storage.get(key) ?? null;
      },
      setItem(key, value) {
        if (options.quota && key === 'medlens_reports') throw new Error('QuotaExceededError');
        storage.set(key, String(value));
      },
      removeItem(key) { storage.delete(key); }
    },
    navigator: options.navigator || {},
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
    setTimeout(callback, ms) { timers.push({ callback, ms }); return timers.length; },
    console: { error() {}, log() {} },
    Date: VmDate
  });
  new vm.Script(instrumented, { filename: 'shipped-bundle.js' }).runInContext(context);
  const api = context.auditExports;
  function engine() {
    const app = new api.MedLensAppEngine();
    window.MedLensApp = app;
    return app;
  }
  function flushTimers() {
    for (let count = 0; timers.length && count < 100; count++) {
      timers.shift().callback();
    }
    assert.equal(timers.length, 0, 'Timer queue did not settle');
  }
  return { api, context, engine, window, storage, appEl, modalEl, timers, listeners, observers, flushTimers };
}

const results = [];
function reproduce(id, title, callback) {
  try {
    const evidence = callback();
    results.push({ id, title, reproduced: true, evidence });
  } catch (error) {
    results.push({ id, title, reproduced: false, error: error.message });
  }
}

reproduce('R01', 'The actual login form ignores passwords', () => {
  const env = createEnvironment();
  const app = env.engine();
  env.api.renderAuthPage(env.appEl);
  env.appEl.querySelector('#auth-email').value = 'audit@example.invalid';
  env.appEl.querySelector('#auth-password').value = 'x';
  env.appEl.querySelector('#auth-form').emit('submit');
  env.flushTimers();
  assert.equal(app.isAuthenticated, true);
  assert.equal(app.currentPage, 'dashboard');
  return { password: 'x', authenticated: app.isAuthenticated, route: app.currentPage };
});

reproduce('R02', 'A browser storage flag grants access on startup', () => {
  const env = createEnvironment({ medlens_auth: 'true' });
  const app = env.engine();
  app.navigateTo('dashboard');
  assert.equal(app.currentPage, 'dashboard');
  return { seed: { medlens_auth: 'true' }, route: app.currentPage };
});

reproduce('R03', 'Unknown login inherits the previous patient profile', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.loginSuccess({ fullName: 'Patient A', email: 'a@example.invalid' }, true);
  app.completeOnboarding({ dob: '2000-01-01', phone: 'SYNTHETIC-A', allergies: 'SYNTHETIC-ALLERGY' });
  app.logout();
  app.loginSuccess({ email: 'b@example.invalid' }, false);
  assert.equal(app.userDetails.email, 'b@example.invalid');
  assert.equal(app.userDetails.phone, 'SYNTHETIC-A');
  assert.equal(app.userDetails.allergies, 'SYNTHETIC-ALLERGY');
  assert.equal(app.currentPage, 'dashboard');
  return { newEmail: app.userDetails.email, inheritedName: app.userDetails.fullName,
    inheritedPhone: app.userDetails.phone, inheritedAllergies: app.userDetails.allergies, route: app.currentPage };
});

reproduce('R04', 'Reports are shared across accounts in one browser', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.loginSuccess({ email: 'a@example.invalid' }, true);
  app.addReportFile({ fileName: 'PATIENT_A_PRIVATE.pdf', name: 'Patient A', status: 'Uploaded' });
  app.logout();
  app.loginSuccess({ email: 'b@example.invalid' }, true);
  assert.ok(app.reportsList.some(report => report.fileName === 'PATIENT_A_PRIVATE.pdf'));
  return { secondAccountCanSee: app.reportsList[0].fileName };
});

reproduce('R05', 'Logout retains patient details, users database and reports', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.loginSuccess({ email: 'a@example.invalid' }, true);
  app.addReportFile({ fileName: 'SYNTHETIC_PRIVATE.pdf', name: 'Private' });
  app.logout();
  assert.equal(env.storage.has('medlens_auth'), false);
  for (const key of ['medlens_user', 'medlens_users_db', 'medlens_reports']) assert.ok(env.storage.has(key));
  return { remainingKeys: [...env.storage.keys()] };
});

reproduce('R06', 'Signing up again with the same email overwrites that account', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.loginSuccess({ fullName: 'Original', email: 'a@example.invalid' }, true);
  app.completeOnboarding({ dob: '2000-01-01', allergies: 'SYNTHETIC-ALLERGY' });
  app.loginSuccess({ fullName: 'Replacement', email: 'A@example.invalid' }, true);
  const saved = JSON.parse(env.storage.get('medlens_users_db'))['a@example.invalid'];
  assert.equal(saved.fullName, 'Replacement');
  assert.equal(saved.allergies, '');
  return { replacementName: saved.fullName, lostAllergies: saved.allergies };
});

reproduce('R07', 'Editing email can overwrite a different local account', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.loginSuccess({ fullName: 'Patient B', email: 'b@example.invalid' }, true);
  app.loginSuccess({ fullName: 'Patient A', email: 'a@example.invalid' }, true);
  app.updateUserProfile({ email: 'b@example.invalid' });
  const saved = JSON.parse(env.storage.get('medlens_users_db'))['b@example.invalid'];
  assert.equal(saved.fullName, 'Patient A');
  return { overwrittenAccount: saved.email, overwrittenWithName: saved.fullName };
});

reproduce('R08', 'Unescaped profile markup reaches innerHTML', () => {
  const env = createEnvironment();
  const app = env.engine();
  const marker = '<img src=x onerror="document.body.dataset.medlensAudit=1">';
  app.userDetails.fullName = marker;
  env.api.renderDashboardHomePage(env.appEl);
  assert.ok(env.appEl.innerHTML.includes(marker));
  env.api.renderModalContent('edit-profile', { fullName: '" autofocus onfocus="auditMarker()' });
  assert.ok(env.modalEl.innerHTML.includes('value="" autofocus onfocus="auditMarker()"'));
  return { profileMarkupUnescaped: true, formAttributeBreakout: true,
    limitation: 'DOM stub checks sink contents; browser execution is verified separately.' };
});

reproduce('R09', 'Shipped signup accepts mismatched confirmation and unchecked terms', () => {
  const env = createEnvironment();
  const app = env.engine();
  env.api.renderAuthPage(env.appEl);
  env.appEl.querySelector('#toggle-auth-mode').emit('click');
  env.appEl.querySelector('#auth-fullname').value = 'Synthetic User';
  env.appEl.querySelector('#auth-email').value = 'audit@example.invalid';
  env.appEl.querySelector('#auth-password').value = 'x';
  env.appEl.querySelector('#auth-confirm-password').value = 'different';
  env.appEl.querySelector('#auth-terms').checked = false;
  env.appEl.querySelector('#auth-form').emit('submit');
  env.flushTimers();
  assert.equal(app.isAuthenticated, true);
  assert.equal(app.currentPage, 'onboarding');
  return { authenticated: true, confirmPasswordIgnored: true, termsIgnored: true,
    limitation: 'Browser still enforces required input/email syntax before native submit.' };
});

reproduce('R10', 'Modal upload discards file content and invents its size', () => {
  const env = createEnvironment();
  const app = env.engine();
  env.api.renderModalContent('upload-report');
  const file = { name: 'audit.txt', size: 22 * 1024 * 1024, type: 'text/plain',
    arrayBuffer() { throw new Error('Content must not be accessed in this implementation'); } };
  env.modalEl.querySelector('#modal-file-input').emit('change', { target: { files: [file] } });
  const report = JSON.parse(env.storage.get('medlens_reports'))[0];
  assert.equal(report.fileName, 'audit.txt');
  assert.equal(report.fileSize, '2.2 MB');
  assert.ok(!('content' in report) && !('file' in report) && !('url' in report));
  return { actualSize: file.size, storedSize: report.fileSize, storedFields: Object.keys(report), invalidTypeAccepted: true };
});

reproduce('R11', 'Opening an unrelated uploaded report shows sample CBC values', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.addReportFile({ fileName: 'unrelated_scan.png', name: 'Unrelated scan', status: 'Uploaded' });
  env.api.renderReportsPage(env.appEl);
  env.appEl.querySelectorAll('.locker-view-btn')[0].emit('click');
  assert.ok(env.modalEl.innerHTML.includes('13.2 g/dL'));
  assert.ok(env.modalEl.innerHTML.includes('Analyzed ✓'));
  assert.ok(!env.modalEl.innerHTML.includes('unrelated_scan.png'));
  return { displayedValue: '13.2 g/dL', analyzedBadge: true, actualFileNameAbsent: true };
});

reproduce('R12', 'Malformed stored reports stop application construction', () => {
  const env = createEnvironment({ medlens_reports: '{broken' });
  assert.throws(() => env.engine(), /JSON|Unexpected|property/i);
  return { crash: 'Uncaught JSON parse error before app initialization' };
});

reproduce('R13', 'Valid JSON of the wrong shape crashes rendering', () => {
  const env = createEnvironment({ medlens_reports: '{}' });
  env.engine();
  assert.throws(() => env.api.renderReportsPage(env.appEl), /filter/);
  return { crash: 'reportsList.filter is not a function' };
});

reproduce('R14', 'Storage unavailability stops startup', () => {
  const env = createEnvironment({}, { storageUnavailable: true });
  assert.throws(() => env.engine(), /SecurityError/);
  return { crash: 'Uncaught storage access error' };
});

reproduce('R15', 'Failed report persistence leaves memory changed and storage unchanged', () => {
  const env = createEnvironment({}, { quota: true });
  const app = env.engine();
  const before = app.reportsList.length;
  assert.throws(() => app.addReportFile({ fileName: 'quota.pdf', name: 'Quota' }), /QuotaExceededError/);
  assert.equal(app.reportsList.length, before + 1);
  assert.equal(env.storage.has('medlens_reports'), false);
  return { inMemoryCount: app.reportsList.length, priorCount: before, persisted: false };
});

reproduce('R16', 'An empty locker displays 12 total reports', () => {
  const env = createEnvironment({ medlens_reports: '[]' });
  const app = env.engine();
  env.api.renderDashboardHomePage(env.appEl);
  assert.ok(env.appEl.innerHTML.includes('<div class="stat-val">12</div>'));
  assert.equal(app.reportsList.length, 0);
  return { actualReports: 0, displayedTotal: 12 };
});

reproduce('R17', 'Report IDs collide within one millisecond', () => {
  const env = createEnvironment({}, { now: 123456789 });
  const app = env.engine();
  app.addReportFile({ fileName: 'first.pdf', name: 'First' });
  app.addReportFile({ fileName: 'second.pdf', name: 'Second' });
  assert.equal(app.reportsList[0].id, app.reportsList[1].id);
  const id = app.reportsList[0].id;
  app.deleteReportFile(id);
  assert.equal(app.reportsList.filter(report => ['first.pdf', 'second.pdf'].includes(report.fileName)).length, 0);
  return { duplicateId: id, oneDeleteRemovesBoth: true };
});

reproduce('R18', 'Hidden modal HTML survives closing', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.openModal('edit-profile', { fullName: 'SYNTHETIC-PRIVATE', email: 'audit@example.invalid' });
  app.closeModal();
  assert.ok(env.modalEl.innerHTML.includes('SYNTHETIC-PRIVATE'));
  return { hiddenContentRetained: true, note: 'Actual browser keyboard focus verified separately.' };
});

reproduce('R19', 'Landing navbar registers a new scroll listener and observer on every render', () => {
  const env = createEnvironment();
  env.engine();
  const nav = new Element();
  env.api.renderNavbar(nav);
  env.api.renderNavbar(nav);
  assert.equal(env.listeners.scroll.length, 2);
  assert.equal(env.observers.length, 2);
  assert.ok(env.observers.every(observer => !observer.disconnected));
  return { renders: 2, scrollListeners: env.listeners.scroll.length, undisconnectedObservers: env.observers.length };
});

reproduce('R20', 'CBC summary counts disagree with the available rows', () => {
  const env = createEnvironment();
  const report = env.api.DEMO_REPORTS.CBC;
  const reviewRows = report.parameters.filter(parameter => parameter.status !== 'Normal').length;
  assert.equal(report.parameters.length, 4);
  assert.equal(reviewRows, 0);
  assert.equal(report.aiSummary.reviewCount, 2);
  return { summaryTotal: report.aiSummary.totalAnalyzed, visibleRows: report.parameters.length,
    summaryReview: report.aiSummary.reviewCount, visibleReview: reviewRows };
});

reproduce('R21', 'Uploading never updates analysis history', () => {
  const env = createEnvironment();
  const app = env.engine();
  const before = JSON.stringify(app.analysisHistory);
  app.addReportFile({ fileName: 'new.pdf', name: 'New' });
  assert.equal(JSON.stringify(app.analysisHistory), before);
  assert.equal(env.storage.has('medlens_history'), false);
  return { historyUnchanged: true, historyPersistenceWritten: false };
});

reproduce('R22', 'Copy link announces success without a clipboard API', () => {
  const env = createEnvironment();
  const app = env.engine();
  const toasts = [];
  app.showToast = message => toasts.push(message);
  env.api.renderModalContent('share-report', { fileName: 'audit.pdf' });
  env.modalEl.querySelector('#share-copy-link-btn').emit('click');
  assert.ok(toasts[0].includes('copied'));
  return { clipboardAvailable: false, successToast: toasts[0] };
});

reproduce('R23', 'Password toggle destroys typed form values', () => {
  const env = createEnvironment();
  env.engine();
  env.api.renderAuthPage(env.appEl);
  env.appEl.querySelector('#auth-email').value = 'audit@example.invalid';
  env.appEl.querySelector('#auth-password').value = 'synthetic-password';
  env.appEl.querySelector('#toggle-pw-btn').emit('click');
  assert.equal(env.appEl.querySelector('#auth-email').value, '');
  assert.equal(env.appEl.querySelector('#auth-password').value, '');
  return { emailAfterToggle: '', passwordAfterToggle: '' };
});

reproduce('R24', 'Delayed upload can re-render the dashboard after logout', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.loginSuccess({ email: 'audit@example.invalid' }, false);
  env.api.renderDashboardHomePage(env.appEl);
  env.appEl.querySelector('#dashboard-file-input').emit('change', { target: { files: [{ name: 'delayed.pdf' }] } });
  app.logout();
  env.flushTimers();
  assert.equal(app.isAuthenticated, false);
  assert.equal(app.currentPage, 'auth');
  assert.ok(env.appEl.innerHTML.includes('Personal Health Overview'));
  return { authenticated: false, routeState: app.currentPage, displayedPage: 'dashboard',
    uploadedAfterLogout: app.reportsList[0].fileName };
});

reproduce('R25', 'Two open tabs overwrite each other\'s report changes', () => {
  const shared = new Map([['medlens_reports', '[]']]);
  const first = createEnvironment({}, { storageMap: shared }).engine();
  const second = createEnvironment({}, { storageMap: shared }).engine();
  first.addReportFile({ fileName: 'from_tab_A.pdf', name: 'Tab A' });
  second.addReportFile({ fileName: 'from_tab_B.pdf', name: 'Tab B' });
  const saved = JSON.parse(shared.get('medlens_reports'));
  assert.equal(saved.length, 1);
  assert.equal(saved[0].fileName, 'from_tab_B.pdf');
  return { persistedFiles: saved.map(report => report.fileName), lostFile: 'from_tab_A.pdf' };
});

reproduce('R26', 'State-changing methods and modals have no authentication checks', () => {
  const env = createEnvironment();
  const app = env.engine();
  assert.equal(app.isAuthenticated, false);
  app.updateUserProfile({ fullName: 'Changed while logged out' });
  app.addReportFile({ fileName: 'unauthenticated.pdf', name: 'Unauthenticated' });
  app.openModal('edit-profile', app.getUserDetails());
  assert.equal(app.userDetails.fullName, 'Changed while logged out');
  assert.ok(env.modalEl.innerHTML.includes('Changed while logged out'));
  return { authenticated: false, profileChanged: true, reportAdded: true, profileModalAccessible: true,
    scope: 'Requires same-origin JavaScript/local access; not evidence of a remote backend exploit.' };
});

reproduce('R27', 'The modular app engine never renders its initial landing page', () => {
  const env = createEnvironment();
  const source = fs.readFileSync(path.join(root, 'medlens/js/app.js'), 'utf8').replace(/^import .*;\s*$/gm, '');
  vm.runInContext('const { INITIAL_USER_STATE, INITIAL_USER_PROFILE } = auditExports;\n' +
    source + '\nglobalThis.sourceEngine = MedLensAppEngine;', env.context);
  const sourceApp = new env.context.sourceEngine();
  let sourceRenders = 0;
  sourceApp.render = () => sourceRenders++;
  sourceApp.init();
  assert.equal(sourceRenders, 0);
  const shipped = createEnvironment();
  const shippedApp = shipped.engine();
  let shippedRenders = 0;
  shippedApp.render = () => shippedRenders++;
  shippedApp.init();
  assert.equal(shippedRenders, 1);
  return { sourceInitialRenders: sourceRenders, shippedInitialRenders: shippedRenders,
    scope: 'app.js is not currently loaded by index.html; this blocks adopting it without repair.' };
});

reproduce('R28', 'Navigating to landing leaves the dashboard URL hash behind', () => {
  const env = createEnvironment();
  const app = env.engine();
  app.loginSuccess({ email: 'audit@example.invalid' }, false);
  app.navigateTo('landing');
  assert.equal(app.currentPage, 'landing');
  assert.equal(env.window.location.hash, 'dashboard');
  return { displayedPage: app.currentPage, urlHash: env.window.location.hash };
});

reproduce('R29', 'Ten demo parameter explanation codes have no content', () => {
  const env = createEnvironment();
  const parameters = Object.values(env.api.DEMO_REPORTS).flatMap(report => report.parameters);
  const missing = parameters.filter(parameter => !env.api.MEDICAL_EXPLANATIONS[parameter.code]);
  assert.equal(parameters.length, 16);
  assert.equal(missing.length, 10);
  return { parameters: parameters.length, missingExplanationCodes: missing.map(parameter => parameter.code) };
});

const output = {
  bundleSha256: crypto.createHash('sha256').update(bundle).digest('hex'),
  method: 'Isolated VM against shipped bundle, minimal DOM stub, synthetic in-memory storage, no network',
  reproduced: results.filter(result => result.reproduced).length,
  total: results.length,
  results
};
process.stdout.write(JSON.stringify(output, null, 2) + '\n');
process.exitCode = output.reproduced === output.total ? 0 : 1;
