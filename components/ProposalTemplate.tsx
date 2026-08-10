import type { Proposal, ProcessStep, SitemapItem } from '@/data/proposals';
import ScopeTree from './ScopeTree';

// Fallbacks for proposals created before these Sanity fields existed.
const SITEMAP_DEFAULT: SitemapItem[] = [
  { path: 'home/', depth: 0 },
  { path: 'about-us/', depth: 0 },
  { path: 'projects/', depth: 0 },
  { path: 'projects/item:', depth: 1 },
  { path: 'contact/', depth: 0 },
];

const SCOPE_DEFAULT = [
  'One CMS collection for your projects, considered motion and interaction across the site, on-page SEO, native Framer analytics, and responsive layouts for desktop, tablet, and mobile.',
  'The whole thing is designed and built in Framer as a single act, by one person. There is no handoff between a designer and a developer, so the art direction that gets approved is the art direction that ships.',
  'Full scope, including what sits outside it, is defined in the Statement of Work.',
].join('\n\n');

const PROCESS_DEFAULT: ProcessStep[] = [
  { title: 'Kickoff', description: 'Scope is fixed and the timeline is set.' },
  {
    title: 'Direction',
    description:
      'I design the home page first. You review type, layout, motion, and art direction here, because this decision carries across the whole site.',
  },
  { title: 'Build', description: 'The full site goes up with your content in place. You review how it coheres.' },
  { title: 'Launch', description: 'A final tightening pass, then the site goes live and transfers to you.' },
];

const AFTER_LAUNCH_DEFAULT =
  'Every build includes one month of the Essentials care plan, free, starting at handoff. Care keeps the site current, so your showcase never falls behind the work it exists to present.';

const ACCEPTING_TERMS_DEFAULT =
  'If this works for you, reply and I will send the Statement of Work: the operating agreement with the full terms, scope detail, and schedule.\n\nYou sign it, the deposit invoice goes out, and we book the kickoff.';

const CARE_PLANS_URL = '#';

function BracketLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="proposal_bracket-button"
    >
      <span>[ {children}</span>
      <span>]</span>
    </a>
  );
}

export default function ProposalTemplate({ proposal }: { proposal: Proposal }) {
  const sitemap = proposal.sitemap?.length ? proposal.sitemap : SITEMAP_DEFAULT;
  const scope = proposal.scope ?? SCOPE_DEFAULT;
  const process = proposal.process?.length ? proposal.process : PROCESS_DEFAULT;
  const afterLaunchNote = proposal.afterLaunchNote ?? AFTER_LAUNCH_DEFAULT;
  const acceptingTerms = proposal.acceptingTerms ?? ACCEPTING_TERMS_DEFAULT;
  const myWork = (proposal.myWork ?? []).filter((item): item is NonNullable<typeof item> =>
    Boolean(item?.url)
  );

  return (
    <div className="proposal_page">
      <header className="proposal_header">
        <img src="/images/vitorono_type.webp" alt="Vitor Ono" className="proposal_logo" />
        <img src="/images/symbol-white.svg" alt="" aria-hidden="true" className="proposal_symbol" />
      </header>

      <div className="proposal_title-row">
        <div className="proposal_project-name">{proposal.clientCompany ?? proposal.clientName}</div>
        <div className="proposal_kicker">PROJECT PROPOSAL</div>
      </div>

      <div className="proposal_body">
        <div className="proposal_row proposal_meta-row">
          <div className="proposal_label">for</div>
          <div className="proposal_value">{proposal.clientName}</div>
        </div>

        <div className="proposal_row proposal_meta-row proposal_row--tight-gap">
          <div className="proposal_label">from</div>
          <div className="proposal_value">vitor ono</div>
        </div>

        <div className="proposal_row">
          <div className="proposal_label">project</div>
          <div className="proposal_value">{proposal.projectDescription}</div>
        </div>

        <div className="proposal_row proposal_row--section-gap">
          <div className="proposal_label">scope</div>
          <div className="proposal_value">
            <ScopeTree items={sitemap} />
            <div className="proposal_scope-note">{scope}</div>
          </div>
        </div>

        <div className="proposal_row proposal_row--section-gap">
          <div className="proposal_label">how the work runs</div>
          <div className="proposal_value">
            <ol className="proposal_process-list">
              {process.map((step, i) => (
                <li key={step.title} className="proposal_process-item">
                  <div className="proposal_process-title">
                    .{String(i + 1).padStart(2, '0')} {step.title}
                  </div>
                  <div className="proposal_process-description">{step.description}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="proposal_row proposal_row--section-gap">
          <div className="proposal_label">after launch</div>
          <div className="proposal_value proposal_link-list proposal_link-list--right">
            <div>{afterLaunchNote}</div>
            <BracketLink href={CARE_PLANS_URL} external>
              view care plans
            </BracketLink>
          </div>
        </div>

        {myWork.length > 0 && (
          <div className="proposal_row proposal_row--section-gap">
            <div className="proposal_label">my work</div>
            <div className="proposal_value proposal_link-list">
              {myWork.map((item) => (
                <BracketLink key={item.url} href={item.url!} external>
                  {item.name}
                </BracketLink>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="proposal_section">
        <div className="proposal_section-title">INVESTMENT</div>
        {proposal.investmentValue && (
          <div className="proposal_investment-amount">{proposal.investmentValue}.</div>
        )}
        <div className="proposal_section-body">{proposal.investmentDescription}</div>
      </div>

      <div className="proposal_section">
        <div className="proposal_section-title">TIMELINE</div>
        <div className="proposal_section-body">{proposal.timeline}</div>
      </div>

      <div className="proposal_body proposal_body--closing">
        <div className="proposal_row">
          <div className="proposal_label proposal_label--caps">accepting terms</div>
          <div className="proposal_value proposal_link-list proposal_link-list--right">
            <div>{acceptingTerms}</div>
            <BracketLink href="mailto:work@vitorono.com">reply email to accept</BracketLink>
          </div>
        </div>
      </div>
    </div>
  );
}
