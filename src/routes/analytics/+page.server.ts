import { db } from '$lib/db';
import { event, page, block } from '$lib/db/schema';
import { eq, gte, sql, desc, and, count } from 'drizzle-orm';
import { auth } from '$lib/auth';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, locals }) => {
// Get authenticated user
const session = await auth.api.getSession({
headers: request.headers
});

if (!session) {
throw fail(401, { message: 'Unauthorized' });
}

const userId = session.user.id;

// Get user's pages
const userPages = await db.select().from(page).where(eq(page.userId, userId));
const pageIds = userPages.map((p) => p.id);

if (pageIds.length === 0) {
return {
stats: {
totalViews: 0,
totalClicks: 0,
ctr: 0,
viewsByDay: [],
blocksByClicks: []
},
pages: userPages
};
}

// Calculate date 7 days ago
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

// Get total views and clicks
const [viewCountResult] = await db
.select({ count: count() })
.from(event)
.where(and(eq(event.eventType, 'view'), sql`${event.pageId} IN ${pageIds}`));

const [clickCountResult] = await db
.select({ count: count() })
.from(event)
.where(and(eq(event.eventType, 'click'), sql`${event.pageId} IN ${pageIds}`));

const totalViews = viewCountResult?.count || 0;
const totalClicks = clickCountResult?.count || 0;
const ctr = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100 * 10) / 10 : 0;

// Get views by day for the last 7 days
const viewsByDay = await db
.select({
date: sql<string>`date(${event.timestamp})`,
count: count()
})
.from(event)
.where(
and(
eq(event.eventType, 'view'),
sql`${event.pageId} IN ${pageIds}`,
gte(event.timestamp, sevenDaysAgo)
)
)
.groupBy(sql`date(${event.timestamp})`)
.orderBy(sql`date(${event.timestamp})`);

// Get blocks with their click counts
const blocksWithClicks = await db
.select({
id: block.id,
pageId: block.pageId,
type: block.type,
content: block.content,
clickCount: count(event.id)
})
.from(block)
.leftJoin(event, and(eq(event.blockId, block.id), eq(event.eventType, 'click')))
.where(sql`${block.pageId} IN ${pageIds}`)
.groupBy(block.id)
.orderBy(desc(count(event.id)))
.limit(10);

// Parse JSON content for blocks
const blocksByClicks = blocksWithClicks
.map((b) => {
let label = b.type;
try {
const content = typeof b.content === 'string' ? JSON.parse(b.content) : b.content;
if (b.type === 'link' && content.title) {
label = content.title;
} else if (b.type === 'cta' && content.label) {
label = content.label;
} else if (b.type === 'header' && content.name) {
label = content.name;
} else if (b.type === 'social') {
label = 'Social Icons';
}
} catch (e) {
// Keep default label
}
return {
id: b.id,
type: b.type,
label,
clicks: b.clickCount
};
})
.filter((b) => b.clicks > 0);

// Fill in missing days for chart
const chartData = [];
for (let i = 6; i >= 0; i--) {
const date = new Date();
date.setDate(date.getDate() - i);
const dateStr = date.toISOString().split('T')[0];
const existing = viewsByDay.find((v) => v.date === dateStr);
chartData.push({
date: dateStr,
count: existing?.count || 0
});
}

return {
stats: {
totalViews,
totalClicks,
ctr,
viewsByDay: chartData,
blocksByClicks
},
pages: userPages
};
};
