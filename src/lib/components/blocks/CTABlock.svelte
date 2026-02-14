<script lang="ts">
	interface Props {
		content: {
			label: string;
			url: string;
			icon?: string;
			newTab?: boolean;
		};
		style?: Record<string, any>;
		type?: 'stripe' | 'calendly' | 'default';
		onClick?: () => void;
	}

	let { content, style, type = 'default', onClick }: Props = $props();

	let iconMap: Record<string, string> = {
		stripe: '💳',
		calendly: '📅',
		default: '🎯'
	};
</script>

<a
	href={content.url}
	target={content.newTab !== false ? '_blank' : '_self'}
	rel="noopener noreferrer"
	class="cta-block flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-center font-semibold transition-all duration-200"
	style="text-decoration: none; width: 100%; max-width: 400px; margin: 0 auto; backdrop-filter: blur(10px);"
	class:luxury={style?.theme === 'luxury'}
	class:neon={style?.theme === 'neon'}
	class:stripe={type === 'stripe'}
	class:calendly={type === 'calendly'}
	onclick={onClick}
>
	{#if content.icon}
		<span class="cta-icon text-2xl">{content.icon}</span>
	{:else}
		<span class="cta-icon text-2xl">{iconMap[type]}</span>
	{/if}
	<span class="cta-label text-base">{content.label}</span>
</a>

<style lang="postcss">
	.cta-block:hover {
		transform: translateY(-2px);
	}

	.cta-block.luxury:hover {
		background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
		box-shadow: 0 8px 30px rgba(251, 191, 36, 0.4);
	}

	/* Neon Theme */
	.cta-block.neon {
		background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
		color: #ffffff;
		box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
	}

	.cta-block.neon:hover {
		background: linear-gradient(135deg, #c084fc 0%, #f472b6 100%);
		box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
	}

	/* Default Theme */
	.cta-block:not(.luxury):not(.neon) {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.cta-block:not(.luxury):not(.neon):hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.cta-block {
			padding: 0.875rem 1rem;
			max-width: 100%;
		}

		.cta-icon {
			font-size: 1.5rem;
		}

		.cta-label {
			font-size: 0.875rem;
		}
	}
</style>
