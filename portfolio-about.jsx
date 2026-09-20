const PortfolioAbout = () => {
  const cards = [
    {
      num: '01',
      title: 'Experience',
      body:
        'Building production applications with PHP/MySQL and MERN stack. From database schema to responsive UI.',
      tags: ['PHP', 'MySQL', 'MERN'],
      tilt: -1.5,
      accent: 'var(--rose-deep)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Specialization',
      body:
        'GST-compliant billing systems, custom e-commerce platforms, and Shopify storefronts.',
      tags: ['Billing', 'E-commerce', 'Shopify'],
      tilt: 1.2,
      accent: 'var(--moss)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Approach',
      body:
        'Clean, maintainable code with fast debugging. Reputation for delivering quality work.',
      tags: ['Clean Code', 'Debugging'],
      tilt: -0.8,
      accent: 'var(--mustard)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" style={{ padding: '60px 0', position: 'relative' }}>
      <SectionHeader
        eyebrow="who i am"
        title="about me"
        kicker="1+ years building production applications"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 28,
        }}
      >
        {cards.map((c) => (
          <PaperCard key={c.num} tilt={c.tilt} tape>
            <div style={{ position: 'relative' }}>
              {/* Index badge */}
              <div
                className="marker"
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -4,
                  fontSize: 13,
                  letterSpacing: 2,
                  color: c.accent,
                  opacity: 0.85,
                }}
              >
                / {c.num}
              </div>

              {/* Icon + title row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                  color: c.accent,
                }}
              >
                <span style={{ display: 'inline-flex' }}>{c.icon}</span>
                <h3
                  className="marker"
                  style={{
                    fontSize: 24,
                    color: 'var(--ink)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {c.title}
                </h3>
              </div>

              {/* Dashed rule */}
              <div
                aria-hidden="true"
                style={{
                  height: 0,
                  borderTop: '1.5px dashed var(--ink-soft)',
                  opacity: 0.45,
                  margin: '0 0 14px',
                }}
              />

              {/* Body */}
              <p
                className="hand"
                style={{
                  fontSize: 19,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                {c.body}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="marker"
                    style={{
                      fontSize: 12,
                      padding: '3px 9px',
                      border: '1.2px solid var(--ink-soft)',
                      borderRadius: 999,
                      color: 'var(--ink-soft)',
                      background: 'var(--paper)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </PaperCard>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioAbout });