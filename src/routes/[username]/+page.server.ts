import { eq } from 'drizzle-orm';
import type { Actions, ServerLoad } from '@sveltejs/kit';
import { fail, error } from '@sveltejs/kit';
import { db } from '$lib/db';
import { auth } from '$lib/auth';
import { user, page, block } from '$lib/db/schema';
import { trackView, trackClick } from '$lib/analytics/actions';

export const load: ServerLoad = async ({ params, request, setHeaders }) => {
  const username = params.username;

  // Find user by username (username is stored as email prefix)
  const dbUser = await db.query.user.findFirst({
    where: (users: any, { like }: any) => like(users.email, `${username}@%`)
  });

  if (!dbUser) {
    throw error(404, 'User not found');
  }

  // Get page for this user
  const dbPage = await db.query.page.findFirst({
    where: eq(page.userId, dbUser.id)
  });

  if (!dbPage) {
    throw error(404, 'Page not found');
  }

  // Check if page is published
  const isPublished = Boolean(dbPage.isPublished);

  // If not published, check if current user is the owner
  if (!isPublished) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.id !== dbUser.id) {
      throw error(404, 'Page not found');
    }
  }

  // Set Cache-Control headers for published pages
  if (isPublished) {
    setHeaders({
      'Cache-Control': 'public, max-age=300, s-maxage=600',
      'X-Content-Type-Options': 'nosniff'
    });
  }

  // Track view for published pages (or owner viewing their page)
  if (isPublished) {
    await trackView(dbPage.id, request);
  }

  // Get blocks for this page, ordered
  const pageBlocks = await db.query.block.findMany({
    where: eq(block.pageId, dbPage.id),
    orderBy: (blockTable: any, { asc }: any) => [asc(blockTable.order)]
  });

  // Generate SEO metadata
  const pageUrl = new URL(request.url).href;
  const siteName = 'Segre.vip';
  const pageTitle = dbPage.title || `${dbUser.name}'s VIP Page`;
  const pageDescription = `Check out ${dbUser.name}'s VIP bio page on ${siteName}. Premium links and offers.`;

  // Extract image from blocks for OG image (if any)
  let ogImage = 'https://segre.vip/og-default.png';
  const headerBlock = pageBlocks.find((b: any) => b.type === 'header');
  if (headerBlock) {
    const content = typeof headerBlock.content === 'string' 
      ? JSON.parse(headerBlock.content) 
      : headerBlock.content;
    if (content.imageUrl) {
      ogImage = content.imageUrl;
    }
  }

  return {
    user: {
      id: dbUser.id,
      name: dbUser.name,
      username: username
    },
    page: {
      id: dbPage.id,
      title: dbPage.title,
      theme: dbPage.theme,
      isPublished,
      username: dbPage.username
    },
    blocks: pageBlocks.map((b: any) => ({
      id: b.id,
      type: b.type,
      content: typeof b.content === 'string' ? JSON.parse(b.content) : b.content,
      style: typeof b.style === 'string' ? JSON.parse(b.style || '{}') : b.style,
      order: b.order,
      visible: Boolean(b.visible)
    })),
    // SEO Metadata
    seo: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      image: ogImage,
      siteName,
      type: 'website'
    }
  };
};

export const actions: Actions = {
  trackClick: async ({ request }) => {
    const formData = await request.formData();
    const pageId = formData.get('pageId') as string;
    const blockId = formData.get('blockId') as string;

    if (!pageId || !blockId) {
      return fail(400, { success: false, message: 'Missing required fields' });
    }

    await trackClick(pageId, blockId, request);
    return { success: true };
  }
};
