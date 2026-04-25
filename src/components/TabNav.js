import { useBreakpoint } from '../hooks/useBreakpoint';

const TABS = ['Overview', 'Financial Performance', 'Risk Signals', 'Contextual Insights'];

export default function TabNav({ activeTab, onTabChange }) {
  const { isMobile, isTablet } = useBreakpoint();
  const fontSize = isMobile ? 14 : isTablet ? 18 : 24;

  return (
    <div className="tab-scroll" style={{
      width: '100%',
      maxWidth: 952,
      overflowX: 'auto',
      background: '#f8f7ff',
      border: '0.3px solid #14397d',
      borderRadius: 30,
      padding: isMobile ? '12px 16px' : '20px 25px',
      display: 'flex',
      gap: isMobile ? 6 : 10,
      alignItems: 'center',
      alignSelf: 'center',
      flexShrink: 0,
    }}>
      {TABS.map(tab => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              padding: isMobile ? '8px 14px' : '10px 25px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              background: isActive ? '#2871fa' : 'transparent',
              fontSize,
              fontWeight: 400,
              lineHeight: '1.3',
              color: isActive ? '#f8f7ff' : '#081732',
              letterSpacing: '0.07px',
              whiteSpace: 'nowrap',
              fontFamily: 'Outfit, sans-serif',
              transition: 'background 0.2s ease, color 0.2s ease',
              flexShrink: 0,
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
