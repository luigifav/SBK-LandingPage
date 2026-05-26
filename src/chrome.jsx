/* global React */
// Header + Footer chrome shared across pages

function Header({ tone = 'dark' }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const route = typeof useHashRoute === 'function' ? useHashRoute() : '/';

  React.useEffect(() => {
    // entrance animation delay
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menu on route change
  React.useEffect(() => { setMenuOpen(false); }, [route]);

  // lock body scroll when menu open
  React.useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  const links = [
  { to: '/ecossistema', label: 'Ecossistema' },
  { to: '/sbk-ia', label: 'SBK IA' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/resultados', label: 'Resultados' }];


  const isActive = (to) => route === to || route.startsWith(to + '/');

  // pill background — always dark-glass regardless of page tone
  const pillBg = scrolled ?
  'rgba(1, 20, 18, 0.82)' :
  'rgba(1, 28, 26, 0.60)';
  const pillBorder = scrolled ?
  'rgba(92, 144, 148, 0.22)' :
  'rgba(92, 144, 148, 0.14)';

  return (
    <>
      <style>{`
        @keyframes nav-drop {
          from { opacity: 0; transform: translateY(-14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1); }
        }
        .sbk-nav-pill {
          animation: nav-drop 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .sbk-nav-link {
          position: relative;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(236,239,243,0.65);
          padding: 7px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: color 180ms cubic-bezier(.2,0,.0,1),
                      background 180ms cubic-bezier(.2,0,.0,1);
          white-space: nowrap;
          text-decoration: none;
        }
        .sbk-nav-link:hover {
          color: #ECEFF3;
          background: rgba(236,239,243,0.07);
        }
        .sbk-nav-link.active {
          color: #ECEFF3;
        }
        .sbk-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%; transform: translateX(-50%);
          width: 18px; height: 2px;
          border-radius: 99px;
          background: #5C9094;
        }
        .sbk-nav-cta {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #012824;
          background: #ECEFF3;
          border: none;
          border-radius: 8px;
          padding: 8px 18px;
          cursor: pointer;
          text-decoration: none;
          transition: background 180ms cubic-bezier(.2,0,.0,1),
                      transform 100ms cubic-bezier(.2,0,.0,1);
          white-space: nowrap;
        }
        .sbk-nav-cta:hover { background: #fff; }
        .sbk-nav-cta:active { transform: translateY(1px); }
        .sbk-nav-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #5C9094;
          flex-shrink: 0;
        }
        @media (max-width: 780px) {
          .sbk-nav-links { display: none !important; }
          .sbk-nav-burger { display: inline-flex !important; }
        }
        .sbk-nav-burger {
          display: none;
          align-items: center; justify-content: center;
          width: 38px; height: 38px;
          background: rgba(236,239,243,0.06);
          border: 1px solid rgba(236,239,243,0.14);
          border-radius: 10px;
          color: #ECEFF3;
          cursor: pointer; padding: 0;
          margin-left: 6px;
          transition: background 180ms, border-color 180ms;
        }
        .sbk-nav-burger:hover { background: rgba(236,239,243,0.10); border-color: rgba(92,144,148,0.4); }
        .sbk-nav-burger:active { transform: scale(0.96); }

        /* Mobile drawer */
        .sbk-mobile-drawer {
          position: fixed; inset: 0;
          z-index: 200;
          background: rgba(1,20,18,0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 240ms cubic-bezier(.2,0,0,1);
        }
        .sbk-mobile-drawer.open {
          opacity: 1;
          pointer-events: auto;
        }
        .sbk-mobile-drawer-panel {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: min(360px, 88vw);
          background: linear-gradient(180deg, #012824 0%, #011C1A 100%);
          border-left: 1px solid rgba(92,144,148,0.18);
          box-shadow: -24px 0 60px rgba(0,0,0,0.4);
          padding: 84px 28px 32px;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 320ms cubic-bezier(.2,0,0,1);
          overflow-y: auto;
        }
        .sbk-mobile-drawer.open .sbk-mobile-drawer-panel {
          transform: translateX(0);
        }
        .sbk-mobile-close {
          position: absolute; top: 22px; right: 22px;
          width: 40px; height: 40px;
          background: rgba(236,239,243,0.06);
          border: 1px solid rgba(236,239,243,0.14);
          border-radius: 12px;
          color: #ECEFF3;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; padding: 0;
          transition: background 180ms, border-color 180ms;
        }
        .sbk-mobile-close:hover {
          background: rgba(236,239,243,0.10);
          border-color: rgba(92,144,148,0.4);
        }
        .sbk-mobile-link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 22px; font-weight: 500;
          color: rgba(236,239,243,0.85);
          padding: 18px 0;
          border-bottom: 1px solid rgba(236,239,243,0.08);
          text-decoration: none;
          display: flex; align-items: center; justify-content: space-between;
          letter-spacing: -0.01em;
          transition: color 180ms;
        }
        .sbk-mobile-link:hover { color: #ECEFF3; }
        .sbk-mobile-link.active { color: #ECEFF3; }
        .sbk-mobile-link.active::after {
          content: '';
          width: 8px; height: 8px; border-radius: 50%;
          background: #5C9094;
        }
        .sbk-mobile-link-arrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px; color: #5C9094;
          opacity: 0.6;
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        pointerEvents: 'none',
        display: 'flex', justifyContent: 'center',
        padding: '16px 24px',
        paddingTop: 'max(16px, env(safe-area-inset-top))'
      }}>
        <div
          className="sbk-nav-pill"
          style={{
            pointerEvents: 'all',
            display: 'flex', alignItems: 'center', gap: 4,
            height: 52,

            background: pillBg,
            border: `1px solid ${pillBorder}`,
            borderRadius: 999,
            backdropFilter: 'blur(20px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
            boxShadow: scrolled ?
            '0 8px 32px rgba(0,0,0,0.32), 0 1px 0 rgba(92,144,148,0.10) inset' :
            '0 4px 16px rgba(0,0,0,0.18)',
            transition: 'background 300ms cubic-bezier(.2,0,.0,1), border-color 300ms, box-shadow 300ms',
            maxWidth: 780, width: '100%', margin: "1px", padding: "0px 14px"
          }}>
          
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0 10px 0 2px', height: '100%',
            textDecoration: 'none', flexShrink: 0
          }}>
            <span className="sbk-nav-dot" />
            <img src="assets/sbk-logo-branco.png" alt="SBK" style={{ height: 18, opacity: 0.92 }} />
          </Link>

          {/* Separator */}
          <div style={{
            width: 1, height: 20, background: 'rgba(236,239,243,0.12)',
            marginRight: 4, flexShrink: 0
          }} />

          {/* Nav links */}
          <nav className="sbk-nav-links" style={{ display: 'flex', gap: 2 }}>
            {links.map((l) =>
            <Link
              key={l.to}
              to={l.to}
              className={`sbk-nav-link${isActive(l.to) ? ' active' : ''}`}>
              
                {l.label}
              </Link>
            )}
          </nav>

          <div style={{ flex: 1 }} />

          {/* CTA */}
          <Link to="/contato" className="sbk-nav-cta">
            Fale conosco
          </Link>

          {/* Burger — mobile only */}
          <button
            type="button"
            className="sbk-nav-burger"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <line x1="1" y1="2"  x2="17" y2="2" />
              <line x1="1" y1="7"  x2="17" y2="7" />
              <line x1="1" y1="12" x2="17" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`sbk-mobile-drawer${menuOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}>
        <div className="sbk-mobile-drawer-panel">
          <button
            type="button"
            className="sbk-mobile-close"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>

          <Link to="/" className="sbk-mobile-link" style={{ borderTop: '1px solid rgba(236,239,243,0.08)' }}>
            Home
            <span className="sbk-mobile-link-arrow">→</span>
          </Link>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`sbk-mobile-link${isActive(l.to) ? ' active' : ''}`}>
              {l.label}
              {!isActive(l.to) && <span className="sbk-mobile-link-arrow">→</span>}
            </Link>
          ))}

          <div style={{ flex: 1, minHeight: 32 }} />

          <Link
            to="/contato"
            style={{
              background: '#ECEFF3',
              color: '#012824',
              padding: '16px 24px',
              borderRadius: 12,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginTop: 24,
            }}>
            Fale conosco
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 14 }}>→</span>
          </Link>

          <div style={{
            marginTop: 24, paddingTop: 20,
            borderTop: '1px solid rgba(236,239,243,0.08)',
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10, color: '#7A9FA3',
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5C9094' }} />
            30 anos · Legal Operations
          </div>
        </div>
      </div>
    </>);

}

function Footer() {
  const cols = [
  { title: 'Ecossistema', items: [
    { label: 'Captura', to: '/produto/captura' },
    { label: 'Cadastro', to: '/produto/cadastro' },
    { label: 'Monitoramento', to: '/produto/monitoramento' },
    { label: 'Pré-judicial', to: '/produto/pre-judicial' },
    { label: 'Ofícios', to: '/produto/oficios' },
    { label: 'Subsídios e Laudos', to: '/produto/subsidios' },
    { label: 'Analytics', to: '/ecossistema' }]
  },
  { title: 'SBK IA', items: [
    { label: 'A plataforma', to: '/sbk-ia' },
    { label: 'Captura IA', to: '/sbk-ia' },
    { label: 'Monitoramento IA', to: '/sbk-ia' },
    { label: 'Firmas e Poderes IA', to: '/sbk-ia' }]
  },
  { title: 'Empresa', items: [
    { label: 'Sobre', to: '/sobre' },
    { label: 'Resultados', to: '/resultados' },
    { label: 'Contato', to: '/contato' }]
  },
  { title: 'Legal', items: [
    { label: 'LGPD · ISO 27001', href: 'https://www.sbk.com.br/wp-content/uploads/2025/07/M08840-SBK-BPO-SERVICOS-TECNOLOGICOS-E-REPRESENTACOES-COMERCIAIS-LTDA-109458-27967-ISO27001.pdf' },
    { label: 'Termos de uso', to: '/termos' },
    { label: 'Privacidade', to: '/privacidade' },
    { label: 'Política de cookies', to: '/cookies' },
    { label: 'Canal de ética', href: 'https://docs.google.com/forms/d/e/1FAIpQLSf1vRp4Q5J8gSwXqs5sFXCpHoWW9-8vISlDl5erMjKaygPeAA/viewform?usp=send_form' }]
  }];

  return (
    <footer className="sbk-surface-deep" style={{
      padding: '96px 0 32px',
      color: '#8FA5A1'
    }}>
      <div className="sbk-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr repeat(4, 1fr)',
          gap: 48,
          paddingBottom: 64
        }}>
          <div>
            <img src="assets/sbk-logo-branco.png" alt="SBK"
            style={{ height: 26, marginBottom: 24 }} />
            <p style={{
              fontSize: 14, fontWeight: 300, lineHeight: 1.6,
              maxWidth: 320, margin: '0 0 24px', color: '#C8D7D4'
            }}>
              Legal Operations sob medida para grandes instituições financeiras.
              Trinta anos transformando burocracia em fluidez.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 14px',
              border: '1px solid rgba(236,239,243,0.18)',
              borderRadius: 999,
              fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#8FA5A1'
            }}>
              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 10, height: 10 }}>
                <span style={{
                  position: 'absolute',
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'rgba(92,144,148,0.4)',
                  animation: 'sbk-ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
                }} />
                <span style={{
                  position: 'relative',
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#5C9094', boxShadow: '0 0 8px #5C9094',
                  flexShrink: 0,
                }} />
              </span>
              30 anos de operação
              <style>{`
                @keyframes sbk-ping {
                  0%   { transform: scale(1);   opacity: 0.7; }
                  70%  { transform: scale(2.2); opacity: 0; }
                  100% { transform: scale(2.2); opacity: 0; }
                }
              `}</style>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
              {[
                {
                  href: 'https://www.linkedin.com/company/sbkbs/',
                  label: 'LinkedIn',
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://www.instagram.com/sbkbs_/',
                  label: 'Instagram',
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://www.tiktok.com/@sbktecnologia',
                  label: 'TikTok',
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 38, height: 38, borderRadius: 10,
                    border: '1px solid rgba(236,239,243,0.14)',
                    color: '#8FA5A1',
                    textDecoration: 'none',
                    transition: 'border-color 180ms, color 180ms, background 180ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(92,144,148,0.5)';
                    e.currentTarget.style.color = '#ECEFF3';
                    e.currentTarget.style.background = 'rgba(92,144,148,0.10)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(236,239,243,0.14)';
                    e.currentTarget.style.color = '#8FA5A1';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) =>
          <div key={col.title}>
              <div className="sbk-eyebrow" style={{
              color: '#ECEFF3', marginBottom: 20
            }}>{col.title}</div>
              <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: 12
            }}>
                {col.items.map((i) =>
              <li key={i.label}>
                    {i.href ? (
                  <a href={i.href} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: 13, fontWeight: 300, color: '#8FA5A1',
                    transition: 'color 200ms', cursor: 'pointer', textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ECEFF3'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8FA5A1'}>
                    {i.label}
                  </a>
                ) : (
                  <Link to={i.to} style={{
                    fontSize: 13, fontWeight: 300, color: '#8FA5A1',
                    transition: 'color 200ms', cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ECEFF3'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8FA5A1'}>
                    {i.label}
                  </Link>
                )}
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
        <div className="hairline-dark" />
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', paddingTop: 32, fontSize: 12, fontWeight: 300,
          flexWrap: 'wrap', gap: 16
        }}>
          <div>© 2026 SBK Tecnologia S.A. — Todos os direitos reservados.</div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span>CNPJ 00.581.891/0001-17/0001-00</span>
            <span>·</span>
            <span>São Paulo, SP</span>
          </div>
        </div>
      </div>
    </footer>);

}

window.SBKHeader = Header;
window.SBKFooter = Footer;