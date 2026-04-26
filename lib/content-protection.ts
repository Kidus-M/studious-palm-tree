import jwt from 'jsonwebtoken';

const VIDEO_SECRET = process.env.VIDEO_SIGNING_SECRET || 'default-secret-change-me';

interface VideoTokenPayload {
  episodeId: string;
  userId: string;
}

/**
 * Generate a signed, time-limited token for video streaming.
 * Token expires in 4 hours.
 */
export function generateVideoToken(episodeId: string, userId: string): string {
  return jwt.sign(
    { episodeId, userId } as VideoTokenPayload,
    VIDEO_SECRET,
    { expiresIn: '4h' }
  );
}

/**
 * Verify and decode a video streaming token.
 */
export function verifyVideoToken(token: string): VideoTokenPayload | null {
  try {
    return jwt.verify(token, VIDEO_SECRET) as VideoTokenPayload;
  } catch {
    return null;
  }
}

/**
 * Validate that the request comes from our domain.
 */
export function validateReferer(referer: string | null, origin: string | null): boolean {
  const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (origin && origin.startsWith(allowedOrigin)) return true;
  if (referer && referer.startsWith(allowedOrigin)) return true;

  return false;
}

/**
 * Security headers for content protection.
 */
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "media-src 'self' blob:",
    "connect-src 'self' https://api.chapa.co",
    "frame-ancestors 'none'",
  ].join('; '),
};
