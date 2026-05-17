import { useState, useRef } from 'react';

const W      = 756;
const H      = 260;
const PAD_L  = 32;
const PAD_R  = 32;
const PAD_T  = 12;
const PAD_B  = 30;
const chartW = W - PAD_L - PAD_R;
const chartH = H - PAD_T - PAD_B;

// Y-axis labels sit just left of PAD_L, in the card's 30px padding
const LABEL_X = PAD_L - 10;

const toX = i => PAD_L + (i / 4) * chartW;
const toY = v => PAD_T + (1 - v / 100) * chartH;

const QUARTERS  = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'];
const Y_LABELS  = [100, 75, 50, 25, 0];

function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const dx = (x2 - x1) / 2.5;
    d += ` C ${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
  }
  return d;
}

const SERIES = [
  { key: 'revenue',  label: 'Revenue',   stroke: '#1a2a4a' },
  { key: 'cashFlow', label: 'Cash Flow', stroke: '#6717cd' },
  { key: 'debt',     label: 'Debt',      stroke: '#b38be6' },
];

const TOOLTIP_W = 160;
const TOOLTIP_H = 100;

export default function FinancialChart({ data }) {
  const wrapperRef = useRef(null);
  const [tooltip, setTooltip] = useState(null); // { q, cssX, cssY }
  const { revenue, cashFlow, debt } = data;
  const seriesData = { revenue, cashFlow, debt };

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    const svgX = (cssX / rect.width) * W;

    if (svgX < PAD_L || svgX > W - PAD_R) { setTooltip(null); return; }

    // Find nearest quarter index
    let nearest = 0, minDist = Infinity;
    for (let i = 0; i < QUARTERS.length; i++) {
      const d = Math.abs(svgX - toX(i));
      if (d < minDist) { minDist = d; nearest = i; }
    }
    setTooltip({ q: nearest, cssX, cssY });
  };

  const handleMouseLeave = () => setTooltip(null);

  // Tooltip position: above cursor when space allows, otherwise below
  const tooltipLeft = tooltip ? Math.max(0, tooltip.cssX - TOOLTIP_W / 2) : 0;
  const tooltipTop  = tooltip
    ? (tooltip.cssY - TOOLTIP_H - 18 > 5 ? tooltip.cssY - TOOLTIP_H - 18 : tooltip.cssY + 18)
    : 0;

  return (
    <div style={{
      background: '#fefdff',
      border: '0.3px solid rgba(20,57,125,0.15)',
      borderRadius: 8, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12,
      height: '100%', boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#081732', letterSpacing: '0.3px', lineHeight: '22px' }}>
          Financial Trends
        </span>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {SERIES.map(({ label, stroke }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: stroke, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 400, color: '#081732', letterSpacing: '-0.15px', lineHeight: '18px', whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart wrapper — position: relative so tooltip div can be absolutely placed */}
      <div
        ref={wrapperRef}
        style={{ position: 'relative', cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>

          {/* Horizontal grid lines */}
          {Y_LABELS.map(v => (
            <line key={v} x1={PAD_L} x2={W - PAD_R} y1={toY(v)} y2={toY(v)}
              stroke="rgba(165,165,170,0.75)" strokeWidth="0.5" />
          ))}

          {/* Vertical grid lines at each quarter */}
          {QUARTERS.map((_, i) => (
            <line key={i} x1={toX(i)} x2={toX(i)} y1={PAD_T} y2={PAD_T + chartH}
              stroke="rgba(165,165,170,0.65)" strokeWidth="0.5" />
          ))}

          {/* Y-axis vertical line */}
          <line
            x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={PAD_T + chartH}
            stroke="rgba(165,165,170,0.5)" strokeWidth="0.5"
          />

          {/* Y-axis labels — at negative x, visible inside card's 30px left padding */}
          {Y_LABELS.map(v => (
            <text key={v} x={LABEL_X} y={toY(v) + 5}
              textAnchor="end" fontSize="11" fill="#081732"
              fontFamily="Outfit, sans-serif" letterSpacing="-0.15">
              {v}
            </text>
          ))}

          {/* X-axis labels */}
          {QUARTERS.map((q, i) => (
            <text key={q} x={toX(i)} y={H - 8}
              textAnchor="middle" fontSize="11" fill="#081732"
              fontFamily="Outfit, sans-serif" letterSpacing="-0.15">
              {q}
            </text>
          ))}

          {/* Chart lines — debt behind, cashflow, revenue on top */}
          {[...SERIES].reverse().map(({ key, stroke }) => {
            const pts = seriesData[key].map((v, i) => [toX(i), toY(v)]);
            return <path key={key} d={smoothPath(pts)} fill="none" stroke={stroke} strokeWidth="2" strokeOpacity="0.75" />;
          })}

          {/* Data-point dots */}
          {SERIES.map(({ key, stroke }) =>
            seriesData[key].map((v, i) => (
              <circle key={`${key}-${i}`} cx={toX(i)} cy={toY(v)} r={4} fill={stroke} fillOpacity="0.85" />
            ))
          )}

          {/* Hover column highlight line */}
          {tooltip && (
            <line
              x1={toX(tooltip.q)} x2={toX(tooltip.q)}
              y1={PAD_T} y2={PAD_T + chartH}
              stroke="rgba(40,113,250,0.35)" strokeWidth="1" strokeDasharray="4 3"
            />
          )}
        </svg>

        {/* Tooltip — rendered as a normal DOM div, never clipped by SVG */}
        {tooltip && (
          <div style={{
            position: 'absolute',
            left: tooltipLeft,
            top: tooltipTop,
            width: TOOLTIP_W,
            background: '#fefdff',
            borderRadius: 8,
            padding: '14px 16px',
            fontFamily: 'Outfit, sans-serif',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(8,23,50,0.45)', marginBottom: 8, letterSpacing: '0.07px', lineHeight: '16px' }}>
              {QUARTERS[tooltip.q]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 400, color: '#000', letterSpacing: '-0.15px', lineHeight: '20px' }}>
              <span>Revenue: {revenue[tooltip.q]}</span>
              <span>Cash Flow: {cashFlow[tooltip.q]}</span>
              <span>Debt: {debt[tooltip.q]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
