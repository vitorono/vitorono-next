const PRODUCTION_CLIENT_HOST = 'clients.vitorono.com';

// Only ever set locally in .env.local (e.g. `clients.localhost`) — never in Vercel env,
// so production routing can't be affected by this.
const DEV_CLIENT_HOST = process.env.DEV_CLIENT_HOST;

export function isClientHost(hostname: string): boolean {
  return hostname === PRODUCTION_CLIENT_HOST || (!!DEV_CLIENT_HOST && hostname === DEV_CLIENT_HOST);
}

// Paths served from app/(client)/ — the allowlist proxy.ts and robots.ts route on.
export const CLIENT_ROUTE_PREFIXES = ['/proposals'];

export function matchesClientRoute(pathname: string): boolean {
  return CLIENT_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
