<script lang="ts">
	import { browser } from '$app/environment';
	import HeaderBlock from '$lib/components/blocks/HeaderBlock.svelte';
	import LinkBlock from '$lib/components/blocks/LinkBlock.svelte';
	import CTABlock from '$lib/components/blocks/CTABlock.svelte';
	import SocialBlock from '$lib/components/blocks/SocialBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<!-- Dynamic SEO -->
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
	<link rel="canonical" href={data.seo.url} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={data.seo.type} />
	<meta property="og:url" content={data.seo.url} />
	<meta property="og:title" content={data.seo.title} />
	<meta property="og:description" content={data.seo.description} />
	<meta property="og:image" content={data.seo.image} />
	<meta property="og:site_name" content={data.seo.siteName} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={data.seo.url} />
	<meta name="twitter:title" content={data.seo.title} />
	<meta name="twitter:description" content={data.seo.description} />
	<meta name="twitter:image" content={data.seo.image} />
</svelte:head>

{#if !data.page || !data.blocks}
	<div class="not-found">
		<h1>Page Not Found</h1>
		<p>This profile does not exist or has not been published.</p>
		<a href="/">Return Home</a>
	</div>
{:else}
	<div
		class="bio-page"
		class:luxury={data.page.theme === 'luxury'}
		class:neon={data.page.theme === 'neon'}
		data-theme={data.page.theme}
	>
		{#each data.blocks as block (block.id)}
			{#if block.type === 'header'}
				<HeaderBlock content={block.content} style={{ theme: data.page.theme, ...block.style }} />
			{:else if block.type === 'link'}
				<LinkBlock
					content={block.content}
					style={{ theme: data.page.theme, ...block.style }}
					onClick={(link) => console.log('Link clicked:', link)}
				/>
			{:else if block.type === 'cta'}
				<CTABlock
					content={block.content}
					style={{ theme: data.page.theme, ...block.style }}
					type={block.style?.ctaType || 'default'}
					onClick={() => console.log('CTA clicked:', block.id)}
				/>
			{:else if block.type === 'social'}
				<SocialBlock
					content={block.content}
					style={{ theme: data.page.theme, ...block.style }}
					onClick={(social) => console.log('Social clicked:', social)}
				/>
			{/if}
		{/each}

		<footer class="footer flex items-center justify-center">
			<a
				href="/"
				class="powered-by flex items-center gap-2"
				style="color: #888; text-decoration: none; font-size: 0.875rem; transition: color 0.3s ease;"
			>
				<span class="sparkle">✨</span>
				<span>Powered by</span>
				<strong>Segre.vip</strong>
			</a>
		</footer>
	</div>
{/if}

<style lang="postcss">
	/* Base Page Styles */
	.bio-page {
		min-height: 100vh;
		padding: 2rem 1rem;
	}

	/* Luxury Theme */
	.bio-page.luxury {
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
		color: #fbbf24;
	}

	.bio-page.luxury .powered-by {
		color: #fbbf24;
	}

	.bio-page.luxury .sparkle {
		color: #f59e0b;
	}

	/* Neon Theme */
	.bio-page.neon {
		background: linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 100%);
		color: #e9d5ff;
	}

	.bio-page.neon .powered-by {
		color: #c084fc;
	}

	.bio-page.neon .sparkle {
		color: #a855f7;
	}

	/* Not Found Page */
	.not-found {
		min-height: 100vh;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
		color: #fff;
	}

	.not-found h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		color: #fbbf24;
	}

	.not-found p {
		font-size: 1.125rem;
		color: #888;
		margin-bottom: 2rem;
	}

	.not-found a {
		color: #fbbf24;
		text-decoration: underline;
	}

	/* Footer */
	.footer {
		padding: 2rem 1rem;
		margin-top: auto;
	}

	/* Mobile Responsive */
	@media (max-width: 640px) {
		.bio-page {
			padding: 1rem 0.5rem;
		}
	}
</style>
