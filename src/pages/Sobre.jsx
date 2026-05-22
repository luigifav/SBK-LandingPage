/* global React, Link, Reveal, StaggerReveal, CountUp, PageTransition */

const SOBRE_PHOTOS = [
  { src: 'assets/photos/evento-equipe.jpg',    alt: 'Equipe SBK no Congresso de Gestão Jurídica', caption: 'Time SBK em campo' },
  { src: 'assets/photos/sede-exterior.jpg',    alt: 'Sede SBK',                                   caption: 'Sede SBK' },
  { src: 'assets/photos/sede-equipe.jpg',      alt: 'Equipe na sede SBK',                         caption: 'Equipe na sede' },
  { src: 'assets/photos/evento-booth.jpg',     alt: 'Demo da plataforma no stand SBK',            caption: 'Demo com potenciais clientes' },
  { src: 'assets/photos/travessia-equipe.jpg', alt: 'Evento Travessia — equipe SBK',              caption: 'Evento Travessia' },
  { src: 'assets/photos/evento-flyer.jpg',     alt: 'Material Lum.IA no Congresso',               caption: 'Lançamento Lum.IA' },
  { src: 'assets/photos/congresso-robot.jpg',    alt: 'Robô Lum.IA no Congresso',                  caption: 'Lum.IA no congresso' },
  { src: 'assets/photos/escritorio-reuniao.jpg', alt: 'Reunião na sede SBK',                       caption: 'Operação +Controle −Burocracia' },
  { src: 'assets/photos/escritorio-equipe.jpg',  alt: 'Equipe SBK no escritório',                  caption: 'Time SBK na operação' },
  { src: 'assets/photos/galpao-vista-cima.jpg', alt: 'Galpão SBK — vista do alto',               caption: 'Galpão de armazenagem · 2010–2015' },
  { src: 'assets/photos/galpao-panoramica.jpg', alt: 'Galpão SBK — vista panorâmica',            caption: 'Operação de documentos · 2010–2015' },
  { src: 'assets/photos/galpao-corredor.jpg',   alt: 'Galpão SBK — corredor de prateleiras',     caption: 'Estrutura física da operação · 2010–2015' },
];

/* PhotoGrid — estado centralizado, sem foto repetida, transições lentas */
const GRID_FADE   = 1000;  // ms crossfade
const GRID_CYCLE  = 11000; // ms entre trocas por célula

// layout: 1 grande (esq, 2 linhas) + 2 menores empilhadas (dir)
const CELL_LAYOUT = [
  { col: '1/2', row: '1/3', objPos: 'center 25%', caption: true,  label: 'SBK · 30 anos' },
  { col: '2/3', row: '1/2', objPos: 'center 40%', caption: true,  label: null },
  { col: '2/3', row: '2/3', objPos: 'center top',  caption: true,  label: null },
];

function PhotoGrid({ photos }) {
  const n = photos.length;
  const C = CELL_LAYOUT.length; // 3

  // Estado unificado para evitar fotos duplicadas entre células
  const [state, setState] = React.useState({
    curr:   [0, 1, 2],
    next:   [0, 1, 2],
    fading: [false, false, false],
  });
  const stateRef = React.useRef(state);
  stateRef.current = state;

  React.useEffect(() => {
    const cleanup = [];

    for (let cell = 0; cell < C; cell++) {
      const stagger = cell * (GRID_CYCLE / C);

      const advance = () => {
        const s = stateRef.current;
        // fotos em uso pelas outras células
        const inUse = new Set(s.curr.filter((_, i) => i !== cell));
        // próxima foto que não está em uso
        let candidate = (s.curr[cell] + 1) % n;
        for (let t = 0; t < n; t++) {
          if (!inUse.has(candidate)) break;
          candidate = (candidate + 1) % n;
        }
        const c = candidate;

        setState(prev => ({
          curr:   prev.curr,
          next:   prev.next.map((v, i)  => i === cell ? c : v),
          fading: prev.fading.map((v, i) => i === cell ? true : v),
        }));

        const tid = setTimeout(() => {
          setState(prev => ({
            curr:   prev.curr.map((v, i)  => i === cell ? c : v),
            next:   prev.next.map((v, i)  => i === cell ? c : v),
            fading: prev.fading.map((v, i) => i === cell ? false : v),
          }));
        }, GRID_FADE);
        cleanup.push({ type: 'to', id: tid });
      };

      const t0 = setTimeout(() => {
        advance();
        const iid = setInterval(advance, GRID_CYCLE);
        cleanup.push({ type: 'iv', id: iid });
      }, stagger);
      cleanup.push({ type: 'to', id: t0 });
    }

    return () => cleanup.forEach(({ type, id }) =>
      type === 'to' ? clearTimeout(id) : clearInterval(id)
    );
  }, [n]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '56fr 44fr',
      gridTemplateRows: '270px 270px',
      gap: 8,
    }}>
      {CELL_LAYOUT.map((l, i) => {
        const curr    = photos[state.curr[i]];
        const next    = photos[state.next[i]];
        const fading  = state.fading[i];
        return (
          <div key={i} style={{
            gridColumn: l.col, gridRow: l.row,
            borderRadius: 12, overflow: 'hidden',
            position: 'relative', background: '#C8D7D4',
          }}>
            {/* foto saindo */}
            <img src={curr.src} alt={curr.alt} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: l.objPos,
              opacity: fading ? 0 : 1,
              transition: `opacity ${GRID_FADE}ms ease-in-out`,
              zIndex: 1,
            }} />
            {/* foto entrando */}
            <img src={next.src} alt={next.alt} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: l.objPos,
              opacity: fading ? 1 : 0,
              transition: `opacity ${GRID_FADE}ms ease-in-out`,
              zIndex: 2,
            }} />

            {l.label && (
              <div style={{
                position: 'absolute', top: 12, left: 12, zIndex: 5,
                fontFamily: 'JetBrains Mono', fontSize: 9, fontWeight: 500,
                color: 'rgba(236,239,243,0.80)', letterSpacing: '0.16em',
                textTransform: 'uppercase', background: 'rgba(1,40,36,0.60)',
                padding: '4px 10px', borderRadius: 4, backdropFilter: 'blur(8px)',
              }}>{l.label}</div>
            )}

            {l.caption && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
                background: 'linear-gradient(to top, rgba(1,40,36,0.78) 0%, transparent 100%)',
                padding: '40px 16px 16px',
              }}>
                <p style={{ fontSize: 12, fontWeight: 300, color: 'rgba(236,239,243,0.88)', margin: 0, lineHeight: 1.3 }}>
                  {fading ? next.caption : curr.caption}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SobrePage() {
  const timeline = [
    { y: '1995', t: 'BPO Bancário',          d: 'A SBK nasce em São Paulo focada em armazenagem de cheques e documentos para grandes instituições financeiras.' },
    { y: '2003', t: 'Primeiro grande banco',  d: 'Início da operação com um dos cinco maiores bancos do país, consolidando a presença no mercado financeiro.' },
    { y: '2010', t: 'BPO Jurídico',           d: 'Especialização em operações jurídicas com cobertura nacional — 27 estados e todos os TJs do Brasil.' },
    { y: '2015', t: 'Expansão Tecnológica',   d: 'Lançamento das primeiras plataformas digitais proprietárias, digitalizando a esteira operacional.' },
    { y: '2020', t: 'Captura 2.0',            d: 'Nova geração de robôs proprietários com varredura diária de todos os tribunais e DJEs do país.' },
    { y: '2021+', t: 'IA & Desburocratização', d: 'Foco crescente em inteligência artificial para eliminar etapas manuais e acelerar operações jurídicas.' },
    { y: '2024', t: 'Lançamento da SBK IA',   d: 'A inteligência operacional vira produto de autosserviço para o mercado mid-market.' },
    { y: '2026', t: '30 anos · Nova SBK',        d: 'A empresa se reinventa: 100% digital, com foco total em desburocratizar a vida do cliente e entregar inteligência operacional em escala.' },
  ];
  return (
    <PageTransition>
      <>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="sbk-surface-deep" style={{ position: 'relative', overflow: 'hidden', paddingTop: 148, paddingBottom: 80 }}>
          <div className="sbk-grid-pattern" style={{ opacity: 0.04 }} />
          <div aria-hidden style={{
            position: 'absolute', top: -120, right: -80, width: 560, height: 560,
            background: 'radial-gradient(circle, rgba(42,124,121,0.16) 0%, transparent 65%)',
            filter: 'blur(70px)', pointerEvents: 'none'
          }} />
          <div className="sbk-container" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <Reveal direction="up" delay={0}>
                <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 200 }}>
                  <span>Sobre · 30 anos</span>
                </div>
                <h1 className="h-display" style={{
                  fontSize: 'clamp(42px, 5.2vw, 76px)', color: '#ECEFF3',
                  margin: '28px 0 24px', lineHeight: 1.02,
                }}>
                  Trinta anos operando<br/>a esteira jurídica de<br/>
                  <span className="h-italic" style={{ color: '#5C9094' }}>quem não pode falhar.</span>
                </h1>
                <p style={{
                  fontSize: 18, fontWeight: 300, lineHeight: 1.65,
                  color: '#8FA5A1', maxWidth: 460, margin: 0,
                }}>
                  Nascemos em 1996 cuidando de cadastro processual para uma carteira financeira.
                  Hoje operamos a esteira completa dos maiores bancos do Brasil.
                </p>
              </Reveal>
              <Reveal direction="right" delay={160} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: 'rgba(236,239,243,0.04)',
                  border: '1px solid rgba(236,239,243,0.10)',
                  borderRadius: 16, padding: '28px 24px', width: '100%', maxWidth: 380,
                }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 500,
                    color: '#5C9094', letterSpacing: '0.18em', textTransform: 'uppercase',
                    marginBottom: 20,
                  }}>marcos · 1995 → 2026</div>
                  <StaggerReveal
                    items={timeline}
                    stagger={50}
                    baseDelay={200}
                    renderItem={(m) => (
                      <div style={{
                        display: 'flex', alignItems: 'baseline', gap: 16,
                        padding: '10px 0',
                        borderTop: '1px solid rgba(236,239,243,0.07)',
                      }}>
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 500, color: '#5C9094', flexShrink: 0, width: 36 }}>{m.y}</span>
                        <span style={{ fontSize: 13, fontWeight: 300, color: '#C8D7D4', lineHeight: 1.4 }}>{m.t}</span>
                      </div>
                    )}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Timeline + Fotos ─────────────────────────────────── */}
        <section className="sbk-surface-light sec-pad-lg">
          <div className="sbk-container">
            <Reveal direction="up">
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 240 }}>
                <span>Linha do tempo</span>
              </div>
              <h2 className="h-large" style={{
                fontSize: 'clamp(32px, 3.6vw, 48px)', color: '#012824',
                margin: '24px 0 64px', maxWidth: 720,
              }}>Marcos da operação.</h2>
            </Reveal>

            {/* grade: timeline (esq) + fotos (dir) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'start' }}>

              {/* ── Coluna esquerda: timeline ── */}
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 72, top: 0, bottom: 0, width: 1, background: '#DCE0E6' }} />
                <StaggerReveal
                  items={timeline}
                  stagger={80}
                  baseDelay={0}
                  renderItem={(m) => (
                    <div style={{
                      display: 'grid', gridTemplateColumns: '72px 1fr',
                      padding: '20px 0', alignItems: 'flex-start', position: 'relative',
                    }}>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 500, color: '#075056', paddingTop: 4 }}>{m.y}</div>
                      <div style={{
                        position: 'absolute', left: 67, top: 26,
                        width: 11, height: 11, borderRadius: '50%',
                        background: '#075056', border: '2px solid #ECEFF3',
                      }} />
                      <div style={{ paddingLeft: 28 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 600, color: '#012824', letterSpacing: '-0.02em', margin: '0 0 6px' }}>{m.t}</h3>
                        <p style={{ fontSize: 15, fontWeight: 300, color: '#4A545E', lineHeight: 1.55, margin: 0 }}>{m.d}</p>
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* ── Coluna direita: grid animado ── */}
              <Reveal direction="right" delay={120}>
                <PhotoGrid photos={SOBRE_PHOTOS} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Números ──────────────────────────────────────────── */}
        <section className="sbk-surface-dark sec-pad-md" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="sbk-grid-pattern" />
          <div className="sbk-container" style={{ position: 'relative' }}>
            <Reveal direction="up">
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 300 }}>
                <span>Números consolidados</span>
              </div>
            </Reveal>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
              marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(236,239,243,0.14)',
            }}>
              {[
                ['1.4 bi', 'movimentações no histórico'],
                ['150K+', 'processos capturados/ano'],
                ['80+', 'instituições atendidas'],
                ['320', 'profissionais na operação'],
              ].map(([v, l], i) => (
                <Reveal key={i} delay={i * 80} direction="up">
                  <div style={{
                    borderLeft: i ? '1px solid rgba(236,239,243,0.14)' : 'none',
                    paddingLeft: i ? 32 : 0, paddingRight: 16,
                  }}>
                    <CountUp value={v} duration={1400} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#ECEFF3', fontSize: 64, marginBottom: 12 }} label={l} labelStyle={{ fontSize: 14, fontWeight: 300, color: '#8FA5A1' }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </>
    </PageTransition>
  );
}

window.SobrePage = SobrePage;
