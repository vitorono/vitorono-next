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
          About
        </button>
        <button
          onClick={() => toggle('contact')}
          className={`nav_link is-contact w-button${isOpen('contact') ? ' is-active' : ''}`}
        >
          Contact
        </button>
      </div>
      <div className="nav_link-wrapper">
        <span className="nav_link w-button">Vitor Ono</span>
      </div>
    </nav>
  );
}
