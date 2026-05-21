/* global React, Link, navigate, RadialEcosystemMap, ECOSYSTEM_MODULES, ANALYTICS_MODULE, Reveal, StaggerReveal, CountUp, PageTransition */

function EcossistemaPage() {
  const [active, setActive] = React.useState(null);
  const all = [...ECOSYSTEM_MODULES, ANALYTICS_MODULE];
  return (
    <PageTransition>
      <section className="sbk-surface-deep" style={{
        position: 'relative', overflow: 'hidden', paddingTop: 148, paddingBottom: 80,
      }}>
        <div className="sbk-grid-pattern" style={{ opacity: 0.04 }} />
        <div aria-hidden style={{
          position: 'absolute', top: -120, right: -100,
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(42,124,121,0.16) 0%, transparent 65%)',
          filter: 'blur(70px)', pointerEvents: 'none'
        }} />
        <div className="sbk-container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <Reveal direction="up" delay={0}>
                <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 280 }}>
                  <span>Ecossistema · 9 módulos</span>
                </div>
                <h1 className="h-display" style={{
                  fontSize: 'clamp(42px, 5.2vw, 76px)', color: '#ECEFF3',
                  margin: '28px 0 24px', lineHeight: 1.02,
                }}>
                  A esteira jurídica completa,<br/>
                  <span className="h-italic" style={{ color: '#5C9094' }}>modular e conectada.</span>
                </h1>
                <p style={{
                  fontSize: 18, fontWeight: 300, lineHeight: 1.65,
                  color: '#8FA5A1', maxWidth: 480, margin: 0,
                }}>
                  Cada módulo resolve uma etapa. Combinados, cobrem a operação
                  jurídica inteira — com Analytics no núcleo retroalimentando tudo.
                </p>
              </Reveal>
            </div>
            <Reveal direction="right" delay={160} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                background: 'rgba(236,239,243,0.04)',
                border: '1px solid rgba(236,239,243,0.10)',
                borderRadius: 16, padding: '28px 24px', width: '100%', maxWidth: 420,
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 500,
                  color: '#5C9094', letterSpacing: '0.18em', textTransform: 'uppercase',
                  marginBottom: 20,
                }}>esteira · fluxo operacional</div>
                <StaggerReveal
                  items={[
                    { label: 'Captura', tag: 'SBK + IA', color: '#5C9094' },
                    { label: 'Cadastro', tag: 'SBK', color: '#8FA5A1' },
                    { label: 'Monitoramento', tag: 'SBK + IA', color: '#5C9094' },
                    { label: 'Pré-judicial', tag: 'SBK', color: '#8FA5A1' },
                    { label: 'Ofícios', tag: 'SBK', color: '#8FA5A1' },
                    { label: 'Subsídios e Laudos', tag: 'SBK', color: '#8FA5A1' },
                    { label: 'Firmas e Poderes', tag: 'SBK + IA', color: '#5C9094' },
                    { label: 'Analytics', tag: 'Núcleo', color: '#2A7C79' },
                  ]}
                  stagger={50}
                  baseDelay={200}
                  renderItem={(m) => (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 0',
                      borderTop: '1px solid rgba(236,239,243,0.07)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 400, color: '#C8D7D4' }}>{m.label}</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: m.color, opacity: 0.85 }}>{m.tag}</span>
                    </div>
                  )}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sbk-surface-dark" style={{ paddingTop: 0, paddingBottom: 96 }}>
        <div className="sbk-container">
          <div style={{
            display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64,
            alignItems: 'center',
          }}>
            <Reveal direction="up" delay={0} style={{ display: 'flex', justifyContent: 'center' }}>
              <RadialEcosystemMap size={560} tone="dark"
                onModuleClick={(id) => setActive(id)} />
            </Reveal>
            <div>
              <Reveal direction="up" delay={120}>
                <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 260 }}>
                  <span>{active ? 'Módulo selecionado' : 'Hover ou clique'}</span>
                </div>
              </Reveal>
              {active ? (() => {
                const mod = all.find(m => m.id === active);
                return (
                  <Reveal direction="up" delay={0}>
                    <div style={{ marginTop: 32 }}>
                      <h3 style={{
                        fontFamily: 'Plus Jakarta Sans', fontSize: 40, fontWeight: 600,
                        color: '#ECEFF3', letterSpacing: '-0.02em', margin: '0 0 16px',
                      }}>{mod.label}</h3>
                      <p style={{
                        fontSize: 17, fontWeight: 300, color: '#C8D7D4',
                        lineHeight: 1.6, margin: '0 0 24px', maxWidth: 460,
                      }}>{mod.desc}</p>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 28 }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
                          padding: '6px 12px', borderRadius: 999,
                          background: mod.tier === 'both' ? 'rgba(42,124,121,0.18)' : 'rgba(236,239,243,0.08)',
                          color: '#5C9094',
                          border: '1px solid rgba(140,175,169,0.3)',
                        }}>
                          {mod.tier === 'both' ? 'SBK + SBK IA' :
                           mod.tier === 'core' ? 'Núcleo' : 'SBK (dedicado)'}
                        </span>
                      </div>
                      {mod.id !== 'analytics' && (
                        <Link to={`/produto/${mod.id}`} className="btn btn-primary arrow-r">
                          Ver módulo
                        </Link>
                      )}
                    </div>
                  </Reveal>
                );
              })() : (
                <Reveal direction="up" delay={160}>
                  <div style={{ marginTop: 32 }}>
                    <h3 style={{
                      fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 600,
                      color: '#ECEFF3', letterSpacing: '-0.02em', margin: '0 0 20px',
                      maxWidth: 480,
                    }}>
                      Explore o sistema. Clique em um módulo para entender o que ele resolve.
                    </h3>
                    <StaggerReveal
                      items={[
                        ['●●', 'Disponível em SBK e SBK IA'],
                        ['●', 'Exclusivo do serviço SBK (dedicado)'],
                        ['◉', 'Núcleo — alimenta todos os módulos'],
                      ]}
                      stagger={60}
                      baseDelay={80}
                      style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}
                      renderItem={([icon, label]) => (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13, fontWeight: 300, color: '#C8D7D4' }}>
                          <span style={{ fontFamily: 'JetBrains Mono', color: '#5C9094', width: 32, fontSize: 14 }}>{icon}</span>
                          {label}
                        </div>
                      )}
                    />
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sbk-surface-light sec-pad-lg">
        <div className="sbk-container">
          <Reveal direction="up">
            <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 260 }}>
              <span>Lista completa</span>
            </div>
            <h2 className="h-large" style={{
              fontSize: 'clamp(36px, 4vw, 56px)', color: '#012824',
              margin: '24px 0 56px', maxWidth: 800,
            }}>
              Nove módulos, um único núcleo de inteligência.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {ECOSYSTEM_MODULES.map((m, i) => (
              <Reveal key={m.id} delay={i * 60} direction="up">
                <Link to={`/produto/${m.id}`}
                  className="surf-card" style={{
                    padding: 28, display: 'flex', flexDirection: 'column',
                    minHeight: 220, cursor: 'pointer', textDecoration: 'none',
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 500, color: '#4A545E' }}>0{i+1}</div>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: m.tier === 'both' ? '#075056' : '#4A545E' }}>{m.tier === 'both' ? 'SBK + IA' : 'SBK'}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 600, color: '#012824', letterSpacing: '-0.02em', margin: '0 0 12px' }}>{m.label}</h3>
                  <p style={{ fontSize: 14, fontWeight: 300, color: '#4A545E', lineHeight: 1.55, margin: 0 }}>{m.desc}</p>
                  <div style={{ flex: 1 }}/>
                  <div style={{ marginTop: 24, fontSize: 13, fontWeight: 600, color: '#075056' }} className="arrow-r">Ver detalhes</div>
                </Link>
              </Reveal>
            ))}
            <Reveal direction="up" delay={480} style={{ gridColumn: 'span 3' }}>
              <div className="sbk-card--brand" style={{
                padding: 32, display: 'flex', flexDirection: 'column',
                minHeight: 220, gridColumn: 'span 3',
                background: '#012824', color: '#ECEFF3', borderRadius: 14,
                marginTop: 16,
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
                  <div>
                    <div className="sbk-eyebrow" style={{ color: '#5C9094', marginBottom: 16 }}>Núcleo · Analytics</div>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 600, color: '#ECEFF3', letterSpacing: '-0.02em', margin: '0 0 16px' }}>O que conecta tudo.</h3>
                    <p style={{ fontSize: 15, fontWeight: 300, color: '#C8D7D4', lineHeight: 1.6, margin: 0 }}>
                      Toda movimentação, todo laudo, todo prazo gera dado. O Analytics
                      transforma esse dado em jurimetria — e devolve para os outros módulos
                      como antecipação, alertas e insights de risco.
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {[
                      ['100%', 'fluxos analisados'],
                      ['+200', 'indicadores ativos'],
                      ['1.4 bi', 'movimentações no histórico'],
                      ['Tempo real', 'no painel executivo'],
                    ].map(([v, l], i) => (
                      <div key={i} style={{ borderTop: '1px solid rgba(236,239,243,0.16)', paddingTop: 16 }}>
                        <CountUp value={v} duration={1200} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#ECEFF3', fontSize: 32 }} label={l} labelStyle={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1', marginTop: 6 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

window.EcossistemaPage = EcossistemaPage;
