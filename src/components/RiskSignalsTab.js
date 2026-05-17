import { useState, useRef, useEffect } from 'react';
import { imgXCircleRed, imgAlertCircle, imgExtLinkUpGradient } from '../assets/images';
import { useBreakpoint } from '../hooks/useBreakpoint';

const CARD_BG  = '#fefdff';
const INNER_BG = '#F9F8FF';

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

function SeverityBadge({ level }) {
  const isHigh = level === 'HIGH';
  return (
    <div style={{
      background: isHigh ? '#e9000b' : '#d69200',
      borderRadius: 30, padding: '1px 10px',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 57,
    }}>
      <span style={{ ...TEXT, fontSize: 8, fontWeight: 600, color: '#fefdff', lineHeight: '16px', textAlign: 'center' }}>
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
  const [showTooltip, setShowTooltip] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    if (!showTooltip) return;
    const handler = (e) => {
      if (rowRef.current && !rowRef.current.contains(e.target)) setShowTooltip(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTooltip]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div ref={rowRef} style={{ display: 'flex', alignItems: 'center', paddingTop: 12, paddingBottom: 12, gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-start' }}>
          <img
            src={signal.severity === 'HIGH' ? imgXCircleRed : imgAlertCircle}
            alt=""
            style={{ width: 16, height: 16, flexShrink: 0 }}
          />
          <span style={{ ...TEXT, fontSize: 15, fontWeight: 400, color: '#081732', lineHeight: '22px', letterSpacing: '0.07px' }}>
            {signal.name}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SeverityBadge level={signal.severity} />
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...TEXT, fontSize: 15, fontWeight: 400, color: '#081732', lineHeight: '22px', letterSpacing: '0.07px' }}>
            {signal.impact}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#808080', lineHeight: '22px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>
            {signal.detected}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...TEXT, fontSize: 15, fontWeight: 400, color: '#081732', lineHeight: '22px', letterSpacing: '0.07px' }}>
            {signal.status}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#808080', lineHeight: '22px', letterSpacing: '0.07px' }}>
            {signal.desc}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <button
            onClick={() => setShowTooltip(s => !s)}
            onMouseEnter={() => setViewHovered(true)}
            onMouseLeave={() => setViewHovered(false)}
            style={{
              border: 'none', cursor: 'pointer', padding: 0,
              ...TEXT, fontSize: 15, fontWeight: 600,
              background: 'linear-gradient(90deg, #2871fa 0%, #6717cd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '22px', letterSpacing: '0.07px',
              whiteSpace: 'nowrap',
              opacity: viewHovered ? 0.75 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            View →
          </button>
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
      </div>
      {!isLast && <Divider />}
    </div>
  );
}

function ExternalCard({ card, cardFlex }) {
  const [linkHovered, setLinkHovered] = useState(false);
  return (
    <div style={{
      background: INNER_BG, borderRadius: 8,
      padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      flex: cardFlex,
      cursor: 'pointer',
      border: '0.3px solid rgba(20,57,125,0.15)',
      minWidth: 0,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...TEXT, fontSize: 14, fontWeight: 400, color: '#4a5565', lineHeight: '20px', letterSpacing: '-0.15px' }}>
            {card.title}
          </span>
          {card.indicator && <span style={{ fontSize: 18 }}>{card.indicator}</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...TEXT, fontSize: 16, fontWeight: 600, color: '#364153', lineHeight: '22px', letterSpacing: '0.3px' }}>
            {card.value}
          </span>

          {card.hasXCircle ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={imgXCircleRed} alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
              <span style={{ ...TEXT, fontSize: 14, color: '#7c7c80', lineHeight: '20px' }}>{card.desc}</span>
            </div>
          ) : (
            <span style={{ ...TEXT, fontSize: 14, color: '#7c7c80', lineHeight: '20px' }}>{card.desc}</span>
          )}
        </div>
      </div>

      <div>
        <Divider />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <span style={{ ...TEXT, fontSize: 13, fontWeight: 600, color: '#a5a5aa', lineHeight: '20px' }}>
            Last updated: {card.updated}
          </span>
          <img
            src={imgExtLinkUpGradient}
            alt="External link"
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            style={{
              width: 22, height: 22, objectFit: 'contain', transform: 'rotate(45deg)',
              opacity: linkHovered ? 0.75 : 1,
              cursor: 'pointer', transition: 'opacity 0.15s',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function RiskSignalsTab() {
  const { isMobile, isTablet } = useBreakpoint();
  const extCardFlex = isMobile ? '0 0 100%' : isTablet ? '0 0 calc(50% - 8px)' : '1 0 0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Risk Signals Table */}
      <div style={{ borderRadius: 8, padding: '16px', background: CARD_BG, border: '0.3px solid rgba(20,57,125,0.15)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ ...TEXT, fontSize: 16, fontWeight: 600, color: '#081732', lineHeight: '22px', letterSpacing: '0.3px' }}>
              Risk Signals ({SIGNALS.length})
            </span>
            <p style={{ ...TEXT, fontSize: 13, fontWeight: 400, color: '#808080', lineHeight: '18px', letterSpacing: '-0.15px', margin: 0, marginBottom: 8 }}>
              Internal risk factors detected by Dragin's monitoring engine
            </p>
          </div>
        </div>

        {/* Table — scrollable on mobile */}
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ background: INNER_BG, borderRadius: 8, padding: '14px 16px', minWidth: 640 }}>
            {/* Column headers */}
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 12, gap: 12 }}>
              {COLS.map(col => (
                <div key={col.label} style={{ flex: col.flex, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: col.align === 'left' ? 'flex-start' : 'center' }}>
                  <span style={{ ...TEXT, fontSize: 15, fontWeight: 600, color: '#081732', lineHeight: '22px', letterSpacing: '0.07px' }}>
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
      </div>

      {/* External Intelligence */}
      <div style={{ borderRadius: 8, padding: '16px 16px 12px', background: CARD_BG, border: '0.3px solid rgba(20,57,125,0.15)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...TEXT, fontSize: 16, fontWeight: 600, color: '#101828', lineHeight: '22px', letterSpacing: '0.3px' }}>
            External Intelligence
          </span>
          <p style={{ ...TEXT, fontSize: 13, fontWeight: 400, color: '#808080', lineHeight: '18px', letterSpacing: '-0.15px', margin: 0, marginBottom: 8 }}>
            Third-party data sources monitoring this borrower
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: 16, columnGap: 16 }}>
          {EXTERNAL.map(card => <ExternalCard key={card.id} card={card} cardFlex={extCardFlex} />)}
        </div>
      </div>

    </div>
  );
}
