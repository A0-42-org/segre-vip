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

export const offerSimple: Template = {
  id: 'offer-simple',
  name: 'Simple Offer',
  description: 'Clean landing page with hero, features and CTA',
  type: 'offer',
  blocks: [
    {
      type: 'header',
      content: {
        title: 'Your Offer',
        bio: 'Transform your life with our premium service'
      },
      style: {
        alignment: 'center',
        fontSize: 'large'
      },
      order: 0
    },
    {
      type: 'text',
      content: {
        title: 'Why Choose Us?',
        body: 'We provide exceptional quality and service that exceeds expectations. Our proven approach has helped thousands of clients achieve their goals.'
      },
      style: {
        alignment: 'center',
        fontSize: 'medium'
      },
      order: 1
    },
    {
      type: 'text',
      content: {
        title: 'What You\'ll Get',
        body: '✅ Premium quality service\n✅ Fast delivery\n✅ Full support\n✅ Satisfaction guaranteed'
      },
      style: {
        alignment: 'left',
        fontSize: 'medium'
      },
      order: 2
    },
    {
      type: 'cta',
      content: {
        title: 'Get Started Now',
        url: 'https://example.com/start',
        icon: 'arrow-right'
      },
      style: {
        variant: 'primary',
        size: 'large'
      },
      order: 3
    }
  ]
};
