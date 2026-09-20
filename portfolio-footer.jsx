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
  <footer className="portfolio-footer-fullbleed" style={{
    /* Full-bleed: breaks out of the parent's centered/padded container so
       the footer spans the entire viewport width regardless of where it's
       nested. Negative bottom margin (set via the class below) cancels
       #root's bottom padding (120px desktop / 80px mobile, set in
       index.html) so the footer sits flush against the bottom of the
       page with no gap below it. */
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    marginTop: '80px',
    padding: '56px 0 32px',
    background: 'var(--paper)',
    borderTop: '2px dashed var(--ink)',
  }}>
    <style>{`
      .portfolio-footer-fullbleed { margin-bottom: -120px; }
      @media (max-width: 720px) {
        .portfolio-footer-fullbleed { margin-bottom: -80px; }
      }
    `}</style>
    {/* Inner content wrapper keeps text readable at a max width, centered */}
    <div style={{
      position: 'relative',
      maxWidth: 1100,
      margin: '0 auto',
      padding: '0 32px',
    }}>
      {/* Wax seal monogram, pinned at the top-right corner */}
      <div style={{
        position: 'absolute',
        top: -80,
        right: 0,
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: 'var(--rose)',
        border: '2.5px solid var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
      }}>
        <span className="marker" style={{ fontSize: 18, color: 'var(--ink)' }}>GD</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 40,
        textAlign: 'left',
        marginBottom: 40
      }}>
        {/* Col 1: Bio */}
        <div>
          <div className="marker" style={{ fontSize: 26, marginBottom: 12 }}>Gagan Dhyani</div>
          <p className="hand" style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: 280 }}>
            Full stack web developer specialized in MERN stack, PHP/MySQL, and Shopify development. Creating clean code and responsive solutions.
          </p>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h4 className="marker" style={{ fontSize: 22, color: 'var(--rose-deep)', marginBottom: 14 }}>
            ✦ Quick Links
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
          <h4 className="marker" style={{ fontSize: 22, color: 'var(--rose-deep)', marginBottom: 14 }}>
            ✦ Get in Touch
          </h4>
          <div className="hand" style={{ fontSize: 18 }}>
            <FooterLink href="mailto:dhyanigagan@gmail.com">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8, verticalAlign: 'middle' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              dhyanigagan@gmail.com
            </FooterLink>
            <FooterLink href="tel:+916396540283">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8, verticalAlign: 'middle' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 6396540283
            </FooterLink>
            <FooterLink href="https://linkedin.com/in/gagandh" isExternal>
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
          <h4 className="marker" style={{ fontSize: 22, color: 'var(--rose-deep)', marginBottom: 14 }}>
            ✦ Status
          </h4>
          <p className="hand" style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
            Available for new opportunities.
          </p>
          <p className="beanie" style={{ fontSize: 20, color: 'var(--rose-deep)', margin: '10px 0 0 0' }}>
            Based in Dehradun, Uttarakhand, India
          </p>
          <div className="hand" style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <CoffeeIcon size={16} />
            <span>Fueled by fresh chai</span>
          </div>
        </div>
      </div>

      {/* Postmark-style bottom bar */}
      <div style={{
        borderTop: '2px dashed var(--ink)',
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <p className="beanie" style={{ fontSize: 20, color: 'var(--ink)', margin: 0, transform: 'rotate(0.5deg)' }}>
          © {new Date().getFullYear()} Gagan Dhyani — All rights reserved.
        </p>
        <p className="hand" style={{ fontSize: 16, color: 'var(--ink-soft)', margin: 0, transform: 'rotate(-0.5deg)' }}>
          Built with React and custom CSS
        </p>
      </div>
    </div>
  </footer>
);

Object.assign(window, { PortfolioFooter });