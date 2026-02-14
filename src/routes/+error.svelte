<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft, Home } from 'lucide-svelte';

	$: status = $page.status;
	$: error = $page.error;

	const getErrorMessage = (status: number) => {
		switch (status) {
			case 404:
				return 'Page Not Found';
			case 500:
				return 'Server Error';
			case 403:
				return 'Access Denied';
			case 401:
				return 'Unauthorized';
			default:
				return 'Something went wrong';
		}
	};

	const getErrorDescription = (status: number) => {
		switch (status) {
			case 404:
				return "The page you're looking for doesn't exist or has been moved.";
			case 500:
				return 'Something went wrong on our end. Please try again later.';
			case 403:
				return "You don't have permission to access this page.";
			case 401:
				return 'Please log in to access this page.';
			default:
				return error?.message || 'An unexpected error occurred.';
		}
	};
</script>

<svelte:head>
	<title>Error {status} - Segre.vip</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800"
>
	<div class="w-full max-w-md">
		<div class="card rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800">
			<!-- Error Icon -->
			<div class="mb-6 flex justify-center">
				<div
					class="bg-error-10 dark:bg-error-20 flex h-24 w-24 items-center justify-center rounded-full"
				>
					<span class="text-error-500 text-5xl font-bold">{status}</span>
				</div>
			</div>

			<!-- Error Title -->
			<h1 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
				{getErrorMessage(status)}
			</h1>

			<!-- Error Description -->
			<p class="mb-8 text-gray-600 dark:text-gray-300">
				{getErrorDescription(status)}
			</p>

			<!-- Action Buttons -->
			<div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
				<Button
					variant="filled"
					color="primary"
					class="flex-1 sm:flex-none"
					onclick={() => window.history.back()}
				>
					<span class="flex items-center gap-2">
						<ArrowLeft size={16} />
						Go Back
					</span>
				</Button>

				<Button variant="outlined" color="neutral" class="flex-1 sm:flex-none" href="/">
					<span class="flex items-center gap-2">
						<Home size={16} />
						Home
					</span>
				</Button>
			</div>

			<!-- Helpful Links -->
			<div class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
				<p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
					Need help? Here are some useful links:
				</p>
				<div class="flex flex-wrap justify-center gap-4 text-sm">
					<a href="/" class="text-primary-500 hover:text-primary-600 transition-colors">
						Homepage
					</a>
					<span class="text-gray-300 dark:text-gray-600">•</span>
					<a href="/login" class="text-primary-500 hover:text-primary-600 transition-colors">
						Login
					</a>
					<span class="text-gray-300 dark:text-gray-600">•</span>
					<a href="/create" class="text-primary-500 hover:text-primary-600 transition-colors">
						Create Page
					</a>
				</div>
			</div>
		</div>

		<!-- Footer Text -->
		<p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
			Segre.vip — Premium Bio & Offer Pages
		</p>
	</div>
</div>
