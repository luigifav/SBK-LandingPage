/* global React, Link, navigate, RadialEcosystemMap, ECOSYSTEM_MODULES, Reveal, StaggerReveal, CountUp, PageTransition */

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
            fontSize: 'clamp(44px, 5.8vw, 84px)',
            lineHeight: 1.02,
            color: '#ECEFF3',
            maxWidth: 940, margin: '0 0 28px'
          }}>
            Legal Operations<br />
            sob medida para<br />
            <span style={{ color: '#5C9094' }} className="h-italic">grandes instituições.</span>
          </h1>

          {/* Lead */}
          <p className="fade-up d2" style={{
            fontSize: 18, fontWeight: 300, lineHeight: 1.65,
            color: '#8FA5A1', maxWidth: 560, margin: '0 0 44px'
          }}>Operamos a esteira jurídica completa de grandes empresas com tecnologia proprietária — da pré-captura ao monitoramento, da geração de laudos à jurimetria.



          </p>

          {/* CTAs */}
          <div className="fade-up d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/ecossistema" className="btn btn-primary arrow-r">
              Conheça o ecossistema
            </Link>
            <Link to="/sbk-ia" className="btn btn-ghost arrow-r">
              SBK IA
            </Link>
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
          ['30', 'anos de operação'],
          ['9', 'módulos no ecossistema'],
          ['99%', 'tribunais monitorados'],
          ['150K+', 'processos capturados/ano']].
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 96, alignItems: 'start' }}>
          <Reveal direction="up" delay={0}>
            <div className="rule-caption">O Problema</div>
            <div style={{
              marginTop: 24, fontSize: 13, fontWeight: 300,
              color: '#4A545E', lineHeight: 1.6
            }}>
              Áreas jurídicas de grandes empresas gastam a maior parte do tempo em
              operação, não em estratégia. O volume cresce, o time não acompanha,
              e o risco operacional aumenta.
            </div>
          </Reveal>
          <div>
            <Reveal direction="up" delay={80}>
              <h2 className="h-large" style={{
                fontSize: 'clamp(36px, 4.4vw, 60px)',
                color: '#012824', margin: '0 0 32px',
                maxWidth: 880
              }}>
                Monitorar prazos. Capturar processos. Triar subsídios. Responder ofícios.
                Validar procurações. <span style={{ color: '#4A545E' }}>
                  Tudo isso consome o time que deveria estar focado em
                  decisões de alto impacto.</span>
              </h2>
            </Reveal>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
              marginTop: 48
            }}>
              {[
              { v: '62%', l: 'do tempo de áreas jurídicas em tarefas operacionais' },
              { v: '1 em 4', l: 'processos com falha de captura ou prazo perdido' },
              { v: '3.2x', l: 'volume médio de movimentações por advogado em 5 anos' }].
              map((m, i) =>
              <Reveal key={i} delay={160 + i * 80} direction="up">
                <div style={{ borderTop: '1px solid #DCE0E6', paddingTop: 20 }}>
                  <CountUp
                    value={m.v}
                    duration={1000}
                    style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#012824', fontSize: 36 }}
                    label={m.l}
                    labelStyle={{ marginTop: 8, fontSize: 13, fontWeight: 300, color: '#4A545E', lineHeight: 1.5 }} />
                  
                </div>
              </Reveal>
              )}
            </div>
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
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 320 }}>
                <span>O Ecossistema</span>
              </div>
              <h2 className="h-large" style={{
                fontSize: 'clamp(36px, 4.6vw, 64px)',
                color: '#ECEFF3', margin: '32px 0 24px'
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
        paddingTop: 128, paddingBottom: 128
      }}>
        <div className="sbk-grid-pattern" />
        <div className="sbk-container" style={{ position: 'relative' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80,
            alignItems: 'start'
          }}>
            <div>
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 320 }}>
                <span>Caminho 01 / SBK</span>
              </div>
              <div style={{
                marginTop: 32,
                fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 400,
                color: '#8FA5A1', lineHeight: 1.6
              }}>
                Para grandes instituições<br />
                financeiras que exigem<br />
                profundidade operacional.
              </div>
            </div>
            <div>
              <h2 className="h-large" style={{
                fontSize: 'clamp(40px, 5.2vw, 76px)',
                color: '#ECEFF3', margin: '0 0 32px'
              }}>
                Serviço dedicado.<br />
                <span style={{ color: '#5C9094' }} className="h-italic">White-glove,</span><br />
                high-touch, sob medida.
              </h2>
              <p style={{
                fontSize: 18, fontWeight: 300, lineHeight: 1.6,
                color: '#C8D7D4', maxWidth: 580, margin: '0 0 40px'
              }}>Assumimos a esteira jurídica da sua instituição. Nosso time opera com tecnologia proprietária e conhecimento profundo de processos, resolvendo a complexidade operacional para que seu jurídico foque no estratégico.



              </p>
              <ul style={{
                listStyle: 'none', padding: 0, margin: '0 0 40px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
                maxWidth: 580
              }}>
                {[
                'Operação 24/7 com SLA contratual',
                'Time dedicado por conta'].
                map((b, i) =>
                <li key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  fontSize: 14, fontWeight: 300, color: '#ECEFF3',
                  lineHeight: 1.5
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
    body: 'Implantamos pré-captura inteligente em 12 estados — antes da citação chegar.',
    metric: '70%',
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
    title: '99% de cobertura em monitoramento de tribunais',
    body: 'Migração completa do sistema legado em 90 dias, sem perda de prazo.',
    metric: '99%',
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