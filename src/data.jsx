/* global React */
// Shared data: ecosystem modules

const ECOSYSTEM_MODULES = [
  { id: 'pre-judicial', label: 'Pré-judicial', short: 'Pré-judicial',
    desc: 'Monitoramento de Procon e Reclame Aqui antes do litígio.',
    tier: 'sbk' },
  { id: 'captura', label: 'Captura', short: 'Captura',
    desc: 'Captura de processos judiciais antes da citação, ganhando tempo de resposta.',
    tier: 'both' },
  { id: 'cadastro', label: 'Cadastro', short: 'Cadastro',
    desc: 'Recebe iniciais capturadas (SBK ou terceiros) e publica padronizado no ERP jurídico do cliente.',
    tier: 'sbk' },
  { id: 'monitoramento', label: 'Movimentações', short: 'Movimentações',
    desc: 'Acompanhamento de movimentações e peças processuais em todos os tribunais do Brasil.',
    tier: 'both' },
  { id: 'subsidios', label: 'Subsídios e Laudos', short: 'Subsídios e Laudos',
    desc: 'Busca padronizada e motor de geração automática de laudos técnicos.',
    tier: 'sbk' },
  { id: 'oficios', label: 'Ofícios', short: 'Ofícios',
    desc: 'Gestão ponta a ponta de ofícios judiciais, com SLA de 30 minutos.',
    tier: 'sbk' },
  { id: 'obrigacoes', label: 'Obrigações de Fazer', short: 'Obrigações de Fazer',
    desc: 'Controle de valores e prazos de obrigações de fazer e não-fazer.',
    tier: 'sbk' },
  { id: 'firmas', label: 'Firmas e Poderes', short: 'Firmas e Poderes',
    desc: 'Validação automática de vigência societária e poderes de representação.',
    tier: 'both' },
];

const ANALYTICS_MODULE = {
  id: 'analytics', label: 'Analytics', short: 'Analytics',
  desc: 'Núcleo de inteligência. Retroalimenta todos os módulos com jurimetria.',
  tier: 'core',
};

window.ECOSYSTEM_MODULES = ECOSYSTEM_MODULES;
window.ANALYTICS_MODULE = ANALYTICS_MODULE;
