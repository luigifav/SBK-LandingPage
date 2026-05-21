/* global React, Link, ECOSYSTEM_MODULES, Reveal, StaggerReveal, CountUp, PageTransition */

function ProdutoPage({ slug }) {
  const mod = ECOSYSTEM_MODULES.find(m => m.id === slug) || ECOSYSTEM_MODULES[0];
  const content = {
    'pre-judicial': {
      headline: 'Resolva o conflito antes do processo nascer.',
      problem: 'Cada reclamação aberta em Procon ou Reclame Aqui é um processo em potencial. Quando o jurídico só descobre o caso pela citação, perdeu a janela mais barata e mais rápida de solução — a do pré-litígio.',
      steps: [
        ['01', 'Monitoramento contínuo dos canais', 'Varredura 24/7 de Procon, Reclame Aqui, Consumidor.Gov e ouvidorias dos principais setores regulados.'],
        ['02', 'Triagem por risco e materialidade', 'Cada reclamação classificada por probabilidade de virar processo, valor envolvido e reincidência do reclamante.'],
        ['03', 'Resposta orientada por histórico', 'Resposta sugerida considera precedentes da operação, política interna e tom regulatório do canal.'],
        ['04', 'Encaminhamento para acordo ou retenção', 'Alto risco entra em acordo controlado; baixo risco, em fila com SLA definido e baixa automática.'],
      ],
      diffs: [
        ['85%', 'das reclamações resolvidas no pré-litígio em clientes maduros.'],
        ['R$ 3.200', 'economia média por caso evitado de virar processo judicial.'],
        ['24/7', 'cobertura ininterrupta dos canais de reclamação.'],
      ],
      metric: { v: '85%', l: 'das reclamações monitoradas resolvidas antes de virar processo' },
    },
    captura: {
      headline: 'Capture o processo antes da citação chegar.',
      problem: 'Por padrão, o jurídico só descobre o processo quando a citação aparece. Nesse intervalo, prazos correm, posições estratégicas se perdem, e a defesa começa em desvantagem.',
      steps: [
        ['01', 'Pré-monitoramento dos tribunais', 'Robôs proprietários varrem as movimentações em todos os tribunais do Brasil, 24/7.'],
        ['02', 'Identificação por CNPJ + variações', 'Algoritmo de match que reconhece grafias divergentes, filiais e fusões.'],
        ['03', 'Captura completa da inicial', 'Petição, anexos e contexto processual — entregues antes do prazo de defesa.'],
        ['04', 'Roteamento para o módulo de Cadastro', 'Dado entra direto na esteira e é publicado no ERP jurídico do cliente sem intervenção manual.'],
      ],
      diffs: [
        ['30 anos', 'cobrindo bancos. Conhecemos todas as variações de grafia e filial.'],
        ['9 dias', 'em média de antecipação sobre a citação tradicional.'],
        ['Todos os tribunais', 'do Brasil cobertos por robôs proprietários da SBK.'],
      ],
      metric: { v: '78%', l: 'redução média no tempo entre processo e início da defesa' },
    },
    cadastro: {
      headline: 'A inicial capturada — de qualquer fonte — entra padronizada no ERP do cliente.',
      problem: 'Captura não é cadastro. A inicial chega de fontes heterogêneas — SBK ou outros fornecedores de captura — em formatos, campos e estruturas diferentes. Padronizar e empurrar para o ERP jurídico consome horas qualificadas e gera o retrabalho que aparece meses depois, na defesa.',
      steps: [
        ['01', 'Recepção multi-fonte', 'Aceita capturas da SBK e de fornecedores terceiros — via API, e-mail estruturado ou planilha. Petição inicial, partes, valor da causa e anexos.'],
        ['02', 'Padronização por ERP do cliente', 'Campos remapeados para o layout do ERP em uso (Legal One, Benner, ProcWeb, SAJ e integrações proprietárias). Sem campo livre, sem improviso.'],
        ['03', 'Enriquecimento contextual', 'CNPJ + CPF cruzados com base de variações de grafia, filial e grupo econômico. Histórico de processos similares anexado de saída.'],
        ['04', 'Publicação no ERP', 'Inserção direta no sistema do cliente — via API ou robô controlado — com capa completa, sem campo em branco e sem nome trocado.'],
      ],
      diffs: [
        ['0', 'campos em branco ou divergentes ao final do cadastro.'],
        ['+200', 'campos estruturados por processo, prontos para o Analytics.'],
        ['Multi-ERP', 'Legal One, Benner, ProcWeb, SAJ e integrações proprietárias sob medida.'],
      ],
      metric: { v: '94%', l: 'dos cadastros aprovados em primeira revisão e publicados direto no ERP' },
    },
    monitoramento: {
      headline: 'Toda movimentação, em todos os tribunais do Brasil, em minutos.',
      problem: 'O risco operacional do jurídico mora no que ele não vê a tempo. Sistemas legados falham em escala — perdem peças, atrasam alertas, mascaram prazos críticos. E o time descobre tarde demais.',
      steps: [
        ['01', 'Robôs proprietários nos tribunais', 'Frota de robôs da SBK varre diariamente todos os tribunais brasileiros — TJs estaduais, federais e superiores.'],
        ['02', 'Filtro por relevância operacional', 'Movimentações classificadas em prazo, despacho, julgamento, intimação — descartando ruído.'],
        ['03', 'Alerta com SLA contratual', 'Notificação acionável em até 30 minutos para qualquer evento crítico.'],
        ['04', 'Roteamento ao módulo certo', 'Pediu laudo? Vai para Subsídios. Ofício? Para Ofícios. Sem fila manual no meio.'],
      ],
      diffs: [
        ['Todos', 'os tribunais do Brasil cobertos por robôs proprietários.'],
        ['30 min', 'SLA contratual para alerta de movimentação crítica.'],
        ['Zero', 'prazos perdidos por falha de monitoramento em 2024.'],
      ],
      metric: { v: '100%', l: 'tribunais brasileiros cobertos por nossa frota de robôs' },
    },
    subsidios: {
      headline: 'Laudos técnicos em minutos, não em dias.',
      problem: 'Laudos travam o ciclo de defesa. O dado existe — extrato, contrato, gravação, log — mas montar o documento final consome dias de trabalho qualificado a cada caso, em um volume que só cresce.',
      steps: [
        ['01', 'Coleta padronizada dos subsídios', 'Busca automática nos sistemas internos e bases externas autorizadas.'],
        ['02', 'Estruturação editorial', 'Dados organizados em template jurídico, com cabeçalho, anexos e índice gerados.'],
        ['03', 'Geração do laudo pelo motor IA', 'Texto técnico redigido, citações cruzadas e cálculos conferidos pela LLM treinada na operação.'],
        ['04', 'Revisão humana sob fluxo', 'Advogado revisa, ajusta e libera com um clique. Sem reescrita do zero.'],
      ],
      diffs: [
        ['90%', 'redução de tempo para emissão do laudo final.'],
        ['12 min', 'tempo médio entre solicitação e laudo pronto para revisão.'],
        ['LLM própria', 'treinada com mais de 1 milhão de laudos da operação SBK.'],
      ],
      metric: { v: '90%', l: 'redução de tempo médio por laudo técnico emitido' },
    },
    oficios: {
      headline: 'SLA de 30 minutos para todo ofício recebido.',
      problem: 'Ofício sem resposta no prazo vira multa, descumprimento e desgaste regulatório. O volume cresce, o time não acompanha, e a fila acaba pesando justamente onde o custo de errar é maior.',
      steps: [
        ['01', 'Recepção centralizada e digitalizada', 'Captura de ofícios por e-mail, malote, balcão judicial e portais públicos.'],
        ['02', 'Classificação automática', 'Tipo, órgão emissor, prazo legal e nível de criticidade reconhecidos pela IA na entrada.'],
        ['03', 'Roteamento para a área responsável', 'Conta corrente, RH, dados, compliance — cada ofício chega no time certo, sem CC genérico.'],
        ['04', 'Resposta com modelo controlado', 'Modelo aprovado pela operação, com placeholders auditáveis e log completo de quem editou o quê.'],
      ],
      diffs: [
        ['30 min', 'SLA contratual entre recepção e início da resposta.'],
        ['100%', 'rastreabilidade fim a fim de cada ofício respondido.'],
        ['-72%', 'queda em multas regulatórias após implantação completa.'],
      ],
      metric: { v: '30 min', l: 'SLA contratual entre recepção e início da resposta' },
    },
    obrigacoes: {
      headline: 'Cada obrigação, no prazo certo, pelo valor correto.',
      problem: 'Obrigações de fazer e não-fazer somem entre o despacho e a execução. Quando o juiz cobra, descobre-se que o prazo já passou ou o valor foi mal provisionado — e a multa cresce em cima.',
      steps: [
        ['01', 'Identificação na movimentação', 'Toda decisão que gera obrigação é capturada no momento da publicação, no mesmo dia.'],
        ['02', 'Quantificação automática', 'Valor, periodicidade, multa por descumprimento e correção monetária calculados na hora.'],
        ['03', 'Acompanhamento até a liquidação', 'Painel com status de cada obrigação ativa e alerta no aproximar do prazo crítico.'],
        ['04', 'Liquidação e baixa controlada', 'Comprovação anexada ao processo e baixa com trilha de auditoria completa.'],
      ],
      diffs: [
        ['-65%', 'queda em multas por descumprimento após seis meses de uso.'],
        ['100%', 'das obrigações ativas com responsável e prazo visíveis no painel.'],
        ['R$ 0', 'em provisionamento perdido por obrigação não-mapeada.'],
      ],
      metric: { v: '65%', l: 'redução em multas por descumprimento de obrigação' },
    },
    firmas: {
      headline: 'Procuração válida no clique. Sem advogado conferindo cada PDF.',
      problem: 'Validar poderes de representação é repetitivo e crítico. Um signatário sem poder vigente derruba um contrato inteiro — e a conferência manual continua sendo a regra na maioria das operações jurídicas e contábeis.',
      steps: [
        ['01', 'Extração estruturada do documento', 'Estatuto, contrato social, procuração e ata lidos por OCR + IA estruturada.'],
        ['02', 'Validação cruzada de poderes', 'Cláusulas conferidas com base nas exigências do ato — assinar contrato, dar quitação, representar em juízo.'],
        ['03', 'Cross-check com Junta Comercial', 'Vigência societária, alterações pendentes e quadro de sócios atualizado em tempo real.'],
        ['04', 'Alerta automático de vencimento', 'Notificação antes da procuração caducar ou do mandato vencer — sem surpresa na próxima operação.'],
      ],
      diffs: [
        ['95%', 'das validações concluídas sem intervenção humana.'],
        ['<2 min', 'tempo médio por validação completa de poderes.'],
        ['100%', 'cobertura das Juntas Comerciais estaduais.'],
      ],
      metric: { v: '95%', l: 'das validações concluídas sem intervenção humana' },
    },
  };
  const c = content[slug] || content.captura;

  // Conexão com o ecossistema — texto específico por módulo
  const connections = {
    'pre-judicial': {
      title: <>Pré-judicial alerta a Captura<br/>e enriquece o Analytics.</>,
      body: 'Casos que escalam para processo entram automaticamente na esteira de Captura. Toda interação volta como sinal de risco no Analytics — reincidência, tema quente, regional sensível.',
    },
    captura: {
      title: <>Captura alimenta o Cadastro,<br/>o Monitoramento e o Analytics.</>,
      body: 'Cada captura gera dado estruturado que entra no Cadastro, dispara Monitoramento ativo e enriquece o Analytics — fechando o ciclo de inteligência operacional.',
    },
    cadastro: {
      title: <>Cadastro recebe capturas de qualquer fonte<br/>e entrega tudo padronizado no ERP.</>,
      body: 'A inicial pode vir da Captura SBK ou de qualquer fornecedor parceiro. O Cadastro padroniza conforme o ERP em uso e publica direto no sistema do cliente. Daí em diante, Monitoramento, Subsídios e Analytics consomem dado limpo.',
    },
    monitoramento: {
      title: <>Monitoramento aciona Ofícios,<br/>Subsídios e Obrigações em tempo real.</>,
      body: 'Cada movimentação relevante vira evento na esteira: ofício recebido aciona Ofícios, intimação para laudo vai a Subsídios, sentença de fazer abre obrigação no módulo Obrigações.',
    },
    subsidios: {
      title: <>Subsídios consome dado do<br/>Cadastro e devolve laudo pronto.</>,
      body: 'Cada laudo gerado também alimenta o Analytics — temas recorrentes, qualidade do dado de entrada e tempo de ciclo. A operação aprende com o próprio trabalho.',
    },
    oficios: {
      title: <>Ofícios fecha o ciclo entre<br/>Monitoramento e resposta regulatória.</>,
      body: 'Ofício chega via Monitoramento, é classificado, roteado e respondido sob SLA. Tudo registrado no Analytics como evento regulatório com prazo, multa potencial e fechamento.',
    },
    obrigacoes: {
      title: <>Obrigações nasce do Monitoramento<br/>e conversa direto com o financeiro.</>,
      body: 'Toda decisão judicial que gera obrigação cai no painel. O Analytics consolida obrigações ativas em provisão, fluxo de caixa esperado e risco por matéria.',
    },
    firmas: {
      title: <>Firmas valida poderes antes<br/>do contrato, da defesa e do ofício.</>,
      body: 'Antes de qualquer ato que dependa de representação, Firmas confere vigência e poderes. Resultado entra no Analytics como score de risco contratual da contraparte.',
    },
  };
  const conn = connections[slug] || connections.captura;

  return (
    <PageTransition>
      <>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="sbk-surface-deep" style={{
          position: 'relative', overflow: 'hidden',
          paddingTop: 148, paddingBottom: 80,
        }}>
          <div className="sbk-grid-pattern" style={{ opacity: 0.04 }} />
          <div aria-hidden style={{
            position: 'absolute', top: -120, right: -80, width: 560, height: 560,
            background: 'radial-gradient(circle, rgba(42,124,121,0.16) 0%, transparent 65%)',
            filter: 'blur(70px)', pointerEvents: 'none'
          }} />
          <div className="sbk-container" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <Reveal direction="up" delay={0}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#5C9094', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Link to="/ecossistema" style={{ color: '#5C9094', opacity: 0.7 }}>← Ecossistema</Link>
                  <span style={{ color: 'rgba(236,239,243,0.2)' }}>/</span>
                  <span style={{ color: '#8FA5A1' }}>{mod.label}</span>
                </div>
                <h1 className="h-display" style={{
                  fontSize: 'clamp(40px, 5vw, 72px)', color: '#ECEFF3',
                  margin: '0 0 24px', lineHeight: 1.02,
                }}>
                  {c.headline}
                </h1>
                <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.65, color: '#8FA5A1', maxWidth: 460, margin: '0 0 36px' }}>{c.problem}</p>
                <Link to="/contato" className="btn btn-primary arrow-r">Falar com nosso time</Link>
              </Reveal>
              <Reveal direction="right" delay={160} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: 'rgba(236,239,243,0.04)',
                  border: '1px solid rgba(236,239,243,0.10)',
                  borderRadius: 16, padding: '28px 24px', width: '100%', maxWidth: 380,
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 500, color: '#5C9094', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>fluxo · {mod.label}</div>
                  <StaggerReveal
                    items={c.steps}
                    stagger={60}
                    baseDelay={200}
                    renderItem={([n, t, d]) => (
                      <div style={{ display: 'flex', gap: 16, padding: '12px 0', borderTop: '1px solid rgba(236,239,243,0.07)', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 500, color: '#5C9094', flexShrink: 0, marginTop: 2 }}>{n}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#ECEFF3', marginBottom: 3, lineHeight: 1.3 }}>{t}</div>
                          <div style={{ fontSize: 12, fontWeight: 300, color: '#8FA5A1', lineHeight: 1.5 }}>{d}</div>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Como funciona ────────────────────────────────────── */}
        <section className="sbk-surface-light sec-pad-lg">
          <div className="sbk-container">
            <Reveal direction="up">
              <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 240 }}>
                <span>Como funciona</span>
              </div>
              <h2 className="h-large" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)', color: '#012824', margin: '24px 0 56px', maxWidth: 720 }}>
                O fluxo operacional do módulo, do dado bruto à decisão.
              </h2>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid #DCE0E6', borderRadius: 14, overflow: 'hidden', background: '#FFFFFF' }}>
                {c.steps.map(([n, t, d], i) => (
                  <div key={i} style={{ padding: 32, borderRight: i < c.steps.length - 1 ? '1px solid #DCE0E6' : 'none' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#075056', fontWeight: 500, marginBottom: 24 }}>Etapa {n}</div>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 600, color: '#012824', letterSpacing: '-0.01em', lineHeight: 1.3, margin: '0 0 12px' }}>{t}</h3>
                    <p style={{ fontSize: 13, fontWeight: 300, color: '#4A545E', lineHeight: 1.55, margin: 0 }}>{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Diferenciais ─────────────────────────────────────── */}
        <section className="sbk-surface-dark sec-pad-lg" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="sbk-grid-pattern" />
          <div className="sbk-container" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
              <Reveal direction="up">
                <div className="rule-caption" style={{ justifyContent: 'flex-start', maxWidth: 260 }}>
                  <span>Diferenciais</span>
                </div>
              </Reveal>
              <div>
                <Reveal direction="up" delay={80}>
                  <h2 className="h-large" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#ECEFF3', margin: '0 0 48px', maxWidth: 760 }}>
                    O que a SBK faz de diferente nesse módulo.
                  </h2>
                </Reveal>
                <StaggerReveal
                  items={c.diffs}
                  stagger={80}
                  baseDelay={160}
                  renderItem={([v, l], i) => (
                    <div style={{
                      display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32,
                      padding: '32px 0',
                      borderTop: '1px solid rgba(236,239,243,0.14)',
                      borderBottom: i === c.diffs.length - 1 ? '1px solid rgba(236,239,243,0.14)' : 'none',
                      alignItems: 'baseline',
                    }}>
                      <CountUp value={v} duration={1000} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#ECEFF3', fontSize: 36 }} />
                      <div style={{ fontSize: 17, fontWeight: 300, color: '#C8D7D4', lineHeight: 1.55 }}>{l}</div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Depoimento ───────────────────────────────────────── */}
        {slug === 'firmas' && (
          <section className="sbk-surface-light" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="sbk-container">
              <Reveal direction="up">
                <div style={{
                  borderTop: '1px solid #DCE0E6',
                  borderBottom: '1px solid #DCE0E6',
                  padding: '72px 0',
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: 72,
                  alignItems: 'center',
                }}>
                  {/* Lado esquerdo — identidade */}
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
                    <div style={{
                      marginTop: 8, fontSize: 13, fontWeight: 400, color: '#075056'
                    }}>
                      Firmas e Poderes
                    </div>
                  </div>

                  {/* Lado direito — citação */}
                  <div>
                    <svg aria-hidden width="32" height="22" viewBox="0 0 32 22" fill="none" style={{ marginBottom: 24, display: 'block' }}>
                      <path d="M0 22V13.2C0 9.6 0.9 6.6 2.7 4.2C4.5 1.8 7.1 0.4 10.5 0L11.8 2.4C9.8 2.9 8.2 3.9 7 5.4C5.8 6.9 5.2 8.6 5.2 10.5H9.8V22H0ZM18.2 22V13.2C18.2 9.6 19.1 6.6 20.9 4.2C22.7 1.8 25.3 0.4 28.7 0L30 2.4C28 2.9 26.4 3.9 25.2 5.4C24 6.9 23.4 8.6 23.4 10.5H28V22H18.2Z" fill="#DCE0E6"/>
                    </svg>
                    <blockquote style={{
                      fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 400,
                      color: '#012824', lineHeight: 1.5, letterSpacing: '-0.01em',
                      margin: '0 0 32px',
                      fontStyle: 'italic',
                    }}>
                      "O atendimento e a flexibilidade da SBK facilitam demais os desenvolvimentos dos nossos projetos de melhorias e desenvolvimento de novas funcionalidades na plataforma GSI."
                    </blockquote>
                    <p style={{
                      fontSize: 14, fontWeight: 300, color: '#4A545E', lineHeight: 1.65,
                      maxWidth: 640, margin: 0,
                    }}>
                      A GSI Law é uma LawTech voltada à gestão da rotina societária. Contrataram a SBK para agregar leitura e interpretação automatizadas de documentos societários, com registro assertivo de informações relevantes — reduzindo o tempo dos usuários na plataforma e inserindo IA no fluxo de departamentos jurídico-contábeis.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── Conexão com ecossistema ───────────────────────────── */}
        <section className="sbk-surface-light sec-pad-md">
          <div className="sbk-container">
            <Reveal direction="up">
              <div style={{
                background: '#012824', color: '#ECEFF3',
                borderRadius: 20, padding: '64px 56px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
              }}>
                <div>
                  <div className="sbk-eyebrow" style={{ color: '#5C9094' }}>Conexão com o ecossistema</div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 600, color: '#ECEFF3', letterSpacing: '-0.02em', margin: '20px 0 16px', lineHeight: 1.15 }}>
                    {conn.title}
                  </h3>
                  <p style={{ fontSize: 15, fontWeight: 300, color: '#C8D7D4', lineHeight: 1.6, margin: 0 }}>
                    {conn.body}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <CountUp value={c.metric.v} duration={1400} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#5C9094', fontSize: 'clamp(72px, 9vw, 144px)' }} />
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 300, color: '#8FA5A1', textAlign: 'right', maxWidth: 260, marginLeft: 'auto', lineHeight: 1.5, marginTop: 12 }}>{c.metric.l}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    </PageTransition>
  );
}

window.ProdutoPage = ProdutoPage;
