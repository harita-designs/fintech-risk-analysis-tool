import { useState } from 'react';
import { imgAlertTriangle, imgArrowForwardGradient } from '../assets/images';
import { riskColor, statusStyle } from '../data/borrowers';
import { useBreakpoint } from '../hooks/useBreakpoint';

function MetricCell({ label, value, trend, up, sub, subColor, cellFlex }) {
  return (
    <div style={{
      flex: cellFlex || '1 0 0', minWidth: 0, padding: '6px 10px', borderRadius: 6,
      background: '#ffffff',
      border: '0.3px solid rgba(20,57,125,0.15)',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: 'rgba(74,85,101,0.65)', letterSpacing: '-0.1px' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' }}>
        <span style={{ fontSize: 15, fontWeight: 500, lineHeight: '20px', color: '#081732', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>
          {value}
        </span>
        {trend && (
          <span style={{ fontSize: 12, fontWeight: 700, color: up ? '#05c04b' : '#e9000b', whiteSpace: 'nowrap' }}>
            {up ? '↑' : '↓'} {trend}
          </span>
        )}
        {sub && (
          <span style={{ fontSize: 12, fontWeight: 600, color: subColor || '#081732', whiteSpace: 'nowrap' }}>
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
      borderRadius: 30, padding: '2px 10px', flexShrink: 0,
    }}>
      {status === 'Review Needed' && (
        <img src={imgAlertTriangle} alt="" style={{ width: 11, height: 11 }} />
      )}
      <span style={{ fontSize: 12, fontWeight: 600, color: st.color, letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>
        Review needed
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
        background: hovered
          ? 'linear-gradient(#fefdff,#fefdff) padding-box, linear-gradient(116.96deg,#2871fa 0%,#6717cd 100%) border-box'
          : 'linear-gradient(#fefdff,#fefdff) padding-box, rgba(33,94,208,0.18) border-box',
        border: '1.5px solid transparent',
        borderRadius: 8,
        padding: isMobile ? '10px 12px' : '12px 18px',
        display: 'flex', flexDirection: 'column', gap: 8,
        cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s',
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
              <span style={{ fontSize: 24, fontWeight: 600, lineHeight: '28px', color: rc, letterSpacing: '1.2px', opacity: 0.75 }}>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, fontSize: 12, color: 'rgba(8,23,50,0.62)', letterSpacing: '-0.15px', lineHeight: '18px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={imgArrowForwardGradient} alt=""
                style={{ width: 16, height: 16, objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ── Tablet / Desktop layout ── */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, flexWrap: isTablet ? 'wrap' : 'nowrap' }}>
            <span style={{
              fontSize: isTablet ? 15 : 18, fontWeight: 600, lineHeight: '24px',
              color: '#081732', letterSpacing: '0.72px', whiteSpace: 'nowrap',
            }}>
              {borrower.name}
            </span>
            {borrower.status === 'Review Needed' && <StatusBadge status={borrower.status} />}
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              fontSize: 13, color: 'rgba(8,23,50,0.62)', letterSpacing: '-0.15px', lineHeight: '20px',
              whiteSpace: isTablet ? 'normal' : 'nowrap', flexWrap: 'wrap',
            }}>
              <span>{borrower.id}</span>
              <span style={{ color: '#4a5565' }}>•</span>
              <span>{borrower.industry}</span>
              <span style={{ color: '#4a5565' }}>•</span>
              <span>Last Review: {borrower.lastReview}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isTablet ? 14 : 28, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(8,23,50,0.42)', letterSpacing: '-0.15px' }}>
                Risk Score
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: isTablet ? 18 : 22, fontWeight: 600, lineHeight: '24px', color: rc, letterSpacing: '1.2px', opacity: 0.75 }}>
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={imgArrowForwardGradient} alt=""
                style={{ width: 18, height: 18, objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Metric cells — responsive wrapping */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 6 : 10, alignItems: 'stretch' }}>
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
