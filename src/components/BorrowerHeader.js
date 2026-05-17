import { useState } from 'react';
import { imgBackArrow, imgAlertTriangle } from '../assets/images';
import { riskColor } from '../data/borrowers';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function BorrowerHeader({ borrower, onBack }) {
  const [backHovered, setBackHovered] = useState(false);
  const { isMobile } = useBreakpoint();
  const rc = riskColor(borrower.riskLevel);

  return (
    <div style={{
      width: '100%',
      borderRadius: 8, padding: isMobile ? '10px 12px' : '12px 16px',
      display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20,
    }}>

      {/* Back button */}
      <button
        onClick={onBack}
        onMouseEnter={() => setBackHovered(true)}
        onMouseLeave={() => setBackHovered(false)}
        style={{
          width: 38, height: 38, flexShrink: 0, borderRadius: '50%',
          border: backHovered ? 'none' : '0.3px solid rgba(20,57,125,0.25)',
          background: backHovered ? 'linear-gradient(116.96deg, #2871fa 0%, #6717cd 100%)' : '#ffffff',
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s, border 0.15s',
        }}
      >
        <img
          src={imgBackArrow} alt="Back"
          style={{
            width: 20, height: 20, objectFit: 'contain',
            filter: backHovered ? 'brightness(0) invert(1)' : 'none',
            transition: 'filter 0.15s',
          }}
        />
      </button>

      {/* Left: Title + meta */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: isMobile ? 18 : 24, fontWeight: 700,
            color: '#081732', letterSpacing: '0.3px', lineHeight: '1.2',
          }}>
            {borrower.name}
          </span>
          {borrower.status === 'Review Needed' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: '#fef3c6', border: '1px solid #d69200',
              borderRadius: 30, padding: '2px 10px', flexShrink: 0,
            }}>
              <img src={imgAlertTriangle} alt="" style={{ width: 11, height: 11 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#d69200', letterSpacing: '-0.1px' }}>
                Review needed
              </span>
            </div>
          )}
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 5,
          fontSize: 12, color: '#4a5565', letterSpacing: '-0.1px', lineHeight: '18px',
        }}>
          <span>{borrower.id}</span>
          <span style={{ color: 'rgba(74,85,101,0.4)' }}>•</span>
          <span>{borrower.industry}</span>
          <span style={{ color: 'rgba(74,85,101,0.4)' }}>•</span>
          <span>Last review: {borrower.lastReview}</span>
        </div>
      </div>

      {/* Right: Risk Score */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>

        {/* Risk Score card */}
        <div style={{
          background: '#ffffff',
          border: '0.3px solid rgba(20,57,125,0.15)',
          borderRadius: 8, padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(74,85,101,0.65)', letterSpacing: '-0.1px', lineHeight: '14px' }}>
              Risk Score
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, color: rc, letterSpacing: '0.5px', lineHeight: 1 }}>
                {borrower.riskScore}
              </span>
              <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(74,85,101,0.55)' }}>
                / 100
              </span>
            </div>
          </div>
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
