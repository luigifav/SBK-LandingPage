/* global React */
// SBK Animation primitives
// Exports: useReveal, useCountUp, Reveal, StaggerReveal, CountUp

// ─── useReveal ────────────────────────────────────────────────
// Returns [ref, isVisible]. Triggers once when element enters viewport.
function useReveal(options = {}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: options.threshold || 0.12, rootMargin: options.rootMargin || '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── useCountUp ───────────────────────────────────────────────
// Animates a number from 0 to `end` over `duration`ms when `active` is true.
// Supports suffixes like '%', '+', 'K+', etc.
function useCountUp(end, duration, active) {
  const [display, setDisplay] = React.useState('0');
  React.useEffect(() => {
    if (!active) return;
    // parse the raw number and suffix from strings like "150K+", "99%", "30"
    const str = String(end);
    const suffix = str.replace(/[\d.,]/g, '');
    const raw = parseFloat(str.replace(/[^\d.]/g, '')) || 0;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = raw * eased;
      // format: if raw >= 100 show integer, else 1 decimal
      const formatted = raw >= 100
        ? Math.round(current).toLocaleString('pt-BR')
        : current >= 10
          ? Math.round(current).toString()
          : current.toFixed(1);
      setDisplay(formatted + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active]);
  return display;
}

// ─── Reveal ───────────────────────────────────────────────────
// Wraps children with a scroll-triggered fade-up animation.
// Props: delay (ms), distance (px), direction ('up'|'left'|'right'), duration (ms)
function Reveal({ children, delay = 0, distance = 18, direction = 'up', duration = 560, style = {}, className = '' }) {
  const [ref, visible] = useReveal();
  const translateFrom = direction === 'up'
    ? `translateY(${distance}px)`
    : direction === 'left'
      ? `translateX(-${distance}px)`
      : `translateX(${distance}px)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : translateFrom,
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── StaggerReveal ────────────────────────────────────────────
// Reveals a list of items with staggered delays.
// Props: items (array), renderItem (fn), stagger (ms), baseDelay (ms)
function StaggerReveal({ items, renderItem, stagger = 60, baseDelay = 0, style = {}, itemStyle = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={style}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',
            transition: `opacity 500ms cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}ms,
                         transform 500ms cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}ms`,
            ...itemStyle,
          }}
        >
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  );
}

// ─── CountUp ──────────────────────────────────────────────────
// Animated number component. Triggers when it scrolls into view.
// Props: value (string|number), duration (ms), style, labelStyle, label
function CountUp({ value, duration = 1400, style = {}, label, labelStyle = {} }) {
  const [ref, visible] = useReveal({ threshold: 0.3 });
  const display = useCountUp(value, duration, visible);
  return (
    <div ref={ref}>
      <div style={style}>{display}</div>
      {label && <div style={labelStyle}>{label}</div>}
    </div>
  );
}

// ─── PageTransition ───────────────────────────────────────────
// Wraps a page with a fade+slide-up entrance on mount.
function PageTransition({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);
  return (
    <div style={{
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)',
    }}>
      {children}
    </div>
  );
}

window.useReveal = useReveal;
window.useCountUp = useCountUp;
window.Reveal = Reveal;
window.StaggerReveal = StaggerReveal;
window.CountUp = CountUp;
window.PageTransition = PageTransition;
