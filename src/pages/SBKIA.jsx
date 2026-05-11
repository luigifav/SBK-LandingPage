/* global React, Link, Reveal, StaggerReveal, CountUp, PageTransition */

function SBKIAPage() {
  const products = [
    { name: 'Captura IA', desc: 'Pré-captura de processos por CNPJ. Você cadastra, a IA monitora.', price: 'a partir de R$ 0,40/CNPJ' },
    { name: 'Monitoramento IA', desc: 'Acompanhe movimentações em 99% dos tribunais. Alertas em tempo real.', price: 'a partir de R$ 1,20/processo' },
    { name: 'Firmas e Poderes IA', desc: 'Validação automática de vigência societária e poderes.', price: 'a partir de R$ 5,40/consulta' },
    { name: 'Laudo IA', desc: 'Geração automática de laudos técnicos a partir do processo.', price: 'a partir de R$ 18,00/laudo' },
  ];
  return (
    <PageTransition>
      <div className="sbk-ia">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section style={{
          background: '#012824', position: 'relative', overflow: 'hidden',
          paddingTop: 148, paddingBottom: 80, color: '#ECEFF3',
        }}>
          <div className="sbk-grid-pattern" style={{ opacity: 0.04 }} />
          <div aria-hidden style={{
            position: 'absolute', top: -100, right: -100, width: 560, height: 560,
            background: 'radial-gradient(circle, rgba(42,124,121,0.18) 0%, transparent 65%)',
            filter: 'blur(70px)', pointerEvents: 'none',
          }} />
          <div className="sbk-container" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <Reveal direction="up" delay={0}>
                <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 240 }}>
                  <span>SBK IA · Autosserviço</span>
                </div>
                <h1 className="h-display" style={{
                  fontSize: 'clamp(42px, 5.2vw, 76px)', color: '#ECEFF3',
                  margin: '28px 0 24px', lineHeight: 1.02,
                }}>
                  A inteligência de 30 anos,<br/>
                  <span className="h-italic" style={{ color: '#5C9094' }}>em poucos cliques.</span>
                </h1>
                <p style={{
                  fontSize: 18, fontWeight: 300, lineHeight: 1.65,
                  color: '#8FA5A1', maxWidth: 460, margin: '0 0 36px',
                }}>
                  Produtos de autosserviço com a mesma precisão que cobre grandes bancos.
                  Sem implantação longa. Sem fidelização. Você usa, você paga.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to="/contato" className="btn btn-ia arrow-r">Comece agora</Link>
                  <Link to="/contato" className="btn btn-ghost arrow-r">Solicitar demo</Link>
                </div>
              </Reveal>
              <Reveal direction="right" delay={160} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: 'rgba(42,124,121,0.08)',
                  border: '1px solid rgba(92,144,148,0.18)',
                  borderRadius: 16, padding: '24px', width: '100%', maxWidth: 400,
                }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 500,
                    color: '#5C9094', letterSpacing: '0.18em', textTransform: 'uppercase',
                    marginBottom: 20,
                  }}>catálogo · disponível agora</div>
                  <StaggerReveal
                    items={products}
                    stagger={60}
                    baseDelay={200}
                    renderItem={(p) => (
                      <div style={{
                        padding: '14px 0',
                        borderTop: '1px solid rgba(236,239,243,0.08)',
                        display: 'flex', flexDirection: 'column', gap: 4,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 600, color: '#ECEFF3' }}>{p.name}</span>
                          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 99, background: 'rgba(42,124,121,0.25)', color: '#5C9094' }}>Disponível</span>
                        </div>
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#8FA5A1' }}>{p.price}</span>
                      </div>
                    )}
                  />
                  <Link to="/contato" className="btn btn-ia arrow-r" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                    Comece agora
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── O que é ──────────────────────────────────────────── */}
        <section className="sbk-surface-light sec-pad-lg">
          <div className="sbk-container">
            <Reveal direction="up">
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 240 }}>
                <span>O que é a SBK IA</span>
              </div>
              <h2 className="h-large" style={{
                fontSize: 'clamp(36px, 4.4vw, 60px)', color: '#012824',
                margin: '24px 0 24px', maxWidth: 980,
              }}>
                Não é uma empresa diferente.<br/>
                <span style={{ color: '#4A545E' }}>É o produto que empacota a SBK para uso autônomo.</span>
              </h2>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 64 }}>
              {[
                { t: 'Mesma operação', d: '30 anos cobrindo as maiores empresas do mercado. Mesmos algoritmos, mesma base de dados, mesma cobertura.' },
                { t: 'Acesso direto', d: 'Cadastro, primeiro processo capturado e relatório em uma única sessão.' },
                { t: 'Pague só pelo uso', d: 'Sem mensalidade obrigatória, sem fidelização, sem mínimo. Você consome o que precisa.' },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 100} direction="up">
                  <div className="surf-card" style={{ padding: 28, minHeight: 220 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#075056', color: '#ECEFF3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>0{i+1}</div>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 600, color: '#012824', letterSpacing: '-0.02em', margin: '0 0 12px' }}>{c.t}</h3>
                    <p style={{ fontSize: 14, fontWeight: 300, color: '#4A545E', lineHeight: 1.6, margin: 0 }}>{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Produtos ─────────────────────────────────────────── */}
        <section className="sbk-surface-light" style={{ paddingBottom: 128 }}>
          <div className="sbk-container">
            <Reveal direction="up">
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 240 }}>
                <span>Produtos disponíveis</span>
              </div>
              <h2 className="h-large" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)', color: '#012824', margin: '24px 0 56px', maxWidth: 720 }}>O catálogo SBK IA, hoje.</h2>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {products.map((p, i) => (
                <Reveal key={i} delay={i * 80} direction="up">
                  <div className="surf-card" style={{ padding: 32, display: 'flex', justifyContent: 'space-between', gap: 32, alignItems: 'center', cursor: 'pointer' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 600, color: '#012824', letterSpacing: '-0.02em', margin: 0 }}>{p.name}</h3>
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: 4, background: 'rgba(42,124,121,0.12)', color: '#075056' }}>Disponível</span>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 300, color: '#4A545E', lineHeight: 1.55, margin: '0 0 12px', maxWidth: 460 }}>{p.desc}</p>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#075056', fontWeight: 500 }}>{p.price}</div>
                    </div>
                    <Link to="/contato" className="btn btn-ia arrow-r">Acessar</Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Manual vs SBK IA ─────────────────────────────────── */}
        <section className="sbk-surface-dark sec-pad-lg" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="sbk-grid-pattern" />
          <div className="sbk-container" style={{ position: 'relative' }}>
            <Reveal direction="up">
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 280 }}>
                <span>Manual vs SBK IA</span>
              </div>
              <h2 className="h-large" style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: '#ECEFF3', margin: '24px 0 56px', maxWidth: 800 }}>
                O ganho concreto de migrar a operação para o autosserviço.
              </h2>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid rgba(236,239,243,0.12)', borderRadius: 14, overflow: 'hidden' }}>
                {[
                  { side: 'Manual', items: ['Cadastro processo a processo', '3-5 dias para 1ª captura', 'Sem alerta de prazo', 'Laudo redigido a mão', 'Sem dado consolidado'] },
                  { side: 'SBK IA', items: ['Cadastro em lote por CNPJ', 'Captura em minutos', 'Alerta automático com SLA', 'Laudo gerado pela IA', 'Painel de jurimetria nativo'] },
                ].map((col, ci) => (
                  <div key={ci} style={{ padding: 40, background: ci === 0 ? 'rgba(236,239,243,0.02)' : 'rgba(42,124,121,0.10)', borderRight: ci === 0 ? '1px solid rgba(236,239,243,0.12)' : 'none' }}>
                    <div className="sbk-eyebrow" style={{ color: ci === 0 ? '#8FA5A1' : '#5C9094', marginBottom: 24 }}>{col.side}</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {col.items.map((it, i) => (
                        <li key={i} style={{ padding: '14px 0', borderBottom: i < col.items.length - 1 ? '1px solid rgba(236,239,243,0.10)' : 'none', fontSize: 15, fontWeight: 300, color: '#ECEFF3', display: 'flex', gap: 12, alignItems: 'center' }}>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: ci === 0 ? '#8FA5A1' : '#5C9094', opacity: ci === 0 ? 0.5 : 1 }}>{ci === 0 ? '×' : '✓'}</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}

window.SBKIAPage = SBKIAPage;
