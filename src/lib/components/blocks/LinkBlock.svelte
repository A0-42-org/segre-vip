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

<div
	class="link-block mx-auto flex w-full max-w-2xl flex-col gap-4"
	class:luxury={style?.theme === 'luxury'}
	class:neon={style?.theme === 'neon'}
>
	{#if content.title}
		<h2 class="section-title mb-2 text-lg font-semibold">{content.title}</h2>
	{/if}

	<div class="links-container flex flex-col gap-3">
		{#each links as link (link.id)}
			{#if link.isFeatured}
				<a
					href={link.url}
					target={link.isNewTab ? '_blank' : '_self'}
					rel={link.isNewTab ? 'noopener noreferrer' : undefined}
					class="featured-link flex cursor-pointer items-center gap-4 rounded-lg p-4 transition-all duration-200"
					style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);"
					onclick={() => onClick?.(link)}
				>
					{#if link.thumbnail}
						<img
							src={link.thumbnail}
							alt={link.title}
							class="thumbnail h-16 w-16 flex-shrink-0 rounded-lg object-cover"
						/>
					{/if}
					<div class="featured-content flex flex-1 flex-col gap-1">
						<h3 class="featured-title text-base font-semibold">{link.title}</h3>
						{#if link.description}
							<p class="featured-description line-clamp-2 text-sm opacity-70">{link.description}</p>
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
					class="link-card flex cursor-pointer items-center justify-between gap-4 rounded-lg p-4 transition-all duration-200"
					style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);"
					onclick={() => onClick?.(link)}
				>
					<span class="link-title font-medium">{link.title}</span>
					{#if link.isNewTab}
						<ExternalLink class="external-icon" size={16} />
					{/if}
				</a>
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	/* External Icon styling - used on both ExternalLink components */
	:global(.external-icon) {
		opacity: 0.6;
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
