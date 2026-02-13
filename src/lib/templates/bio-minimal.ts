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

export const bioMinimal: Template = {
  id: 'bio-minimal',
  name: 'Minimal',
  description: 'Clean and simple with header + 3 links',
  type: 'bio',
  blocks: [
    {
      type: 'header',
      content: {
        title: 'Your Name',
        bio: 'Bio description goes here',
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
        title: 'Link 1',
        url: 'https://example.com'
      },
      style: {
        variant: 'primary'
      },
      order: 1
    },
    {
      type: 'link',
      content: {
        title: 'Link 2',
        url: 'https://example.com'
      },
      style: {
        variant: 'secondary'
      },
      order: 2
    },
    {
      type: 'link',
      content: {
        title: 'Link 3',
        url: 'https://example.com'
      },
      style: {
        variant: 'secondary'
      },
      order: 3
    }
  ]
};
