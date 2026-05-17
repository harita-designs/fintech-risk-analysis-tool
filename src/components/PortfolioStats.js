import { imgTransaction, imgRating, imgWarningShield, imgSurvey } from '../assets/images';
import { useBreakpoint } from '../hooks/useBreakpoint';


function TrendBadge({ text, green }) {
  const color = green ? '#05c04b' : '#e9000b';
  return (
    <div style={{
      background: green ? 'rgba(5,192,75,0.08)' : 'rgba(233,0,11,0.08)',
      borderRadius: 30, padding: '1px 8px',
      display: 'inline-flex', alignItems: 'center', flexShrink: 0,
    }}>
      <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color, letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>
        {text}
      </span>
    </div>
  );
}

function KpiCard({ icon, label, value, trend, valueColor, cardFlex, trendRed }) {
  return (
    <div style={{
      flex: cardFlex, minWidth: 0, padding: '12px 14px', borderRadius: 8,
      background: '#ffffff',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <img src={icon} alt="" style={{ width: 14, height: 14, objectFit: 'contain', opacity: 0.5 }} />
        <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(8,23,50,0.5)', letterSpacing: '-0.15px' }}>
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 22, fontWeight: 400, lineHeight: 'normal',
          letterSpacing: '0.5px', color: valueColor || '#000',
        }}>
          {value}
        </span>
        <TrendBadge text={trend} green={!trendRed} />
      </div>
    </div>
  );
}

export default function PortfolioStats() {
  const { isMobile } = useBreakpoint();
  const cardFlex = isMobile ? '0 0 calc(50% - 6px)' : '1 0 0';

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'stretch',
    }}>
      <KpiCard icon={imgTransaction}   label="Revenue"             value="$466M"  trend="↑ 3.2%"  cardFlex={cardFlex} />
      <KpiCard icon={imgRating}        label="Average risk score"  value="642"    trend="↑ 3.2%"  cardFlex={cardFlex} />
      <KpiCard icon={imgWarningShield} label="High-risk borrowers" value="2"      trend="↑ 3.2%"  cardFlex={cardFlex} valueColor="#e9000b" trendRed />
      <KpiCard icon={imgSurvey}        label="Needs review"        value="4"      trend="+2"       cardFlex={cardFlex} />
    </div>
  );
}
