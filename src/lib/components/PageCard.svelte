<script lang="ts">
  import { onMount } from 'svelte';
  import { Eye, Pencil, CheckCircle, File, MoreVertical } from 'lucide-svelte';

  interface Props {
    id: string;
    title: string;
    username: string;
    isPublished: boolean;
    views?: number;
    clicks?: number;
    ctr?: string;
    theme: string;
    onPublish?: (pageId: string, published: boolean) => Promise<void>;
  }

  let {
    id,
    title,
    username,
    isPublished,
    views = 0,
    clicks = 0,
    ctr = '0.0%',
    theme,
    onPublish
  }: Props = $props();

  let isPublishing = $state(false);
  let showMenu = $state(false);

  async function handlePublishToggle() {
    if (isPublishing || !onPublish) return;
    
    // If unpublishing, show confirmation
    if (isPublished) {
      const confirmed = confirm('Êtes-vous sûr de vouloir dépublier cette page ? Elle sera invisible pour le public.');
      if (!confirmed) return;
    }

    isPublishing = true;
    try {
      await onPublish(id, !isPublished);
    } finally {
      isPublishing = false;
    }
  }

  function closeMenu(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('.card-menu') === null) {
      showMenu = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  });
</script>

<article class="page-card">
  <div class="card-header">
    <div class="page-info">
      <h3 class="page-title">{title}</h3>
      <p class="page-username">/{username}</p>
    </div>
    <div class="status-badge {isPublished ? 'published' : 'draft'}">
      {#if isPublished}
        <CheckCircle class="w-4 h-4" />
        <span>Publié</span>
      {:else}
        <File class="w-4 h-4" />
        <span>Brouillon</span>
      {/if}
    </div>
  </div>

  <div class="card-stats">
    <div class="stat-item">
      <span class="stat-value">{views}</span>
      <span class="stat-label">Vues</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">{clicks}</span>
      <span class="stat-label">Clics</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">{ctr}%</span>
      <span class="stat-label">CTR</span>
    </div>
  </div>

  <div class="card-actions">
    {#if isPublished}
      <a 
        href="/{username}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="action-button view-button"
      >
        <Eye class="w-4 h-4" />
        <span>Voir</span>
      </a>
    {/if}
    
    <button 
      class="action-button edit-button"
      onclick={() => window.location.href = `/editor`}
    >
      <Pencil class="w-4 h-4" />
      <span>Éditer</span>
    </button>

    <button 
      class="action-button publish-button {isPublished ? 'unpublish' : 'publish'}"
      onclick={handlePublishToggle}
      disabled={isPublishing}
    >
      {isPublishing ? '...' : (isPublished ? 'Dépublier' : 'Publier')}
    </button>

    <div class="card-menu">
      <button class="menu-trigger" onclick={() => showMenu = !showMenu}>
        <MoreVertical class="w-4 h-4" />
      </button>
      {#if showMenu}
        <div class="menu-dropdown">
          <button 
            class="menu-item"
            onclick={() => { showMenu = false; window.location.href = `/editor`; }}
          >
            <Pencil class="w-4 h-4" />
            <span>Éditer</span>
          </button>
          <button 
            class="menu-item"
            onclick={() => { showMenu = false; handlePublishToggle(); }}
          >
            {#if isPublished}
              <File class="w-4 h-4" />
              <span>Dépublier</span>
            {:else}
              <CheckCircle class="w-4 h-4" />
              <span>Publier</span>
            {/if}
          </button>
        </div>
      {/if}
    </div>
  </div>
</article>

<style>
  .page-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
  }

  .page-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .page-info {
    flex: 1;
  }

  .page-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    line-height: 1.4;
  }

  .page-username {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .status-badge.published {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .status-badge.draft {
    background: rgba(245, 158, 11, 0.1);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .card-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.75rem;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
  }

  .stat-label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .action-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }

  .view-button {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    text-decoration: none;
  }

  .view-button:hover {
    background: rgba(16, 185, 129, 0.25);
  }

  .edit-button {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
  }

  .edit-button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .publish-button {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
    min-width: 90px;
  }

  .publish-button:hover:not(:disabled) {
    background: rgba(245, 158, 11, 0.25);
  }

  .publish-button.unpublish {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
  }

  .publish-button.unpublish:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.25);
  }

  .publish-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .card-menu {
    position: relative;
  }

  .menu-trigger {
    padding: 0.5rem;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.375rem;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.2s;
  }

  .menu-trigger:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  .menu-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 150px;
    background: rgba(0, 0, 0, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    padding: 0.25rem;
    z-index: 50;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .menu-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  @media (max-width: 768px) {
    .card-actions {
      flex-wrap: wrap;
    }

    .action-button {
      min-width: calc(50% - 0.25rem);
    }
  }
</style>
