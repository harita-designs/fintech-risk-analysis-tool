import { imgRevenueIcon, imgCashFlowIcon, imgDebtIcon, imgLiquidityIcon } from '../assets/images';

const GRADIENT = 'linear-gradient(116.96deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)';

function TrendBadge({ value, up }) {
  return (
    <div style={{
      background: up ? '#05c04b' : '#e9000b',
      borderRadius: 10, padding: '0 10px',
      display: 'inline-flex', alignItems: 'center', flexShrink: 0,
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#fefdff', letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
        {up ? '↑' : '↓'} {value}
      </span>
    </div>
  );
}

function MetricCard({ icon, label, value, trend, up }) {
  return (
    <div style={{
      flex: '1 0 0', minWidth: 0,
      padding: 24, borderRadius: 30,
      border: '0.3px solid #14397d', background: GRADIENT,
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
          <TrendBadge value={trend} up={up} />
          <span style={{ fontSize: 14, fontWeight: 400, color: '#808080', letterSpacing: '-0.15px', whiteSpace: 'nowrap' }}>
            vs last quarter
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MetricCards() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
      <MetricCard icon={imgRevenueIcon}   label="Revenue"         value="$89.2M" trend="8.7%"  up={false} />
      <MetricCard icon={imgCashFlowIcon}  label="Cash Flow"       value="$4.1M"  trend="22.1%" up={false} />
      <MetricCard icon={imgDebtIcon}      label="Debt Exposure"   value="$54.8M" trend="12%"   up={true}  />
      <MetricCard icon={imgLiquidityIcon} label="Liquidity Ratio" value="1.12"   trend="0.08%" up={false} />
    </div>
  );
}
