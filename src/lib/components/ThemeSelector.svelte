<script lang="ts">
  import { getAllThemes } from '$lib/themes/themes';
  import { Palette } from 'lucide-svelte';

  interface Props {
    currentTheme: string;
    pageId: string;
  }

  let { currentTheme, pageId }: Props = $props();
  let isOpen = $state(false);
  const themes = getAllThemes();

  async function handleThemeChange(themeId: string) {
    const formData = new FormData();
    formData.append('pageId', pageId);
    formData.append('theme', themeId);

    const response = await fetch('?/updateTheme', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      window.location.reload();
    }
    isOpen = false;
  }

  function getThemePreviewColor(themeId: string): string {
    const theme = themes.find(t => t.id === themeId);
    return theme?.colors.primary || '#000000';
  }
</script>

<div class="theme-selector">
  <button
    class="theme-button"
    onclick={() => isOpen = !isOpen}
    aria-expanded={isOpen}
  >
    <Palette class="w-4 h-4" />
    <span>Theme: {currentTheme}</span>
  </button>

  {#if isOpen}
    <div class="theme-dropdown">
      {#each themes as theme}
        <button
          class="theme-option {currentTheme === theme.id ? 'active' : ''}"
          onclick={() => handleThemeChange(theme.id)}
        >
          <div
            class="theme-preview"
            style="background: {theme.colors.primary};"
          ></div>
          <div class="theme-info">
            <span class="theme-name">{theme.name}</span>
            <span class="theme-description">{theme.description}</span>
          </div>
          {#if currentTheme === theme.id}
            <span class="active-indicator">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .theme-selector {
    position: relative;
  }

  .theme-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .theme-button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .theme-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    padding: 0.5rem;
    min-width: 280px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  .theme-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  .theme-option:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .theme-option.active {
    background: rgba(255, 255, 255, 0.1);
  }

  .theme-preview {
    width: 40px;
    height: 40px;
    border-radius: 0.5rem;
    flex-shrink: 0;
  }

  .theme-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
  }

  .theme-name {
    font-weight: 600;
    color: white;
    font-size: 0.875rem;
  }

  .theme-description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .active-indicator {
    color: #10b981;
    font-weight: bold;
    font-size: 1.25rem;
  }
</style>
