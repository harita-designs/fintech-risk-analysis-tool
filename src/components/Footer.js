import { useState, useRef, useEffect } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

function FooterLink({ label }) {
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!showTooltip) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowTooltip(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTooltip]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <span
        onClick={() => setShowTooltip(s => !s)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: 'pointer', fontSize: 14, fontWeight: 400,
          color: hovered || showTooltip ? '#2871fa' : '#081732',
          letterSpacing: '-0.15px', lineHeight: '20px',
          textDecoration: hovered ? 'underline' : 'none',
          transition: 'color 0.15s',
        }}
      >
        {label}
      </span>
      {showTooltip && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fefdff',
          border: '0.5px solid #e1d1f5',
          borderRadius: 12,
          padding: '10px 18px',
          boxShadow: '0 4px 24px rgba(20,57,125,0.14)',
          fontSize: 13, fontWeight: 500, color: '#081732',
          whiteSpace: 'nowrap', zIndex: 500,
          fontFamily: 'Outfit, sans-serif', letterSpacing: '0.07px',
          pointerEvents: 'none',
        }}>
          Feature coming soon
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      gap: isMobile ? 12 : 0,
      padding: isMobile ? '20px 20px' : '25px 30px',
      background: '#fefdff',
      fontSize: 14, fontWeight: 400, lineHeight: '20px',
      color: '#081732', letterSpacing: '-0.15px',
    }}>
      <span>© 2026 All rights reserved.</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {['Documentation', 'API Status', 'Support'].map(link => (
          <FooterLink key={link} label={link} />
        ))}
      </div>
    </div>
  );
}
