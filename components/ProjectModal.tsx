'use client';

import { useModalStore } from '@/store/modalStore';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
}

export default function ProjectModal({ project }: Props) {
  const close = useModalStore((s) => s.close);
  const id = `project-${project.slug}`;

  return (
    <div data-modal={id} className="modal_wrapper is-project">
      <div className="modal_close" onClick={() => close(id)}>
        <img src="/images/close-icon_black.svg" loading="lazy" alt="Close" />
      </div>
      {project.previewVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={project.previewVideo} />
        </video>
      ) : project.previewImage ? (
        <img
          src={project.previewImage}
          alt={project.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : null}
    </div>
  );
}
