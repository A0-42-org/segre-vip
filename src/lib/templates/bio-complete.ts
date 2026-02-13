import type { BlockContent, BlockStyle } from '$lib/types';

export interface Template {
  id: string;
  name: string;
  description: string;
  type: 'bio' | 'offer';
  blocks: Array<{
    type: string;
    content: BlockContent;
    style: BlockStyle;
    order: number;
  }>;
}

export const bioComplete: Template = {
  id: 'bio-complete',
  name: 'Complete',
  description: 'Full profile with header, links, CTA and social media',
  type: 'bio',
  blocks: [
    {
      type: 'header',
      content: {
        title: 'Your Name',
        bio: 'Creator | Entrepreneur | Content Creator',
        avatar: ''
      },
      style: {
        alignment: 'center',
        fontSize: 'large'
      },
      order: 0
    },
    {
      type: 'link',
      content: {
        title: 'My Website',
        url: 'https://example.com'
      },
      style: {
        variant: 'featured'
      },
      order: 1
    },
    {
      type: 'link',
      content: {
        title: 'Portfolio',
        url: 'https://example.com/portfolio'
      },
      style: {
        variant: 'primary'
      },
      order: 2
    },
    {
      type: 'link',
      content: {
        title: 'Blog',
        url: 'https://example.com/blog'
      },
      style: {
        variant: 'secondary'
      },
      order: 3
    },
    {
      type: 'cta',
      content: {
        title: 'Book a Consultation',
        url: 'https://calendly.com/yourname',
        icon: 'calendar'
      },
      style: {
        variant: 'primary',
        size: 'large'
      },
      order: 4
    },
    {
      type: 'social',
      content: {
        platforms: [
          { name: 'instagram', url: 'https://instagram.com/yourname' },
          { name: 'twitter', url: 'https://twitter.com/yourname' },
          { name: 'youtube', url: 'https://youtube.com/yourname' },
          { name: 'tiktok', url: 'https://tiktok.com/@yourname' }
        ]
      },
      style: {
        size: 'medium',
        alignment: 'center'
      },
      order: 5
    }
  ]
};
