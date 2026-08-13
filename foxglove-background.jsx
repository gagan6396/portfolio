// Ambient page background: fixed layer that sits behind all content.
// Because it's position:fixed, normal page scroll naturally produces a
// parallax feel (the layer stays put while content scrolls over it),
// and everything inside gently drifts/pans on its own for extra life.
// Uses CSS variables (--ink, --rose-deep, --moss, --mustard, --sky) so it
// stays in sync if the theme switcher changes the palette at runtime.

const AmbientBackground = () => {
  // Scattered doodles: fixed viewport-relative spots, each with its own
  // drift speed/direction so the motion doesn't feel mechanical.
  const doodleSpots = [
    { kind: 'swirl',   top: '8vh',   left: '6vw',  size: 30, color: 'var(--moss)',      dur: '22s', delay: '0s'   },
    { kind: 'star',    top: '22vh',  left: '92vw', size: 26, color: 'var(--mustard)',   dur: '26s', delay: '2s'   },
    { kind: 'sparkle', top: '48vh',  left: '4vw',  size: 24, color: 'var(--sky)',       dur: '19s', delay: '1s'   },
    { kind: 'heart',   top: '66vh',  left: '90vw', size: 22, color: 'var(--rose-deep)', dur: '24s', delay: '3s'   },
    { kind: 'star',    top: '85vh',  left: '10vw', size: 20, color: 'var(--sky)',       dur: '30s', delay: '0.5s' },
    { kind: 'swirl',   top: '105vh', left: '88vw', size: 28, color: 'var(--mustard)',   dur: '21s', delay: '1.5s' },
    { kind: 'sparkle', top: '130vh', left: '8vw',  size: 22, color: 'var(--moss)',      dur: '27s', delay: '2.5s' },
    { kind: 'heart',   top: '150vh', left: '85vw', size: 24, color: 'var(--rose-deep)', dur: '23s', delay: '1s'   },
  ];

  return (
    <div aria-hidden="true" className="ambient-bg-layer" style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {/* Layer 1: diagonal ruled lines, drifting one way */}
      <div style={{
        position: 'absolute',
        inset: '-60px',
        backgroundImage: 'repeating-linear-gradient(45deg, var(--ink) 0 1px, transparent 1px 42px)',
        opacity: 0.05,
        animation: 'bgLinesDriftA 50s linear infinite',
      }} />
      {/* Layer 2: cross-hatch, drifting the other way at a different pace (parallax depth) */}
      <div style={{
        position: 'absolute',
        inset: '-60px',
        backgroundImage: 'repeating-linear-gradient(-45deg, var(--rose-deep) 0 1px, transparent 1px 58px)',
        opacity: 0.035,
        animation: 'bgLinesDriftB 65s linear infinite',
      }} />

      {/* Layer 3: large soft color blobs, blurred, slowly floating */}
      <div style={{
        position: 'absolute', top: '4vh', left: '-8vw', width: 380, height: 380, borderRadius: '50%',
        background: 'var(--rose-pale)', opacity: 0.22, filter: 'blur(60px)',
        animation: 'bgBlobFloat1 16s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '38vh', right: '-10vw', width: 420, height: 420, borderRadius: '50%',
        background: 'var(--moss)', opacity: 0.14, filter: 'blur(70px)',
        animation: 'bgBlobFloat2 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '75vh', left: '-6vw', width: 340, height: 340, borderRadius: '50%',
        background: 'var(--sky)', opacity: 0.16, filter: 'blur(60px)',
        animation: 'bgBlobFloat1 18s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', top: '112vh', right: '-8vw', width: 360, height: 360, borderRadius: '50%',
        background: 'var(--mustard)', opacity: 0.12, filter: 'blur(65px)',
        animation: 'bgBlobFloat2 22s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', top: '150vh', left: '-8vw', width: 380, height: 380, borderRadius: '50%',
        background: 'var(--rose-pale)', opacity: 0.18, filter: 'blur(60px)',
        animation: 'bgBlobFloat1 19s ease-in-out infinite',
      }} />

      {/* Layer 4: scattered doodles, faint and slowly drifting/rotating */}
      {doodleSpots.map((d, i) => (
        <div key={i} style={{
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
        @keyframes bgLinesDriftA {
          from { background-position: 0 0; }
          to   { background-position: 84px 84px; }
        }
        @keyframes bgLinesDriftB {
          from { background-position: 0 0; }
          to   { background-position: -116px 116px; }
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
      `}</style>
    </div>
  );
};

Object.assign(window, { AmbientBackground });
