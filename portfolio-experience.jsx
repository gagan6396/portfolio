const PortfolioExperience = () => {
  const experiences = [
    {
      company: 'Edigigo Pvt. Ltd.',
      location: 'Gurugram',
      role: 'Web Developer',
      period: 'Sep 2025 - Present',
      responsibilities: [
        'Develop and maintain dynamic production websites using PHP, MySQL, JavaScript, HTML5, CSS3',
        'Customize Shopify storefronts (theme editing, Liquid templating, custom section development)',
        'Work with clients to scope requirements and deliver fixes/features',
        'Focus on clean code and page-load performance optimization'
      ]
    },
    {
      company: 'Dream Byte Solutions Pvt. Ltd.',
      location: 'Dehradun',
      role: 'Web Developer',
      period: 'Apr 2024 - Aug 2025',
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
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {experiences.map((exp, index) => (
          <PaperCard key={index} tilt={index % 2 === 0 ? -1.5 : 1.5} tape>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 16,
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div>
                <h3 className="marker" style={{
                  fontSize: 32,
                  color: 'var(--ink)',
                  marginBottom: 4
                }}>
                  {exp.role}
                </h3>
                <p className="hand" style={{
                  fontSize: 22,
                  color: 'var(--rose-deep)',
                  fontWeight: 600
                }}>
                  {exp.company} • {exp.location}
                </p>
              </div>
              <span style={{
                padding: '8px 16px',
                background: 'var(--rose-pale)',
                color: 'var(--ink)',
                borderRadius: 20,
                fontSize: 18,
                fontWeight: 600,
                fontFamily: "'Kalam', cursive",
                border: '1.5px solid var(--ink)',
                transform: 'rotate(-2deg)'
              }}>
                {exp.period}
              </span>
            </div>
            <ul style={{
              margin: 0,
              paddingLeft: 24,
              color: 'var(--ink-soft)',
              lineHeight: 1.8,
              fontFamily: "'Kalam', cursive",
              fontSize: 20
            }}>
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </PaperCard>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioExperience });
