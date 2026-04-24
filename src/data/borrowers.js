export const borrowers = [
  {
    id: 'BRW-001', name: 'TechCorp Solutions Inc.', industry: 'Technology',
    lastReview: '2/14/2026', riskScore: 41, riskLevel: 'HIGH', status: 'Review Needed',
    revenue: '$89.2M', revTrend: '8.7%', revUp: false,
    cashFlow: '$4.1M', cfTrend: '22.1%', cfUp: false,
    debt: '$54.8M', debtRatio: 'D/I: 61%',
    liquidity: '1.12x', liquidityLabel: 'Weak', liquidityGood: false,
    alerts: 5, alertLabel: 'Critical', alertGood: false,
  },
  {
    id: 'BRW-002', name: 'GreenEnergy Partners LLC', industry: 'Energy',
    lastReview: '1/15/2026', riskScore: 68, riskLevel: 'MEDIUM', status: 'Stable',
    revenue: '$124.5M', revTrend: '5.2%', revUp: true,
    cashFlow: '$12.3M', cfTrend: '3.1%', cfUp: true,
    debt: '$67.2M', debtRatio: 'D/I: 54%',
    liquidity: '1.85x', liquidityLabel: 'Good', liquidityGood: true,
    alerts: 1, alertLabel: 'Low', alertGood: true,
  },
  {
    id: 'BRW-003', name: 'Metro Real Estate LLC', industry: 'Real Estate',
    lastReview: '3/01/2026', riskScore: 82, riskLevel: 'LOW', status: 'Compliant',
    revenue: '$210.0M', revTrend: '8.1%', revUp: true,
    cashFlow: '$31.7M', cfTrend: '12.4%', cfUp: true,
    debt: '$145.0M', debtRatio: 'D/I: 69%',
    liquidity: '2.14x', liquidityLabel: 'Strong', liquidityGood: true,
    alerts: 0, alertLabel: 'None', alertGood: true,
  },
  {
    id: 'BRW-004', name: 'HealthFirst Medical Group', industry: 'Healthcare',
    lastReview: '12/10/2025', riskScore: 29, riskLevel: 'HIGH', status: 'Review Needed',
    revenue: '$58.3M', revTrend: '14.2%', revUp: false,
    cashFlow: '$2.8M', cfTrend: '31.5%', cfUp: false,
    debt: '$43.1M', debtRatio: 'D/I: 74%',
    liquidity: '0.94x', liquidityLabel: 'Critical', liquidityGood: false,
    alerts: 8, alertLabel: 'Critical', alertGood: false,
  },
  {
    id: 'BRW-005', name: 'AutoDrive Corporation', industry: 'Automotive',
    lastReview: '2/28/2026', riskScore: 55, riskLevel: 'MEDIUM', status: 'Stable',
    revenue: '$312.7M', revTrend: '2.8%', revUp: true,
    cashFlow: '$18.4M', cfTrend: '1.5%', cfUp: false,
    debt: '$198.2M', debtRatio: 'D/I: 63%',
    liquidity: '1.42x', liquidityLabel: 'Fair', liquidityGood: true,
    alerts: 3, alertLabel: 'Moderate', alertGood: false,
  },
  {
    id: 'BRW-006', name: 'FoodChain Global Inc.', industry: 'Food & Beverage',
    lastReview: '1/20/2026', riskScore: 77, riskLevel: 'LOW', status: 'Compliant',
    revenue: '$445.1M', revTrend: '6.9%', revUp: true,
    cashFlow: '$42.6M', cfTrend: '9.3%', cfUp: true,
    debt: '$112.4M', debtRatio: 'D/I: 25%',
    liquidity: '2.61x', liquidityLabel: 'Strong', liquidityGood: true,
    alerts: 0, alertLabel: 'None', alertGood: true,
  },
  {
    id: 'BRW-007', name: 'TechStartup Ventures Inc.', industry: 'Technology',
    lastReview: '2/05/2026', riskScore: 18, riskLevel: 'HIGH', status: 'Review Needed',
    revenue: '$22.4M', revTrend: '28.4%', revUp: false,
    cashFlow: '-$1.2M', cfTrend: '—', cfUp: false,
    debt: '$31.8M', debtRatio: 'D/I: 142%',
    liquidity: '0.71x', liquidityLabel: 'Critical', liquidityGood: false,
    alerts: 12, alertLabel: 'Critical', alertGood: false,
  },
  {
    id: 'BRW-008', name: 'RetailMax Group Holdings', industry: 'Retail',
    lastReview: '3/15/2026', riskScore: 63, riskLevel: 'MEDIUM', status: 'Stable',
    revenue: '$178.9M', revTrend: '1.1%', revUp: true,
    cashFlow: '$9.7M', cfTrend: '4.4%', cfUp: false,
    debt: '$89.5M', debtRatio: 'D/I: 50%',
    liquidity: '1.57x', liquidityLabel: 'Fair', liquidityGood: true,
    alerts: 2, alertLabel: 'Low', alertGood: true,
  },
];

// ─── TechCorp Solutions (BRW-001) ───────────────────────────────────────────

export const techCorpFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [75, 72, 65, 50, 40],
  cashFlow: [66, 60, 52, 43, 36],
  debt:     [52, 55, 53, 46, 39],
};

export const techCorpRiskProfile = [
  { label: 'Revenue Growth', pct: 18.5 },
  { label: 'Cash Flow',      pct: 12.2 },
  { label: 'Liquidity',      pct: 23.7 },
  { label: 'Leverage',       pct:  1.8 },
  { label: 'Stability',      pct:  8.0 },
];

export const techCorpSignals = [
  { id: 1, severity: 'critical', icon: 'x',     title: 'Cash Flow',             impact: '22% impact', date: '2/19/2026', desc: 'Significant decline in cash flow generation' },
  { id: 2, severity: 'warning',  icon: 'alert', title: 'Market Conditions',     impact: '15% impact', date: '2/19/2026', desc: 'Retail sector facing headwinds' },
  { id: 3, severity: 'warning',  icon: 'alert', title: 'Liquidity',             impact: '13% impact', date: '2/19/2026', desc: 'Liquidity ratio approaching critical level' },
  { id: 4, severity: 'warning',  icon: 'alert', title: 'Debt Service Coverage', impact: '10% impact', date: '2/15/2026', desc: 'DSCR falling below 1.25x threshold' },
  { id: 5, severity: 'warning',  icon: 'alert', title: 'Revenue Decline',       impact: '9% impact',  date: '2/10/2026', desc: 'Consecutive quarterly revenue decline detected' },
];

// ─── GreenEnergy Partners (BRW-002) ─────────────────────────────────────────

const greenEnergyFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [62, 65, 67, 70, 68],
  cashFlow: [55, 57, 59, 62, 60],
  debt:     [60, 58, 57, 55, 54],
};

const greenEnergyRiskProfile = [
  { label: 'Revenue Growth', pct: 52.0 },
  { label: 'Cash Flow',      pct: 48.5 },
  { label: 'Liquidity',      pct: 65.2 },
  { label: 'Leverage',       pct: 38.4 },
  { label: 'Stability',      pct: 55.0 },
];

const greenEnergySignals = [
  { id: 1, severity: 'warning', icon: 'alert', title: 'Interest Rate Sensitivity', impact: '8% impact', date: '2/10/2026', desc: 'Rising interest rates increasing project financing costs' },
];

// ─── Metro Real Estate (BRW-003) ────────────────────────────────────────────

const metroFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [70, 73, 76, 79, 82],
  cashFlow: [65, 68, 70, 73, 75],
  debt:     [52, 50, 48, 46, 44],
};

const metroRiskProfile = [
  { label: 'Revenue Growth', pct: 72.0 },
  { label: 'Cash Flow',      pct: 68.5 },
  { label: 'Liquidity',      pct: 75.2 },
  { label: 'Leverage',       pct: 45.0 },
  { label: 'Stability',      pct: 80.0 },
];

const metroSignals = [];

// ─── HealthFirst Medical (BRW-004) ───────────────────────────────────────────

const healthFirstFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [55, 50, 45, 38, 32],
  cashFlow: [38, 32, 25, 18, 12],
  debt:     [52, 56, 61, 68, 74],
};

const healthFirstRiskProfile = [
  { label: 'Revenue Growth', pct: 12.0 },
  { label: 'Cash Flow',      pct:  8.5 },
  { label: 'Liquidity',      pct:  9.4 },
  { label: 'Leverage',       pct:  5.0 },
  { label: 'Stability',      pct: 11.0 },
];

const healthFirstSignals = [
  { id: 1, severity: 'critical', icon: 'x',     title: 'Revenue Decline',        impact: '31% impact', date: '2/20/2026', desc: 'Consecutive quarterly revenue decline across key service lines' },
  { id: 2, severity: 'critical', icon: 'x',     title: 'Cash Flow Crisis',       impact: '28% impact', date: '2/18/2026', desc: 'Cash flow approaching critical minimum threshold' },
  { id: 3, severity: 'critical', icon: 'x',     title: 'Debt Ratio Surge',       impact: '25% impact', date: '2/15/2026', desc: 'Debt-to-income ratio at 74%, approaching covenant limits' },
  { id: 4, severity: 'warning',  icon: 'alert', title: 'Regulatory Compliance',  impact: '18% impact', date: '2/12/2026', desc: 'Pending regulatory audit may significantly impact operations' },
  { id: 5, severity: 'warning',  icon: 'alert', title: 'Staffing Shortages',     impact: '15% impact', date: '2/08/2026', desc: 'Critical staffing levels affecting patient service capacity' },
  { id: 6, severity: 'warning',  icon: 'alert', title: 'Insurance Cost Surge',   impact: '12% impact', date: '2/05/2026', desc: 'Medical malpractice insurance premiums increased 35% YoY' },
  { id: 7, severity: 'warning',  icon: 'alert', title: 'Patient Volume Decline', impact: '10% impact', date: '1/28/2026', desc: 'Inpatient volumes down 18% year-over-year' },
  { id: 8, severity: 'warning',  icon: 'alert', title: 'Equipment Obsolescence', impact:  '8% impact', date: '1/20/2026', desc: 'Critical diagnostic equipment approaching end-of-life' },
];

// ─── AutoDrive Corporation (BRW-005) ─────────────────────────────────────────

const autoDriveFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [68, 68, 70, 71, 70],
  cashFlow: [55, 56, 54, 57, 55],
  debt:     [72, 70, 68, 67, 66],
};

const autoDriveRiskProfile = [
  { label: 'Revenue Growth', pct: 45.0 },
  { label: 'Cash Flow',      pct: 42.0 },
  { label: 'Liquidity',      pct: 55.0 },
  { label: 'Leverage',       pct: 28.5 },
  { label: 'Stability',      pct: 50.0 },
];

const autoDriveSignals = [
  { id: 1, severity: 'warning', icon: 'alert', title: 'Supply Chain Disruption', impact: '12% impact', date: '2/15/2026', desc: 'Semiconductor shortage impacting production schedules' },
  { id: 2, severity: 'warning', icon: 'alert', title: 'EV Transition Costs',     impact:  '9% impact', date: '2/08/2026', desc: 'Capital expenditure for EV platform development exceeding budget' },
  { id: 3, severity: 'warning', icon: 'alert', title: 'Margin Compression',      impact:  '7% impact', date: '1/30/2026', desc: 'Raw material cost increases compressing operating margins' },
];

// ─── FoodChain Global (BRW-006) ──────────────────────────────────────────────

const foodChainFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [74, 76, 78, 80, 82],
  cashFlow: [68, 70, 72, 73, 75],
  debt:     [32, 30, 28, 26, 24],
};

const foodChainRiskProfile = [
  { label: 'Revenue Growth', pct: 78.0 },
  { label: 'Cash Flow',      pct: 74.5 },
  { label: 'Liquidity',      pct: 82.0 },
  { label: 'Leverage',       pct: 60.0 },
  { label: 'Stability',      pct: 85.0 },
];

const foodChainSignals = [];

// ─── TechStartup Ventures (BRW-007) ──────────────────────────────────────────

const techStartupFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [42, 39, 33, 26, 20],
  cashFlow: [30, 24, 16, 10,  5],
  debt:     [58, 65, 73, 81, 88],
};

const techStartupRiskProfile = [
  { label: 'Revenue Growth', pct:  5.0 },
  { label: 'Cash Flow',      pct:  3.5 },
  { label: 'Liquidity',      pct:  4.2 },
  { label: 'Leverage',       pct:  2.0 },
  { label: 'Stability',      pct:  4.0 },
];

const techStartupSignals = [
  { id:  1, severity: 'critical', icon: 'x',     title: 'Negative Cash Flow',         impact: '35% impact', date: '2/22/2026', desc: 'Burn rate exceeds runway projections for consecutive quarters' },
  { id:  2, severity: 'critical', icon: 'x',     title: 'Covenant Breach',            impact: '30% impact', date: '2/20/2026', desc: 'All financial covenants in breach for more than 3 quarters' },
  { id:  3, severity: 'critical', icon: 'x',     title: 'Debt Exceeds 100% D/I',      impact: '28% impact', date: '2/18/2026', desc: 'Debt-to-income at 142%, far exceeding sustainable levels' },
  { id:  4, severity: 'critical', icon: 'x',     title: 'Revenue Decline Accelerates', impact: '25% impact', date: '2/15/2026', desc: 'Revenue declining at 28.4% — accelerating beyond prior forecasts' },
  { id:  5, severity: 'critical', icon: 'x',     title: 'Liquidity Crisis',           impact: '22% impact', date: '2/12/2026', desc: 'Current ratio at 0.71x, insufficient to cover short-term obligations' },
  { id:  6, severity: 'warning',  icon: 'alert', title: 'Customer Churn',             impact: '18% impact', date: '2/08/2026', desc: 'Enterprise customer cancellations up 45% in last 60 days' },
  { id:  7, severity: 'warning',  icon: 'alert', title: 'Leadership Instability',     impact: '15% impact', date: '2/05/2026', desc: 'Key executive team instability noted in last board meeting' },
  { id:  8, severity: 'warning',  icon: 'alert', title: 'Fundraising Challenges',     impact: '14% impact', date: '2/02/2026', desc: 'Series C delayed — 3 lead investors declined term sheets' },
  { id:  9, severity: 'warning',  icon: 'alert', title: 'Market Share Erosion',       impact: '12% impact', date: '1/28/2026', desc: 'Losing market position to two well-funded competitors' },
  { id: 10, severity: 'warning',  icon: 'alert', title: 'R&D Stagnation',             impact: '10% impact', date: '1/22/2026', desc: 'Product development cycle extended 6+ months due to resource cuts' },
  { id: 11, severity: 'warning',  icon: 'alert', title: 'Vendor Payment Delays',      impact:  '8% impact', date: '1/15/2026', desc: 'Accounts payable aging beyond 90 days for key vendors' },
  { id: 12, severity: 'warning',  icon: 'alert', title: 'Talent Attrition',           impact:  '7% impact', date: '1/08/2026', desc: 'Engineering headcount down 30% from peak levels' },
];

// ─── RetailMax Group (BRW-008) ───────────────────────────────────────────────

const retailMaxFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [62, 63, 64, 65, 63],
  cashFlow: [50, 51, 49, 52, 50],
  debt:     [55, 54, 53, 52, 52],
};

const retailMaxRiskProfile = [
  { label: 'Revenue Growth', pct: 40.0 },
  { label: 'Cash Flow',      pct: 38.5 },
  { label: 'Liquidity',      pct: 48.0 },
  { label: 'Leverage',       pct: 32.0 },
  { label: 'Stability',      pct: 45.0 },
];

const retailMaxSignals = [
  { id: 1, severity: 'warning', icon: 'alert', title: 'E-Commerce Disruption',  impact: '10% impact', date: '2/18/2026', desc: 'Online competition eroding in-store traffic by 12% YoY' },
  { id: 2, severity: 'warning', icon: 'alert', title: 'Inventory Management',   impact:  '7% impact', date: '2/05/2026', desc: 'Excess inventory levels increasing carrying costs' },
];

// ─── Lookup map by borrower ID ────────────────────────────────────────────────

export const borrowerDetailData = {
  'BRW-001': { financials: techCorpFinancials,    riskProfile: techCorpRiskProfile,    signals: techCorpSignals },
  'BRW-002': { financials: greenEnergyFinancials, riskProfile: greenEnergyRiskProfile, signals: greenEnergySignals },
  'BRW-003': { financials: metroFinancials,        riskProfile: metroRiskProfile,       signals: metroSignals },
  'BRW-004': { financials: healthFirstFinancials,  riskProfile: healthFirstRiskProfile, signals: healthFirstSignals },
  'BRW-005': { financials: autoDriveFinancials,    riskProfile: autoDriveRiskProfile,   signals: autoDriveSignals },
  'BRW-006': { financials: foodChainFinancials,    riskProfile: foodChainRiskProfile,   signals: foodChainSignals },
  'BRW-007': { financials: techStartupFinancials,  riskProfile: techStartupRiskProfile, signals: techStartupSignals },
  'BRW-008': { financials: retailMaxFinancials,    riskProfile: retailMaxRiskProfile,   signals: retailMaxSignals },
};

export const riskColor = (level) => {
  if (level === 'HIGH')   return '#e9000b';
  if (level === 'MEDIUM') return '#d69200';
  return '#05c04b';
};

export const statusStyle = (status) => {
  if (status === 'Review Needed') return { bg: '#fef3c6', color: '#d69200', border: '#d69200' };
  if (status === 'Compliant')     return { bg: '#dcfce7', color: '#15803d', border: '#15803d' };
  return { bg: '#dbeafe', color: '#1d4ed8', border: '#1d4ed8' };
};
