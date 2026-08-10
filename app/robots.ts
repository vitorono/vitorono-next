import { headers } from 'next/headers';
import type { MetadataRoute } from 'next';
import { isClientHost } from '@/lib/clientHost';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host')?.split(':')[0] ?? '';

  if (isClientHost(host)) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return { rules: { userAgent: '*', allow: '/' } };
}
