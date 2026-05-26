/* global React */

/* ────────────────────────────────────────────────────────────────
   ProductMockup — animated window cycling through SBK platforms.
   Each product is a SEPARATE platform (different name, accent,
   internal nav). All data is generic — no real client names.
   ──────────────────────────────────────────────────────────────── */

const PRODUCTS = [
  {
    id: 'monitor', appName: 'SBK · Monitor', slug: 'monitor', accent: '#5C9094',
    label: 'Monitoramento', caption: 'Prazos & andamentos',
    tabs: ['Agenda', 'Andamentos', 'Histórico', 'Gestão'], activeTab: 0,
    page: 'Agenda de Prazos',
    pageSub: 'Prazos e andamentos capturados nas últimas 24 horas',
    role: 'Visão do operador — foco em execução de prazos',
  },
  {
    id: 'captura', appName: 'SBK · Captura', slug: 'captura', accent: '#C97444',
    label: 'Captura', caption: 'Novos processos',
    tabs: ['Estoque', 'Capturados', 'Validação', 'Gestão'], activeTab: 1,
    page: 'Captura em Tempo Real',
    pageSub: 'Novos processos identificados na varredura de tribunais',
    role: 'Visão do operador — foco em ingestão de processos',
  },
  {
    id: 'triagem', appName: 'SBK · Triagem', slug: 'triagem', accent: '#075056',
    label: 'Subsídios', caption: 'Triagem operacional',
    tabs: ['Estoque', 'Tratativas', 'Acompanhamento', 'Gestão'], activeTab: 0,
    page: 'Estoque Operacional',
    pageSub: 'Tarefas recebidas aguardando processamento',
    role: 'Visão do operador — foco em execução de casos',
  },
  {
    id: 'laudos', appName: 'SBK · Laudos', slug: 'laudos', accent: '#7A6840',
    label: 'Laudos', caption: 'Geração de pareceres jurídicos',
    tabs: ['Pendentes', 'Em geração', 'Revisão', 'Entregues'], activeTab: 1,
    page: 'Laudo em Geração',
    pageSub: 'Parecer jurídico estruturado a partir dos subsídios coletados',
    role: 'Visão do operador — foco em produção de laudos',
  },
  {
    id: 'oficios', appName: 'SBK · Ofícios', slug: 'oficios', accent: '#A8323F',
    label: 'Ofícios', caption: 'Respostas & validação',
    tabs: ['Pendentes', 'Em redação', 'Validação', 'Gestão'], activeTab: 0,
    page: 'Ofícios Pendentes',
    pageSub: 'Ofícios recebidos por toda a equipe',
    role: 'Visão do operador — foco em resposta a tribunais',
  },
];

const CYCLE_MS = 6800;

function ProductMockup() {
  const [active, setActive] = React.useState(0);
  const [t, setT] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const startRef = React.useRef(0);

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(a => (a + 1) % PRODUCTS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  React.useEffect(() => {
    startRef.current = performance.now();
    let raf;
    const tick = (now) => {
      setT(Math.min(1, (now - startRef.current) / CYCLE_MS));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const handleTabClick = (i) => {
    setActive(i);
    setPaused(true);
    // resume auto-cycle after 20s of inactivity
    clearTimeout(handleTabClick._tid);
    handleTabClick._tid = setTimeout(() => setPaused(false), 20000);
  };

  const prod = PRODUCTS[active];

  return (
    <div className="pm-mockup-scroll" style={{ width: '100%' }}>
    <div className="pm-mockup-root no-mobile-stack" style={{ width: '100%' }}>
      {/* tab strip ABOVE the window — clickable buttons to switch platforms */}
      <div style={{
        display: 'flex', gap: 6, marginBottom: -1, position: 'relative', zIndex: 2,
        paddingLeft: 18,
      }}>
        {PRODUCTS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleTabClick(i)}
            aria-pressed={i === active}
            style={{
              padding: '9px 16px 11px',
              background: i === active ? '#012824' : 'rgba(1,40,36,0.06)',
              color: i === active ? '#ECEFF3' : '#4A545E',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 200ms ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              if (i !== active) e.currentTarget.style.background = 'rgba(1,40,36,0.12)';
            }}
            onMouseLeave={(e) => {
              if (i !== active) e.currentTarget.style.background = 'rgba(1,40,36,0.06)';
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: i === active ? p.accent : 'rgba(1,40,36,0.25)',
              transition: 'background 200ms ease',
            }} />
            {p.label}
          </button>
        ))}
      </div>

      <div style={{
        position: 'relative',
        background: '#F4F4EE',
        borderRadius: '0 14px 14px 14px',
        overflow: 'hidden',
        boxShadow: '0 40px 80px -30px rgba(1,40,36,0.45), 0 14px 30px -12px rgba(1,40,36,0.3), 0 0 0 1px rgba(1,40,36,0.08)',
      }}>
        {/* OS chrome bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '12px 16px',
          background: '#012824',
          borderBottom: `1px solid ${prod.accent}33`,
        }}>
          <div style={{ display: 'flex', gap: 7 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
              <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.85 }} />
            ))}
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500,
            color: 'rgba(236,239,243,0.45)', letterSpacing: '0.06em',
          }}>
            <span style={{ opacity: 0.7 }}>{prod.slug}.sbk.com.br</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {PRODUCTS.map((m, i) => (
              <span key={i} style={{
                width: 5, height: 5, borderRadius: '50%',
                background: i === active ? prod.accent : 'rgba(236,239,243,0.18)',
                transition: 'background 400ms ease',
              }} />
            ))}
          </div>
        </div>

        {/* Product header (per-platform) */}
        <div key={prod.id + '-header'} className="pm-fade-in" style={{
          background: '#012824',
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', gap: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: prod.accent,
              boxShadow: `0 0 0 3px ${prod.accent}33`,
            }} />
            <span style={{
              fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 600,
              color: '#ECEFF3', letterSpacing: '-0.015em',
            }}>{prod.appName}</span>
          </div>
          <div style={{ display: 'flex', gap: 2, flex: 1 }}>
            {prod.tabs.map((tab, i) => (
              <div key={i} style={{
                padding: '7px 14px',
                fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 500,
                color: i === prod.activeTab ? '#012824' : 'rgba(236,239,243,0.6)',
                background: i === prod.activeTab ? '#ECEFF3' : 'transparent',
                borderRadius: 6,
              }}>{tab}</div>
            ))}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(236,239,243,0.06)',
            borderRadius: 999, padding: 3,
          }}>
            <span style={{
              padding: '5px 12px', borderRadius: 999,
              fontFamily: 'Plus Jakarta Sans', fontSize: 12, fontWeight: 500,
              color: '#012824', background: '#ECEFF3',
            }}>Operador</span>
            <span style={{
              padding: '5px 12px',
              fontFamily: 'Plus Jakarta Sans', fontSize: 12, fontWeight: 400,
              color: 'rgba(236,239,243,0.55)',
            }}>Gestor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(236,239,243,0.7)" strokeWidth="1.8">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span style={{
                position: 'absolute', top: -3, right: -4,
                width: 14, height: 14, borderRadius: '50%',
                background: prod.accent, border: '2px solid #012824',
                fontFamily: 'Plus Jakarta Sans', fontSize: 8, fontWeight: 700,
                color: '#FFF', display: 'grid', placeItems: 'center',
              }}>6</span>
            </div>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: prod.accent, display: 'grid', placeItems: 'center',
              fontFamily: 'Plus Jakarta Sans', fontSize: 10, fontWeight: 600,
              color: '#012824',
            }}>AC</div>
          </div>
        </div>

        {/* sub-bar — role context (per-platform tint) */}
        <div style={{
          background: '#013730',
          borderBottom: `2px solid ${prod.accent}`,
          padding: '8px 28px',
          fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, fontWeight: 400,
          color: 'rgba(236,239,243,0.78)',
          textAlign: 'center',
        }}>
          {prod.role}
        </div>

        {/* main content */}
        <div key={prod.id + '-body'} className="pm-screen-in" style={{
          padding: '24px 32px 22px',
          background: '#F4F4EE',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{
                fontFamily: 'Tiempos, "Plus Jakarta Sans", serif',
                fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em',
                color: '#012824', marginBottom: 4,
              }}>{prod.page}</div>
              <div style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 12, fontWeight: 400,
                color: '#6B7280',
              }}>{prod.pageSub}</div>
            </div>
          </div>

          {prod.id === 'monitor' && <ScreenMonitor accent={prod.accent} />}
          {prod.id === 'captura' && <ScreenCaptura accent={prod.accent} />}
          {prod.id === 'triagem' && <ScreenTriagem accent={prod.accent} />}
          {prod.id === 'laudos'  && <ScreenLaudos  accent={prod.accent} />}
          {prod.id === 'oficios' && <ScreenOficios accent={prod.accent} />}
        </div>

        {/* progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2, background: 'rgba(1,40,36,0.08)',
        }}>
          <div style={{
            height: '100%', background: prod.accent,
            width: `${t * 100}%`,
            transition: 'width 80ms linear',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pm-fade-in   { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @keyframes pm-screen-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes pm-row-in    { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes pm-bar-fill  { from { width: 0; } }
        @keyframes pm-pulse     { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
        @keyframes pm-type      { from { width: 0; } }
        .pm-fade-in   { animation: pm-fade-in 500ms cubic-bezier(.2,.6,.2,1) both; }
        .pm-screen-in { animation: pm-screen-in 600ms cubic-bezier(.2,.6,.2,1) both; }
      `}</style>
    </div>
    </div>
  );
}

/* ─── shared building blocks ─── */
function KPI({ label, value, accent, sub, delay = 0 }) {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 8, padding: '16px 18px',
      boxShadow: '0 1px 2px rgba(1,40,36,0.04)', border: '1px solid #ECECE4',
      animation: `pm-row-in 500ms cubic-bezier(.2,.6,.2,1) ${delay}ms both`,
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono', fontSize: 9.5, fontWeight: 500,
        color: '#9CA3AF', letterSpacing: '0.18em', textTransform: 'uppercase',
        marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 500,
        color: accent || '#012824', letterSpacing: '-0.02em', lineHeight: 1,
      }}>{value}</div>
      {sub && <div style={{
        fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: '#9CA3AF', marginTop: 7,
      }}>{sub}</div>}
    </div>
  );
}
const KPI_ROW = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 };

function Chip({ children, bg, fg }) {
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px', borderRadius: 999,
      background: bg, color: fg,
      fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 500,
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function Panel({ title, children, action, pad = '16px 18px' }) {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 8, padding: pad,
      boxShadow: '0 1px 2px rgba(1,40,36,0.04)', border: '1px solid #ECECE4',
    }}>
      {title && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <div style={{
            fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 600, color: '#012824',
          }}>{title}</div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

/* ─── SCREEN: Monitor (week strip + agenda) ─── */
function ScreenMonitor({ accent }) {
  const week = [
    { d: 'SEG', n: '13', count: 7, urgent: 2 },
    { d: 'TER', n: '14', count: 4, urgent: 0 },
    { d: 'QUA', n: '15', count: 9, urgent: 1 },
    { d: 'QUI', n: '16', count: 3, urgent: 0 },
    { d: 'SEX', n: '17', count: 6, urgent: 0 },
    { d: 'SÁB', n: '18', count: 1, urgent: 0 },
    { d: 'DOM', n: '19', count: 0, urgent: 0 },
  ];
  const items = [
    { hour: '09h00', proc: '1004421-58.2024.8.26', tag: 'Contestação', forum: 'TJ — 12ª Cível', risk: 'crítico' },
    { hour: '14h30', proc: '0823177-12.2023.4.03', tag: 'Manifestação', forum: 'TRF — 4ª Turma', risk: 'alto' },
    { hour: '17h00', proc: '1010993-04.2024.8.13', tag: 'Réplica',      forum: 'TJ — 5ª Cível',  risk: 'crítico' },
  ];
  const rc = { 'crítico': '#A8323F', 'alto': '#C97444', 'médio': '#7A6840', 'baixo': '#3C6E5C' };
  const rb = { 'crítico': '#FCEBEE', 'alto': '#FBEEE3', 'médio': '#F5F1E3', 'baixo': '#E8F1EC' };
  return (
    <>
      <div style={KPI_ROW}>
        <KPI label="Prazos hoje"     value="7"   accent="#A8323F" sub="2 críticos" delay={0} />
        <KPI label="Próximos 7 dias" value="34"                   sub="distribuídos" delay={60} />
        <KPI label="Em atraso"       value="0"   accent="#3C6E5C" sub="zero perdas" delay={120} />
        <KPI label="Andamentos 24h"  value="218"                  sub="capturados" delay={180} />
      </div>
      <Panel title="Semana — 13 a 19 nov" action={
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#9CA3AF', letterSpacing: '0.14em' }}>VOLUME ↓</div>
      }>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 16 }}>
          {week.map((w, i) => (
            <div key={i} style={{
              padding: 10, borderRadius: 6,
              background: i === 0 ? '#012824' : '#F8F8F2',
              color: i === 0 ? '#ECEFF3' : '#012824',
              animation: `pm-row-in 480ms cubic-bezier(.2,.6,.2,1) ${i * 40}ms both`,
            }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, opacity: 0.6, letterSpacing: '0.18em' }}>{w.d}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 600, marginTop: 2, marginBottom: 6 }}>{w.n}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 600 }}>{w.count}</span>
                {w.urgent > 0 && <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: i === 0 ? accent : '#A8323F' }}>!{w.urgent}</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono', fontSize: 10, color: '#9CA3AF', letterSpacing: '0.18em',
          textTransform: 'uppercase', marginBottom: 10,
        }}>SEGUNDA · 13 NOV — 7 PRAZOS</div>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '64px 1fr 110px 130px',
            gap: 14, alignItems: 'center', padding: '10px 0',
            borderTop: i > 0 ? '1px solid #F2F2EA' : 'none',
            animation: `pm-row-in 500ms cubic-bezier(.2,.6,.2,1) ${300 + i * 80}ms both`,
          }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: rc[it.risk], fontWeight: 600 }}>{it.hour}</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#012824' }}>{it.proc}</span>
            <Chip bg={rb[it.risk]} fg={rc[it.risk]}>{it.tag}</Chip>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: '#4A545E' }}>{it.forum}</span>
          </div>
        ))}
      </Panel>
    </>
  );
}

/* ─── SCREEN: Captura (live activity feed + bots) ─── */
function ScreenCaptura({ accent }) {
  const bots = [
    { tj: 'TJSP',  status: 'rodando',  pct: 78, found: 142 },
    { tj: 'TRF3',  status: 'rodando',  pct: 64, found: 38  },
    { tj: 'TJMG',  status: 'rodando',  pct: 91, found: 51  },
    { tj: 'TJRJ',  status: 'completo', pct: 100, found: 81 },
  ];
  const feed = [
    { tj: 'TJSP', proc: '1004421-58.2024.8.26', area: 'Cível',       valor: 'R$ 248.500',   t: 'há 12s' },
    { tj: 'TRF3', proc: '5009817-22.2024.4.03', area: 'Tributário',  valor: 'R$ 1.240.000', t: 'há 38s' },
    { tj: 'TJMG', proc: '1010993-04.2024.8.13', area: 'Consumidor',  valor: 'R$ 89.700',    t: 'há 1min' },
    { tj: 'TJSP', proc: '0008822-91.2024.8.19', area: 'Trabalhista', valor: 'R$ 412.000',   t: 'há 2min' },
  ];
  return (
    <>
      <div style={KPI_ROW}>
        <KPI label="Capturados 24h" value="312" accent={accent}  sub="varredura completa" delay={0} />
        <KPI label="Aguardando"     value="48"                   sub="para cadastro" delay={60} />
        <KPI label="Cadastrados"    value="251" accent="#3C6E5C" sub="entrou na esteira" delay={120} />
        <KPI label="Pendências"     value="13"  accent="#A8323F" sub="dados incompletos" delay={180} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 12 }}>
        <Panel title="Robôs ativos" action={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono', fontSize: 10, color: accent, letterSpacing: '0.14em' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'pm-pulse 1600ms ease-in-out infinite' }} />
            VARRENDO
          </div>
        }>
          {bots.map((b, i) => (
            <div key={i} style={{
              marginBottom: i < bots.length - 1 ? 14 : 0,
              animation: `pm-row-in 500ms cubic-bezier(.2,.6,.2,1) ${i * 70}ms both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono', fontSize: 11, color: '#012824',
                    fontWeight: 600, letterSpacing: '0.06em',
                  }}>{b.tj}</span>
                  <span style={{
                    fontFamily: 'JetBrains Mono', fontSize: 9, color: b.status === 'completo' ? '#3C6E5C' : accent,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                  }}>{b.status}</span>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#012824' }}>+{b.found}</span>
              </div>
              <div style={{ height: 4, background: '#ECECE4', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', background: b.status === 'completo' ? '#3C6E5C' : accent,
                  width: `${b.pct}%`,
                  animation: `pm-bar-fill 900ms cubic-bezier(.2,.6,.2,1) ${100 + i * 70}ms both`,
                }} />
              </div>
            </div>
          ))}
        </Panel>
        <Panel title="Feed de captura" action={
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#9CA3AF', letterSpacing: '0.14em' }}>312 HOJE</span>
        }>
          {feed.map((it, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '44px 1fr 80px 60px', gap: 10,
              alignItems: 'center', padding: '9px 0',
              borderTop: i > 0 ? '1px solid #F2F2EA' : 'none',
              animation: `pm-row-in 500ms cubic-bezier(.2,.6,.2,1) ${i * 80}ms both`,
            }}>
              <Chip bg={`${accent}22`} fg={accent}>{it.tj}</Chip>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10.5, color: '#012824' }}>{it.proc}</span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10.5, color: '#012824', textAlign: 'right' }}>{it.valor}</span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#9CA3AF', textAlign: 'right' }}>{it.t}</span>
            </div>
          ))}
        </Panel>
      </div>
    </>
  );
}

/* ─── SCREEN: Triagem (Subsídios) — mirrors the Estoque screenshot ─── */
function ScreenTriagem({ accent }) {
  const composition = [
    { label: 'Consignado', pct: 58.6, color: '#012824' },
    { label: 'Cesta',      pct: 28.6, color: '#075056' },
    { label: 'Contas',     pct: 12.8, color: '#5C9094' },
  ];
  const rows = [
    { num: 'TAR-001777', gcpj: '2500992668', prod: 'Contas',     status: 'A iniciar',   ana: 'não atribuído', dias: '156d' },
    { num: 'TAR-013151', gcpj: '2501016699', prod: 'Contas',     status: 'A iniciar',   ana: 'Gabriela T.',   dias: '84d' },
    { num: 'TAR-023596', gcpj: '2600216536', prod: 'Consignado', status: 'A iniciar',   ana: 'não atribuído', dias: '59d' },
    { num: 'TAR-026477', gcpj: '2600246553', prod: 'Consignado', status: 'Em andamento', ana: 'Carla M.',     dias: '51d' },
  ];
  const ss = {
    'A iniciar':    { bg: '#E8F1EC', fg: '#3C6E5C' },
    'Em andamento': { bg: '#E4ECF4', fg: '#3460A0' },
  };
  return (
    <>
      <div style={KPI_ROW}>
        <KPI label="Tarefas no estoque" value="185"                  delay={0} />
        <KPI label="A iniciar"          value="162" accent="#A8323F" delay={60} />
        <KPI label="Em andamento"       value="20"                   delay={120} />
        <KPI label="Sem analista"       value="160" accent="#C97444" delay={180} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginBottom: 12 }}>
        <Panel title="Composição do estoque por produto">
          <div style={{
            height: 10, borderRadius: 999, overflow: 'hidden',
            display: 'flex', background: '#ECECE4', marginBottom: 12,
          }}>
            {composition.map((c, i) => (
              <div key={i} style={{
                width: `${c.pct}%`, background: c.color,
                animation: `pm-bar-fill 800ms cubic-bezier(.2,.6,.2,1) ${i * 80}ms both`,
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {composition.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.color }} />
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: '#4A545E' }}>{c.label}</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11.5, color: '#012824', fontWeight: 600 }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Fila por estágio">
          {[
            { l: 'Pré-análise',      v: 165, pct: 88 },
            { l: 'Análise produto',  v: 18,  pct: 18 },
            { l: 'Análise cadastro', v: 1,   pct: 4 },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 8 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: '#4A545E' }}>{s.l}</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11.5, fontWeight: 600, color: '#012824' }}>{s.v}</span>
              </div>
              <div style={{ height: 4, background: '#ECECE4', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', background: accent, width: `${s.pct}%`,
                  animation: `pm-bar-fill 800ms cubic-bezier(.2,.6,.2,1) ${100 + i * 80}ms both`,
                }} />
              </div>
            </div>
          ))}
        </Panel>
      </div>
      <Panel title="Tarefas em estoque">
        <div style={{ display: 'grid', gridTemplateColumns: '110px 100px 120px 110px 1fr 70px', gap: 12, padding: '0 4px 8px', borderBottom: '1px solid #ECECE4', marginBottom: 4 }}>
          {['Número', 'GCPJ', 'Produto', 'Status', 'Analista', 'Criada'].map((h, i) => (
            <span key={i} style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, color: '#9CA3AF', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '110px 100px 120px 110px 1fr 70px', gap: 12,
            alignItems: 'center', padding: '10px 4px',
            borderBottom: i < rows.length - 1 ? '1px solid #F2F2EA' : 'none',
            animation: `pm-row-in 500ms cubic-bezier(.2,.6,.2,1) ${i * 80}ms both`,
          }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#012824', fontWeight: 500 }}>{r.num}</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#4A545E' }}>{r.gcpj}</span>
            <span><Chip bg="#E8F1EC" fg={accent}>{r.prod}</Chip></span>
            <span><Chip bg={ss[r.status].bg} fg={ss[r.status].fg}>{r.status}</Chip></span>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: r.ana === 'não atribuído' ? '#9CA3AF' : '#012824', fontStyle: r.ana === 'não atribuído' ? 'italic' : 'normal' }}>{r.ana}</span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10.5, color: '#9CA3AF' }}>há {r.dias}</span>
          </div>
        ))}
      </Panel>
    </>
  );
}

/* ─── SCREEN: Laudos — document editor with real legal report preview ─── */
function ScreenLaudos({ accent }) {
  const queue = [
    { n: 'LAU-2026-0481', prio: 'alta',    type: 'Avaliação',  pct: 72, st: 'gerando' },
    { n: 'LAU-2026-0480', prio: 'média',   type: 'Risco',      pct: 48, st: 'gerando' },
    { n: 'LAU-2026-0479', prio: 'média',   type: 'Defesa',     pct: 32, st: 'gerando' },
    { n: 'LAU-2026-0478', prio: 'baixa',   type: 'Avaliação',  pct: 14, st: 'aguarda' },
  ];
  const sections = [
    { n: 'I',   t: 'Histórico processual',     done: true,  conf: 98 },
    { n: 'II',  t: 'Análise documental',       done: true,  conf: 96 },
    { n: 'III', t: 'Fundamentação jurídica',   done: true,  conf: 91 },
    { n: 'IV',  t: 'Cálculo de exposição',     done: false, conf: 0  },
    { n: 'V',   t: 'Conclusão e recomendação', done: false, conf: 0  },
  ];
  return (
    <>
      <div style={KPI_ROW}>
        <KPI label="Em geração"   value="9"   accent={accent}  sub="laudos ativos" delay={0} />
        <KPI label="Para revisão" value="5"                    sub="ok do gestor" delay={60} />
        <KPI label="Entregues"    value="42"  accent="#3C6E5C" sub="esta semana"  delay={120} />
        <KPI label="Tempo médio"  value="2h"                   sub="por laudo"    delay={180} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 12 }}>
        {/* left: queue */}
        <Panel title="Fila" pad="14px 14px">
          {queue.map((q, i) => (
            <div key={i} style={{
              padding: '10px 10px', borderRadius: 6, marginBottom: i < 3 ? 6 : 0,
              background: i === 0 ? `${accent}14` : '#F8F8F2',
              border: i === 0 ? `1px solid ${accent}55` : '1px solid transparent',
              animation: `pm-row-in 500ms cubic-bezier(.2,.6,.2,1) ${i * 70}ms both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10.5, color: '#012824', fontWeight: 600 }}>{q.n}</span>
                <span style={{
                  fontFamily: 'JetBrains Mono', fontSize: 9, color: q.prio === 'alta' ? '#A8323F' : q.prio === 'média' ? '#C97444' : '#3C6E5C',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>{q.prio}</span>
              </div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: '#4A545E', marginBottom: 8 }}>{q.type}</div>
              <div style={{ height: 3, background: '#ECECE4', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', background: q.st === 'aguarda' ? '#9CA3AF' : accent, width: `${q.pct}%`,
                  animation: `pm-bar-fill 900ms cubic-bezier(.2,.6,.2,1) ${100 + i * 70}ms both`,
                }} />
              </div>
            </div>
          ))}
        </Panel>
        {/* right: laudo document + sections */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
          {/* the legal report document */}
          <div style={{
            background: '#FFFFFF', borderRadius: 8,
            boxShadow: '0 1px 2px rgba(1,40,36,0.04)', border: '1px solid #ECECE4',
            padding: '20px 24px', position: 'relative', minHeight: 360,
          }}>
            {/* doc header */}
            <div style={{
              borderBottom: '2px solid #012824', paddingBottom: 10, marginBottom: 14,
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono', fontSize: 9, color: '#9CA3AF',
                letterSpacing: '0.2em', marginBottom: 2,
              }}>LAU-2026-0481 · GERADO POR SBK IA</div>
              <div style={{
                fontFamily: 'Tiempos, serif', fontSize: 15, fontWeight: 500,
                color: '#012824', letterSpacing: '-0.005em',
              }}>Laudo Técnico Jurídico</div>
              <div style={{
                fontFamily: 'Tiempos, serif', fontSize: 11, fontStyle: 'italic',
                color: '#4A545E', marginTop: 2,
              }}>Avaliação de exposição — Proc. 1004421-58.2024.8.26</div>
            </div>
            {/* doc body */}
            <div style={{
              fontFamily: 'Tiempos, "Plus Jakarta Sans", serif', fontSize: 9.5, fontWeight: 400,
              color: '#1F2937', lineHeight: 1.55,
            }}>
              <div style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 8.5, fontWeight: 700, color: '#012824',
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4,
              }}>I. Histórico processual</div>
              <p style={{ margin: '0 0 8px' }}>
                Trata-se de ação <em>indenizatória</em> ajuizada em 12 de março de 2024, com pedido de reparação por danos materiais e morais decorrentes de relação contratual celebrada em 2021. Valor da causa fixado em R$ 248.500,00.
              </p>
              <div style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 8.5, fontWeight: 700, color: '#012824',
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4, marginTop: 10,
              }}>II. Análise documental</div>
              <p style={{ margin: '0 0 8px' }}>
                Foram analisados <strong>12 documentos</strong> juntados aos autos, incluindo contrato original, comprovantes de pagamento e correspondência entre as partes. A documentação apresenta-se íntegra e suficiente para fundamentação técnica.
              </p>
              <div style={{
                fontFamily: 'Plus Jakarta Sans', fontSize: 8.5, fontWeight: 700, color: '#012824',
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4, marginTop: 10,
              }}>III. Fundamentação jurídica</div>
              <p style={{ margin: 0 }}>
                A jurisprudência consolidada do STJ — <em>REsp 1.737.412/SP</em>, Tema 982 — orienta que, em situações análogas, a responsabilidade civil é mitigada quando comprovada a <span style={{ background: '#FBF3DC' }}>boa-fé objetiva</span> e a observância dos deveres de informação...
              </p>
              {/* cursor for currently generating section */}
              <div style={{
                marginTop: 12,
                fontFamily: 'JetBrains Mono', fontSize: 9, color: accent,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: accent,
                  animation: 'pm-pulse 1400ms ease-in-out infinite',
                }} />
                IA redigindo seção IV…
              </div>
            </div>
            {/* watermark */}
            <div style={{
              position: 'absolute', top: 14, right: 18,
              fontFamily: 'JetBrains Mono', fontSize: 8, color: '#9CA3AF',
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>Pág. 1 / 4</div>
          </div>
          {/* sections checklist */}
          <Panel title="Seções do laudo" pad="14px 14px">
            {sections.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '8px 0',
                borderTop: i > 0 ? '1px solid #F2F2EA' : 'none',
                animation: `pm-row-in 500ms cubic-bezier(.2,.6,.2,1) ${i * 70}ms both`,
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%',
                  display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1,
                  background: s.done ? '#3C6E5C' : (i === 3 ? accent : '#ECECE4'),
                  color: s.done || i === 3 ? '#FFF' : '#9CA3AF',
                  fontFamily: 'JetBrains Mono', fontSize: 9, fontWeight: 700,
                }}>{s.done ? '✓' : s.n}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, fontWeight: 500,
                    color: '#012824', lineHeight: 1.3,
                  }}>{s.t}</div>
                  {s.done && (
                    <div style={{
                      fontFamily: 'JetBrains Mono', fontSize: 9, color: '#3C6E5C',
                      letterSpacing: '0.1em', marginTop: 2,
                    }}>{s.conf}% confiança</div>
                  )}
                  {i === 3 && (
                    <div style={{
                      fontFamily: 'JetBrains Mono', fontSize: 9, color: accent,
                      letterSpacing: '0.1em', marginTop: 2,
                    }}>redigindo…</div>
                  )}
                </div>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </>
  );
}

/* ─── SCREEN: Ofícios (queue + SLA alert) ─── */
function ScreenOficios({ accent }) {
  const rows = [
    { num: 'OF-2026-18472', tipo: 'Cumprimento',      origem: 'Vara Cível — 12ª',  prazo: '24 h',    status: 'a responder' },
    { num: 'OF-2026-21033', tipo: 'Quebra de sigilo', origem: 'Vara Federal — 3ª', prazo: '3 dias',  status: 'em redação' },
    { num: 'OF-2026-22591', tipo: 'Bloqueio',         origem: 'Vara Cível — 7ª',   prazo: '5 dias',  status: 'validação' },
    { num: 'OF-2026-19874', tipo: 'Informações',      origem: 'Vara do Trabalho',  prazo: '10 dias', status: 'enviado' },
  ];
  const ss = {
    'a responder': { bg: '#FCEBEE', fg: '#A8323F' },
    'em redação':  { bg: '#FBF3DC', fg: '#7A6840' },
    'validação':   { bg: '#E4ECF4', fg: '#3460A0' },
    'enviado':     { bg: '#E8F1EC', fg: '#3C6E5C' },
  };
  return (
    <>
      <div style={KPI_ROW}>
        <KPI label="A responder"   value="14" accent={accent}   sub="2 vencendo hoje" delay={0} />
        <KPI label="Em redação"    value="9"                    sub="rascunho IA"    delay={60} />
        <KPI label="Em validação"  value="5"                    sub="aguardando ok"  delay={120} />
        <KPI label="Enviados hoje" value="23" accent="#3C6E5C"  sub="dentro do SLA"  delay={180} />
      </div>
      <div style={{
        background: '#FCEBEE', border: '1px solid #F5D2D8', borderRadius: 8,
        padding: '12px 16px', marginBottom: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        animation: 'pm-row-in 500ms cubic-bezier(.2,.6,.2,1) both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 20, height: 20, borderRadius: '50%', background: accent,
            color: '#FFF', display: 'grid', placeItems: 'center',
            fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 700,
          }}>!</span>
          <span style={{
            fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 600, color: accent,
          }}>2 ofícios com prazo vencendo nas próximas 4 horas</span>
        </div>
        <div style={{
          padding: '6px 14px', borderRadius: 6,
          background: '#E66B3C', color: '#FFF',
          fontFamily: 'Plus Jakarta Sans', fontSize: 12, fontWeight: 500,
        }}>Priorizar agora</div>
      </div>
      <Panel title="Fila de ofícios">
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 90px 120px', gap: 14, padding: '0 4px 8px', borderBottom: '1px solid #ECECE4', marginBottom: 4 }}>
          {['Número', 'Tipo', 'Origem', 'Prazo', 'Status'].map((h, i) => (
            <span key={i} style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, color: '#9CA3AF', letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: i >= 3 ? 'right' : 'left' }}>{h}</span>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '140px 1fr 1fr 90px 120px', gap: 14,
            alignItems: 'center', padding: '11px 4px',
            borderBottom: i < rows.length - 1 ? '1px solid #F2F2EA' : 'none',
            animation: `pm-row-in 500ms cubic-bezier(.2,.6,.2,1) ${i * 90}ms both`,
          }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#012824', fontWeight: 500 }}>{r.num}</span>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: '#012824' }}>{r.tipo}</span>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: '#4A545E' }}>{r.origem}</span>
            <span style={{ textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: 11.5, color: r.prazo === '24 h' ? accent : '#012824', fontWeight: 500 }}>{r.prazo}</span>
            <span style={{ textAlign: 'right' }}>
              <Chip bg={ss[r.status].bg} fg={ss[r.status].fg}>{r.status}</Chip>
            </span>
          </div>
        ))}
      </Panel>
    </>
  );
}

window.ProductMockup = ProductMockup;
