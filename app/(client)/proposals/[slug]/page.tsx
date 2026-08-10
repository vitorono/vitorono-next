import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getProposal, getProposalAuth } from '@/sanity/queries';
import { verifyProposalPassword } from '@/app/actions/proposals';
import { verifyProposalToken } from '@/lib/proposalAuth';
import PasswordGate from '@/components/PasswordGate';
import ProposalTemplate from '@/components/ProposalTemplate';

export default async function ProposalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const proposal = await getProposal(slug);
  if (!proposal) notFound();

  const auth = await getProposalAuth(slug);
  if (!auth) notFound();

  const token = (await cookies()).get(`proposal_auth_${slug}`)?.value;
  const authed = verifyProposalToken(token, `${slug}:${auth.password}`);

  if (!authed) {
    return <PasswordGate action={verifyProposalPassword.bind(null, slug)} heading={proposal.projectName} />;
  }

  return <ProposalTemplate proposal={proposal} />;
}
