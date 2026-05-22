/* global React, Reveal, PageTransition */

function CookiesPage() {
  const sections = [
    {
      id: 'o-que-sao',
      eyebrow: 'Seção 1',
      title: 'O que são cookies?',
      paragraphs: [
        'Cookies são pequenos arquivos de texto armazenados no seu navegador ou dispositivo quando você visita um site. Eles servem para garantir o funcionamento adequado da página, melhorar sua experiência de navegação, analisar o uso do site e personalizar conteúdo.',
      ],
    },
    {
      id: 'por-que-usamos',
      eyebrow: 'Seção 2',
      title: 'Por que usamos cookies?',
      intro: 'Utilizamos cookies por diversos motivos, incluindo:',
      list: [
        { label: 'Cookies estritamente necessários', desc: 'Essenciais para que o site funcione corretamente (ex.: autenticação, segurança, acesso a áreas restritas).' },
        { label: 'Cookies de desempenho/analíticos', desc: 'Coletam informações sobre como os visitantes usam o site, como páginas mais acessadas, tempo de permanência, entre outros.' },
        { label: 'Cookies funcionais', desc: 'Permitem lembrar preferências do usuário (como idioma, localização, ou login automático).' },
        { label: 'Cookies de marketing/publicidade', desc: 'Utilizados para fornecer anúncios mais relevantes ao seu perfil, inclusive com parceiros como Google ou redes sociais.' },
      ],
    },
    {
      id: 'terceiros',
      eyebrow: 'Seção 3',
      title: 'Cookies de terceiros',
      intro: 'Alguns cookies utilizados no site da SBK podem ser definidos por terceiros, como ferramentas de análise e publicidade. Por exemplo:',
      providers: [
        { name: 'Google Analytics', desc: 'Coleta dados estatísticos anônimos sobre o uso do site.' },
        { name: 'Meta Pixel', desc: 'Permite mensurar interações vindas de campanhas publicitárias no Facebook/Instagram.' },
      ],
      paragraphs: [
        'Esses terceiros têm suas próprias políticas de privacidade e cookies, e recomendamos que você as consulte diretamente.',
      ],
    },
    {
      id: 'gerenciamento',
      eyebrow: 'Seção 4',
      title: 'Gerenciamento de cookies',
      intro: 'Ao acessar o site da SBK pela primeira vez, será exibido um banner de consentimento de cookies, onde você pode:',
      list: [
        { desc: 'Aceitar todos os cookies;' },
        { desc: 'Rejeitar cookies não essenciais;' },
        { desc: 'Personalizar suas preferências por categoria.' },
      ],
      browsers: [
        { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
        { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/pt-BR/kb/cookies-informacoes-sites-armazenam-no-computador' },
        { name: 'Safari', url: 'https://support.apple.com/pt-br/guide/safari/sfri11471/mac' },
        { name: 'Microsoft Edge', url: 'https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
      ],
      paragraphs: [
        'A desativação de cookies pode impactar na funcionalidade de algumas partes do site.',
      ],
    },
    {
      id: 'alteracoes',
      eyebrow: 'Seção 5',
      title: 'Alterações nesta política',
      paragraphs: [
        'A SBK pode atualizar esta Política de Cookies periodicamente para refletir mudanças nos cookies utilizados ou na legislação aplicável. Recomendamos que você revise esta página regularmente.',
      ],
    },
    {
      id: 'contato',
      eyebrow: 'Seção 6',
      title: 'Contato',
      paragraphs: [
        'Se você tiver dúvidas sobre o uso de cookies ou sobre esta Política, entre em contato com nosso Encarregado de Proteção de Dados (DPO):',
      ],
      contact: true,
    },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  const categoryColors = {
    'Cookies estritamente necessários': '#023631',
    'Cookies de desempenho/analíticos': '#075056',
    'Cookies funcionais': '#0A5A52',
    'Cookies de marketing/publicidade': '#2A7C79',
  };

  return (
    <PageTransition>
      <>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="sbk-surface-deep" style={{ position: 'relative', overflow: 'hidden', paddingTop: 148, paddingBottom: 80 }}>
          <div className="sbk-grid-pattern" style={{ opacity: 0.04 }} />
          <div aria-hidden style={{
            position: 'absolute', top: -80, right: -60, width: 480, height: 480,
            background: 'radial-gradient(circle, rgba(7,80,86,0.18) 0%, transparent 65%)',
            filter: 'blur(70px)', pointerEvents: 'none',
          }} />
          <div className="sbk-container" style={{ position: 'relative' }}>
            <Reveal direction="up" delay={0}>
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 220 }}>
                <span>Legal</span>
              </div>
              <h1 className="h-display" style={{
                fontSize: 'clamp(38px, 5vw, 68px)', color: '#ECEFF3',
                margin: '28px 0 24px', lineHeight: 1.02, maxWidth: 640,
              }}>
                Política de cookies
              </h1>
              <p style={{ fontSize: 16, fontWeight: 300, color: '#8FA5A1', maxWidth: 520, lineHeight: 1.7, margin: '0 0 32px' }}>
                Explicamos como a SBK utiliza cookies e tecnologias semelhantes para reconhecer você quando visita nosso site, por que os utilizamos e como gerenciar suas preferências.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '8px 16px',
                border: '1px solid rgba(92,144,148,0.28)',
                borderRadius: 999,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.13em',
                textTransform: 'uppercase', color: '#5C9094',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5C9094', boxShadow: '0 0 8px #5C9094' }} />
                Última atualização: 07/01/2025
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Conteúdo ─────────────────────────────────────────── */}
        <section className="sbk-surface-light" style={{ paddingTop: 80, paddingBottom: 128 }}>
          <div className="sbk-container">
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 72, alignItems: 'start' }}>

              {/* Índice lateral */}
              <Reveal direction="up" delay={0}>
                <div style={{ position: 'sticky', top: 88 }}>
                  <div className="sbk-eyebrow" style={{ color: '#075056', marginBottom: 20 }}>Índice</div>
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={'#' + s.id}
                        onClick={(e) => { e.preventDefault(); scrollTo(s.id); }}
                        style={{
                          display: 'block', padding: '8px 12px',
                          fontSize: 12, fontWeight: 400, color: '#4A545E',
                          borderRadius: 8, textDecoration: 'none',
                          transition: 'background 160ms, color 160ms',
                          lineHeight: 1.4,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#ECEFF3'; e.currentTarget.style.color = '#012824'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4A545E'; }}
                      >
                        <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#075056', display: 'block', marginBottom: 1 }}>{s.eyebrow}</span>
                        {s.title}
                      </a>
                    ))}
                  </nav>

                  {/* Tipos de cookie resumo */}
                  <div style={{
                    marginTop: 32, padding: '20px 18px',
                    background: '#012824', borderRadius: 12,
                    border: '1px solid rgba(236,239,243,0.10)',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C9094', marginBottom: 14 }}>Categorias</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {['Necessários', 'Analíticos', 'Funcionais', 'Marketing'].map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ['#ECEFF3', '#5C9094', '#2A7C79', '#8FA5A1'][i], flexShrink: 0 }} />
                          <span style={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1' }}>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Conteúdo principal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {sections.map((s, i) => (
                  <Reveal key={s.id} direction="up" delay={Math.min(i * 40, 200)}>
                    <article id={s.id} style={{
                      background: '#FFFFFF',
                      border: '1px solid #DCE0E6',
                      borderRadius: 14,
                      padding: 40,
                    }}>
                      <div className="sbk-eyebrow" style={{ color: '#075056', marginBottom: 12 }}>{s.eyebrow}</div>
                      <h2 style={{
                        fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 600,
                        color: '#012824', letterSpacing: '-0.02em',
                        margin: '0 0 24px', lineHeight: 1.25,
                      }}>
                        {s.title}
                      </h2>

                      {s.intro && (
                        <p style={{ fontSize: 15, fontWeight: 300, color: '#4A545E', lineHeight: 1.7, margin: '0 0 16px' }}>
                          {s.intro}
                        </p>
                      )}

                      {/* Lista com label + desc (seção 2) */}
                      {s.list && s.list[0] && s.list[0].label !== undefined && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: s.paragraphs ? 16 : 0 }}>
                          {s.list.map((item, j) => (
                            <div key={j} style={{
                              padding: '16px 20px',
                              background: '#F4F6F8', borderRadius: 10,
                              borderLeft: `3px solid ${Object.values(categoryColors)[j] || '#075056'}`,
                            }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#012824', marginBottom: 4 }}>{item.label}</div>
                              <div style={{ fontSize: 14, fontWeight: 300, color: '#4A545E', lineHeight: 1.6 }}>{item.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Lista simples (seção 4) */}
                      {s.list && s.list[0] && s.list[0].label === undefined && (
                        <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {s.list.map((item, j) => (
                            <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#075056', flexShrink: 0, marginTop: 8 }} />
                              <span style={{ fontSize: 15, fontWeight: 300, color: '#4A545E', lineHeight: 1.7 }}>{item.desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Providers (seção 3) */}
                      {s.providers && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                          {s.providers.map((p, j) => (
                            <div key={j} style={{
                              display: 'flex', gap: 16, alignItems: 'flex-start',
                              padding: '14px 18px', background: '#F4F6F8', borderRadius: 10,
                            }}>
                              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#012824', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#5C9094', letterSpacing: '0.04em' }}>{p.name.slice(0, 2).toUpperCase()}</span>
                              </div>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#012824', marginBottom: 3 }}>{p.name}</div>
                                <div style={{ fontSize: 13, fontWeight: 300, color: '#4A545E', lineHeight: 1.55 }}>{p.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Navegadores (seção 4) */}
                      {s.browsers && (
                        <div style={{ margin: '16px 0', padding: '20px', background: '#F4F6F8', borderRadius: 10 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#075056', marginBottom: 14 }}>Gerenciar por navegador</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {s.browsers.map((b, j) => (
                              <a key={j} href={b.url} target="_blank" rel="noopener noreferrer"
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: '10px 14px', background: '#FFFFFF', borderRadius: 8,
                                  border: '1px solid #DCE0E6', textDecoration: 'none',
                                  transition: 'border-color 160ms',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#075056'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#DCE0E6'}
                              >
                                <span style={{ fontSize: 13, fontWeight: 500, color: '#012824' }}>{b.name}</span>
                                <span style={{ fontSize: 12, color: '#075056', fontWeight: 600 }}>→</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {s.paragraphs && s.paragraphs.map((p, j) => (
                        <p key={j} style={{ fontSize: 15, fontWeight: 300, color: '#4A545E', lineHeight: 1.75, margin: j < s.paragraphs.length - 1 ? '0 0 12px' : 0 }}>
                          {p}
                        </p>
                      ))}

                      {s.contact && (
                        <div style={{ marginTop: 20 }}>
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: 16,
                            padding: '16px 20px', background: '#F4F6F8', borderRadius: 10,
                          }}>
                            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#075056', minWidth: 60 }}>E-mail</span>
                            <a href="mailto:dpo@sbk.com.br" style={{
                              fontSize: 14, fontWeight: 500, color: '#012824',
                              fontFamily: 'JetBrains Mono, monospace', textDecoration: 'none',
                            }}>dpo@sbk.com.br</a>
                          </div>
                        </div>
                      )}
                    </article>
                  </Reveal>
                ))}

                {/* Rodapé */}
                <Reveal direction="up" delay={160}>
                  <div style={{
                    background: '#012824', borderRadius: 14, padding: 40,
                    color: '#ECEFF3', position: 'relative', overflow: 'hidden',
                  }}>
                    <div aria-hidden style={{
                      position: 'absolute', top: -40, right: -40, width: 220, height: 220,
                      background: 'radial-gradient(circle, rgba(42,124,121,0.22) 0%, transparent 70%)',
                      filter: 'blur(40px)', pointerEvents: 'none',
                    }} />
                    <div style={{ position: 'relative' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#5C9094', marginBottom: 14 }}>Transparência SBK</div>
                      <p style={{ fontSize: 16, fontWeight: 300, color: '#C8D7D4', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 560 }}>
                        Você tem o controle sobre seus dados. Gerencie suas preferências de cookies a qualquer momento nas configurações do seu navegador ou pelo banner de consentimento do site.
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5C9094', flexShrink: 0 }} />
                        <span style={{ fontSize: 13, fontWeight: 300, color: '#8FA5A1' }}>
                          Compliance com <strong style={{ color: '#ECEFF3', fontWeight: 600 }}>LGPD</strong> · Criptografia de ponta a ponta · ISO 27001
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </>
    </PageTransition>
  );
}

window.CookiesPage = CookiesPage;
