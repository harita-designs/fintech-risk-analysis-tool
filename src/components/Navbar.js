import { useState, useRef, useEffect } from 'react';
import {
  imgSearch, imgBarChart, imgComments, imgSettings,
  imgNotification, imgProfile,
} from '../assets/images';
import { borrowers } from '../data/borrowers';

const TOOLTIP_STYLE = {
  position: 'absolute',
  top: 'calc(100% + 10px)',
  left: '50%',
  transform: 'translateX(-50%)',
  background: '#fefdff',
  border: '0.5px solid #e1d1f5',
  borderRadius: 12,
  padding: '10px 18px',
  boxShadow: '0 4px 24px rgba(20,57,125,0.14)',
  fontSize: 13,
  fontWeight: 500,
  color: '#081732',
  whiteSpace: 'nowrap',
  zIndex: 1000,
  fontFamily: 'Outfit, sans-serif',
  letterSpacing: '0.07px',
  pointerEvents: 'none',
};

function useClickOutside(ref, enabled, onClose) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [enabled, ref, onClose]);
}

function NavIconBtn({ icon, label, clickTooltip }) {
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, showTooltip, () => setShowTooltip(false));

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <div
        onClick={() => clickTooltip && setShowTooltip(s => !s)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 50, height: 50, cursor: 'pointer',
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
      {showTooltip && clickTooltip && (
        <div style={TOOLTIP_STYLE}>{clickTooltip}</div>
      )}
    </div>
  );
}

function NotifyBtn() {
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, showTooltip, () => setShowTooltip(false));

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <div
        onClick={() => setShowTooltip(s => !s)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 15,
          height: 50, borderRadius: 100,
          background: '#f1f1ff',
          paddingRight: 16, width: 100, cursor: 'pointer',
        }}
      >
        <div style={{
          width: 50, height: 50, flexShrink: 0,
          borderRadius: '50%',
          background: '#2871fa',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={imgNotification} alt="Alerts"
            style={{
              width: 30, height: 30, objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              transform: hovered ? 'rotate(-20deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>
        <span style={{
          fontSize: 24, fontWeight: 400, lineHeight: '32px', letterSpacing: '0.07px',
          color: '#081732',
        }}>0</span>
      </div>
      {showTooltip && (
        <div style={{ ...TOOLTIP_STYLE, left: '50%' }}>No recent alerts</div>
      )}
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

function HomeBtn({ onBack }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      title="Home"
      onClick={onBack}
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
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M2 8.5L11 2L20 8.5V19C20 19.5523 19.5523 20 19 20H14.5V14.5C14.5 14.2239 14.2761 14 14 14H8C7.72386 14 7.5 14.2239 7.5 14.5V20H3C2.44772 20 2 19.5523 2 19V8.5Z"
          stroke={hovered ? '#ffffff' : '#081732'}
          strokeWidth="2" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const PROFILE_DATA = {
  name: 'Adam Johnson',
  role: 'Senior Risk Analyst',
  department: 'Credit Risk Management',
  email: 'adam.johnson@risklens.com',
  lastLogin: 'Today, 10:42 AM',
  status: 'Active',
};

function ProfileBtn() {
  const [hovered, setHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, showDropdown, () => setShowDropdown(false));

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <div
        onClick={() => setShowDropdown(s => !s)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 50, height: 50, borderRadius: '50%', overflow: 'hidden',
          cursor: 'pointer',
          outline: hovered || showDropdown ? '2px solid #2871fa' : '2px solid transparent',
          outlineOffset: '2px',
          transition: 'outline-color 0.15s',
        }}
      >
        <img src={imgProfile} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {showDropdown && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 12px)', right: 0,
          background: '#fefdff',
          border: '0.5px solid #e1d1f5',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(20,57,125,0.16)',
          width: 280,
          zIndex: 1000,
          overflow: 'hidden',
          fontFamily: 'Outfit, sans-serif',
        }}>
          {/* Avatar + name section */}
          <div style={{
            padding: '24px 24px 20px',
            background: 'linear-gradient(116.96deg, rgba(40,113,250,0.06) 0%, rgba(103,23,205,0.06) 100%)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
              border: '2px solid #e1d1f5',
            }}>
              <img src={imgProfile} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#081732', lineHeight: '22px', letterSpacing: '0.07px' }}>
                {PROFILE_DATA.name}
              </div>
              <div style={{ fontSize: 13, fontWeight: 400, color: 'rgba(8,23,50,0.55)', lineHeight: '18px', marginTop: 2 }}>
                {PROFILE_DATA.role}
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6,
                background: 'rgba(5,192,75,0.12)', borderRadius: 30,
                padding: '2px 10px',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#05c04b', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#05c04b', lineHeight: '16px' }}>
                  {PROFILE_DATA.status}
                </span>
              </div>
            </div>
          </div>

          {/* Info rows */}
          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ProfileRow label="Department" value={PROFILE_DATA.department} />
            <ProfileRow label="Email" value={PROFILE_DATA.email} />
            <ProfileRow label="Last login" value={PROFILE_DATA.lastLogin} />
          </div>

          {/* Divider */}
          <div style={{ height: '0.5px', background: '#e1d1f5', margin: '0 24px' }} />

          {/* Sign out */}
          <div style={{ padding: '12px 24px 18px' }}>
            <SignOutBtn />
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(8,23,50,0.4)', letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: '16px' }}>
        {label}
      </span>
      <span style={{ fontSize: 13, fontWeight: 400, color: '#081732', lineHeight: '18px', letterSpacing: '-0.1px' }}>
        {value}
      </span>
    </div>
  );
}

function SignOutBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', padding: '10px 0',
        background: hovered ? 'rgba(233,0,11,0.06)' : 'transparent',
        border: `0.5px solid ${hovered ? 'rgba(233,0,11,0.2)' : '#e1d1f5'}`,
        borderRadius: 12, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'background 0.15s, border 0.15s',
        fontFamily: 'Outfit, sans-serif',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 11l3-3-3-3M13 8H6" stroke={hovered ? '#e9000b' : '#2871fa'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 14, fontWeight: 600, color: hovered ? '#e9000b' : '#2871fa', transition: 'color 0.15s' }}>
        Sign out
      </span>
    </button>
  );
}

function RiskLensLogo() {
  return (
    <div style={{ flexShrink: 0, userSelect: 'none' }}>
      <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '0.5px', lineHeight: 1 }}>
        <span style={{
          background: 'linear-gradient(116.96deg, #2871fa 30%, #6717cd 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>RISK</span>
        <span style={{ color: '#081732' }}>Lens</span>
      </span>
    </div>
  );
}

export default function Navbar({ onSelectBorrower, onBack }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '0 30px', height: 110,
      background: '#fefdff', borderBottom: '1px solid #e1d1f5',
      position: 'sticky', top: 0, zIndex: 100,
      width: '100%',
    }}>
      <RiskLensLogo />
      <SearchBar onSelectBorrower={onSelectBorrower} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 25, flexShrink: 0 }}>
        {onBack && <HomeBtn onBack={onBack} />}
        <NavIconBtn icon={imgBarChart}   label="Analytics" clickTooltip="Feature coming soon" />
        <NavIconBtn icon={imgComments}   label="Messages"  clickTooltip="No recent messages"  />
        <NavIconBtn icon={imgSettings}   label="Settings"  clickTooltip="Feature coming soon" />
        <NotifyBtn />
        <ProfileBtn />
      </div>
    </div>
  );
}
