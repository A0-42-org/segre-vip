<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { X, ExternalLink } from 'lucide-svelte';
  import HeaderBlock from './blocks/HeaderBlock.svelte';
  import LinkBlock from './blocks/LinkBlock.svelte';
  import CTABlock from './blocks/CTABlock.svelte';
  import SocialBlock from './blocks/SocialBlock.svelte';

  interface Block {
    id: string;
    type: string;
    content: any;
    order: number;
    style: any;
    visible: boolean;
  }

  let {
    blocks,
    theme = 'luxury',
    isOpen = false,
    pageId,
    username,
    isPublished = false,
    onClose
  }: {
    blocks: Block[];
    theme?: string;
    isOpen?: boolean;
    pageId: string;
    username: string;
    isPublished?: boolean;
    onClose?: () => void;
  } = $props();

  let show = $state(isOpen);

  $effect(() => {
    show = isOpen;
  });

  function handleClose() {
    show = false;
    onClose?.();
  }

  function handleOpenNewTab() {
    window.open(`/${username}`, '_blank');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && show) {
      handleClose();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if show}
  <div class="modal-backdrop">
    <div class="modal-content">
      <div class="modal-header">
        <div class="header-left">
          <h2>Aperçu complet</h2>
          {#if isPublished}
            <span class="published-badge">Publié</span>
          {:else}
            <span class="draft-badge">Brouillon</span>
          {/if}
        </div>
        <div class="header-actions">
          {#if isPublished}
            <button
              type="button"
              class="external-link-button"
              onclick={handleOpenNewTab}
              title="Open in new tab"
            >
              <ExternalLink class="w-5 h-5" />
              <span>Ouvrir dans un nouvel onglet</span>
            </button>
          {/if}
          <button
            type="button"
            class="close-button"
            onclick={handleClose}
            title="Close"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        class="preview-fullscreen"
        data-theme={theme}
      >
        {#each blocks as block}
          {#if block.type === 'header'}
            <HeaderBlock content={block.content} />
          {:else if block.type === 'link'}
            <LinkBlock content={block.content} />
          {:else if block.type === 'cta'}
            <CTABlock content={block.content} />
          {:else if block.type === 'social'}
            <SocialBlock content={block.content} />
          {/if}
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    animation: fadeIn 0.2s ease-out;
    padding: 1rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-content {
    width: 100%;
    max-width: 1400px;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0a0a0a;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.02);
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .header-left h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
  }

  .published-badge,
  .draft-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .published-badge {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .draft-badge {
    background: rgba(245, 158, 11, 0.1);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .external-link-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.1));
    color: #fbbf24;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .external-link-button:hover {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(251, 191, 36, 0.2));
    border-color: rgba(251, 191, 36, 0.5);
    transform: translateY(-1px);
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    color: #ef4444;
  }

  .preview-fullscreen {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    min-height: 0;
  }

  .preview-fullscreen[data-theme="luxury"] {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  }

  .preview-fullscreen[data-theme="neon"] {
    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
  }

  @media (max-width: 768px) {
    .modal-content {
      max-width: 100%;
      border-radius: 0.5rem;
    }

    .modal-header {
      padding: 1rem;
      flex-direction: column;
      align-items: flex-start;
    }

    .header-left {
      width: 100%;
      justify-content: space-between;
    }

    .header-actions {
      width: 100%;
      justify-content: flex-end;
    }

    .external-link-button span {
      display: none;
    }

    .preview-fullscreen {
      padding: 1rem;
    }
  }
</style>
