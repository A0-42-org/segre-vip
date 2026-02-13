<script lang="ts">
import type { PageData } from './$types';
import { onMount } from 'svelte';

export let data: PageData;

const { stats, pages } = data;

// Chart dimensions
let chartWidth = 0;
const chartHeight = 200;
const barWidth = 30;
const barGap = 15;

onMount(() => {
updateChartDimensions();
window.addEventListener('resize', updateChartDimensions);
});

function updateChartDimensions() {
if (typeof window !== 'undefined') {
const container = document.getElementById('chart-container');
if (container) {
chartWidth = container.clientWidth - 40;
}
}
}

// Get max value for chart scaling
const maxViews = Math.max(...stats.viewsByDay.map((d) => d.count), 1);

// Format date for display
function formatDate(dateStr: string): string {
const date = new Date(dateStr);
return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

// Get block icon based on type
function getBlockIcon(type: string): string {
switch (type) {
case 'link':
return '🔗';
case 'cta':
return '🎯';
case 'social':
return '💬';
case 'header':
return '👤';
default:
return '📦';
}
}
</script>

<svelte:head>
<title>Analytics - Segre.vip</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-6xl">
<!-- Header -->
<div class="mb-8">
<h1 class="text-4xl font-bold mb-2">📊 Analytics</h1>
<p class="text-gray-600">Consultez les performances de vos pages</p>
</div>

<!-- Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
<div class="p-6 rounded-lg bg-white shadow-md border border-gray-200">
<div class="flex items-center justify-between">
<div>
<p class="text-sm text-gray-600 mb-1">Vues totales</p>
<p class="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
</div>
<div class="text-4xl">👁️</div>
</div>
</div>

<div class="p-6 rounded-lg bg-white shadow-md border border-gray-200">
<div class="flex items-center justify-between">
<div>
<p class="text-sm text-gray-600 mb-1">Clics totaux</p>
<p class="text-3xl font-bold">{stats.totalClicks.toLocaleString()}</p>
</div>
<div class="text-4xl">👆</div>
</div>
</div>

<div class="p-6 rounded-lg bg-white shadow-md border border-gray-200">
<div class="flex items-center justify-between">
<div>
<p class="text-sm text-gray-600 mb-1">Taux de clic (CTR)</p>
<p class="text-3xl font-bold">{stats.ctr}%</p>
</div>
<div class="text-4xl">📈</div>
</div>
</div>
</div>

<!-- Views Chart -->
<div class="p-6 rounded-lg bg-white shadow-md border border-gray-200 mb-8">
<h2 class="text-xl font-bold mb-4">📅 Vues des 7 derniers jours</h2>
<div id="chart-container" class="relative">
{#if chartWidth > 0}
<svg width="{chartWidth}" height="{chartHeight}" class="w-full">
<!-- Grid lines -->
<line x1="0" y1="{chartHeight - 30}" x2="{chartWidth}" y2="{chartHeight - 30}" stroke="#e5e7eb" stroke-width="1" />
<line x1="0" y1="{chartHeight - 90}" x2="{chartWidth}" y2="{chartHeight - 90}" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4" />
<line x1="0" y1="{chartHeight - 150}" x2="{chartWidth}" y2="{chartHeight - 150}" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4" />

<!-- Bars -->
{#each stats.viewsByDay as day, i}
{@const x = 20 + i * (barWidth + barGap)}
{@const barHeight = (day.count / maxViews) * (chartHeight - 60)}
{@const y = chartHeight - 30 - barHeight}

<!-- Bar -->
<rect
x="{x}"
y="{y}"
width="{barWidth}"
height="{barHeight}"
rx="4"
fill="url(#barGradient)"
/>

<!-- Count label -->
<text x="{x + barWidth / 2}" y="{y - 5}" text-anchor="middle" class="text-xs" fill="#6b7280">
{day.count}
</text>

<!-- Date label -->
<text
x="{x + barWidth / 2}"
y="{chartHeight - 10}"
text-anchor="middle"
class="text-xs"
fill="#6b7280"
>
{formatDate(day.date)}
</text>
{/each}

<!-- Gradient -->
<defs>
<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="#8b5cf6" />
<stop offset="100%" stop-color="#6366f1" />
</linearGradient>
</defs>
</svg>
{:else}
<div class="text-center py-8 text-gray-500">Chargement du graphique...</div>
{/if}
</div>
</div>

<!-- Top Blocks Table -->
<div class="p-6 rounded-lg bg-white shadow-md border border-gray-200 mb-8">
<h2 class="text-xl font-bold mb-4">🏆 Blocs les plus cliqués</h2>
{#if stats.blocksByClicks.length > 0}
<div class="overflow-x-auto">
<table class="w-full">
<thead>
<tr class="border-b border-gray-200">
<th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">Bloc</th>
<th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
<th class="text-right py-3 px-4 text-sm font-semibold text-gray-600">Clics</th>
</tr>
</thead>
<tbody>
{#each stats.blocksByClicks as block}
<tr class="border-b border-gray-100 hover:bg-gray-50">
<td class="py-3 px-4">
<div class="flex items-center gap-2">
<span>{getBlockIcon(block.type)}</span>
<span class="font-medium">{block.label}</span>
</div>
</td>
<td class="py-3 px-4">
<span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
{block.type.toUpperCase()}
</span>
</td>
<td class="py-3 px-4 text-right font-bold">{block.clicks.toLocaleString()}</td>
</tr>
{/each}
</tbody>
</table>
</div>
{:else}
<div class="text-center py-8 text-gray-500">
<p>Aucun clic enregistré pour le moment.</p>
<p class="text-sm mt-2">Publiez votre page et partagez-la pour commencer à collecter des données.</p>
</div>
{/if}
</div>

<!-- Your Pages List -->
{#if pages.length > 0}
<div class="p-6 rounded-lg bg-white shadow-md border border-gray-200">
<h2 class="text-xl font-bold mb-4">📄 Vos pages</h2>
<div class="space-y-2">
{#each pages as page}
<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
<div>
<p class="font-medium">{page.title}</p>
<p class="text-sm text-gray-600">segre.vip/@{page.username}</p>
</div>
<div class="flex items-center gap-2">
{#if page.isPublished}
<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Publié</span>
{:else}
<span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Brouillon</span>
{/if}
</div>
</div>
{/each}
</div>
</div>
{/if}
</div>
