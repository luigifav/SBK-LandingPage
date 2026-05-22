/* global React, Link, navigate, RadialEcosystemMap, ECOSYSTEM_MODULES, Reveal, StaggerReveal, CountUp, PageTransition, ProductMockup */

function LiveOpsConsole() {
  const PLATFORMS = [
    { id: 'monitor', name: 'SBK · Monitor', accent: '#5C9094', label: 'Monitorados hoje', base: 1487 },
    { id: 'captura', name: 'SBK · Captura', accent: '#C97444', label: 'Capturados 24h',   base: 3142 },
    { id: 'triagem', name: 'SBK · Subsidios', accent: '#075056', label: 'Em tratativa',     base: 2014 },
    { id: 'laudos',  name: 'SBK · Laudos',  accent: '#7A6840', label: 'Gerados hoje',     base: 1523 },
    { id: 'oficios', name: 'SBK · Ofícios', accent: '#A8323F', label: 'Respondidos',      base: 168  },
  ];
  const [now, setNow] = React.useState(new Date());
  const [tick, setTick] = React.useState(0);
  const [pulseIdx, setPulseIdx] = React.useState(0);
  React.useEffect(() => {
    const a = setInterval(() => setNow(new Date()), 1000);
    const b = setInterval(() => setTick(t => t + 1), 3500);
    const c = setInterval(() => setPulseIdx(p => (p + 1) % PLATFORMS.length), 2200);
    return () => { clearInterval(a); clearInterval(b); clearInterval(c); };
  }, []);
  const fmtTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const fmtDate = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');

  return (
    <div style={{
      background: 'linear-gradient(155deg, rgba(2,40,36,0.6) 0%, rgba(1,28,26,0.85) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(92,144,148,0.22)',
      borderRadius: 14,
      padding: '22px 24px 18px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 30px 80px -20px rgba(0,0,0,0.45), 0 0 0 1px rgba(92,144,148,0.06) inset',
    }}>
      {/* corner accents */}
      {[
        { t: 0, l: 0, b: 'auto', r: 'auto', rot: 0 },
        { t: 0, l: 'auto', b: 'auto', r: 0, rot: 90 },
        { t: 'auto', l: 0, b: 0, r: 'auto', rot: 270 },
        { t: 'auto', l: 'auto', b: 0, r: 0, rot: 180 },
      ].map((c, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" style={{
          position: 'absolute', top: c.t, left: c.l, bottom: c.b, right: c.r,
          transform: `rotate(${c.rot}deg)`, opacity: 0.55,
        }}>
          <path d="M0,4 L0,0 L4,0" stroke="#5C9094" strokeWidth="1" fill="none" />
        </svg>
      ))}

      {/* header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 18, paddingBottom: 14,
        borderBottom: '1px solid rgba(92,144,148,0.18)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#28C840',
            boxShadow: '0 0 0 3px rgba(40,200,64,0.18)',
            animation: 'liveops-pulse 1.6s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 500,
            color: '#7A9FA3', letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>Operação ao vivo</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#5C9094',
            letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>{fmtDate}</span>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#ECEFF3',
            fontVariantNumeric: 'tabular-nums',
          }}>{fmtTime}</span>
        </div>
      </div>

      {/* rows */}
      {PLATFORMS.map((p, i) => {
        // small dynamic increments for each platform
        const drift = [tick * 1, tick * 3, -Math.floor(tick / 2), tick % 2, -(tick % 2)][i];
        const value = Math.max(0, p.base + drift);
        const pulsing = i === pulseIdx;
        return (
          <div key={p.id} style={{
            display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 12,
            alignItems: 'center', padding: '13px 0',
            borderBottom: i < PLATFORMS.length - 1 ? '1px solid rgba(92,144,148,0.09)' : 'none',
            transition: 'background 300ms ease',
            background: pulsing ? 'linear-gradient(to right, rgba(92,144,148,0.06), transparent 70%)' : 'transparent',
            marginLeft: -8, marginRight: -8, paddingLeft: 8, paddingRight: 8,
            borderRadius: pulsing ? 4 : 0,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: p.accent,
              boxShadow: pulsing ? `0 0 0 4px ${p.accent}33` : `0 0 0 3px ${p.accent}1a`,
              transition: 'box-shadow 400ms ease',
            }} />
            <div>
              <div style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 500,
                color: '#ECEFF3',
              }}>{p.name}</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5,
                color: '#7A9FA3', letterSpacing: '0.14em', textTransform: 'uppercase',
                marginTop: 2,
              }}>{p.label}</div>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 600,
                color: '#ECEFF3', letterSpacing: '-0.02em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>{value.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        );
      })}

      {/* footer */}
      <div style={{
        marginTop: 14, paddingTop: 14,
        borderTop: '1px solid rgba(92,144,148,0.18)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5,
          color: '#7A9FA3', letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>5 plataformas · 23 operadores</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5,
          color: '#5BC07A', letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#5BC07A' }} />
          100% SLA
        </span>
      </div>

      <style>{`
        @keyframes liveops-pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
      `}</style>
    </div>
  );
}

function HomeHero() {
  return (
    <>
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '100vh',
        paddingTop: 160, paddingBottom: 96,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        /* Layered background: deep base + diagonal gradient wash */
        background: `
          radial-gradient(ellipse 80% 60% at 70% 40%, rgba(7,80,86,0.55) 0%, transparent 60%),
          radial-gradient(ellipse 55% 70% at -10% 80%, rgba(2,40,36,0.7) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 100% 0%, rgba(42,124,121,0.22) 0%, transparent 50%),
          linear-gradient(155deg, #011C1A 0%, #012824 45%, #023631 100%)
        `
      }}>
        {/* Noise grain overlay — textura orgânica */}
        <svg aria-hidden style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          opacity: 0.032, pointerEvents: 'none', mixBlendMode: 'overlay'
        }}>
          <filter id="sbk-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sbk-noise)" />
        </svg>

        {/* Grid pattern sutil */}
        <div className="sbk-grid-pattern" style={{ opacity: 0.035 }} />

        {/* Forma orgânica grande — canto inferior direito */}
        <svg aria-hidden viewBox="0 0 900 900" style={{
          position: 'absolute', right: '-12%', bottom: '-18%',
          width: 'clamp(480px, 58vw, 860px)', height: 'auto',
          opacity: 0.055, pointerEvents: 'none',
          transform: 'rotate(-12deg)'
        }}>
          <path d="M420,80 C580,40 820,120 860,300 C900,480 780,700 600,800 C420,900 140,840 60,640 C-20,440 100,200 260,120 C340,80 380,100 420,80 Z"
          fill="none" stroke="#5C9094" strokeWidth="1.5" />
          <path d="M440,140 C580,108 780,180 820,340 C860,500 750,680 590,770 C430,860 180,806 106,622 C32,438 138,218 288,146 C360,112 400,160 440,140 Z"
          fill="rgba(92,144,148,0.06)" stroke="none" />
        </svg>

        {/* Forma orgânica menor — canto superior esquerdo */}
        <svg aria-hidden viewBox="0 0 400 400" style={{
          position: 'absolute', left: '-8%', top: '-10%',
          width: 'clamp(200px, 28vw, 420px)', height: 'auto',
          opacity: 0.04, pointerEvents: 'none',
          transform: 'rotate(20deg)'
        }}>
          <path d="M200,40 C290,20 370,80 390,180 C410,280 360,370 260,390 C160,410 60,360 30,260 C0,160 60,60 160,40 C190,34 200,42 200,40 Z"
          fill="none" stroke="#2A7C79" strokeWidth="1.2" />
        </svg>

        {/* Linha diagonal de profundidade */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(115deg, transparent 40%, rgba(7,80,86,0.12) 60%, transparent 70%)'
        }} />

        <div className="sbk-container" style={{ position: 'relative' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
            gap: 'clamp(40px, 5vw, 88px)',
            alignItems: 'center',
          }}>
            <div>
              {/* Badge */}
              <div className="fade-up" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 14px',
                background: 'rgba(92,144,148,0.10)',
                border: '1px solid rgba(92,144,148,0.20)',
                borderRadius: 999, marginBottom: 40,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#7A9FA3'
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: '#5C9094'
                }} />
                30 anos · Legal Operations
              </div>

              {/* Headline */}
              <h1 className="h-display fade-up d1" style={{
                fontSize: 'clamp(40px, 4.8vw, 72px)',
                lineHeight: 1.02,
                color: '#ECEFF3',
                maxWidth: 720, margin: '0 0 28px'
              }}>
                Legal Operations<br />
                sob medida para<br />
                <span style={{ color: '#5C9094' }} className="h-italic">grandes instituições.</span>
              </h1>

              {/* Lead */}
              <p className="fade-up d2" style={{
                fontSize: 18, fontWeight: 300, lineHeight: 1.65,
                color: '#8FA5A1', maxWidth: 520, margin: '0 0 44px'
              }}>Operamos a esteira jurídica completa de grandes empresas com tecnologia proprietária — da pré-captura ao monitoramento, da geração de laudos à jurimetria.</p>

              {/* CTAs */}
              <div className="fade-up d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
                <Link to="/ecossistema" className="btn btn-primary arrow-r">
                  Conheça o ecossistema
                </Link>
                <Link to="/sbk-ia" className="btn btn-ghost arrow-r">
                  SBK IA
                </Link>
              </div>

              {/* Scroll cue */}
              <a href="#plataformas" className="fade-up d4 scroll-cue" style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#7A9FA3',
                textDecoration: 'none',
              }}>
                <span style={{
                  width: 36, height: 1, background: 'rgba(122,159,163,0.5)',
                }} />
                Ver as plataformas em operação
                <span className="scroll-cue-arrow" style={{
                  fontSize: 14, color: '#5C9094',
                }}>↓</span>
              </a>
            </div>

            {/* Right: live operations console */}
            <div className="fade-up d3">
              <LiveOpsConsole />
            </div>
          </div>
        </div>

        {/* Fade para a faixa de métricas abaixo */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to bottom, transparent, #011C1A)',
          pointerEvents: 'none'
        }} />
      </section>

      {/* Faixa de métricas separada — respira fora da hero */}
      <div style={{
        background: '#011C1A',
        borderTop: '1px solid rgba(236,239,243,0.07)',
        borderBottom: '1px solid rgba(236,239,243,0.07)'
      }}>
        <div className="sbk-container" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, padding: '40px 32px'
        }}>
          {[
          ['+30', 'anos de operação'],
          ['9', 'módulos no ecossistema'],
          ['100%', 'tribunais monitorados'],
          ['370K+', 'processos capturados/ano']].
          map(([v, l], i) =>
          <Reveal key={i} delay={i * 80} direction="up">
              <div style={{
              borderLeft: i ? '1px solid rgba(236,239,243,0.09)' : 'none',
              paddingLeft: i ? 32 : 0, paddingRight: 16
            }}>
                <CountUp
                value={v}
                duration={1200}
                style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#ECEFF3', fontSize: 44, marginBottom: 6 }}
                label={l}
                labelStyle={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1', letterSpacing: '0.01em' }} />
              
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </>);

}

function HomeProblem() {
  return (
    <section className="sbk-surface-light sec-pad-lg">
      <div className="sbk-container">
        {/* Animated product mockup */}
        <Reveal direction="up" delay={120}>
          <div id="plataformas" style={{ scrollMarginTop: 80 }}>
            <div style={{ marginBottom: 28 }}>
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 280, marginBottom: 16 }}>
                <span>Plataformas em ação</span>
              </div>
              <h3 className="h-large" style={{
                fontSize: 'clamp(24px, 2.4vw, 32px)',
                color: '#012824', margin: 0, maxWidth: 720, lineHeight: 1.15,
                letterSpacing: '-0.01em'
              }}>
                Cinco plataformas <span className="h-italic" style={{ color: '#075056' }}>independentes,</span>
                uma única operação.
              </h3>
            </div>
            <ProductMockup />
          </div>
        </Reveal>

        {/* Proof points — the platforms in numbers */}
        <div style={{
          marginTop: 80,
          paddingTop: 40,
          borderTop: '1px solid #DCE0E6'
        }}>
          <Reveal direction="up" delay={0}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 96,
              alignItems: 'start', marginBottom: 40
            }}>
              <div>
                <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 280 }}>
                  <span>A operação em números</span>
                </div>
              </div>
              <div>
                <h3 className="h-large" style={{
                  fontSize: 'clamp(22px, 2.2vw, 30px)',
                  color: '#012824', margin: 0, maxWidth: 720, lineHeight: 1.2,
                  letterSpacing: '-0.01em'
                }}>
                  O que essas plataformas <span className="h-italic" style={{ color: '#075056' }}>entregam</span>,
                  todos os dias, em escala industrial.
                </h3>
              </div>
            </div>
          </Reveal>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24
          }}>
            {[
            { v: '0', l: 'prazos perdidos em monitoramento de processos críticos' },
            { v: '+3.000', l: 'novos processos capturados por dia, em média, nas varreduras' },
            { v: '−68%', l: 'no tempo médio de produção de laudos jurídicos com SBK IA' },
            { v: '98%', l: 'de SLA cumprido na resposta a ofícios judiciais e bancários' }].
            map((m, i) =>
            <Reveal key={i} delay={80 + i * 80} direction="up">
                <div style={{ borderTop: '1px solid #DCE0E6', paddingTop: 20 }}>
                  <CountUp
                  value={m.v}
                  duration={1000}
                  style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#012824', fontSize: 44 }}
                  label={m.l}
                  labelStyle={{ marginTop: 10, fontSize: 13, fontWeight: 300, color: '#4A545E', lineHeight: 1.5 }} />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>);
}

function HomeEcosystem() {
  return (
    <section className="sbk-surface-dark sec-pad-lg" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="sbk-grid-pattern" />
      <div className="sbk-container" style={{ position: 'relative' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
          alignItems: 'center'
        }}>
          <div>
            <Reveal direction="up" delay={0}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(236,239,243,0.55)',
                lineHeight: 1.45, marginBottom: 28
              }}>
                O<br />Ecossistema
              </div>
              <h2 className="h-large" style={{
                fontSize: 'clamp(36px, 4.6vw, 64px)',
                color: '#ECEFF3', margin: '0 0 28px',
                letterSpacing: '-0.015em', lineHeight: 1.04
              }}>
                Um sistema modular<br />
                que cobre a esteira<br />
                jurídica completa.
              </h2>
              <p style={{
                fontSize: 17, fontWeight: 300, lineHeight: 1.6,
                color: '#C8D7D4', maxWidth: 480, margin: '0 0 32px'
              }}>
                Nove módulos independentes que se combinam conforme a necessidade da operação.
                No núcleo, o <strong style={{ color: '#ECEFF3', fontWeight: 600 }}>SBK Analytics</strong> retroalimenta o sistema com inteligência de dados —
                transformando operação em vantagem competitiva.
              </p>
            </Reveal>
            <StaggerReveal
              items={[
              ['Captura → Cadastro → Monitoramento', 'O fluxo de processos judiciais'],
              ['Pré-judicial → Ofícios → Subsídios', 'A operação de resposta e laudos'],
              ['Firmas → Obrigações → Analytics', 'Controle societário e inteligência']]
              }
              stagger={80}
              baseDelay={200}
              style={{ marginBottom: 36 }}
              renderItem={([flow, label], i) =>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 4,
                padding: '12px 0',
                borderTop: i === 0 ? '1px solid rgba(236,239,243,0.12)' : 'none',
                borderBottom: '1px solid rgba(236,239,243,0.12)'
              }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 500, color: '#ECEFF3' }}>{flow}</div>
                  <div style={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1' }}>{label}</div>
                </div>
              } />
            
            <Reveal delay={440}>
              <Link to="/ecossistema" className="btn btn-primary arrow-r">
                Explorar o ecossistema
              </Link>
            </Reveal>
          </div>
          <Reveal direction="right" delay={160} style={{ display: 'flex', justifyContent: 'center' }}>
            <RadialEcosystemMap size={560} tone="dark" />
          </Reveal>
        </div>
      </div>
    </section>);
}

function HomeDualPath() {
  return (
    <>
      {/* SBK side — deep, premium */}
      <section className="sbk-surface-deep" style={{
        position: 'relative', overflow: 'hidden',
        paddingTop: 96, paddingBottom: 96, minHeight: 620
      }}>
        {/* Photo — covers right ~65% */}
        <img
          src="assets/white-glove.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, right: 0,
            width: '68%', height: '100%',
            objectFit: 'cover', objectPosition: '30% center',
            display: 'block', pointerEvents: 'none'
          }} />
        
        {/* Gradient overlay: solid dark left → transparent right */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #012824 36%, rgba(1,40,36,0.6) 44%, transparent 52%)',
          pointerEvents: 'none'
        }} />
        <div className="sbk-grid-pattern" style={{ opacity: 0.05 }} />

        {/* Content — stacked on left */}
        <div className="sbk-container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 560 }}>
            <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 320, marginBottom: 24 }}>
              <span>Caminho 01 / SBK</span>
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 400,
              color: '#8FA5A1', lineHeight: 1.6, marginBottom: 48
            }}>
              Para grandes instituições<br />
              financeiras que exigem<br />
              profundidade operacional.
            </div>
            <h2 className="h-large" style={{
              fontSize: 'clamp(40px, 5.2vw, 76px)',
              color: '#ECEFF3', margin: '0 0 28px'
            }}>
              Serviço dedicado.<br />
              <span style={{ color: '#5C9094' }} className="h-italic">White-glove,</span><br />
              high-touch, sob medida.
            </h2>
            <p style={{
              fontSize: 17, fontWeight: 300, lineHeight: 1.65,
              color: '#C8D7D4', margin: '0 0 36px'
            }}>
              Assumimos a esteira jurídica da sua instituição. Nosso time opera com tecnologia proprietária e conhecimento profundo de processos, resolvendo a complexidade operacional para que seu jurídico foque no estratégico.
            </p>
            <ul style={{
              listStyle: 'none', padding: 0, margin: '0 0 40px',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14
            }}>
              {['Operação 24/7 com SLA contratual', 'Time dedicado por conta'].map((b, i) =>
              <li key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                fontSize: 14, fontWeight: 300, color: '#ECEFF3', lineHeight: 1.5
              }}>
                  <span style={{
                  flexShrink: 0, marginTop: 6,
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#5C9094'
                }} />
                  {b}
                </li>
              )}
            </ul>
            <Link to="/contato" className="btn btn-primary arrow-r">
              Fale com nosso time
            </Link>
          </div>
        </div>
      </section>

      {/* SBK IA side — lighter, dynamic */}
      <section className="sbk-ia" style={{
        background: '#ECEFF3', position: 'relative', overflow: 'hidden',
        paddingTop: 128, paddingBottom: 128
      }}>
        {/* subtle cyan glow */}
        <div aria-hidden style={{
          position: 'absolute', top: -200, left: -200,
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(42,124,121,0.18) 0%, transparent 65%)',
          filter: 'blur(40px)', pointerEvents: 'none'
        }} />
        <div className="sbk-container" style={{ position: 'relative' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80,
            alignItems: 'start'
          }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#075056'
              }}>
                <span style={{ width: 24, height: 1, background: '#075056', opacity: 0.6 }} />
                Caminho 02 / SBK IA
              </div>
              <div style={{
                marginTop: 32,
                fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 400,
                color: '#4A545E', lineHeight: 1.6
              }}>
                Para empresas que querem<br />
                a mesma inteligência<br />
                em poucos cliques.
              </div>
            </div>
            <div>
              <h2 className="h-large" style={{
                fontSize: 'clamp(40px, 5.2vw, 76px)',
                color: '#012824', margin: '0 0 32px'
              }}>
                Autosserviço<br />
                <span style={{ color: '#075056' }} className="h-italic">inteligente.</span><br />
                Acesso direto. Velocidade.
              </h2>
              <p style={{
                fontSize: 18, fontWeight: 300, lineHeight: 1.6,
                color: '#4A545E', maxWidth: 580, margin: '0 0 40px'
              }}>
                Empacotamos 30 anos de inteligência operacional em produtos de autosserviço.
                A mesma precisão que grandes bancos têm, agora disponível para empresas que
                querem autonomia, agilidade e baixo atrito de implantação.
              </p>
              <ul style={{
                listStyle: 'none', padding: 0, margin: '0 0 40px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
                maxWidth: 580
              }}>
                {[
                'Onboarding em poucos cliques',
                'Sem fidelização ou recorrência',
                'Compliance LGPD · ISO 27001',
                'Pague só pelo que usar'].
                map((b, i) =>
                <li key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  fontSize: 14, fontWeight: 300, color: '#012824',
                  lineHeight: 1.5
                }}>
                    <span style={{
                    flexShrink: 0, marginTop: 6,
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#2A7C79'
                  }} />
                    {b}
                  </li>
                )}
              </ul>
              <Link to="/sbk-ia" className="btn btn-ia arrow-r">
                Comece agora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>);

}

function HomeClientCarousel() {
  // Logos com imagem real; os demais ficam como texto
  const clients = [
  { name: 'Bradesco', img: 'assets/logos/final-bradesco.png' },
  { name: 'Agibank', img: 'assets/logos/final-agibank.png' },
  { name: 'Eagle', img: 'assets/logos/final-eagle.png' },
  { name: 'Zurich', img: 'assets/logos/final-zurich.png' }];

  const doubled = [...clients, ...clients, ...clients, ...clients];

  React.useEffect(() => {
    if (!document.getElementById('client-carousel-keyframes')) {
      const style = document.createElement('style');
      style.id = 'client-carousel-keyframes';
      style.textContent = `
        @keyframes sbk-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .sbk-marquee-track {
          animation: sbk-marquee 36s linear infinite;
        }
        .sbk-marquee-wrap:hover .sbk-marquee-track {
          animation-play-state: paused;
        }
        .sbk-logo-item img {
          mix-blend-mode: normal;
          filter: grayscale(100%) brightness(10);
          opacity: 0.30;
          transition: filter 0.35s ease, opacity 0.35s ease;
          width: 360px;
          height: 52px;
          object-fit: contain;
          display: block;
        }
        .sbk-logo-item:hover img {
          filter: none;
          opacity: 1;
          mix-blend-mode: normal;
        }
        .sbk-logo-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(236,239,243,0.28);
          white-space: nowrap;
          transition: color 0.35s ease;
          width: 360px;
          text-align: center;
        }
        .sbk-logo-item:hover .sbk-logo-text {
          color: rgba(236,239,243,0.85);
        }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById('client-carousel-keyframes');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="sbk-marquee-wrap" style={{
      background: '#011C1A',
      borderTop: '1px solid rgba(236,239,243,0.06)',
      borderBottom: '1px solid rgba(236,239,243,0.06)',
      padding: '32px 0',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* fade masks */}
      <div aria-hidden style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 140, zIndex: 2,
        background: 'linear-gradient(to right, #011C1A 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 140, zIndex: 2,
        background: 'linear-gradient(to left, #011C1A 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />

      <div className="sbk-marquee-track" style={{
        display: 'flex', alignItems: 'center',
        width: 'max-content'
      }}>
        {doubled.map((c, i) =>
        <div key={i} className="sbk-logo-item" style={{
          display: 'flex', alignItems: 'center', cursor: 'default'
        }}>
            <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 360, height: 60 }}>
              {c.img ?
            <img src={c.img} alt={c.name} /> :
            <span className="sbk-logo-text">{c.name}</span>
            }
            </div>
            <span aria-hidden style={{
            width: 3, height: 3, borderRadius: '50%',
            background: 'rgba(92,144,148,0.35)',
            flexShrink: 0
          }} />
          </div>
        )}
      </div>
    </div>);

}

function HomeCases() {
  const cases = [
  {
    tag: 'Banco · Top 5',
    title: 'Redução de 70% no tempo de captura processual',
    body: 'Implantamos pré-captura inteligente em todos os estados antes da citação chegar.',
    metric: '88%',
    metricLabel: 'redução de tempo'
  },
  {
    tag: 'Financeira · Crédito',
    title: 'SLA de 30 minutos para resposta de ofícios',
    body: 'Substituímos um time de 14 pessoas por operação SBK + módulo de Ofícios.',
    metric: '30min',
    metricLabel: 'SLA contratual'
  },
  {
    tag: 'Seguradora',
    title: '100% de cobertura em monitoramento de tribunais',
    body: 'Migração completa do sistema legado em 90 dias, sem perda de prazo.',
    metric: '100%',
    metricLabel: 'tribunais cobertos'
  }];

  return (
    <section className="sbk-surface-light sec-pad-lg" style={{ paddingBottom: 0 }}>
      <div className="sbk-container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 56, gap: 32, flexWrap: 'wrap'
        }}>
          <Reveal direction="up">
            <div>
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 240 }}>
                <span>Resultados</span>
              </div>
              <h2 className="h-large" style={{
                fontSize: 'clamp(36px, 4vw, 56px)', margin: '24px 0 0',
                color: '#012824', maxWidth: 720
              }}>
                Números que comprovam<br />a operação.
              </h2>
            </div>
          </Reveal>
          <Reveal direction="up" delay={120}>
            <Link to="/resultados" className="btn btn-outline-dark arrow-r">
              Todos os cases
            </Link>
          </Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {cases.map((c, i) =>
          <Reveal key={i} delay={i * 100} direction="up">
              <article className="surf-card" style={{
              padding: 32, display: 'flex', flexDirection: 'column',
              minHeight: 320, cursor: 'pointer'
            }}>
                <div className="sbk-eyebrow" style={{ color: '#075056' }}>{c.tag}</div>
                <h3 style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 600,
                color: '#012824', letterSpacing: '-0.02em', lineHeight: 1.25,
                margin: '20px 0 16px'
              }}>{c.title}</h3>
                <p style={{
                fontSize: 14, fontWeight: 300, color: '#4A545E', lineHeight: 1.6,
                margin: 0
              }}>{c.body}</p>
                <div style={{ flex: 1 }} />
                <div style={{
                marginTop: 32, paddingTop: 24,
                borderTop: '1px solid #DCE0E6',
                display: 'flex', alignItems: 'baseline', gap: 12
              }}>
                  <CountUp
                  value={c.metric}
                  duration={1000}
                  style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#012824', fontSize: 36 }} />
                
                  <span style={{ fontSize: 12, fontWeight: 300, color: '#4A545E' }}>
                    {c.metricLabel}
                  </span>
                </div>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>);
}

function HomeTestimonial() {
  return (
    <section className="sbk-surface-light" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="sbk-container">
        <Reveal direction="up">
          <div style={{
            borderTop: '1px solid #DCE0E6',
            padding: '80px 0',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 80,
            alignItems: 'center'
          }}>
            {/* Identidade */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '5px 12px',
                background: 'rgba(7,80,86,0.06)',
                border: '1px solid rgba(7,80,86,0.12)',
                borderRadius: 999,
                marginBottom: 28,
                fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#075056'
              }}>
                Parceiro desde mar. 2024
              </div>
              <div style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 600,
                color: '#012824', letterSpacing: '-0.01em', marginBottom: 4
              }}>Jonas Antunes</div>
              <div style={{ fontSize: 13, fontWeight: 300, color: '#4A545E', marginBottom: 2 }}>CEO · GSI Law</div>
              <div style={{
                marginTop: 20, paddingTop: 20,
                borderTop: '1px solid #DCE0E6',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#8FA5A1'
              }}>
                Produto utilizado
              </div>
              <Link to="/produto/firmas" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 8, fontSize: 13, fontWeight: 500, color: '#075056',
                textDecoration: 'none'
              }}>
                Firmas e Poderes
                <span style={{ fontSize: 10, opacity: 0.6 }}>→</span>
              </Link>
            </div>

            {/* Citação */}
            <div>
              <svg aria-hidden width="32" height="22" viewBox="0 0 32 22" fill="none" style={{ marginBottom: 24, display: 'block' }}>
                <path d="M0 22V13.2C0 9.6 0.9 6.6 2.7 4.2C4.5 1.8 7.1 0.4 10.5 0L11.8 2.4C9.8 2.9 8.2 3.9 7 5.4C5.8 6.9 5.2 8.6 5.2 10.5H9.8V22H0ZM18.2 22V13.2C18.2 9.6 19.1 6.6 20.9 4.2C22.7 1.8 25.3 0.4 28.7 0L30 2.4C28 2.9 26.4 3.9 25.2 5.4C24 6.9 23.4 8.6 23.4 10.5H28V22H18.2Z" fill="#DCE0E6" />
              </svg>
              <blockquote style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 400,
                color: '#012824', lineHeight: 1.45, letterSpacing: '-0.015em',
                margin: '0 0 28px',
                fontStyle: 'italic'
              }}>
                "O atendimento e a flexibilidade da SBK facilitam demais os desenvolvimentos dos nossos projetos de melhorias e desenvolvimento de novas funcionalidades na plataforma GSI."
              </blockquote>
              <p style={{
                fontSize: 14, fontWeight: 300, color: '#4A545E', lineHeight: 1.65,
                maxWidth: 660, margin: 0
              }}>
                A GSI Law contratou a SBK para agregar leitura e interpretação automatizadas de documentos societários à sua plataforma — poupando tempo dos usuários e inserindo IA na rotina de departamentos jurídico-contábeis.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}

function HomeFinalCTA() {
  return (
    <section className="sbk-surface-light" style={{
      position: 'relative',
      paddingTop: 48, paddingBottom: 48
    }}>
      <div className="sbk-container" style={{ position: 'relative' }}>
        <Reveal direction="up">
          {/* Card com fundo verde escuro */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: '#012824',
            borderRadius: 24,
            padding: 'clamp(48px, 7vw, 96px) clamp(32px, 6vw, 80px)',
            textAlign: 'center'
          }}>
            {/* Grid pattern dentro do card */}
            <div className="sbk-grid-pattern" style={{ borderRadius: 24 }} />
            {/* Glow radial */}
            <div aria-hidden style={{
              position: 'absolute', top: '50%', right: -200,
              width: 600, height: 600, transform: 'translateY(-50%)',
              background: 'radial-gradient(circle, rgba(42,124,121,0.26) 0%, transparent 60%)',
              filter: 'blur(60px)', pointerEvents: 'none'
            }} />
            <div style={{ position: 'relative' }}>
              <div className="rule-caption" style={{ justifyContent: 'center', maxWidth: 280, margin: '0 auto' }}>
                <span>Próximo passo</span>
              </div>
              <h2 className="h-display" style={{
                fontSize: 'clamp(40px, 5.5vw, 80px)',
                color: '#ECEFF3', margin: '32px auto 24px', maxWidth: 1000
              }}>
                Vamos conversar sobre a<br />
                esteira da sua operação?
              </h2>
              <p style={{
                fontSize: 18, fontWeight: 300, lineHeight: 1.55,
                color: '#C8D7D4', maxWidth: 560, margin: '0 auto 40px'
              }}>
                Em uma reunião de 30 minutos mapeamos seus pontos de fricção e mostramos
                quais módulos do ecossistema fariam mais sentido.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contato" className="btn btn-primary arrow-r">
                  Agendar conversa
                </Link>
                <Link to="/sbk-ia" className="btn btn-ghost arrow-r">
                  Quero o autosserviço
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);
}

function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeClientCarousel />
      <HomeProblem />
      <HomeEcosystem />
      <HomeDualPath />
      <HomeCases />
      <HomeTestimonial />
      <HomeFinalCTA />
    </>);

}

window.HomePage = HomePage;