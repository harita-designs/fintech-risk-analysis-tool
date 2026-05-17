import { imgRevenueIcon, imgCashFlowIcon, imgDebtIcon, imgLiquidityIcon } from '../assets/images';
import { useBreakpoint } from '../hooks/useBreakpoint';

const GRADIENT = '#fefdff';

function TrendBadge({ value, arrowUp, danger }) {
  const color = danger ? '#e9000b' : '#05c04b';
  return (
    <div style={{
      background: danger ? 'rgba(233,0,11,0.08)' : 'rgba(5,192,75,0.08)',
      borderRadius: 30, padding: '1px 8px',
      display: 'inline-flex', alignItems: 'center', flexShrink: 0,
    }}>
      <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color, letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>
        {arrowUp ? '↑' : '↓'} {value}
      </span>
    </div>
  );
}

function MetricCard({ icon, label, value, trend, arrowUp, danger, cardFlex }) {
  return (
    <div style={{
      flex: cardFlex,
      minWidth: 0,
      padding: '12px 14px', borderRadius: 8,
      background: GRADIENT,
      border: '0.5px solid rgba(20,57,125,0.1)',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <img src={icon} alt="" style={{ width: 14, height: 14, objectFit: 'contain', opacity: 0.5 }} />
        <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(8,23,50,0.5)', lineHeight: '18px', letterSpacing: '-0.15px' }}>
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 22, fontWeight: 400, color: '#081732', letterSpacing: '0.5px', lineHeight: 'normal' }}>
          {value}
        </span>
        <TrendBadge value={trend} arrowUp={arrowUp} danger={danger} />
      </div>
    </div>
  );
}

export default function MetricCards() {
  const { isMobile } = useBreakpoint();
  const cardFlex = isMobile ? '0 0 calc(50% - 8px)' : '1 0 0';

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'stretch' }}>
      <MetricCard icon={imgRevenueIcon}   label="Revenue"         value="$89.2M" trend="8.7%"  arrowUp={false} danger={true}  cardFlex={cardFlex} />
      <MetricCard icon={imgCashFlowIcon}  label="Cash flow"       value="$4.1M"  trend="22.1%" arrowUp={false} danger={true}  cardFlex={cardFlex} />
      <MetricCard icon={imgDebtIcon}      label="Debt exposure"   value="$54.8M" trend="12%"   arrowUp={true}  danger={true}  cardFlex={cardFlex} />
      <MetricCard icon={imgLiquidityIcon} label="Liquidity ratio" value="1.12"   trend="0.08%" arrowUp={false} danger={true}  cardFlex={cardFlex} />
    </div>
  );
}
