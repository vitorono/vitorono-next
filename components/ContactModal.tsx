'use client';

import { useActionState } from 'react';
import { useModalStore } from '@/store/modalStore';
import { sendContact } from '@/app/actions/contact';

const initialState = { status: 'idle' as 'idle' | 'success' | 'error' };

export default function ContactModal() {
  const close = useModalStore((s) => s.close);
  const [state, formAction, isPending] = useActionState(sendContact, initialState);

  return (
    <div data-modal="contact" className="modal_wrapper is-contact">
      <div className="contact_modal">
        <div className="modal_close" onClick={() => close('contact')}>
          <img src="/images/close-icon_black.svg" loading="lazy" alt="Close" />
        </div>
        <div className="contact_content">
          <div className="contact_heading">
            <div className="contact_title">CONTACT</div>
            <div className="text is-md">work@vitorono.com</div>
          </div>
          <div className="form-block w-form">
            {state.status === 'success' ? (
              <div className="w-form-done is-visible">
                <div>Thank you! Your submission has been received!</div>
              </div>
            ) : (
              <form action={formAction} className="form">
                <div className="form_input">
                  <label htmlFor="name" className="field-label">Name:</label>
                  <input
                    spellCheck={false}
                    className="form_field w-input"
                    maxLength={256}
                    name="name"
                    placeholder=""
                    type="text"
                    id="name"
                    required
                  />
                </div>
                <div className="form_input">
                  <label htmlFor="email" className="field-label">Email:</label>
                  <input
                    className="form_field is-default w-input"
                    maxLength={256}
                    name="email"
                    placeholder=""
                    type="email"
                    id="email"
                    required
                  />
                </div>
                <div className="form_input is-text-area">
                  <label htmlFor="message" className="field-label is-text-area">Message:</label>
                  <textarea
                    required
                    placeholder=""
                    maxLength={5000}
                    id="message"
                    name="message"
                    className="form_field is-text_area w-input"
                  />
                </div>
                {state.status === 'error' && (
                  <div className="w-form-fail is-visible">
                    <div>Oops! Something went wrong. Please try again.</div>
                  </div>
                )}
                <input
                  type="submit"
                  className="submit-button w-button"
                  value={isPending ? 'Sending…' : 'Send'}
                  disabled={isPending}
                />
              </form>
            )}
          </div>
        </div>
        <img
          src="/images/graphism_black_vertical.webp"
          loading="lazy"
          alt=""
          className="graphism is-contact-modal"
        />
        <img
          src="/images/grafismo_preto_horizontal.webp"
          loading="lazy"
          sizes="(max-width: 1080px) 100vw, 1080px"
          srcSet="/images/grafismo_preto_horizontal-p-500.webp 500w, /images/grafismo_preto_horizontal-p-800.webp 800w, /images/grafismo_preto_horizontal.webp 1080w"
          alt=""
          className="graphism is-contact-modal is-mobile"
        />
      </div>
    </div>
  );
}
