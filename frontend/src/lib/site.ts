export const SITE_NAME = "Open Klippah";
// Keep the self-hosted checkout usable without inventing a public domain. Set
// NEXT_PUBLIC_APP_URL/NEXT_PUBLIC_HOSTED_APP_URL when a real deployment exists.
export const DEFAULT_SITE_URL = "http://localhost:3107";
export const HOSTED_APP_URL = process.env.NEXT_PUBLIC_HOSTED_APP_URL || "/";
export const GITHUB_URL = "https://github.com/aiwithenoch/OPEN-KLIPPAH";

export function getSiteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
