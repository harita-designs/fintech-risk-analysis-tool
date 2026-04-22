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

// Financial time-series data for TechCorp Solutions (BRW-001)
export const techCorpFinancials = {
  quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
  revenue:  [75, 72, 65, 50, 40],   // normalised 0–100
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
  {
    id: 1, severity: 'critical', icon: 'x',
    title: 'Cash Flow', impact: '22% impact', date: '2/19/2026',
    desc: 'Significant decline in cash flow generation',
  },
  {
    id: 2, severity: 'warning', icon: 'alert',
    title: 'Market Conditions', impact: '15% impact', date: '2/19/2026',
    desc: 'Retail sector facing headwinds',
  },
  {
    id: 3, severity: 'warning', icon: 'alert',
    title: 'Liquidity', impact: '13% impact', date: '2/19/2026',
    desc: 'Liquidity ratio approaching critical level',
  },
  {
    id: 4, severity: 'warning', icon: 'alert',
    title: 'Debt Service Coverage', impact: '10% impact', date: '2/15/2026',
    desc: 'DSCR falling below 1.25x threshold',
  },
  {
    id: 5, severity: 'warning', icon: 'alert',
    title: 'Revenue Decline', impact: '9% impact', date: '2/10/2026',
    desc: 'Consecutive quarterly revenue decline detected',
  },
];

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
