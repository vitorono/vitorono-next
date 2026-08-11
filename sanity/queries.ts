import { sanityClient } from './client';
import type { Project } from '@/data/projects';
import type { Proposal, ProposalListItem } from '@/data/proposals';

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

const PROPOSALS_LIST_QUERY = `*[_type == "proposal"] | order(date desc) {
  "slug": slug.current,
  projectName,
  clientName,
  date
}`;

// Public fields only — password is intentionally never projected here.
const PROPOSAL_QUERY = `*[_type == "proposal" && slug.current == $slug][0] {
  "slug": slug.current,
  projectName,
  language,
  clientCompany,
  clientName,
  date,
  projectDescription,
  sitemap,
  scope,
  process,
  afterLaunchNote,
  "myWork": myWork[]->{ name, url },
  investmentValue,
  "investmentDescription": investment,
  timeline,
  acceptingTerms
}`;

// The only query in the codebase allowed to touch `password`.
const PROPOSAL_AUTH_QUERY = `*[_type == "proposal" && slug.current == $slug][0] {
  password
}`;

export async function getProposals(): Promise<ProposalListItem[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch<ProposalListItem[]>(PROPOSALS_LIST_QUERY);
}

export async function getProposal(slug: string): Promise<Proposal | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch<Proposal | null>(PROPOSAL_QUERY, { slug });
}

export async function getProposalAuth(slug: string): Promise<{ password: string } | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch<{ password: string } | null>(PROPOSAL_AUTH_QUERY, { slug });
}
