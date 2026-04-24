import { useState } from 'react';
import './App.css';
import PortfolioOverview from './screens/PortfolioOverview';
import RiskAnalysisWorkspace from './screens/RiskAnalysisWorkspace';

export default function App() {
  const [screen, setScreen] = useState('portfolio');
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const handleSelectBorrower = (borrower) => {
    setSelectedBorrower(borrower);
    setScreen('workspace');
  };

  const handleBack = () => {
    setScreen('portfolio');
    setSelectedBorrower(null);
  };

  if (screen === 'workspace' && selectedBorrower) {
    return (
      <RiskAnalysisWorkspace
        borrower={selectedBorrower}
        onBack={handleBack}
      />
    );
  }

  return <PortfolioOverview onSelectBorrower={handleSelectBorrower} />;
}
