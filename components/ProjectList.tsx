'use client';

import { useModalStore } from '@/store/modalStore';
import type { Project } from '@/data/projects';

interface Props {
  projects: Project[];
  mobile?: boolean;
}

export default function ProjectList({ projects, mobile = false }: Props) {
  const { open, close } = useModalStore();

  return (
    <div className={`home_item-list${mobile ? ' is-mobile' : ''}`}>
      <div role="list" className="collection-list">
        {projects.map((p) => {
          const id = `project-${p.slug}`;
          return (
            <div
              key={p.slug}
              role="listitem"
              className={`home_item-row${mobile ? ' is-mobile' : ''} item_row`}
              onMouseEnter={() => !mobile && open(id)}
              onMouseLeave={() => !mobile && close(id)}
              onClick={() => {
                if (p.url) window.open(p.url, '_blank', 'noopener,noreferrer');
              }}
            >
              {mobile ? (
                <div className="mobile-item-wrapper">
                  <div className="text item_number">{p.number}</div>
                  <div className="text item_name">{p.name}</div>
                  <div className="text item_category">{p.category}</div>
                </div>
              ) : (
                <>
                  <div className="text item_number is-fixed">{p.number}</div>
                  <div className="text item_name">{p.name}</div>
                  <div className="text item_category">{p.category}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
