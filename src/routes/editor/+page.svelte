<script lang="ts">
  import { onMount } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  import SortableItem from './SortableItem.svelte';
  import { dndzone } from 'svelte-dnd-action';
  import HeaderBlock from '$lib/components/blocks/HeaderBlock.svelte';
  import LinkBlock from '$lib/components/blocks/LinkBlock.svelte';
  import CTABlock from '$lib/components/blocks/CTABlock.svelte';
  import SocialBlock from '$lib/components/blocks/SocialBlock.svelte';
  import ThemeSelector from '$lib/components/ThemeSelector.svelte';
  import PublishButton from '$lib/components/PublishButton.svelte';
  import PreviewFrame from '$lib/components/PreviewFrame.svelte';
  import FullPreviewModal from '$lib/components/FullPreviewModal.svelte';
  import { CheckCircle, File, Eye, RefreshCw, Edit2 } from 'lucide-svelte';

  interface PageData {
    page: {
      id: string;
      title: string;
      theme: string;
      isPublished: boolean;
      username: string;
    };
    blocks: Array<{
      id: string;
      type: string;
      content: any;
      order: number;
      style: any;
      visible: boolean;
    }>;
  }

  let { data }: { data: PageData } = $props();

  let selectedBlock = $state<string | null>(null);
  let blocks = $state([...data.blocks]);
  let localIsPublished = $state(data.page.isPublished);
  let previewLayout = $state<'tab' | 'split'>('split');
  let mobileViewMode = $state<'edit' | 'preview'>('edit');
  let showFullPreview = $state(false);
  let lastUpdated = $state<Date>(new Date());
  let isRefreshing = $state(false);

  // Debounce function
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  function debounce(fn: () => void, delay: number) {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fn, delay);
  }

  // Drag and drop handlers
  function handleConsider(e: any) {
    e.active = true;
  }

  function handleFinalize(e: any) {
    blocks = e.items;
    lastUpdated = new Date();
    debounce(() => {
      // Auto-save or update preview
    }, 500);
  }

  // Handle publish toggle callback
  function handlePublishToggle(newStatus: boolean) {
    localIsPublished = newStatus;
    invalidateAll();
  }

  // Handle refresh
  function handleRefresh() {
    isRefreshing = true;
    invalidateAll();
    setTimeout(() => isRefreshing = false, 500);
  }

  // Computed: check if mobile (derived from window width)
  const isMobile = $derived.by(() => typeof window !== 'undefined' && window.innerWidth < 1024);

  // Computed: show split view
  const showSplitView = $derived(previewLayout === 'split' && !isMobile);

  // Function: formatted last updated time
  function timeSinceUpdate() {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    
    if (diff < 60) return 'À l\'instant';
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`;
    return lastUpdated.toLocaleDateString('fr-FR');
  }
</script>

<svelte:head>
  <title>{data.page.title} - Editor</title>
</svelte:head>

<div class="editor-container">
  <header class="editor-header">
    <div class="header-left">
      <h1>{data.page.title}</h1>
      <div class="status-badge" class:published={localIsPublished} class:draft={!localIsPublished}>
        {#if localIsPublished}
          <CheckCircle class="w-4 h-4" />
          <span>Publié</span>
        {:else}
          <File class="w-4 h-4" />
          <span>Brouillon</span>
        {/if}
      </div>
    </div>
    <div class="actions">
      {#if localIsPublished}
        <a href="/{data.page.username}" target="_blank" rel="noopener noreferrer" class="preview-link">
          <Eye class="w-4 h-4" />
          <span>Voir page</span>
        </a>
      {/if}
      <ThemeSelector currentTheme={data.page.theme} pageId={data.page.id} />
      <PublishButton
        pageId={data.page.id}
        isPublished={localIsPublished}
        onToggle={handlePublishToggle}
      />
    </div>
  </header>

  <!-- Mobile view tabs -->
  {#if isMobile}
    <div class="mobile-tabs">
      <button
        type="button"
        class="tab-button"
        class:active={mobileViewMode === 'edit'}
        onclick={() => mobileViewMode = 'edit'}
      >
        <Edit2 class="w-4 h-4" />
        <span>Éditer</span>
      </button>
      <button
        type="button"
        class="tab-button"
        class:active={mobileViewMode === 'preview'}
        onclick={() => mobileViewMode = 'preview'}
      >
        <Eye class="w-4 h-4" />
        <span>Aperçu</span>
      </button>
    </div>
  {/if}

  <main class="editor-main">
    <!-- Editor Section -->
    <div class="editor-section" class:hidden={isMobile && mobileViewMode === 'preview'}>
      <div class="section-header">
        <h2>Éditeur</h2>
        <div class="last-updated">
          <div class:spin={isRefreshing}>
            <RefreshCw class="w-3 h-3" />
          </div>
          <span>{timeSinceUpdate()}</span>
        </div>
      </div>
      
      <div class="blocks-container">
        {#if blocks.length === 0}
          <div class="empty-state">
            <File class="w-12 h-12 mb-4" />
            <p>Aucun bloc encore. Ajoutez des blocs pour commencer !</p>
          </div>
        {:else}
          <div class="block-list" use:dndzone={{ items: blocks }} onconsider={handleConsider} onfinalize={handleFinalize}>
            {#each blocks as block}
              <SortableItem
                block={block}
                selected={selectedBlock === block.id}
                onselect={() => selectedBlock = block.id}
              />
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Preview Section -->
    <div class="preview-section" class:hidden={isMobile && mobileViewMode === 'edit'}>
      <div class="section-header">
        <h2>Aperçu</h2>
        <button
          type="button"
          class="refresh-button"
          onclick={handleRefresh}
          title="Rafraîchir l'aperçu"
        >
          <div class:spin={isRefreshing}>
            <RefreshCw class="w-4 h-4" />
          </div>
        </button>
      </div>
      
      <PreviewFrame
        blocks={blocks}
        theme={data.page.theme}
        onOpenFullscreen={() => showFullPreview = true}
        onRefresh={handleRefresh}
      />
    </div>
  </main>

  <!-- Full Preview Modal -->
  <FullPreviewModal
    blocks={blocks}
    theme={data.page.theme}
    isOpen={showFullPreview}
    pageId={data.page.id}
    username={data.page.username}
    isPublished={localIsPublished}
    onClose={() => showFullPreview = false}
  />
</div>

<style>
  .editor-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 2rem;
    background: #0a0a0a;
    color: #ffffff;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .editor-header h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
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

  .actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .preview-link {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .preview-link:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .mobile-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.25rem;
    border-radius: 0.5rem;
  }

  .tab-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    border: none;
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tab-button:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
  }

  .tab-button.active {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(251, 191, 36, 0.2));
    color: #fbbf24;
  }

  .editor-main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    flex: 1;
  }

  .editor-section,
  .preview-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .editor-section.hidden,
  .preview-section.hidden {
    display: none;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .section-header h2 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }

  .last-updated {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    background: rgba(255, 255, 255, 0.02);
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .refresh-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s;
  }

  .refresh-button:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
  }

  .blocks-container {
    flex: 1;
  }

  .block-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.02);
    border: 2px dashed rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
  }

  .empty-state p {
    margin: 0;
    font-size: 0.875rem;
  }

  .spin {
    animation: spin 0.5s linear;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Desktop split view */
  @media (min-width: 1024px) {
    .mobile-tabs {
      display: none;
    }

    .editor-main {
      grid-template-columns: 1fr 1fr;
    }

    .editor-section.hidden,
    .preview-section.hidden {
      display: flex;
    }
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .editor-container {
      padding: 1rem;
    }

    .editor-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .header-left {
      width: 100%;
    }

    .actions {
      width: 100%;
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }

    .preview-link span {
      display: none;
    }

    .editor-main {
      gap: 1rem;
    }
  }
</style>
