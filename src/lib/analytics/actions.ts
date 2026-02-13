import { db } from '$lib/db';
import { event } from '$lib/db/schema';
import { nanoid } from 'nanoid';

/**
 * Track a page view
 * @param pageId - The ID of page being viewed
 * @param request - The HTTP request to extract referrer and user agent
 * @param url - The URL of the request (optional, will use request.url if not provided)
 */
export async function trackView(pageId: string, request: Request, url?: URL) {
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
