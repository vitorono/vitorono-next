'use client';

import { useEffect, useRef, useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';
import ProjectModal from './ProjectModal';
import type { Project } from '@/data/projects';

interface Props {
  projects: Project[];
  aboutText?: string;
}

export default function ModalManager({ projects, aboutText }: Props) {
  const { openModals } = useModalStore();
  const highestZRef = useRef(100);
  const prevOpenRef = useRef<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 991px)').matches);
  }, []);

  // Show / hide / position modals when openModals changes
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 991px)').matches;

    const newlyOpened = [...openModals].filter(id => !prevOpenRef.current.has(id));
    const newlyClosed = [...prevOpenRef.current].filter(
      id => !openModals.has(id) && id.startsWith('project-')
    );
    prevOpenRef.current = new Set(openModals);

    if (!newlyOpened.length && !newlyClosed.length) return;

    requestAnimationFrame(() => {
      import('gsap').then(({ gsap }) =>
        import('gsap/Draggable').then(({ Draggable }) => {
          gsap.registerPlugin(Draggable);

          // Hide closed project modals
          newlyClosed.forEach(id => {
            const el = document.querySelector<HTMLElement>(`.modal_wrapper[data-modal="${id}"]`);
            if (el) gsap.set(el, { display: 'none' });
          });

          // Show, position, and make draggable newly opened modals
          newlyOpened.forEach(id => {
            const el = document.querySelector<HTMLElement>(`.modal_wrapper[data-modal="${id}"]`);
            if (!el) return;

            highestZRef.current++;
            el.style.zIndex = String(highestZRef.current);

            if (mobile) {
              gsap.set(el, { display: 'flex', x: 0, y: 0 });
              return;
            }

            gsap.set(el, { display: 'flex', visibility: 'hidden' });
            const w = el.offsetWidth;
            const h = el.offsetHeight;
            const maxX = Math.max(0, window.innerWidth - w);
            const maxY = Math.max(0, window.innerHeight - h);
            gsap.set(el, {
              x: Math.random() * maxX,
              y: Math.random() * maxY,
              top: 0,
              left: 0,
              visibility: 'visible',
              opacity: 1,
              scale: 1,
            });

            Draggable.create(el, {
              bounds: window,
              dragClickables: false,
              onPress(this: { target: HTMLElement }) {
                highestZRef.current++;
                this.target.style.zIndex = String(highestZRef.current);
              },
            });
          });
        })
      );
    });
  }, [openModals]);

  return (
    <>
      {openModals.has('contact') && <ContactModal />}
      {openModals.has('about') && <AboutModal aboutText={aboutText} />}
      {projects.map(project => (
        <ProjectModal
          key={project.slug}
          project={project}
          isActive={openModals.has(`project-${project.slug}`)}
          preload={isMobile ? 'metadata' : 'auto'}
        />
      ))}
    </>
  );
}
