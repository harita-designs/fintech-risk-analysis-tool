import { imgCovenantXCircle } from '../assets/images';

const GRADIENT = 'linear-gradient(113.65deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)';

const covenants = [
  { name: 'Debt Service Coverage', currentValue: '0.87x', threshold: 'Min: 1.25x', breachDate: 'Since Q2 2024', duration: '3 quarters' },
  { name: 'Leverage Ratio',        currentValue: '4.2x',  threshold: 'Max: 3.5x',  breachDate: 'Since Q3 2024', duration: '2 quarters' },
  { name: 'Current Ratio',         currentValue: '0.93',  threshold: 'Min: 1.10',  breachDate: 'Since Q2 2024', duration: '3 quarters' },
  { name: 'Interest Coverage',     currentValue: '1.8x',  threshold: 'Min: 3.0x',  breachDate: 'Since Q1 2024', duration: '4 quarters' },
];

function BreachBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: 'rgba(233,0,11,0.1)', borderRadius: 30, padding: '2px 10px',
    }}>
      <img src={imgCovenantXCircle} alt="" style={{ width: 12, height: 12, objectFit: 'contain' }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: '#e9000b', letterSpacing: '-0.15px', lineHeight: '16px' }}>
        BREACH
      </span>
    </div>
  );
}

function CovenantCard({ covenant }) {
  return (
    <div style={{
      flex: '1 0 0', minWidth: 0,
      background: '#fefdff', borderRadius: 20,
      border: '0.5px solid rgba(20,57,125,0.2)',
      padding: '20px 16px',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <BreachBadge />
      <span style={{ fontSize: 16, fontWeight: 600, color: '#081732', lineHeight: '22px', letterSpacing: '0.07px' }}>
        {covenant.name}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(8,23,50,0.5)', letterSpacing: '-0.15px' }}>
          Current Value
        </span>
        <span style={{ fontSize: 24, fontWeight: 600, color: '#e9000b', letterSpacing: '0.72px', lineHeight: '32px' }}>
          {covenant.currentValue}
        </span>
        <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(8,23,50,0.6)', letterSpacing: '-0.15px' }}>
          {covenant.threshold}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 'auto' }}>
        <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(8,23,50,0.5)', letterSpacing: '-0.15px' }}>
          {covenant.breachDate}
        </span>
        <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(8,23,50,0.5)', letterSpacing: '-0.15px' }}>
          Duration: {covenant.duration}
        </span>
      </div>
    </div>
  );
}

export default function CovenantTracking() {
  return (
    <div style={{
      width: '100%',
      background: GRADIENT,
      borderRadius: 30, padding: '30px 25px',
      display: 'flex', flexDirection: 'column', gap: 25,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: '#081732', letterSpacing: '0.72px', lineHeight: '32px' }}>
          Covenant Tracking
        </span>
        <div style={{
          background: 'rgba(233,0,11,0.1)', borderRadius: 10, padding: '4px 12px',
          display: 'inline-flex', alignItems: 'center',
        }}>
          <span style={{ fontSize: 14, fontWeight: 400, color: '#bb0009', letterSpacing: '-0.15px' }}>
            4 of 4 covenants in breach
          </span>
        </div>
      </div>

      {/* Covenant cards row */}
      <div style={{ display: 'flex', gap: 16 }}>
        {covenants.map((c, i) => (
          <CovenantCard key={i} covenant={c} />
        ))}
      </div>
    </div>
  );
}
