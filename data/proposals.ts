// Shape of a proposal coming out of Sanity — public fields only, never `password`.

export interface WorkLink {
  title: string;
  url: string;
}

export interface Proposal {
  slug: string;
  projectName: string;
  clientName: string;
  date: string; // ISO date
  projectDescription: string;
  approach: string;
  scope: string[];
  myWork?: WorkLink[];
  investment: string;
  timeline: string;
  scheduleUrl?: string;
}

export interface ProposalListItem {
  slug: string;
  projectName: string;
  clientName: string;
  date: string;
}
