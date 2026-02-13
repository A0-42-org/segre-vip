<script lang="ts">
interface Props {
content: {
avatar?: string;
name?: string;
handle?: string;
bio?: string;
stats?: {
followers?: string;
subscribers?: string;
views?: string;
};
};
style?: Record<string, any>;
}

let { content, style }: Props = $props();
</script>

<div class="header-block" class:luxury={style?.theme === 'luxury'} class:neon={style?.theme === 'neon'}>
{#if content.avatar}
<div class="avatar-container">
<img src={content.avatar} alt={content.name || 'Avatar'} class="avatar" />
</div>
{/if}

<div class="header-content">
<h1 class="name">{content.name || 'Creator Name'}</h1>
{#if content.handle}
<p class="handle">{content.handle}</p>
{/if}

{#if content.bio}
<p class="bio">{content.bio}</p>
{/if}

{#if content.stats}
<div class="stats-grid">
{#if content.stats.followers}
<div class="stat-item">
<p class="stat-value">{content.stats.followers}</p>
<p class="stat-label">Followers</p>
</div>
{/if}
{#if content.stats.subscribers}
<div class="stat-item">
<p class="stat-value">{content.stats.subscribers}</p>
<p class="stat-label">Subscribers</p>
</div>
{/if}
{#if content.stats.views}
<div class="stat-item">
<p class="stat-value">{content.stats.views}</p>
<p class="stat-label">Views</p>
</div>
{/if}
</div>
{/if}
</div>
</div>

<style lang="postcss">
.header-block {
@apply flex flex-col items-center gap-4 px-6 py-8 text-center;
}

.avatar-container {
@apply relative;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.avatar {
@apply rounded-full object-cover;
width: 120px;
height: 120px;
}

.header-content {
@apply flex flex-col items-center gap-2 w-full max-w-lg;
}

.name {
@apply text-2xl font-bold;
}

.handle {
@apply text-sm opacity-70;
}

.bio {
@apply text-base leading-relaxed opacity-90;
}

.stats-grid {
@apply flex gap-6 w-full justify-center;
}

.stat-item {
@apply flex flex-col gap-1;
}

.stat-value {
@apply text-lg font-bold;
}

.stat-label {
@apply text-xs uppercase tracking-wider opacity-70;
}

/* Luxury Theme */
.header-block.luxury {
background: linear-gradient(180deg, rgba(184, 134, 11, 0.05) 0%, transparent 100%);
}

.header-block.luxury .name {
color: #fbbf24;
}

.header-block.luxury .avatar-container {
box-shadow: 0 8px 32px rgba(184, 134, 11, 0.3);
}

/* Neon Theme */
.header-block.neon {
background: linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, transparent 100%);
}

.header-block.neon .name {
color: #c084fc;
text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
}

.header-block.neon .avatar-container {
box-shadow: 0 0 32px rgba(168, 85, 247, 0.4);
}

.header-block.neon .stat-value {
color: #a855f7;
}

/* Responsive */
@media (max-width: 640px) {
.header-block {
padding: 1rem;
gap: 0.75rem;
}

.avatar {
width: 100px;
height: 100px;
}

.stats-grid {
gap: 1rem;
}

.name {
font-size: 1.25rem;
}

.bio {
font-size: 0.875rem;
}

.stat-value {
font-size: 1rem;
}
}
</style>
