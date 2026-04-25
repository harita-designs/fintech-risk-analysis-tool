import { useState } from 'react';
import { imgBackBtnBg, imgBackBtnBgHover, imgBackArrow, imgBackArrowHover, imgAlertTriangle } from '../assets/images';
import { riskColor } from '../data/borrowers';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function BorrowerHeader({ borrower, onBack }) {
  const [backHovered, setBackHovered] = useState(false);
  const { isMobile } = useBreakpoint();
  const rc = riskColor(borrower.riskLevel);
  const GRADIENT = 'linear-gradient(164.3deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)';

  return (
    <div style={{
      width: '100%', background: GRADIENT,
      borderRadius: 30, padding: isMobile ? '16px 18px' : '20px 25px',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center',
      justifyContent: 'space-between', gap: isMobile ? 12 : 0,
    }}>
      {/* Left: back button + borrower info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? 14 : 24, flex: '1 0 0', minWidth: 220 }}>
        <button
          onClick={onBack}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            position: 'relative', width: 50, height: 50, flexShrink: 0,
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
          }}
        >
          <img src={backHovered ? imgBackBtnBgHover : imgBackBtnBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          <img src={backHovered ? imgBackArrowHover : imgBackArrow} alt="Back" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
        </button>

        {/* Name + status + meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 24 }}>
          <span style={{ fontSize: isMobile ? 22 : 32, fontWeight: 600, lineHeight: '28px', color: '#081732', letterSpacing: '1.6px' }}>
            {borrower.name}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
            {borrower.status === 'Review Needed' && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: '#fef3c6', border: '1px solid #d69200',
                borderRadius: 30, padding: '5px 20px',
              }}>
                <img src={imgAlertTriangle} alt="" style={{ width: 12, height: 12 }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#d69200', letterSpacing: '-0.15px' }}>
                  Review Needed
                </span>
              </div>
            )}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
              fontSize: 14, color: '#081732', letterSpacing: '-0.15px', lineHeight: '20px',
            }}>
              <span style={{ color: '#4a5565' }}>•</span>
              <span>{borrower.id}</span>
              <span>•</span>
              <span>{borrower.industry}</span>
              <span>•</span>
              <span>Last Review: {borrower.lastReview}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: risk score */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, padding: isMobile ? '0' : '10px 20px 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 400, color: '#081732', letterSpacing: '-0.15px', lineHeight: '20px' }}>
          Risk Score
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: isMobile ? 48 : 64, fontWeight: 400, color: rc, letterSpacing: '1.92px', lineHeight: 1 }}>
            {borrower.riskScore}
          </span>
          <div style={{
            background: rc, borderRadius: 30, padding: '1px 10px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 57,
          }}>
            <span style={{ fontSize: 8, fontWeight: 600, color: '#fefdff', lineHeight: '16px', textAlign: 'center' }}>
              {borrower.riskLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
