import { useBreakpoint } from '../hooks/useBreakpoint';

const OPTIONS = ['All', 'High Risk', 'Medium Risk', 'Low Risk', 'Review Needed'];

export default function SortDropdown({ value, onChange }) {
  const { isMobile } = useBreakpoint();
  const selected = value || '';

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
      {OPTIONS.map(opt => {
        const isActive = opt === 'All' ? selected === '' : selected === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt === 'All' ? '' : opt)}
            style={{
              padding: isMobile ? '4px 12px' : '5px 14px',
              borderRadius: 30,
              border: isActive ? 'none' : '0.5px solid rgba(20,57,125,0.25)',
              background: isActive ? 'linear-gradient(116.96deg, #2871fa 0%, #6717cd 100%)' : '#ffffff',
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
              fontSize: isMobile ? 12 : 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#fefdff' : '#081732',
              lineHeight: '18px',
              letterSpacing: '-0.1px',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s, color 0.15s, border 0.15s',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'linear-gradient(116.96deg, rgba(40,113,250,0.08) 0%, rgba(103,23,205,0.08) 100%)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
