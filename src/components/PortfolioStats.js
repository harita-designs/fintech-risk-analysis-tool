import { imgTransaction, imgRating, imgWarningShield, imgSurvey } from '../assets/images';

const GRADIENT = 'linear-gradient(116.96deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)';

function TrendBadge({ text, green }) {
  const color = green ? '#05c04b' : '#e9000b';
  return (
    <div style={{
      background: green ? 'rgba(5,192,75,0.08)' : 'rgba(233,0,11,0.08)',
      borderRadius: 10, padding: '0 10px',
      display: 'inline-flex', alignItems: 'center',
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color, letterSpacing: '-0.15px' }}>
        {text}
      </span>
    </div>
  );
}

function KpiCard({ icon, label, value, trend, valueColor }) {
  return (
    <div style={{
      flex: '1 0 0', minWidth: 0, padding: 24, borderRadius: 30,
      background: GRADIENT,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <img src={icon} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#000', letterSpacing: '-0.15px' }}>
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{
          fontSize: 36, fontWeight: 400, lineHeight: 'normal',
          letterSpacing: '1.08px', color: valueColor || '#000',
        }}>
          {value}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendBadge text={trend} green />
          <span style={{ fontSize: 14, fontWeight: 400, color: '#808080', letterSpacing: '-0.15px' }}>
            vs last quarter
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioStats() {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'stretch',
      background: '#fefdff',
    }}>
      {/* Greeting */}
      <div style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 400, letterSpacing: '1.08px', lineHeight: '32px', color: '#081732', whiteSpace: 'nowrap' }}>
          Hello,{' '}
          <span style={{
            fontWeight: 700,
            background: 'linear-gradient(180deg, #6717cd 0%, #2871fa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Adam</span>!
        </div>
        <div style={{ fontSize: 24, fontWeight: 400, lineHeight: '32px', color: '#081732', letterSpacing: '0.07px', marginTop: 4 }}>
          Here is the overview.
        </div>
      </div>

      <KpiCard icon={imgTransaction}   label="Revenue"             value="$466M"  trend="↑ 3.2%" />
      <KpiCard icon={imgRating}        label="Average Risk Score"  value="642"    trend="↑ 3.2%" />
      <KpiCard icon={imgWarningShield} label="High-Risk Borrowers" value="2"      trend="↑ 3.2%" valueColor="#e9000b" />
      <KpiCard icon={imgSurvey}        label="Needs Review"        value="4"      trend="+2" />
    </div>
  );
}
