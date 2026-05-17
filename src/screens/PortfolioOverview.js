import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortfolioStats from '../components/PortfolioStats';
import PortfolioRow from '../components/PortfolioRow';
import SortDropdown from '../components/SortDropdown';
import { borrowers } from '../data/borrowers';
import { imgArrowLeft } from '../assets/images';
import { useBreakpoint } from '../hooks/useBreakpoint';

function PaginationBtn({ direction, disabled }) {
  const isNext = direction === 'next';
  return (
    <button
      disabled={disabled}
      style={{
        width: 38, height: 38, borderRadius: '50%', padding: 0,
        border: `0.3px solid ${disabled ? 'rgba(20,57,125,0.1)' : 'rgba(20,57,125,0.25)'}`,
        background: '#ffffff',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}
    >
      <img
        src={imgArrowLeft}
        alt={isNext ? 'Next' : 'Previous'}
        style={{
          width: 18, height: 18, objectFit: 'contain',
          transform: isNext ? 'scaleX(-1)' : 'none',
          opacity: disabled ? 0.25 : 1,
        }}
      />
    </button>
  );
}

const RISK_MAP = { 'High Risk': 'HIGH', 'Medium Risk': 'MEDIUM', 'Low Risk': 'LOW' };

export default function PortfolioOverview({ onSelectBorrower }) {
  const [sortFilter, setSortFilter] = useState('');
  const { isMobile } = useBreakpoint();
  const total = borrowers.length;

  const filtered = sortFilter
    ? borrowers.filter(b =>
        sortFilter === 'Review Needed'
          ? b.status === 'Review Needed'
          : b.riskLevel === RISK_MAP[sortFilter]
      )
    : borrowers;

  const isAllShown = filtered.length >= total;

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7ff', display: 'flex', flexDirection: 'column' }}>
      <Navbar onSelectBorrower={onSelectBorrower} />

      <div style={{ flex: 1 }}>
        <div style={{ padding: isMobile ? '12px 14px 0' : '16px 20px 0' }}>
          <PortfolioStats />
        </div>

        <div style={{ margin: isMobile ? '12px 14px 0' : '16px 20px 0', height: '0.3px', background: 'rgba(20,57,125,0.2)' }} />

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 12 : 0,
          padding: isMobile ? '12px 14px 10px' : '16px 20px 12px',
        }}>
          <h2 style={{
            fontSize: isMobile ? 20 : 28, fontWeight: 600, color: '#081732',
            letterSpacing: '0.5px', margin: 0,
          }}>
            Portfolio Overview
          </h2>
          <SortDropdown value={sortFilter} onChange={setSortFilter} />
        </div>

        <div style={{ padding: isMobile ? '0 14px 0' : '0 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(b => (
            <PortfolioRow key={b.id} borrower={b} onClick={onSelectBorrower} />
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16,
          padding: isMobile ? '12px 14px 24px' : '14px 20px 28px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'rgba(8,23,50,0.4)', letterSpacing: '-0.15px' }}>
            Showing {filtered.length} of {total} borrowers
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            <PaginationBtn direction="prev" disabled={isAllShown} />
            <PaginationBtn direction="next" disabled={isAllShown} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
