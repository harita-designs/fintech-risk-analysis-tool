const TABS = ['Overview', 'Financial Performance', 'Risk Signals', 'Contextual Insights'];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <div style={{
      width: 952, flexShrink: 0,
      background: '#f8f7ff', border: '0.3px solid #14397d',
      borderRadius: 30, padding: '20px 25px',
      display: 'flex', gap: 10, alignItems: 'center',
      alignSelf: 'center',
    }}>
      {TABS.map(tab => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              padding: '10px 25px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: isActive ? '#2871fa' : 'transparent',
              fontSize: 24, fontWeight: 400, lineHeight: '32px',
              color: isActive ? '#f8f7ff' : '#081732',
              letterSpacing: '0.07px', whiteSpace: 'nowrap',
              fontFamily: 'Outfit, sans-serif',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
