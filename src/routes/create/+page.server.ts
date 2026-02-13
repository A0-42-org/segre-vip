import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { page, block } from '$lib/db/schema';
import { allTemplates } from '$lib/templates';
import { eq } from 'drizzle-orm';
import { generateId } from 'better-auth';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

export const load: PageServerLoad = async ({ locals, request }) => {
  // Check if user is authenticated using BetterAuth
  const session = await locals.auth.api.getSession({ headers: request.headers });
  
  if (!session) {
    redirect(302, '/login');
  }

  return {
    user: session.user,
    templates: allTemplates
  };
};

export const actions: Actions = {
  createPage: async ({ request, locals }) => {
    const session = await locals.auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return fail(401, { error: 'Unauthorized' });
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const handle = formData.get('handle') as string;
    const description = formData.get('description') as string;
    const theme = formData.get('theme') as string || 'luxury';
    const templateId = formData.get('templateId') as string;

    // Validation
    const nameError = !name || name.trim().length < 2 ? 'Name must be at least 2 characters' : null;
    const handleError = !handle ? 'Handle is required' : 
      !/^[a-zA-Z0-9_-]{3,30}$/.test(handle) ? 'Handle must be 3-30 characters (letters, numbers, dashes, underscores)' : null;
    
    if (nameError || handleError) {
      return fail(400, { nameError, handleError, name, handle, description });
    }

    // Check if handle is already taken
    const existingPage = await db.select().from(page).where(eq(page.username, handle));
    if (existingPage.length > 0) {
      return fail(400, { error: 'Handle is already taken', handle });
    }

    // Find template
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) {
      return fail(400, { error: 'Template not found' });
    }

    try {
      // Generate IDs
      const pageId = generateId();
      const slug = handle.toLowerCase();

      // Create page
      const newPage = await db.insert(page).values({
        id: pageId,
        userId: session.user.id,
        username: handle,
        slug,
        type: template.type,
        title: name,
        description: description || '',
        theme: theme as 'luxury' | 'neon',
        isPublished: false,
        coverImage: null
      }).returning();

      // Create blocks from template
      const blockPromises = template.blocks.map((blockTemplate) => {
        const blockId = generateId();
        return db.insert(block).values({
          id: blockId,
          pageId,
          type: blockTemplate.type,
          content: JSON.stringify(blockTemplate.content),
          style: JSON.stringify(blockTemplate.style),
          order: blockTemplate.order,
          visible: true,
          trackingLabel: null,
          targetUrl: (blockTemplate.content as any).url || null,
          openInNewTab: true
        });
      });

      await Promise.all(blockPromises);

      // Redirect to editor
      redirect(302, `/editor?pageId=${pageId}`);
    } catch (error) {
      console.error('Error creating page:', error);
      return fail(500, { error: 'Failed to create page. Please try again.' });
    }
  }
};
