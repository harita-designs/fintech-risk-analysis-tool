import { useState } from 'react';
import { imgXCircleRed, imgExtLinkUp } from '../assets/images';

const CARD_BG = 'linear-gradient(117.9deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)';

const SIGNALS = [
  { id: 1, name: 'Cash Flow',    severity: 'HIGH',   impact: '22%', detected: '2/24/2026', status: 'Open', desc: 'Significant decline in cash flow generation' },
  { id: 2, name: 'Market Cond.', severity: 'MEDIUM', impact: '15%', detected: '2/22/2026', status: 'Open', desc: 'Retail sector facing headwinds' },
  { id: 3, name: 'Liquidity',    severity: 'MEDIUM', impact: '13%', detected: '2/21/2026', status: 'Open', desc: 'Liquidity ratio approaching critical level' },
  { id: 4, name: 'Leverage',     severity: 'MEDIUM', impact: '11%', detected: '2/23/2026', status: 'Open', desc: 'Debt-to-income ratio exceeds recommended threshold' },
  { id: 5, name: 'Revenue',      severity: 'MEDIUM', impact: '9%',  detected: '2/22/2026', status: 'Open', desc: 'Revenue showing sustained decline' },
];

const EXTERNAL = [
  { id: 1, title: 'Credit Bureau Data',  indicator: '🔴', value: 'Credit score: 437',     desc: 'Below sector median (520) — elevated credit risk',          hasXCircle: true,  updated: '2026-02-26' },
  { id: 2, title: 'Public Filings',      indicator: null, value: 'No adverse filings',     desc: 'No bankruptcies, liens, or judgments on record',            hasXCircle: false, updated: '2026-02-20' },
  { id: 3, title: 'Industry Benchmarks', indicator: null, value: 'At sector median',       desc: 'Revenue growth and margins in line with retail peers',       hasXCircle: false, updated: '2026-02-15' },
  { id: 4, title: 'Market Intelligence', indicator: null, value: 'Normal market activity', desc: 'No news, M&A, or executive changes in last 30 days',        hasXCircle: false, updated: '2026-02-27' },
];

// 7 columns — all equal flex:1 for even spacing
const COLS = [
  { label: 'Signal',   flex: 1, align: 'left'   },
  { label: 'Severity', flex: 1, align: 'center' },
  { label: 'Impact',   flex: 1, align: 'center' },
  { label: 'Detected', flex: 1, align: 'center' },
  { label: 'Status',   flex: 1, align: 'center' },
  { label: 'Details',  flex: 1, align: 'left'   },
  { label: 'Action',   flex: 1, align: 'center' },
];

const TEXT = { fontFamily: 'Outfit, sans-serif' };
const BLUE_FILTER = 'invert(30%) sepia(100%) saturate(2000%) hue-rotate(210deg) brightness(100%)';

function SeverityBadge({ level }) {
  const isHigh = level === 'HIGH';
  return (
    <div style={{
      background: isHigh ? '#e9000b' : '#d69200',
      borderRadius: 30, padding: '3px 12px',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 57,
    }}>
      <span style={{ ...TEXT, fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: '18px', textAlign: 'center' }}>
        {level}
      </span>
    </div>
  );
}

function Divider({ color = 'rgba(8,23,50,0.08)', my = 0 }) {
  return <div style={{ height: 1, background: color, marginTop: my, marginBottom: my, width: '100%' }} />;
}

function SignalRow({ signal, isLast }) {
  const [viewHovered, setViewHovered] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: 32, paddingBottom: 32, gap: 16 }}>
        {/* Signal — flex:1, left */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <span style={{ ...TEXT, fontSize: 16, fontWeight: 400, color: '#081732', lineHeight: '24px', letterSpacing: '0.07px' }}>
            {signal.name}
          </span>
        </div>
        {/* Severity — flex:1, center */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SeverityBadge level={signal.severity} />
        </div>
        {/* Impact — flex:1, center */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...TEXT, fontSize: 16, fontWeight: 400, color: '#081732', lineHeight: '24px', letterSpacing: '0.07px' }}>
            {signal.impact}
          </span>
        </div>
        {/* Detected — flex:1, center */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...TEXT, fontSize: 16, fontWeight: 400, color: '#808080', lineHeight: '24px', letterSpacing: '0.07px' }}>
            {signal.detected}
          </span>
        </div>
        {/* Status — flex:1, center */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...TEXT, fontSize: 16, fontWeight: 400, color: '#081732', lineHeight: '24px', letterSpacing: '0.07px' }}>
            {signal.status}
          </span>
        </div>
        {/* Details — flex:1, matches all other columns */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <span style={{ ...TEXT, fontSize: 16, fontWeight: 400, color: '#808080', lineHeight: '24px', letterSpacing: '0.07px' }}>
            {signal.desc}
          </span>
        </div>
        {/* Action — flex:1, center */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onMouseEnter={() => setViewHovered(true)}
            onMouseLeave={() => setViewHovered(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              ...TEXT, fontSize: 16, fontWeight: 600,
              color: viewHovered ? '#6717cd' : '#2871fa',
              lineHeight: '24px', letterSpacing: '0.07px',
              transition: 'color 0.2s ease',
            }}
          >
            View →
          </button>
        </div>
      </div>

      {!isLast && <Divider />}
    </div>
  );
}

const PURPLE_FILTER = 'invert(25%) sepia(100%) saturate(2500%) hue-rotate(260deg) brightness(90%)';

function ExternalCard({ card }) {
  const [linkHovered, setLinkHovered] = useState(false);
  return (
    <div
      onClick={() => {}}
      style={{
        background: '#fefdff', borderRadius: 20,
        padding: '20px 25px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1,
        cursor: 'pointer',
        border: '0.3px solid #000',
      }}
    >
      {/* Title + indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#4a5565', lineHeight: '20px', letterSpacing: '-0.15px' }}>
          {card.title}
        </span>
        {card.indicator && <span style={{ fontSize: 18 }}>{card.indicator}</span>}
      </div>

      {/* Main value — equal margin above and below for balanced spacing */}
      <span style={{ ...TEXT, fontSize: 24, fontWeight: 600, color: '#364153', lineHeight: '32px', letterSpacing: '0.72px', margin: '8px 0' }}>
        {card.value}
      </span>

      {/* Description */}
      {card.hasXCircle ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={imgXCircleRed} alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
          <span style={{ ...TEXT, fontSize: 15, color: '#7c7c80', lineHeight: '20px' }}>{card.desc}</span>
        </div>
      ) : (
        <span style={{ ...TEXT, fontSize: 15, color: '#7c7c80', lineHeight: '20px' }}>{card.desc}</span>
      )}

      <Divider />

      {/* Footer — last line: bigger font, one shade lighter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ ...TEXT, fontSize: 14, fontWeight: 600, color: '#a5a5aa', lineHeight: '20px' }}>
          Last updated: {card.updated}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={imgExtLinkUp}
            alt="External link"
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            style={{
              width: 22, height: 22, objectFit: 'contain', transform: 'rotate(45deg)',
              filter: linkHovered ? PURPLE_FILTER : BLUE_FILTER,
              cursor: 'pointer', transition: 'filter 0.2s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function RiskSignalsTab() {
  const [plusHovered, setPlusHovered] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Risk Signals Table ── */}
      <div style={{ borderRadius: 30, padding: '30px 25px', background: CARD_BG, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Heading + subtitle — deliberate gap between them */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ ...TEXT, fontSize: 24, fontWeight: 600, color: '#081732', lineHeight: '32px', letterSpacing: '0.72px' }}>
              Risk Signals ({SIGNALS.length})
            </span>
            <p style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#808080', lineHeight: '20px', letterSpacing: '-0.15px', margin: 0 }}>
              Internal risk factors detected by Dragin's monitoring engine
            </p>
          </div>
          <button
            onMouseEnter={() => setPlusHovered(true)}
            onMouseLeave={() => setPlusHovered(false)}
            style={{
              background: plusHovered
                ? '#2871fa'
                : 'linear-gradient(180deg, rgba(40,113,250,0.1) 0%, rgba(103,23,205,0.1) 100%)',
              borderRadius: 100, width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
              transition: 'background 0.2s ease',
            }}
          >
            <span style={{ ...TEXT, fontSize: 22, fontWeight: 400, color: plusHovered ? '#fff' : '#101828', lineHeight: 1, marginTop: -1, transition: 'color 0.2s ease' }}>
              +
            </span>
          </button>
        </div>

        {/* White inner card */}
        <div style={{ background: '#fefdff', borderRadius: 30, padding: '24px 32px' }}>
          {/* Column headers — flex values must match SignalRow cells exactly */}
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 32, gap: 16 }}>
            {COLS.map(col => (
              <div key={col.label} style={{ flex: col.flex, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: col.align === 'left' ? 'flex-start' : 'center' }}>
                <span style={{ ...TEXT, fontSize: 16, fontWeight: 600, color: '#081732', lineHeight: '24px', letterSpacing: '0.07px' }}>
                  {col.label}
                </span>
              </div>
            ))}
          </div>

          <Divider my={0} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SIGNALS.map((signal, idx) => (
              <SignalRow key={signal.id} signal={signal} isLast={idx === SIGNALS.length - 1} />
            ))}
          </div>
        </div>
      </div>

      {/* ── External Intelligence ── */}
      <div style={{ borderRadius: 30, padding: '30px 25px 20px', background: CARD_BG, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Heading + subtitle — small gap between them */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...TEXT, fontSize: 24, fontWeight: 600, color: '#101828', lineHeight: '32px', letterSpacing: '0.72px' }}>
            External Intelligence
          </span>
          <p style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#808080', lineHeight: '20px', letterSpacing: '-0.15px', margin: 0 }}>
            Third-party data sources monitoring this borrower
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {EXTERNAL.map(card => <ExternalCard key={card.id} card={card} />)}
        </div>
      </div>

    </div>
  );
}
