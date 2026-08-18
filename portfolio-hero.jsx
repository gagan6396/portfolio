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
  const typingText = "Full Stack Web Developer crafting digital experiences with PHP, MySQL, and the MERN stack. Based in Uttar Pradesh, India.";
  const roles = ['Full Stack Developer', 'MERN Stack Developer', 'PHP & MySQL Developer', 'Shopify Expert'];

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

  // Rotating role chip: types out each role, pauses, deletes, moves to next
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
      y: e.clientY - photoPos.y
    };
  };

  const handlePhotoTouchStart = (e) => {
    setIsDraggingPhoto(true);
    dragMoved.current = false;
    const touch = e.touches[0];
    photoDragStart.current = {
      x: touch.clientX - photoPos.x,
      y: touch.clientY - photoPos.y
    };
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingPhoto) return;
      dragMoved.current = true;
      setPhotoPos({
        x: e.clientX - photoDragStart.current.x,
        y: e.clientY - photoDragStart.current.y
      });
    };

    const handleTouchMove = (e) => {
      if (!isDraggingPhoto) return;
      dragMoved.current = true;
      const touch = e.touches[0];
      setPhotoPos({
        x: touch.clientX - photoDragStart.current.x,
        y: touch.clientY - photoDragStart.current.y
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

  // 3D tilt following the cursor while hovering (skipped mid-drag)
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

  // Double-click / double-tap resets a dragged photo back to center
  const handlePhotoDoubleClick = () => setPhotoPos({ x: 0, y: 0 });

  // Click bursts a little sprinkle of theme-colored doodles from the click point
  const doodleKinds = ['star', 'sparkle', 'heart', 'swirl'];
  const burstColors = ['var(--rose-deep)', 'var(--moss)', 'var(--mustard)', 'var(--sky)'];
  const handlePhotoClick = (e) => {
    if (dragMoved.current) { dragMoved.current = false; return; }
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
        rot: (Math.random() - 0.5) * 120
      };
    });
    setBursts((prev) => [...prev, ...newBursts]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.find((nb) => nb.id === b.id)));
    }, 900);
  };

  return (
    <section style={{ 
      minHeight: '100vh', 
      padding: '60px 32px 60px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background shapes */}
      {/* <div style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'var(--rose-pale)',
        opacity: 0.2,
        top: -100,
        right: -100,
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'var(--moss)',
        opacity: 0.15,
        bottom: -50,
        left: -50,
        animation: 'float 8s ease-in-out infinite reverse'
      }} /> */}
      
      <div style={{ maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: device === 'mobile' ? '1fr' : '1fr 1fr', gap: 48, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative' }}>
          <div className="beanie" style={{ 
            fontSize: 32, 
            color: 'var(--rose-deep)', 
            marginBottom: 16, 
            transform: 'rotate(-2deg)',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            hello, i'm
          </div>
          
          <h1 className="display" style={{ 
            fontSize: device === 'mobile' ? 56 : 72, 
            color: 'var(--ink)', 
            lineHeight: 1.1, 
            marginBottom: 24,
            animation: 'fadeInUp 0.8s ease-out 0.2s both'
          }}>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              Arun kumar
              <svg width="100%" height="12" viewBox="0 0 200 12" style={{ position: 'absolute', bottom: -8, left: 0 }}>
                <path d="M0 6 Q50 2, 100 6 T200 6" fill="none" stroke="var(--rose-deep)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            {/* <span style={{ color: 'var(--rose-deep)' }}>Kumar</span> */}
          </h1>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20,
            padding: '8px 16px',
            background: 'var(--paper)',
            border: '1.5px solid var(--ink)',
            borderRadius: 20,
            transform: 'rotate(-1deg)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            animation: 'fadeInUp 0.8s ease-out 0.3s both'
          }}>
            <span style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: 'var(--moss)',
              flexShrink: 0,
              animation: 'pulseDot 1.6s ease-in-out infinite'
            }} />
            <span className="marker" style={{ fontSize: 15, color: 'var(--ink)', letterSpacing: 0.3, minWidth: 210 }}>
              {roleText}
              <span style={{ animation: 'blink 1s infinite', marginLeft: 1 }}>|</span>
            </span>
          </div>
          
          <p className="hand" style={{ 
            fontSize: 24, 
            color: 'var(--ink-soft)', 
            lineHeight: 1.6, 
            marginBottom: 32, 
            maxWidth: 500,
            animation: 'fadeInUp 0.8s ease-out 0.4s both'
          }}>
            {typedText}
            <span style={{ 
              animation: 'blink 1s infinite',
              marginLeft: 2
            }}>|</span>
          </p>
          
          <div style={{ 
            marginTop: 44, 
            display: 'flex', 
            gap: 24, 
            alignItems: 'center', 
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease-out 0.6s both'
          }}>
            <div style={{ display: 'flex', marginLeft: 6 }}>
              {['rose','moss','mustard','sky'].map((t, i) => (
                <div key={t} style={{ 
                  width: 34, 
                  height: 34, 
                  borderRadius: '50%', 
                  background: { rose:'#c98a8a', moss:'#8a9a72', mustard:'#d9a441', sky:'#a9c1c9' }[t], 
                  border: '2px solid var(--paper)', 
                  marginLeft: i === 0 ? 0 : -10, 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2) translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                />
              ))}
            </div>
            <div className="hand" style={{ fontSize: 17, color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              2+ years of experience
            </div>
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>
            <ScribbleButton fill="var(--rose)" style={{ fontSize: 20, padding: '12px 28px' }} onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              get in touch →
            </ScribbleButton>
            <a 
              href="arun_kumar_resume.pdf" 
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                fontSize: 20,
                fontFamily: "'Kalam', cursive",
                color: 'var(--ink)',
                textDecoration: 'none',
                border: '2px solid var(--moss)',
                borderRadius: 4,
                background: 'var(--paper)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--moss)';
                e.currentTarget.style.color = 'var(--paper)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--paper)';
                e.currentTarget.style.color = 'var(--ink)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              download resume
            </a>
          </div>
        </div>

        <div style={{ position: 'relative', height: device === 'mobile' ? 400 : 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Decorative circles */}
          <div style={{ 
            width: 350, 
            height: 350, 
            borderRadius: '50%', 
            background: 'var(--rose-pale)', 
            opacity: 0.3, 
            position: 'absolute', 
            transform: 'rotate(15deg)',
            animation: 'float 6s ease-in-out infinite'
          }} />
          <div style={{ 
            width: 200, 
            height: 200, 
            borderRadius: '50%', 
            background: 'var(--moss)', 
            opacity: 0.2, 
            position: 'absolute', 
            transform: 'rotate(-10deg)',
            animation: 'float 8s ease-in-out infinite reverse'
          }} />

          {/* Draggable Profile Picture */}
          {/* Outer wrapper: owns the one-time fadeInUp entrance animation (animates `transform`) */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            animation: 'fadeInUp 0.8s ease-out 0.5s both'
          }}>
            {/* Inner wrapper: owns the live drag transform, free of any competing animation on `transform` */}
            <div
              onMouseDown={handlePhotoMouseDown}
              onTouchStart={handlePhotoTouchStart}
              onDoubleClick={handlePhotoDoubleClick}
              style={{
                position: 'relative',
                cursor: isDraggingPhoto ? 'grabbing' : 'grab',
                transform: `translate(${photoPos.x}px, ${photoPos.y}px)`,
                transition: isDraggingPhoto ? 'none' : 'transform 0.3s ease',
                userSelect: 'none'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={resetTilt}
              onMouseMoveCapture={handlePhotoMouseMoveTilt}
            >
              {/* Spinning dashed accent ring */}
              <svg
                width={device === 'mobile' ? 236 : 316}
                height={device === 'mobile' ? 236 : 316}
                viewBox="0 0 100 100"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'spinRing 14s linear infinite',
                  pointerEvents: 'none'
                }}
              >
                <circle cx="50" cy="50" r="47" fill="none" stroke="var(--moss)" strokeWidth="1.4" strokeDasharray="4 6" opacity="0.55" />
              </svg>
              <svg
                width={device === 'mobile' ? 216 : 290}
                height={device === 'mobile' ? 216 : 290}
                viewBox="0 0 100 100"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'spinRing 20s linear infinite reverse',
                  pointerEvents: 'none'
                }}
              >
                <circle cx="50" cy="50" r="47" fill="none" stroke="var(--mustard)" strokeWidth="1" strokeDasharray="1 8" opacity="0.5" />
              </svg>

              <div
                ref={photoCircleRef}
                onClick={handlePhotoClick}
                style={{
                  width: device === 'mobile' ? 200 : 280,
                  height: device === 'mobile' ? 200 : 280,
                  borderRadius: '50%',
                  background: 'var(--paper)',
                  padding: 8,
                  boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.1)' : '0 10px 25px rgba(0,0,0,0.15)',
                  transition: 'box-shadow 0.3s ease, transform 0.15s ease',
                  transform: isHovered
                    ? `scale(1.05) perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    : 'scale(1) perspective(700px) rotateX(0deg) rotateY(0deg)',
                  border: '3px solid var(--rose-deep)',
                  position: 'relative',
                  pointerEvents: 'auto',
                  overflow: 'visible'
                }}>
                <Tape style={{ top: -16, left: '50%', transform: 'translateX(-50%) rotate(-3deg)', width: 80, height: 24, pointerEvents: 'none' }} />
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--rose-pale) 0%, var(--cream) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  pointerEvents: 'none'
                }}>
                  <img 
                    src="profile.jpg" 
                    alt="Arun Kumar" 
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      pointerEvents: 'none'
                    }} 
                  />
                </div>

                {/* Click-burst doodles */}
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
                      animation: 'burstFly 0.85s ease-out forwards'
                    }}
                  >
                    {b.kind === 'star' && <path d="M20 4 L23 15 L34 16 L25 23 L28 34 L20 28 L12 34 L15 23 L6 16 L17 15 Z" fill="none" stroke={b.color} strokeWidth="2.5" strokeLinejoin="round" />}
                    {b.kind === 'sparkle' && <><path d="M20 4 L20 36 M 4 20 L 36 20" stroke={b.color} strokeWidth="3" strokeLinecap="round" /><path d="M8 8 L 32 32 M 32 8 L 8 32" stroke={b.color} strokeWidth="2" strokeLinecap="round" opacity="0.6" /></>}
                    {b.kind === 'heart' && <path d="M20 32 C 6 22, 4 12, 12 9 C 17 7, 20 12, 20 14 C 20 12, 23 7, 28 9 C 36 12, 34 22, 20 32 Z" fill="none" stroke={b.color} strokeWidth="2.5" strokeLinejoin="round" />}
                    {b.kind === 'swirl' && <path d="M8 30 C 6 18, 18 8, 28 14 C 34 18, 30 26, 24 24 C 20 23, 20 18, 24 18" fill="none" stroke={b.color} strokeWidth="2.5" strokeLinecap="round" />}
                  </svg>
                ))}
                
                {/* Drag indicator */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    bottom: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 14,
                    color: 'var(--rose-deep)',
                    fontFamily: "'Kalam', cursive",
                    whiteSpace: 'nowrap',
                    animation: 'bounce 1s infinite'
                  }}>
                    drag me · double-click to reset
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating doodles */}
          <div style={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            animation: 'float 4s ease-in-out infinite',
            animationDelay: '0.5s'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--mustard)" strokeWidth="2">
              <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/>
            </svg>
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: 40, 
            left: 20, 
            animation: 'float 5s ease-in-out infinite',
            animationDelay: '1s'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="2">
              <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="hand"
        style={{
          position: 'absolute',
          bottom: 20,
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
          zIndex: 2
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
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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