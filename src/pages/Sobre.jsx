/* global React, Link, Reveal, StaggerReveal, CountUp, PageTransition */

function SobrePage() {
  const timeline = [
    { y: '1996', t: 'Fundação', d: 'A SBK nasce em São Paulo com foco em cadastro processual para o setor financeiro.' },
    { y: '2003', t: 'Primeiro grande banco', d: 'Início da operação com um dos cinco maiores bancos do país.' },
    { y: '2010', t: 'Cobertura nacional', d: 'Expansão da operação para 27 estados, cobrindo todos os TJs do Brasil.' },
    { y: '2015', t: 'Plataforma proprietária', d: 'Lançamento da primeira versão da esteira tecnológica que opera o ecossistema atual.' },
    { y: '2020', t: 'Captura 2.0 + MCP', d: 'Integração nativa via Model Context Protocol aos tribunais e DJEs.' },
    { y: '2024', t: 'Lançamento da SBK IA', d: 'A inteligência operacional vira produto de autosserviço para o mercado mid-market.' },
    { y: '2026', t: '30 anos', d: 'Mais de 1,4 bilhão de movimentações no histórico. O ecossistema cobre a esteira completa.' },
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
                  }}>marcos · 1996 → 2026</div>
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

        {/* ── Timeline ─────────────────────────────────────────── */}
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
            <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto' }}>
              <div style={{ position: 'absolute', left: 80, top: 0, bottom: 0, width: 1, background: '#DCE0E6' }} />
              <StaggerReveal
                items={timeline}
                stagger={80}
                baseDelay={0}
                renderItem={(m, i) => (
                  <div style={{
                    display: 'grid', gridTemplateColumns: '80px 1fr', gap: 48,
                    padding: '24px 0', alignItems: 'flex-start', position: 'relative',
                  }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 500, color: '#075056' }}>{m.y}</div>
                    <div style={{
                      position: 'absolute', left: 75, top: 30,
                      width: 11, height: 11, borderRadius: '50%',
                      background: '#075056', border: '2px solid #ECEFF3',
                    }} />
                    <div style={{ paddingLeft: 16 }}>
                      <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 600, color: '#012824', letterSpacing: '-0.02em', margin: '0 0 8px' }}>{m.t}</h3>
                      <p style={{ fontSize: 15, fontWeight: 300, color: '#4A545E', lineHeight: 1.55, margin: 0 }}>{m.d}</p>
                    </div>
                  </div>
                )}
              />
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
