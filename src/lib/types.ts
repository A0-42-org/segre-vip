// Block content types
export interface BlockContent {
  title?: string;
  bio?: string;
  avatar?: string;
  url?: string;
  icon?: string;
  platforms?: Array<{
    name: string;
    url: string;
  }>;
  body?: string;
}

// Block style types
export interface BlockStyle {
  alignment?: 'left' | 'center' | 'right';
  fontSize?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'featured';
  size?: 'small' | 'medium' | 'large';
}

// Page type for templates
export type PageType = 'bio' | 'offer';

// Theme type
export type Theme = 'luxury' | 'neon';

// Block type
export type BlockType = 'header' | 'link' | 'cta' | 'social' | 'embed' | 'text';
