import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = process.env.PROPOSAL_AUTH_SECRET ?? '';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function sign(payload: string): string {
  return createHmac('sha256', SECRET).update(payload).digest('hex');
}

// `basePayload` should include the current live password (from Sanity or env),
// so changing it invalidates every previously-issued cookie automatically.
export function signProposalToken(basePayload: string): { value: string; maxAge: number } {
  const expiry = Date.now() + MAX_AGE_SECONDS * 1000;
  const hmac = sign(`${basePayload}:${expiry}`);
  return { value: `${expiry}.${hmac}`, maxAge: MAX_AGE_SECONDS };
}

export function verifyProposalToken(cookieValue: string | undefined, basePayload: string): boolean {
  if (!cookieValue || !SECRET) return false;

  const [expiryStr, hmac] = cookieValue.split('.');
  const expiry = Number(expiryStr);
  if (!expiry || !hmac || Date.now() > expiry) return false;

  const expected = sign(`${basePayload}:${expiry}`);
  const expectedBuf = Buffer.from(expected, 'hex');
  const actualBuf = Buffer.from(hmac, 'hex');
  if (expectedBuf.length !== actualBuf.length) return false;

  return timingSafeEqual(expectedBuf, actualBuf);
}
