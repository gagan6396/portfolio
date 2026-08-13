const Nav = () => (
  <nav style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 4px 24px', gap: 24, flexWrap: 'wrap',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* portfolio mark */}
      <svg width="38" height="38" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="14" fill="var(--rose)" stroke="var(--ink)" strokeWidth="1.8" />
        <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="var(--ink)">AK</text>
      </svg>
      <div className="marker" style={{ fontSize: 28, color: 'var(--ink)' }}>Arun Kumar</div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontFamily: "'Kalam', cursive", fontSize: 18 }}>
      {['about', 'experience', 'projects', 'skills', 'contact'].map((label, i) => (
        <a key={label} href={`#${label}`} style={{
          color: 'var(--ink)', textDecoration: 'none', position: 'relative',
          transform: `rotate(${[-1,1,-0.5,0.7,-0.3][i]}deg)`, display: 'inline-block',
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--rose-deep)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink)'}
        >{label}</a>
      ))}
      <ScribbleButton fill="var(--moss)" style={{ fontSize: 16, padding: '6px 16px' }}>
        <a 
          href="arun_kumar_resume.pdf" 
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--ink)',
            textDecoration: 'none',
            fontSize: 16
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          resume
        </a>
      </ScribbleButton>
    </div>
  </nav>
);

Object.assign(window, { Nav });
