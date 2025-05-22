<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { Share, PieSlice } from './draw';
	import { scaleFactor, strokeWidth } from './draw';
	import { selectedTag } from '.';
	import PiePath from './PiePath.svelte';

	/**
	 * title, share % (0-1), color (include #)
	 */
	export let shares: Share[];

	const outerRad = 128;
	const innerRad = 100;
	const borderPerc = 0.009;

	const radiusNoStroke = outerRad - strokeWidth / 2;

	$: usedShares = (function (shares: Share[], max: number): PieSlice[] {
		let tmp = 0;
		const fac = 1 - shares.length * borderPerc;

		const raw = shares.map(({ title, bg, fg, share }): PieSlice | undefined => {
			const s = tmp;
			tmp += fac * share;
			let e = tmp;

			tmp += borderPerc;
			if (s > max) {
				return;
			}

			if (e > 1) {
				e = 0;
			}

			return {
				name: title,
				share,
				fg,
				bg,
				arc: arc(s, e),
				mid: mid(s, e)
			};
		});

		return raw.filter((v) => !!v);
	})(shares, max);

	function xFactor(perc: number): number {
		return Math.cos(2 * Math.PI * perc);
	}

	function yFactor(perc: number): number {
		return -Math.sin(2 * Math.PI * perc);
	}

	function x(perc: number): number {
		return outerRad + radiusNoStroke * xFactor(perc);
	}

	function y(perc: number): number {
		return outerRad + radiusNoStroke * yFactor(perc);
	}

	function pos(progress: number): [number, number] {
		return [x(progress), y(progress)];
	}

	let max = 0;

	function arc(start: number, end: number): string {
		if (end > max) {
			end = max;
		}
		if (start > max) {
			end = max;
		}

		return `M${pos(start).join(' ')}${
			end - start >= 0.5
				? ` A${radiusNoStroke},${radiusNoStroke} 0 0 0 ${pos(start + 0.5).join(' ')}`
				: ''
		} A${radiusNoStroke},${radiusNoStroke} 0 0 0 ${pos(end).join(' ')}`;
	}

	const waitTime = 1;
	let waitStep = 0.004;

	function addToMax() {
		max += waitStep;
		waitStep += 0.00003;

		if (max < 1) setTimeout(addToMax, waitTime);
	}

	let entered = false;

	function mid(start: number, end: number): number {
		return start + (end - start) / 2;
	}
</script>

<div
	use:inview={{}}
	on:inview_enter={() => {
		if (entered) return;
		entered = true;
		addToMax();
	}}
>
	<svg viewBox="0 0 256 256">
        {#each usedShares as s (s.name)}
        <g transform-origin="128 128" class="slice" style:--scale={$selectedTag == s.name ? scaleFactor : 1}>
                <PiePath doScaling={true} slice={s} />
                <PiePath doScaling={false} slice={s} />

                {#if max > s.mid && s.share > 0.05}
                    <text
                        font-size="0.7rem"
                        transform-origin="128 128"
                        fill={s.fg}
                        text-anchor="middle"
                        font-weight="900"
                        style:--scale={$selectedTag == s.name ? 0.5 + scaleFactor/2 : 1}
                        x={x(s.mid)}
                        y={y(s.mid)}>({Math.round(s.share * 100)}%)</text
                    >
                {/if}
            </g>
        {/each}
	</svg>
</div>

<style lang="scss">
	@use 'pieStyles';

	:global(.slice > *) {
        transform: scale(var(--scale));
        transition: transform 0.5s;
	}

	svg {
		overflow: visible;
	}
</style>
