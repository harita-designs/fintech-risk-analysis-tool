import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortfolioStats from '../components/PortfolioStats';
import PortfolioRow from '../components/PortfolioRow';
import SortDropdown from '../components/SortDropdown';
import { borrowers } from '../data/borrowers';
import { imgArrowLeft, imgArrowLeftHover, imgArrowCircle, imgArrowCircleBlue } from '../assets/images';

function PaginationBtn({ direction, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isNext = direction === 'next';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', width: 50, height: 50, borderRadius: '50%', padding: 0,
        border: 'none', background: 'transparent', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}
    >
      {/* Circle background */}
      <img
        src={hovered ? imgArrowCircleBlue : imgArrowCircle}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* Arrow icon — flip horizontally for "next" */}
      <img
        src={hovered ? imgArrowLeftHover : imgArrowLeft}
        alt={isNext ? 'Next' : 'Previous'}
        style={{
          position: 'relative', width: 30, height: 30, objectFit: 'contain',
          transform: isNext ? 'scaleX(-1)' : 'none',
          transition: 'none',
        }}
      />
    </button>
  );
}

const RISK_MAP = { 'High Risk': 'HIGH', 'Medium Risk': 'MEDIUM', 'Low Risk': 'LOW' };

export default function PortfolioOverview({ onSelectBorrower }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortFilter, setSortFilter] = useState('');
  const totalBorrowers = 142;

  const filtered = sortFilter
    ? borrowers.filter(b =>
        sortFilter === 'Review Needed'
          ? b.status === 'Review Needed'
          : b.riskLevel === RISK_MAP[sortFilter]
      )
    : borrowers;

  return (
    <div style={{ minHeight: '100vh', background: '#fefdff', display: 'flex', flexDirection: 'column' }}>
      <Navbar onSelectBorrower={onSelectBorrower} />

      <div style={{ flex: 1 }}>
        {/* Status cards (Hello + KPIs) */}
        <div style={{ padding: '24px 27px 0' }}>
          <PortfolioStats />
        </div>

        {/* Divider */}
        <div style={{ margin: '24px 27px 0', height: '0.3px', background: 'rgba(20,57,125,0.2)' }} />

        {/* Section header + sort */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '28px 27px 24px',
        }}>
          <h2 style={{
            fontSize: 40, fontWeight: 600, color: '#081732',
            letterSpacing: '0.5px', margin: 0,
          }}>
            Portfolio Overview
          </h2>
          <SortDropdown value={sortFilter} onChange={setSortFilter} />
        </div>

        {/* Borrower rows */}
        <div style={{ padding: '16px 27px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(b => (
            <PortfolioRow key={b.id} borrower={b} onClick={onSelectBorrower} />
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 24,
          padding: '20px 27px 40px',
        }}>
          <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#081732', letterSpacing: '-0.15px' }}>
            Showing {filtered.length} of {totalBorrowers} borrowers
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            <PaginationBtn direction="prev" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} />
            <PaginationBtn direction="next" onClick={() => setCurrentPage(p => p + 1)} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
