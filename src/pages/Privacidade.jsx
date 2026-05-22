/* global React, Reveal, PageTransition */

function PrivacidadePage() {
  const sections = [
    {
      id: 'escopo',
      eyebrow: 'Seção 1',
      title: 'Escopo',
      paragraphs: [
        'Esta política se aplica a todos os visitantes do site institucional da SBK, bem como aos dados pessoais coletados por meio de formulários, cookies e interações com nossos serviços online.',
      ],
    },
    {
      id: 'finalidade',
      eyebrow: 'Seção 2',
      title: 'Finalidade da coleta de dados',
      intro: 'Os dados coletados pela SBK têm as seguintes finalidades:',
      list: [
        'Identificar e autenticar usuários para acesso a áreas restritas;',
        'Enviar comunicações institucionais, quando autorizadas;',
        'Cumprir obrigações legais e regulatórias;',
        'Responder a solicitações, dúvidas ou reclamações;',
        'Melhorar a experiência de navegação e desempenho do site;',
        'Proteger os direitos e interesses da SBK em eventual disputa legal.',
      ],
    },
    {
      id: 'dados',
      eyebrow: 'Seção 3',
      title: 'Dados coletados',
      intro: 'Durante sua navegação, podemos coletar:',
      list: [
        'Dados informados diretamente pelo titular (ex.: nome, e-mail, telefone, empresa);',
        'Dados de navegação, como endereço IP, tipo de navegador, localização aproximada, data e hora de acesso;',
        'Informações coletadas por cookies e tecnologias semelhantes (detalhadas abaixo).',
      ],
    },
    {
      id: 'cookies',
      eyebrow: 'Seção 4',
      title: 'Uso de cookies',
      intro: 'Utilizamos cookies para melhorar sua experiência em nosso site. Os cookies podem ser:',
      list: [
        'Essenciais: necessários para o funcionamento básico do site;',
        'De desempenho: coletam informações anônimas sobre a forma como o site é usado;',
        'Funcionais: lembram preferências e personalizações;',
        'De marketing: usados para direcionar conteúdo relevante.',
      ],
      paragraphs: [
        'Você pode aceitar ou recusar os cookies ao acessar nosso site. A recusa de determinados cookies pode limitar algumas funcionalidades.',
      ],
    },
    {
      id: 'compartilhamento',
      eyebrow: 'Seção 5',
      title: 'Compartilhamento de dados',
      intro: 'A SBK não compartilha dados pessoais com terceiros, exceto:',
      list: [
        'Com fornecedores de serviços que atuam em nosso nome (ex.: hospedagem, segurança, e-mail marketing), respeitando contratos com cláusulas de confidencialidade;',
        'Para cumprimento de obrigação legal ou ordem judicial;',
        'Para proteger os interesses legítimos da SBK, em processos administrativos, arbitrais ou judiciais.',
      ],
    },
    {
      id: 'seguranca',
      eyebrow: 'Seção 6',
      title: 'Segurança e armazenamento',
      paragraphs: [
        'Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda, alteração ou destruição. Os dados são armazenados em ambiente seguro, observando o estado da técnica, e mantidos pelo tempo necessário para atingir as finalidades descritas, respeitando a legislação vigente.',
      ],
    },
    {
      id: 'retencao',
      eyebrow: 'Seção 7',
      title: 'Retenção de dados',
      intro: 'Os dados serão armazenados pelo prazo necessário ao cumprimento das finalidades ou conforme exigido por lei, como:',
      list: [
        'Registros de acesso: mínimo de 6 meses (conforme Marco Civil da Internet – Lei nº 12.965/14);',
        'Dados relacionados a comunicações ou interações: enquanto necessário para resposta ou manutenção de relacionamento.',
      ],
      paragraphs: [
        'Os dados podem ser excluídos ou anonimizados a pedido do titular, salvo hipóteses legais que justifiquem sua manutenção.',
      ],
    },
    {
      id: 'direitos',
      eyebrow: 'Seção 8',
      title: 'Direitos do titular',
      intro: 'Você pode, a qualquer momento, exercer seus direitos garantidos pela LGPD:',
      list: [
        'Confirmação da existência de tratamento;',
        'Acesso aos dados;',
        'Correção de dados incompletos ou desatualizados;',
        'Anonimização, bloqueio ou eliminação;',
        'Portabilidade dos dados;',
        'Revogação do consentimento;',
        'Oposição ao tratamento em desacordo com a LGPD.',
      ],
      paragraphs: [
        'Para exercer esses direitos, envie um e-mail para: dpo@sbk.com.br. Responderemos em prazo razoável, conforme a complexidade do pedido.',
      ],
    },
    {
      id: 'subprocessadores',
      eyebrow: 'Seção 9',
      title: 'Subprocessadores e terceiros',
      paragraphs: [
        'A SBK pode utilizar fornecedores e subprocessadores para operar sua infraestrutura e sistemas, sempre observando padrões rigorosos de segurança e conformidade com esta política.',
      ],
    },
    {
      id: 'criancas',
      eyebrow: 'Seção 10',
      title: 'Dados de crianças e adolescentes',
      paragraphs: [
        'Nosso site e serviços não são direcionados a menores de 12 anos. Caso identifiquemos o envio de dados pessoais por menores, sem autorização dos responsáveis legais, faremos a exclusão imediata dessas informações.',
      ],
    },
    {
      id: 'alteracoes',
      eyebrow: 'Seção 11',
      title: 'Alterações na política',
      paragraphs: [
        'Esta Política de Privacidade pode ser atualizada a qualquer momento para refletir melhorias nos nossos processos ou mudanças legais. Recomendamos a revisão periódica desta página. A data da última atualização estará sempre indicada no início do documento.',
      ],
    },
    {
      id: 'contato',
      eyebrow: 'Seção 12',
      title: 'Contato',
      paragraphs: [
        'Em caso de dúvidas ou solicitações relacionadas aos seus dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO):',
      ],
      contact: true,
    },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
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
                Política de privacidade
              </h1>
              <p style={{ fontSize: 16, fontWeight: 300, color: '#8FA5A1', maxWidth: 520, lineHeight: 1.7, margin: '0 0 32px' }}>
                A SBK valoriza a sua privacidade e se compromete com a proteção dos dados pessoais coletados por meio de seu site institucional, em conformidade com a LGPD (Lei nº 13.709/2018).
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

                  {/* DPO card */}
                  <div style={{
                    marginTop: 32, padding: '20px 18px',
                    background: '#012824', borderRadius: 12,
                    border: '1px solid rgba(236,239,243,0.10)',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C9094', marginBottom: 10 }}>DPO · Contato</div>
                    <p style={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1', lineHeight: 1.6, margin: '0 0 10px' }}>
                      Encarregado de Proteção de Dados
                    </p>
                    <a href="mailto:dpo@sbk.com.br" style={{
                      fontSize: 12, fontWeight: 600, color: '#5C9094',
                      textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace',
                    }}>dpo@sbk.com.br</a>
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

                      {s.list && (
                        <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {s.list.map((item, j) => (
                            <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#075056', flexShrink: 0, marginTop: 8 }} />
                              <span style={{ fontSize: 15, fontWeight: 300, color: '#4A545E', lineHeight: 1.7 }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {s.paragraphs && s.paragraphs.map((p, j) => (
                        <p key={j} style={{ fontSize: 15, fontWeight: 300, color: '#4A545E', lineHeight: 1.75, margin: j < s.paragraphs.length - 1 ? '0 0 12px' : 0 }}>
                          {p}
                        </p>
                      ))}

                      {s.contact && (
                        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {[
                            { label: 'E-mail', value: 'dpo@sbk.com.br', href: 'mailto:dpo@sbk.com.br' },
                            { label: 'Encarregado (DPO)', value: 'Cesar Augusto Silva' },
                            { label: 'Suplente do DPO', value: 'Pedro Santos' },
                          ].map((row, j) => (
                            <div key={j} style={{
                              display: 'flex', alignItems: 'center', gap: 16,
                              padding: '14px 18px',
                              background: '#F4F6F8', borderRadius: 10,
                            }}>
                              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#075056', minWidth: 140 }}>{row.label}</span>
                              {row.href ? (
                                <a href={row.href} style={{ fontSize: 14, fontWeight: 500, color: '#012824', fontFamily: 'JetBrains Mono, monospace', textDecoration: 'none' }}>{row.value}</a>
                              ) : (
                                <span style={{ fontSize: 14, fontWeight: 400, color: '#012824' }}>{row.value}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  </Reveal>
                ))}

                {/* Rodapé LGPD */}
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
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#5C9094', marginBottom: 14 }}>Compromisso SBK</div>
                      <p style={{ fontSize: 16, fontWeight: 300, color: '#C8D7D4', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 560 }}>
                        Ao navegar no site da SBK, você concorda com os termos desta política. Para dúvidas ou exercício dos seus direitos como titular, entre em contato com nosso DPO.
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

window.PrivacidadePage = PrivacidadePage;
