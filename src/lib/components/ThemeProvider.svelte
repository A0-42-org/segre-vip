<script lang="ts">
  import { setContext } from 'svelte';
  import { browser } from '$app/environment';
  import type { Theme, ThemeType } from '$lib/themes/themes';
  import { getTheme, applyTheme, generateThemeCSSVariables } from '$lib/themes/themes';

  // Theme context key
  const THEME_KEY = 'theme';

  // Props
  interface Props {
    initialTheme?: ThemeType;
    pageTheme?: ThemeType; // For public pages from database
  }

  let { initialTheme = 'luxury', pageTheme }: Props = $props();

  // Reactive theme state
  let currentTheme = $state<ThemeType>(pageTheme || initialTheme);
  let themeObject = $derived<Theme>(getTheme(currentTheme));

  // Provide theme to children
  setContext(THEME_KEY, {
    get theme() { return currentTheme; },
    get themeObject() { return themeObject; },
    setTheme: (theme: ThemeType) => {
      currentTheme = theme;
      if (browser) {
        applyTheme(getTheme(theme));
        // Persist to localStorage for editor/dashboard
        localStorage.setItem('segre-theme', theme);
      }
    },
    toggleTheme: () => {
      const newTheme = currentTheme === 'luxury' ? 'neon' : 'luxury';
      currentTheme = newTheme;
      if (browser) {
        applyTheme(getTheme(newTheme));
        localStorage.setItem('segre-theme', newTheme);
      }
    }
  });

  // Apply theme on mount and on change
  $effect(() => {
    if (browser) {
      // Apply CSS variables
      const cssVars = generateThemeCSSVariables(themeObject);
      let styleEl = document.getElementById('theme-variables');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'theme-variables';
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `
        :root[data-theme="${currentTheme}"] {
          ${cssVars}
        }
      `;
      
      // Set data-theme attribute on html element
      document.documentElement.setAttribute('data-theme', currentTheme);
      
      // Apply theme-specific body styles
      document.body.style.background = themeObject.colors.background;
      document.body.style.backgroundImage = themeObject.gradients.background;
      document.body.style.color = themeObject.colors.text;
    }
  });
</script>

<slot />
