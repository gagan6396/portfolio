const CoffeeIcon = ({ size = 20, color = 'var(--rose-deep)', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const FooterLink = ({ href, children, isExternal = false }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? 'var(--rose-deep)' : 'var(--ink-soft)',
        textDecoration: 'none',
        transition: 'color 0.2s, transform 0.2s',
        display: 'block',
        margin: '6px 0',
        transform: hover ? 'translateX(3px)' : 'none'
      }}
    >
      {children}
    </a>
  );
};

const PortfolioFooter = () => (
  <footer style={{
    padding: '60px 0 40px',
    marginTop: '80px',
    borderTop: '2px dashed rgba(42, 35, 32, 0.15)',
    color: 'var(--ink)'
  }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 40,
      textAlign: 'left',
      marginBottom: 48
    }}>
      {/* Col 1: Bio */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="14" fill="var(--rose)" stroke="var(--ink)" strokeWidth="2" />
            <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="var(--ink)">AK</text>
          </svg>
          <div className="marker" style={{ fontSize: 26 }}>Arun Kumar</div>
        </div>
        <p className="hand" style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: 280 }}>
          Full stack web developer specialized in MERN stack, PHP/MySQL, and Shopify development. Creating clean code and responsive solutions.
        </p>
      </div>

      {/* Col 2: Navigation */}
      <div>
        <h4 className="marker" style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 16, borderBottom: '1px solid rgba(42, 35, 32, 0.1)', paddingBottom: 6 }}>
          Quick Links
        </h4>
        <div className="hand" style={{ fontSize: 18 }}>
          <FooterLink href="#about">About Me</FooterLink>
          <FooterLink href="#experience">Experience</FooterLink>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#education">Education</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </div>
      </div>

      {/* Col 3: Connect */}
      <div>
        <h4 className="marker" style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 16, borderBottom: '1px solid rgba(42, 35, 32, 0.1)', paddingBottom: 6 }}>
          Get in Touch
        </h4>
        <div className="hand" style={{ fontSize: 18 }}>
          <FooterLink href="mailto:arun.ggit.bca@gmail.com">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8, verticalAlign: 'middle' }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            arun.ggit.bca@gmail.com
          </FooterLink>
          <FooterLink href="tel:+919506050288">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8, verticalAlign: 'middle' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +91 9506050288
          </FooterLink>
          <FooterLink href="https://www.linkedin.com/in/arun-kumar-374505234/" isExternal>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8, verticalAlign: 'middle' }}>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn Profile
          </FooterLink>
        </div>
      </div>

      {/* Col 4: Status */}
      <div>
        <h4 className="marker" style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 16, borderBottom: '1px solid rgba(42, 35, 32, 0.1)', paddingBottom: 6 }}>
          Status
        </h4>
        <p className="hand" style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
          Available for new opportunities.
        </p>
        <p className="beanie" style={{ fontSize: 20, color: 'var(--rose-deep)', margin: '10px 0 0 0' }}>
          Based in Unnao, UP, India
        </p>
        <div className="hand" style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <CoffeeIcon size={16} />
          <span>Fueled by fresh coffee</span>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{
      borderTop: '1px solid rgba(42, 35, 32, 0.1)',
      paddingTop: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 16
    }}>
      <p className="beanie" style={{
        fontSize: 22,
        color: 'var(--rose-deep)',
        margin: 0,
        transform: 'rotate(0.5deg)'
      }}>
        © {new Date().getFullYear()} Arun Kumar. All rights reserved.
      </p>
      
      <p className="hand" style={{
        fontSize: 18,
        color: 'var(--ink-soft)',
        margin: 0,
        transform: 'rotate(-0.5deg)'
      }}>
        Built with React and custom CSS
      </p>
    </div>
  </footer>
);

Object.assign(window, { PortfolioFooter });