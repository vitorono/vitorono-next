import type { ProposalLanguage, SitemapItem, ProcessStep } from '@/data/proposals';

interface ProposalStrings {
  kicker: string;
  for: string;
  from: string;
  project: string;
  scopeLabel: string;
  sitemapButton: string;
  howItRuns: string;
  afterLaunch: string;
  myWork: string;
  viewCarePlans: string;
  investmentTitle: string;
  timelineTitle: string;
  acceptingTerms: string;
  replyToAccept: string;
  sitemapDefault: SitemapItem[];
  scopeDefault: string;
  processDefault: ProcessStep[];
  afterLaunchDefault: string;
  acceptingTermsDefault: string;
}

export const PROPOSAL_STRINGS: Record<ProposalLanguage, ProposalStrings> = {
  en: {
    kicker: 'PROJECT PROPOSAL',
    for: 'for',
    from: 'from',
    project: 'project',
    scopeLabel: 'scope',
    sitemapButton: 'sitemap',
    howItRuns: 'how the work runs',
    afterLaunch: 'after launch',
    myWork: 'my work',
    viewCarePlans: 'view care plans',
    investmentTitle: 'INVESTMENT',
    timelineTitle: 'TIMELINE',
    acceptingTerms: 'accepting terms',
    replyToAccept: 'reply email to accept',
    sitemapDefault: [
      { path: 'home/', depth: 0 },
      { path: 'about-us/', depth: 0 },
      { path: 'projects/', depth: 0 },
      { path: 'projects/item:', depth: 1 },
      { path: 'contact/', depth: 0 },
    ],
    scopeDefault: [
      'One CMS collection for your projects, considered motion and interaction across the site, on-page SEO, native Framer analytics, and responsive layouts for desktop, tablet, and mobile.',
      'The whole thing is designed and built in Framer as a single act, by one person. There is no handoff between a designer and a developer, so the art direction that gets approved is the art direction that ships.',
      'Full scope, including what sits outside it, is defined in the Statement of Work.',
    ].join('\n\n'),
    processDefault: [
      { title: 'Kickoff', description: 'Scope is fixed and the timeline is set.' },
      {
        title: 'Direction',
        description:
          'I design the home page first. You review type, layout, motion, and art direction here, because this decision carries across the whole site.',
      },
      {
        title: 'Build',
        description: 'The full site goes up with your content in place. You review how it coheres.',
      },
      { title: 'Launch', description: 'A final tightening pass, then the site goes live and transfers to you.' },
    ],
    afterLaunchDefault:
      'Every build includes one month of care plan, free, starting at handoff. Care guarantees your maintanence, your site runs smoothly and your showcase never falls behind the work it exists to present.',
    acceptingTermsDefault:
      'If this works for you, reply and I will send the Statement of Work: the operating agreement with the full terms, scope detail, and schedule.\n\nYou sign it, the deposit invoice goes out, and we book the kickoff.',
  },
  'pt-BR': {
    kicker: 'PROPOSTA DE PROJETO',
    for: 'para',
    from: 'de',
    project: 'projeto',
    scopeLabel: 'escopo',
    sitemapButton: 'mapa do site',
    howItRuns: 'como funciona',
    afterLaunch: 'pós-lançamento',
    myWork: 'meus trabalhos',
    viewCarePlans: 'ver planos de manutenção',
    investmentTitle: 'INVESTIMENTO',
    timelineTitle: 'CRONOGRAMA',
    acceptingTerms: 'aceite dos termos',
    replyToAccept: 'responder e-mail para aceitar',
    sitemapDefault: [
      { path: 'inicio/', depth: 0 },
      { path: 'sobre-nos/', depth: 0 },
      { path: 'projetos/', depth: 0 },
      { path: 'projetos/item:', depth: 1 },
      { path: 'contato/', depth: 0 },
    ],
    scopeDefault: [
      'Uma coleção de CMS para os seus projetos, movimento e interação pensados em todo o site, SEO on-page, analytics nativo do Framer, e layouts responsivos para desktop, tablet e mobile.',
      'Tudo é desenhado e construído no Framer em um único processo, por uma pessoa só. Não há repasse entre um designer e um desenvolvedor, então a direção de arte aprovada é a direção de arte que vai ao ar.',
      'O escopo completo, incluindo o que fica de fora dele, está definido no Contrato de Serviço.',
    ].join('\n\n'),
    processDefault: [
      { title: 'Kickoff', description: 'O escopo é fechado e o cronograma é definido.' },
      {
        title: 'Direção',
        description:
          'Eu desenho a home page primeiro. Você revisa tipografia, layout, movimento e direção de arte aqui, porque essa decisão se repete pelo site inteiro.',
      },
      {
        title: 'Construção',
        description: 'O site inteiro sobe com o seu conteúdo. Você revisa como tudo se encaixa.',
      },
      { title: 'Lançamento', description: 'Um ajuste final, e então o site vai ao ar e é transferido para você.' },
    ],
    afterLaunchDefault:
      'Todo projeto inclui um mês do plano de cuidado, gratuito, a partir da entrega. O cuidado garante a manutenção do site, para que ele rode no 100%, sua vitrine nunca fica atrás do trabalho que ela existe para apresentar.',
    acceptingTermsDefault:
      'Se isso funcionar para você, responda que eu envio o Contrato de Serviço: o acordo com todos os termos, detalhes de escopo e cronograma.\n\nVocê assina, a fatura do sinal é enviada, e agendamos o kickoff.',
  },
};
