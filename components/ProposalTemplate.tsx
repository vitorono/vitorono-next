import type { Proposal } from '@/data/proposals';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ProposalTemplate({ proposal }: { proposal: Proposal }) {
  return (
    <div className="proposal_page">
      <header className="proposal_header">
        <div className="proposal_logo">VITOR ONO</div>
      </header>

      <div className="proposal_title-row">
        <div className="proposal_project-name">{proposal.projectName}</div>
        <div className="proposal_kicker">PROJECT PROPOSAL</div>
      </div>

      <div className="proposal_body">
        <div className="proposal_row">
          <div className="proposal_label">for</div>
          <div className="proposal_value">{proposal.clientName}</div>
        </div>

        <div className="proposal_row">
          <div className="proposal_label">from</div>
          <div className="proposal_value">Vitor Ono</div>
        </div>

        <div className="proposal_row">
          <div className="proposal_label">project description</div>
          <div className="proposal_value">{proposal.projectDescription}</div>
        </div>

        <div className="proposal_row">
          <div className="proposal_label">approach</div>
          <div className="proposal_value">{proposal.approach}</div>
        </div>

        <div className="proposal_row">
          <div className="proposal_label">scope</div>
          <div className="proposal_value">
            <ul className="proposal_scope-list">
              {proposal.scope.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        {proposal.myWork && proposal.myWork.length > 0 && (
          <div className="proposal_row">
            <div className="proposal_label">my work</div>
            <div className="proposal_value proposal_link-list">
              {proposal.myWork.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proposal_bracket-link"
                >
                  [ {item.title} ]
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="proposal_section">
        <div className="proposal_section-title">INVESTMENT</div>
        <div className="proposal_section-body">{proposal.investment}</div>
      </div>

      <div className="proposal_section">
        <div className="proposal_section-title">TIMELINE</div>
        <div className="proposal_section-body">{proposal.timeline}</div>
      </div>

      <div className="proposal_body">
        <div className="proposal_row">
          <div className="proposal_label">next steps</div>
          <div className="proposal_value proposal_link-list">
            <div>Reply to confirm and I&apos;ll send the deposit invoice.</div>
            <a href="mailto:work@vitorono.com" className="proposal_bracket-link">
              [ reply email ]
            </a>
            {proposal.scheduleUrl && (
              <a
                href={proposal.scheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proposal_bracket-link"
              >
                [ schedule ]
              </a>
            )}
          </div>
        </div>
      </div>

      <footer className="proposal_footer">{formatDate(proposal.date)}</footer>
    </div>
  );
}
