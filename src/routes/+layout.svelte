<script lang="ts">
import './layout.css';
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();

// Global SEO metadata
const siteName = 'Segre.vip';
const siteDescription = 'Create premium bio and offer pages. Mobile-first, beautiful, and optimized for conversions.';
const siteUrl = 'https://segre.vip';
const ogImage = 'https://segre.vip/og-default.png';
</script>

<svelte:head>
<!-- Favicon -->
<link rel="icon" href={favicon} />

<!-- Basic SEO -->
<title>{siteName}</title>
<meta name="description" content={siteDescription} />
<meta name="keywords" content="bio page, link in bio, offer page, vip page, creator tools" />
<meta name="author" content="Segre.vip" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href={siteUrl} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={siteUrl} />
<meta property="og:title" content={siteName} />
<meta property="og:description" content={siteDescription} />
<meta property="og:image" content={ogImage} />
<meta property="og:site_name" content={siteName} />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={siteUrl} />
<meta name="twitter:title" content={siteName} />
<meta name="twitter:description" content={siteDescription} />
<meta name="twitter:image" content={ogImage} />

<!-- Additional Meta Tags -->
<meta name="theme-color" content="#000000" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</svelte:head>

{@render children()}
