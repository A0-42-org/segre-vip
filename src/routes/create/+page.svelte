<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { PageData, ActionData } from './$types';
  import { allTemplates } from '$lib/templates';
  
  interface Props {
    data: PageData;
    form: ActionData;
  }

  const { data, form }: Props = $props();

  // Reactive state using Svelte 5 runes
  let currentStep = $state(1);
  let selectedType = $state<'bio' | 'offer' | null>(null);
  let name = $state('');
  let handle = $state('');
  let description = $state('');
  let selectedTheme = $state<'luxury' | 'neon'>('luxury');
  let selectedTemplate = $state<string | null>(null);
  let errors = $state({ name: '', handle: '' });
  let isCreating = $state(false);

  // Derived states
  const bioTemplates = $derived(
    allTemplates.filter(t => t.type === 'bio')
  );
  
  const offerTemplates = $derived(
    allTemplates.filter(t => t.type === 'offer')
  );

  const availableTemplates = $derived(
    selectedType === 'bio' ? bioTemplates : offerTemplates
  );

  const canProceedToStep2 = $derived(
    selectedType !== null
  );

  const canProceedToStep3 = $derived(
    name.trim().length >= 2 && handle.match(/^[a-zA-Z0-9_-]{3,30}$/)
  );

  const canProceedToStep4 = $derived(
    selectedTheme !== null
  );

  const canProceedToStep5 = $derived(
    selectedTemplate !== null
  );

  // Form validation
  function validateName() {
    if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else {
      errors.name = '';
    }
  }

  function validateHandle() {
    if (!handle) {
      errors.handle = 'Handle is required';
    } else if (!/^[a-zA-Z0-9_-]{3,30}$/.test(handle)) {
      errors.handle = 'Handle must be 3-30 characters (letters, numbers, dashes, underscores)';
    } else {
      errors.handle = '';
    }
  }

  // Navigation
  function nextStep() {
    if (currentStep === 2) {
      validateName();
      validateHandle();
      if (errors.name || errors.handle) return;
    }
    if (currentStep < 5) currentStep++;
  }

  function previousStep() {
    if (currentStep > 1) currentStep--;
  }

  function goToStep(step: number) {
    if (step < currentStep) currentStep = step;
  }

  // Handle form submission
  async function createPage() {
    isCreating = true;
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('handle', handle);
      formData.append('description', description);
      formData.append('theme', selectedTheme);
      formData.append('templateId', selectedTemplate!);

      const response = await fetch('/create', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const result = await response.json();
        if (result.nameError) errors.name = result.nameError;
        if (result.handleError) errors.handle = result.handleError;
        if (result.error) alert(result.error);
        isCreating = false;
        return;
      }

      // Redirect is handled by server
      window.location.href = response.url;
    } catch (error) {
      console.error('Error creating page:', error);
      alert('Failed to create page. Please try again.');
      isCreating = false;
    }
  }
</script>

<svelte:head>
  <title>Create Your Page - Segre.vip</title>
  <meta name="description" content="Create your premium bio or offer page in minutes" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
  <!-- Animated background -->
  <div class="fixed inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);"></div>
  
  <div class="relative z-10 max-w-6xl mx-auto px-4 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 mb-4">
        Create Your Page
      </h1>
      <p class="text-gray-400 text-lg">Build your premium presence in minutes</p>
    </div>

    <!-- Progress Steps -->
    <div class="flex justify-center items-center mb-12">
      {#each [1, 2, 3, 4, 5] as step}
        <div class="flex items-center">
          <button
            onclick={() => goToStep(step)}
            class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 {currentStep >= step
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black'
              : 'bg-gray-800 text-gray-500 hover:bg-gray-700'}"
            disabled={step > currentStep}
          >
            {step}
          </button>
          {#if step < 5}
            <div class="w-20 h-1 mx-2 rounded {currentStep > step
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
              : 'bg-gray-800'}"></div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Main Card with Glassmorphism -->
    <div class="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
      <!-- Animated border effect -->
      <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/20 via-yellow-500/20 to-amber-400/20 blur-xl opacity-50" style="mask-image: linear-gradient(135deg, black 0%, transparent 50%, black 100%);"></div>
      
      <div class="relative p-8 md:p-12">
        <!-- Step 1: Type Selection -->
        {#if currentStep === 1}
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-white mb-8">Choose Your Page Type</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Bio Page -->
              <button
                onclick={() => selectedType = 'bio'}
                class="group relative p-8 rounded-2xl border-2 transition-all duration-300 {selectedType === 'bio'
                  ? 'border-amber-400 bg-gradient-to-br from-amber-400/10 to-yellow-500/10'
                  : 'border-gray-700 bg-white/5 hover:border-gray-600'}"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <h3 class="text-xl font-bold text-white mb-2">Bio Page</h3>
                    <p class="text-gray-400">Perfect for creators and influencers. Showcase your links, social media, and call-to-actions.</p>
                    <ul class="mt-4 space-y-2 text-sm text-gray-400">
                      <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                        Avatar & bio section
                      </li>
                      <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                        Multiple links & buttons
                      </li>
                      <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                        Social media icons
                      </li>
                    </ul>
                  </div>
                </div>
              </button>

              <!-- Offer Page -->
              <button
                onclick={() => selectedType = 'offer'}
                class="group relative p-8 rounded-2xl border-2 transition-all duration-300 {selectedType === 'offer'
                  ? 'border-amber-400 bg-gradient-to-br from-amber-400/10 to-yellow-500/10'
                  : 'border-gray-700 bg-white/5 hover:border-gray-600'}"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="text-left">
                    <h3 class="text-xl font-bold text-white mb-2">Offer Page</h3>
                    <p class="text-gray-400">Convert visitors with a focused landing page. Perfect for products, services, and lead generation.</p>
                    <ul class="mt-4 space-y-2 text-sm text-gray-400">
                      <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                        Hero section
                      </li>
                      <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                        Features & benefits
                      </li>
                      <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                        Testimonials & FAQ
                      </li>
                    </ul>
                  </div>
                </div>
              </button>
            </div>
          </div>
        {/if}

        <!-- Step 2: Basic Info -->
        {#if currentStep === 2}
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-white mb-8">Basic Information</h2>
            
            <div class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Page Name *</label>
                <input
                  type="text"
                  bind:value={name}
                  onblur={validateName}
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="e.g., John's Creative Studio"
                />
                {#if errors.name}
                  <p class="mt-2 text-sm text-red-400">{errors.name}</p>
                {/if}
              </div>

              <!-- Handle -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Page Handle *</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">segre.vip/</span>
                  <input
                    type="text"
                    bind:value={handle}
                    onblur={validateHandle}
                    class="w-full pl-24 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    placeholder="your-username"
                  />
                </div>
                {#if errors.handle}
                  <p class="mt-2 text-sm text-red-400">{errors.handle}</p>
                {/if}
                <p class="mt-2 text-sm text-gray-500">3-30 characters: letters, numbers, dashes, underscores</p>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  bind:value={description}
                  rows="4"
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                  placeholder="A short description of your page..."
                ></textarea>
              </div>
            </div>
          </div>
        {/if}

        <!-- Step 3: Theme Selection -->
        {#if currentStep === 3}
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-white mb-8">Choose Your Theme</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Luxury Theme -->
              <button
                onclick={() => selectedTheme = 'luxury'}
                class="group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 {selectedTheme === 'luxury'
                  ? 'border-amber-400 ring-4 ring-amber-400/20'
                  : 'border-gray-700 hover:border-gray-600'}"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                <div class="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-500/10 to-transparent"></div>
                <div class="relative p-8">
                  <div class="aspect-video mb-6 rounded-xl bg-gradient-to-br from-amber-400/30 to-yellow-500/20 flex items-center justify-center">
                    <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">Luxury</span>
                  </div>
                  <h3 class="text-xl font-bold text-white mb-2">Luxury</h3>
                  <p class="text-gray-400 text-sm">Elegant black & gold gradient with premium feel</p>
                </div>
              </button>

              <!-- Neon Theme -->
              <button
                onclick={() => selectedTheme = 'neon'}
                class="group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 {selectedTheme === 'neon'
                  ? 'border-amber-400 ring-4 ring-amber-400/20'
                  : 'border-gray-700 hover:border-gray-600'}"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black"></div>
                <div class="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20"></div>
                <div class="relative p-8">
                  <div class="aspect-video mb-6 rounded-xl bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">Neon</span>
                  </div>
                  <h3 class="text-xl font-bold text-white mb-2">Neon</h3>
                  <p class="text-gray-400 text-sm">Vibrant cyberpunk colors with fluorescent glow</p>
                </div>
              </button>
            </div>
          </div>
        {/if}

        <!-- Step 4: Template Selection -->
        {#if currentStep === 4}
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-white mb-8">Choose Your Template</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each availableTemplates as template}
                <button
                  onclick={() => selectedTemplate = template.id}
                  class="group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left {selectedTemplate === template.id
                    ? 'border-amber-400 bg-gradient-to-br from-amber-400/10 to-yellow-500/10'
                    : 'border-gray-700 bg-white/5 hover:border-gray-600'}"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-bold text-white">{template.name}</h3>
                      <span class="text-xs text-amber-400 font-medium uppercase">{template.blocks.length} blocks</span>
                    </div>
                  </div>
                  <p class="text-sm text-gray-400">{template.description}</p>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Step 5: Summary -->
        {#if currentStep === 5}
          <div class="space-y-8">
            <h2 class="text-3xl font-bold text-white mb-8">Review Your Page</h2>
            
            <div class="space-y-6">
              <!-- Type -->
              <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 class="text-sm font-medium text-gray-400 mb-2">Page Type</h3>
                <p class="text-xl font-bold text-white capitalize">{selectedType} Page</p>
              </div>

              <!-- Name & Handle -->
              <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 class="text-sm font-medium text-gray-400 mb-2">Page Name</h3>
                  <p class="text-xl font-bold text-white">{name}</p>
                </div>
                <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 class="text-sm font-medium text-gray-400 mb-2">Page Handle</h3>
                  <p class="text-xl font-bold text-white">segre.vip/{handle}</p>
                </div>
              </div>

              <!-- Description -->
              {#if description}
                <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 class="text-sm font-medium text-gray-400 mb-2">Description</h3>
                  <p class="text-white">{description}</p>
                </div>
              {/if}

              <!-- Theme -->
              <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 class="text-sm font-medium text-gray-400 mb-2">Theme</h3>
                <p class="text-xl font-bold text-white capitalize">{selectedTheme}</p>
              </div>

              <!-- Template -->
              {#if selectedTemplate}
                {@const template = allTemplates.find(t => t.id === selectedTemplate)}
                {#if template}
                  <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 class="text-sm font-medium text-gray-400 mb-2">Template</h3>
                    <p class="text-xl font-bold text-white">{template.name}</p>
                    <p class="text-gray-400 mt-2">{template.description}</p>
                    <p class="text-sm text-gray-500 mt-4">Includes {template.blocks.length} blocks</p>
                  </div>
                {/if}
              {/if}
            </div>
          </div>
        {/if}

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-12 pt-8 border-t border-white/10">
          <button
            onclick={previousStep}
            disabled={currentStep === 1 || isCreating}
            class="px-6 py-3 rounded-xl font-medium transition-all duration-300 {currentStep === 1 || isCreating
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-gray-600'}"
          >
            ← Back
          </button>

          {#if currentStep < 5}
            <button
              onclick={nextStep}
              disabled={!canProceedToStep2 && currentStep === 1 ||
                !canProceedToStep3 && currentStep === 2 ||
                !canProceedToStep4 && currentStep === 3 ||
                !canProceedToStep5 && currentStep === 4 || isCreating}
              class="px-8 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
            >
              Next →
            </button>
          {:else}
            <button
              onclick={createPage}
              disabled={isCreating}
              class="px-8 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center gap-2"
            >
              {#if isCreating}
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              {:else}
                Create My Page →
              {/if}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
