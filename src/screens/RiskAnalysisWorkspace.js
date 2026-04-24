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
import { techCorpFinancials, techCorpRiskProfile, techCorpSignals } from '../data/borrowers';

function OverviewTab() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      {/* Left column — grows to fill remaining width */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 25 }}>
        <FinancialChart data={techCorpFinancials} />
        <RiskProfileChart metrics={techCorpRiskProfile} />
      </div>

      {/* Right column — fixed width */}
      <div style={{ flex: '0 0 515px' }}>
        <RiskSignals signals={techCorpSignals} totalCount={5} />
      </div>
    </div>
  );
}


export default function RiskAnalysisWorkspace({ borrower, onBack }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'Overview':               return <OverviewTab />;
      case 'Financial Performance':  return <FinancialPerformanceTab />;
      case 'Risk Signals':           return <RiskSignalsTab />;
      case 'Contextual Insights':    return <ContextualInsightsTab />;
      default:                       return null;
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
          {/* Borrower header */}
          <BorrowerHeader borrower={borrower} onBack={onBack} />

          {/* Tab navigation (centered) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Metric KPI cards — hidden on tabs that have their own full-width content */}
          {activeTab !== 'Financial Performance' && activeTab !== 'Risk Signals' && activeTab !== 'Contextual Insights' && <MetricCards />}

          {/* Tab content — keyed so animation replays on every switch */}
          <div key={activeTab} style={{ animation: 'tabFadeIn 0.25s ease both' }}>
            {renderTab()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
