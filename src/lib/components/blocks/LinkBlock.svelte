<script lang="ts">
import { ExternalLink } from 'lucide-svelte';

interface Link {
id: string;
url: string;
title: string;
description?: string;
thumbnail?: string;
isFeatured?: boolean;
isNewTab?: boolean;
}

interface Props {
content: {
links?: Link[];
title?: string;
};
style?: Record<string, any>;
onClick?: (link: Link) => void;
}

let { content, style, onClick }: Props = $props();
const links = $derived(content.links ?? []);
</script>

<div class="link-block" class:luxury={style?.theme === 'luxury'} class:neon={style?.theme === 'neon'}>
{#if content.title}
<h2 class="section-title">{content.title}</h2>
{/if}

<div class="links-container">
{#each links as link (link.id)}
{#if link.isFeatured}
<a
href={link.url}
target={link.isNewTab ? '_blank' : '_self'}
rel={link.isNewTab ? 'noopener noreferrer' : undefined}
class="featured-link"
onclick={() => onClick?.(link)}
>
{#if link.thumbnail}
<img src={link.thumbnail} alt={link.title} class="thumbnail" />
{/if}
<div class="featured-content">
<h3 class="featured-title">{link.title}</h3>
{#if link.description}
<p class="featured-description">{link.description}</p>
{/if}
</div>
{#if link.isNewTab}
<ExternalLink class="external-icon" size={16} />
{/if}
</a>
{:else}
<a
href={link.url}
target={link.isNewTab ? '_blank' : '_self'}
rel={link.isNewTab ? 'noopener noreferrer' : undefined}
class="link-card"
onclick={() => onClick?.(link)}
>
<span class="link-title">{link.title}</span>
{#if link.isNewTab}
<ExternalLink class="external-icon" size={16} />
{/if}
</a>
{/if}
{/each}
</div>
</div>

<style lang="postcss">
.link-block {
@apply flex flex-col gap-4 w-full max-w-2xl mx-auto;
}

.section-title {
@apply text-lg font-semibold mb-2;
}

.links-container {
@apply flex flex-col gap-3;
}

/* Featured Link Card */
.featured-link {
@apply flex items-center gap-4 p-4 rounded-lg;
@apply transition-all duration-200;
@apply cursor-pointer;
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
}

.featured-link:hover {
background: rgba(255, 255, 255, 0.1);
transform: translateY(-2px);
}

.thumbnail {
@apply w-16 h-16 rounded-lg object-cover;
flex-shrink: 0;
}

.featured-content {
@apply flex flex-col gap-1 flex-1;
}

.featured-title {
@apply font-semibold text-base;
}

.featured-description {
@apply text-sm opacity-70 line-clamp-2;
}

/* External Icon styling - used on both ExternalLink components */
:global(.external-icon) {
opacity: 0.6;
}

/* Regular Link Card */
.link-card {
@apply flex items-center justify-between gap-4 p-4 rounded-lg;
@apply transition-all duration-200;
@apply cursor-pointer;
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
}

.link-card:hover {
background: rgba(255, 255, 255, 0.08);
transform: translateX(4px);
}

.link-title {
@apply font-medium;
}

/* Luxury Theme */
.link-block.luxury .featured-link,
.link-block.luxury .link-card {
border-color: rgba(251, 191, 36, 0.2);
}

.link-block.luxury .featured-link:hover,
.link-block.luxury .link-card:hover {
border-color: rgba(251, 191, 36, 0.4);
box-shadow: 0 4px 20px rgba(251, 191, 36, 0.15);
}

.link-block.luxury .featured-title,
.link-block.luxury .link-title {
color: #fbbf24;
}

/* Neon Theme */
.link-block.neon .featured-link,
.link-block.neon .link-card {
border-color: rgba(168, 85, 247, 0.2);
background: rgba(168, 85, 247, 0.03);
}

.link-block.neon .featured-link:hover,
.link-block.neon .link-card:hover {
border-color: rgba(168, 85, 247, 0.5);
box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.link-block.neon .featured-title,
.link-block.neon .link-title {
color: #c084fc;
}

/* Responsive */
@media (max-width: 640px) {
.link-block {
padding: 0;
}

.featured-link {
padding: 0.75rem;
gap: 0.75rem;
}

.thumbnail {
width: 3rem;
height: 3rem;
}

.link-card {
padding: 0.75rem;
}
}
</style>
