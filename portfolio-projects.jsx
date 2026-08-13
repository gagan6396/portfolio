const PortfolioProjects = () => {
  const projects = [
    {
      title: 'Custom Billing System',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      description: 'End-to-end invoicing platform supporting client invoicing, GST handling, and billing history. Adopted for internal client use at Dream Byte Solutions.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--rose-deep)" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      )
    },
    {
      title: 'E-Commerce Platform',
      tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
      description: 'Built a complete shopping cart, product catalog, and payment gateway integration using core PHP and MySQL.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--rose-deep)" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      )
    }
  ];

  return (
    <section id="projects" style={{ padding: '60px 0' }}>
      <SectionHeader 
        eyebrow="what i've built" 
        title="projects"
        kicker="featured work"
      />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: 32
      }}>
        {projects.map((project, index) => (
          <PaperCard key={index} tilt={index % 2 === 0 ? -2 : 2} tape>
            <div style={{ marginBottom: 16 }}>{project.icon}</div>
            <h3 className="marker" style={{
              fontSize: 32,
              color: 'var(--ink)',
              marginBottom: 16
            }}>
              {project.title}
            </h3>
            <p className="hand" style={{
              fontSize: 20,
              color: 'var(--ink-soft)',
              lineHeight: 1.7,
              marginBottom: 20
            }}>
              {project.description}
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8
            }}>
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--rose-pale)',
                    color: 'var(--ink)',
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "'Kalam', cursive",
                    border: '1px solid var(--ink)',
                    transform: `rotate(${(Math.random() - 0.5) * 4}deg)`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </PaperCard>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioProjects });
