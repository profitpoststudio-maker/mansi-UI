
// MEDLENS - MOCK DATA & KNOWLEDGE BASE


export const INITIAL_USER_PROFILE = {
  fullName: 'Anshika Sharma',
  email: 'anshika@example.com',
  dob: '26 Oct 2001',
  gender: 'Female',
  bloodGroup: 'O+',
  phone: '+91 98765 43210',
  allergies: 'Penicillin, Dust',
  emergencyContact: 'Sunita Sharma(+91 98765 00000)',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
};

export const INITIAL_USER_STATE = {
  isAuthenticated: false,
  profileCompleted: false, // Set false for first-time onboarding flow
  basicDetails: { ...INITIAL_USER_PROFILE },
  reports: [
    {
      id: 'rep-101',
      fileName: 'Blood_Test_Aug_2026.pdf',
      name: 'Blood Test Aug 2026',
      reportType: 'Complete Blood Panel',
      fileSize: '2.4 MB',
      uploadDate: '20 Aug 2026',
      date: '20 Aug 2026',
      status: 'Uploaded',
      badgeClass: 'badge-normal',
      demoTabKey: 'Blood Sugar'
    },
    {
      id: 'rep-102',
      fileName: 'CBC_Report_July_2026.pdf',
      name: 'CBC Report July 2026',
      reportType: 'CBC Lab Report',
      fileSize: '1.8 MB',
      uploadDate: '15 Jul 2026',
      date: '15 Jul 2026',
      status: 'Uploaded',
      badgeClass: 'badge-normal',
      demoTabKey: 'CBC'
    },
    {
      id: 'rep-103',
      fileName: 'Liver_Function_June_2026.pdf',
      name: 'Liver Function June 2026',
      reportType: 'LFT Panel',
      fileSize: '3.1 MB',
      uploadDate: '03 Jun 2026',
      date: '03 Jun 2026',
      status: 'Uploaded',
      badgeClass: 'badge-normal',
      demoTabKey: 'Liver'
    },
    {
      id: 'rep-104',
      fileName: 'Renal_Screening_May_2026.pdf',
      name: 'Renal Screening May 2026',
      reportType: 'Kidney Function Test',
      fileSize: '2.1 MB',
      uploadDate: '20 May 2026',
      date: '20 May 2026',
      status: 'Uploaded',
      badgeClass: 'badge-normal',
      demoTabKey: 'Kidney'
    }
  ],
  analysisHistory: [
    {
      id: 'his-201',
      title: 'CBC Report',
      name: 'CBC Report Analysis',
      date: '18 Sep 2026',
      status: 'Completed',
      summary: 'Analysis completed. 12 parameters verified. Hemoglobin and cell counts healthy.'
    },
    {
      id: 'his-202',
      title: 'Blood Sugar Report',
      name: 'Blood Sugar Report Analysis',
      date: '12 Sep 2026',
      status: 'Completed',
      summary: 'Analysis completed. Fasting blood sugar slightly elevated at 108 mg/dL.'
    },
    {
      id: 'his-203',
      title: 'Vitamin & Liver Panel',
      name: 'Vitamin & Liver Panel Analysis',
      date: '03 Jun 2026',
      status: 'Completed',
      summary: 'Analysis completed. Liver enzymes within normal optimal baseline limits.'
    }
  ]
};

export const RECENT_REPORTS = [
  {
    id: 'rep-001',
    name: 'Complete Blood Count (CBC)',
    fileName: 'CBC_Report_Sept_2026.pdf',
    date: '18 Sep 2026',
    uploadDate: '18 Sep 2026',
    status: 'Normal',
    badgeClass: 'badge-normal',
    demoTabKey: 'CBC',
    reportType: 'Blood Report',
    fileSize: '2.4 MB'
  },
  {
    id: 'rep-002',
    name: 'Fasting Blood Glucose & HbA1c',
    fileName: 'Glucose_Panel_Aug_2026.pdf',
    date: '28 Aug 2026',
    uploadDate: '28 Aug 2026',
    status: 'Review',
    badgeClass: 'badge-review',
    demoTabKey: 'Blood Sugar',
    reportType: 'Metabolic Panel',
    fileSize: '1.8 MB'
  },
  {
    id: 'rep-003',
    name: 'Liver Function Panel (LFT)',
    fileName: 'LFT_Report_June_2026.pdf',
    date: '03 Jun 2026',
    uploadDate: '03 Jun 2026',
    status: 'Normal',
    badgeClass: 'badge-normal',
    demoTabKey: 'Liver',
    reportType: 'Hepatic Panel',
    fileSize: '3.1 MB'
  },
  {
    id: 'rep-004',
    name: 'Renal Function Test (KFT)',
    fileName: 'Renal_Panel_May_2026.pdf',
    date: '20 May 2026',
    uploadDate: '20 May 2026',
    status: 'Normal',
    badgeClass: 'badge-normal',
    demoTabKey: 'Kidney',
    reportType: 'Renal Panel',
    fileSize: '2.2 MB'
  }
];

export const TIMELINE_EVENTS = [
  { id: 'evt-1', date: '18 Sep 2026', title: 'Complete Blood Count (CBC) Uploaded', status: 'Completed' },
  { id: 'evt-2', date: '28 Aug 2026', title: 'Blood Glucose Test Flagged for Review (108 mg/dL)', status: 'Review' },
  { id: 'evt-3', date: '15 Jul 2026', title: 'Routine Health Checkup Completed', status: 'Normal' },
  { id: 'evt-4', date: '03 Jun 2026', title: 'Liver Function Test All Normal', status: 'Normal' },
  { id: 'evt-5', date: '20 May 2026', title: 'Kidney Function Screening Normal', status: 'Normal' }
];

export const DEMO_REPORTS = {
  CBC: {
    title: 'Complete Blood Count (CBC)',
    date: '28 Aug 2026',
    aiSummary: {
      totalAnalyzed: 12,
      normalCount: 10,
      reviewCount: 2,
      note: 'All primary blood cell counts are within normal reference ranges. Hemoglobin and Platelets are healthy.'
    },
    parameters: [
      { name: 'Hemoglobin', value: '13.2 g/dL', status: 'Normal', range: '12.0 - 15.5 g/dL', fillWidth: '70%', fillClass: 'fill-emerald', code: 'hb' },
      { name: 'WBC (White Blood Cells)', value: '8,200 /µL', status: 'Normal', range: '4,000 - 11,000 /µL', fillWidth: '60%', fillClass: 'fill-emerald', code: 'wbc' },
      { name: 'Platelets', value: '220,000 /µL', status: 'Normal', range: '150,000 - 450,000 /µL', fillWidth: '50%', fillClass: 'fill-emerald', code: 'plt' },
      { name: 'RBC (Red Blood Cells)', value: '4.5 M/µL', status: 'Normal', range: '4.0 - 5.2 M/µL', fillWidth: '65%', fillClass: 'fill-emerald', code: 'rbc' }
    ]
  },
  'Blood Sugar': {
    title: 'Fasting Blood Sugar & HbA1c',
    date: '28 Aug 2026',
    aiSummary: {
      totalAnalyzed: 4,
      normalCount: 2,
      reviewCount: 2,
      note: 'Fasting Glucose is slightly above optimal baseline (108 mg/dL). Continued monitoring recommended.'
    },
    parameters: [
      { name: 'Fasting Blood Glucose', value: '108 mg/dL', status: 'Review', range: '70 - 99 mg/dL', fillWidth: '82%', fillClass: 'fill-amber', code: 'glucose' },
      { name: 'HbA1c (Glycated Hb)', value: '5.6 %', status: 'Normal', range: '< 5.7 %', fillWidth: '55%', fillClass: 'fill-emerald', code: 'hba1c' },
      { name: 'Post-Prandial Glucose', value: '135 mg/dL', status: 'Normal', range: '< 140 mg/dL', fillWidth: '70%', fillClass: 'fill-emerald', code: 'ppg' },
      { name: 'Fasting Insulin', value: '14.2 µIU/mL', status: 'Review', range: '2.6 - 11.1 µIU/mL', fillWidth: '85%', fillClass: 'fill-amber', code: 'insulin' }
    ]
  },
  Liver: {
    title: 'Liver Function Panel (LFT)',
    date: '03 Jun 2026',
    aiSummary: {
      totalAnalyzed: 6,
      normalCount: 6,
      reviewCount: 0,
      note: 'Liver enzymes (ALT, AST, Bilirubin) are fully optimal with no markers of inflammation.'
    },
    parameters: [
      { name: 'ALT (SGPT)', value: '24 U/L', status: 'Normal', range: '7 - 56 U/L', fillWidth: '45%', fillClass: 'fill-emerald', code: 'alt' },
      { name: 'AST (SGOT)', value: '28 U/L', status: 'Normal', range: '10 - 40 U/L', fillWidth: '50%', fillClass: 'fill-emerald', code: 'ast' },
      { name: 'Bilirubin Total', value: '0.8 mg/dL', status: 'Normal', range: '0.1 - 1.2 mg/dL', fillWidth: '40%', fillClass: 'fill-emerald', code: 'bili' },
      { name: 'Alkaline Phosphatase', value: '72 U/L', status: 'Normal', range: '44 - 147 U/L', fillWidth: '55%', fillClass: 'fill-emerald', code: 'alp' }
    ]
  },
  Kidney: {
    title: 'Renal Function Test (KFT)',
    date: '20 May 2026',
    aiSummary: {
      totalAnalyzed: 5,
      normalCount: 5,
      reviewCount: 0,
      note: 'Kidney filtration and electrolyte levels demonstrate normal healthy renal clearing.'
    },
    parameters: [
      { name: 'Serum Creatinine', value: '0.85 mg/dL', status: 'Normal', range: '0.59 - 1.04 mg/dL', fillWidth: '50%', fillClass: 'fill-emerald', code: 'creat' },
      { name: 'Blood Urea Nitrogen (BUN)', value: '14 mg/dL', status: 'Normal', range: '7 - 20 mg/dL', fillWidth: '48%', fillClass: 'fill-emerald', code: 'bun' },
      { name: 'eGFR', value: '110 mL/min', status: 'Normal', range: '> 90 mL/min', fillWidth: '90%', fillClass: 'fill-emerald', code: 'egfr' },
      { name: 'Serum Sodium', value: '140 mEq/L', status: 'Normal', range: '136 - 145 mEq/L', fillWidth: '60%', fillClass: 'fill-emerald', code: 'sodium' }
    ]
  }
};

export const MEDICAL_EXPLANATIONS = {
  hb: {
    title: 'Hemoglobin (Hb)',
    category: 'Hematology',
    summary: 'Hemoglobin is an iron-rich protein in red blood cells that carries oxygen from your lungs to the rest of your body.',
    normalRange: '12.0 - 15.5 g/dL (Females) / 13.8 - 17.2 g/dL (Males)',
    whatItMeans: 'A normal level means your organs and tissues receive adequate oxygen. Low levels may indicate anemia or iron deficiency.',
    lifestyleTip: 'Include iron-rich foods like spinach, lentils, beans, and lean meats in your diet along with Vitamin C for absorption.'
  },
  wbc: {
    title: 'White Blood Cell Count (WBC)',
    category: 'Hematology',
    summary: 'White blood cells are a key part of your body’s immune system, defending against infections and disease.',
    normalRange: '4,000 - 11,000 cells per microliter (/µL)',
    whatItMeans: 'Normal counts indicate a balanced immune system. Elevated counts can signal an active infection, stress, or inflammation.',
    lifestyleTip: 'Ensure adequate sleep, maintain good hygiene, and eat antioxidant-rich fruits to support immune resilience.'
  },
  glucose: {
    title: 'Fasting Blood Glucose',
    category: 'Metabolism',
    summary: 'Measures the concentration of sugar (glucose) in your blood after fasting for at least 8 hours.',
    normalRange: '70 - 99 mg/dL (Fasting)',
    whatItMeans: 'Levels between 100-125 mg/dL suggest impaired fasting glucose (pre-diabetes range). Values over 126 mg/dL warrant clinical review.',
    lifestyleTip: 'Engage in 30 minutes of daily physical activity, reduce refined sugar intake, and emphasize complex fiber foods.'
  },
  hba1c: {
    title: 'HbA1c (Glycated Hemoglobin)',
    category: 'Metabolism',
    summary: 'Provides an average of your blood sugar levels over the past 2 to 3 months.',
    normalRange: 'Below 5.7%',
    whatItMeans: '5.7% to 6.4% indicates prediabetes. 6.5% or higher indicates diabetes. Maintaining normal levels reduces cardiovascular risk.',
    lifestyleTip: 'Consistent low-glycemic dietary choices help maintain stable long-term blood glucose equilibrium.'
  },
  alt: {
    title: 'Alanine Aminotransferase (ALT)',
    category: 'Hepatic / Liver',
    summary: 'An enzyme found mainly in the liver. When liver cells are damaged, they release ALT into the bloodstream.',
    normalRange: '7 - 56 U/L',
    whatItMeans: 'Normal levels suggest healthy liver cell integrity. Elevated ALT can occur with alcohol use, fatty liver, or medications.',
    lifestyleTip: 'Limit alcohol consumption, stay well hydrated, and maintain a balanced weight.'
  },
  creat: {
    title: 'Serum Creatinine',
    category: 'Renal / Kidney',
    summary: 'A waste product from muscle breakdown that is filtered out of the blood by healthy kidneys.',
    normalRange: '0.59 - 1.04 mg/dL',
    whatItMeans: 'Normal creatinine shows your kidneys are effectively clearing waste. High levels may indicate decreased kidney function.',
    lifestyleTip: 'Drink plenty of water daily and avoid excessive over-the-counter painkiller (NSAID) usage without consulting your physician.'
  }
};
