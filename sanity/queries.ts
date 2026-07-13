import { sanityClient } from './client';
import type { Project } from '@/data/projects';

export interface SiteContent {
  homeText?: string;
  aboutText?: string;
}

const PROJECT_QUERY = `*[_type == "project"] | order(number asc) {
  "slug": slug.current,
  number,
  name,
  category,
  "previewImage": previewImage.asset->url,
  previewVideo,
  url
}`;

const SITE_CONTENT_QUERY = `*[_type == "siteContent" && _id == "siteContent"][0] {
  homeText,
  aboutText
}`;

export async function getProjects(): Promise<Project[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch<Project[]>(PROJECT_QUERY);
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!sanityClient) return {};
  return sanityClient.fetch<SiteContent>(SITE_CONTENT_QUERY) ?? {};
}
