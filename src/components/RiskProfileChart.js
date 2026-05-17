import { useState, useRef } from 'react';

const BAR_H    = 28;
const ROW_GAP  = 14;
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
        background: '#fefdff',
        border: '0.3px solid rgba(20,57,125,0.15)',
        borderRadius: 8, padding: '16px 18px 16px 4px', display: 'flex', flexDirection: 'column', gap: 16,
        position: 'relative',
        height: '100%', boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <span style={{ fontSize: 16, fontWeight: 600, color: '#081732', letterSpacing: '0.3px', lineHeight: '22px', paddingLeft: 12 }}>
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
                  borderRadius: 8,
                  padding: '10px 14px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  pointerEvents: 'none',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(8,23,50,0.45)', lineHeight: '16px', marginBottom: 5 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: '#000', lineHeight: '20px', letterSpacing: '-0.15px' }}>
                    Score: {m.pct}
                  </div>
                </div>
              );
            })()}
          </div>
        ))}
      </div>

      {/* X-axis scale */}
      <div style={{ display: 'flex', alignItems: 'center', gap: LABEL_GAP }}>
        <div style={{ width: LABEL_COL, flexShrink: 0 }} />
        <div style={{ position: 'relative', flex: 1, minWidth: 0, height: 18 }}>
          {[0, 25, 50, 75, 100].map(v => (
            <span key={v} style={{
              position: 'absolute',
              left: `${v}%`,
              transform: v === 0 ? 'none' : v === 100 ? 'translateX(-100%)' : 'translateX(-50%)',
              fontSize: 11, fontWeight: 400, color: 'rgba(165,165,170,0.9)',
              lineHeight: '18px', letterSpacing: '-0.1px',
              whiteSpace: 'nowrap',
            }}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
