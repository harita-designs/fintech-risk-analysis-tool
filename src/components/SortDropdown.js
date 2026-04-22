import { useState } from 'react';
import { imgExpandArrow } from '../assets/images';

const OPTIONS = ['All', 'High Risk', 'Medium Risk', 'Low Risk', 'Review Needed'];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected = value || '';

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: 333, padding: '10px 30px', borderRadius: 30,
          border: '0.3px solid #14397d', background: '#f8f7ff',
          cursor: 'pointer', gap: 10, fontFamily: 'Outfit, sans-serif',
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', letterSpacing: '0.07px' }}>
          <span style={{ color: 'rgba(8,23,50,0.4)' }}>Filter: </span>
          <span style={{ color: '#081732' }}>{selected || 'All Borrowers'}</span>
        </span>
        <img
          src={imgExpandArrow} alt=""
          style={{ width: 18, height: 18, objectFit: 'contain', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 50,
          background: '#f8f7ff', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '0.3px solid #14397d',
        }}>
          {OPTIONS.map((opt, i) => (
            <div
              key={opt}
              onClick={() => { onChange(opt === 'All' ? '' : opt); setOpen(false); }}
              style={{
                padding: '16px 30px', fontSize: 20, fontWeight: 400,
                color: '#081732', letterSpacing: '-0.31px', cursor: 'pointer',
                borderTop: i > 0 ? '0.3px solid rgba(20,57,125,0.1)' : 'none',
                background: selected === opt ? 'rgba(40,113,250,0.08)' : 'transparent',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(40,113,250,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = selected === opt ? 'rgba(40,113,250,0.08)' : 'transparent'}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
