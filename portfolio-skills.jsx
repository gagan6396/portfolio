const PortfolioSkills = () => {
  const skillCategories = [
    { category: 'Backend', accent: 'var(--rose-deep)', skills: ['PHP', 'Node.js', 'Express.js', 'RESTful APIs'] },
    { category: 'Frontend', accent: 'var(--sky, var(--rose-deep))', skills: ['JavaScript', 'React.js', 'HTML5', 'CSS3'] },
    { category: 'Databases', accent: 'var(--moss, var(--rose-deep))', skills: ['MySQL', 'MongoDB'] },
    { category: 'Tools & Platforms', accent: 'var(--mustard, var(--rose-deep))', skills: ['Git', 'AJAX', 'Shopify/Liquid', 'npm'] },
    { category: 'Also Familiar With', accent: 'var(--ink-soft, var(--rose-deep))', skills: ['C', 'C++', 'Core Java'] }
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '36px 48px',
      }}>
        {skillCategories.map((cat, index) => (
          <div key={index}>
            {/* Category header with a hand-drawn wavy underline */}
            <div style={{ marginBottom: 18, display: 'inline-block' }}>
              <h3 className="marker" style={{
                fontSize: 24,
                color: cat.accent,
                margin: 0,
              }}>
                {cat.category}
              </h3>
              <svg width="100%" height="10" viewBox="0 0 200 10" preserveAspectRatio="none" style={{ display: 'block', marginTop: 2 }}>
                <path d="M0 5 Q 12 0, 24 5 T 48 5 T 72 5 T 96 5 T 120 5 T 144 5 T 168 5 T 192 5"
                  fill="none" stroke={cat.accent} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Skills as postage-stamp style badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {cat.skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    position: 'relative',
                    padding: '9px 16px',
                    background: 'var(--paper, #fffdf8)',
                    color: 'var(--ink)',
                    borderRadius: 4,
                    fontSize: 17,
                    fontWeight: 600,
                    fontFamily: "'Kalam', cursive",
                    border: `2px dashed ${cat.accent}`,
                    transform: `rotate(${((i % 2 === 0 ? 1 : -1)) * 1.5}deg)`,
                    boxShadow: '2px 3px 0 rgba(0,0,0,0.07)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioSkills });