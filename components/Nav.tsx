'use client';

import { useCallback } from 'react';
import { useModalStore } from '@/store/modalStore';

export default function Nav() {
  const { open, close, isOpen } = useModalStore();

  const toggle = useCallback(
    (id: string) => {
      isOpen(id) ? close(id) : open(id);
    },
    [open, close, isOpen]
  );

  return (
    <nav className="nav">
      <div className="nav_link-wrapper">
        <button
          onClick={() => toggle('about')}
          className={`nav_link is-about w-button${isOpen('about') ? ' is-active' : ''}`}
        >
          about
        </button>
        <button
          onClick={() => toggle('contact')}
          className={`nav_link is-contact w-button${isOpen('contact') ? ' is-active' : ''}`}
        >
          contact
        </button>
      </div>
      <div className="nav_link-wrapper">
        <a href="mailto:work@vitorono.com" className="nav_link nav_link-email w-button">
          <span className="nav_link-text-default">vitor ono</span>
          <span className="nav_link-text-hover">work@vitorono.com</span>
        </a>
      </div>
    </nav>
  );
}
