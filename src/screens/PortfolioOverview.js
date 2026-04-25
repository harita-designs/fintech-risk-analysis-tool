import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortfolioStats from '../components/PortfolioStats';
import PortfolioRow from '../components/PortfolioRow';
import SortDropdown from '../components/SortDropdown';
import { borrowers } from '../data/borrowers';
import { imgArrowLeft, imgArrowCircle } from '../assets/images';
import { useBreakpoint } from '../hooks/useBreakpoint';

function PaginationBtn({ direction, disabled }) {
  const isNext = direction === 'next';
  return (
    <button
      disabled={disabled}
      style={{
        position: 'relative', width: 50, height: 50, borderRadius: '50%', padding: 0,
        border: 'none', background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}
    >
      <img
        src={imgArrowCircle}
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          filter: disabled ? 'grayscale(100%) brightness(1.1)' : 'none',
          opacity: disabled ? 0.35 : 1,
        }}
      />
      <img
        src={imgArrowLeft}
        alt={isNext ? 'Next' : 'Previous'}
        style={{
          position: 'relative', width: 30, height: 30, objectFit: 'contain',
          transform: isNext ? 'scaleX(-1)' : 'none',
          filter: disabled ? 'grayscale(100%)' : 'none',
          opacity: disabled ? 0.35 : 1,
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
    <div style={{ minHeight: '100vh', background: '#fefdff', display: 'flex', flexDirection: 'column' }}>
      <Navbar onSelectBorrower={onSelectBorrower} />

      <div style={{ flex: 1 }}>
        <div style={{ padding: isMobile ? '16px 16px 0' : '24px 27px 0' }}>
          <PortfolioStats />
        </div>

        <div style={{ margin: isMobile ? '16px 16px 0' : '24px 27px 0', height: '0.3px', background: 'rgba(20,57,125,0.2)' }} />

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 12 : 0,
          padding: isMobile ? '20px 16px 16px' : '28px 27px 24px',
        }}>
          <h2 style={{
            fontSize: isMobile ? 26 : 40, fontWeight: 600, color: '#081732',
            letterSpacing: '0.5px', margin: 0,
          }}>
            Portfolio Overview
          </h2>
          <SortDropdown value={sortFilter} onChange={setSortFilter} />
        </div>

        <div style={{ padding: isMobile ? '0 16px 0' : '16px 27px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(b => (
            <PortfolioRow key={b.id} borrower={b} onClick={onSelectBorrower} />
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16,
          padding: isMobile ? '16px 16px 32px' : '20px 27px 40px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#081732', letterSpacing: '-0.15px' }}>
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
