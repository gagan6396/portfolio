const PortfolioAbout = () => (
  <section id="about" style={{ padding: '60px 0' }}>
    <SectionHeader 
      eyebrow="who i am" 
      title="about me"
      kicker="2+ years building production applications"
    />
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 32,
    }}>
      <PaperCard tilt={-2} tape>
        <div style={{ fontSize: 48, marginBottom: 16 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--rose-deep)" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
        </div>
        <h3 className="marker" style={{ fontSize: 28, color: 'var(--ink)', marginBottom: 12 }}>
          Experience
        </h3>
        <p className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          Building production applications with PHP/MySQL and MERN stack. 
          From database schema to responsive UI.
        </p>
      </PaperCard>

      <PaperCard tilt={1.5} tape>
        <div style={{ fontSize: 48, marginBottom: 16 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--rose-deep)" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
        <h3 className="marker" style={{ fontSize: 28, color: 'var(--ink)', marginBottom: 12 }}>
          Specialization
        </h3>
        <p className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          GST-compliant billing systems, custom e-commerce platforms, 
          and Shopify storefronts.
        </p>
      </PaperCard>

      <PaperCard tilt={-1} tape>
        <div style={{ fontSize: 48, marginBottom: 16 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--rose-deep)" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <h3 className="marker" style={{ fontSize: 28, color: 'var(--ink)', marginBottom: 12 }}>
          Approach
        </h3>
        <p className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          Clean, maintainable code with fast debugging. 
          Reputation for delivering quality work.
        </p>
      </PaperCard>
    </div>
  </section>
);

Object.assign(window, { PortfolioAbout });
