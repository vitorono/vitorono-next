'use server';

export interface ContactState {
  status: 'idle' | 'success' | 'error';
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return { status: 'error' };
  }

  // ── Option A: Resend ─────────────────────────────────────────────────────
  // 1. npm install resend
  // 2. Add RESEND_API_KEY to .env.local
  // 3. Uncomment the block below and delete Option B
  //
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // const { error } = await resend.emails.send({
  //   from: 'site@vitorono.com',
  //   to: 'work@vitorono.com',
  //   subject: `New message from ${name}`,
  //   text: `From: ${name} <${email}>\n\n${message}`,
  // });
  // return error ? { status: 'error' } : { status: 'success' };

  // ── Option B: Formspree (zero config, just replace the URL) ───────────────
  // 1. Create a form at https://formspree.io
  // 2. Replace <YOUR_FORM_ID> with the ID Formspree gives you
  //
  try {
    const res = await fetch('https://formspree.io/f/<YOUR_FORM_ID>', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    return res.ok ? { status: 'success' } : { status: 'error' };
  } catch {
    return { status: 'error' };
  }
}
