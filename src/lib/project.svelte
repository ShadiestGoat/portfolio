<script lang="ts">
	import { icons, type project } from "./store";

    export let show: boolean

    export let proj:project
</script>

<div style={show ? "" : "display: none"} class="project col">
    <div class="col">
        <div class="row heading">
            <h2>{proj.name}</h2>
        </div>
        <div class="row description wrap-words">
            <p>{proj.description}</p>
        </div>
    </div>

    <div class="row final-row">
        <div class="row tag-wrapper">
            {#if proj.links}
                {#each proj.links as l}
                    <a class="no-hover" target="_blank" href={l}>
                        <i class="fa-brands fa-github" />
                    </a>
                {/each}
            {:else}
                <i class="fa-solid fa-circle-info" title="This project cannot be open sourced" />
            {/if}
        </div>

        <div class="row tag-wrapper">
            {#each [...proj.tags, ...proj.langs] as tag}
                <i title={tag} class={icons[tag]} />
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
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

    .description, .heading, p {
        align-content: left;
        text-align: left;
    }

    .final-row {
        width: 100%;
        justify-content: space-between;
        gap: 2vw;
        margin: 2vh 0 1vh;
    }

    .tag-wrapper {
        align-self: flex-end;
        gap: min(1vw, 8px);

        i {
            color: $gray-5;
            transition: 0.4s;
            
            &:hover, &:focus-visible {
                color: $gray-2;
            }
        }

        a i:hover, i:focus-visible {
            color: $info;
        }
    }
    .description p {
        color: $primary;
    }
</style>