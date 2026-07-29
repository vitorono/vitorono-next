'use client';

import { useActionState } from 'react';
import type { GateState } from '@/app/actions/proposals';

const initialState: GateState = { status: 'idle' };

export default function PasswordGate({
  action,
  heading,
}: {
  action: (prevState: GateState, formData: FormData) => Promise<GateState>;
  heading: string;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <div className="proposal_gate">
      <div className="proposal_gate-heading">{heading}</div>
      <form action={formAction} className="proposal_gate-form">
        <input
          type="password"
          name="password"
          placeholder="password"
          autoFocus
          required
          className="proposal_gate-input"
        />
        <button type="submit" className="proposal_gate-submit" disabled={isPending}>
          [ {isPending ? 'checking…' : 'enter'} ]
        </button>
      </form>
      {state.status === 'error' && <div className="proposal_gate-error">Incorrect password.</div>}
    </div>
  );
}
