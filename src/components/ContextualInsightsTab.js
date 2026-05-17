import { useState, useRef, useEffect } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  imgExtLinkUpGradient, imgXCircleRed,
  imgCIAvatar1, imgCIAvatar2,
  imgCIDocPdf, imgCIDocBank, imgCIDocLoan, imgCIDownloadGradient,
  imgProfile,
} from '../assets/images';

const TEXT          = { fontFamily: 'Outfit, sans-serif' };
const CARD_BG       = '#fefdff';
const INNER_BG      = '#F9F8FF';

// ── Chart geometry ────────────────────────────────────────────────
const W = 780, H = 320;
const PAD_L = 45, PAD_R = 15, PAD_T = 16, PAD_B = 100;
const chartW = W - PAD_L - PAD_R;
const chartH = H - PAD_T - PAD_B;
const Y_LABELS = [100, 75, 50, 25, 0];

const QUARTERS = [
  "Q1'23","Q2'23","Q3'23","Q4'23",
  "Q1'24","Q2'24","Q3'24","Q4'24",
  "Q1'25","Q2'25","Q3'25","Q4'25","Q1'26",
];
const N = QUARTERS.length;

const toX = i => PAD_L + (i / (N - 1)) * chartW;
const toY = v => PAD_T + (1 - v / 100) * chartH;

// Catmull-Rom → cubic bezier for smooth curves through every point
function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const CHART_SERIES = [
  { label: 'Risk Score',     stroke: '#1a2133', dotColor: '#252533', data: [63,67,71,70,62,57,53,51,50,48,46,46,44] },
  { label: 'Revenue',        stroke: '#6717cd', dotColor: '#6717cd', data: [99,99,99,99,97,96,90,87,83,75,70,67,62] },
  { label: 'Cash Flow',      stroke: '#9a64de', dotColor: '#9a64de', data: [99,95,96,94,85,78,69,63,59,54,48,46,46] },
  { label: 'Debt-to-EBITDA', stroke: '#b38be6', dotColor: '#b38be6', data: [99,97,92,93,82,75,65,60,52,43,37,32,28] },
];

const EVENTS = [
  { idx: 1.2, line1: 'Credit downgrade', line2: 'BBB → BB+' },
  { idx: 5.3, line1: 'Covenant waiver',  line2: 'DSC breach' },
  { idx: 8.5, line1: 'Revenue miss',     line2: '−12% YoY'  },
];

// ── Covenant data ─────────────────────────────────────────────────
const COVENANTS = [
  {
    name: 'Debt Service Coverage',
    current: '0.30x',  delta: '↓ 0.95 below threshold',
    required: 'Required: ≥ 1.25x', since: 'Q4 2024', months: '16 months', hasXCircle: true,
  },
  {
    name: 'Current Ratio',
    current: '1.12',   delta: '↓ 0.38 below threshold',
    required: 'Required: ≥ 1.50',  since: 'Q3 2025', months: '6 months',  hasXCircle: true,
  },
  {
    name: 'Debt-to-EBITDA',
    current: '9.55x',  delta: '↑ 6.05 above ceiling (2.7x over limit)',
    required: 'Required: ≤ 3.50x', since: 'Q2 2025', months: '9 months',  hasXCircle: true,
  },
  {
    name: 'Minimum Liquidity',
    current: '$2.46M', delta: '↓ $2.54M below minimum',
    required: 'Required: ≥ $5M',   since: 'Q4 2025', months: '4 months',  hasXCircle: true,
  },
];

// ── Review notes data ─────────────────────────────────────────────
const NOTES = [
  {
    id: 1, avatar: imgCIAvatar1, name: 'Sarah Chen', role: 'Senior Risk Officer', date: '2/14/2026',
    text: '"Concerned about Q3 inventory build-up without corresponding sales uptick. Management claims supply chain hedge, but liquidity is tightening significantly."',
    isUserNote: false,
  },
  {
    id: 2, avatar: imgCIAvatar2, name: 'Michael Torres', role: 'Senior Risk Officer', date: '1/27/2026',
    text: '"Discussed covenant compliance with CFO. All covenants currently met, but monitoring liquidity closely given seasonal patterns. And completed annual review."',
    isUserNote: false,
  },
];

// ── Documents data ────────────────────────────────────────────────
const DOCS = [
  { icon: imgCIDocPdf,  name: '2024 Tax Return.pdf',    meta: '1.2 MB • Verified' },
  { icon: imgCIDocBank, name: 'Bank Statements_Q3.zip', meta: '4.8 MB • New'      },
  { icon: imgCIDocLoan, name: 'Loan Agreement.pdf',     meta: '0.5 MB • Signed'   },
];

function Divider() {
  return <div style={{ height: 1, background: 'rgba(8,23,50,0.08)', width: '100%' }} />;
}

// ════════════════════════════════════════════════════════════════
// Covenant Tracking Card
// ════════════════════════════════════════════════════════════════
function BreachBadge() {
  return (
    <div style={{
      background: '#e9000b', borderRadius: 30, padding: '1px 10px',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      alignSelf: 'flex-start', minWidth: 57,
    }}>
      <span style={{ ...TEXT, fontSize: 8, fontWeight: 600, color: '#fefdff', lineHeight: '16px', textAlign: 'center' }}>
        BREACH
      </span>
    </div>
  );
}

function CovenantCard({ cov, cardFlex }) {
  const [linkHovered, setLinkHovered] = useState(false);
  return (
    <div style={{
      flex: cardFlex || '1 1 0', minWidth: 0, overflow: 'hidden',
      background: INNER_BG, border: '0.3px solid rgba(20,57,125,0.15)',
      borderRadius: 8, padding: '12px 14px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      boxSizing: 'border-box',
    }}>
      {/* Top section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <BreachBadge />
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 600, color: '#101828', lineHeight: '18px', marginTop: 10 }}>
            {cov.name}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, margin: '6px 0' }}>
            <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#808080', lineHeight: '18px' }}>
              Current Value
            </span>
            <span style={{ ...TEXT, fontSize: 18, fontWeight: 600, color: '#101828', lineHeight: '24px', letterSpacing: '0.3px' }}>
              {cov.current}
            </span>
          </div>
        </div>
        {/* Delta + required */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={imgXCircleRed} alt="" style={{ width: 14, height: 14, flexShrink: 0 }} />
            <span style={{ ...TEXT, fontSize: 14, fontWeight: 700, color: '#6b7280', lineHeight: '18px' }}>
              {cov.delta}
            </span>
          </div>
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#808080', lineHeight: '18px', paddingBottom: 12 }}>
            {cov.required}
          </span>
        </div>
      </div>

      {/* Bottom — always at card bottom */}
      <div>
        <Divider />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginTop: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
            <span style={{ ...TEXT, fontSize: 14, fontWeight: 600, color: '#a5a5aa', lineHeight: '18px' }}>
              Breached since: {cov.since}
            </span>
            <span style={{ ...TEXT, fontSize: 14, fontWeight: 600, color: '#a5a5aa', lineHeight: '18px' }}>
              In breach for {cov.months}
            </span>
          </div>
          <img
            src={imgExtLinkUpGradient} alt=""
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            style={{
              width: 20, height: 20, objectFit: 'contain', transform: 'rotate(45deg)', flexShrink: 0,
              opacity: linkHovered ? 0.75 : 1,
              cursor: 'pointer', transition: 'opacity 0.15s',
              marginTop: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function CovenantTrackingCard() {
  const { isMobile, isTablet } = useBreakpoint();
  const cardFlex = isMobile ? '0 0 100%' : isTablet ? '0 0 calc(50% - 8px)' : '1 1 0';
  return (
    <div style={{ borderRadius: 8, padding: '16px', background: CARD_BG, border: '0.3px solid rgba(20,57,125,0.15)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ ...TEXT, fontSize: 16, fontWeight: 600, color: '#101828', lineHeight: '22px', letterSpacing: '0.3px' }}>
          Covenant Tracking
        </span>
        <span style={{ ...TEXT, fontSize: 13, fontWeight: 400, color: '#808080', lineHeight: '18px', letterSpacing: '0.07px' }}>
          4 of 4 covenants in breach — critical attention required
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {COVENANTS.map((cov, i) => <CovenantCard key={i} cov={cov} cardFlex={cardFlex} />)}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Historical Performance Card
// ════════════════════════════════════════════════════════════════
function LegendCheckbox({ color, checked }) {
  return (
    <div style={{
      width: 20, height: 20, flexShrink: 0,
      background: '#fefdff',
      border: `2px solid ${color}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 2, cursor: 'pointer',
    }}>
      {checked && (
        <span style={{ fontSize: 11, color: color, lineHeight: 1, fontWeight: 700 }}>✓</span>
      )}
    </div>
  );
}

function ChartTooltip({ quarter, series, cssX, cssY, wrapperW }) {
  const TW = 210;
  const TH = 44 + series.length * 26;
  const left = Math.max(0, Math.min(cssX - TW / 2, wrapperW - TW));
  const top  = cssY - TH - 14 > 5 ? cssY - TH - 14 : cssY + 14;
  return (
    <div style={{
      position: 'absolute', left, top, width: TW,
      background: '#fefdff', borderRadius: 8, padding: '12px 14px',
      display: 'flex', flexDirection: 'column', gap: 10,
      boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
      pointerEvents: 'none', zIndex: 20,
    }}>
      <span style={{ ...TEXT, fontSize: 11, fontWeight: 600, color: '#808080', lineHeight: '16px' }}>
        {quarter}
      </span>
      {series.map(({ label, value, color }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#364153', flex: 1, lineHeight: '20px', letterSpacing: '-0.15px' }}>
            {label}
          </span>
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 600, color: '#101828', lineHeight: '20px', letterSpacing: '-0.15px' }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

function HistoricalPerformanceCard() {
  const allLabels = CHART_SERIES.map(s => s.label);
  const [visibleSeries, setVisibleSeries] = useState(new Set(allLabels));
  const [hovered, setHovered] = useState(null);
  const wrapperRef = useRef(null);

  const toggleSeries = (label) => {
    setVisibleSeries(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        if (next.size > 1) next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const visibleData = CHART_SERIES.filter(s => visibleSeries.has(s.label));

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    const svgX  = (cssX / rect.width) * W;
    let nearest = 0, minDist = Infinity;
    for (let i = 0; i < N; i++) {
      const d = Math.abs(svgX - toX(i));
      if (d < minDist) { minDist = d; nearest = i; }
    }
    setHovered({ idx: nearest, cssX, cssY, wrapperW: rect.width });
  };

  return (
    <div style={{ borderRadius: 8, padding: '16px', background: CARD_BG, border: '0.3px solid rgba(20,57,125,0.15)', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header + period toggle */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...TEXT, fontSize: 16, fontWeight: 600, color: '#101828', lineHeight: '22px' }}>
            Historical Performance
          </span>
          <span style={{ ...TEXT, fontSize: 13, fontWeight: 400, color: '#808080', lineHeight: '18px', letterSpacing: '0.07px', display: 'block', marginBottom: 12 }}>
            Risk score and key drivers over 12 quarters
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <div style={{
            background: 'linear-gradient(180deg, #6717cd 0%, #2871fa 100%)',
            borderRadius: 30, padding: '3px 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ ...TEXT, fontSize: 10, fontWeight: 600, color: '#fff', lineHeight: '16px', minWidth: 28, textAlign: 'center' }}>
              3Y
            </span>
          </div>
          {['5Y', '10Y'].map(label => (
            <div key={label} style={{
              background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: 30, padding: '3px 10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ ...TEXT, fontSize: 10, fontWeight: 600, color: '#b8b8b8', lineHeight: '16px', minWidth: 28, textAlign: 'center' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', margin: '10px 0' }}>
        {CHART_SERIES.map(({ label, dotColor }) => (
          <div
            key={label}
            onClick={() => toggleSeries(label)}
            style={{ display: 'flex', gap: 8, alignItems: 'center', minWidth: 0, cursor: 'pointer', userSelect: 'none', flex: '1 0 auto' }}
          >
            <LegendCheckbox color={dotColor} checked={visibleSeries.has(label)} />
            <div style={{
              width: 16, height: 16, borderRadius: '50%', background: dotColor, flexShrink: 0,
              opacity: visibleSeries.has(label) ? 1 : 0.25, transition: 'opacity 0.15s ease',
            }} />
            <span style={{
              ...TEXT, fontSize: 13, fontWeight: 400, lineHeight: '16px', letterSpacing: '0.07px', whiteSpace: 'nowrap',
              color: visibleSeries.has(label) ? '#101828' : '#b0b0b0',
              transition: 'color 0.15s ease',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* SVG chart with hover */}
      <div
        ref={wrapperRef}
        style={{ position: 'relative', cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>

          {/* Horizontal grid lines */}
          {Y_LABELS.map(v => (
            <line key={v} x1={PAD_L} x2={W - PAD_R} y1={toY(v)} y2={toY(v)}
              stroke="rgba(165,165,170,0.4)" strokeWidth="0.5" />
          ))}

          {/* Y-axis labels — dominantBaseline centers text on the grid line */}
          {Y_LABELS.map(v => (
            <text key={v} x={PAD_L - 16} y={toY(v)}
              textAnchor="end" fontSize="9" fill="#101828" fontFamily="Outfit, sans-serif"
              dominantBaseline="middle">
              {v}
            </text>
          ))}

          {/* Vertical grid lines */}
          {QUARTERS.map((_, i) => (
            <line key={i}
              x1={toX(i)} x2={toX(i)} y1={PAD_T} y2={PAD_T + chartH}
              stroke="rgba(165,165,170,0.3)" strokeWidth="0.3" />
          ))}

          {/* Y-axis bar */}
          <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={PAD_T + chartH}
            stroke="rgba(165,165,170,0.5)" strokeWidth="0.5" />

          {/* X-axis labels */}
          {QUARTERS.map((q, i) => (
            <text key={q} x={toX(i)} y={PAD_T + chartH + 24}
              textAnchor="middle" fontSize="9" fill="#101828" fontFamily="Outfit, sans-serif"
              dominantBaseline="hanging">
              {q}
            </text>
          ))}

          {/* Chart lines */}
          {[...visibleData].reverse().map(({ label, data, stroke }) => (
            <path key={label}
              d={smoothPath(data.map((v, i) => [toX(i), toY(v)]))}
              fill="none" stroke={stroke} strokeWidth="2" strokeOpacity="0.85" />
          ))}

          {/* Data-point dots */}
          {visibleData.map(({ label, data, dotColor }) =>
            data.map((v, i) => (
              <circle key={`${label}-${i}`}
                cx={toX(i)} cy={toY(v)} r={hovered && hovered.idx === i ? 0 : 4}
                fill={dotColor} stroke="#fefdff" strokeWidth="1.5" />
            ))
          )}

          {/* Hover crosshair */}
          {hovered && (
            <line
              x1={toX(hovered.idx)} x2={toX(hovered.idx)}
              y1={PAD_T} y2={PAD_T + chartH}
              stroke="rgba(40,113,250,0.35)" strokeWidth="1" strokeDasharray="4 3"
            />
          )}

          {/* Hover highlight dots */}
          {hovered && visibleData.map(({ label, data, dotColor }) => (
            <circle key={label}
              cx={toX(hovered.idx)} cy={toY(data[hovered.idx])} r={6}
              fill={dotColor} stroke="#fefdff" strokeWidth="2" />
          ))}

          {/* Event annotations */}
          {EVENTS.map(({ idx, line1 }) => (
            <line key={line1}
              x1={toX(idx)} x2={toX(idx)} y1={PAD_T} y2={PAD_T + chartH}
              stroke="rgba(165,165,170,0.5)" strokeWidth="0.8" strokeDasharray="3 3" />
          ))}

          {EVENTS.map(({ idx, line1, line2 }) => {
            const x = toX(idx);
            const yBase = PAD_T + chartH + 60;
            return (
              <g key={line1}>
                <polygon points={`${x - 4},${yBase} ${x + 4},${yBase} ${x},${yBase - 7}`} fill="#808080" />
                <text x={x} y={yBase + 12} textAnchor="middle" fontSize="9" fill="#808080" fontFamily="Outfit, sans-serif">
                  {line1}
                </text>
                <text x={x} y={yBase + 24} textAnchor="middle" fontSize="9" fill="#808080" fontFamily="Outfit, sans-serif">
                  {line2}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hovered && (
          <ChartTooltip
            quarter={QUARTERS[hovered.idx]}
            series={visibleData.map(s => ({ label: s.label, value: s.data[hovered.idx], color: s.dotColor }))}
            cssX={hovered.cssX}
            cssY={hovered.cssY}
            wrapperW={hovered.wrapperW}
          />
        )}
      </div>

      {/* Thin divider before Summary */}
      <div style={{ height: '0.3px', background: 'rgba(8,23,50,0.15)', margin: '0 10px' }} />

      {/* Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ ...TEXT, fontSize: 16, fontWeight: 700, color: '#808080', lineHeight: '16px' }}>
          Summary
        </span>
        <p style={{ ...TEXT, fontSize: 16, fontWeight: 400, color: '#808080', lineHeight: '23px', letterSpacing: '0.07px', margin: 0 }}>
          Risk score has declined 24 points over 12 quarters (65 → 41). Primary drivers: cash flow contraction
          (−58% indexed) and leverage increase (D/EBITDA: 4.2x → 9.55x). Deterioration began Q3 2024 following
          the credit downgrade and accelerated after the Q2 2025 covenant waiver.
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Latest Review Notes Card
// ════════════════════════════════════════════════════════════════
function NoteEditPanel({ initialText, onSave, onCancel }) {
  const [text, setText] = useState(initialText);
  const [saveHovered, setSaveHovered] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.focus(); }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <textarea
        ref={ref}
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={e => e.target.style.borderColor = '#2871fa'}
        onBlur={e => e.target.style.borderColor = '#e1d1f5'}
        style={{
          width: '100%', minHeight: 88,
          border: '0.5px solid #e1d1f5', borderRadius: 12, padding: '12px 14px',
          fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 400,
          color: '#101828', lineHeight: '22px', resize: 'vertical',
          outline: 'none', background: '#fefdff', boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
      />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          onMouseEnter={() => setCancelHovered(true)}
          onMouseLeave={() => setCancelHovered(false)}
          style={{
            ...TEXT, padding: '7px 16px',
            background: cancelHovered ? 'rgba(8,23,50,0.06)' : 'transparent',
            border: '0.5px solid #e1d1f5', borderRadius: 30, cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: '#4a5565', transition: 'background 0.15s',
          }}
        >Cancel</button>
        <button
          onClick={() => text.trim() && onSave(text.trim())}
          onMouseEnter={() => setSaveHovered(true)}
          onMouseLeave={() => setSaveHovered(false)}
          style={{
            ...TEXT, padding: '7px 16px',
            background: saveHovered ? '#1a60e8' : '#2871fa',
            border: 'none', borderRadius: 30, cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: '#fefdff',
            transition: 'background 0.15s',
            opacity: text.trim() ? 1 : 0.5,
          }}
        >Save</button>
      </div>
    </div>
  );
}

function ReviewNote({ note, onEdit, onDelete }) {
  const [replyHovered, setReplyHovered] = useState(false);
  const [editHovered, setEditHovered] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyCancelHovered, setReplyCancelHovered] = useState(false);
  const [replySubmitHovered, setReplySubmitHovered] = useState(false);
  const replyRef = useRef(null);

  useEffect(() => {
    if (showReply && replyRef.current) replyRef.current.focus();
  }, [showReply]);

  const rawText = note.text.replace(/^"|"$/g, '');

  return (
    <div style={{ background: INNER_BG, borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <img src={note.avatar} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ ...TEXT, fontSize: 15, fontWeight: 600, color: '#101828', lineHeight: '20px', letterSpacing: '0.07px' }}>
                {note.name}
              </span>
              <span style={{ ...TEXT, fontSize: 15, fontWeight: 600, color: '#4a5565', lineHeight: '20px' }}>
                {note.role}
              </span>
            </div>
            <span style={{ ...TEXT, fontSize: 15, fontWeight: 400, color: '#4a5565', lineHeight: '20px', letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
              {note.date}
            </span>
          </div>

          {isEditing ? (
            <NoteEditPanel
              initialText={rawText}
              onSave={(newText) => { onEdit(note.id, newText); setIsEditing(false); }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ ...TEXT, fontSize: 16, fontWeight: 400, color: '#364153', lineHeight: '26px' }}>
                {note.text}
              </span>
              {note.isUserNote ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button
                    onClick={() => setIsEditing(true)}
                    onMouseEnter={() => setEditHovered(true)}
                    onMouseLeave={() => setEditHovered(false)}
                    style={{
                      border: 'none', cursor: 'pointer', padding: '2px 6px',
                      ...TEXT, fontSize: 14, fontWeight: 600, lineHeight: '20px',
                      background: 'linear-gradient(90deg, #2871fa 0%, #6717cd 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      opacity: editHovered ? 0.8 : 1, transition: 'opacity 0.15s',
                    }}
                  >Edit</button>
                  <span style={{ color: '#e1d1f5', fontSize: 14 }}>|</span>
                  <button
                    onClick={() => onDelete(note.id)}
                    onMouseEnter={() => setDeleteHovered(true)}
                    onMouseLeave={() => setDeleteHovered(false)}
                    style={{
                      border: 'none', cursor: 'pointer', padding: '2px 6px',
                      ...TEXT, fontSize: 14, fontWeight: 600, lineHeight: '20px',
                      background: 'linear-gradient(90deg, #2871fa 0%, #6717cd 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      opacity: deleteHovered ? 0.8 : 1, transition: 'opacity 0.15s',
                    }}
                  >Delete</button>
                </div>
              ) : (
                <button
                  onClick={() => setShowReply(s => !s)}
                  onMouseEnter={() => setReplyHovered(true)}
                  onMouseLeave={() => setReplyHovered(false)}
                  style={{
                    border: 'none', cursor: 'pointer', padding: 0, alignSelf: 'flex-start',
                    ...TEXT, fontSize: 14, fontWeight: 600, lineHeight: '20px',
                    background: 'linear-gradient(90deg, #2871fa 0%, #6717cd 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    opacity: replyHovered ? 0.75 : 1, transition: 'opacity 0.15s',
                  }}
                >{showReply ? 'Cancel' : 'Reply'}</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reply panel */}
      {showReply && (
        <div style={{
          background: '#fefdff', border: '0.5px solid #e1d1f5',
          borderRadius: 8, padding: '14px', marginLeft: 56,
          display: 'flex', flexDirection: 'column', gap: 16,
          boxShadow: '0 2px 12px rgba(20,57,125,0.08)',
        }}>
          {/* Replying to context */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...TEXT, fontSize: 12, fontWeight: 400, color: '#a5a5aa', lineHeight: '16px' }}>
              Replying to
            </span>
            <img src={note.avatar} alt="" style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ ...TEXT, fontSize: 12, fontWeight: 600, color: '#4a5565', lineHeight: '16px' }}>
              {note.name}
            </span>
          </div>

          {/* Author row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={imgProfile} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1px solid #e1d1f5' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ ...TEXT, fontSize: 14, fontWeight: 600, color: '#101828', lineHeight: '18px' }}>Adam Johnson</span>
              <span style={{ ...TEXT, fontSize: 12, fontWeight: 400, color: '#808080', lineHeight: '16px' }}>Senior Risk Analyst</span>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            ref={replyRef}
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            onFocus={e => e.target.style.borderColor = '#2871fa'}
            onBlur={e => e.target.style.borderColor = '#e1d1f5'}
            style={{
              width: '100%', minHeight: 80,
              border: '0.5px solid #e1d1f5', borderRadius: 12, padding: '12px 14px',
              fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 400,
              color: '#101828', lineHeight: '22px', resize: 'vertical',
              outline: 'none', background: '#fefdff', boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
          />

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={() => { setShowReply(false); setReplyText(''); }}
              onMouseEnter={() => setReplyCancelHovered(true)}
              onMouseLeave={() => setReplyCancelHovered(false)}
              style={{
                ...TEXT, padding: '8px 18px',
                background: replyCancelHovered ? 'rgba(8,23,50,0.06)' : 'transparent',
                border: '0.5px solid #e1d1f5', borderRadius: 30, cursor: 'pointer',
                fontSize: 13, fontWeight: 600, color: '#4a5565', transition: 'background 0.15s',
              }}
            >Cancel</button>
            <button
              onClick={() => { if (replyText.trim()) { setShowReply(false); setReplyText(''); } }}
              onMouseEnter={() => setReplySubmitHovered(true)}
              onMouseLeave={() => setReplySubmitHovered(false)}
              style={{
                ...TEXT, padding: '8px 18px',
                background: 'linear-gradient(116.96deg, #2871fa 0%, #6717cd 100%)',
                border: 'none', borderRadius: 30, cursor: 'pointer',
                fontSize: 13, fontWeight: 600, color: '#fefdff',
                opacity: replyText.trim() ? (replySubmitHovered ? 0.8 : 1) : 0.5,
                transition: 'opacity 0.15s',
              }}
            >Reply</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewNotesCard() {
  const [plusHovered, setPlusHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState(NOTES);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (showInput && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showInput]);

  const handleAdd = () => {
    if (!noteText.trim()) return;
    const d = new Date();
    const dateStr = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    setNotes(prev => [{
      id: Date.now(),
      avatar: imgProfile,
      name: 'Adam Johnson',
      role: 'Senior Risk Analyst',
      date: dateStr,
      text: `"${noteText.trim()}"`,
      isUserNote: true,
    }, ...prev]);
    setNoteText('');
    setShowInput(false);
  };

  const handleEdit = (id, newText) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, text: `"${newText}"` } : n));
  };

  const handleDelete = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleCancel = () => {
    setNoteText('');
    setShowInput(false);
  };

  return (
    <div style={{ borderRadius: 8, padding: '16px', background: CARD_BG, border: '0.3px solid rgba(20,57,125,0.15)', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ ...TEXT, fontSize: 16, fontWeight: 600, color: '#101828', lineHeight: '22px', letterSpacing: '0.3px' }}>
          Latest Review Notes
        </span>
        <button
          onClick={() => setShowInput(s => !s)}
          onMouseEnter={() => setPlusHovered(true)}
          onMouseLeave={() => setPlusHovered(false)}
          style={{
            ...TEXT,
            background: showInput ? 'rgba(233,0,11,0.06)' : 'linear-gradient(116.96deg, #2871fa 0%, #6717cd 100%)',
            border: showInput ? '0.5px solid rgba(233,0,11,0.2)' : 'none',
            borderRadius: 8, padding: '6px 14px',
            cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600,
            color: showInput ? '#e9000b' : '#fefdff',
            opacity: !showInput && plusHovered ? 0.8 : 1,
            transition: 'opacity 0.15s, background 0.15s, color 0.15s, border 0.15s',
          }}
        >
          {showInput ? 'Cancel' : '+ Add Note'}
        </button>
      </div>

      {/* Input panel */}
      {showInput && (
        <div style={{
          background: '#fefdff',
          border: '0.5px solid #e1d1f5',
          borderRadius: 8,
          padding: '14px',
          display: 'flex', flexDirection: 'column', gap: 16,
          boxShadow: '0 2px 12px rgba(20,57,125,0.08)',
        }}>
          {/* Author row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={imgProfile} alt=""
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1px solid #e1d1f5' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ ...TEXT, fontSize: 15, fontWeight: 600, color: '#101828', lineHeight: '20px' }}>
                Adam Johnson
              </span>
              <span style={{ ...TEXT, fontSize: 12, fontWeight: 400, color: '#808080', lineHeight: '16px' }}>
                Senior Risk Analyst
              </span>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder="Write your review note..."
            onFocus={e => e.target.style.borderColor = '#2871fa'}
            onBlur={e => e.target.style.borderColor = '#e1d1f5'}
            style={{
              width: '100%', minHeight: 96,
              border: '0.5px solid #e1d1f5',
              borderRadius: 12, padding: '12px 14px',
              fontFamily: 'Outfit, sans-serif', fontSize: 14,
              fontWeight: 400, color: '#101828', lineHeight: '22px',
              resize: 'vertical', outline: 'none',
              background: '#fefdff',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
          />

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={handleCancel}
              onMouseEnter={() => setCancelHovered(true)}
              onMouseLeave={() => setCancelHovered(false)}
              style={{
                ...TEXT, padding: '8px 18px',
                background: cancelHovered ? 'rgba(8,23,50,0.06)' : 'transparent',
                border: '0.5px solid #e1d1f5',
                borderRadius: 30, cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                color: '#4a5565',
                transition: 'background 0.15s',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              onMouseEnter={() => setAddHovered(true)}
              onMouseLeave={() => setAddHovered(false)}
              style={{
                ...TEXT, padding: '8px 18px',
                background: 'linear-gradient(116.96deg, #2871fa 0%, #6717cd 100%)',
                border: 'none',
                borderRadius: 30, cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                color: '#fefdff',
                opacity: noteText.trim() ? (addHovered ? 0.8 : 1) : 0.5,
                transition: 'opacity 0.15s',
              }}
            >
              Add Note
            </button>
          </div>
        </div>
      )}

      {/* Notes list */}
      {notes.map(note => (
        <ReviewNote key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Supporting Documents Card
// ════════════════════════════════════════════════════════════════
function DocumentRow({ doc, showTooltip, onToggle }) {
  const [dlHovered, setDlHovered] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    if (!showTooltip) return;
    const handler = (e) => {
      if (rowRef.current && !rowRef.current.contains(e.target)) onToggle();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTooltip, onToggle]);

  return (
    <div ref={rowRef} style={{ position: 'relative' }}>
      <div
        onClick={onToggle}
        style={{
          background: INNER_BG,
          border: '0.3px solid rgba(20,57,125,0.15)',
          borderRadius: 8, padding: '12px 14px',
          cursor: 'pointer',
        }}
      >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <img src={doc.icon} alt="" style={{ width: 28, height: 28, objectFit: 'contain', opacity: 0.75, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#101828', lineHeight: '20px', letterSpacing: '0.07px' }}>
            {doc.name}
          </span>
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#364153', lineHeight: '18px' }}>
            {doc.meta}
          </span>
        </div>
        <img
          src={imgCIDownloadGradient} alt="Download"
          onMouseEnter={() => setDlHovered(true)}
          onMouseLeave={() => setDlHovered(false)}
          style={{
            width: 22, height: 22, objectFit: 'contain', flexShrink: 0,
            opacity: dlHovered ? 0.75 : 1,
            cursor: 'pointer', transition: 'opacity 0.15s',
          }}
        />
      </div>
      </div>
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

function SupportingDocumentsCard() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ borderRadius: 8, padding: '16px', background: CARD_BG, border: '0.3px solid rgba(20,57,125,0.15)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={{ ...TEXT, fontSize: 16, fontWeight: 600, color: '#101828', lineHeight: '22px', letterSpacing: '0.3px' }}>
        Supporting Documents
      </span>
      {DOCS.map((doc, i) => (
        <DocumentRow
          key={i}
          doc={doc}
          showTooltip={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? null : i)}
        />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Main export
// ════════════════════════════════════════════════════════════════
export default function ContextualInsightsTab() {
  const { isMobile, isTablet } = useBreakpoint();
  const isStacked = isMobile || isTablet;

  return (
    <div style={{ display: 'flex', flexDirection: isStacked ? 'column' : 'row', gap: 16, alignItems: 'flex-start' }}>
      {/* Left column */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <CovenantTrackingCard />
        <HistoricalPerformanceCard />
      </div>
      {/* Right column */}
      <div style={{
        flex: isStacked ? 'none' : '0 0 calc(25% - 12px)',
        width: isStacked ? '100%' : undefined,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <ReviewNotesCard />
        <SupportingDocumentsCard />
      </div>
    </div>
  );
}
