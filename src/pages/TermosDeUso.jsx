/* global React, Reveal, PageTransition */

function TermosDeUsoPage() {
  const sections = [
    {
      eyebrow: 'Seção 1',
      title: 'Restrições à utilização do website',
      paragraphs: [
        'A SBK autoriza e concede o acesso limitado ao Website exclusivamente para fins do que foi definido no contrato estabelecido entre as partes.',
        'Qualquer tentativa ou acesso não autorizado, uso, ou modificação é proibida. A utilização do Website é monitorada e gravada.',
        'O usuário concorda em não utilizar o Website e seus dados para outros fins alheios ao permitido, sob o risco de serem aplicadas as penalidades previstas na Lei Geral de Proteção de Dados Pessoais (LGPD).',
        'O usuário concorda ainda que nenhum material deste Website (incluindo, mas não se limitando ao texto, imagens, áudio e/ou vídeo) poderá ser copiado, reproduzido, republicado, carregado, publicado, transmitido, ou distribuído de qualquer forma, ou descompilado, modificado inverso ou desmontado.',
        'O compartilhamento ou a modificação de qualquer desses materiais ou software ou a utilização de tais materiais ou software para qualquer outro fim constitui uma violação dos direitos de autor, marca registrada e outros direitos de propriedade da SBK.',
        'A utilização de qualquer desses materiais ou software em qualquer outro ambiente informático em rede é proibida sem o expresso consentimento prévio por escrito da SBK.',
        'Se o monitoramento revelar possíveis evidências de utilização não autorizada ou atividade criminal, a SBK poderá providenciar a cópia dos registros para a aplicação da lei. Infrações relacionadas à política e normas serão punidas de acordo com o estabelecido pelo comitê de ética e conduta da empresa.',
        'Não obstante qualquer disposição em contrário, o usuário reconhece que a SBK se reserva o direito de, e pode, a seu exclusivo critério, recusar ou terminar o acesso ao Website a qualquer momento.',
        'Ao realizar o acesso, você concorda com todas as cláusulas da política e normas de segurança da SBK.',
      ],
    },
    {
      eyebrow: 'Seção 2',
      title: 'Propriedade da SBK — direitos de autor',
      paragraphs: [
        'Todo o conteúdo deste Website (incluindo, sem limitação, a organização, gráficos, design, software, compilação, tradução magnética e conversão digital) são propriedade da SBK e estão protegidos por direitos de autor e protegidos pelas leis aplicáveis de direitos de autor, marcas registradas e outras leis de propriedade no Brasil.',
        'É estritamente proibida qualquer utilização de qualquer conteúdo deste Website para além do que foi expressamente permitido no contrato entre as partes. Além disso, este Website pode incluir nomes, logotipos e marcas de terceiros.',
        'A utilização ou uso indevido destes nomes, logotipos e/ou marcas para qualquer fim é estritamente proibida pelas leis aplicáveis. Os usuários reconhecem e concordam que em caso algum adquirem quaisquer direitos (de propriedade ou outros) sobre este Website ou sobre qualquer dos seus conteúdos.',
      ],
    },
  ];

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
                Termos de uso
              </h1>
              <p style={{ fontSize: 16, fontWeight: 300, color: '#8FA5A1', maxWidth: 520, lineHeight: 1.7, margin: '0 0 32px' }}>
                Condições que regem a utilização deste website e seus conteúdos. Ao acessar o Website, você declara ter lido e concordado com os termos abaixo.
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
                Última atualização: 2026
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
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {sections.map((s, i) => (
                      <a
                        key={i}
                        href={'#secao-' + (i + 1)}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById('secao-' + (i + 1));
                          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
                        }}
                        style={{
                          display: 'block', padding: '9px 12px',
                          fontSize: 13, fontWeight: 400, color: '#4A545E',
                          borderRadius: 8, textDecoration: 'none',
                          transition: 'background 160ms, color 160ms',
                          lineHeight: 1.45,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#ECEFF3'; e.currentTarget.style.color = '#012824'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4A545E'; }}
                      >
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#075056', display: 'block', marginBottom: 2 }}>{s.eyebrow}</span>
                        {s.title}
                      </a>
                    ))}
                  </nav>

                  {/* Info LGPD */}
                  <div style={{
                    marginTop: 40, padding: '20px 18px',
                    background: '#012824', borderRadius: 12,
                    border: '1px solid rgba(236,239,243,0.10)',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C9094', marginBottom: 10 }}>LGPD · Compliance</div>
                    <p style={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1', lineHeight: 1.6, margin: 0 }}>
                      Tratamos seus dados em conformidade com a Lei Geral de Proteção de Dados Pessoais e as normas vigentes no Brasil.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Conteúdo principal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
                {sections.map((s, i) => (
                  <Reveal key={i} direction="up" delay={i * 80}>
                    <article id={'secao-' + (i + 1)} style={{
                      background: '#FFFFFF',
                      border: '1px solid #DCE0E6',
                      borderRadius: 14,
                      padding: 48,
                    }}>
                      <div className="sbk-eyebrow" style={{ color: '#075056', marginBottom: 16 }}>{s.eyebrow}</div>
                      <h2 style={{
                        fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 600,
                        color: '#012824', letterSpacing: '-0.02em',
                        margin: '0 0 32px', lineHeight: 1.25,
                      }}>
                        {s.title}
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {s.paragraphs.map((p, j) => (
                          <p key={j} style={{
                            fontSize: 15, fontWeight: 300, color: '#4A545E',
                            lineHeight: 1.75, margin: 0,
                            paddingBottom: j < s.paragraphs.length - 1 ? 16 : 0,
                            borderBottom: j < s.paragraphs.length - 1 ? '1px solid #F0F2F5' : 'none',
                          }}>
                            {p}
                          </p>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                ))}

                {/* Aceite */}
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
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#5C9094', marginBottom: 14 }}>Declaração de aceite</div>
                      <p style={{ fontSize: 16, fontWeight: 300, color: '#C8D7D4', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 560 }}>
                        Ao realizar o acesso, você declara ter lido, compreendido e concordado com todos os termos e condições acima, bem como com a política de privacidade e normas de segurança da SBK.
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

window.TermosDeUsoPage = TermosDeUsoPage;
