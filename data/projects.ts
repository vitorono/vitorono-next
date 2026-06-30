// Shape of a project coming out of Sanity
export interface Project {
  slug: string;
  number: string;   // e.g. "01"
  name: string;     // e.g. "Studio Blackout"
  category: string; // e.g. "Brand / Web"
  // Optional preview used in the hover modal
  previewImage?: string; // URL from Sanity image-url
  previewVideo?: string; // URL of an mp4/webm
  url?: string;     // live site URL
}
