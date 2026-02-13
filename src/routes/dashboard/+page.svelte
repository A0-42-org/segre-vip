<script lang="ts">
  import { onMount } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  import PageCard from '$lib/components/PageCard.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  type Filter = 'all' | 'published' | 'draft';
  let filter: Filter = $state('all');

  // Define explicit type for page objects
  type PageItem = {
    id: string;
    title: string;
    username: string;
    theme: string;
    isPublished: boolean;
    views: number;
    clicks: number;
    ctr: string;
  };

  const filteredPages = $derived(() => {
    const result: PageItem[] = [];
    
    if (filter === 'all') {
      return data.pages as PageItem[];
    }
    if (filter === 'published') {
      return (data.pages as PageItem[]).filter(p => p.isPublished);
    }
    return (data.pages as PageItem[]).filter(p => !p.isPublished);
  });

  async function handlePublish(pageId: string, published: boolean) {
    const formData = new FormData();
    formData.append('pageId', pageId);
    formData.append('published', published.toString());

    const response = await fetch('?/togglePublish', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      invalidateAll();
    }
  }
</script>

<svelte:head>
  <title>Dashboard - Segre.vip</title>
</svelte:head>

<div class="dashboard-container">
  <header class="dashboard-header">
    <div class="header-content">
      <h1>Bienvenue, {data.user.name}!</h1>
      <p>Gérez vos pages bio et suivez vos performances</p>
    </div>
    <a href="/editor" class="create-button">
      <span>+ Créer une page</span>
    </a>
  </header>

  <section class="stats-section">
    <div class="stat-card">
      <span class="stat-label">Vues (7j)</span>
      <span class="stat-value">{data.stats.views}</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Clics (7j)</span>
      <span class="stat-value">{data.stats.clicks}</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">CTR moyen</span>
      <span class="stat-value">{data.stats.ctr}%</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Pages actives</span>
      <span class="stat-value">{data.pages.filter(p => p.isPublished).length}/{data.pages.length}</span>
    </div>
  </section>

  <section class="pages-section">
    <div class="pages-header">
      <h2>Vos pages</h2>
      <div class="filter-group">
        <button
          class="filter-button"
          class:active={filter === 'all'}
          onclick={() => filter = 'all'}
        >
          Toutes
        </button>
        <button
          class="filter-button"
          class:active={filter === 'published'}
          onclick={() => filter = 'published'}
        >
          Publiées
        </button>
        <button
          class="filter-button"
          class:active={filter === 'draft'}
          onclick={() => filter = 'draft'}
        >
          Brouillons
        </button>
      </div>
    </div>

    {#if filteredPages().length === 0}
      <div class="empty-state">
        <div class="empty-content">
          <p class="empty-title">{filter === 'draft' ? 'Aucun brouillon' : filter === 'published' ? 'Aucune page publiée' : 'Aucune page'}</p>
          <p class="empty-subtitle">{filter === 'draft' ? 'Toutes vos pages sont publiées' : filter === 'published' ? 'Publiez une page pour la voir ici' : 'Créez votre première page bio'}</p>
          <a href="/editor" class="empty-action">Créer une page</a>
        </div>
      </div>
    {:else}
      <div class="pages-grid">
        {#each filteredPages() as page (page.id)}
          <PageCard
            id={page.id}
            title={page.title}
            username={page.username}
            isPublished={page.isPublished}
            views={page.views}
            clicks={page.clicks}
            ctr={page.ctr}
            theme={page.theme}
            onPublish={handlePublish}
          />
        {/each}
      </div>
    {/if}
  </section>

  <section class="quick-actions-section">
    <h2>Actions rapides</h2>
    <div class="quick-actions-grid">
      <a href="/editor" class="quick-action-card">
        <span class="action-icon">✏️</span>
        <h3>Éditer page</h3>
        <p>Modifier votre bio page</p>
      </a>
      <a href="/analytics" class="quick-action-card">
        <span class="action-icon">📊</span>
        <h3>Analytics</h3>
        <p>Voir les statistiques</p>
      </a>
      <a href="/settings" class="quick-action-card">
        <span class="action-icon">⚙️</span>
        <h3>Paramètres</h3>
        <p>Gérer votre compte</p>
      </a>
      <a href="https://segre.vip" target="_blank" rel="noopener noreferrer" class="quick-action-card">
        <span class="action-icon">🔗</span>
        <h3>Documentation</h3>
        <p>Aide et guides</p>
      </a>
    </div>
  </section>
</div>

<style>
  :root {
    --primary: #FFD700;
    --primary-dark: #B8860B;
    --bg-glass: rgba(17, 17, 17, 0.8);
    --bg-card: rgba(30, 30, 30, 0.6);
    --border-color: rgba(255, 215, 0, 0.2);
  }

  .dashboard-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%);
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .dashboard-header {
    max-width: 1200px;
    margin: 0 auto 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-content h1 {
    color: var(--primary);
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }

  .header-content p {
    color: #888;
    font-size: 1rem;
    margin: 0;
  }

  .create-button {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: #000;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .create-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  }

  .stats-section {
    max-width: 1200px;
    margin: 0 auto 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .stat-card {
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
  }

  .stat-label {
    display: block;
    color: #888;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .stat-value {
    display: block;
    color: var(--primary);
    font-size: 2rem;
    font-weight: 700;
  }

  .pages-section {
    max-width: 1200px;
    margin: 0 auto 2rem;
  }

  .pages-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .pages-header h2 {
    color: #fff;
    font-size: 1.5rem;
    margin: 0;
  }

  .filter-group {
    display: flex;
    gap: 0.5rem;
  }

  .filter-button {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #888;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-button:hover {
    border-color: var(--primary);
    color: #fff;
  }

  .filter-button.active {
    background: var(--primary);
    border-color: var(--primary);
    color: #000;
  }

  .empty-state {
    background: var(--bg-card);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 3rem;
    text-align: center;
  }

  .empty-title {
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }

  .empty-subtitle {
    color: #888;
    font-size: 1rem;
    margin: 0 0 1.5rem 0;
  }

  .empty-action {
    display: inline-block;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: #000;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
  }

  .pages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .quick-actions-section {
    max-width: 1200px;
    margin: 0 auto;
  }

  .quick-actions-section h2 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .quick-action-card {
    background: var(--bg-card);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .quick-action-card:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
  }

  .action-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  .quick-action-card h3 {
    color: #fff;
    font-size: 1.125rem;
    margin: 0.5rem 0 0.25rem 0;
  }

  .quick-action-card p {
    color: #888;
    font-size: 0.875rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    .dashboard-container {
      padding: 1rem;
    }

    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .stats-section {
      grid-template-columns: 1fr 1fr;
    }

    .pages-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .pages-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
