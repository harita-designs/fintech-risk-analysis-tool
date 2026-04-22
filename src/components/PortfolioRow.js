import { useState } from 'react';
import { imgAlertTriangle, imgArrowForward, imgTrendingDown, imgTrendingUp } from '../assets/images';
import { riskColor, statusStyle } from '../data/borrowers';

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

function MetricCell({ label, value, trend, up, sub, subColor }) {
  return (
    <div style={{
      flex: '1 0 0', minWidth: 0, padding: '8px 24px', borderRadius: 16,
      background: CARD_GRADIENT, border: '0.5px solid rgba(20,57,125,0)',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#081732', letterSpacing: '-0.15px' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 24, fontWeight: 400, lineHeight: '32px', color: '#081732', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>
          {value}
        </span>
        {trend && <TrendChip value={trend} up={up} />}
        {sub && (
          <span style={{ fontSize: 16, fontWeight: 700, color: subColor || '#081732', letterSpacing: '1.12px', whiteSpace: 'nowrap' }}>
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
      borderRadius: 30, padding: '5px 20px', flexShrink: 0,
    }}>
      {status === 'Review Needed' && (
        <img src={imgAlertTriangle} alt="" style={{ width: 12, height: 12 }} />
      )}
      <span style={{ fontSize: 14, fontWeight: 700, color: st.color, letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
        {status}
      </span>
    </div>
  );
}

export default function PortfolioRow({ borrower, onClick }) {
  const rc = riskColor(borrower.riskLevel);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick && onClick(borrower)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fefdff', border: '0.3px solid #215ed0', borderRadius: 30,
        padding: '16px 24px 16px', display: 'flex', flexDirection: 'column', gap: 10,
        cursor: 'pointer', outline: `2px solid ${hovered ? '#2871fa' : 'transparent'}`,
        outlineOffset: '-1px', transition: 'outline-color 0.15s',
      }}
    >
      {/* Top row: name + meta + risk score */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15, flex: 1, minWidth: 0 }}>
          <span style={{
            fontSize: 24, fontWeight: 600, lineHeight: '32px',
            color: '#081732', letterSpacing: '0.72px', whiteSpace: 'nowrap',
          }}>
            {borrower.name}
          </span>
          {borrower.status === 'Review Needed' && <StatusBadge status={borrower.status} />}
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            fontSize: 14, color: '#081732', letterSpacing: '-0.15px', lineHeight: '20px',
            whiteSpace: 'nowrap',
          }}>
            <span>{borrower.id}</span>
            <span style={{ color: '#4a5565' }}>•</span>
            <span>{borrower.industry}</span>
            <span style={{ color: '#4a5565' }}>•</span>
            <span>Last Review: {borrower.lastReview}</span>
          </div>
        </div>

        {/* Risk score + arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 45, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#081732', letterSpacing: '-0.15px' }}>
              Risk Score
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 32, fontWeight: 600, lineHeight: '28px', color: rc, letterSpacing: '1.6px' }}>
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
                filter: hovered
                  ? 'invert(43%) sepia(89%) saturate(1200%) hue-rotate(208deg) brightness(103%) contrast(97%)'
                  : 'none',
                transition: 'filter 0.15s',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom: metric cells */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
        <MetricCell label="Revenue"       value={borrower.revenue}    trend={borrower.revTrend}  up={borrower.revUp} />
        <MetricCell label="Cash Flow"     value={borrower.cashFlow}   trend={borrower.cfTrend}   up={borrower.cfUp} />
        <MetricCell label="Debt Exposure" value={borrower.debt}       sub={borrower.debtRatio}   subColor="#081732" />
        <MetricCell
          label="Liquidity" value={borrower.liquidity}
          sub={borrower.liquidityLabel}
          subColor={borrower.liquidityGood ? '#05c04b' : '#e9000b'}
        />
        <MetricCell
          label="Active Alerts" value={String(borrower.alerts)}
          sub={borrower.alertLabel}
          subColor={borrower.alertGood ? '#05c04b' : '#e9000b'}
        />
      </div>
    </div>
  );
}
