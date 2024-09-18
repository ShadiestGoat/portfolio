<script lang="ts">
    import { shouldContinueEvent, type AnyInputEvent, mkInputHandler } from "./inputUtils";
	import Project from "./project.svelte";
	import { tags, tagIndex, projects, type tag, icons } from "./store";

    let selectedTags: tag[] = []

    const summaryNumber = 3

    function getProjects(t: tag[]): number[] {
        if (t.length == 0) {
            return projects.map((v, i) => i)
        }

        const indexes = t.map(tag => tagIndex[tag])
        const indexCount: Record<number, number> = {}

        indexes.flat().forEach(t => {
            if (indexCount[t] === undefined) {
                indexCount[t] = 0
            }

            indexCount[t]++
        })

        return indexes[0].filter(i => indexCount[i] == indexes.length)
    }

    $: visibleProjects = getProjects(selectedTags)

    function tagDisabled(t: tag, visibleProjects: number[]): boolean {
        if (tagIndex[t] === undefined) {
            return true
        }

        return tagIndex[t].filter(v => visibleProjects.includes(v)).length == 0
    }

    function selectTag(t: tag) {
        return (e: AnyInputEvent) => {
            if (!shouldContinueEvent(e)) {
                return
            }
            e.stopPropagation()
            e.preventDefault()

            if (selectedTags.includes(t)) {
                selectedTags = selectedTags.filter(v => v != t)
            } else {
                selectedTags.push(t)
            }

            selectedTags = selectedTags
        }
    }

    let showAll = false

    const onShowAll = mkInputHandler(() => showAll = !showAll)
    const onSeeMore = mkInputHandler(() => showAll = true)
</script>

<div class="row center">
    <button on:click={onShowAll} on:keypress={onShowAll} class="show-all hover-border">{showAll ? "Hide some" : "Show All"}</button>
</div>

<div class="col tag-wrapper">
    {#each tags as tagRow}
        <div class="row tags">
            {#each tagRow as tag (tag)}
                <button on:click={selectTag(tag)} on:keydown={selectTag(tag)} tabindex="0" 
                    disabled={tagDisabled(tag, visibleProjects)} 
                    aria-pressed={selectedTags.includes(tag)}
                    class="tag">

                    <h3>{tag}</h3>

                    <i title={tag} class={icons[tag] + " hide-if-small"} />
                </button>
            {/each}
        </div>
    {/each}
</div>

<div class="row project-wrapper">
    {#key visibleProjects || showAll}
        {#each projects as proj, ind (proj.name)}
            <Project {proj} show={(showAll ? visibleProjects : visibleProjects.slice(0, summaryNumber)).includes(ind)} />
        {/each}

        {#if !showAll && visibleProjects.length > summaryNumber}
            <div class="row center" style="width: 100%">
                <button class="show-all see-more hover-border" on:click={onSeeMore} on:keypress={onSeeMore}>See More</button>
            </div>
        {/if}
    {/key}
</div>

<style lang="scss">
    .show-all {
        color: $info;
        cursor: pointer;
        border: none;
        outline: none;
        width: max-content;
        font-size: 1.15rem;
        margin-bottom: 2.5vh;
    }

    .see-more {
        font-size: 1.5rem;
    }

    .center {
        justify-content: center;
    }

    .project-wrapper {
        flex-wrap: wrap;
        padding: 2vh 5vw;
        gap: 2vw;
        margin-top: 5vh;
        margin-bottom: 4vh;
    }
    
    h3 {
        font-size: 1.1rem;
    }

    .tags {
        flex-wrap: nowrap;
        gap: 1vw;
        justify-content: center;
    }

    .tag {
        white-space: nowrap;
        padding: 1vh 2vw;
        border-radius: 8px;
        border: $gray-8 2px solid;
        transition: 0.5s;
        background: none;
        cursor: pointer;

        display: inline-flex;
        align-items: center;
        gap: 0.5vw;

        background-color: $bg;

        i {
            font-size: 1rem;
        }

        >* {
            transition: 0.5s;
        }

        &:disabled {
            cursor: not-allowed;

            >* {
                color: $gray-6;
            }
        }
        
        &:not(:disabled) {

            &:hover, &[aria-pressed="true"], &:focus-visible {
                transform: scale(1.05);
                background-color: $purple-7;
            }
        }
    }


    @media only screen and (max-width: 600px) {
        .hide-if-small {
            display: none;
        }

        .tag {
            padding: 4px;
        }
    }

    .tag-wrapper {
        width: 100%;
        overflow-x: auto;
        gap: 1vh;
        padding: 1vh 2vw;
    }
</style>