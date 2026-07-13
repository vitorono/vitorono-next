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

  try {
    const res = await fetch('https://formspree.io/f/mzdnboke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    return res.ok ? { status: 'success' } : { status: 'error' };
  } catch {
    return { status: 'error' };
  }
}
