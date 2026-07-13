import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import ProjectList from '@/components/ProjectList';
import ModalManager from '@/components/ModalManager';
import type { Project } from '@/data/projects';
import { getProjects, getSiteContent } from '@/sanity/queries';

export const revalidate = 60;

export default async function Home() {
  let projects: Project[] = [];
  let homeText = 'Independent visual developer. Working worldwide. Turning brand identity into websites. direction, design, build.';
  let aboutText: string | undefined;

  try {
    const [p, content] = await Promise.all([getProjects(), getSiteContent()]);
    projects = p;
    if (content.homeText) homeText = content.homeText;
    if (content.aboutText) aboutText = content.aboutText;
  } catch {
    // Sanity not configured — falls back to hardcoded defaults
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
          <ProjectList projects={projects} />
          <ProjectList projects={projects} mobile />
          <div className="w-layout-vflex home_text-wrapper">
            <div className="text">{homeText}</div>
          </div>
        </section>

        <ModalManager projects={projects} aboutText={aboutText} />
      </div>
    </>
  );
}
