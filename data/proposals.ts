// Shape of a proposal coming out of Sanity — public fields only, never `password`.

export interface ProposalWorkItem {
  name: string;
  url?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface SitemapItem {
  path: string;
  depth: number;
}

export interface Proposal {
  slug: string;
  projectName: string;
  clientCompany?: string;
  clientName: string;
  date: string; // ISO date
  projectDescription: string;
  sitemap?: SitemapItem[];
  scope?: string;
  process?: ProcessStep[];
  afterLaunchNote?: string;
  myWork?: ProposalWorkItem[];
  investmentValue?: string;
  investmentDescription: string;
  timeline: string;
  acceptingTerms?: string;
}

export interface ProposalListItem {
  slug: string;
  projectName: string;
  clientName: string;
  date: string;
}
