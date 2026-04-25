import { useState, useRef } from 'react';

const BAR_H    = 45;
const ROW_GAP  = 31;
const GRADIENT = 'linear-gradient(90deg, rgba(40,113,250,0.65) 0%, rgba(103,23,205,0.65) 100%)';

const TOOLTIP_W  = 160;
const LABEL_COL  = 89;
const LABEL_GAP  = 26;

function RiskBar({ label, pct, onMouseEnter, onMouseLeave }) {
  const trackRef = useRef(null);

  const handleMouseEnter = () => {
    const actualW = trackRef.current ? trackRef.current.offsetWidth : 662;
    onMouseEnter(actualW);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: LABEL_GAP }}>
      {/* Label */}
      <div style={{
        width: LABEL_COL, textAlign: 'right', flexShrink: 0,
        fontSize: 14, fontWeight: 400, color: '#a5a5aa',
        lineHeight: '20px', letterSpacing: '-0.15px',
      }}>
        {label}
      </div>

      {/* Bar track + fill */}
      <div
        ref={trackRef}
        style={{ position: 'relative', flex: 1, minWidth: 0, height: BAR_H, flexShrink: 0, cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Track */}
        <div style={{ position: 'absolute', inset: 0, borderBottom: '0.5px solid rgba(165,165,170,0.5)' }} />

        {/* Fill — percentage-based so it scales with container */}
        {pct > 0 && (
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: `${pct}%`, height: BAR_H,
            background: GRADIENT,
          }}>
            {/* Right-edge marker */}
            <div style={{
              position: 'absolute', right: 0, top: 0,
              width: 3, height: BAR_H, background: '#081732',
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function RiskProfileChart({ metrics }) {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null); // { ...metric, actualBarW }

  return (
    <div
      ref={containerRef}
      style={{
        background: 'linear-gradient(120.31deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)',
        borderRadius: 30, padding: 50, display: 'flex', flexDirection: 'column', gap: 50,
        position: 'relative',
      }}
    >
      {/* Header */}
      <span style={{ fontSize: 24, fontWeight: 600, color: '#081732', letterSpacing: '0.72px', lineHeight: '32px' }}>
        Risk Profile
      </span>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: ROW_GAP, position: 'relative' }}>
        {metrics.map((m, idx) => (
          <div key={m.label} style={{ position: 'relative' }}>
            <RiskBar
              label={m.label}
              pct={m.pct}
              onMouseEnter={(actualW) => setHovered({ ...m, idx, actualBarW: actualW })}
              onMouseLeave={() => setHovered(null)}
            />

            {/* Tooltip — positioned relative to filled percentage of actual bar width */}
            {hovered && hovered.label === m.label && (() => {
              const filledPx = Math.round((m.pct / 100) * hovered.actualBarW);
              const leftOffset = LABEL_COL + LABEL_GAP + Math.min(filledPx + 10, hovered.actualBarW - TOOLTIP_W);
              return (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: leftOffset,
                  width: TOOLTIP_W,
                  background: '#fefdff',
                  borderRadius: 20,
                  padding: '20px 25px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  pointerEvents: 'none',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#000', lineHeight: '16px', marginBottom: 5 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: '#000', lineHeight: '20px', letterSpacing: '-0.15px' }}>
                    Performance: {m.pct}
                  </div>
                </div>
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}
