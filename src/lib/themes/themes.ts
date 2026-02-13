// Theme definitions for Segre.vip
// Using CSS variables for performance and flexibility

export type ThemeType = 'luxury' | 'neon';

export interface Theme {
  id: ThemeType;
  name: string;
  description: string;
  colors: ThemeColors;
  gradients: ThemeGradients;
  typography: ThemeTypography;
  effects: ThemeEffects;
}

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textMuted: string;
  border: string;
  borderLight: string;
  accent: string;
  accentLight: string;
}

export interface ThemeGradients {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  button: string;
  buttonHover: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyAlt: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface ThemeEffects {
  glassmorphism: {
    background: string;
    blur: string;
    border: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
  glow: {
    primary: string;
    secondary: string;
  };
}

// Luxury Theme - Gold & Black Elegance
export const luxuryTheme: Theme = {
  id: 'luxury',
  name: 'Luxury',
  description: 'Elegant gold and black design with glassmorphism effects',
  colors: {
    primary: '#f59e0b',
    primaryLight: '#fbbf24',
    primaryDark: '#d97706',
    secondary: '#1f2937',
    background: '#111827',
    backgroundAlt: '#1f2937',
    text: '#ffffff',
    textMuted: '#9ca3af',
    border: '#374151',
    borderLight: '#4b5563',
    accent: '#f59e0b',
    accentLight: '#fcd34d'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    secondary: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)',
    card: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(17, 24, 39, 0.8) 50%, rgba(31, 41, 55, 0.1) 100%)',
    button: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    buttonHover: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyAlt: '"Playfair Display", Georgia, "Times New Roman", serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  effects: {
    glassmorphism: {
      background: 'rgba(17, 24, 39, 0.6)',
      blur: '12px',
      border: 'rgba(245, 158, 11, 0.2)'
    },
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
      md: '0 4px 6px rgba(0, 0, 0, 0.5)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.5)'
    },
    glow: {
      primary: 'rgba(245, 158, 11, 0.3)',
      secondary: 'rgba(31, 41, 55, 0.5)'
    }
  }
};

// Neon Theme - Fluorescent Cyberpunk
export const neonTheme: Theme = {
  id: 'neon',
  name: 'Neon',
  description: 'Vibrant fluorescent colors with cyberpunk aesthetic',
  colors: {
    primary: '#a855f7',
    primaryLight: '#c084fc',
    primaryDark: '#7e22ce',
    secondary: '#ec4899',
    background: '#0f172a',
    backgroundAlt: '#1e1b4b',
    text: '#ffffff',
    textMuted: '#94a3b8',
    border: '#312e81',
    borderLight: '#4338ca',
    accent: '#06b6d4',
    accentLight: '#22d3ee'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
    secondary: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    card: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(30, 27, 75, 0.8) 50%, rgba(236, 72, 153, 0.15) 100%)',
    button: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    buttonHover: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyAlt: '"Inter", "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  effects: {
    glassmorphism: {
      background: 'rgba(15, 23, 42, 0.7)',
      blur: '16px',
      border: 'rgba(168, 85, 247, 0.3)'
    },
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.6)',
      md: '0 4px 6px rgba(168, 85, 247, 0.3)',
      lg: '0 10px 15px rgba(168, 85, 247, 0.4)'
    },
    glow: {
      primary: 'rgba(168, 85, 247, 0.6)',
      secondary: 'rgba(236, 72, 153, 0.6)'
    }
  }
};

// Theme registry
export const themes: Record<ThemeType, Theme> = {
  luxury: luxuryTheme,
  neon: neonTheme
};

// Get theme by ID
export function getTheme(themeId: ThemeType): Theme {
  return themes[themeId] || luxuryTheme;
}

// Get all available themes
export function getAllThemes(): Theme[] {
  return Object.values(themes);
}

// Generate CSS variables from theme
export function generateThemeCSSVariables(theme: Theme): string {
  const vars: string[] = [];

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    vars.push(`--theme-color-${key}: ${value};`);
  });

  // Gradients
  Object.entries(theme.gradients).forEach(([key, value]) => {
    vars.push(`--theme-gradient-${key}: ${value};`);
  });

  // Typography
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    vars.push(`--theme-font-${key}: ${value};`);
  });
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    vars.push(`--theme-font-size-${key}: ${value};`);
  });
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    vars.push(`--theme-font-weight-${key}: ${value};`);
  });

  // Effects
  Object.entries(theme.effects.glassmorphism).forEach(([key, value]) => {
    vars.push(`--theme-glassmorphism-${key}: ${value};`);
  });
  Object.entries(theme.effects.shadow).forEach(([key, value]) => {
    vars.push(`--theme-shadow-${key}: ${value};`);
  });
  Object.entries(theme.effects.glow).forEach(([key, value]) => {
    vars.push(`--theme-glow-${key}: ${value};`);
  });

  return vars.join('\n  ');
}

// Apply theme to document
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const cssVars = generateThemeCSSVariables(theme);
  
  root.setAttribute('data-theme', theme.id);
  
  // Create or update style element
  let styleEl = document.getElementById('theme-variables');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'theme-variables';
    document.head.appendChild(styleEl);
  }
  
  styleEl.textContent = `
    :root[data-theme="${theme.id}"] {
      ${cssVars}
    }
  `;
}
