import { cookies } from 'next/headers';
import Link from 'next/link';
import { getProposals } from '@/sanity/queries';
import { verifyProposalsIndexPassword } from '@/app/actions/proposals';
import { verifyProposalToken } from '@/lib/proposalAuth';
import PasswordGate from '@/components/PasswordGate';

export default async function ProposalsIndexPage() {
  const expected = process.env.PROPOSALS_INDEX_PASSWORD;
  const token = (await cookies()).get('proposals_index_auth')?.value;
  const authed = Boolean(expected) && verifyProposalToken(token, `proposals-index:${expected}`);

  if (!authed) {
    return <PasswordGate action={verifyProposalsIndexPassword} heading="PROPOSALS" />;
  }

  const proposals = await getProposals();

  return (
    <div className="proposals_index">
      <div className="proposals_index-heading">PROPOSALS</div>
      <ul className="proposals_index-list">
        {proposals.map((p) => (
          <li key={p.slug}>
            <Link href={`/proposals/${p.slug}`} className="proposal_bracket-link">
              [ {p.clientName} — {p.projectName} ]
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
