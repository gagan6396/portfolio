// Shared primitives: paper cards, tape, pencil scribble SVGs, buttons.

const Tape = ({ style = {}, angle = -8, w = 90, tone = 'var(--tape)' }) => (
  <div style={{
    position: 'absolute',
    width: w,
    height: 26,
    background: tone,
    transform: `rotate(${angle}deg)`,
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    pointerEvents: 'none',
    // torn edges via mask
    WebkitMaskImage: 'linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)',
    maskImage: 'linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)',
    ...style,
  }} />
);

const PaperCard = ({ children, tilt = 0, style = {}, tape = false, ...rest }) => (
  <div style={{
    position: 'relative',
    background: 'var(--paper)',
    borderRadius: 3,
    boxShadow: `
      0 1px 0 rgba(0,0,0,0.04),
      0 12px 24px -14px rgba(80,60,50,0.25),
      0 30px 60px -30px rgba(80,60,50,0.35)
    `,
    transform: `rotate(${tilt}deg)`,
    padding: 24,
    ...style,
  }} {...rest}>
    {tape && <Tape style={{ top: -12, left: '50%', marginLeft: -45 }} />}
    {children}
  </div>
);

// Underline scribble under a heading word
const Scribble = ({ color = 'var(--rose-deep)', width = 220, height = 18, style = {} }) => (
  <svg viewBox="0 0 220 18" width={width} height={height} style={{ display: 'block', ...style }}>
    <path d="M4 11 C 40 4, 80 16, 120 8 S 200 12, 216 6"
      fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M8 14 C 50 9, 110 17, 180 11"
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
  </svg>
);

// Hand-drawn arrow
const Arrow = ({ w = 120, h = 60, color = 'var(--ink)', style = {}, flip = false }) => (
  <svg viewBox="0 0 120 60" width={w} height={h} style={{
    display: 'block',
    transform: flip ? 'scaleX(-1)' : 'none',
    ...style,
  }}>
    <path d="M4 44 C 30 12, 70 60, 108 20"
      fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M108 20 L 96 22 M 108 20 L 102 32"
      fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Star doodle
const Doodle = ({ kind = 'star', color = 'var(--rose-deep)', size = 40, style = {} }) => {
  const paths = {
    star: <path d="M20 4 L23 15 L34 16 L25 23 L28 34 L20 28 L12 34 L15 23 L6 16 L17 15 Z"
      fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />,
    sparkle: <>
      <path d="M20 4 L20 36 M 4 20 L 36 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 8 L 32 32 M 32 8 L 8 32" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </>,
    heart: <path d="M20 32 C 6 22, 4 12, 12 9 C 17 7, 20 12, 20 14 C 20 12, 23 7, 28 9 C 36 12, 34 22, 20 32 Z"
      fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />,
    flower: <>
      <circle cx="20" cy="20" r="4" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="10" r="4" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="30" r="4" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="10" cy="20" r="4" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="20" r="4" fill="none" stroke={color} strokeWidth="2" />
    </>,
    swirl: <path d="M8 30 C 6 18, 18 8, 28 14 C 34 18, 30 26, 24 24 C 20 23, 20 18, 24 18"
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />,
    check: <path d="M6 22 L 16 32 L 34 8"
      fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
  };
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} style={style}>
      {paths[kind]}
    </svg>
  );
};

// Scribble button — hand-outlined rectangle
const ScribbleButton = ({ children, color = 'var(--ink)', fill = 'var(--rose)', onClick, style = {} }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        appearance: 'none',
        background: 'transparent',
        border: 'none',
        padding: '14px 28px',
        cursor: 'pointer',
        fontFamily: "'Caveat', cursive",
        fontWeight: 700,
        fontSize: 26,
        color,
        transform: hover ? 'translate(-1px, -2px) rotate(-1deg)' : 'rotate(-1deg)',
        transition: 'transform 180ms cubic-bezier(.2,.9,.3,1.2)',
        ...style,
      }}
    >
      <svg viewBox="0 0 220 70" preserveAspectRatio="none" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0,
      }}>
        <path
          d="M6 12 C 40 4, 120 8, 214 10 C 216 20, 210 44, 216 60 C 160 66, 80 62, 4 62 C 8 44, 2 22, 6 12 Z"
          fill={fill}
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ transition: 'fill 200ms' }}
        />
        <path
          d="M10 16 C 60 12, 140 14, 208 14"
          fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      </svg>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};

// Placeholder image with soft stripes + label
const PhotoPlaceholder = ({ label = 'photo', tone = 'rose', style = {} }) => {
  const tones = {
    rose:   ['#e8c9c4', '#d9a9a4'],
    moss:   ['#c7d0b6', '#a9b592'],
    sky:    ['#c6d3d8', '#a9c1c9'],
    cream:  ['#eadfc4', '#d9c9a4'],
    mustard:['#e8cd9a', '#d9a441'],
    ink:    ['#c8bcb2', '#a99b8f'],
  };
  const [a, b] = tones[tone] || tones.rose;
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`,
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: 11,
        color: 'rgba(30,20,15,0.55)',
        letterSpacing: 0.5,
      }}>
        {label}
      </div>
    </div>
  );
};

// Section header with marker title + scribble
const SectionHeader = ({ eyebrow, title, kicker }) => (
  <div style={{ marginBottom: 40, textAlign: 'left' }}>
    {eyebrow && (
      <div className="beanie" style={{
        fontSize: 26, color: 'var(--rose-deep)', marginBottom: -4, transform: 'rotate(-1.5deg)', display: 'inline-block',
      }}>{eyebrow}</div>
    )}
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, flexWrap: 'wrap' }}>
      <h2 className="display" style={{ margin: 0, fontSize: 72, color: 'var(--ink)' }}>{title}</h2>
      {kicker && <div className="hand" style={{ fontSize: 20, color: 'var(--ink-soft)', paddingBottom: 12, maxWidth: 320 }}>{kicker}</div>}
    </div>
    <Scribble width={260} style={{ marginTop: 6, marginLeft: 8 }} />
  </div>
);

Object.assign(window, { Tape, PaperCard, Scribble, Arrow, Doodle, ScribbleButton, PhotoPlaceholder, SectionHeader });
