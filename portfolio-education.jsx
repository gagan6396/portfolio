const PortfolioEducation = () => {
  const education = [
    { degree: 'Master of Computer Applications', institution: 'Shri Guru Ram Rai University, Dehradun', period: 'Sep 2022 - 2024' },
    { degree: 'Bachelor of Computer Applications', institution: 'Institute of Technology and Management, Dehradun', period: 'Aug 2019 - Jun 2022' }
  ];

  const certifications = [
    { title: 'Coding Competition Winner', issuer: '', year: '2023' },
    { title: 'AI Workshop', issuer: 'DUCAT', year: '2023' }
  ];

  return (
    <section id="education" style={{ padding: '60px 0' }}>
      <SectionHeader
        eyebrow="learning journey"
        title="education & certifications"
        kicker="continuous growth"
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: 40
      }}>
        {/* Education: ticket-stub rows */}
        <div>
          <h3 className="marker" style={{ fontSize: 32, marginBottom: 24, color: 'var(--ink)' }}>
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {education.map((edu, index) => (
              <div key={index} style={{
                position: 'relative',
                display: 'flex',
                background: 'var(--paper, #fffdf8)',
                border: '2px solid var(--ink)',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
                {/* Perforated stub divider */}
                <div style={{
                  position: 'relative',
                  width: 80,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: '2px dashed var(--ink)',
                  padding: '14px 6px',
                }}>
                  <span className="beanie" style={{ fontSize: 16, color: 'var(--rose-deep)', textAlign: 'center', lineHeight: 1.3 }}>
                    {edu.period.split(' - ')[0].replace(/[A-Za-z]/g, '').trim() || edu.period}
                  </span>
                  {/* hole cutouts to sell the "ticket stub" look */}
                  <div style={{ position: 'absolute', top: -8, right: -8, width: 16, height: 16, borderRadius: '50%', background: 'var(--bg-page, #f4f0ea)', border: '2px solid var(--ink)' }} />
                  <div style={{ position: 'absolute', bottom: -8, right: -8, width: 16, height: 16, borderRadius: '50%', background: 'var(--bg-page, #f4f0ea)', border: '2px solid var(--ink)' }} />
                </div>
                <div style={{ padding: '16px 20px', flex: 1 }}>
                  <h4 className="hand" style={{ fontSize: 22, fontWeight: 600, margin: '0 0 4px', color: 'var(--ink)' }}>
                    {edu.degree}
                  </h4>
                  <p className="hand" style={{ color: 'var(--ink-soft)', margin: '0 0 4px', fontSize: 18 }}>
                    {edu.institution}
                  </p>
                  <p className="hand" style={{ color: 'var(--rose-deep)', fontSize: 16, fontWeight: 500, margin: 0 }}>
                    {edu.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications: medal badges */}
        <div>
          <h3 className="marker" style={{ fontSize: 32, marginBottom: 24, color: 'var(--ink)' }}>
            Certifications
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {certifications.map((cert, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 150, textAlign: 'center' }}>
                {/* Medal seal */}
                <div style={{ position: 'relative', marginBottom: 10 }}>
                  <svg width="72" height="88" viewBox="0 0 72 88">
                    <path d="M22 40 L14 82 L36 70 L58 82 L50 40 Z" fill="var(--rose-pale)" stroke="var(--ink)" strokeWidth="2" />
                    <circle cx="36" cy="30" r="28" fill="var(--rose-pale)" stroke="var(--ink)" strokeWidth="2.5" />
                    <circle cx="36" cy="30" r="20" fill="none" stroke="var(--rose-deep)" strokeWidth="2" strokeDasharray="3 4" />
                  </svg>
                  <span className="beanie" style={{
                    position: 'absolute', top: 20, left: 0, right: 0,
                    fontSize: 16, color: 'var(--rose-deep)', fontWeight: 700,
                  }}>
                    {cert.year}
                  </span>
                </div>
                <h4 className="hand" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 2px', color: 'var(--ink)' }}>
                  {cert.title}
                </h4>
                {cert.issuer && (
                  <p className="hand" style={{ color: 'var(--ink-soft)', margin: 0, fontSize: 15 }}>
                    {cert.issuer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioEducation });