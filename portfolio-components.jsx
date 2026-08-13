const { useState, useEffect } = React;

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];

  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      transition: 'all 0.3s ease',
      padding: '1rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          cursor: 'pointer'
        }}>
          AK
        </div>
        
        <div style={{
          display: mobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          padding: '1rem 2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          '@media (min-width: 768px)': {
            display: 'flex',
            flexDirection: 'row',
            position: 'static',
            background: 'transparent',
            boxShadow: 'none',
            padding: 0
          }
        }}>
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              style={{
                background: 'none',
                border: 'none',



















































































































































































      }}>
        <div style={{
          padding: '2rem',
          borderRadius: '12px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>💼</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            color: '#0f172a'
          }}>
            Experience
          </h3>
          <p style={{ color: '#64748b', lineHeight: 1.6 }}>
            2+ years building production applications with PHP/MySQL and MERN stack
          </p>
        </div>
        <div style={{
          padding: '2rem',
          borderRadius: '12px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>🎯</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            color: '#0f172a'
          }}>
            Specialization
          </h3>
          <p style={{ color: '#64748b', lineHeight: 1.6 }}>
            GST-compliant billing systems, custom e-commerce platforms, Shopify storefronts
          </p>
        </div>
        <div style={{
          padding: '2rem',
          borderRadius: '12px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>⚡</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            color: '#0f172a'
          }}>
            Approach
          </h3>
          <p style={{ color: '#64748b', lineHeight: 1.6 }}>
            Clean, maintainable code with fast debugging and full-stack development
          </p>