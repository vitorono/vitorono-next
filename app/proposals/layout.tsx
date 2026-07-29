import type { Metadata } from 'next';
import './proposals.css';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ProposalsLayout({ children }: { children: React.ReactNode }) {
  return <div className="proposals_root">{children}</div>;
}
