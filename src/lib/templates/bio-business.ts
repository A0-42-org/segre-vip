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

export const bioBusiness: Template = {
  id: 'bio-business',
  name: 'Business',
  description: 'Professional profile with featured link and strong CTA',
  type: 'bio',
  blocks: [
    {
      type: 'header',
      content: {
        title: 'Your Business',
        bio: 'Helping businesses grow with digital solutions',
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
        title: '🔥 Featured: Get Started Today',
        url: 'https://example.com/start'
      },
      style: {
        variant: 'featured'
      },
      order: 1
    },
    {
      type: 'link',
      content: {
        title: 'Services',
        url: 'https://example.com/services'
      },
      style: {
        variant: 'primary'
      },
      order: 2
    },
    {
      type: 'link',
      content: {
        title: 'Portfolio',
        url: 'https://example.com/portfolio'
      },
      style: {
        variant: 'secondary'
      },
      order: 3
    },
    {
      type: 'link',
      content: {
        title: 'Pricing',
        url: 'https://example.com/pricing'
      },
      style: {
        variant: 'secondary'
      },
      order: 4
    },
    {
      type: 'cta',
      content: {
        title: 'Book Free Strategy Call',
        url: 'https://calendly.com/yourbusiness/strategy',
        icon: 'calendar'
      },
      style: {
        variant: 'primary',
        size: 'large'
      },
      order: 5
    },
    {
      type: 'social',
      content: {
        platforms: [
          { name: 'linkedin', url: 'https://linkedin.com/company/yourbusiness' },
          { name: 'twitter', url: 'https://twitter.com/yourbusiness' },
          { name: 'instagram', url: 'https://instagram.com/yourbusiness' }
        ]
      },
      style: {
        size: 'medium',
        alignment: 'center'
      },
      order: 6
    }
  ]
};
