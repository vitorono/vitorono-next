'use client';

import { useEffect, useRef } from 'react';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  isActive: boolean;
}

export default function ProjectModal({ project, isActive }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const id = `project-${project.slug}`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <div data-modal={id} className="modal_wrapper is-project">
      {project.previewVideo ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
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
