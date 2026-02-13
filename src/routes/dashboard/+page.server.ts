import { eq } from 'drizzle-orm';
import { type Actions, type ServerLoad, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { auth } from '$lib/auth';
import { page, event } from '$lib/db/schema';

export const load: ServerLoad = async ({ request }) => {
const session = await auth.api.getSession({ headers: request.headers });

if (!session) {
throw redirect(302, '/login');
}

const userId = session.user.id;

// Get all pages for this user
const userPages = await db.query.page.findMany({
where: eq(page.userId, userId)
});

// Get pages with statistics
const pages = await Promise.all(
userPages.map(async (p) => {
// Get 7-day statistics for this page
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const pageEvents = await db.query.event.findMany({
where: (eventTable: any, { gte }: any) => gte(eventTable.timestamp, sevenDaysAgo)
});

const pageEventsFiltered = pageEvents.filter(e => e.pageId === p.id);

const views = pageEventsFiltered.filter(e => e.eventType === 'view').length;
const clicks = pageEventsFiltered.filter(e => e.eventType === 'click').length;
const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : '0.0';

return {
id: p.id,
title: p.title,
username: p.username,
theme: p.theme,
isPublished: Boolean(p.isPublished),
views,
clicks,
ctr
};
})
);

// Calculate global statistics
const totalViews = pages.reduce((sum, p) => sum + p.views, 0);
const totalClicks = pages.reduce((sum, p) => sum + p.clicks, 0);
const globalCtr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

return {
user: session.user,
pages,
stats: {
views: totalViews,
clicks: totalClicks,
ctr: globalCtr
}
};
};

export const actions: Actions = {
togglePublish: async ({ request }) => {
const session = await auth.api.getSession({ headers: request.headers });
if (!session?.user?.id) {
return fail(401, { success: false, message: 'Unauthorized' });
}

const formData = await request.formData();
const pageId = formData.get('pageId') as string;
const published = formData.get('published') === 'true';

if (!pageId) {
return fail(400, { success: false, message: 'Missing pageId' });
}

// Verify ownership
const pageRecord = await db.query.page.findFirst({
where: eq(page.id, pageId)
});

if (!pageRecord || pageRecord.userId !== session.user.id) {
return fail(403, { success: false, message: 'Not authorized' });
}

// Update publish status
await db
.update(page)
.set({ isPublished: published })
.where(eq(page.id, pageId));

return {
success: true,
data: { published }
};
}
};
