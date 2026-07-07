/* global React, Link, Reveal, StaggerReveal, CountUp, PageTransition */

const CLICKUP_FORM_URL =
  'https://forms.clickup.com/90132985812/p/f/2ky5gdym-9833/YGK3VRQCFBSWJ5ZFTE/fromsite';
const CLICKUP_EMBED_SCRIPT =
  'https://app-cdn.clickup.com/assets/js/forms-embed/v1.js';

// Embeds the ClickUp contact form (ClickUp é o CRM da SBK). O script v1.js registra
// um listener global de postMessage que ajusta a altura do iframe .clickup-dynamic-height,
// então funciona mesmo quando o iframe é montado depois pelo React.
function ClickUpForm() {
  React.useEffect(() => {
    if (document.querySelector('script[src="' + CLICKUP_EMBED_SCRIPT + '"]')) return;
    const s = document.createElement('script');
    s.src = CLICKUP_EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <iframe
      className="clickup-embed clickup-dynamic-height"
      src={CLICKUP_FORM_URL}
      title="Formulário de contato SBK"
      width="100%"
      height="1180"
      style={{
        background: 'transparent', border: 'none', width: '100%',
        minHeight: 1180, display: 'block', borderRadius: 12,
      }}
    />
  );
}

function ContatoPage() {
  return (
    <PageTransition>
      <>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="sbk-surface-deep" style={{ position: 'relative', overflow: 'hidden', paddingTop: 148, paddingBottom: 80 }}>
          <div className="sbk-grid-pattern" style={{ opacity: 0.04 }} />
          <div aria-hidden style={{
            position: 'absolute', top: -100, right: -80, width: 520, height: 520,
            background: 'radial-gradient(circle, rgba(42,124,121,0.16) 0%, transparent 65%)',
            filter: 'blur(70px)', pointerEvents: 'none'
          }} />
          <div className="sbk-container" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <Reveal direction="up" delay={0}>
                <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 200 }}>
                  <span>Contato</span>
                </div>
                <h1 className="h-display" style={{
                  fontSize: 'clamp(40px, 5vw, 72px)', color: '#ECEFF3',
                  margin: '28px 0 24px', lineHeight: 1.02,
                }}>
                  Vamos conversar sobre<br/>
                  <span className="h-italic" style={{ color: '#5C9094' }}>a sua operação?</span>
                </h1>
                <p style={{ fontSize: 18, fontWeight: 300, color: '#8FA5A1', maxWidth: 420, lineHeight: 1.65, margin: 0 }}>
                  Times comerciais separados para enterprise e mid-market. Resposta em até 2 dias úteis.
                </p>
              </Reveal>
              <Reveal direction="right" delay={160} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 380 }}>
                  {[
                    { label: 'Enterprise', desc: 'Para grandes empresas buscando serviço dedicado e operação sob medida.', tag: 'Grandes instituições', color: '#ECEFF3', bg: 'rgba(236,239,243,0.06)', border: 'rgba(236,239,243,0.14)' },
                    { label: 'SBK IA · Mid-market', desc: 'Para empresas que querem autosserviço, velocidade e baixo atrito.', tag: 'Acesso imediato', color: '#5C9094', bg: 'rgba(42,124,121,0.10)', border: 'rgba(92,144,148,0.22)' },
                  ].map((c, i) => (
                    <div key={i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 15, fontWeight: 600, color: c.color }}>{c.label}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.color, opacity: 0.7 }}>{c.tag}</span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 300, color: '#8FA5A1', margin: 0, lineHeight: 1.55 }}>{c.desc}</p>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px', background: 'rgba(236,239,243,0.03)', border: '1px solid rgba(236,239,243,0.08)', borderRadius: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5C9094', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 300, color: '#8FA5A1' }}>
                      Resposta garantida em <strong style={{ color: '#ECEFF3', fontWeight: 600 }}>até 2 dias úteis</strong>
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Formulário ───────────────────────────────────────── */}
        <section className="sbk-surface-light" style={{ paddingTop: 72, paddingBottom: 112 }}>
          <div className="sbk-container-narrow">
            <Reveal direction="up" delay={0}>
              <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
                <div className="sbk-eyebrow" style={{ color: '#075056', marginBottom: 14 }}>Fale com a gente</div>
                <h2 style={{
                  fontFamily: 'Plus Jakarta Sans', fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 600,
                  color: '#012824', letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.15,
                }}>
                  Conte um pouco sobre a sua operação
                </h2>
                <p style={{ fontSize: 16, fontWeight: 300, color: '#4A545E', margin: 0, lineHeight: 1.6 }}>
                  Preencha o formulário abaixo. Nosso time comercial entra em contato em até 2 dias úteis, sem fila única.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 26 }}>
                  {[
                    'Enterprise · operação dedicada',
                    'SBK IA · mid-market',
                    'Resposta em até 2 dias úteis',
                  ].map((chip, i) => (
                    <span key={i} style={{
                      fontSize: 12.5, fontWeight: 500, color: '#075056',
                      padding: '7px 14px', borderRadius: 999,
                      background: 'rgba(7,80,86,0.06)', border: '1px solid rgba(7,80,86,0.16)',
                    }}>{chip}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <div className="surf-card" style={{ padding: 'clamp(20px, 4vw, 40px)', maxWidth: 820, margin: '0 auto' }}>
                <ClickUpForm />
                <p style={{ fontSize: 12, fontWeight: 300, color: '#4A545E', margin: '20px 0 0', textAlign: 'center' }}>
                  Ao enviar, você concorda com nossa política de privacidade · LGPD compliance.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    </PageTransition>
  );
}

function ResultadosPage() {
  const cases = [
    {
      company: 'Agibank',
      logo: 'assets/logos/final-agibank.png',
      logoH: 24,
      sector: 'Banco digital',
      since: 'Cliente desde jun. 2024',
      title: 'Captura antecipada, subsídios mais ágeis, revelias em queda.',
      modules: [
        { slug: 'captura',   label: 'Captura' },
        { slug: 'cadastro',  label: 'Cadastro' },
        { slug: 'subsidios', label: 'Subsídios e Laudos' },
        { slug: 'oficios',   label: 'Ofícios' },
      ],
      quote: '"A SBK atua nos nossos processos de Captura, Cadastro, Laudo de Subsídios e Ofícios desde junho de 2024, e os resultados foram imediatos. Com a captura antecipada, conseguimos disponibilizar os subsídios com muito mais agilidade, o que aumentou diretamente a produtividade da nossa área. Além disso, ganhamos melhor controle e visibilidade sobre o volume de entradas e reduzimos significativamente as revelias."',
      tail: 'O que mais me chama atenção na SBK é a flexibilidade e o espírito de parceria genuíno nos novos projetos. Não é só um fornecedor, é um parceiro que cresce junto com a gente.',
      outcomes: [
        'Resultados imediatos.',
        'Subsídios mais ágeis.',
        'Produtividade da área em alta.',
        'Mais controle sobre o volume de entradas.',
        'Revelias reduzidas significativamente.',
      ],
      lead: { name: 'Lorrane Polverini', role: 'Legal Leader · Captura, Cadastro, Laudo' },
    },
    {
      company: 'Agibank',
      logo: 'assets/logos/final-agibank.png',
      logoH: 24,
      sector: 'Banco digital',
      since: 'Frente de Ofícios desde jan. 2026',
      title: 'Gestão de ofícios com celeridade e prazos sob controle.',
      modules: [
        { slug: 'oficios', label: 'Ofícios' },
      ],
      quote: '"A SBK atua na Gestão de Ofícios da nossa área desde janeiro de 2026, e a diferença foi imediata. Ganhamos celeridade nas respostas e um controle de prazos muito mais preciso, o que impacta diretamente na eficiência do nosso departamento jurídico."',
      tail: 'O grande diferencial da SBK está na inserção de inteligência artificial em plataformas voltadas para departamentos jurídicos, aliada a um atendimento rápido e uma parceria genuína com o cliente. Essa combinação faz toda a diferença no dia a dia.',
      outcomes: [
        'Diferença imediata após implantação.',
        'Celeridade nas respostas a ofícios.',
        'Controle de prazos muito mais preciso.',
        'Eficiência do departamento jurídico em alta.',
      ],
      lead: { name: 'Felippe Guimarães de Oliveira', role: 'Legal Leader · Ofícios' },
    },
    {
      company: 'GSI Law',
      logo: null,
      sector: 'Plataforma jurídica',
      since: 'Parceiro desde mar. 2024',
      title: 'IA embarcada na plataforma GSI para leitura de documentos societários.',
      modules: [
        { slug: 'firmas', label: 'Firmas e Poderes' },
      ],
      quote: '"O atendimento e a flexibilidade da SBK facilitam demais os desenvolvimentos dos nossos projetos de melhorias e desenvolvimento de novas funcionalidades na plataforma GSI."',
      tail: 'A GSI Law contratou a SBK para agregar leitura e interpretação automatizadas de documentos societários à sua plataforma — poupando tempo dos usuários e inserindo IA na rotina de departamentos jurídico-contábeis.',
      outcomes: [
        'Leitura automatizada de documentos societários.',
        'Tempo dos usuários da plataforma preservado.',
        'IA na rotina de departamentos jurídico-contábeis.',
      ],
      lead: { name: 'Jonas Antunes', role: 'CEO · GSI Law' },
    },
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
                  <span>Resultados</span>
                </div>
                <h1 className="h-display" style={{
                  fontSize: 'clamp(42px, 5.2vw, 76px)', color: '#ECEFF3',
                  margin: '28px 0 24px', lineHeight: 1.02,
                }}>
                  Resultados<br/>
                  <span className="h-italic" style={{ color: '#5C9094' }}>atestados pelos clientes.</span>
                </h1>
                <p style={{ fontSize: 18, fontWeight: 300, color: '#8FA5A1', maxWidth: 460, lineHeight: 1.65, margin: 0 }}>
                  Cases com nome, área e líder do cliente. Os resultados são os que o time deles assina — sem médias de mercado, sem números genéricos.
                </p>
              </Reveal>
              <Reveal direction="right" delay={160} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: '#011C1A',
                  border: '1px solid rgba(236,239,243,0.09)',
                  borderRadius: 16,
                  padding: 28,
                  width: '100%', maxWidth: 380,
                  display: 'flex', flexDirection: 'column', gap: 22,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="sbk-eyebrow" style={{ color: '#5C9094' }}>Cliente em destaque</div>
                    <div style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
                      textTransform: 'uppercase', color: '#8FA5A1',
                    }}>Banco digital</div>
                  </div>
                  <div style={{
                    background: '#fff', borderRadius: 10, padding: '22px 16px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <img src="assets/logos/final-agibank.png" alt="Agibank"
                      style={{ height: 34, width: 'auto', display: 'block' }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: 13, fontWeight: 300, color: '#C8D7D4',
                      lineHeight: 1.6, marginBottom: 14,
                    }}>
                      Cliente desde junho de 2024. Hoje opera 4 módulos do ecossistema, com dois Legal Leaders responsáveis pela parceria.
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {['Captura', 'Cadastro', 'Subsídios e Laudos', 'Ofícios'].map(m => (
                        <span key={m} style={{
                          fontSize: 11, fontWeight: 500, color: '#ECEFF3',
                          padding: '5px 10px', borderRadius: 6,
                          background: 'rgba(236,239,243,0.06)',
                          border: '1px solid rgba(236,239,243,0.14)',
                        }}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Cases ────────────────────────────────────────────── */}
        <section className="sbk-surface-light sec-pad-lg">
          <div className="sbk-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {cases.map((c, i) => (
                <Reveal key={i} delay={i * 80} direction="up">
                  <article className="surf-card" style={{ padding: 48 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'start' }}>
                      {/* LEFT — identity + quote + attribution */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                          {c.logo ? (
                            <img src={c.logo} alt={c.company}
                              style={{ height: c.logoH || 24, width: 'auto', display: 'block' }} />
                          ) : (
                            <span style={{
                              fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 600,
                              color: '#012824', letterSpacing: '-0.01em',
                            }}>{c.company}</span>
                          )}
                          <span aria-hidden style={{ width: 1, height: 14, background: '#DCE0E6' }} />
                          <span style={{
                            fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                            textTransform: 'uppercase', color: '#8FA5A1',
                          }}>{c.since}</span>
                        </div>

                        <h3 style={{
                          fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 600,
                          color: '#012824', letterSpacing: '-0.02em', lineHeight: 1.2,
                          margin: '0 0 28px'
                        }}>{c.title}</h3>

                        <svg aria-hidden width="26" height="18" viewBox="0 0 32 22" fill="none"
                          style={{ marginBottom: 16, display: 'block' }}>
                          <path d="M0 22V13.2C0 9.6 0.9 6.6 2.7 4.2C4.5 1.8 7.1 0.4 10.5 0L11.8 2.4C9.8 2.9 8.2 3.9 7 5.4C5.8 6.9 5.2 8.6 5.2 10.5H9.8V22H0ZM18.2 22V13.2C18.2 9.6 19.1 6.6 20.9 4.2C22.7 1.8 25.3 0.4 28.7 0L30 2.4C28 2.9 26.4 3.9 25.2 5.4C24 6.9 23.4 8.6 23.4 10.5H28V22H18.2Z" fill="#DCE0E6" />
                        </svg>
                        <blockquote style={{
                          fontFamily: 'Plus Jakarta Sans', fontSize: 17, fontWeight: 400,
                          color: '#012824', lineHeight: 1.55, letterSpacing: '-0.01em',
                          margin: '0 0 18px', fontStyle: 'italic',
                        }}>
                          {c.quote}
                        </blockquote>
                        <p style={{
                          fontSize: 13.5, fontWeight: 300, color: '#4A545E',
                          lineHeight: 1.65, margin: '0 0 28px',
                        }}>{c.tail}</p>

                        <div style={{
                          paddingTop: 20, borderTop: '1px solid #DCE0E6',
                        }}>
                          <div style={{
                            fontSize: 14, fontWeight: 600, color: '#012824', letterSpacing: '-0.01em',
                          }}>{c.lead.name}</div>
                          <div style={{ fontSize: 12, fontWeight: 300, color: '#4A545E', marginTop: 2 }}>
                            {c.lead.role}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT — modules + outcomes */}
                      <div style={{
                        background: '#012824', borderRadius: 14, padding: 32, color: '#ECEFF3',
                      }}>
                        <div className="sbk-eyebrow" style={{ color: '#5C9094', marginBottom: 14 }}>
                          {c.modules.length > 1 ? 'Módulos ativos' : 'Módulo ativo'}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                          {c.modules.map(m => (
                            <Link key={m.slug} to={'/produto/' + m.slug} style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '6px 10px',
                              border: '1px solid rgba(236,239,243,0.18)',
                              borderRadius: 6,
                              fontSize: 12, fontWeight: 500, color: '#ECEFF3',
                              textDecoration: 'none',
                              background: 'rgba(236,239,243,0.04)',
                            }}>
                              {m.label}
                              <span style={{ fontSize: 10, opacity: 0.6 }}>→</span>
                            </Link>
                          ))}
                        </div>

                        <div className="sbk-eyebrow" style={{ color: '#5C9094', marginBottom: 14 }}>
                          O que o cliente registra
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {c.outcomes.map((o, j) => (
                            <li key={j} style={{
                              padding: '12px 0',
                              borderTop: j > 0 ? '1px solid rgba(236,239,243,0.14)' : 'none',
                              display: 'flex', gap: 12, alignItems: 'flex-start',
                              fontSize: 13.5, fontWeight: 300, color: '#ECEFF3', lineHeight: 1.5,
                            }}>
                              <span aria-hidden style={{
                                flex: '0 0 auto', width: 6, height: 6, borderRadius: 999,
                                background: '#5C9094', marginTop: 7,
                              }} />
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </>
    </PageTransition>
  );
}

window.ContatoPage = ContatoPage;
window.ResultadosPage = ResultadosPage;
