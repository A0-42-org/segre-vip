import { db } from '$lib/db';
import { event } from '$lib/db/schema';
import { nanoid } from 'nanoid';
import { error } from '@sveltejs/kit';

// Simple in-memory rate limiter
// In production, consider using Redis or a dedicated service
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL = 60000; // Clean up old entries every minute

// Start cleanup interval
if (typeof globalThis.rateLimitCleanup === 'undefined') {
  globalThis.rateLimitCleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (entry.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);
}

/**
 * Check if a request is rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with allowed flag and remaining count
 */
function checkRateLimit(identifier: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // If no entry or window expired, create new entry
  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  // Check if limit exceeded
  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  // Increment count
  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime };
}

/**
 * Get client IP address from request
 */
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Rate limit options
 */
const RATE_LIMITS = {
  VIEW: { maxRequests: 100, windowMs: 60000 }, // 100 views per minute
  CLICK: { maxRequests: 50, windowMs: 60000 }   // 50 clicks per minute
};

/**
 * Track a page view
 * @param pageId - The ID of page being viewed
 * @param request - The HTTP request to extract referrer and user agent
 * @param url - The URL of the request (optional, will use request.url if not provided)
 */
export async function trackView(pageId: string, request: Request, url?: URL) {
  // Rate limit by IP address
  const clientIP = getClientIP(request);
  const rateLimitResult = checkRateLimit(
    `view:${clientIP}:${pageId}`,
    RATE_LIMITS.VIEW.maxRequests,
    RATE_LIMITS.VIEW.windowMs
  );

  if (!rateLimitResult.allowed) {
    throw error(429, {
      message: 'Too many views. Please try again later.',
      resetTime: new Date(rateLimitResult.resetTime).toISOString()
    });
  }

  const headers = request.headers;
  const referrer = headers.get('referer') || null;
  const userAgent = headers.get('user-agent') || null;

  // Parse UTM parameters from URL
  const requestUrl = url || new URL(request.url);
  const utm: Record<string, string> = {};
  requestUrl.searchParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      utm[key] = value;
    }
  });

  // Detect device type
  const device = detectDevice(userAgent);

  await db.insert(event).values({
    id: nanoid(),
    pageId,
    blockId: null,
    eventType: 'view',
    referrer,
    utm: Object.keys(utm).length > 0 ? JSON.stringify(utm) : null,
    device: JSON.stringify(device),
    userAgent
  });
}

/**
 * Track a block click
 * @param pageId - The ID of page containing block
 * @param blockId - The ID of clicked block
 * @param request - The HTTP request to extract referrer and user agent
 * @param url - The URL of the request (optional, will use request.url if not provided)
 */
export async function trackClick(pageId: string, blockId: string, request: Request, url?: URL) {
  // Rate limit by IP address
  const clientIP = getClientIP(request);
  const rateLimitResult = checkRateLimit(
    `click:${clientIP}:${pageId}:${blockId}`,
    RATE_LIMITS.CLICK.maxRequests,
    RATE_LIMITS.CLICK.windowMs
  );

  if (!rateLimitResult.allowed) {
    throw error(429, {
      message: 'Too many clicks. Please try again later.',
      resetTime: new Date(rateLimitResult.resetTime).toISOString()
    });
  }

  const headers = request.headers;
  const referrer = headers.get('referer') || null;
  const userAgent = headers.get('user-agent') || null;

  // Parse UTM parameters from URL
  const requestUrl = url || new URL(request.url);
  const utm: Record<string, string> = {};
  requestUrl.searchParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      utm[key] = value;
    }
  });

  // Detect device type
  const device = detectDevice(userAgent);

  await db.insert(event).values({
    id: nanoid(),
    pageId,
    blockId,
    eventType: 'click',
    referrer,
    utm: Object.keys(utm).length > 0 ? JSON.stringify(utm) : null,
    device: JSON.stringify(device),
    userAgent
  });
}

/**
 * Detect device type from user agent
 * @param userAgent - The user agent string
 * @returns Device information object
 */
function detectDevice(userAgent: string | null) {
  const device = {
    type: 'desktop' as 'mobile' | 'tablet' | 'desktop',
    os: 'unknown',
    browser: 'unknown'
  };

  if (!userAgent) return device;

  const ua = userAgent.toLowerCase();

  // Detect device type
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    device.type = 'mobile';
  } else if (/tablet|ipad|kindle|silk/i.test(ua)) {
    device.type = 'tablet';
  }

  // Detect OS
  if (/windows/i.test(ua)) device.os = 'Windows';
  else if (/mac os x/i.test(ua)) device.os = 'MacOS';
  else if (/linux/i.test(ua)) device.os = 'Linux';
  else if (/android/i.test(ua)) device.os = 'Android';
  else if (/ios|iphone|ipad|ipod/i.test(ua)) device.os = 'iOS';

  // Detect browser
  if (/chrome/i.test(ua) && !/edge|opr/i.test(ua)) device.browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) device.browser = 'Safari';
  else if (/firefox/i.test(ua)) device.browser = 'Firefox';
  else if (/edge/i.test(ua)) device.browser = 'Edge';
  else if (/opr|opera/i.test(ua)) device.browser = 'Opera';

  return device;
}
