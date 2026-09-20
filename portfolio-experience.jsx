const PortfolioExperience = () => {
  const experiences = [
   
    {
      company: 'Dream Byte Solutions Pvt. Ltd.',
      location: 'Dehradun',
      role: 'Web Developer',
      period: 'May 2025 - Aug 2026',
      current: false,
      responsibilities: [
        'Built and maintained full-stack web applications using PHP, MySQL, JavaScript, HTML5, CSS3, AJAX',
        'Designed and developed a custom MERN stack billing and invoicing system with GST compliance',
        'Collaborated with engineering team to debug production issues and optimize queries',
        'Delivered features and improvements for client projects'
      ]
    }
  ];

  return (
    <section id="experience" style={{ padding: '60px 0' }}>
      <SectionHeader
        eyebrow="where i've worked"
        title="experience"
        kicker="building production applications"
      />

      <div style={{ position: 'relative', paddingLeft: 40 }}>
        {/* Vertical timeline spine — hand-drawn feel via a slightly wobbly
            dashed line rather than a straight solid rule */}
        <div style={{
          position: 'absolute',
          left: 11,
          top: 8,
          bottom: 8,
          width: 2,
          background: 'repeating-linear-gradient(to bottom, var(--rose-deep) 0 6px, transparent 6px 12px)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {experiences.map((exp, index) => (
            <div key={index} style={{ position: 'relative' }}>
              {/* Timeline node */}
              <div style={{
                position: 'absolute',
                left: -40,
                top: 6,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: exp.current ? 'var(--rose-deep)' : 'var(--rose-pale)',
                border: '2.5px solid var(--ink)',
                boxShadow: exp.current ? '0 0 0 4px var(--rose-pale)' : 'none',
              }} />

              <div style={{
                background: 'var(--paper, #fffdf8)',
                border: '2px dashed var(--ink)',
                borderRadius: 14,
                padding: '24px 28px',
                transform: `rotate(${index % 2 === 0 ? -0.6 : 0.6}deg)`,
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginBottom: 14,
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <h3 className="marker" style={{ fontSize: 30, color: 'var(--ink)', margin: 0 }}>
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span style={{
                          fontFamily: "'Kalam', cursive",
                          fontSize: 13,
                          fontWeight: 700,
                          color: 'var(--rose-deep)',
                          background: 'var(--rose-pale)',
                          border: '1.5px solid var(--rose-deep)',
                          borderRadius: 999,
                          padding: '2px 10px',
                          transform: 'rotate(-2deg)',
                        }}>
                          current
                        </span>
                      )}
                    </div>
                    <p className="hand" style={{
                      fontSize: 20,
                      color: 'var(--ink-soft)',
                      fontWeight: 600,
                      margin: '4px 0 0',
                    }}>
                      {exp.company} <span style={{ opacity: 0.55 }}>•</span> {exp.location}
                    </p>
                  </div>

                  <span style={{
                    fontFamily: "'Kalam', cursive",
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    borderBottom: '2px solid var(--rose-deep)',
                    paddingBottom: 2,
                    whiteSpace: 'nowrap',
                  }}>
                    {exp.period}
                  </span>
                </div>

                <ul style={{
                  margin: 0,
                  paddingLeft: 20,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.75,
                  fontFamily: "'Kalam', cursive",
                  fontSize: 18,
                  display: 'grid',
                  gap: 4,
                }}>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioExperience });