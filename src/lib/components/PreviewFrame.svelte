<script lang="ts">
  import { onMount } from 'svelte';
  import HeaderBlock from './blocks/HeaderBlock.svelte';
  import LinkBlock from './blocks/LinkBlock.svelte';
  import CTABlock from './blocks/CTABlock.svelte';
  import SocialBlock from './blocks/SocialBlock.svelte';
  import { Smartphone, Tablet, Monitor, Maximize, RefreshCw } from 'lucide-svelte';

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
    deviceType = 'desktop',
    onOpenFullscreen,
    onRefresh
  }: {
    blocks: Block[];
    theme?: string;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
    onOpenFullscreen?: () => void;
    onRefresh?: () => void;
  } = $props();

  let currentDevice = $state<'mobile' | 'tablet' | 'desktop'>(deviceType);
  let isRefreshing = $state(false);

  const devices = [
    { type: 'mobile', icon: Smartphone, width: '375px', height: '812px', label: 'Mobile' },
    { type: 'tablet', icon: Tablet, width: '768px', height: '1024px', label: 'Tablet' },
    { type: 'desktop', icon: Monitor, width: '1280px', height: '720px', label: 'Desktop' }
  ];

  function handleDeviceSelect(type: 'mobile' | 'tablet' | 'desktop') {
    currentDevice = type;
  }

  function handleRefresh() {
    isRefreshing = true;
    onRefresh?.();
    setTimeout(() => isRefreshing = false, 500);
  }

  const activeDevice = $derived.by(() => devices.find(d => d.type === currentDevice));

  function getFrameClasses(type: 'mobile' | 'tablet' | 'desktop') {
    const baseClasses = 'rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border';
    
    if (type === 'mobile') {
      return `${baseClasses} border-gray-800 bg-black`;
    } else if (type === 'tablet') {
      return `${baseClasses} border-gray-700 bg-gray-900`;
    }
    return `${baseClasses} border-gray-600 bg-gray-100`;
  }

  function getScreenClasses(type: 'mobile' | 'tablet' | 'desktop') {
    if (type === 'mobile') {
      return 'w-full h-full overflow-y-auto';
    } else if (type === 'tablet') {
      return 'w-full h-full overflow-y-auto';
    }
    return 'w-full h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100';
  }
</script>

<div class="preview-frame-container">
  <div class="preview-toolbar">
    <div class="device-toggles">
      {#each devices as device}
        {@const Icon = device.icon}
        <button
          type="button"
          class="device-toggle"
          class:active={currentDevice === device.type}
          onclick={() => handleDeviceSelect(device.type as 'mobile' | 'tablet' | 'desktop')}
          title={device.label}
        >
          <Icon class="w-5 h-5" />
        </button>
      {/each}
    </div>
    <div class="preview-actions">
      <button
        type="button"
        class="action-button"
        onclick={handleRefresh}
        title="Refresh preview"
      >
        <div class:spin={isRefreshing}>
          <RefreshCw class="w-5 h-5" />
        </div>
      </button>
      <button
        type="button"
        class="action-button"
        onclick={() => onOpenFullscreen?.()}
        title="Open in fullscreen"
      >
        <Maximize class="w-5 h-5" />
      </button>
    </div>
  </div>

  <div class="preview-wrapper">
    <div
      class="device-frame {getFrameClasses(currentDevice)}"
      style="width: {activeDevice?.width}; height: {activeDevice?.height};"
    >
      {#if currentDevice === 'mobile'}
        <!-- Mobile notch -->
        <div class="mobile-notch">
          <div class="notch-speaker" />
        </div>
      {/if}
      
      <div
        class="preview-screen {getScreenClasses(currentDevice)}"
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
</div>

<style>
  .preview-frame-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .preview-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-wrap: wrap;
  }

  .device-toggles {
    display: flex;
    gap: 0.375rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.25rem;
    border-radius: 0.5rem;
  }

  .device-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: none;
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .device-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }

  .device-toggle.active {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(251, 191, 36, 0.2));
    color: #fbbf24;
  }

  .preview-actions {
    display: flex;
    gap: 0.375rem;
  }

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 1);
  }

  .preview-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    overflow: auto;
    padding: 1rem;
  }

  .device-frame {
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .mobile-notch {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 30px;
    background: #000;
    border-radius: 0 0 20px 20px;
    z-index: 10;
  }

  .notch-speaker {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 6px;
    background: #333;
    border-radius: 3px;
  }

  .preview-screen {
    padding: 1rem;
  }

  .preview-screen[data-theme="luxury"] {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  }

  .preview-screen[data-theme="neon"] {
    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
  }

  .spin {
    animation: spin 0.5s linear;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .device-frame {
      width: 100% !important;
      height: auto !important;
      min-height: 600px;
    }

    .preview-frame-container {
      padding: 1rem;
    }

    .preview-wrapper {
      padding: 0.5rem;
      min-height: 300px;
    }
  }
</style>
