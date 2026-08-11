import type { Proposal } from '@/data/proposals';
import { PROPOSAL_STRINGS } from '@/lib/proposalStrings';
import ScopeTree from './ScopeTree';

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
  const t = PROPOSAL_STRINGS[proposal.language ?? 'en'];
  const sitemap = proposal.sitemap?.length ? proposal.sitemap : t.sitemapDefault;
  const scope = proposal.scope ?? t.scopeDefault;
  const process = proposal.process?.length ? proposal.process : t.processDefault;
  const afterLaunchNote = proposal.afterLaunchNote ?? t.afterLaunchDefault;
  const acceptingTerms = proposal.acceptingTerms ?? t.acceptingTermsDefault;
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
        <div className="proposal_kicker">{t.kicker}</div>
      </div>

      <div className="proposal_body">
        <div className="proposal_row proposal_meta-row">
          <div className="proposal_label">{t.for}</div>
          <div className="proposal_value">{proposal.clientName}</div>
        </div>

        <div className="proposal_row proposal_meta-row proposal_row--tight-gap">
          <div className="proposal_label">{t.from}</div>
          <div className="proposal_value">vitor ono</div>
        </div>

        <div className="proposal_row">
          <div className="proposal_label">{t.project}</div>
          <div className="proposal_value">{proposal.projectDescription}</div>
        </div>

        <div className="proposal_row proposal_row--section-gap">
          <div className="proposal_label">{t.scopeLabel}</div>
          <div className="proposal_value">
            <ScopeTree items={sitemap} label={t.sitemapButton} />
            <div className="proposal_scope-note">{scope}</div>
          </div>
        </div>

        <div className="proposal_row proposal_row--section-gap">
          <div className="proposal_label">{t.howItRuns}</div>
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
          <div className="proposal_label">{t.afterLaunch}</div>
          <div className="proposal_value proposal_link-list proposal_link-list--right">
            <div>{afterLaunchNote}</div>
            <BracketLink href={CARE_PLANS_URL} external>
              {t.viewCarePlans}
            </BracketLink>
          </div>
        </div>

        {myWork.length > 0 && (
          <div className="proposal_row proposal_row--section-gap">
            <div className="proposal_label">{t.myWork}</div>
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
        <div className="proposal_section-title">{t.investmentTitle}</div>
        {proposal.investmentValue && (
          <div className="proposal_investment-amount">{proposal.investmentValue}.</div>
        )}
        <div className="proposal_section-body">{proposal.investmentDescription}</div>
      </div>

      <div className="proposal_section">
        <div className="proposal_section-title">{t.timelineTitle}</div>
        <div className="proposal_section-body">{proposal.timeline}</div>
      </div>

      <div className="proposal_body proposal_body--closing">
        <div className="proposal_row">
          <div className="proposal_label proposal_label--caps">{t.acceptingTerms}</div>
          <div className="proposal_value proposal_link-list proposal_link-list--right">
            <div>{acceptingTerms}</div>
            <BracketLink href="mailto:work@vitorono.com">{t.replyToAccept}</BracketLink>
          </div>
        </div>
      </div>
    </div>
  );
}
