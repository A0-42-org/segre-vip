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

export const offerDetailed: Template = {
  id: 'offer-detailed',
  name: 'Premium Offer',
  description: 'Comprehensive landing page with testimonials and FAQ',
  type: 'offer',
  blocks: [
    {
      type: 'header',
      content: {
        title: 'Transform Your Life',
        bio: 'The premium solution that delivers results'
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
        title: 'Why This Works',
        body: 'Our proven methodology has helped thousands of people achieve their goals. We combine cutting-edge techniques with personalized support to ensure your success.'
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
        body: '✅ Step-by-step guidance\n✅ Expert support 24/7\n✅ Proven strategies\n✅ Community access\n✅ Lifetime updates\n✅ Money-back guarantee'
      },
      style: {
        alignment: 'left',
        fontSize: 'medium'
      },
      order: 2
    },
    {
      type: 'text',
      content: {
        title: 'What People Say',
        body: '"This completely changed my life. I\'ve never seen results like this before." - Sarah M.\n\n"The best investment I\'ve ever made. Highly recommend to anyone." - John D.\n\n"Simple, effective, and it actually works. 10/10." - Emily R.'
      },
      style: {
        alignment: 'left',
        fontSize: 'small'
      },
      order: 3
    },
    {
      type: 'text',
      content: {
        title: 'Frequently Asked Questions',
        body: 'Q: How long does it take?\nA: Most people see results within 30 days.\n\nQ: Is there a guarantee?\nA: Yes, we offer a 30-day money-back guarantee.\n\nQ: What if I need help?\nA: Our support team is available 24/7 to help you.'
      },
      style: {
        alignment: 'left',
        fontSize: 'small'
      },
      order: 4
    },
    {
      type: 'cta',
      content: {
        title: 'Start Your Journey',
        url: 'https://example.com/start',
        icon: 'rocket'
      },
      style: {
        variant: 'primary',
        size: 'large'
      },
      order: 5
    }
  ]
};
