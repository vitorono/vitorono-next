import { sanityClient } from './client';
import type { Project } from '@/data/projects';

// Adjust field names to match your Sanity document type (assumed: "project")
const PROJECT_QUERY = `*[_type == "project"] | order(number asc) {
  "slug": slug.current,
  number,
  name,
  category,
  "previewImage": previewImage.asset->url,
  previewVideo,
  url
}`;

export async function getProjects(): Promise<Project[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch<Project[]>(PROJECT_QUERY);
}
