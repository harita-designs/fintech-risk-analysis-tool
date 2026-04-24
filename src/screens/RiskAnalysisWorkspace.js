import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BorrowerHeader from '../components/BorrowerHeader';
import TabNav from '../components/TabNav';
import MetricCards from '../components/MetricCards';
import FinancialChart from '../components/FinancialChart';
import RiskProfileChart from '../components/RiskProfileChart';
import RiskSignals from '../components/RiskSignals';
import FinancialPerformanceTab from '../components/FinancialPerformanceTab';
import RiskSignalsTab from '../components/RiskSignalsTab';
import ContextualInsightsTab from '../components/ContextualInsightsTab';
import { borrowerDetailData, techCorpFinancials, techCorpRiskProfile, techCorpSignals } from '../data/borrowers';

const FALLBACK = { financials: techCorpFinancials, riskProfile: techCorpRiskProfile, signals: techCorpSignals };

function OverviewTab({ financials, riskProfile, signals }) {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 25 }}>
        <FinancialChart data={financials} />
        <RiskProfileChart metrics={riskProfile} />
      </div>
      <div style={{ flex: '0 0 515px' }}>
        <RiskSignals signals={signals} totalCount={signals.length} />
      </div>
    </div>
  );
}

function ComingSoonTab() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: 320,
      background: 'linear-gradient(116.96deg, rgba(40,113,250,0.04) 0%, rgba(103,23,205,0.04) 100%)',
      borderRadius: 30,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(40,113,250,0.12) 0%, rgba(103,23,205,0.12) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#6717cd" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M12 8v4M12 16h.01" stroke="#6717cd" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
          </svg>
        </div>
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 600,
          color: '#081732', letterSpacing: '0.07px',
        }}>
          Details coming soon
        </span>
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 400,
          color: 'rgba(8,23,50,0.45)', letterSpacing: '-0.1px',
        }}>
          Full data for this profile is being prepared.
        </span>
      </div>
    </div>
  );
}

export default function RiskAnalysisWorkspace({ borrower, onBack }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const isTechCorp = borrower?.id === 'BRW-001';
  const detail = borrowerDetailData[borrower?.id] || FALLBACK;

  const renderTab = () => {
    if (!isTechCorp) return <ComingSoonTab />;
    switch (activeTab) {
      case 'Overview':              return <OverviewTab financials={detail.financials} riskProfile={detail.riskProfile} signals={detail.signals} />;
      case 'Financial Performance': return <FinancialPerformanceTab />;
      case 'Risk Signals':          return <RiskSignalsTab />;
      case 'Contextual Insights':   return <ContextualInsightsTab />;
      default:                      return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fefdff', display: 'flex', flexDirection: 'column' }}>
      <Navbar onBack={onBack} />

      <div style={{ flex: 1, background: '#fefdff', padding: '0 10px' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 25,
          padding: '30px 0',
        }}>
          <BorrowerHeader borrower={borrower} onBack={onBack} />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {isTechCorp && activeTab !== 'Financial Performance' && activeTab !== 'Risk Signals' && activeTab !== 'Contextual Insights' && <MetricCards />}

          <div key={activeTab} style={{ animation: 'tabFadeIn 0.25s ease both' }}>
            {renderTab()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
