<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  import {
    User,
    Mail,
    Lock,
    Shield,
    AlertTriangle,
    Camera,
    Save,
    X,
    Check,
    LogOut,
    Smartphone,
    Monitor,
    Globe,
    Trash2
  } from 'lucide-svelte';

  type PageData = {
    user?: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      createdAt: Date;
    };
    sessions?: Array<{
      id: string;
      createdAt: Date;
      expiresAt: Date;
      ipAddress?: string | null;
      userAgent?: string | null;
    }>;
  };

  let data = $page.data as PageData;
  let activeTab = $state('profile');
  let showDeleteModal = $state(false);
  let avatarPreview = $state(data.user?.image || '');
  let currentSessionId = $state('');

  // Detect current session (using first session as current for MVP)
  $effect(() => {
    if (data.sessions && data.sessions.length > 0) {
      currentSessionId = data.sessions[0].id;
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle }
  ];

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function formatDevice(userAgent?: string | null) {
    if (!userAgent) return 'Unknown Device';
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  }

  function getDeviceIcon(userAgent?: string | null) {
    if (!userAgent) return Monitor;
    if (userAgent.includes('Mobile')) return Smartphone;
    if (userAgent.includes('Tablet')) return Smartphone;
    return Monitor;
  }

  function handleAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleLogout() {
    await authClient.signOut();
    goto('/login');
  }
</script>

<svelte:head>
  <title>Settings - Segre.vip</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
  <!-- Header -->
  <header class="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <button
            onclick={() => goto('/dashboard')}
            class="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 class="text-xl font-bold text-white">Settings</h1>
        </div>
        <button
          onclick={handleLogout}
          class="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <LogOut class="w-4 h-4" />
          <span class="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <!-- Sidebar Navigation -->
      <aside class="lg:col-span-3 mb-8 lg:mb-0">
        <nav class="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-1">
          {#each tabs as tab}
            {@const Icon = tab.icon}
            <button
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all {activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'}"
              onclick={() => activeTab = tab.id}
            >
              <Icon class="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          {/each}
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="lg:col-span-9 space-y-6">
        {#if activeTab === 'profile'}
          <section class="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User class="w-6 h-6 text-amber-400" />
              Profile Information
            </h2>

            <form
              id="profile-form"
              method="POST"
              action="?/updateProfile"
              class="space-y-6"
            >
              <!-- Avatar -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Profile Photo</label>
                <div class="flex items-center gap-6">
                  <div class="relative">
                    <div class="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-700 p-1">
                      {#if avatarPreview}
                        <img
                          src={avatarPreview}
                          alt="Avatar"
                          class="w-full h-full object-cover rounded-full"
                        />
                      {:else}
                        <div class="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                          <User class="w-12 h-12 text-gray-400" />
                        </div>
                      {/if}
                    </div>
                    <label
                      class="absolute bottom-0 right-0 p-2 bg-amber-600 rounded-full cursor-pointer hover:bg-amber-700 transition-colors"
                    >
                      <Camera class="w-4 h-4 text-white" />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      name="avatar"
                      onchange={handleAvatarChange}
                    />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-400 mb-2">
                      Recommended: Square image, at least 400x400px
                    </p>
                    <button
                      type="button"
                      onclick={() => {
                        avatarPreview = '';
                        const input = document.querySelector('input[name="avatar"]') as HTMLInputElement;
                        if (input) input.value = '';
                      }}
                      class="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove current photo
                    </button>
                  </div>
                </div>
                <input
                  type="hidden"
                  name="image"
                  value={avatarPreview}
                />
              </div>

              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.user?.name || ''}
                  required
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <!-- Submit -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl transition-all font-semibold"
                >
                  <Save class="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        {/if}

        {#if activeTab === 'account'}
          <section class="space-y-6">
            <!-- Email -->
            <div class="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Mail class="w-6 h-6 text-amber-400" />
                Email Address
              </h2>

              <form method="POST" action="?/updateEmail" class="space-y-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                    New Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={data.user?.email || ''}
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <p class="text-sm text-gray-400">
                  ⚠️ Updating your email will require re-verification
                </p>
                <button
                  type="submit"
                  class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl transition-all font-semibold"
                >
                  <Save class="w-4 h-4" />
                  Update Email
                </button>
              </form>
            </div>

            <!-- Password -->
            <div class="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Lock class="w-6 h-6 text-amber-400" />
                Change Password
              </h2>

              <form method="POST" action="?/updatePassword" class="space-y-4">
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    required
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    required
                    minlength="8"
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <p class="mt-1 text-sm text-gray-500">Minimum 8 characters</p>
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl transition-all font-semibold"
                >
                  <Save class="w-4 h-4" />
                  Update Password
                </button>
              </form>
            </div>
          </section>
        {/if}

        {#if activeTab === 'security'}
          <section class="space-y-6">
            <!-- Active Sessions -->
            <div class="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield class="w-6 h-6 text-amber-400" />
                Active Sessions
              </h2>

              <div class="space-y-4">
                {#each (data.sessions || []) as sessionItem, index}
                  {@const DeviceIcon = getDeviceIcon(sessionItem.userAgent)}
                  {@const isCurrent = index === 0}
                  <div class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div class="flex items-center gap-4">
                      <div class="p-2 bg-amber-500/20 rounded-lg">
                        <DeviceIcon class="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p class="text-white font-medium flex items-center gap-2">
                          {formatDevice(sessionItem.userAgent)}
                          {#if isCurrent}
                            <span class="px-2 py-0.5 text-xs bg-green-500/20 text-green-300 rounded-full">Current</span>
                          {/if}
                        </p>
                        <p class="text-sm text-gray-400">{formatDate(sessionItem.createdAt)}</p>
                        {#if sessionItem.ipAddress}
                          <p class="text-xs text-gray-500">{sessionItem.ipAddress}</p>
                        {/if}
                      </div>
                    </div>
                    {#if !isCurrent}
                      <form method="POST" action="?/revokeSession">
                        <input type="hidden" name="sessionId" value={sessionItem.id} />
                        <button
                          type="submit"
                          class="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          Revoke
                        </button>
                      </form>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>

            <!-- 2FA Placeholder -->
            <div class="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Lock class="w-6 h-6 text-amber-400" />
                Two-Factor Authentication
              </h2>
              <div class="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p class="text-yellow-300 text-sm">
                  🔒 Two-factor authentication will be available in a future update.
                </p>
              </div>
            </div>
          </section>
        {/if}

        {#if activeTab === 'danger'}
          <section class="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 sm:p-8">
            <h2 class="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
              <AlertTriangle class="w-6 h-6" />
              Danger Zone
            </h2>

            <div class="space-y-6">
              <div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p class="text-red-300 text-sm mb-4">
                  ⚠️ This action is irreversible. All your data will be permanently deleted,
                  including your pages, blocks, and analytics.
                </p>

                <button
                  onclick={() => showDeleteModal = true}
                  class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                >
                  <Trash2 class="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </section>
        {/if}
      </main>
    </div>
  </div>

  <!-- Delete Account Modal -->
  {#if showDeleteModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-6 sm:p-8 max-w-md w-full">
        <h3 class="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle class="w-6 h-6" />
          Delete Account
        </h3>
        <p class="text-gray-300 mb-6">
          Are you sure you want to delete your account? This action cannot be undone and
          all your data will be permanently lost.
        </p>
        <form method="POST" action="?/deleteAccount" class="space-y-4">
          <div>
            <label for="confirmation" class="block text-sm font-medium text-gray-300 mb-2">
              Type <span class="text-red-400 font-mono">DELETE</span> to confirm
            </label>
            <input
              type="text"
              id="confirmation"
              name="confirmation"
              required
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="DELETE"
            />
          </div>
          <div class="flex gap-4">
            <button
              type="button"
              onclick={() => showDeleteModal = false}
              class="flex-1 px-4 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all font-semibold"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
