// SVG line chart for financial trends over 5 quarters

const W      = 756;
const H      = 545;
const PAD_L  = 48;   // left — y-axis labels
const PAD_T  = 16;
const PAD_B  = 45;   // bottom — x-axis labels
const chartW = W - PAD_L;        // 708
const chartH = H - PAD_T - PAD_B; // 484

const toX = i  => PAD_L + (i / 4) * chartW;
const toY = v  => PAD_T + (1 - v / 100) * chartH;

const QUARTERS   = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'];
const Y_LABELS   = [100, 75, 50, 25, 0];
const GRID_VALS  = [100, 75, 50, 25, 0];

// Smooth cubic-bezier path through array of [x,y] points
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

export default function FinancialChart({ data }) {
  const { quarters = QUARTERS, revenue, cashFlow, debt } = data;

  const revPts  = revenue.map((v, i)  => [toX(i), toY(v)]);
  const cfPts   = cashFlow.map((v, i) => [toX(i), toY(v)]);
  const debtPts = debt.map((v, i)     => [toX(i), toY(v)]);

  return (
    <div style={{
      background: 'linear-gradient(113.65deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)',
      borderRadius: 30, padding: 50, display: 'flex', flexDirection: 'column', gap: 50,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: '#081732', letterSpacing: '0.72px', lineHeight: '32px' }}>
          Financial Trends
        </span>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {[
            { label: 'Revenue',   color: '#081732' },
            { label: 'Cash Flow', color: '#6717cd' },
            { label: 'Debt',      color: '#9a64de' },
          ].map(({ label, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 400, color: '#081732', letterSpacing: '-0.15px', lineHeight: '20px' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        {/* Horizontal grid lines */}
        {GRID_VALS.map(v => (
          <line key={v} x1={PAD_L} x2={W} y1={toY(v)} y2={toY(v)}
            stroke="rgba(165,165,170,0.4)" strokeWidth="0.5" />
        ))}

        {/* Vertical grid lines */}
        {quarters.map((_, i) => (
          <line key={i} x1={toX(i)} x2={toX(i)} y1={PAD_T} y2={PAD_T + chartH}
            stroke="rgba(165,165,170,0.3)" strokeWidth="0.3" />
        ))}

        {/* Y-axis labels */}
        {Y_LABELS.map(v => (
          <text key={v} x={PAD_L - 6} y={toY(v) + 5}
            textAnchor="end" fontSize="14" fill="#081732"
            fontFamily="Outfit, sans-serif" letterSpacing="-0.15">
            {v}
          </text>
        ))}

        {/* X-axis labels */}
        {quarters.map((q, i) => (
          <text key={q} x={toX(i)} y={H - 8}
            textAnchor="middle" fontSize="14" fill="#081732"
            fontFamily="Outfit, sans-serif" letterSpacing="-0.15">
            {q}
          </text>
        ))}

        {/* Chart lines */}
        <path d={smoothPath(debtPts)}  fill="none" stroke="#9a64de" strokeWidth="1.5" />
        <path d={smoothPath(cfPts)}    fill="none" stroke="#6717cd" strokeWidth="1.5" />
        <path d={smoothPath(revPts)}   fill="none" stroke="#081732" strokeWidth="1.5" />

        {/* Data-point dots */}
        {revPts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill="#081732" />
        ))}
        {cfPts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill="#6717cd" />
        ))}
        {debtPts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill="#9a64de" />
        ))}
      </svg>
    </div>
  );
}
