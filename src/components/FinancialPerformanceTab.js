import { useState, useRef } from 'react';
import { imgFPCheckCircle, imgFPAlertCircle } from '../assets/images';
import { useBreakpoint } from '../hooks/useBreakpoint';

const CARD_BG = 'linear-gradient(114deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)';
const QUARTERS = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'];
const Y_LABELS = [100, 75, 50, 25, 0];

const W = 570, H = 375;
const PAD_L = 32, PAD_R = 32, PAD_T = 16, PAD_B = 40;
const chartW = W - PAD_L - PAD_R;
const chartH = H - PAD_T - PAD_B;
const BAR_W  = 51;
const LABEL_X = PAD_L - 8;

const slotW     = chartW / QUARTERS.length;
const toSlotX   = i => PAD_L + slotW * (i + 0.5);
const toLineX   = i => PAD_L + (i / (QUARTERS.length - 1)) * chartW;
const toY = v => PAD_T + (1 - v / 100) * chartH;

const REVENUE_DATA   = [93, 86, 81, 75, 66];
const CASHFLOW_DATA  = [91, 75, 63, 56, 45];
const DEBT_DATA      = [56, 64, 74, 81, 84];
const LIQUIDITY_DATA = [87, 73, 73, 71, 65];

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

function roundedTopRect(x, y, w, h, r) {
  if (h <= 0) return '';
  const r2 = Math.min(r, h, w / 2);
  return `M ${x},${y + h} L ${x},${y + r2} Q ${x},${y} ${x + r2},${y} L ${x + w - r2},${y} Q ${x + w},${y} ${x + w},${y + r2} L ${x + w},${y + h} Z`;
}

function SvgGrid({ xFn }) {
  return (
    <>
      {Y_LABELS.map(v => (
        <line key={v} x1={PAD_L} x2={W - PAD_R} y1={toY(v)} y2={toY(v)}
          stroke="rgba(165,165,170,0.4)" strokeWidth="0.5" />
      ))}
      {QUARTERS.map((_, i) => (
        <line key={i} x1={xFn(i)} x2={xFn(i)} y1={PAD_T} y2={toY(0)}
          stroke="rgba(165,165,170,0.3)" strokeWidth="0.3" />
      ))}
      <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={toY(0)}
        stroke="rgba(165,165,170,0.5)" strokeWidth="0.5" />
      {Y_LABELS.map(v => (
        <text key={v} x={LABEL_X} y={toY(v) + 5}
          textAnchor="end" fontSize="14" fill="#081732"
          fontFamily="Outfit, sans-serif" letterSpacing="-0.15">
          {v}
        </text>
      ))}
      {QUARTERS.map((q, i) => (
        <text key={q} x={xFn(i)} y={H - 5}
          textAnchor="middle" fontSize="14" fill="#081732"
          fontFamily="Outfit, sans-serif" letterSpacing="-0.15">
          {q}
        </text>
      ))}
    </>
  );
}

function BarTooltip({ quarter, label, value, cssX, cssY, wrapperW }) {
  const TW = 130, TH = 52;
  const left = Math.max(0, Math.min(cssX - TW / 2, wrapperW - TW));
  const top  = cssY - TH - 14 > 5 ? cssY - TH - 14 : cssY + 14;
  return (
    <div style={{
      position: 'absolute', left, top, width: TW,
      background: '#fefdff', borderRadius: 10, padding: 10,
      display: 'flex', flexDirection: 'column', gap: 5,
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      pointerEvents: 'none', zIndex: 20,
    }}>
      <span style={{ fontSize: 8, fontWeight: 600, color: '#000', lineHeight: '16px', whiteSpace: 'nowrap' }}>
        {quarter}
      </span>
      <span style={{ fontSize: 14, fontWeight: 400, color: '#000', lineHeight: '20px', letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
        {label}: {value}
      </span>
    </div>
  );
}

function LineTooltip({ quarter, label, value, stroke, cssX, cssY, wrapperW }) {
  const TW = 200;
  const left = Math.max(0, Math.min(cssX - TW / 2, wrapperW - TW));
  const top  = cssY - 80 - 14 > 5 ? cssY - 80 - 14 : cssY + 14;
  return (
    <div style={{
      position: 'absolute', left, top, width: TW,
      background: '#fefdff', borderRadius: 20, padding: '16px 20px',
      display: 'flex', flexDirection: 'column', gap: 10,
      boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
      pointerEvents: 'none', zIndex: 20,
    }}>
      <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, color: '#808080', lineHeight: '16px' }}>
        {quarter}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: stroke, flexShrink: 0 }} />
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 400, color: '#364153', flex: 1, lineHeight: '20px', letterSpacing: '-0.15px' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600, color: '#101828', lineHeight: '20px', letterSpacing: '-0.15px' }}>
          {value}
        </span>
      </div>
    </div>
  );
}

function BarChartSVG({ data, gradId, tooltipLabel }) {
  const wrapperRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    const svgX = (cssX / rect.width) * W;
    let nearest = -1, minDist = Infinity;
    for (let i = 0; i < QUARTERS.length; i++) {
      const dist = Math.abs(svgX - toSlotX(i));
      if (dist < slotW / 2 && dist < minDist) { minDist = dist; nearest = i; }
    }
    setHovered(nearest >= 0 ? { idx: nearest, cssX, cssY, wrapperW: rect.width } : null);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(40,113,250,0.65)" />
            <stop offset="100%" stopColor="rgba(103,23,205,0.65)" />
          </linearGradient>
        </defs>
        <SvgGrid xFn={toSlotX} />
        {data.map((v, i) => (
          <g key={i}>
            <path
              d={roundedTopRect(toSlotX(i) - BAR_W / 2, toY(v), BAR_W, toY(0) - toY(v), 10)}
              fill={`url(#${gradId})`}
            />
            {hovered && hovered.idx === i && (
              <path
                d={roundedTopRect(toSlotX(i) - BAR_W / 2, toY(v), BAR_W, toY(0) - toY(v), 10)}
                fill="rgba(255,255,255,0.15)"
              />
            )}
          </g>
        ))}
        {hovered && (
          <line
            x1={toSlotX(hovered.idx)} x2={toSlotX(hovered.idx)}
            y1={PAD_T} y2={toY(0)}
            stroke="rgba(40,113,250,0.35)" strokeWidth="1" strokeDasharray="4 3"
          />
        )}
      </svg>
      {hovered && (
        <BarTooltip
          quarter={QUARTERS[hovered.idx]} label={tooltipLabel}
          value={data[hovered.idx]} cssX={hovered.cssX}
          cssY={hovered.cssY} wrapperW={hovered.wrapperW}
        />
      )}
    </div>
  );
}

function LineChartSVG({ data, stroke, tooltipLabel }) {
  const wrapperRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const pts = data.map((v, i) => [toLineX(i), toY(v)]);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    const svgX = (cssX / rect.width) * W;
    let nearest = 0, minDist = Infinity;
    for (let i = 0; i < QUARTERS.length; i++) {
      const d = Math.abs(svgX - toLineX(i));
      if (d < minDist) { minDist = d; nearest = i; }
    }
    setHovered({ idx: nearest, cssX, cssY, wrapperW: rect.width });
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', cursor: 'crosshair' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        <SvgGrid xFn={toLineX} />
        <path d={smoothPath(pts)} fill="none" stroke={stroke} strokeWidth="2" strokeOpacity="0.85" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y}
            r={hovered && hovered.idx === i ? 0 : 4}
            fill={stroke} stroke="#fefdff" strokeWidth="1.5" />
        ))}
        {hovered && (
          <line
            x1={toLineX(hovered.idx)} x2={toLineX(hovered.idx)}
            y1={PAD_T} y2={toY(0)}
            stroke="rgba(40,113,250,0.35)" strokeWidth="1" strokeDasharray="4 3"
          />
        )}
        {hovered && (
          <circle
            cx={toLineX(hovered.idx)} cy={toY(data[hovered.idx])} r={6}
            fill={stroke} stroke="#fefdff" strokeWidth="2" />
        )}
      </svg>
      {hovered && (
        <LineTooltip
          quarter={QUARTERS[hovered.idx]} label={tooltipLabel} stroke={stroke}
          value={data[hovered.idx]} cssX={hovered.cssX}
          cssY={hovered.cssY} wrapperW={hovered.wrapperW}
        />
      )}
    </div>
  );
}

function ChartCard({ title, metricLabel, metricValue, subtitle, sidePad = 25, children }) {
  return (
    <div style={{
      flex: 1, minWidth: 0, borderRadius: 30,
      padding: `40px ${sidePad}px`,
      background: CARD_BG, display: 'flex', flexDirection: 'column', gap: 24,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 20, fontWeight: 600, color: '#101828', letterSpacing: '0.72px', lineHeight: '28px' }}>
            {title}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 400, color: '#4a5565', letterSpacing: '-0.15px', lineHeight: '20px', whiteSpace: 'nowrap' }}>
              {metricLabel}
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#e7000b', letterSpacing: '1.12px', lineHeight: 'normal', whiteSpace: 'nowrap' }}>
              {metricValue}
            </span>
          </div>
        </div>
        <span style={{ fontSize: 13, fontWeight: 400, color: '#808080', letterSpacing: '-0.15px', lineHeight: '20px' }}>
          {subtitle}
        </span>
      </div>
      {children}
    </div>
  );
}

const RATIOS = [
  {
    label: 'Revenue per Debt',    value: '1.63x', required: 'Required: ≥ 1.50x',
    statusText: '0.13 above threshold', icon: imgFPCheckCircle, indicator: null,
  },
  {
    label: 'Cash Flow Margin',    value: '4.6%',  required: 'Required: ≥ 10.0%',
    statusText: '5.4% below threshold', icon: imgFPAlertCircle, indicator: '🟠',
  },
  {
    label: 'Debt Service Coverage', value: '0.30x', required: 'Required: ≥ 1.25x',
    statusText: '76% below threshold', icon: imgFPAlertCircle, indicator: '🔴',
  },
  {
    label: 'Interest Coverage',   value: '1.5x',  required: 'Required: ≥ 3.0x',
    statusText: '1.5 below threshold',  icon: imgFPAlertCircle, indicator: '🔴',
  },
];

function RatioCard({ ratio, cardFlex }) {
  return (
    <div style={{
      flex: cardFlex, minWidth: 0, background: '#fefdff', borderRadius: 20,
      padding: '20px 25px', display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 400, color: '#4a5565', letterSpacing: '-0.15px', lineHeight: '20px' }}>
          {ratio.label}
        </span>
        {ratio.indicator && <span style={{ fontSize: 14 }}>{ratio.indicator}</span>}
      </div>
      <span style={{ fontSize: 24, fontWeight: 600, color: '#101828', letterSpacing: '0.72px', lineHeight: '32px' }}>
        {ratio.value}
      </span>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#808080', letterSpacing: '-0.1px', lineHeight: '20px', marginTop: 10 }}>
        {ratio.required}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={ratio.icon} alt="" style={{ width: 16, height: 16, objectFit: 'contain', flexShrink: 0 }} />
        <span style={{ fontSize: 14, fontWeight: 400, color: '#101828', letterSpacing: '-0.15px', lineHeight: '20px' }}>
          {ratio.statusText}
        </span>
      </div>
    </div>
  );
}

export default function FinancialPerformanceTab() {
  const { isMobile, isTablet } = useBreakpoint();
  const isStacked = isMobile || isTablet;
  const ratioFlex = isMobile ? '0 0 100%' : isTablet ? '0 0 calc(50% - 8px)' : '1 0 0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Bar charts */}
      <div style={{ display: 'flex', flexDirection: isStacked ? 'column' : 'row', gap: 20 }}>
        <ChartCard
          title="Revenue Trend"
          metricLabel="Period Change" metricValue="-8.7%"
          subtitle="Declining revenue signals weakening business fundamentals"
          sidePad={isStacked ? 20 : 40}
        >
          <BarChartSVG data={REVENUE_DATA} gradId="revBarGrad" tooltipLabel="Revenue" />
        </ChartCard>
        <ChartCard
          title="Operating Cash Flow (Quarterly)"
          metricLabel="Period Change" metricValue="-22.1%"
          subtitle="Volatile cash flow indicates operational stress"
          sidePad={isStacked ? 20 : 40}
        >
          <BarChartSVG data={CASHFLOW_DATA} gradId="cfBarGrad" tooltipLabel="Cash Flow" />
        </ChartCard>
      </div>

      {/* Line charts */}
      <div style={{ display: 'flex', flexDirection: isStacked ? 'column' : 'row', gap: 20 }}>
        <ChartCard
          title="Debt Levels"
          metricLabel="D/EBITDA:" metricValue="61%"
          subtitle="Rising debt-to-EBITDA approaches covenant breach at 3.5x"
          sidePad={isStacked ? 20 : 40}
        >
          <LineChartSVG data={DEBT_DATA} stroke="#1a2a4a" tooltipLabel="Debt" />
        </ChartCard>
        <ChartCard
          title="Liquidity Trend"
          metricLabel="Current Ratio" metricValue="1.12x"
          subtitle="Current ratio below 1.5x indicates thin liquidity cushion"
          sidePad={isStacked ? 20 : 40}
        >
          <LineChartSVG data={LIQUIDITY_DATA} stroke="#6717cd" tooltipLabel="Liquidity" />
        </ChartCard>
      </div>

      {/* Key Financial Ratios */}
      <div style={{
        borderRadius: 30, padding: '30px 25px 20px',
        background: CARD_BG, display: 'flex', flexDirection: 'column', gap: 25,
      }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: '#101828', letterSpacing: '0.72px', lineHeight: '32px' }}>
          Key Financial Ratios
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {RATIOS.map(r => <RatioCard key={r.label} ratio={r} cardFlex={ratioFlex} />)}
        </div>
      </div>
    </div>
  );
}
