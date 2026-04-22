import { imgBackBtnBg, imgBackArrow, imgAlertTriangle } from '../assets/images';
import { riskColor } from '../data/borrowers';

export default function BorrowerHeader({ borrower, onBack }) {
  const rc = riskColor(borrower.riskLevel);
  const GRADIENT = 'linear-gradient(164.3deg, rgba(40,113,250,0.05) 50.33%, rgba(103,23,205,0.05) 95.81%)';

  return (
    <div style={{
      width: '100%', background: GRADIENT,
      borderRadius: 30, padding: '20px 25px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Left: back button + borrower info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flex: 1, minWidth: 0 }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: 'relative', width: 50, height: 50, flexShrink: 0,
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
          }}
        >
          <img src={imgBackBtnBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          <img src={imgBackArrow} alt="Back" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
        </button>

        {/* Name + status + meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={{ fontSize: 32, fontWeight: 600, lineHeight: '28px', color: '#081732', letterSpacing: '1.6px' }}>
            {borrower.name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {borrower.status === 'Review Needed' && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: '#fef3c6', border: '1px solid #d69200',
                borderRadius: 30, padding: '5px 20px',
              }}>
                <img src={imgAlertTriangle} alt="" style={{ width: 12, height: 12 }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#d69200', letterSpacing: '-0.15px' }}>
                  Review Needed
                </span>
              </div>
            )}
            <div style={{
              display: 'flex', gap: 10, alignItems: 'center',
              fontSize: 14, color: '#081732', letterSpacing: '-0.15px', lineHeight: '20px',
            }}>
              <span style={{ color: '#4a5565' }}>•</span>
              <span>{borrower.id}</span>
              <span>•</span>
              <span>{borrower.industry}</span>
              <span>•</span>
              <span>Last Review: {borrower.lastReview}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: risk score */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, padding: '10px 20px 20px' }}>
        <span style={{ fontSize: 14, fontWeight: 400, color: '#081732', letterSpacing: '-0.15px', lineHeight: '20px' }}>
          Risk Score
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 64, fontWeight: 400, color: rc, letterSpacing: '1.92px', lineHeight: 1 }}>
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
    </div>
  );
}
