import { useState } from 'react';
import {
  imgLogo, imgSearch, imgBarChart, imgComments, imgSettings,
  imgNotification, imgNotifyBg, imgProfile,
} from '../assets/images';
import { borrowers } from '../data/borrowers';

function NavIconBtn({ icon, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 50, height: 50, flexShrink: 0, cursor: 'pointer',
        borderRadius: '50%',
        background: hovered ? '#2871fa' : '#f8f7ff',
        border: hovered ? 'none' : '0.3px solid #14397d',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s, border 0.15s',
      }}
    >
      <img
        src={icon} alt={label || ''}
        style={{
          width: 30, height: 30, objectFit: 'contain',
          filter: hovered ? 'brightness(0) invert(1)' : 'none',
          transition: 'filter 0.15s',
        }}
      />
    </div>
  );
}

function NotifyBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 15,
        height: 50, borderRadius: 100,
        background: '#f1f1ff',
        paddingRight: 16, flexShrink: 0, width: 100, cursor: 'pointer',
      }}
    >
      {/* Icon circle only changes color */}
      <div style={{
        width: 50, height: 50, flexShrink: 0,
        borderRadius: '50%',
        background: hovered ? '#2871fa' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        transition: 'background 0.15s',
      }}>
        <img src={imgNotifyBg} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          opacity: hovered ? 0 : 1, transition: 'opacity 0.15s',
        }} />
        <img
          src={imgNotification} alt=""
          style={{
            position: 'relative', width: 30, height: 30, objectFit: 'contain',
            filter: hovered ? 'brightness(0) invert(1)' : 'none',
            transform: hovered ? 'rotate(-20deg)' : 'rotate(0deg)',
            transition: 'filter 0.15s, transform 0.2s ease',
          }}
        />
      </div>
      {/* Number stays unchanged */}
      <span style={{
        fontSize: 24, fontWeight: 400, lineHeight: '32px', letterSpacing: '0.07px',
        color: '#081732',
      }}>4</span>
    </div>
  );
}

function SearchBar({ onSelectBorrower }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const suggestions = query.trim().length > 0
    ? borrowers.filter(b =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.industry.toLowerCase().includes(query.toLowerCase()) ||
        b.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const showDropdown = focused && suggestions.length > 0;

  const handleSelect = (borrower) => {
    setQuery(borrower.name);
    setFocused(false);
    if (onSelectBorrower) onSelectBorrower(borrower);
  };

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 18,
        border: focused ? '0.5px solid #2871fa' : '0.5px solid #14397d',
        borderRadius: 30, padding: '10px 30px',
        background: '#fefdff', transition: 'border 0.15s',
      }}>
        <img src={imgSearch} alt="" style={{ width: 30, height: 30, objectFit: 'contain', flexShrink: 0 }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search by name, ID, or industry..."
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 16, fontWeight: 400, color: '#081732',
            fontFamily: 'Outfit, sans-serif', letterSpacing: '0.48px',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              fontSize: 16, color: 'rgba(0,0,0,0.4)', padding: 0, flexShrink: 0,
              fontFamily: 'Outfit, sans-serif',
            }}
          >✕</button>
        )}
      </div>

      {showDropdown && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 200,
          background: '#fefdff', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(20,57,125,0.12)', border: '0.5px solid #14397d',
        }}>
          {suggestions.map((b, i) => (
            <div
              key={b.id}
              onMouseDown={() => handleSelect(b)}
              style={{
                padding: '14px 30px', cursor: 'pointer',
                borderTop: i > 0 ? '0.3px solid rgba(20,57,125,0.1)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(40,113,250,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#081732', letterSpacing: '0.07px' }}>
                  {b.name}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(8,23,50,0.5)', letterSpacing: '-0.15px', marginTop: 2 }}>
                  {b.id} · {b.industry}
                </div>
              </div>
              <span style={{
                fontSize: 12, fontWeight: 700, color: '#fefdff',
                background: b.riskLevel === 'HIGH' ? '#e9000b' : b.riskLevel === 'LOW' ? '#05c04b' : '#d69200',
                borderRadius: 30, padding: '2px 10px',
              }}>
                {b.riskLevel}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 50, height: 50, borderRadius: '50%', overflow: 'hidden',
        cursor: 'pointer', flexShrink: 0,
        outline: hovered ? '1px solid #2871fa' : '1px solid transparent',
        outlineOffset: '2px',
        transition: 'outline-color 0.15s',
      }}
    >
      <img src={imgProfile} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

export default function Navbar({ onSelectBorrower }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '0 30px', height: 110,
      background: '#fefdff', borderBottom: '1px solid #e1d1f5',
      position: 'sticky', top: 0, zIndex: 100,
      width: '100%',
    }}>
      <div style={{ height: 35, width: 100, flexShrink: 0 }} />

      <SearchBar onSelectBorrower={onSelectBorrower} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 25, flexShrink: 0 }}>
        <NavIconBtn icon={imgBarChart} label="Analytics" />
        <NavIconBtn icon={imgComments} label="Comments" />
        <NavIconBtn icon={imgSettings} label="Settings" />
        <NotifyBtn />
        <ProfileBtn />
      </div>
    </div>
  );
}
