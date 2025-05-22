<script lang="ts">
	import { scaleFactor, strokeWidth, type PieSlice } from './draw';
	import { blurTag, focusTag, selectedTag, selectTag } from './index';

    export let slice: PieSlice
    export let doScaling: boolean
</script>

<path
	filter={!$selectedTag || $selectedTag == slice.name ? '' : 'saturate(0.3)'}
	stroke-width={strokeWidth}
	stroke={slice.bg}
	d={slice.arc}
	fill="none"
	role="presentation"
	tabindex="-1"
    transform-origin="128 128"
    style:--scale={$selectedTag == slice.name && doScaling ? scaleFactor : 1}
	on:mouseover={() => focusTag(slice.name)}
	on:focus={() => focusTag(slice.name)}
	on:mouseout={() => blurTag(slice.name)}
	on:blur={() => blurTag(slice.name)}
	on:click={() => selectTag(slice.name)}
></path>

<style lang="scss">
	@use "pieStyles";
</style>
