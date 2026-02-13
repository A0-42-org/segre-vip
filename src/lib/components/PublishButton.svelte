<script lang="ts">
  import { onMount } from 'svelte';
  import { File, Check, AlertTriangle } from 'lucide-svelte';

  interface Props {
    pageId: string;
    isPublished: boolean;
    onToggle?: (isPublished: boolean) => void;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
  }

  let {
    pageId,
    isPublished,
    onToggle,
    size = 'md',
    showIcon = true
  }: Props = $props();

  let isPublishing = $state(false);
  let showConfirm = $state(false);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  async function handlePublish() {
    if (isPublishing) return;
    
    // If unpublishing, show confirmation
    if (isPublished && !showConfirm) {
      showConfirm = true;
      return;
    }

    isPublishing = true;
    showConfirm = false;

    try {
      const formData = new FormData();
      formData.append('pageId', pageId);
      formData.append('published', (!isPublished).toString());

      const response = await fetch('?/togglePublish', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        const newStatus = result.data?.published;
        onToggle?.(newStatus);
      }
    } catch (error) {
      console.error('Publish error:', error);
    } finally {
      isPublishing = false;
    }
  }

  function cancelUnpublish() {
    showConfirm = false;
  }
</script>

<div class="publish-button-wrapper">
  {#if isPublished && showConfirm}
    <div class="confirm-dialog">
      <AlertTriangle class="w-5 h-5 text-yellow-500" />
      <span class="confirm-text">Unpublish this page?</span>
      <div class="confirm-actions">
        <button
          class="cancel-btn"
          onclick={cancelUnpublish}
        >
          Cancel
        </button>
        <button
          class="confirm-btn"
          onclick={handlePublish}
          disabled={isPublishing}
        >
          {isPublishing ? 'Unpublishing...' : 'Yes, Unpublish'}
        </button>
      </div>
    </div>
  {:else}
    <button
      class="publish-button {isPublished ? 'published' : 'draft'}"
      class:size={sizeClasses[size]}
      onclick={handlePublish}
      disabled={isPublishing}
      title={isPublished ? 'Click to unpublish' : 'Click to publish'}
    >
      {#if showIcon}
        {#if isPublished}
          <Check class="w-4 h-4" />
        {:else}
          <File class="w-4 h-4" />
        {/if}
      {/if}
      <span>{isPublishing ? (isPublished ? 'Unpublishing...' : 'Publishing...') : (isPublished ? 'Published' : 'Publish')}</span>
    </button>
  {/if}
</div>

<style>
  .publish-button-wrapper {
    position: relative;
  }

  .publish-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }

  .publish-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .publish-button.published {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .publish-button.published:hover:not(:disabled) {
    background: rgba(16, 185, 129, 0.3);
    border-color: rgba(16, 185, 129, 0.5);
  }

  .publish-button.draft {
    background: rgba(245, 158, 11, 0.1);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .publish-button.draft:hover:not(:disabled) {
    background: rgba(245, 158, 11, 0.2);
    border-color: rgba(245, 158, 11, 0.4);
  }

  .confirm-dialog {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.95);
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 0.5rem;
    white-space: nowrap;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  }

  .confirm-text {
    color: white;
    font-size: 0.875rem;
  }

  .confirm-actions {
    display: flex;
    gap: 0.5rem;
  }

  .cancel-btn {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .cancel-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .confirm-btn {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    border: none;
    background: rgba(239, 68, 68, 0.8);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .confirm-btn:hover:not(:disabled) {
    background: rgba(239, 68, 68, 1);
  }
</style>
