import { useState } from 'react';
import { imgAlertTriangle, imgArrowForward, imgTrendingDown, imgTrendingUp } from '../assets/images';
import { riskColor, statusStyle } from '../data/borrowers';
import { useBreakpoint } from '../hooks/useBreakpoint';

const CARD_GRADIENT = 'linear-gradient(136.91deg, rgba(40,113,250,0.03) 50.33%, rgba(103,23,205,0.03) 95.81%)';

function TrendChip({ value, up }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <img src={up ? imgTrendingUp : imgTrendingDown} alt="" style={{ width: 12, height: 12 }} />
      <span style={{ fontSize: 16, fontWeight: 700, color: up ? '#05c04b' : '#e9000b', letterSpacing: '1.12px' }}>
        {value}
      </span>
    </div>
  );
}

function MetricCell({ label, value, trend, up, sub, subColor, cellFlex }) {
  return (
    <div style={{
      flex: cellFlex || '1 0 0', minWidth: 0, padding: '8px 16px', borderRadius: 16,
      background: CARD_GRADIENT, border: '0.5px solid rgba(20,57,125,0)',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <span style={{ fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#081732', letterSpacing: '-0.15px' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20, fontWeight: 400, lineHeight: '28px', color: '#081732', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>
          {value}
        </span>
        {trend && <TrendChip value={trend} up={up} />}
        {sub && (
          <span style={{ fontSize: 14, fontWeight: 700, color: subColor || '#081732', letterSpacing: '1.12px', whiteSpace: 'nowrap' }}>
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const st = statusStyle(status);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      background: st.bg, border: `1px solid ${st.border}`,
      borderRadius: 30, padding: '4px 14px', flexShrink: 0,
    }}>
      {status === 'Review Needed' && (
        <img src={imgAlertTriangle} alt="" style={{ width: 12, height: 12 }} />
      )}
      <span style={{ fontSize: 13, fontWeight: 700, color: st.color, letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
        {status}
      </span>
    </div>
  );
}

export default function PortfolioRow({ borrower, onClick }) {
  const rc = riskColor(borrower.riskLevel);
  const [hovered, setHovered] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  const cellFlex = isMobile
    ? '0 0 calc(50% - 10px)'
    : isTablet
    ? '0 0 calc(33.33% - 14px)'
    : '1 0 0';

  return (
    <div
      onClick={() => onClick && onClick(borrower)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fefdff', border: '0.3px solid #215ed0', borderRadius: 30,
        padding: isMobile ? '14px 16px' : '16px 24px',
        display: 'flex', flexDirection: 'column', gap: 10,
        cursor: 'pointer', outline: `2px solid ${hovered ? '#2871fa' : 'transparent'}`,
        outlineOffset: '-1px', transition: 'outline-color 0.15s',
      }}
    >
      {isMobile ? (
        /* ── Mobile layout ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Row 1: Name + Risk Score */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 600, lineHeight: '24px', color: '#081732', letterSpacing: '0.5px' }}>
              {borrower.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 24, fontWeight: 600, lineHeight: '28px', color: rc, letterSpacing: '1.2px' }}>
                {borrower.riskScore}
              </span>
              <div style={{ background: rc, borderRadius: 30, padding: '1px 8px', display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontSize: 8, fontWeight: 600, color: '#fefdff', lineHeight: '16px' }}>
                  {borrower.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Meta info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, fontSize: 12, color: '#081732', letterSpacing: '-0.15px', lineHeight: '18px' }}>
            <span>{borrower.id}</span>
            <span style={{ color: '#4a5565' }}>•</span>
            <span>{borrower.industry}</span>
            <span style={{ color: '#4a5565' }}>•</span>
            <span>Last Review: {borrower.lastReview}</span>
          </div>

          {/* Row 3: Status badge + View button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              {borrower.status === 'Review Needed' && <StatusBadge status={borrower.status} />}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: hovered ? '#2871fa' : '#081732', transition: 'color 0.15s' }}>
                View
              </span>
              <img
                src={imgArrowForward} alt=""
                style={{
                  width: 16, height: 16, objectFit: 'contain',
                  filter: hovered ? 'invert(43%) sepia(89%) saturate(1200%) hue-rotate(208deg) brightness(103%) contrast(97%)' : 'none',
                  transition: 'filter 0.15s',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ── Tablet / Desktop layout ── */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, flexWrap: isTablet ? 'wrap' : 'nowrap' }}>
            <span style={{
              fontSize: isTablet ? 18 : 24, fontWeight: 600, lineHeight: '32px',
              color: '#081732', letterSpacing: '0.72px', whiteSpace: 'nowrap',
            }}>
              {borrower.name}
            </span>
            {borrower.status === 'Review Needed' && <StatusBadge status={borrower.status} />}
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              fontSize: 13, color: '#081732', letterSpacing: '-0.15px', lineHeight: '20px',
              whiteSpace: isTablet ? 'normal' : 'nowrap', flexWrap: 'wrap',
            }}>
              <span>{borrower.id}</span>
              <span style={{ color: '#4a5565' }}>•</span>
              <span>{borrower.industry}</span>
              <span style={{ color: '#4a5565' }}>•</span>
              <span>Last Review: {borrower.lastReview}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isTablet ? 20 : 45, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#081732', letterSpacing: '-0.15px' }}>
                Risk Score
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: isTablet ? 24 : 32, fontWeight: 600, lineHeight: '28px', color: rc, letterSpacing: '1.6px' }}>
                  {borrower.riskScore}
                </span>
                <div style={{
                  background: rc, borderRadius: 30, padding: '1px 10px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: 57,
                }}>
                  <span style={{ fontSize: 8, fontWeight: 600, color: '#fefdff', lineHeight: '16px', textAlign: 'center' }}>
                    {borrower.riskLevel}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontSize: 14, fontWeight: 600, letterSpacing: '0.07px',
                color: hovered ? '#2871fa' : '#081732',
                transition: 'color 0.15s',
              }}>
                View
              </span>
              <img
                src={imgArrowForward} alt=""
                style={{
                  width: 18, height: 18, objectFit: 'contain',
                  filter: hovered ? 'invert(43%) sepia(89%) saturate(1200%) hue-rotate(208deg) brightness(103%) contrast(97%)' : 'none',
                  transition: 'filter 0.15s',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Metric cells — responsive wrapping */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 10 : 20, alignItems: 'stretch' }}>
        <MetricCell label="Revenue"       value={borrower.revenue}    trend={borrower.revTrend}  up={borrower.revUp}  cellFlex={cellFlex} />
        <MetricCell label="Cash Flow"     value={borrower.cashFlow}   trend={borrower.cfTrend}   up={borrower.cfUp}   cellFlex={cellFlex} />
        <MetricCell label="Debt Exposure" value={borrower.debt}       sub={borrower.debtRatio}   subColor="#081732"   cellFlex={cellFlex} />
        <MetricCell
          label="Liquidity" value={borrower.liquidity}
          sub={borrower.liquidityLabel}
          subColor={borrower.liquidityGood ? '#05c04b' : '#e9000b'}
          cellFlex={cellFlex}
        />
        <MetricCell
          label="Active Alerts" value={String(borrower.alerts)}
          sub={borrower.alertLabel}
          subColor={borrower.alertGood ? '#05c04b' : '#e9000b'}
          cellFlex={cellFlex}
        />
      </div>
    </div>
  );
}
