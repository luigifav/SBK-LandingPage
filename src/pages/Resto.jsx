/* global React, Link, Reveal, StaggerReveal, CountUp, PageTransition */

const CLICKUP_TOKEN   = 'pk_278482746_IHN9XCHPH64MM8ZIKRBNT5H6T3CAF3L9';
const CLICKUP_LIST_ID = '901327540535';

function ContatoPage() {
  const [tab, setTab] = React.useState('enterprise');
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [formValues, setFormValues] = React.useState({
    nome: '', cargo: '', empresa: '', email: '', volume: '', mensagem: '',
  });

  const emptyForm = { nome: '', cargo: '', empresa: '', email: '', volume: '', mensagem: '' };

  const setField = (id, value) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
    if (submitError) setSubmitError('');
  };

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    setSubmitted(false);
    setSubmitError('');
    setFormValues(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!formValues.nome.trim() || !formValues.email.trim()) {
      setSubmitError('Preencha nome e e-mail para continuar.');
      return;
    }
    if (tab === 'enterprise' && !formValues.empresa.trim()) {
      setSubmitError('Informe o nome da empresa.');
      return;
    }

    setSubmitting(true);
    try {
      const agora   = Date.now();
      const em2dias = agora + 2 * 24 * 60 * 60 * 1000;
      const segmento = tab === 'enterprise' ? 'Enterprise' : 'Mid-market · SBK IA';

      const observacoes = [
        formValues.volume   ? `Volume: ${formValues.volume}`     : null,
        formValues.mensagem ? `Mensagem: ${formValues.mensagem}` : null,
      ].filter(Boolean).join('\n');

      const res = await fetch(
        `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
        {
          method: 'POST',
          headers: {
            'Authorization': CLICKUP_TOKEN,
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            name:   `Lead: ${formValues.nome}${formValues.empresa ? ` — ${formValues.empresa}` : ''}`,
            status: 'identificado',
            markdown_description: [
              `**Origem:** Formulário sbk.com.br`,
              `**Segmento:** ${segmento}`,
              formValues.volume   ? `**Volume processos/mês:** ${formValues.volume}` : null,
              formValues.mensagem ? `\n---\n${formValues.mensagem}` : null,
            ].filter(Boolean).join('\n'),
            custom_fields: [
              { id: 'd030717a-682c-403c-b2ff-4c1b9a0e10e7', value: formValues.nome },
              { id: '91eb8215-78ff-4d15-abb6-8f21aa3ad647', value: formValues.cargo    || '' },
              { id: '55a4c329-1d39-42a4-b2e8-f215cc3875ec', value: formValues.empresa  || '' },
              { id: 'e5643134-7774-41bb-8256-55cdb9d4388b', value: formValues.email },
              { id: '29852aed-f685-4b0d-984a-0bc71d14a5d3', value: '5621b66a-390f-4a25-9c03-9cfb43a3ddea' },
              { id: 'eda684eb-8ab2-429a-bcaa-8918d17cff81', value: '99b08289-4214-44cc-ad0d-ae58ad960a22' },
              { id: '1d94e35c-ac7f-422f-ae19-2aca8ea1f6a3', value: segmento },
              { id: '1de43409-1528-4fe6-8d91-6a414bc97c0b', value: observacoes },
              { id: '0e475bf6-b53c-42ab-b1c4-6f5292568a29', value: String(agora) },
              { id: '33c7449f-eaa2-48d9-a178-fac3784e3def', value: 'Aguardando primeiro contato' },
              { id: 'dd3fa72d-0937-4058-b19a-f0f1bed654f7', value: String(em2dias) },
            ].filter(f => f.value !== ''),
          }),
        }
      );

      if (!res.ok) throw new Error(`Erro ${res.status}. Tente novamente.`);

      setSubmitted(true);
      setFormValues(emptyForm);
    } catch (err) {
      setSubmitError(err.message || 'Erro ao enviar. Verifique sua conexão.');
    } finally {
      setSubmitting(false);
    }
  };

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
                    <button key={opt.id} onClick={() => handleTabChange(opt.id)}
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
                    <form onSubmit={handleSubmit}
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
                              <textarea
                                name={f.id}
                                value={formValues[f.id]}
                                onChange={(ev) => setField(f.id, ev.target.value)}
                                placeholder={f.placeholder}
                                rows={4}
                                className="sbk-input"
                                style={inputStyle}
                              />
                            ) : f.type === 'select' ? (
                              <select
                                name={f.id}
                                value={formValues[f.id]}
                                onChange={(ev) => setField(f.id, ev.target.value)}
                                className="sbk-input"
                                style={{ ...inputStyle, cursor: 'pointer', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23012824' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 40 }}
                              >
                                <option value="" disabled>Selecione</option>
                                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            ) : (
                              <input
                                type={f.type}
                                name={f.id}
                                value={formValues[f.id]}
                                onChange={(ev) => setField(f.id, ev.target.value)}
                                placeholder={f.placeholder}
                                className="sbk-input"
                                style={inputStyle}
                                required={f.id === 'nome' || f.id === 'email' || (tab === 'enterprise' && f.id === 'empresa')}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      {submitError ? (
                        <p role="alert" style={{
                          fontSize: 13, fontWeight: 500, color: '#B42318',
                          margin: '20px 0 0', padding: '12px 14px',
                          background: 'rgba(180,35,24,0.06)', borderRadius: 8,
                          border: '1px solid rgba(180,35,24,0.18)',
                        }}>
                          {submitError}
                        </p>
                      ) : null}
                      <button type="submit"
                        disabled={submitting}
                        className={tab === 'enterprise' ? 'btn btn-primary-dark arrow-r' : 'btn btn-ia arrow-r'}
                        style={{
                          marginTop: 28, width: '100%', justifyContent: 'center', padding: 16,
                          opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer',
                        }}>
                        {submitting
                          ? 'Enviando…'
                          : tab === 'enterprise' ? 'Enviar' : 'Criar conta SBK IA'}
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
