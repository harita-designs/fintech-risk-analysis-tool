// Horizontal bar chart showing risk profile dimensions

const BAR_H   = 45;
const ROW_GAP = 31;
const CHART_W = 662;
const GRADIENT = 'linear-gradient(90deg, rgba(40,113,250,0.65) 0%, rgba(103,23,205,0.65) 100%)';

function RiskBar({ label, pct }) {
  const filledW = Math.round((pct / 100) * CHART_W);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
      {/* Label */}
      <div style={{
        width: 89, textAlign: 'right', flexShrink: 0,
        fontSize: 14, fontWeight: 400, color: '#a5a5aa',
        lineHeight: '20px', letterSpacing: '-0.15px',
      }}>
        {label}
      </div>

      {/* Bar track + fill */}
      <div style={{ position: 'relative', width: CHART_W, height: BAR_H, flexShrink: 0 }}>
        {/* Track */}
        <div style={{
          position: 'absolute', inset: 0,
          borderBottom: '0.5px solid rgba(165,165,170,0.5)',
        }} />
        {/* Fill */}
        {filledW > 0 && (
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: filledW, height: BAR_H,
            background: GRADIENT,
          }}>
            {/* Right-edge marker */}
            <div style={{
              position: 'absolute', right: 0, top: 0,
              width: 3, height: BAR_H,
              background: '#081732',
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function RiskProfileChart({ metrics }) {
  return (
    <div style={{
      background: 'linear-gradient(120.31deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)',
      borderRadius: 30, padding: 50, display: 'flex', flexDirection: 'column', gap: 50,
    }}>
      {/* Header */}
      <span style={{ fontSize: 24, fontWeight: 600, color: '#081732', letterSpacing: '0.72px', lineHeight: '32px' }}>
        Risk Profile
      </span>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: ROW_GAP }}>
        {metrics.map(m => (
          <RiskBar key={m.label} label={m.label} pct={m.pct} />
        ))}
      </div>
    </div>
  );
}
