import { imgRevenueIcon, imgCashFlowIcon, imgDebtIcon, imgLiquidityIcon } from '../assets/images';
import { useBreakpoint } from '../hooks/useBreakpoint';

const GRADIENT = 'linear-gradient(116.96deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)';

function TrendBadge({ value, arrowUp, danger }) {
  const color = danger ? '#e9000b' : '#05c04b';
  return (
    <div style={{
      background: danger ? 'rgba(233,0,11,0.08)' : 'rgba(5,192,75,0.08)',
      borderRadius: 10, padding: '0 10px',
      display: 'inline-flex', alignItems: 'center', flexShrink: 0,
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color, letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
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
      padding: 24, borderRadius: 30,
      background: GRADIENT,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <img src={icon} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        <span style={{ fontSize: 14, fontWeight: 400, color: '#081732', lineHeight: '20px', letterSpacing: '-0.15px' }}>
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 36, fontWeight: 400, color: '#081732', letterSpacing: '1.08px', lineHeight: 'normal' }}>
          {value}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendBadge value={trend} arrowUp={arrowUp} danger={danger} />
          <span style={{ fontSize: 14, fontWeight: 400, color: '#808080', letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
            vs last quarter
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MetricCards() {
  const { isMobile } = useBreakpoint();
  const cardFlex = isMobile ? '0 0 calc(50% - 10px)' : '1 0 0';

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'stretch' }}>
      <MetricCard icon={imgRevenueIcon}   label="Revenue"         value="$89.2M" trend="8.7%"  arrowUp={false} danger={true}  cardFlex={cardFlex} />
      <MetricCard icon={imgCashFlowIcon}  label="Cash Flow"       value="$4.1M"  trend="22.1%" arrowUp={false} danger={true}  cardFlex={cardFlex} />
      <MetricCard icon={imgDebtIcon}      label="Debt Exposure"   value="$54.8M" trend="12%"   arrowUp={true}  danger={true}  cardFlex={cardFlex} />
      <MetricCard icon={imgLiquidityIcon} label="Liquidity Ratio" value="1.12"   trend="0.08%" arrowUp={false} danger={true}  cardFlex={cardFlex} />
    </div>
  );
}
