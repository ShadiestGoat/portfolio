<script lang="ts">
    import { inview } from 'svelte-inview';
    
    /**
     * title, share % (0-1), color (inclue #)
    */
    export let shares:[string, number, string][];

    const strokeWidth = 50
    const radius = 128
    const trueRad = 100
    const borderPerc = 0.006

    export let selectedTag = ""

    $: halfStroke     = strokeWidth/2
    $: radiusNoStroke = radius - halfStroke
    $: usedShares = function (shares:[string, number, string, string?][], max:number):{
        color: string, 
        name: string, 
        arc: string, 
        share:number,
        start: number,
        end: number,
    }[] {
        let tmp = 0
        const fac = 1 - shares.length * borderPerc

        const raw = shares.map(v => {
            const s = tmp
            tmp += fac * v[1]
            let e = tmp

            tmp += borderPerc
            if (s > max) {
                return
            }

            if (e > 1) {
                e = 0
            }

            if (isNaN(e)) {
                console.log(v)
            }

            return {
                color: v[2],
                name: v[0],
                share: v[1],
                start: s,
                end:   e,
                arc: arc(s, e),
            }
        })

        // @ts-ignore
        return raw.filter(v => v !== undefined)
    }(shares, max)

    function x(perc: number): number {
        return radius + radiusNoStroke*Math.sin(2*Math.PI*perc)
    }

    function y(perc: number): number {
        return radius + radiusNoStroke*Math.cos(2*Math.PI*(perc-0.5))
    }

    function pos(progress:number):[number, number] {      
        return [x(progress), y(progress)]
    }


    let max = 0

    function arc(start: number, end: number): string {
        if (end > max) {
            end = max
        }
        if (start > max) {
            end = max
        }

        return `M${pos(start).join(" ")}${
            (end - start) >= 0.5 ? ` A${radiusNoStroke},${radiusNoStroke} 0 0 1 ${pos(start + 0.5).join(" ")}` : ''
        } A${radiusNoStroke},${radiusNoStroke} 0 0 1 ${pos(end).join(" ")}`
    }

    const waitTime = 1
    let waitStep = 0.004

    function addToMax() {
        max += waitStep
        waitStep += 0.00003

        setTimeout(addToMax, waitTime)
    }

    let entered = false

    function show(n: string): boolean {
        return selectedTag == "" || selectedTag == n
    }

    function mid(start: number, end: number): number {
        return start + (end - start)/2
    }
</script>

<div use:inview={{}}
    on:inview_enter={() => {
        if (entered) return
        entered = true
        addToMax()
    }}>

    <svg viewBox="0 0 256 256">
        <defs>
            <radialGradient id="Gradient">
                <stop offset="0.5" stop-color="white" />
                <stop offset="0.9" stop-color="black" />
            </radialGradient>
            <mask id="glow">
                <rect width="100%" height="100%" fill="url(#Gradient)" />
            </mask>
        </defs>
        
        <g mask="url(#glow)">
            {#each usedShares as s (s.name)}
                <path visibility={show(s.name) ? "visible" : "hidden"} stroke-width="{strokeWidth}" fill="none" stroke={s.color} d={s.arc}></path>
            {/each}
        </g>

        <g transform="translate({radius-trueRad} {radius-trueRad}), scale({trueRad/radius})">
            {#each usedShares as s (s.name)}
                <path filter={show(s.name) ? "" : "saturate(0.3)"} stroke-width="{strokeWidth}" fill="none" stroke={s.color} d={s.arc}></path>
                {#if max > mid(s.start, s.end) && s.share > 0.05}
                    <text font-size="0.7rem" fill="white" text-anchor="middle" x={x(mid(s.start, s.end))} y={y(mid(s.start, s.end))}>({Math.round(s.share*100)}%)</text>
                {/if}
            {/each}
        </g>
    </svg>
</div>

