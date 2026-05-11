/* global React, Link, Reveal, StaggerReveal, CountUp, PageTransition */

function ContatoPage() {
  const [tab, setTab] = React.useState('enterprise');
  const [submitted, setSubmitted] = React.useState(false);

  const fields = tab === 'enterprise' ? [
    { id: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Maria Silva' },
    { id: 'cargo', label: 'Cargo', type: 'text', placeholder: 'Head de Legal Ops' },
    { id: 'empresa', label: 'Empresa', type: 'text', placeholder: 'Banco XYZ' },
    { id: 'email', label: 'E-mail corporativo', type: 'email', placeholder: 'maria@empresa.com.br' },
    { id: 'volume', label: 'Volume de processos/mês', type: 'select', options: ['Até 1.000', '1.000 a 10.000', '10.000 a 50.000', '50.000+'] },
    { id: 'mensagem', label: 'Como podemos ajudar?', type: 'textarea', placeholder: 'Conte um pouco sobre a operação atual.' },
  ] : [
    { id: 'nome', label: 'Nome', type: 'text', placeholder: 'Maria Silva' },
    { id: 'email', label: 'E-mail', type: 'email', placeholder: 'maria@empresa.com.br' },
    { id: 'empresa', label: 'Empresa', type: 'text', placeholder: 'Empresa Ltda' },
  ];

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
                  Times comerciais separados para enterprise e mid-market. Resposta em até 4h úteis.
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
                      Resposta garantida em <strong style={{ color: '#ECEFF3', fontWeight: 600 }}>até 4h úteis</strong>
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Formulário ───────────────────────────────────────── */}
        <section className="sbk-surface-light" style={{ paddingTop: 80, paddingBottom: 128 }}>
          <style>{`
            .sbk-input:focus { border-color: #075056 !important; box-shadow: 0 0 0 3px rgba(7,80,86,0.10) !important; }
            .sbk-input::placeholder { color: #A0ACB8; }
            .sbk-input option { color: #012824; background: #fff; }
          `}</style>
          <div className="sbk-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }}>
              <Reveal direction="up" delay={0}>
                <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 240 }}>
                  <span>Qual é o seu perfil?</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
                  {[
                    { id: 'enterprise', t: 'Enterprise', d: 'Grandes empresas buscando serviço dedicado.' },
                    { id: 'midmarket', t: 'Mid-market · SBK IA', d: 'Empresa querendo autosserviço e velocidade.' },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => { setTab(opt.id); setSubmitted(false); }}
                      style={{
                        textAlign: 'left', padding: 20,
                        background: tab === opt.id ? '#012824' : '#FFFFFF',
                        color: tab === opt.id ? '#ECEFF3' : '#012824',
                        border: tab === opt.id ? '1px solid #012824' : '1px solid #DCE0E6',
                        borderRadius: 12, cursor: 'pointer',
                        transition: 'all 200ms cubic-bezier(.2,0,0,1)',
                      }}>
                      <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 6 }}>{opt.t}</div>
                      <div style={{ fontSize: 13, fontWeight: 300, color: tab === opt.id ? '#C8D7D4' : '#4A545E', lineHeight: 1.5 }}>{opt.d}</div>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 48, padding: 24, background: '#FFFFFF', border: '1px solid #DCE0E6', borderRadius: 12 }}>
                  <div className="sbk-eyebrow" style={{ color: '#075056', marginBottom: 12 }}>Resposta em até</div>
                  <CountUp value="1" duration={800} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#012824', fontSize: 48 }} label="dia útil" labelStyle={{ display: 'inline', fontSize: 48, fontWeight: 600, letterSpacing: '-0.04em', color: '#012824' }} />
                  <p style={{ fontSize: 13, fontWeight: 300, color: '#4A545E', margin: '12px 0 0', lineHeight: 1.55 }}>
                    Times comerciais separados para enterprise e mid-market. Sem fila única.
                  </p>
                </div>
              </Reveal>
              <Reveal direction="up" delay={120}>
                <div>
                  {submitted ? (
                    <div style={{ background: '#FFFFFF', border: '1px solid #DCE0E6', borderRadius: 14, padding: 64, textAlign: 'center' }}>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#075056', color: '#ECEFF3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 24px' }}>✓</div>
                      <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 600, color: '#012824', letterSpacing: '-0.02em', margin: '0 0 12px' }}>Mensagem enviada.</h3>
                      <p style={{ fontSize: 15, fontWeight: 300, color: '#4A545E', lineHeight: 1.55, margin: '0 auto', maxWidth: 420 }}>
                        Nosso time {tab === 'enterprise' ? 'comercial enterprise' : 'da SBK IA'} entrará em contato em até 4 horas úteis.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                      style={{ background: '#FFFFFF', border: '1px solid #DCE0E6', borderRadius: 14, padding: 40 }}>
                      <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 600, color: '#012824', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                        {tab === 'enterprise' ? 'Fale com nosso time comercial' : 'Solicite acesso à SBK IA'}
                      </h2>
                      <p style={{ fontSize: 14, fontWeight: 300, color: '#4A545E', margin: '0 0 32px' }}>
                        {tab === 'enterprise' ? 'Para grandes operações. Reunião de 30 minutos sem compromisso.' : 'Acesso aberto, sem fidelização. Você cria a conta hoje mesmo.'}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        {fields.map(f => (
                          <div key={f.id}>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#012824', marginBottom: 6, letterSpacing: '0.02em' }}>{f.label}</label>
                            {f.type === 'textarea' ? (
                              <textarea placeholder={f.placeholder} rows={4} className="sbk-input" style={inputStyle} />
                            ) : f.type === 'select' ? (
                              <select className="sbk-input" style={{ ...inputStyle, cursor: 'pointer', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23012824' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 40 }} defaultValue="">
                                <option value="" disabled>Selecione</option>
                                {f.options.map(o => <option key={o}>{o}</option>)}
                              </select>
                            ) : (
                              <input type={f.type} placeholder={f.placeholder} className="sbk-input" style={inputStyle} />
                            )}
                          </div>
                        ))}
                      </div>
                      <button type="submit"
                        className={tab === 'enterprise' ? 'btn btn-primary-dark arrow-r' : 'btn btn-ia arrow-r'}
                        style={{ marginTop: 28, width: '100%', justifyContent: 'center', padding: 16 }}>
                        {tab === 'enterprise' ? 'Enviar' : 'Criar conta SBK IA'}
                      </button>
                      <p style={{ fontSize: 12, fontWeight: 300, color: '#4A545E', margin: '20px 0 0', textAlign: 'center' }}>
                        Ao enviar, você concorda com nossa política de privacidade · LGPD compliance.
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </>
    </PageTransition>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 14px',
  fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 400,
  color: '#012824', background: '#F4F6F8', border: '1px solid #DCE0E6',
  borderRadius: 8, outline: 'none', boxSizing: 'border-box',
  appearance: 'none', WebkitAppearance: 'none',
  transition: 'border-color 180ms, box-shadow 180ms',
};

function ResultadosPage() {
  const cases = [
    { tag: 'Banco · Top 5', title: '70% de redução no tempo entre processo e início da defesa',
      ctx: 'Banco com 80M de clientes ativos e operação jurídica em 27 estados.',
      body: 'Implantamos pré-captura inteligente em todos os TJs cobertos. Antes da citação chegar, o processo já estava cadastrado, monitorado e roteado.',
      m: [['70%', 'redução no time-to-defense'], ['6 dias', 'antecipação média'], ['12 estados', 'na primeira onda']] },
    { tag: 'Financeira · Crédito', title: 'SLA de 30 minutos em ofícios com volume 4× maior',
      ctx: 'Volume médio de 4.200 ofícios/mês com prazos legais de 24h.',
      body: 'Substituímos a operação manual de 14 pessoas pela combinação SBK + módulo de Ofícios + Subsídios automatizados.',
      m: [['30 min', 'SLA contratual'], ['100%', 'aderência ao prazo'], ['4×', 'crescimento absorvido']] },
    { tag: 'Seguradora', title: '99% de cobertura em monitoramento, migração em 90 dias',
      ctx: 'Migração do sistema legado proprietário para o ecossistema SBK.',
      body: 'Plano de migração faseado por linha de produto. Monitoramento, Cadastro e Captura ativos em 90 dias sem perda de prazo no período de transição.',
      m: [['99%', 'tribunais cobertos'], ['90 dias', 'migração completa'], ['0', 'prazos perdidos']] },
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
                  Operação que se prova<br/>
                  <span className="h-italic" style={{ color: '#5C9094' }}>em números.</span>
                </h1>
                <p style={{ fontSize: 18, fontWeight: 300, color: '#8FA5A1', maxWidth: 440, lineHeight: 1.65, margin: 0 }}>
                  Casos reais de instituições financeiras que migraram sua esteira jurídica para a SBK.
                </p>
              </Reveal>
              <Reveal direction="right" delay={160} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
                  background: 'rgba(236,239,243,0.09)', borderRadius: 16,
                  overflow: 'hidden', width: '100%', maxWidth: 380,
                }}>
                  {[
                    { v: '70%', l: 'redução no tempo de captura', tag: 'Banco Top 5' },
                    { v: '30min', l: 'SLA para resposta de ofícios', tag: 'Financeira' },
                    { v: '99%', l: 'tribunais monitorados', tag: 'Seguradora' },
                    { v: '0', l: 'prazos perdidos na migração', tag: '90 dias' },
                  ].map((m, i) => (
                    <div key={i} style={{
                      background: '#011C1A', padding: '24px 20px',
                      borderRadius: i === 0 ? '15px 0 0 0' : i === 1 ? '0 15px 0 0' : i === 2 ? '0 0 0 15px' : '0 0 15px 0',
                    }}>
                      <CountUp value={m.v} duration={1200} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#ECEFF3', fontSize: 40, marginBottom: 6 }} />
                      <div style={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1', lineHeight: 1.4, marginBottom: 8 }}>{m.l}</div>
                      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C9094' }}>{m.tag}</div>
                    </div>
                  ))}
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start' }}>
                      <div>
                        <div className="sbk-eyebrow" style={{ color: '#075056' }}>{c.tag}</div>
                        <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 30, fontWeight: 600, color: '#012824', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '20px 0 20px' }}>{c.title}</h3>
                        <p style={{ fontSize: 14, fontWeight: 300, color: '#4A545E', margin: '0 0 16px' }}>
                          <strong style={{ color: '#012824', fontWeight: 600 }}>Contexto. </strong>{c.ctx}
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 300, color: '#4A545E', lineHeight: 1.6, margin: 0 }}>
                          <strong style={{ color: '#012824', fontWeight: 600 }}>O que a SBK fez. </strong>{c.body}
                        </p>
                      </div>
                      <div style={{ background: '#012824', borderRadius: 14, padding: 32, color: '#ECEFF3' }}>
                        <div className="sbk-eyebrow" style={{ color: '#5C9094', marginBottom: 20 }}>Resultados</div>
                        {c.m.map(([v, l], j) => (
                          <div key={j} style={{ paddingTop: 16, paddingBottom: 16, borderTop: j > 0 ? '1px solid rgba(236,239,243,0.14)' : 'none' }}>
                            <CountUp value={v} duration={1000} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#ECEFF3', fontSize: 36 }} label={l} labelStyle={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1', marginTop: 4 }} />
                          </div>
                        ))}
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
