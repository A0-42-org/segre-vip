<script lang="ts">
import HeaderBlock from '$lib/components/blocks/HeaderBlock.svelte';
import LinkBlock from '$lib/components/blocks/LinkBlock.svelte';
import CTABlock from '$lib/components/blocks/CTABlock.svelte';
import SocialBlock from '$lib/components/blocks/SocialBlock.svelte';

interface Block {
id: string;
type: string;
content: any;
style: any;
order: number;
visible: boolean;
}

interface Props {
block: Block;
selected: boolean;
onselect: () => void;
}

let { block, selected, onselect }: Props = $props();

let dragging = $state(false);
</script>

<div
onselect={onselect}
class="sortable-item"
class:selected
class:dragging
role="button"
tabindex="0"
onkeydown={(e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
onselect();
}
}}
>
{#if block.type === 'header'}
<HeaderBlock content={block.content} />
{:else if block.type === 'link'}
<LinkBlock content={block.content} />
{:else if block.type === 'cta'}
<CTABlock content={block.content} />
{:else if block.type === 'social'}
<SocialBlock content={block.content} />
{/if}
</div>

<style>
.sortable-item {
cursor: grab;
padding: 1rem;
border-radius: 0.5rem;
margin-bottom: 0.5rem;
background: #1a1a1a;
border: 2px solid transparent;
transition: all 0.2s;
}

.sortable-item:hover {
border-color: #2d1b4e;
}

.sortable-item.selected {
border-color: #8b5cf6;
}

.sortable-item.dragging {
opacity: 0.5;
cursor: grabbing;
}
</style>
