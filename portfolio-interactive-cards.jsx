const { useState, useEffect, useRef } = React;

// Typing effect hook
const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayedText;
};

// Scroll animation hook
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Draggable Wrapper Component
const DraggableWrapper = ({ children, initialX, initialY, style = {} }) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.no-drag')) return;
    
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.no-drag')) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = {
      x: touch.clientX - pos.x,
      y: touch.clientY - pos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPos({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPos({
        x: touch.clientX - dragStart.current.x,
        y: touch.clientY - dragStart.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 100 : 10,
        transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Theme Switcher Desk Widget
const ThemeSwitcherWidget = () => {
  const themes = [
    {
      name: 'Warm Paper',
      colors: ['#f4ebd9', '#efe3cc', '#f8f1e1'],
      vars: {
        '--cream': '#f4ebd9',
        '--cream-2': '#efe3cc',
        '--paper': '#f8f1e1',
        '--ink': '#2a2320',
        '--ink-soft': '#4a3f39',
        '--rose': '#c98a8a',
        '--rose-deep': '#b26b6b',
        '--rose-pale': '#e8c9c4',
        '--moss': '#8a9a72',
        '--mustard': '#d9a441',
        '--sky': '#a9c1c9',
        '--tape': 'rgba(217, 200, 140, 0.55)'
      }
    },
    {
      name: 'Ocean Sketch',
      colors: ['#e0f2fe', '#bae6fd', '#f0f9ff'],
      vars: {
        '--cream': '#e0f2fe',
        '--cream-2': '#bae6fd',
        '--paper': '#f0f9ff',
        '--ink': '#0f172a',
        '--ink-soft': '#334155',
        '--rose': '#0284c7',
        '--rose-deep': '#0369a1',
        '--rose-pale': '#7dd3fc',
        '--moss': '#0d9488',
        '--mustard': '#ca8a04',
        '--sky': '#38bdf8',
        '--tape': 'rgba(125, 211, 252, 0.55)'
      }
    },
    {
      name: 'Cyber Slate',
      colors: ['#0f172a', '#1e293b', '#334155'],
      vars: {
        '--cream': '#0f172a',
        '--cream-2': '#1e293b',
        '--paper': '#334155',
        '--ink': '#f8fafc',
        '--ink-soft': '#cbd5e1',
        '--rose': '#ec4899',
        '--rose-deep': '#db2777',
        '--rose-pale': '#fbcfe8',
        '--moss': '#10b981',
        '--mustard': '#f59e0b',
        '--sky': '#06b6d4',
        '--tape': 'rgba(236, 72, 153, 0.35)'
      }
    }
  ];

  const applyTheme = (theme) => {
    Object.entries(theme.vars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
  };

  return (
    <div style={{
      width: 240,
      background: 'var(--paper)',
      border: '2px solid var(--ink)',
      borderRadius: 4,
      padding: 16,
      boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
      transform: 'rotate(-1deg)'
    }}>
      <h4 className="marker" style={{ fontSize: 18, color: 'var(--ink)', margin: '0 0 12px 0', borderBottom: '1px solid var(--ink)', paddingBottom: 6 }}>
        Theme Palette
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} className="no-drag">
        {themes.map((t, idx) => (
          <button
            key={idx}
            onClick={() => applyTheme(t)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--cream)',
              border: '1px solid var(--ink)',
              borderRadius: 4,
              padding: '8px 12px',
              cursor: 'pointer',
              fontFamily: "'Kalam', cursive",
              color: 'var(--ink)',
              fontSize: 14,
              transition: 'transform 0.1s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span>{t.name}</span>
            <div style={{ display: 'flex', gap: 3 }}>
              {t.colors.map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, border: '1px solid var(--ink)' }} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Sticky Note Widget with Typing Effect
const StickyNoteWidget = () => {
  const notes = [
    "Ready to build scalable PHP/MySQL & MERN applications.",
    "Fact: I developed a custom GST billing system that was adopted internally!",
    "Certified coding competition winner and workshop attendee.",
    "2+ years of production experience scoping dynamic web projects."
  ];
  
  const [noteIndex, setNoteIndex] = useState(0);
  const displayedText = useTypingEffect(notes[noteIndex], 30);

  const handleNext = () => {
    setNoteIndex(prev => (prev + 1) % notes.length);
  };

  return (
    <div style={{
      width: 250,
      background: 'rgba(253, 224, 71, 0.95)', // Sticky yellow
      color: '#2a2320',
      border: '1.5px solid #ca8a04',
      borderRadius: 2,
      padding: '24px 16px 16px',
      boxShadow: '4px 6px 16px rgba(0,0,0,0.15)',
      fontFamily: "'Kalam', cursive",
      fontSize: 18,
      position: 'relative',
      transform: 'rotate(2.5deg)'
    }}>
      {/* Paper Tape */}
      <div style={{
        position: 'absolute',
        top: -12,
        left: '50%',
        marginLeft: -35,
        width: 70,
        height: 20,
        background: 'rgba(255, 255, 255, 0.45)',
        transform: 'rotate(-3deg)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)'
      }} />
      
      <div style={{ minHeight: 90, lineHeight: 1.45 }}>
        {displayedText}
        {displayedText.length < notes[noteIndex].length && (
          <span style={{ animation: 'blink 0.8s infinite', fontWeight: 'bold' }}>|</span>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }} className="no-drag">
        <span style={{ fontSize: 13, color: '#854d0e', fontWeight: 600 }}>Note {noteIndex + 1}/{notes.length}</span>
        <button 
          onClick={handleNext}
          style={{
            background: '#ca8a04',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            padding: '4px 10px',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: "'Kalam', cursive",
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Individual Card Component
const InteractiveCard = ({ title, note, icon, color, delay, viewMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [ref, isVisible] = useScrollAnimation();
  const typedNote = useTypingEffect(isVisible && viewMode === 'grid' ? note : '', 30);

  const cardStyle = {
    perspective: '1000px',
    opacity: viewMode === 'grid' ? (isVisible ? 1 : 0) : 1,
    transform: viewMode === 'grid' ? (isVisible ? 'translateY(0)' : 'translateY(50px)') : 'none',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
    transitionDelay: viewMode === 'grid' ? `${delay}ms` : 'none',
    width: '100%'
  };

  const innerStyle = {
    position: 'relative',
    width: '100%',
    height: '320px',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
  };

  const faceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(80,60,50,0.15)'
  };

  const frontStyle = {
    ...faceStyle,
    background: 'var(--paper)',
    border: '2px solid var(--ink)'
  };

  const backStyle = {
    ...faceStyle,
    background: color,
    transform: 'rotateY(180deg)',
    border: '2px solid var(--ink)'
  };

  return (
    <div ref={ref} style={cardStyle}>
      <div 
        style={innerStyle}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* Front Face */}
        <div style={frontStyle}>
          <div style={{ marginBottom: 16 }}>{icon}</div>
          <h3 className="marker" style={{ fontSize: 28, color: 'var(--ink)', marginBottom: 12, textAlign: 'center' }}>
            {title}
          </h3>
          <div className="hand" style={{ 
            fontSize: 18, 
            color: 'var(--ink-soft)', 
            textAlign: 'center',
            minHeight: 60,
            lineHeight: 1.5
          }}>
            {viewMode === 'grid' ? (
              <>
                {typedNote}
                {typedNote.length < note.length && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
              </>
            ) : note}
          </div>
          <div className="beanie" style={{ marginTop: 16, fontSize: 18, color: 'var(--rose-deep)' }}>
            hover to flip
          </div>
        </div>

        {/* Back Face */}
        <div style={backStyle}>
          <h3 className="marker" style={{ fontSize: 24, color: 'var(--ink)', marginBottom: 16, textAlign: 'center' }}>
            {title}
          </h3>
          <p className="hand" style={{ fontSize: 18, color: 'var(--ink)', textAlign: 'center', lineHeight: 1.6 }}>
            Click to learn more about my {title.toLowerCase()} experience and projects below.
          </p>
          <button 
            className="no-drag"
            onClick={() => {
              const target = {
                'Development': 'projects',
                'Design': 'experience',
                'Innovation': 'skills'
              }[title] || 'about';
              document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              marginTop: 20,
              padding: '10px 20px',
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: 'none',
              borderRadius: 20,
              fontFamily: "'Kalam', cursive",
              fontSize: 16,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Interactive Cards Section
const PortfolioInteractiveCards = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('grid');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cards = [
    {
      title: 'Development',
      note: 'Building web applications with PHP, Node.js, and React...',
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--rose-deep)" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      color: 'var(--rose)'
    },
    {
      title: 'Design',
      note: 'Creating responsive and user-friendly interfaces...',
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
          <circle cx="11" cy="11" r="2"/>
        </svg>
      ),
      color: 'var(--moss)'
    },
    {
      title: 'Innovation',
      note: 'Solving problems with creative solutions...',
      icon: (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--mustard)" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      color: 'var(--mustard)'
    }
  ];

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'var(--cream-2)', 
      borderTop: '2px dashed rgba(42, 35, 32, 0.1)',
      borderBottom: '2px dashed rgba(42, 35, 32, 0.1)',
      position: 'relative' 
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        <div className="beanie" style={{
          fontSize: 32,
          color: 'var(--rose-deep)',
          marginBottom: 16,
          transform: 'rotate(-2deg)',
          textAlign: 'center'
        }}>
          what i do best
        </div>
        
        <h2 className="display" style={{
          fontSize: 64,
          color: 'var(--ink)',
          textAlign: 'center',
          marginBottom: 24
        }}>
          My Expertise
        </h2>

        {/* View Mode Toggle (Only visible on non-mobile) */}
        {!isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, fontFamily: "'Kalam', cursive" }}>
            <div style={{
              background: 'var(--paper)',
              padding: 4,
              borderRadius: 24,
              border: '1.5px solid var(--ink)',
              display: 'flex',
              boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
            }}>
              <button
                className="no-drag"
                onClick={() => setViewMode('grid')}
                style={{
                  background: viewMode === 'grid' ? 'var(--ink)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--paper)' : 'var(--ink)',
                  border: 'none',
                  borderRadius: 20,
                  padding: '8px 20px',
                  fontSize: 16,
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Clean Grid
              </button>
              <button
                className="no-drag"
                onClick={() => setViewMode('desk')}
                style={{
                  background: viewMode === 'desk' ? 'var(--ink)' : 'transparent',
                  color: viewMode === 'desk' ? 'var(--paper)' : 'var(--ink)',
                  border: 'none',
                  borderRadius: 20,
                  padding: '8px 20px',
                  fontSize: 16,
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                Interactive Desk
              </button>
            </div>
          </div>
        )}

        {/* Desk Workspace View */}
        {viewMode === 'desk' ? (
          <div style={{
            position: 'relative',
            height: '620px',
            background: 'var(--cream)',
            border: '2px dashed var(--ink)',
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: 'inset 0 4px 12px rgba(80,60,50,0.08)'
          }}>
            {/* Ruled Desk Grid Pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(var(--ink) 0.8px, transparent 0.8px),
                radial-gradient(var(--ink) 0.8px, var(--cream) 0.8px)
              `,
              backgroundSize: '32px 32px',
              backgroundPosition: '0 0, 16px 16px',
              opacity: 0.1
            }} />
            
            {/* Guide Text */}
            <div className="beanie" style={{
              position: 'absolute',
              top: 16,
              left: 16,
              fontSize: 22,
              color: 'var(--ink-soft)',
              opacity: 0.7,
              pointerEvents: 'none'
            }}>
              * Drag widgets and cards to organize your workspace
            </div>

            {/* Draggable Cards */}
            <DraggableWrapper initialX={40} initialY={60} style={{ width: 300 }}>
              <InteractiveCard {...cards[0]} viewMode="desk" />
            </DraggableWrapper>

            <DraggableWrapper initialX={380} initialY={100} style={{ width: 300 }}>
              <InteractiveCard {...cards[1]} viewMode="desk" />
            </DraggableWrapper>

            <DraggableWrapper initialX={720} initialY={50} style={{ width: 300 }}>
              <InteractiveCard {...cards[2]} viewMode="desk" />
            </DraggableWrapper>

            {/* Draggable Theme Selector */}
            <DraggableWrapper initialX={140} initialY={410}>
              <ThemeSwitcherWidget />
            </DraggableWrapper>

            {/* Draggable Sticky Note */}
            <DraggableWrapper initialX={620} initialY={400}>
              <StickyNoteWidget />
            </DraggableWrapper>
          </div>
        ) : (
          /* Grid View */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32
          }}>
            {cards.map((card, index) => (
              <InteractiveCard
                key={index}
                {...card}
                delay={index * 200}
                viewMode="grid"
              />
            ))}
          </div>
        )}

        <style>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioInteractiveCards });