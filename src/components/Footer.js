import { useState } from 'react';

function FooterLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer', fontSize: 14, fontWeight: 400, color: hovered ? '#2871fa' : '#081732',
        letterSpacing: '-0.15px', lineHeight: '20px',
        textDecoration: hovered ? 'underline' : 'none',
        transition: 'color 0.15s',
      }}
    >
      {label}
    </span>
  );
}

export default function Footer() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '25px 30px', background: '#fefdff',
      fontSize: 14, fontWeight: 400, lineHeight: '20px',
      color: '#081732', letterSpacing: '-0.15px',
    }}>
      <span>© 2026 Dragin. All rights reserved.</span>
      <div style={{ display: 'flex', gap: 20 }}>
        {['Documentation', 'API Status', 'Support'].map(link => (
          <FooterLink key={link} label={link} />
        ))}
      </div>
    </div>
  );
}
