// Ambient page background: fixed layer that sits behind all content.
// Because it's position:fixed, normal page scroll naturally produces a
// parallax feel (the layer stays put while content scrolls over it),
// and everything inside gently drifts/pans on its own for extra life.
//
// IMPORTANT: this file intentionally does NOT define its own color
// palette. It reads the site's real theme variables (--ink, --rose,
// --rose-deep, --rose-pale, --moss, --mustard, --sky, --paper, --cream,
// --cream-2), the same ones declared in index.html's :root and the ones
// ThemeSwitcherWidget updates via document.documentElement.style. That
// way switching themes re-colors the background and progress bar too,
// instead of leaving them stuck on a separate hardcoded palette.

const AmbientBackground = () => {
  // Track how far the page has been scrolled, as a 0–100 percentage,
  // to drive the top progress bar.
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, pct)));
      ticking = false;
    };
    // Mobile fires many scroll events per swipe; without this, every one
    // of them would trigger a React state update + re-render, competing
    // for the same frame budget as the blur/animation work below. Collapsing
    // them to at most one update per animation frame fixes that.
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // Scattered doodles: fixed viewport-relative spots, each with its own
  // drift speed/direction so the motion doesn't feel mechanical. Colors
  // are drawn from the live theme variables, so they re-color on theme
  // switch automatically.
  const doodleSpots = [
    { kind: 'swirl',   top: '8vh',   left: '6vw',  size: 30, color: 'var(--sky)',       dur: '22s', delay: '0s'   },
    { kind: 'star',    top: '22vh',  left: '92vw', size: 26, color: 'var(--mustard)',   dur: '26s', delay: '2s'   },
    { kind: 'sparkle', top: '48vh',  left: '4vw',  size: 24, color: 'var(--moss)',      dur: '19s', delay: '1s'   },
    { kind: 'heart',   top: '66vh',  left: '90vw', size: 22, color: 'var(--rose-deep)', dur: '24s', delay: '3s'   },
    { kind: 'star',    top: '85vh',  left: '10vw', size: 20, color: 'var(--sky)',       dur: '30s', delay: '0.5s' },
    { kind: 'swirl',   top: '105vh', left: '88vw', size: 28, color: 'var(--moss)',      dur: '21s', delay: '1.5s' },
    { kind: 'sparkle', top: '130vh', left: '8vw',  size: 22, color: 'var(--mustard)',   dur: '27s', delay: '2.5s' },
    { kind: 'heart',   top: '150vh', left: '85vw', size: 24, color: 'var(--rose-deep)', dur: '23s', delay: '1s'   },
  ];

  return (
    <>
      {/* Scroll progress bar: fixed to the very top, fills left-to-right
          as the user scrolls down the page. Uses the live theme vars
          directly (set on <html> by ThemeSwitcherWidget), so it re-colors
          on theme switch — and since --rose-deep/--moss/--sky live on
          document.documentElement, this works even though the bar is a
          sibling of .ambient-bg-layer, not a descendant of it. */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 4,
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, var(--rose-deep), var(--moss), var(--sky))',
        zIndex: 9999,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }} />

      <div aria-hidden="true" className="ambient-bg-layer" style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
      {/* No opaque base fill here on purpose — body already renders the
          site's paper texture + gradients (see index.html). Painting a
          solid rectangle here would hide that texture on every theme. */}

      {/* Layer 1: circuit-board style traces (thin grid lines standing in
          for PCB traces), drifting slowly */}
      <div className="bg-pattern" style={{
        position: 'absolute',
        inset: '-60px',
        backgroundImage: `
          repeating-linear-gradient(0deg, var(--sky) 0 1.5px, transparent 1.5px 48px),
          repeating-linear-gradient(90deg, var(--sky) 0 1.5px, transparent 1.5px 48px)
        `,
        opacity: 0.10,
        animation: 'bgGridDrift 60s linear infinite',
      }} />
      {/* Layer 2: solder-pad style dots at a coarser spacing (parallax
          depth), drifting the other way */}
      <div className="bg-pattern" style={{
        position: 'absolute',
        inset: '-60px',
        backgroundImage: 'radial-gradient(var(--moss) 2px, transparent 2px)',
        backgroundSize: '96px 96px',
        opacity: 0.14,
        animation: 'bgGridDrift2 80s linear infinite',
      }} />

      {/* Layer 3: large soft color blobs, blurred, slowly floating */}
      <div className="bg-blob" style={{
        position: 'absolute', top: '4vh', left: '-8vw', width: 380, height: 380, borderRadius: '50%',
        background: 'var(--sky)', opacity: 0.20, filter: 'blur(60px)',
        animation: 'bgBlobFloat1 16s ease-in-out infinite',
      }} />
      <div className="bg-blob" style={{
        position: 'absolute', top: '38vh', right: '-10vw', width: 420, height: 420, borderRadius: '50%',
        background: 'var(--moss)', opacity: 0.18, filter: 'blur(70px)',
        animation: 'bgBlobFloat2 20s ease-in-out infinite',
      }} />
      <div className="bg-blob" style={{
        position: 'absolute', top: '75vh', left: '-6vw', width: 340, height: 340, borderRadius: '50%',
        background: 'var(--mustard)', opacity: 0.18, filter: 'blur(60px)',
        animation: 'bgBlobFloat1 18s ease-in-out infinite reverse',
      }} />
      <div className="bg-blob" style={{
        position: 'absolute', top: '112vh', right: '-8vw', width: 360, height: 360, borderRadius: '50%',
        background: 'var(--rose-pale)', opacity: 0.20, filter: 'blur(65px)',
        animation: 'bgBlobFloat2 22s ease-in-out infinite reverse',
      }} />
      <div className="bg-blob" style={{
        position: 'absolute', top: '150vh', left: '-8vw', width: 380, height: 380, borderRadius: '50%',
        background: 'var(--sky)', opacity: 0.18, filter: 'blur(60px)',
        animation: 'bgBlobFloat1 19s ease-in-out infinite',
      }} />

      {/* Layer 4: scattered doodles, faint and slowly drifting/rotating */}
      {doodleSpots.map((d, i) => (
        <div key={i} className="bg-doodle" style={{
          position: 'absolute',
          top: d.top,
          left: d.left,
          opacity: 0.28,
          animation: `bgDoodleFloat ${d.dur} ease-in-out infinite`,
          animationDelay: d.delay,
        }}>
          <Doodle kind={d.kind} color={d.color} size={d.size} />
        </div>
      ))}

      <style>{`
        @keyframes bgGridDrift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 32px 32px, 32px 32px; }
        }
        @keyframes bgGridDrift2 {
          from { background-position: 0 0, 0 0; }
          to   { background-position: -96px 96px, -96px 96px; }
        }
        @keyframes bgBlobFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(24px, -30px) scale(1.06); }
        }
        @keyframes bgBlobFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-28px, 26px) scale(1.05); }
        }
        @keyframes bgDoodleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-18px) rotate(8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-bg-layer, .ambient-bg-layer * { animation: none !important; }
        }
        /* Blur filters and many concurrent infinite animations are
           disproportionately expensive on phones — this is the single
           biggest source of scroll jank/lag on mobile. Below 720px we
           shrink the blur radius a lot and stop animating the blobs and
           doodles (they stay in place, just don't drift), which cuts
           the per-frame compositing cost substantially while keeping
           the same overall look. */
        @media (max-width: 720px) {
          .ambient-bg-layer .bg-blob { filter: blur(24px) !important; animation: none !important; }
          .ambient-bg-layer .bg-doodle { animation: none !important; }
          .ambient-bg-layer .bg-pattern { animation: none !important; }
        }
      `}</style>
      </div>
    </>
  );
};

Object.assign(window, { AmbientBackground });