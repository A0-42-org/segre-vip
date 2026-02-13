<script lang="ts">
import { creators, categories, stats } from '$lib/data/creators';
import { onMount } from 'svelte';

let scrolled = $state(false);
let mobileMenuOpen = $state(false);

onMount(() => {
	const handleScroll = () => {
		scrolled = window.scrollY > 50;
	};
	window.addEventListener('scroll', handleScroll);
	return () => window.removeEventListener('scroll', handleScroll);
});

function formatNumber(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(0) + 'K';
	}
	return num.toString();
}

function getTierClasses(plan: string): string {
	switch (plan) {
		case 'Free':
			return 'bg-gray-500';
		case 'Basic':
			return 'bg-blue-500';
		case 'Premium':
			return 'bg-purple-600';
		case 'VIP':
			return 'bg-amber-500 text-gray-900';
		default:
			return 'bg-gray-500';
	}
}

const pricingPlans = [
	{
		name: 'Free',
		price: 'Free',
		priceNote: '',
		features: ['Basic profile', 'Up to 3 social links', 'Public visibility'],
		featured: false,
		cta: 'Get Started'
	},
	{
		name: 'Basic',
		price: '$9.99',
		priceNote: '/mo',
		features: ['Everything in Free', 'Up to 6 social links', 'Custom profile URL', 'Analytics dashboard'],
		featured: true,
		cta: 'Get Started'
	},
	{
		name: 'Premium',
		price: '$19.99',
		priceNote: '/mo',
		features: ['Everything in Basic', 'Unlimited social links', 'Verified badge', 'Priority support', 'Featured in search'],
		featured: false,
		cta: 'Get Started'
	},
	{
		name: 'VIP',
		price: '$29.99',
		priceNote: '/mo',
		features: ['Everything in Premium', 'Custom branding', 'API access', 'Dedicated account manager', 'Featured on homepage'],
		featured: false,
		cta: 'Contact Sales'
	}
];

const steps = [
	{
		number: 1,
		title: 'Create Your Profile',
		description: 'Sign up and build your stunning profile in minutes. Add your bio, avatar, and personalize your page.'
	},
	{
		number: 2,
		title: 'Add Your Links',
		description: 'Connect all your social media platforms in one place.'
	},
	{
		number: 3,
		title: 'Share & Grow',
		description: 'Share your segre.vip link everywhere and watch your audience grow with our powerful analytics.'
	}
];
</script>

<svelte:head>
	<title>Segre.vip - Connect with Your Favorite Creators</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen bg-[#1A0A2E] text-[#D4C4A8] font-['Inter',sans-serif] overflow-x-hidden">
	<!-- Animated Background Glow -->
	<div
		class="fixed inset-0 pointer-events-none z-[-1]"
		style="background: radial-gradient(ellipse at center, rgba(197, 160, 89, 0.08) 0%, transparent 70%); animation: glowPulse 15s ease-in-out infinite;"
	></div>

	<!-- Header -->
	<header
		class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
			? 'bg-[#1A0A2E]/95 backdrop-blur-md shadow-lg'
			: ''}"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16 lg:h-20">
				<a href="/" class="flex items-center gap-1">
					<span
						class="font-['Cormorant_Garamond',serif] text-2xl lg:text-3xl font-bold tracking-wider text-[#D4C4A8]"
						>segre</span
					><span class="text-[#C5A059]">.vip</span>
				</a>

				<!-- Desktop Navigation -->
				<nav class="hidden lg:flex items-center gap-8">
					<a
						href="#creators"
						class="text-sm text-[#D4C4A8]/70 hover:text-[#D4C4A8] transition-colors relative group"
					>
						Creators
						<span
							class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"
						></span>
					</a>
					<a
						href="#categories"
						class="text-sm text-[#D4C4A8]/70 hover:text-[#D4C4A8] transition-colors relative group"
					>
						Categories
						<span
							class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"
						></span>
					</a>
					<a
						href="#how-it-works"
						class="text-sm text-[#D4C4A8]/70 hover:text-[#D4C4A8] transition-colors relative group"
					>
						How It Works
						<span
							class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"
						></span>
					</a>
					<a
						href="#pricing"
						class="text-sm text-[#D4C4A8]/70 hover:text-[#D4C4A8] transition-colors relative group"
					>
						Pricing
						<span
							class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"
						></span>
					</a>
				</nav>

				<div class="hidden lg:flex items-center gap-4">
					<a
						href="/login"
						class="px-5 py-2.5 text-sm font-semibold text-[#D4C4A8] border-2 border-[#C5A059] rounded-full hover:bg-[#C5A059]/10 transition-all"
					>
						Log In
					</a>
					<a
						href="/signup"
						class="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#C5A059] via-[#D4C4A8] to-[#9A7B3D] text-[#1A0A2E] rounded-full hover:shadow-lg hover:shadow-[#C5A059]/30 hover:-translate-y-0.5 transition-all"
					>
						Sign Up Free
					</a>
				</div>

				<!-- Mobile Menu Button -->
				<button
					class="lg:hidden p-2 text-[#D4C4A8]"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					aria-label="Toggle menu"
				>
					{#if mobileMenuOpen}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>

			<!-- Mobile Menu -->
			{#if mobileMenuOpen}
				<div
					class="lg:hidden absolute top-full left-0 right-0 bg-[#1A0A2E]/98 backdrop-blur-md border-t border-[#C5A059]/20"
				>
					<nav class="flex flex-col p-6 gap-4">
						<a href="#creators" class="text-[#D4C4A8]/70 hover:text-[#D4C4A8] py-2" onclick={() => mobileMenuOpen = false}>Creators</a>
						<a href="#categories" class="text-[#D4C4A8]/70 hover:text-[#D4C4A8] py-2" onclick={() => mobileMenuOpen = false}>Categories</a>
						<a href="#how-it-works" class="text-[#D4C4A8]/70 hover:text-[#D4C4A8] py-2" onclick={() => mobileMenuOpen = false}>How It Works</a>
						<a href="#pricing" class="text-[#D4C4A8]/70 hover:text-[#D4C4A8] py-2" onclick={() => mobileMenuOpen = false}>Pricing</a>
						<hr class="border-[#C5A059]/20 my-2" />
						<a href="/login" class="text-center py-2.5 border-2 border-[#C5A059] rounded-full text-[#D4C4A8]">Log In</a>
						<a
							href="/signup"
							class="text-center py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4C4A8] text-[#1A0A2E] rounded-full font-semibold"
							>Sign Up Free</a
						>
					</nav>
				</div>
			{/if}
		</div>
	</header>

	<!-- Hero Section -->
	<section class="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
		<!-- Floating Elements -->
		<div
			class="absolute w-[300px] h-[300px] top-[10%] left-[5%] rounded-full opacity-20"
			style="background: radial-gradient(circle, rgba(197, 160, 89, 0.3) 0%, transparent 70%); animation: float 20s ease-in-out infinite;"
		></div>
		<div
			class="absolute w-[200px] h-[200px] top-[60%] right-[10%] rounded-full opacity-20"
			style="background: radial-gradient(circle, rgba(197, 160, 89, 0.3) 0%, transparent 70%); animation: float 20s ease-in-out 5s infinite;"
		></div>
		<div
			class="absolute w-[150px] h-[150px] bottom-[20%] left-[15%] rounded-full opacity-20"
			style="background: radial-gradient(circle, rgba(197, 160, 89, 0.3) 0%, transparent 70%); animation: float 20s ease-in-out 10s infinite;"
		></div>

		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
			<!-- Badge -->
			<div
				class="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#C5A059]/15 border border-[#C5A059]/40 rounded-full text-sm text-[#D4C4A8]"
			>
				<svg class="w-4 h-4 text-[#C5A059]" fill="currentColor" viewBox="0 0 20 20">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					/>
				</svg>
				<span>Exclusive Creator Platform</span>
			</div>

			<!-- Title -->
			<h1
				class="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D4C4A8] to-[#C5A059] bg-clip-text text-transparent leading-tight"
			>
				Connect with Your Favorite Creators
			</h1>

			<!-- Subtitle -->
			<p class="text-lg sm:text-xl text-[#D4C4A8]/70 mb-10 max-w-2xl mx-auto">
				Discover exclusive content from the world's most captivating creators. All your favorite links in one
				elegant place.
			</p>

			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
				<a
					href="#creators"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C5A059] via-[#D4C4A8] to-[#9A7B3D] text-[#1A0A2E] rounded-full font-semibold hover:shadow-lg hover:shadow-[#C5A059]/40 hover:-translate-y-1 transition-all"
				>
					<span>Start Exploring</span>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/signup"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#C5A059] text-[#D4C4A8] rounded-full font-semibold hover:bg-[#C5A059]/10 hover:-translate-y-1 transition-all"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
					<span>Join as Creator</span>
				</a>
			</div>

			<!-- Stats -->
			<div class="flex flex-wrap justify-center gap-8 sm:gap-16">
				<div class="text-center">
					<div class="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-bold text-[#D4C4A8]">
						{formatNumber(stats.creators)}+
					</div>
					<div class="text-sm text-[#D4C4A8]/50 uppercase tracking-wider mt-1">Creators</div>
				</div>
				<div class="text-center">
					<div class="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-bold text-[#D4C4A8]">
						{formatNumber(stats.followers)}+
					</div>
					<div class="text-sm text-[#D4C4A8]/50 uppercase tracking-wider mt-1">Followers</div>
				</div>
				<div class="text-center">
					<div class="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-bold text-[#D4C4A8]">
						{formatNumber(stats.views)}+
					</div>
					<div class="text-sm text-[#D4C4A8]/50 uppercase tracking-wider mt-1">Profile Views</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Featured Creators -->
	<section id="creators" class="py-20 lg:py-32">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<p class="text-sm uppercase tracking-[0.2em] text-[#C5A059] mb-3">Featured Creators</p>
				<h2 class="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4C4A8] mb-4">
					Discover Our Elite
				</h2>
				<p class="text-[#D4C4A8]/60 max-w-xl mx-auto">
					Hand-picked creators from around the world, ready to connect with you.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each creators as creator (creator.id)}
					<div
						class="group bg-[#2D1B4E]/40 backdrop-blur-xl border border-[#C5A059]/20 rounded-2xl p-6 hover:border-[#C5A059] hover:shadow-xl hover:shadow-[#C5A059]/10 hover:-translate-y-1 transition-all duration-300"
					>
						<div class="flex items-center gap-4 mb-4">
							<div class="relative flex-shrink-0">
								<img
									src={creator.avatar}
									alt={creator.name}
									class="w-16 h-16 rounded-full object-cover border-2 border-[#C5A059]"
								/>
								<div
									class="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#1A0A2E] rounded-full"
								></div>
							</div>
							<div class="min-w-0">
								<div class="flex items-center gap-1.5">
									<h3 class="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#D4C4A8] truncate">
										{creator.name}
									</h3>
									<svg class="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<p class="text-sm text-[#D4C4A8]/50 truncate">{creator.handle}</p>
							</div>
						</div>

						<p class="text-sm text-[#D4C4A8]/70 mb-4 line-clamp-2">{creator.bio}</p>

						<div class="flex flex-wrap gap-2 mb-4">
							<span
								class="px-2.5 py-1 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-full text-xs text-[#D4C4A8]"
							>
								{creator.category}
							</span>
							<span class="px-2.5 py-1 {getTierClasses(creator.plan)} rounded-full text-xs font-semibold">
								{#if creator.plan === 'VIP'}
									<svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 2L3 7v11h14V7l-7-5z" />
									</svg>
								{:else if creator.plan === 'Premium'}
									<svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								{/if}
								{creator.plan}
							</span>
						</div>

						<div class="flex justify-between pt-4 border-t border-[#C5A059]/10">
							<div class="text-center">
								<div class="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#D4C4A8]">
									{formatNumber(creator.followers)}
								</div>
								<div class="text-xs text-[#D4C4A8]/40 uppercase">Followers</div>
							</div>
							<div class="text-center">
								<div class="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#D4C4A8]">
									{formatNumber(creator.subscribers)}
								</div>
								<div class="text-xs text-[#D4C4A8]/40 uppercase">Subscribers</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<div class="text-center mt-12">
				<a
					href="/"
					class="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#C5A059] text-[#D4C4A8] rounded-full font-semibold hover:bg-[#C5A059]/10 transition-all"
				>
					<span>View All Creators</span>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- Categories Grid -->
	<section id="categories" class="py-20 lg:py-32 bg-[#C5A059]/5 border-y border-[#C5A059]/10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<p class="text-sm uppercase tracking-[0.2em] text-[#C5A059] mb-3">Browse Categories</p>
				<h2 class="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4C4A8] mb-4">
					Find What You Love
				</h2>
				<p class="text-[#D4C4A8]/60 max-w-xl mx-auto">
					Explore creators across a wide range of categories and niches.
				</p>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{#each categories as category (category.name)}
					<a
						href="/"
						class="group bg-[#2D1B4E]/40 backdrop-blur-xl border border-[#C5A059]/20 rounded-2xl p-6 text-center hover:border-[#C5A059] hover:shadow-lg hover:shadow-[#C5A059]/10 hover:-translate-y-1 transition-all duration-300"
					>
						<div
							class="w-14 h-14 mx-auto mb-4 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-2xl group-hover:bg-[#C5A059] group-hover:text-[#1A0A2E] group-hover:scale-110 transition-all duration-300"
						>
							{category.icon}
						</div>
						<h3 class="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#D4C4A8] mb-1">
							{category.name}
						</h3>
						<p class="text-sm text-[#D4C4A8]/50">{category.count} Creators</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- How It Works -->
	<section id="how-it-works" class="py-20 lg:py-32">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<p class="text-sm uppercase tracking-[0.2em] text-[#C5A059] mb-3">How It Works</p>
				<h2 class="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4C4A8] mb-4">
					Get Started in Minutes
				</h2>
				<p class="text-[#D4C4A8]/60 max-w-xl mx-auto">
					Join thousands of creators who've already made the switch.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				{#each steps as step (step.number)}
					<div
						class="text-center bg-[#2D1B4E]/40 backdrop-blur-xl border border-[#C5A059]/20 rounded-2xl p-8 hover:border-[#C5A059]/40 transition-all duration-300"
					>
						<div
							class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4C4A8] to-[#9A7B3D] flex items-center justify-center font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#1A0A2E] shadow-lg shadow-[#C5A059]/30"
						>
							{step.number}
						</div>
						<h3 class="font-['Cormorant_Garamond',serif] text-xl font-semibold text-[#D4C4A8] mb-3">
							{step.title}
						</h3>
						<p class="text-[#D4C4A8]/60">{step.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Pricing -->
	<section id="pricing" class="py-20 lg:py-32 bg-[#C5A059]/5 border-y border-[#C5A059]/10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<p class="text-sm uppercase tracking-[0.2em] text-[#C5A059] mb-3">Pricing Plans</p>
				<h2 class="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4C4A8] mb-4">
					Choose Your Plan
				</h2>
				<p class="text-[#D4C4A8]/60 max-w-xl mx-auto">Start free and upgrade as you grow. No hidden fees.</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
				{#each pricingPlans as plan (plan.name)}
					<div
						class="relative bg-[#2D1B4E]/40 backdrop-blur-xl border {plan.featured ? 'border-[#C5A059] scale-105' : 'border-[#C5A059]/20'} rounded-2xl p-8 hover:border-[#C5A059]/60 transition-all duration-300"
					>
						{#if plan.featured}
							<div
								class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#C5A059] to-[#D4C4A8] text-[#1A0A2E] rounded-full text-xs font-semibold"
							>
								Most Popular
							</div>
						{/if}

						<h3 class="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-[#D4C4A8] mb-4">
							{plan.name}
						</h3>

						<div class="mb-6">
							<span class="text-3xl font-bold text-[#D4C4A8]">{plan.price}</span>
							{#if plan.priceNote}
								<span class="text-[#D4C4A8]/50">{plan.priceNote}</span>
							{/if}
						</div>

						<ul class="space-y-3 mb-8">
							{#each plan.features as feature, i (feature)}
								<li class="flex items-center gap-3 text-sm text-[#D4C4A8]/70">
									<svg class="w-5 h-5 text-[#C5A059] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									{feature}
								</li>
							{/each}
						</ul>

						{#if plan.featured}
							<a
								href="/signup"
								class="block w-full py-3 text-center bg-gradient-to-r from-[#C5A059] via-[#D4C4A8] to-[#9A7B3D] text-[#1A0A2E] rounded-full font-semibold hover:shadow-lg hover:shadow-[#C5A059]/30 transition-all"
							>
								{plan.cta}
							</a>
						{:else}
							<a
								href="/signup"
								class="block w-full py-3 text-center border-2 border-[#C5A059] text-[#D4C4A8] rounded-full font-semibold hover:bg-[#C5A059]/10 transition-all"
							>
								{plan.cta}
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-[#1A0A2E]/90 border-t border-[#C5A059]/10 py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
				<div>
					<a href="/" class="flex items-center gap-1 mb-4">
						<span
							class="font-['Cormorant_Garamond',serif] text-2xl font-bold tracking-wider text-[#D4C4A8]"
							>segre</span
						><span class="text-[#C5A059]">.vip</span>
					</a>
					<p class="text-sm text-[#D4C4A8]/50 leading-relaxed">
						The premium link-in-bio platform built for creators. Connect, grow, and monetize your audience with
						elegance.
					</p>
				</div>

				<div>
					<h4 class="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#D4C4A8] mb-4">Platform</h4>
					<ul class="space-y-3">
						<li><a href="#creators" class="text-sm text-[#D4C4A8]/50 hover:text-[#D4C4A8] transition-colors">Browse Creators</a></li>
						<li><a href="#categories" class="text-sm text-[#D4C4A8]/50 hover:text-[#D4C4A8] transition-colors">Categories</a></li>
						<li><a href="#pricing" class="text-sm text-[#D4C4A8]/50 hover:text-[#D4C4A8] transition-colors">Pricing</a></li>
						<li><a href="/" class="text-sm text-[#D4C4A8]/50 hover:text-[#D4C4A8] transition-colors">Features</a></li>
					</ul>
				</div>

				<div>
					<h4 class="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#D4C4A8] mb-4">Resources</h4>
					<ul class="space-y-3">
						<li><a href="/" class="text-sm text-[#D4C4A8]/50 hover:text-[#D4C4A8] transition-colors">Help Center</a></li>
						<li><a href="/" class="text-sm text-[#D4C4A8]/50 hover:text-[#D4C4A8] transition-colors">Creator Guide</a></li>
						<li><a href="/" class="text-sm text-[#D4C4A8]/50 hover:text-[#D4C4A8] transition-colors">Blog</a></li>
						<li><a href="/" class="text-sm text-[#D4C4A8]/50 hover:text-[#D4C4A8] transition-colors">API Docs</a></li>
					</ul>
				</div>

				<div>
					<h4 class="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#D4C4A8] mb-4">Connect</h4>
					<div class="flex gap-3">
						<a
							href="/"
							class="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#D4C4A8] hover:bg-[#C5A059] hover:text-[#1A0A2E] hover:-translate-y-0.5 transition-all"
							aria-label="Twitter"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
							</svg>
						</a>
						<a
							href="/"
							class="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#D4C4A8] hover:bg-[#C5A059] hover:text-[#1A0A2E] hover:-translate-y-0.5 transition-all"
							aria-label="Instagram"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
						<a
							href="/"
							class="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#D4C4A8] hover:bg-[#C5A059] hover:text-[#1A0A2E] hover:-translate-y-0.5 transition-all"
							aria-label="Discord"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
							</svg>
						</a>
						<a
							href="/"
							class="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#D4C4A8] hover:bg-[#C5A059] hover:text-[#1A0A2E] hover:-translate-y-0.5 transition-all"
							aria-label="YouTube"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
							</svg>
						</a>
					</div>
				</div>
			</div>

			<div class="pt-8 border-t border-[#C5A059]/10 text-center">
				<p class="text-sm text-[#D4C4A8]/40">
					&copy; 2026 segre.vip. All rights reserved.
					<a href="/" class="hover:text-[#D4C4A8] transition-colors">Privacy Policy</a>
					|
					<a href="/" class="hover:text-[#D4C4A8] transition-colors">Terms of Service</a>
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	@keyframes glowPulse {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
			opacity: 0.5;
		}
		25% {
			transform: translate(10%, 10%) scale(1.1);
			opacity: 0.7;
		}
		50% {
			transform: translate(-5%, 15%) scale(1);
			opacity: 0.5;
		}
		75% {
			transform: translate(-10%, -5%) scale(1.05);
			opacity: 0.6;
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(30px, -30px) rotate(90deg);
		}
		50% {
			transform: translate(-20px, 20px) rotate(180deg);
		}
		75% {
			transform: translate(20px, 10px) rotate(270deg);
		}
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(a:focus-visible),
	:global(button:focus-visible) {
		outline: 2px solid #c5a059;
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
