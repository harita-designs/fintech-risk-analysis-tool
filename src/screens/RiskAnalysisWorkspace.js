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
import { useBreakpoint } from '../hooks/useBreakpoint';

const FALLBACK = { financials: techCorpFinancials, riskProfile: techCorpRiskProfile, signals: techCorpSignals };

function OverviewTab({ financials, riskProfile, signals }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isStacked = isMobile || isTablet;

  return (
    <div style={{ display: 'flex', flexDirection: isStacked ? 'column' : 'row', gap: 16, alignItems: 'flex-start' }}>
      {/* Financial Trends + Risk Profile: match each other's height, isolated from Risk Signals */}
      <div style={{
        flex: isStacked ? 'none' : '0 0 calc(75% - 4px)',
        width: isStacked ? '100%' : undefined,
        display: 'flex', flexDirection: isStacked ? 'column' : 'row',
        gap: 16, alignItems: isStacked ? 'flex-start' : 'stretch',
      }}>
        <div style={{ flex: isStacked ? 'none' : '0 0 calc(66.67% - 5.33px)', width: isStacked ? '100%' : undefined, minWidth: 0 }}>
          <FinancialChart data={financials} />
        </div>
        <div style={{ flex: isStacked ? 'none' : 1, width: isStacked ? '100%' : undefined, minWidth: 0 }}>
          <RiskProfileChart metrics={riskProfile} />
        </div>
      </div>
      {/* Risk Signals: expands independently */}
      <div style={{ flex: isStacked ? 'none' : '0 0 calc(25% - 12px)', width: isStacked ? '100%' : undefined, minWidth: 0 }}>
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
      borderRadius: 8,
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
  const { isMobile } = useBreakpoint();

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
    <div style={{ minHeight: '100vh', background: '#F8F7FF', display: 'flex', flexDirection: 'column' }}>
      <Navbar onBack={onBack} />

      <div style={{ flex: 1, background: 'transparent', padding: isMobile ? '0 8px' : '0 10px' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 16,
          padding: isMobile ? '10px 0' : '16px 0',
        }}>
          <BorrowerHeader borrower={borrower} onBack={onBack} />

          <div style={{ display: 'flex', justifyContent: 'center', padding: isMobile ? '0 4px' : 0, marginBottom: isMobile ? 6 : 12 }}>
            <div style={{ width: isMobile ? '100%' : 'calc(50% - 5px)' }}>
              <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
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
