import { eq } from 'drizzle-orm';
import { type Actions, type ServerLoad, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { auth } from '$lib/auth';
import { page, block } from '$lib/db/schema';
import { z } from 'zod';

// URL validation schema - only allow http:// and https://
const safeUrlSchema = z.string().url().refine(
  (url) => url.startsWith('http://') || url.startsWith('https://'),
  { message: 'Only http:// and https:// URLs are allowed' }
);

// Block content validation based on block type
const blockContentSchema = z.object({
  targetUrl: safeUrlSchema.optional(),
  url: safeUrlSchema.optional(),
  links: z.array(z.object({
    url: safeUrlSchema
  })).optional(),
  socials: z.array(z.object({
    url: safeUrlSchema
  })).optional()
});

function generateId() {
  return crypto.randomUUID();
}

export const load: ServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    throw redirect(302, '/login');
  }

  // Get first page for this user for MVP
  const userPage = await db.query.page.findFirst({
    where: eq(page.userId, session.user.id)
  });

  if (!userPage) {
    // Return a default page structure for MVP
    return {
      page: {
        id: '',
        title: 'My Bio Page',
        theme: 'luxury',
        isPublished: false,
        username: session.user.name || 'user'
      },
      blocks: []
    };
  }

  // Get all blocks for this page, ordered
  const pageBlocks = await db.query.block.findMany({
    where: eq(block.pageId, userPage.id),
    orderBy: (blockTable: any, { asc }: any) => [asc(blockTable.order)]
  });

  return {
    page: {
      id: userPage.id,
      title: userPage.title,
      theme: userPage.theme,
      isPublished: Boolean(userPage.isPublished),
      username: userPage.username
    },
    blocks: pageBlocks.map((b: any) => ({
      id: b.id,
      type: b.type,
      content: JSON.parse(b.content),
      style: JSON.parse(b.style || '{}'),
      order: b.order,
      visible: Boolean(b.visible)
    }))
  };
};

export const actions: Actions = {
  createBlock: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return fail(401, { success: false, message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const pageId = formData.get('pageId') as string;
    const type = formData.get('type') as string;

    if (!pageId || !type) {
      return fail(400, { success: false, message: 'Missing required fields' });
    }

    // Verify ownership
    const pageRecord = await db.query.page.findFirst({
      where: eq(page.id, pageId)
    });

    if (!pageRecord || pageRecord.userId !== session.user.id) {
      return fail(403, { success: false, message: 'Not authorized' });
    }

    // Create new block
    const newBlock = await db.insert(block).values({
      id: generateId(),
      pageId,
      type,
      content: JSON.stringify({}),
      style: JSON.stringify({}),
      order: 0
    }).returning();

    return { success: true, blockId: newBlock[0].id };
  },

  updateBlock: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return fail(401, { success: false, message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const blockId = formData.get('blockId') as string;
    const content = formData.get('content') as string;

    if (!blockId || !content) {
      return fail(400, { success: false, message: 'Missing required fields' });
    }

    // Verify ownership
    const blockRecord = await db.query.block.findFirst({
      where: eq(block.id, blockId)
    });

    if (!blockRecord) {
      return fail(404, { success: false, message: 'Block not found' });
    }

    const pageRecord = await db.query.page.findFirst({
      where: eq(page.id, blockRecord.pageId)
    });

    if (!pageRecord || pageRecord.userId !== session.user.id) {
      return fail(403, { success: false, message: 'Not authorized' });
    }

    // Parse and validate content for URLs
    try {
      const parsedContent = JSON.parse(content);
      
      // Validate URLs based on block type
      const validation = blockContentSchema.safeParse(parsedContent);
      if (!validation.success) {
        return fail(400, { 
          success: false, 
          message: 'Invalid URL detected. Only http:// and https:// URLs are allowed.',
          errors: validation.error.errors
        });
      }
    } catch (e) {
      return fail(400, { success: false, message: 'Invalid JSON content' });
    }

    await db
      .update(block)
      .set({ content })
      .where(eq(block.id, blockId));

    return { success: true };
  },

  deleteBlock: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return fail(401, { success: false, message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const blockId = formData.get('blockId') as string;

    if (!blockId) {
      return fail(400, { success: false, message: 'Missing blockId' });
    }

    // Verify ownership
    const blockRecord = await db.query.block.findFirst({
      where: eq(block.id, blockId)
    });

    if (!blockRecord) {
      return fail(404, { success: false, message: 'Block not found' });
    }

    const pageRecord = await db.query.page.findFirst({
      where: eq(page.id, blockRecord.pageId)
    });

    if (!pageRecord || pageRecord.userId !== session.user.id) {
      return fail(403, { success: false, message: 'Not authorized' });
    }

    await db.delete(block).where(eq(block.id, blockId));

    return { success: true };
  },

  reorderBlocks: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return fail(401, { success: false, message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const pageId = formData.get('pageId') as string;
    const blockOrder = formData.get('blockOrder') as string;

    if (!pageId || !blockOrder) {
      return fail(400, { success: false, message: 'Missing required fields' });
    }

    // Verify ownership
    const pageRecord = await db.query.page.findFirst({
      where: eq(page.id, pageId)
    });

    if (!pageRecord || pageRecord.userId !== session.user.id) {
      return fail(403, { success: false, message: 'Not authorized' });
    }

    const order = JSON.parse(blockOrder) as string[];

    // Update order for each block
    for (let i = 0; i < order.length; i++) {
      await db
        .update(block)
        .set({ order: i })
        .where(eq(block.id, order[i]));
    }

    return { success: true };
  },

  publishPage: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return fail(401, { success: false, message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const pageId = formData.get('pageId') as string;
    const isPublished = formData.get('isPublished') as string;

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

    await db
      .update(page)
      .set({ isPublished: isPublished === 'true' ? true : false })
      .where(eq(page.id, pageId));

    return { success: true, data: { published: isPublished === 'true' } };
  },

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
  },

  updateTheme: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return fail(401, { success: false, message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const pageId = formData.get('pageId') as string;
    const theme = formData.get('theme') as string;

    if (!pageId || !theme) {
      return fail(400, { success: false, message: 'Missing required fields' });
    }

    // Verify ownership
    const pageRecord = await db.query.page.findFirst({
      where: eq(page.id, pageId)
    });

    if (!pageRecord || pageRecord.userId !== session.user.id) {
      return fail(403, { success: false, message: 'Not authorized' });
    }

    // Validate theme
    const validThemes = ['luxury', 'neon'];
    if (!validThemes.includes(theme)) {
      return fail(400, { success: false, message: 'Invalid theme' });
    }

    await db
      .update(page)
      .set({ theme })
      .where(eq(page.id, pageId));

    return { success: true, theme };
  }
};
