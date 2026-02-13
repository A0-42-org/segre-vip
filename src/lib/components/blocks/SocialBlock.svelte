<script lang="ts">
interface SocialLink {
platform: string;
url: string;
label?: string;
}

interface Props {
content: {
socials: SocialLink[];
};
style?: Record<string, any>;
onClick?: (social: SocialLink) => void;
}

let { content, style, onClick }: Props = $props();

let iconMap: Record<string, string> = {
instagram: '📷',
twitter: '🐦',
tiktok: '🎵',
youtube: '▶️',
facebook: '👤',
linkedin: '💼',
twitch: '🎮',
discord: '💬',
snapchat: '👻',
pinterest: '📌',
github: '💻',
website: '🌐'
};
</script>

<div class="social-block" class:luxury={style?.theme === 'luxury'} class:neon={style?.theme === 'neon'}>
{#each content.socials as social (social.platform)}
<a
href={social.url}
target="_blank"
rel="noopener noreferrer"
class="social-link"
title={social.label || social.platform}
onclick={() => onClick?.(social)}
>
<span class="social-icon">{iconMap[social.platform.toLowerCase()] || '🔗'}</span>
</a>
{/each}
</div>

<style lang="postcss">
.social-block {
@apply flex gap-3 justify-center;
}

.social-link {
@apply flex items-center justify-center;
width: 48px;
height: 48px;
border-radius: 50%;
transition: all 0.2s ease;
text-decoration: none;
}

.social-link:hover {
transform: scale(1.1);
}

.social-icon {
@apply text-xl;
}

/* Luxury Theme */
.social-block.luxury .social-link {
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(184, 134, 11, 0.3);
}

.social-block.luxury .social-link:hover {
background: rgba(184, 134, 11, 0.15);
border-color: rgba(184, 134, 11, 0.5);
box-shadow: 0 4px 20px rgba(184, 134, 11, 0.3);
}

/* Neon Theme */
.social-block.neon .social-link {
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(168, 85, 247, 0.3);
}

.social-block.neon .social-link:hover {
background: rgba(168, 85, 247, 0.15);
border-color: rgba(168, 85, 247, 0.6);
box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
}

/* Default Theme */
.social-block:not(.luxury):not(.neon) .social-link {
background: rgba(255, 255, 255, 0.08);
}

.social-block:not(.luxury):not(.neon) .social-link:hover {
background: rgba(255, 255, 255, 0.15);
}

/* Responsive */
@media (max-width: 640px) {
.social-link {
width: 40px;
height: 40px;
}

.social-icon {
font-size: 1rem;
}
}
</style>
