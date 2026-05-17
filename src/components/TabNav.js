import { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const TABS = ['Overview', 'Financial Performance', 'Risk Signals', 'Contextual Insights'];

export default function TabNav({ activeTab, onTabChange }) {
  const { isMobile, isTablet } = useBreakpoint();
  const [hoveredTab, setHoveredTab] = useState(null);
  const fontSize = isMobile ? 13 : isTablet ? 14 : 15;

  return (
    <div className="tab-scroll" style={{
      overflowX: 'auto',
      background: '#fefdff',
      border: '0.3px solid rgba(20,57,125,0.25)',
      borderRadius: 10,
      padding: isMobile ? '5px 6px' : '6px 8px',
      display: 'flex',
      width: '100%',
      gap: isMobile ? 3 : 4,
      alignItems: 'center',
    }}>
      {TABS.map(tab => {
        const isActive = tab === activeTab;
        const isHovered = hoveredTab === tab && !isActive;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            onMouseEnter={() => setHoveredTab(tab)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              flex: 1,
              padding: isMobile ? '6px 12px' : '7px 18px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: isActive
                ? 'linear-gradient(116.96deg, #2871fa 0%, #6717cd 100%)'
                : isHovered
                ? 'rgba(40,113,250,0.08)'
                : 'transparent',
              fontSize,
              fontWeight: 400,
              lineHeight: '1.3',
              color: isActive ? '#fefdff' : '#081732',
              letterSpacing: '0.07px',
              whiteSpace: 'nowrap',
              fontFamily: 'Outfit, sans-serif',
              transition: 'background 0.18s ease, color 0.18s ease',
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
