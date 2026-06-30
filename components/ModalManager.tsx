'use client';

import { useEffect, useRef } from 'react';
import { useModalStore } from '@/store/modalStore';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';
import ProjectModal from './ProjectModal';
import type { Project } from '@/data/projects';

interface Props {
  projects: Project[];
}

export default function ModalManager({ projects }: Props) {
  const { openModals } = useModalStore();
  const highestZRef = useRef(100);
  const prevOpenRef = useRef<Set<string>>(new Set());

  // Position and show modals that were just added to openModals
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 991px)').matches;

    const newlyOpened = [...openModals].filter(
      (id) => !prevOpenRef.current.has(id)
    );
    prevOpenRef.current = new Set(openModals);

    if (!newlyOpened.length) return;

    // Wait one frame so React has painted the new modal nodes
    requestAnimationFrame(() => {
      import('gsap').then(({ gsap }) => {
        newlyOpened.forEach((id) => {
          const el = document.querySelector<HTMLElement>(
            `.modal_wrapper[data-modal="${id}"]`
          );
          if (!el) return;

          highestZRef.current++;
          el.style.zIndex = String(highestZRef.current);

          if (isMobile) {
            gsap.set(el, { display: 'flex', x: 0, y: 0 });
            return;
          }

          // Measure before positioning
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
        });
      });
    });
  }, [openModals]);

  // Init GSAP Draggable once and whenever the set of open modals grows (new DOM nodes)
  useEffect(() => {
    if (window.matchMedia('(max-width: 991px)').matches) return;
    if (!openModals.size) return;

    let instances: { kill: () => void }[] = [];

    import('gsap').then(({ gsap }) =>
      import('gsap/Draggable').then(({ Draggable }) => {
        gsap.registerPlugin(Draggable);
        instances = Draggable.create('.modal_wrapper', {
          bounds: window,
          dragClickables: false,
          onPress(this: { target: HTMLElement }) {
            highestZRef.current++;
            this.target.style.zIndex = String(highestZRef.current);
          },
        });
      })
    );

    return () => instances.forEach((d) => d.kill());
  }, [openModals]);

  return (
    <>
      {openModals.has('contact') && <ContactModal />}
      {openModals.has('about') && <AboutModal />}
      {projects.map((project) =>
        openModals.has(`project-${project.slug}`) ? (
          <ProjectModal key={project.slug} project={project} />
        ) : null
      )}
    </>
  );
}
