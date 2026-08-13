const PortfolioSkills = () => {
  const skillCategories = [
    {
      category: 'Backend',
      skills: ['PHP', 'Node.js', 'Express.js', 'RESTful APIs']
    },
    {
      category: 'Frontend',
      skills: ['JavaScript', 'React.js', 'HTML5', 'CSS3']
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'MongoDB']
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'AJAX', 'Shopify/Liquid', 'npm']
    },
    {
      category: 'Also Familiar With',
      skills: ['C', 'C++', 'Core Java']
    }
  ];

  return (
    <section id="skills" style={{ padding: '60px 0' }}>
      <SectionHeader 
        eyebrow="what i know" 
        title="technical skills"
        kicker="full-stack development"
      />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24
      }}>
        {skillCategories.map((category, index) => (
          <PaperCard key={index} tilt={(index % 2 === 0 ? 1 : -1) * (index + 1) * 0.5}>
            <h3 className="marker" style={{
              fontSize: 24,
              color: 'var(--rose-deep)',
              marginBottom: 16
            }}>
              {category.category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    padding: '8px 16px',
                    background: 'var(--paper)',
                    color: 'var(--ink)',
                    borderRadius: 8,
                    fontSize: 18,
                    fontWeight: 500,
                    fontFamily: "'Kalam', cursive",
                    border: '1.5px solid var(--ink)',
                    transform: `rotate(${(Math.random() - 0.5) * 6}deg)`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </PaperCard>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioSkills });
