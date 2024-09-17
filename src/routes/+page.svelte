<script lang="ts">
	import Btn from "$lib/btn.svelte";
	import type { Langs, LangShares, Share } from "$lib/draw";
	import Pie from "$lib/pie.svelte";
	import { onMount } from "svelte";
    import Typing from "../lib/typing.svelte";
	import type { PageData } from "./$types";
	import Portfolio from "$lib/portfolio.svelte";
	import ContactIcon from "$lib/contactIcon.svelte";
	import Particles from "$lib/particles.svelte";

    const langList = [
        "FullStack",
        "React",
        "Golang",
        "Svelte",
        "TypeScript",
        "HTML/CSS",
        "JavaScript",
        "Python",
    ]

    export let data:PageData

    onMount(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const q = anchor.getAttribute('href')
                // just in case
                if (!q) {return}
                e.preventDefault();
                
                document.querySelector(q)?.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    })

    const langs = data.langs

    /**
     * Known lang -> [bg color, text color]
     */
    const colors:Record<string, [string, string]> = {
        Go:           ["#69D7E2", "#271052"],
        TypeScript:   ["#007BCD", "#fff"],
        Python:       ["#336B9B", "#fff"],
        JavaScript:   ["#F7E018", "#271052"],
        CSS:          ["#199DDA", "#271052"],
        EJS:          ["#BAC973", "#fff"],
        HTML:         ["#F16528", "#fff"],
        "React (JS)": ["#4AD5FF", "#271052"],
        "React (TS)": ["#1C567B", "#fff"],
        Svelte:       ["#F73C00", "#fff"],
        Others:       ["#aeafd7", "#271052"],
    }

    function pie(l:LangShares): Share[] {
        const items = Object.keys(l).sort().filter(k => colors[k] && l[k] >= 0.07 ? true : false)

        let total = 0
        items.forEach(v => {
            total += l[v]
        })

        let divTotal = total
        if (total < 1) {
            divTotal = 1
        }

        const parsed: Share[] = items.map(
            k => ({
                title: k,
                share: l[k]/divTotal,
                bg: colors[k][0],
                fg: colors[k][1],
            })
        )
        if (total < 1) {
            parsed.push({
                title: 'Others',
                share: 1 - total,
                bg: colors['Others'][0],
                fg: colors['Others'][1],
            })
        }

        return parsed
    }

    function getLangs(l:Langs) {
        const allLangs = Object.keys({...l.frontend, ...l.backend})
        const ogL = allLangs.length

        const newLangs = allLangs.filter(v => colors[v] && v != "Others" && (langs.backend[v] >= 0.07 || langs.frontend[v] >= 0.07))
        if (ogL != newLangs.length) {
            newLangs.push("Others")
        }

        return newLangs
    }

    /* all the unique languages */
    $: allLangs = getLangs(langs)
    
    let hoveredTag = ""
</script>

<Particles />

<section id="intro">
    <div class="own-info">
        <h1 class="name">Lucy Dryaeva</h1>
        <h2 class="dev">The <Typing text={langList} />Developer</h2>
    </div>
    <div class="btn-cluster">
        <div class="row">
            <Btn href="#portfolio" content="Portfolio" color="green" />
            <Btn href="#contact" content="Contact" color="red" />
        </div>
        <div class="row cluster-langs">
            <a href="#langs" style="text-align: center">View Language Use</a>
        </div>
    </div>
</section>

<section id="langs">
    <div class="col">
        <div class="usage-h row">
            <h1>Language Usage</h1>
        </div>
        <div class="row">
            <div class="col">
                <h2>Backend</h2>
                <div class="pie-wrapper">
                    <Pie selectedTag={hoveredTag} shares={pie(langs.backend)} />
                </div>
            </div>
            <div class="col">
                <h2>Frontend</h2>
                <div class="pie-wrapper">
                    <Pie selectedTag={hoveredTag} shares={pie(langs.frontend)} />
                </div>
            </div>
        </div>
        <div class="row tag-wrapper">
            {#each allLangs as lang}
                <h3 class="tag {(hoveredTag == "" || hoveredTag == lang) ? "" : "unselected"}" on:focus on:mouseover={() => {
                    hoveredTag = lang
                }} on:mouseleave={() => {
                    hoveredTag = ""
                }}>
                    <span class="tag-c" style="--c: {colors[lang][0]}" /> {lang}
                </h3>
            {/each}
        </div>
    </div>
</section>

<section id="portfolio">
    <div class="col">
        <div class="usage-h portfolio-h row">
            <h1>Portfolio</h1>
        </div>
        <Portfolio />
    </div>
</section>

<section id="contact" class="border-0">
    <div class="col">
        <div class="usage-h row">
            <h1>Contact Me</h1>
        </div>
        <div class="row contact-wrapper">
            <ContactIcon icon="fa-regular fa-envelope" content="shady@shadygoat.eu" link="mailto:shady@shadygoat.eu"  />
            <ContactIcon icon="fa-brands fa-linkedin"  content="Lucy Dryaeva" link="https://www.linkedin.com/in/lucy-dryaeva"  /> 
            <ContactIcon icon="fa-brands fa-discord"   content="@shadygoat" />
            <ContactIcon icon="fa-brands fa-github"    content="ShadiestGoat" link="https://github.com/ShadiestGoat"  /> 
        </div>
    </div>
</section>

<style lang="scss">
    @use "sass:math";

    .contact-wrapper {
        gap: 4vh 20vw;
        padding: 10vh 10vw 4vh;
        justify-content: center;
        flex-wrap: wrap;
    }

    #langs > .col {
        justify-content: space-between;
        padding-bottom: 12vh;
    }

    .tag-wrapper {
        align-self: center;
        width: 60%;
        flex-wrap: wrap;
        gap: 2vw;
        justify-content: center;
    }

    .unselected {
        color: $gray-4;

        span {
            filter: saturate(0.3);
        }
    }

    $tag-size: 1.4rem;
    $tag-color-size: 0.8rem;

    .tag {
        font-size: 1.4rem;
        transition: 0.5s;
    }

    .tag-c {
        width:  $tag-color-size;
        height: $tag-color-size;
        padding: calc(($tag-size - $tag-color-size)/2);
        border-radius: 50px;
        background-color: var(--c);
        display: inline-block;
        transition: 0.5s;
    }

    .pie-wrapper {
        width: 25vw;
        align-self: center;
    }

    .usage-h {
        justify-content: center;
        margin-top: 2vh;
        margin-bottom: 4vh;

    }

    .portfolio-h {
        margin-bottom: 0.5vh;
    }

    #portfolio > .col {
        width: 100%;
    }

    .col {
        flex: 1 1 auto;
    }

    h1 {
        font-size: 3rem;
    }
    h2 {
        font-size: 2.3rem;
    }

    .cluster-langs {
        margin-top: 0.2rem;
        justify-content: center;

        a {
            font-size: 1.3rem;
        }
    }
    
    $border-color: $green-3;
    $border-size: 3px;

    section {
        position: relative;
        display: grid;
        grid-template: 1/1;
        min-height: 100vh;
        border-bottom: $border-size solid $border-color;
        padding-top: 4vh;
        width: 100%;
    }

    .border-0 {
        border: none;
    }

    section > * {
        grid-row: 1;
        grid-column: 1;
    }

    .own-info {
        align-self: start;
        justify-self: start;
        margin: 0 3vw 4vh;
    }

    .own-info > * {
        text-align: left;
    }

    .btn-cluster {
        justify-self: center;
        align-self: center;
    }
</style>
