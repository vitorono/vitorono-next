'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProposalAuth } from '@/sanity/queries';
import { signProposalToken } from '@/lib/proposalAuth';

export interface GateState {
  status: 'idle' | 'error';
}

export async function verifyProposalPassword(
  slug: string,
  _prev: GateState,
  formData: FormData
): Promise<GateState> {
  const password = String(formData.get('password') ?? '');
  const auth = await getProposalAuth(slug);

  if (!auth || password !== auth.password) {
    return { status: 'error' };
  }

  const token = signProposalToken(`${slug}:${auth.password}`);
  (await cookies()).set(`proposal_auth_${slug}`, token.value, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: token.maxAge,
    path: `/proposals/${slug}`,
  });

  redirect(`/proposals/${slug}`);
}

export async function verifyProposalsIndexPassword(
  _prev: GateState,
  formData: FormData
): Promise<GateState> {
  const password = String(formData.get('password') ?? '');
  const expected = process.env.PROPOSALS_INDEX_PASSWORD;

  if (!expected || password !== expected) {
    return { status: 'error' };
  }

  const token = signProposalToken(`proposals-index:${expected}`);
  (await cookies()).set('proposals_index_auth', token.value, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: token.maxAge,
    path: '/proposals',
  });

  redirect('/proposals');
}
