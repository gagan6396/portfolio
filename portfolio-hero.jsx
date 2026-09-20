const PortfolioHero = () => {
  const [device, setDevice] = React.useState('desktop');
  const [photoPos, setPhotoPos] = React.useState({ x: 0, y: 0 });
  const [isDraggingPhoto, setIsDraggingPhoto] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [typedText, setTypedText] = React.useState('');
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [bursts, setBursts] = React.useState([]);
  const [roleText, setRoleText] = React.useState('');
  const photoDragStart = React.useRef({ x: 0, y: 0 });
  const dragMoved = React.useRef(false);
  const photoCircleRef = React.useRef(null);

  const typingText =
    "Full Stack Web Developer crafting digital experiences with PHP, MySQL, and the MERN stack. Based in Uttarakhand, India.";
  const roles = [
    'Full Stack Developer',
    'MERN Stack Developer',
    'PHP & MySQL Developer',
    'Shopify Developer',
  ];

  React.useEffect(() => {
    const check = () => setDevice(window.innerWidth < 900 ? 'mobile' : 'desktop');
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < typingText.length) {
        setTypedText(typingText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const current = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        setRoleText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1600);
          return;
        }
        timeoutId = setTimeout(tick, 55);
      } else {
        charIdx--;
        setRoleText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          timeoutId = setTimeout(tick, 300);
          return;
        }
        timeoutId = setTimeout(tick, 25);
      }
    };

    timeoutId = setTimeout(tick, 900);
    return () => clearTimeout(timeoutId);
  }, []);

  const handlePhotoMouseDown = (e) => {
    setIsDraggingPhoto(true);
    dragMoved.current = false;
    photoDragStart.current = {
      x: e.clientX - photoPos.x,
      y: e.clientY - photoPos.y,
    };
  };

  const handlePhotoTouchStart = (e) => {
    setIsDraggingPhoto(true);
    dragMoved.current = false;
    const touch = e.touches[0];
    photoDragStart.current = {
      x: touch.clientX - photoPos.x,
      y: touch.clientY - photoPos.y,
    };
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingPhoto) return;
      dragMoved.current = true;
      setPhotoPos({
        x: e.clientX - photoDragStart.current.x,
        y: e.clientY - photoDragStart.current.y,
      });
    };

    const handleTouchMove = (e) => {
      if (!isDraggingPhoto) return;
      dragMoved.current = true;
      const touch = e.touches[0];
      setPhotoPos({
        x: touch.clientX - photoDragStart.current.x,
        y: touch.clientY - photoDragStart.current.y,
      });
    };

    const handleMouseUp = () => setIsDraggingPhoto(false);

    if (isDraggingPhoto) {
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
  }, [isDraggingPhoto]);

  const handlePhotoMouseMoveTilt = (e) => {
    if (isDraggingPhoto || !photoCircleRef.current) return;
    const rect = photoCircleRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  const resetTilt = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handlePhotoDoubleClick = () => setPhotoPos({ x: 0, y: 0 });

  const doodleKinds = ['star', 'sparkle', 'heart', 'swirl'];
  const burstColors = ['var(--rose-deep)', 'var(--moss)', 'var(--mustard)', 'var(--sky)'];
  const handlePhotoClick = (e) => {
    if (dragMoved.current) {
      dragMoved.current = false;
      return;
    }
    if (!photoCircleRef.current) return;
    const rect = photoCircleRef.current.getBoundingClientRect();
    const originX = e.clientX - rect.left;
    const originY = e.clientY - rect.top;
    const count = 6;
    const newBursts = Array.from({ length: count }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const distance = 60 + Math.random() * 30;
      return {
        id: `${Date.now()}-${i}`,
        x: originX,
        y: originY,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        kind: doodleKinds[i % doodleKinds.length],
        color: burstColors[i % burstColors.length],
        rot: (Math.random() - 0.5) * 120,
      };
    });
    setBursts((prev) => [...prev, ...newBursts]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.find((nb) => nb.id === b.id)));
    }, 900);
  };

  const isMobile = device === 'mobile';

  const bentoCards = [
    { label: 'LOCATION', value: 'Uttarakhand, IN' },
    { label: 'EXPERIENCE', value: '1+ years' },
    { label: 'FOCUS', value: 'Web Apps & Storefronts' },
  ];

  return (
    <section
      style={{
        minHeight: '100vh',
        padding: isMobile ? '80px 20px 100px' : '80px 40px 120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner tick marks */}
      {[
        { top: 24, left: 24, d: 'M0 20 L0 0 L20 0' },
        { top: 24, right: 24, d: 'M0 0 L20 0 L20 20' },
        { bottom: 24, left: 24, d: 'M0 0 L0 20 L20 20' },
        { bottom: 24, right: 24, d: 'M20 0 L20 20 L0 20' },
      ].map((c, i) => (
        <svg
          key={i}
          width="28"
          height="28"
          viewBox="0 0 20 20"
          aria-hidden="true"
          style={{ position: 'absolute', top: c.top, left: c.left, right: c.right, bottom: c.bottom, opacity: 0.4 }}
        >
          <path d={c.d} fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ))}

      <div
        style={{
          maxWidth: '1400px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr',
          gap: isMobile ? 40 : 64,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ---------- LEFT: PHOTO ---------- */}
        <div
          style={{
            position: 'relative',
            order: isMobile ? 1 : 0,
            height: isMobile ? 420 : 560,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Big soft color-block halo */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: isMobile ? 300 : 420,
              height: isMobile ? 300 : 420,
              background: 'var(--sky)',
              opacity: 0.18,
              borderRadius: 28,
              transform: 'rotate(-9deg)',
              animation: 'float 9s ease-in-out infinite',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: isMobile ? 260 : 360,
              height: isMobile ? 260 : 360,
              background: 'var(--rose-pale)',
              opacity: 0.55,
              borderRadius: '50%',
              transform: 'rotate(12deg) translate(20px, 30px)',
              animation: 'float 7s ease-in-out infinite reverse',
            }}
          />

          {/* Offset frame (rotated rectangle behind photo) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: isMobile ? 240 : 320,
              height: isMobile ? 240 : 320,
              border: '2px dashed var(--mustard)',
              borderRadius: 18,
              transform: 'rotate(7deg)',
              opacity: 0.75,
            }}
          />

          {/* Draggable photo */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              animation: 'fadeInUp 0.8s ease-out 0.4s both',
            }}
          >
            <div
              onMouseDown={handlePhotoMouseDown}
              onTouchStart={handlePhotoTouchStart}
              onDoubleClick={handlePhotoDoubleClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={resetTilt}
              onMouseMoveCapture={handlePhotoMouseMoveTilt}
              style={{
                position: 'relative',
                cursor: isDraggingPhoto ? 'grabbing' : 'grab',
                transform: `translate(${photoPos.x}px, ${photoPos.y}px)`,
                transition: isDraggingPhoto ? 'none' : 'transform 0.3s ease',
                userSelect: 'none',
              }}
            >
              {/* Spinning dashed rings */}
              <svg
                width={isMobile ? 260 : 340}
                height={isMobile ? 260 : 340}
                viewBox="0 0 100 100"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'spinRing 16s linear infinite',
                  pointerEvents: 'none',
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="var(--moss)"
                  strokeWidth="1.4"
                  strokeDasharray="4 6"
                  opacity="0.55"
                />
              </svg>
              <svg
                width={isMobile ? 240 : 314}
                height={isMobile ? 240 : 314}
                viewBox="0 0 100 100"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'spinRing 22s linear infinite reverse',
                  pointerEvents: 'none',
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="var(--mustard)"
                  strokeWidth="1"
                  strokeDasharray="1 8"
                  opacity="0.5"
                />
              </svg>

              {/* The photo circle */}
              <div
                ref={photoCircleRef}
                onClick={handlePhotoClick}
                style={{
                  width: isMobile ? 220 : 300,
                  height: isMobile ? 220 : 300,
                  borderRadius: '50%',
                  background: 'var(--paper)',
                  padding: 10,
                  boxShadow: isHovered
                    ? '0 24px 48px rgba(0,0,0,0.22), 0 10px 20px rgba(0,0,0,0.12)'
                    : '0 12px 28px rgba(0,0,0,0.16)',
                  transition: 'box-shadow 0.3s ease, transform 0.15s ease',
                  transform: isHovered
                    ? `scale(1.05) perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    : 'scale(1) perspective(700px) rotateX(0deg) rotateY(0deg)',
                  border: '3px solid var(--rose-deep)',
                  position: 'relative',
                  pointerEvents: 'auto',
                  overflow: 'visible',
                }}
              >
                {/* Corner tapes */}
                <Tape
                  style={{
                    top: -14,
                    left: -18,
                    transform: 'rotate(-38deg)',
                    width: 70,
                    height: 22,
                    pointerEvents: 'none',
                  }}
                />
                <Tape
                  style={{
                    bottom: -14,
                    right: -18,
                    transform: 'rotate(-38deg)',
                    width: 70,
                    height: 22,
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--rose-pale) 0%, var(--cream) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    pointerEvents: 'none',
                  }}
                >
                  <img
                    src="profile-pic.jpeg"
                    alt="Arun Kumar"
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* OPEN TO WORK ribbon */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: -22,
                    transform: 'rotate(14deg)',
                    background: 'var(--mustard)',
                    color: 'var(--ink)',
                    fontFamily: "'Kalam', cursive",
                    fontSize: 12,
                    letterSpacing: 0.6,
                    padding: '4px 12px',
                    borderRadius: 4,
                    boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
                    pointerEvents: 'none',
                  }}
                >
                  open to work
                </div>

                {/* Click bursts */}
                {bursts.map((b) => (
                  <svg
                    key={b.id}
                    width="22"
                    height="22"
                    viewBox="0 0 40 40"
                    style={{
                      position: 'absolute',
                      left: b.x - 11,
                      top: b.y - 11,
                      pointerEvents: 'none',
                      '--bx': `${b.dx}px`,
                      '--by': `${b.dy}px`,
                      '--brot': `${b.rot}deg`,
                      animation: 'burstFly 0.85s ease-out forwards',
                    }}
                  >
                    {b.kind === 'star' && (
                      <path
                        d="M20 4 L23 15 L34 16 L25 23 L28 34 L20 28 L12 34 L15 23 L6 16 L17 15 Z"
                        fill="none"
                        stroke={b.color}
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                    )}
                    {b.kind === 'sparkle' && (
                      <>
                        <path d="M20 4 L20 36 M 4 20 L 36 20" stroke={b.color} strokeWidth="3" strokeLinecap="round" />
                        <path
                          d="M8 8 L 32 32 M 32 8 L 8 32"
                          stroke={b.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                      </>
                    )}
                    {b.kind === 'heart' && (
                      <path
                        d="M20 32 C 6 22, 4 12, 12 9 C 17 7, 20 12, 20 14 C 20 12, 23 7, 28 9 C 36 12, 34 22, 20 32 Z"
                        fill="none"
                        stroke={b.color}
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                    )}
                    {b.kind === 'swirl' && (
                      <path
                        d="M8 30 C 6 18, 18 8, 28 14 C 34 18, 30 26, 24 24 C 20 23, 20 18, 24 18"
                        fill="none"
                        stroke={b.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                ))}

                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -34,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 14,
                      color: 'var(--rose-deep)',
                      fontFamily: "'Kalam', cursive",
                      whiteSpace: 'nowrap',
                      animation: 'bounce 1s infinite',
                    }}
                  >
                    drag me · double-click to reset
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating stamp badges */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              animation: 'float 4s ease-in-out infinite',
              animationDelay: '0.5s',
            }}
          >
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--mustard)" strokeWidth="2">
              <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
            </svg>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              left: 10,
              animation: 'float 5s ease-in-out infinite',
              animationDelay: '1s',
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="2">
              <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
            </svg>
          </div>
        </div>

        {/* ---------- RIGHT: TEXT ---------- */}
        <div style={{ position: 'relative' }}>
          {/* Rotated tag pill */}
          <div
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              background: 'var(--moss)',
              color: 'var(--paper)',
              fontFamily: "'Kalam', cursive",
              fontSize: 18,
              borderRadius: 4,
              transform: 'rotate(-2.5deg)',
              marginBottom: 20,
              boxShadow: '2px 2px 0 var(--ink)',
              animation: 'fadeInUp 0.8s ease-out',
            }}
          >
            hello, i'm
          </div>

          {/* Editorial headline */}
          <h1
            className="display"
            style={{
              fontSize: isMobile ? 62 : 92,
              color: 'var(--ink)',
              lineHeight: 0.98,
              marginBottom: 20,
              letterSpacing: '-0.02em',
              animation: 'fadeInUp 0.8s ease-out 0.15s both',
            }}
          >
            Gagan
            <br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              Dhyani
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: -46,
                  bottom: 14,
                  fontSize: 22,
                  color: 'var(--rose-deep)',
                  transform: 'rotate(-8deg)',
                }}
              >
                ✺
              </span>
            </span>
          </h1>

          {/* Role chip - bento card style */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 22,
              padding: '10px 18px',
              background: 'var(--paper)',
              border: '1.5px solid var(--ink)',
              borderRadius: 4,
              boxShadow: '4px 4px 0 var(--mustard)',
              animation: 'fadeInUp 0.8s ease-out 0.25s both',
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: 'var(--moss)',
                flexShrink: 0,
                animation: 'pulseDot 1.6s ease-in-out infinite',
              }}
            />
            <span
              className="marker"
              style={{
                fontSize: 15,
                color: 'var(--ink)',
                letterSpacing: 0.3,
                minWidth: 210,
              }}
            >
              {roleText}
              <span style={{ animation: 'blink 1s infinite', marginLeft: 1 }}>|</span>
            </span>
          </div>

          {/* Intro paragraph */}
          <p
            className="hand"
            style={{
              fontSize: 24,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              marginBottom: 32,
              maxWidth: 540,
              animation: 'fadeInUp 0.8s ease-out 0.35s both',
            }}
          >
            {typedText}
            <span style={{ animation: 'blink 1s infinite', marginLeft: 2 }}>|</span>
          </p>

          {/* Bento info cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, minmax(0,1fr))',
              gap: 12,
              maxWidth: 620,
              marginBottom: 36,
              animation: 'fadeInUp 0.8s ease-out 0.5s both',
            }}
          >
            {bentoCards.map((c) => (
              <div
                key={c.label}
                style={{
                  border: '1.5px dashed var(--ink-soft)',
                  borderRadius: 6,
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.35)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Kalam', cursive",
                    fontSize: 11,
                    letterSpacing: 1.4,
                    color: 'var(--ink-soft)',
                    marginBottom: 4,
                  }}
                >
                  {c.label}
                </div>
                <div
                  className="hand"
                  style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.3 }}
                >
                  {c.value}
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              alignItems: 'center',
              animation: 'fadeInUp 0.8s ease-out 0.65s both',
            }}
          >
            <ScribbleButton
              fill="var(--rose)"
              style={{ fontSize: 20, padding: '12px 28px' }}
              onClick={() =>
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
              }
            >
              get in touch →
            </ScribbleButton>

            <a
              href="GGN_Resume_updated.pdf"
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px 12px 26px',
                fontSize: 19,
                fontFamily: "'Kalam', cursive",
                color: 'var(--ink)',
                textDecoration: 'none',
                border: '2px solid var(--ink)',
                borderRadius: 4,
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ink)';
                e.currentTarget.style.color = 'var(--paper)';
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '4px 4px 0 var(--mustard)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--ink)';
                e.currentTarget.style.transform = 'translate(0,0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              download resume
            </a>

            <a
              href="mailto:dhyanigagan@gmail.com"
              className="hand"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 17,
                color: 'var(--ink-soft)',
                textDecoration: 'none',
                borderBottom: '1.5px dashed var(--ink-soft)',
                paddingBottom: 2,
              }}
            >
              or say hi via email ↗
            </a>
          </div>

          {/* Tag strip */}
          <div
            style={{
              marginTop: 30,
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              animation: 'fadeInUp 0.8s ease-out 0.8s both',
            }}
          >
            {['React', 'Node.js', 'MongoDB', 'MySQL', 'PHP', 'Shopify', 'Tailwind'].map((t) => (
              <span
                key={t}
                className="marker"
                style={{
                  fontSize: 13,
                  padding: '4px 10px',
                  border: '1.2px solid var(--ink-soft)',
                  borderRadius: 999,
                  color: 'var(--ink-soft)',
                  background: 'var(--paper)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="hand"
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          cursor: 'pointer',
          color: 'var(--ink-soft)',
          fontSize: 15,
          animation: 'scrollCueBob 2s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        <span>scroll to explore</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--rose-deep)" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes spinRing {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes burstFly {
          0% { transform: translate(0, 0) rotate(0deg) scale(0.6); opacity: 1; }
          100% { transform: translate(var(--bx), var(--by)) rotate(var(--brot)) scale(1.1); opacity: 0; }
        }
        @keyframes scrollCueBob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { PortfolioHero });