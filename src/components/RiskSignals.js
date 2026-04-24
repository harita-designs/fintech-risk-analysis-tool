import { useState } from 'react';
import { imgXCircle, imgAlertCircle } from '../assets/images';

function SignalItem({ signal }) {
  const isCritical = signal.severity === 'critical';
  const borderColor = isCritical ? '#e9000b' : '#d69200';
  const icon = isCritical ? imgXCircle : imgAlertCircle;

  return (
    <div style={{
      background: '#fefdff', border: `1px solid ${borderColor}`,
      borderRadius: 30, padding: '20px 25px',
      display: 'flex', gap: 10, alignItems: 'flex-start',
      width: '100%',
    }}>
      <img src={icon} alt="" style={{ width: 16, height: 16, objectFit: 'contain', flexShrink: 0, marginTop: 2 }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'Outfit, sans-serif', fontWeight: 400, lineHeight: '16px',
          paddingTop: 1, paddingBottom: 1, marginBottom: 10,
        }}>
          <span style={{ fontSize: 18, color: '#081732', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>
            {signal.title}
          </span>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 10, color: '#aaaaaa', letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
              {signal.impact}
            </span>
            <span style={{ fontSize: 10, color: 'rgba(74,85,101,0.8)', whiteSpace: 'nowrap' }}>
              {signal.date}
            </span>
          </div>
        </div>
        <p style={{ fontSize: 14, fontWeight: 400, color: '#081732', lineHeight: '20px', letterSpacing: '-0.15px', margin: 0 }}>
          {signal.desc}
        </p>
      </div>
    </div>
  );
}

export default function RiskSignals({ signals, totalCount }) {
  const [showAll, setShowAll] = useState(false);
  const [toggleHovered, setToggleHovered] = useState(false);

  const visible = showAll ? signals : signals.slice(0, 3);
  const hasMore = signals.length > 3;

  return (
    <div style={{
      background: 'linear-gradient(113.14deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)',
      borderRadius: 30, padding: '30px 25px',
      display: 'flex', flexDirection: 'column', gap: 20,
      width: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: '#081732', letterSpacing: '0.72px', lineHeight: '32px' }}>
          Risk Signals
        </span>
        {totalCount > 0 && (
          <div style={{
            background: 'rgba(233,0,11,0.1)', borderRadius: 10, padding: '5px 10px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#e9000b', letterSpacing: '-0.15px' }}>
              {totalCount}
            </span>
          </div>
        )}
      </div>

      {/* Signal items */}
      {visible.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {visible.map(signal => (
            <SignalItem key={signal.id} signal={signal} />
          ))}
        </div>
      ) : (
        <div style={{
          background: '#fefdff', borderRadius: 20, padding: '24px',
          border: '0.5px solid rgba(20,57,125,0.15)',
          textAlign: 'center',
          fontSize: 14, color: 'rgba(8,23,50,0.45)', letterSpacing: '-0.15px',
        }}>
          No active risk signals
        </div>
      )}

      {/* View all / Show less toggle */}
      {hasMore && (
        <span
          onClick={() => setShowAll(s => !s)}
          onMouseEnter={() => setToggleHovered(true)}
          onMouseLeave={() => setToggleHovered(false)}
          style={{
            fontSize: 14, fontWeight: 600,
            color: toggleHovered ? '#6717cd' : '#2871fa',
            lineHeight: '20px', letterSpacing: '-0.15px',
            cursor: 'pointer',
            transition: 'color 0.15s',
          }}
        >
          {showAll
            ? '↑ Show less'
            : `View all ${totalCount} signal${totalCount === 1 ? '' : 's'} →`}
        </span>
      )}
    </div>
  );
}
