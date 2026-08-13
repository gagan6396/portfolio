const PortfolioEducation = () => {
  const education = [
    {
      degree: 'Master of Computer Applications',
      institution: 'KIMS, AKTU',
      period: 'Sep 2022 - 2024'
    },
    {
      degree: 'Bachelor of Computer Applications',
      institution: 'GGIT, CSJMU',
      period: 'Aug 2019 - Jun 2022'
    }
  ];

  const certifications = [
    {
      title: 'Coding Competition Winner',
      issuer: '',
      year: '2023'
    },
    {
      title: 'AI Workshop',
      issuer: 'DUCAT',
      year: '2023'
    }
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
        gap: 32
      }}>
        <div>
          <h3 className="marker" style={{
            fontSize: 32,
            marginBottom: 24,
            color: 'var(--ink)'
          }}>
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {education.map((edu, index) => (
              <PaperCard key={index} tilt={index % 2 === 0 ? -1.5 : 1.5}>
                <h4 className="hand" style={{
                  fontSize: 24,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'var(--ink)'
                }}>
                  {edu.degree}
                </h4>
                <p className="hand" style={{ color: 'var(--ink-soft)', marginBottom: 4, fontSize: 20 }}>
                  {edu.institution}
                </p>
                <p className="hand" style={{
                  color: 'var(--rose-deep)',
                  fontSize: 18,
                  fontWeight: 500
                }}>
                  {edu.period}
                </p>
              </PaperCard>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="marker" style={{
            fontSize: 32,
            marginBottom: 24,
            color: 'var(--ink)'
          }}>
            Certifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {certifications.map((cert, index) => (
              <PaperCard key={index} tilt={index % 2 === 0 ? 1.5 : -1.5}>
                <h4 className="hand" style={{
                  fontSize: 24,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'var(--ink)'
                }}>
                  {cert.title}
                </h4>
                <p className="hand" style={{ color: 'var(--ink-soft)', marginBottom: 4, fontSize: 20 }}>
                  {cert.issuer}
                </p>
                <p className="hand" style={{
                  color: 'var(--rose-deep)',
                  fontSize: 18,
                  fontWeight: 500
                }}>
                  {cert.year}
                </p>
              </PaperCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioEducation });
