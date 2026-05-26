/* global React, ECOSYSTEM_MODULES, ANALYTICS_MODULE, navigate */
// RadialEcosystemMap — Analytics in the centre, modules orbiting

function RadialEcosystemMap({ size: maxSize = 560, tone = 'dark', interactive = true, onModuleClick }) {
  const [hover, setHover] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const wrapRef = React.useRef(null);
  // Initial size computed synchronously to avoid a 560→clamped flash on first paint
  const initialSize = (() => {
    if (typeof window === 'undefined') return maxSize;
    const w = window.innerWidth;
    const cap = w <= 480 ? Math.min(w - 32, 360)
              : w <= 720 ? Math.min(w - 48, 440)
              : maxSize;
    return Math.max(280, Math.min(maxSize, cap));
  })();
  const [size, setSize] = React.useState(initialSize);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Responsively clamp size to parent container width
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el || !el.parentElement) return;
    const measure = () => {
      const avail = el.parentElement.getBoundingClientRect().width;
      // small phones: more aggressive shrink (saves vertical space)
      const cap = window.innerWidth <= 480 ? Math.min(avail, 360)
                : window.innerWidth <= 720 ? Math.min(avail, 440)
                : Math.min(avail, maxSize);
      setSize(Math.max(280, Math.min(maxSize, cap)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el.parentElement);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [maxSize]);

  const isDark = tone === 'dark';
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const coreRadius = size * 0.13;
  const moduleRadius = size * 0.085;

  const colors = isDark ? {
    bg: 'transparent',
    ring: 'rgba(236,239,243,0.10)',
    ringStrong: 'rgba(236,239,243,0.18)',
    line: 'rgba(140,175,169,0.30)',
    moduleBg: 'rgba(236,239,243,0.04)',
    moduleBorder: 'rgba(236,239,243,0.16)',
    moduleHover: 'rgba(42,124,121,0.18)',
    moduleHoverBorder: 'rgba(140,175,169,0.6)',
    moduleText: '#ECEFF3',
    moduleTextMuted: '#8FA5A1',
    coreBg: '#075056',
    coreBorder: 'rgba(140,175,169,0.4)',
    coreText: '#ECEFF3',
    coreEyebrow: '#8FAFA9',
  } : {
    bg: 'transparent',
    ring: 'rgba(2,40,36,0.08)',
    ringStrong: 'rgba(2,40,36,0.14)',
    line: 'rgba(7,80,86,0.30)',
    moduleBg: '#FFFFFF',
    moduleBorder: 'rgba(2,40,36,0.12)',
    moduleHover: '#075056',
    moduleHoverBorder: '#075056',
    moduleText: '#012824',
    moduleTextMuted: '#4A545E',
    coreBg: '#012824',
    coreBorder: 'rgba(2,40,36,0.3)',
    coreText: '#ECEFF3',
    coreEyebrow: '#5C9094',
  };

  const modules = ECOSYSTEM_MODULES;
  const N = modules.length;

  return (
    <div ref={wrapRef} className="radial-map-wrap" style={{ position: 'relative', width: size, height: size, margin: '0 auto', maxWidth: '100%' }}>
      {/* Concentric ring decoration */}
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="rcore" cx="50%" cy="50%">
            <stop offset="0%" stopColor={isDark ? '#2A7C79' : '#075056'} stopOpacity="0.18" />
            <stop offset="100%" stopColor={isDark ? '#2A7C79' : '#075056'} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* faint glow behind core */}
        <circle cx={cx} cy={cy} r={radius * 1.1} fill="url(#rcore)" />
        {/* outer ring */}
        <circle cx={cx} cy={cy} r={radius} fill="none"
          stroke={colors.ring} strokeWidth="1" strokeDasharray="2 4" />
        {/* mid ring */}
        <circle cx={cx} cy={cy} r={radius * 0.62} fill="none"
          stroke={colors.ring} strokeWidth="1" />
        {/* connector lines from core to each module */}
        {modules.map((m, i) => {
          const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          const xCore = cx + Math.cos(angle) * coreRadius;
          const yCore = cy + Math.sin(angle) * coreRadius;
          const isHover = hover === m.id;
          return (
            <line key={m.id} x1={xCore} y1={yCore} x2={x} y2={y}
              stroke={isHover ? colors.moduleHoverBorder : colors.line}
              strokeWidth={isHover ? 1.6 : 1}
              strokeOpacity={mounted ? 1 : 0}
              style={{ transition: 'all 320ms cubic-bezier(.2,0,0,1)' }} />
          );
        })}
        {/* tier indicator dots on outer ring */}
        {modules.map((m, i) => {
          const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
          const r2 = radius + 14;
          const x = cx + Math.cos(angle) * r2;
          const y = cy + Math.sin(angle) * r2;
          return (
            <g key={'dot' + m.id}>
              {m.tier === 'both' && (
                <>
                  <circle cx={x - 4} cy={y} r="2.2" fill={isDark ? '#5C9094' : '#075056'} />
                  <circle cx={x + 4} cy={y} r="2.2" fill={isDark ? '#ECEFF3' : '#2A7C79'} />
                </>
              )}
              {m.tier === 'sbk' && (
                <circle cx={x} cy={y} r="2.2" fill={isDark ? '#ECEFF3' : '#012824'} />
              )}
            </g>
          );
        })}
      </svg>

      {/* Core pulse rings */}
      {mounted && [1, 2].map(n => (
        <div key={n} aria-hidden style={{
          position: 'absolute',
          left: cx - coreRadius * 1.5,
          top: cy - coreRadius * 1.5,
          width: coreRadius * 3,
          height: coreRadius * 3,
          borderRadius: '50%',
          border: `1px solid ${isDark ? 'rgba(92,144,148,0.35)' : 'rgba(7,80,86,0.25)'}`,
          animation: `sbk-core-pulse ${n === 1 ? '2.8s' : '3.6s'} ease-out ${n === 1 ? '0s' : '0.8s'} infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Core: Analytics */}
      <div style={{
        position: 'absolute',
        left: cx - coreRadius * 1.5,
        top: cy - coreRadius * 1.5,
        width: coreRadius * 3,
        height: coreRadius * 3,
        borderRadius: '50%',
        background: colors.coreBg,
        border: `1px solid ${colors.coreBorder}`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: interactive ? 'pointer' : 'default',
        boxShadow: isDark
          ? '0 0 60px rgba(42,124,121,0.25), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 24px 60px rgba(1,28,26,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
        transform: mounted ? 'scale(1)' : 'scale(0.9)',
        opacity: mounted ? 1 : 0,
        transition: 'all 480ms cubic-bezier(.2,0,0,1)',
      }}
      onClick={() => interactive && (onModuleClick ? onModuleClick('analytics') : navigate('/ecossistema'))}
      >
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: colors.coreEyebrow,
          marginBottom: 6,
        }}>Núcleo</div>
        <div style={{
          fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 600,
          letterSpacing: '-0.02em', color: colors.coreText, marginBottom: 4,
        }}>Analytics</div>
        <div style={{
          fontSize: 10, fontWeight: 300, color: colors.coreEyebrow,
          textAlign: 'center', maxWidth: coreRadius * 2.4, lineHeight: 1.35,
        }}>Inteligência que retroalimenta o ecossistema</div>
      </div>

      {/* Modules around the orbit */}
      {modules.map((m, i) => {
        const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const isHover = hover === m.id;
        return (
          <div key={m.id}
            onMouseEnter={() => interactive && setHover(m.id)}
            onMouseLeave={() => interactive && setHover(null)}
            onClick={() => interactive && (onModuleClick ? onModuleClick(m.id) : navigate('/produto/' + m.id))}
            style={{
              position: 'absolute',
              left: x - moduleRadius,
              top: y - moduleRadius,
              width: moduleRadius * 2,
              height: moduleRadius * 2,
              borderRadius: '50%',
              background: isHover ? colors.moduleHover : colors.moduleBg,
              border: `1px solid ${isHover ? colors.moduleHoverBorder : colors.moduleBorder}`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'all 240ms cubic-bezier(.2,0,0,1)',
              transform: mounted ? `scale(${isHover ? 1.06 : 1})` : 'scale(0.4)',
              opacity: mounted ? 1 : 0,
              transitionDelay: mounted ? '0ms' : `${i * 30 + 80}ms`,
              padding: 10, textAlign: 'center',
              backdropFilter: isDark ? 'blur(10px)' : 'none',
              boxShadow: isHover
                ? (isDark ? '0 12px 32px rgba(0,0,0,0.4)' : '0 12px 28px rgba(1,28,26,0.18)')
                : 'none',
            }}>
            <div style={{
              fontSize: Math.max(10, moduleRadius * 0.18),
              fontWeight: 600, color: colors.moduleText,
              letterSpacing: '-0.01em', lineHeight: 1.1,
            }}>{m.short}</div>
          </div>
        );
      })}

      {/* Hover detail panel */}
      {hover && (
        <div style={{
          position: 'absolute', bottom: -8, left: '50%',
          transform: 'translate(-50%, 100%)',
          padding: '12px 18px', maxWidth: 360, textAlign: 'center',
          background: isDark ? 'rgba(1,28,26,0.95)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(140,175,169,0.3)' : 'rgba(2,40,36,0.14)'}`,
          borderRadius: 10, color: colors.moduleText,
          boxShadow: isDark ? '0 12px 32px rgba(0,0,0,0.5)' : '0 12px 32px rgba(1,28,26,0.16)',
          fontSize: 13, fontWeight: 300, lineHeight: 1.5,
          animation: 'sbk-fade-up 220ms cubic-bezier(.2,0,0,1) both',
          zIndex: 5,
        }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
            {ECOSYSTEM_MODULES.find(m => m.id === hover)?.label}
          </div>
          <div style={{ color: colors.moduleTextMuted }}>
            {ECOSYSTEM_MODULES.find(m => m.id === hover)?.desc}
          </div>
        </div>
      )}
    </div>
  );
}

window.RadialEcosystemMap = RadialEcosystemMap;
