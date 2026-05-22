/* global React */
// Header + Footer chrome shared across pages

function Header({ tone = 'dark' }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
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
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        pointerEvents: 'none',
        display: 'flex', justifyContent: 'center',
        padding: '16px 24px'
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
        </div>
      </header>
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
    { label: 'LGPD · ISO 27001', to: '/' },
    { label: 'Termos de uso', to: '/' },
    { label: 'Privacidade', to: '/' },
    { label: 'Canal de ética', to: '/' }]
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
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#5C9094', boxShadow: '0 0 12px #5C9094'
              }} />
              30 anos de operação
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
                    <Link to={i.to} style={{
                  fontSize: 13, fontWeight: 300, color: '#8FA5A1',
                  transition: 'color 200ms', cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ECEFF3'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#8FA5A1'}>
                  {i.label}</Link>
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