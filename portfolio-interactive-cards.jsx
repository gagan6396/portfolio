const { useState, useEffect, useRef } = React;

// ---------- Hooks ----------
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
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayedText;
};

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};

// ---------- Draggable ----------
const DraggableWrapper = ({ children, initialX, initialY, style = {} }) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.no-drag')) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.no-drag')) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: touch.clientX - pos.x, y: touch.clientY - pos.y };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPos({ x: touch.clientX - dragStart.current.x, y: touch.clientY - dragStart.current.y });
    };
    const handleMouseUp = () => setIsDragging(false);

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
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ---------- Theme Switcher ----------
const ThemeSwitcherWidget = () => {
  const [active, setActive] = useState(0);
  const themes = [
    {
      name: 'Warm Paper',
      colors: ['#f4ebd9', '#c98a8a', '#8a9a72'],
      vars: {
        '--cream': '#f4ebd9', '--cream-2': '#efe3cc', '--paper': '#f8f1e1',
        '--ink': '#2a2320', '--ink-soft': '#4a3f39',
        '--rose': '#c98a8a', '--rose-deep': '#b26b6b', '--rose-pale': '#e8c9c4',
        '--moss': '#8a9a72', '--mustard': '#d9a441', '--sky': '#a9c1c9',
        '--tape': 'rgba(217, 200, 140, 0.55)',
      },
    },
    {
      name: 'Ocean Sketch',
      colors: ['#e0f2fe', '#0284c7', '#0d9488'],
      vars: {
        '--cream': '#e0f2fe', '--cream-2': '#bae6fd', '--paper': '#f0f9ff',
        '--ink': '#0f172a', '--ink-soft': '#334155',
        '--rose': '#0284c7', '--rose-deep': '#0369a1', '--rose-pale': '#7dd3fc',
        '--moss': '#0d9488', '--mustard': '#ca8a04', '--sky': '#38bdf8',
        '--tape': 'rgba(125, 211, 252, 0.55)',
      },
    },
    {
      name: 'Cyber Slate',
      colors: ['#0f172a', '#ec4899', '#10b981'],
      vars: {
        '--cream': '#0f172a', '--cream-2': '#1e293b', '--paper': '#334155',
        '--ink': '#f8fafc', '--ink-soft': '#cbd5e1',
        '--rose': '#ec4899', '--rose-deep': '#db2777', '--rose-pale': '#fbcfe8',
        '--moss': '#10b981', '--mustard': '#f59e0b', '--sky': '#06b6d4',
        '--tape': 'rgba(236, 72, 153, 0.35)',
      },
    },
  ];

  const applyTheme = (theme, idx) => {
    Object.entries(theme.vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v)
    );
    setActive(idx);
  };

  return (
    <div
      style={{
        width: 232,
        background: 'var(--paper)',
        border: '1.5px solid var(--ink)',
        borderRadius: 6,
        padding: '14px 14px 12px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
        transform: 'rotate(-1deg)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px dashed var(--ink-soft)',
          paddingBottom: 8,
          marginBottom: 10,
        }}
      >
        <span className="marker" style={{ fontSize: 15, color: 'var(--ink)' }}>
          theme palette
        </span>
        <span className="beanie" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
          pick one ↴
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }} className="no-drag">
        {themes.map((t, idx) => (
          <button
            key={idx}
            onClick={() => applyTheme(t, idx)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: active === idx ? 'var(--cream-2)' : 'transparent',
              border: '1px solid ' + (active === idx ? 'var(--ink)' : 'transparent'),
              borderRadius: 4,
              padding: '6px 8px',
              cursor: 'pointer',
              fontFamily: "'Kalam', cursive",
              color: 'var(--ink)',
              fontSize: 14,
              textAlign: 'left',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: active === idx ? 'var(--rose-deep)' : 'transparent',
                  border: '1px solid var(--ink-soft)',
                  flexShrink: 0,
                }}
              />
              {t.name}
            </span>
            <div style={{ display: 'flex', gap: 3 }}>
              {t.colors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: c,
                    border: '1px solid var(--ink)',
                  }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ---------- Sticky Note ----------
const StickyNoteWidget = () => {
  const notes = [
    'Ready to build scalable PHP/MySQL & MERN applications.',
    'Fact: I developed a custom GST billing system that was adopted internally!',
    'Certified coding competition winner and workshop attendee.',
    '2+ years of production experience scoping dynamic web projects.',
  ];
  const [noteIndex, setNoteIndex] = useState(0);
  const displayedText = useTypingEffect(notes[noteIndex], 30);

  return (
    <div
      style={{
        width: 244,
        background: 'rgba(253, 224, 71, 0.95)',
        color: '#2a2320',
        border: '1.5px solid #ca8a04',
        borderRadius: 3,
        padding: '22px 16px 14px',
        boxShadow: '4px 6px 16px rgba(0,0,0,0.15)',
        fontFamily: "'Kalam', cursive",
        fontSize: 17,
        position: 'relative',
        transform: 'rotate(2.5deg)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -12,
          left: '50%',
          marginLeft: -35,
          width: 70,
          height: 20,
          background: 'rgba(255, 255, 255, 0.45)',
          transform: 'rotate(-3deg)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)',
          maskImage:
            'linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)',
        }}
      />

      <div style={{ minHeight: 88, lineHeight: 1.45 }}>
        {displayedText}
        {displayedText.length < notes[noteIndex].length && (
          <span style={{ animation: 'blink 0.8s infinite', fontWeight: 'bold' }}>|</span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
          paddingTop: 8,
          borderTop: '1px dashed rgba(133, 77, 14, 0.4)',
        }}
        className="no-drag"
      >
        <span
          style={{
            fontSize: 12,
            color: '#854d0e',
            letterSpacing: 1,
            padding: '2px 8px',
            border: '1px solid rgba(133, 77, 14, 0.5)',
            borderRadius: 999,
          }}
        >
          note {noteIndex + 1}/{notes.length}
        </span>
        <button
          onClick={() => setNoteIndex((p) => (p + 1) % notes.length)}
          style={{
            background: 'transparent',
            color: '#854d0e',
            border: '1px solid #ca8a04',
            borderRadius: 999,
            padding: '3px 12px',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: "'Kalam', cursive",
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ca8a04';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#854d0e';
          }}
        >
          next →
        </button>
      </div>
    </div>
  );
};

// ---------- Interactive Card ----------
const InteractiveCard = ({ title, note, icon, color, index, delay, viewMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [ref, isVisible] = useScrollAnimation();
  const typedNote = useTypingEffect(isVisible && viewMode === 'grid' ? note : '', 30);

  const cardStyle = {
    perspective: '1000px',
    opacity: viewMode === 'grid' ? (isVisible ? 1 : 0) : 1,
    transform: viewMode === 'grid' ? (isVisible ? 'translateY(0)' : 'translateY(40px)') : 'none',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
    transitionDelay: viewMode === 'grid' ? `${delay}ms` : 'none',
    width: '100%',
  };

  const innerStyle = {
    position: 'relative',
    width: '100%',
    height: '320px',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const faceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '6px',
    padding: '26px 24px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 6px 18px rgba(80,60,50,0.10)',
  };

  const frontStyle = {
    ...faceStyle,
    background: 'var(--paper)',
    border: '1.5px solid var(--ink)',
  };

  const backStyle = {
    ...faceStyle,
    background: `color-mix(in srgb, ${color} 22%, var(--paper))`,
    transform: 'rotateY(180deg)',
    border: '1.5px solid var(--ink)',
  };

  return (
    <div ref={ref} style={cardStyle}>
      <div
        style={innerStyle}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* Front */}
        <div style={frontStyle}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 18,
            }}
          >
            <div style={{ color }}>{icon}</div>
            <span
              className="marker"
              style={{ fontSize: 12, letterSpacing: 2, color: 'var(--ink-soft)' }}
            >
              / 0{index + 1}
            </span>
          </div>

          <h3
            className="marker"
            style={{
              fontSize: 26,
              color: 'var(--ink)',
              marginBottom: 10,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>

          <div
            aria-hidden="true"
            style={{
              height: 0,
              borderTop: '1.5px dashed var(--ink-soft)',
              opacity: 0.4,
              marginBottom: 14,
            }}
          />

          <div
            className="hand"
            style={{
              fontSize: 18,
              color: 'var(--ink-soft)',
              minHeight: 76,
              lineHeight: 1.5,
              flex: 1,
            }}
          >
            {viewMode === 'grid' ? (
              <>
                {typedNote}
                {typedNote.length < note.length && (
                  <span style={{ animation: 'blink 1s infinite' }}>|</span>
                )}
              </>
            ) : (
              note
            )}
          </div>

          <div
            className="beanie"
            style={{
              marginTop: 12,
              fontSize: 14,
              color: 'var(--ink-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: 0.75,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 L17 7 M17 7 H9 M17 7 V15" />
            </svg>
            hover to flip
          </div>
        </div>

        {/* Back */}
        <div style={backStyle}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 18,
            }}
          >
            <div style={{ color }}>{icon}</div>
            <span
              className="marker"
              style={{ fontSize: 12, letterSpacing: 2, color: 'var(--ink-soft)' }}
            >
              back / 0{index + 1}
            </span>
          </div>

          <h3
            className="marker"
            style={{ fontSize: 24, color: 'var(--ink)', marginBottom: 10 }}
          >
            {title}
          </h3>

          <div
            aria-hidden="true"
            style={{
              height: 0,
              borderTop: '1.5px dashed var(--ink-soft)',
              opacity: 0.4,
              marginBottom: 14,
            }}
          />

          <p
            className="hand"
            style={{ fontSize: 18, color: 'var(--ink)', lineHeight: 1.6, flex: 1 }}
          >
            Dive deeper into my {title.toLowerCase()} work — projects, tools, and the way I
            approach each piece.
          </p>

          <button
            className="no-drag"
            onClick={() => {
              const target =
                { Development: 'projects', Design: 'experience', Innovation: 'skills' }[
                  title
                ] || 'about';
              document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              marginTop: 16,
              padding: '9px 18px',
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: 'none',
              borderRadius: 999,
              fontFamily: "'Kalam', cursive",
              fontSize: 15,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(3px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
          >
            explore →
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Main Section ----------
const PortfolioInteractiveCards = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (mobile) setViewMode('grid');
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
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      color: 'var(--rose-deep)',
    },
    {
      title: 'Design',
      note: 'Creating responsive and user-friendly interfaces...',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      color: 'var(--moss)',
    },
    {
      title: 'Innovation',
      note: 'Solving problems with creative solutions...',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      color: 'var(--mustard)',
    },
  ];

  return (
    <section
      style={{
        padding: '80px 0',
        background: 'var(--cream-2)',
        borderTop: '1.5px dashed rgba(42, 35, 32, 0.18)',
        borderBottom: '1.5px dashed rgba(42, 35, 32, 0.18)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '5px 14px',
              background: 'var(--moss)',
              color: 'var(--paper)',
              fontFamily: "'Kalam', cursive",
              fontSize: 16,
              borderRadius: 4,
              transform: 'rotate(-2deg)',
              boxShadow: '2px 2px 0 var(--ink)',
              marginBottom: 14,
            }}
          >
            what i do best
          </div>

          <h2
            className="display"
            style={{
              fontSize: 64,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            My Expertise
          </h2>

          <p
            className="hand"
            style={{
              fontSize: 18,
              color: 'var(--ink-soft)',
              maxWidth: 520,
              margin: '16px auto 0',
              lineHeight: 1.5,
            }}
          >
            Three things I keep coming back to — hover a card to peek inside.
          </p>
        </div>

        {/* View Toggle */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 36,
              fontFamily: "'Kalam', cursive",
            }}
          >
            <div
              style={{
                background: 'var(--paper)',
                padding: 3,
                borderRadius: 999,
                border: '1.5px solid var(--ink)',
                display: 'flex',
                boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
              }}
            >
              {[
                { key: 'grid', label: 'Clean Grid' },
                { key: 'desk', label: 'Interactive Desk' },
              ].map((opt) => {
                const active = viewMode === opt.key;
                return (
                  <button
                    key={opt.key}
                    className="no-drag"
                    onClick={() => setViewMode(opt.key)}
                    style={{
                      background: active ? 'var(--ink)' : 'transparent',
                      color: active ? 'var(--paper)' : 'var(--ink)',
                      border: 'none',
                      borderRadius: 999,
                      padding: '7px 18px',
                      fontSize: 15,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Desk View */}
        {viewMode === 'desk' ? (
          <div
            style={{
              position: 'relative',
              height: '620px',
              background: 'var(--cream)',
              border: '1.5px dashed var(--ink)',
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: 'inset 0 4px 12px rgba(80,60,50,0.08)',
            }}
          >
            {/* Soft dot grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `radial-gradient(var(--ink) 0.8px, transparent 0.8px)`,
                backgroundSize: '28px 28px',
                opacity: 0.10,
              }}
            />

            {/* Workspace top bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 34,
                borderBottom: '1.5px dashed var(--ink-soft)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0 16px',
                background: 'rgba(255,255,255,0.35)',
              }}
            >
              {['var(--rose)', 'var(--mustard)', 'var(--moss)'].map((c, i) => (
                <span
                  key={i}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: c,
                    border: '1px solid var(--ink)',
                  }}
                />
              ))}
              <span
                className="beanie"
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  color: 'var(--ink-soft)',
                  opacity: 0.85,
                }}
              >
                workspace — drag widgets to organize
              </span>
            </div>

            {/* Draggable cards */}
            <DraggableWrapper initialX={40} initialY={70} style={{ width: 300 }}>
              <InteractiveCard {...cards[0]} index={0} viewMode="desk" />
            </DraggableWrapper>
            <DraggableWrapper initialX={380} initialY={100} style={{ width: 300 }}>
              <InteractiveCard {...cards[1]} index={1} viewMode="desk" />
            </DraggableWrapper>
            <DraggableWrapper initialX={720} initialY={70} style={{ width: 300 }}>
              <InteractiveCard {...cards[2]} index={2} viewMode="desk" />
            </DraggableWrapper>

            <DraggableWrapper initialX={140} initialY={410}>
              <ThemeSwitcherWidget />
            </DraggableWrapper>

            <DraggableWrapper initialX={620} initialY={400}>
              <StickyNoteWidget />
            </DraggableWrapper>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 28,
            }}
          >
            {cards.map((card, index) => (
              <InteractiveCard
                key={index}
                {...card}
                index={index}
                delay={index * 180}
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