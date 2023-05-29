<script lang="ts">
	import { shouldContinueEvent, type AnyInputEvent, inputWrapper } from "./inputUtils";
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

            if (selectedTags.includes(t)) {
                selectedTags = selectedTags.filter(v => v != t)
            } else {
                selectedTags.push(t)
            }

            selectedTags = selectedTags
        }
    }

    let showAll = false

    function onShowAll(e: AnyInputEvent) {
        if (!shouldContinueEvent(e)) {
            return
        }

        showAll = !showAll
    }
</script>

<div class="row center">
    <button on:click={onShowAll} on:keypress={onShowAll} class="show-all hover-border">{showAll ? "Hide some" : "Show All"}</button>
</div>

<div class="col tag-wrapper">
    {#each tags as tagRow}
        <div class="row tags">
            {#each tagRow as tag (tag)}
                <button on:click={selectTag(tag)} on:keypress={selectTag(tag)} tabindex="0" 
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
            <div style="{(showAll ? visibleProjects : visibleProjects.slice(0, summaryNumber)).includes(ind) ? "" : "display: none"}" class="project col">
                <div class="col">
                    <div class="row heading">
                        <h2>{proj.name}</h2>
                    </div>
                    <div class="row description wrap-words">
                        <p>{proj.description}</p>
                    </div>
                </div>

                <div class="row project-tag-wrapper">
                    {#each [...proj.tags, ...proj.langs] as tag}
                        <i title={tag} class={icons[tag]} />
                    {/each}
                </div>
            </div>
        {/each}
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

    .center {
        justify-content: center;
    }

    .project-tag-wrapper {
        align-self: flex-end;
        gap: min(1vw, 8px);
        margin-top: 1vh;
        
        i {
            color: $gray-5;
            transition: 0.4s;
            
            &:hover {
                color: $gray-2;
            }
        }

    }

    .project {
        width: clamp(350px, 25vw, 45vw);
        flex: 1 1 auto;
        border: $frame;
        padding: max(1vh, 3px) max(1vw, 8px) 0.75vh;
        border-radius: 8px;
        background-color: $bg;
        justify-content: space-between;
    }

    .heading {
        padding-bottom: 1vh;
        margin-bottom: 2vh;
        border-bottom: $gray-7 solid 1px;
    }

    .description p {
        color: $primary;
    }

    .description, .heading, p {
        align-content: left;
        text-align: left;
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
        transition: 0.7s;
        background: none;
        cursor: pointer;

        display: inline-flex;
        align-items: center;
        gap: 0.5vw;

        i {
            font-size: 1rem;
        }

        &:disabled {
            cursor: not-allowed;
        }

        background-color: $bg;
        
        &:not(:disabled) {

            &:hover, &[aria-pressed="true"] {
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