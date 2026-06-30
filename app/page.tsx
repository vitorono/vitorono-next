import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import ProjectList from '@/components/ProjectList';
import ModalManager from '@/components/ModalManager';
import type { Project } from '@/data/projects';
import { getProjects } from '@/sanity/queries';

export default async function Home() {
  // Fetches at build time (SSG) — add `revalidate` or `force-dynamic` to change
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch {
    // Sanity not yet configured — runs fine with an empty project list
  }

  return (
    <>
      <Preloader />
      <div className="page-wrapper">
        <Nav />
        <section className="home_middle-row">
          <img
            src="/images/graphism.webp"
            loading="lazy"
            sizes="(max-width: 3840px) 100vw, 3840px"
            srcSet="/images/graphism-p-500.webp 500w, /images/graphism-p-800.webp 800w, /images/graphism-p-1080.webp 1080w, /images/graphism-p-1600.webp 1600w, /images/graphism-p-2000.webp 2000w, /images/graphism-p-2600.webp 2600w, /images/graphism.webp 3840w"
            alt=""
            className="graphism"
          />
        </section>
        <section className="home_bottom-row">
          {/* Desktop list */}
          <ProjectList projects={projects} />
          {/* Mobile list */}
          <ProjectList projects={projects} mobile />
          <div className="w-layout-vflex home_text-wrapper">
            <div className="text">
              Independent visual developer. Working worldwide. Turning brand identity into websites. direction, design, build.
            </div>
          </div>
        </section>

        {/* All modals live here — client component handles GSAP + state */}
        <ModalManager projects={projects} />
      </div>
    </>
  );
}
