<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { shouldContinueEvent, type AnyInputEvent } from "./inputUtils";

    export let content = ""
    export let classes: string = ""
    export let color: "gray" | "blue" | "green" | "yellow" | "orange" | "red" | "purple" | "pink" | "coral"
    export let href = ""
    export let fontSize:string = ""
    export let disable = false
    
    const dispatcher = createEventDispatcher<{click: void}>()

    function submit(e: AnyInputEvent) {
        if (!shouldContinueEvent(e)) {
            return
        }
        if (disable) {
            return
        }

        dispatcher('click')
    }

    $: usedClasses = classes + (disable ? " " + "disabled" : "")
</script>

{#if href}
    <a {href} class={color + " " + usedClasses + " hover-border"}>
        {#if $$slots.content}
            <slot name="content" />
        {:else}
            <h2 style={fontSize ? "font-size: " + fontSize : ""}>{content}</h2>
        {/if}
    </a>
{:else}
    <button tabindex="0" on:click={submit} on:keypress={submit} class={color + " " + usedClasses + " hover-border"}>
        {#if $$slots.content}
            <slot name="content" />
        {:else}
            <h2 style={fontSize ? "font-size: " + fontSize : ""}>{content}</h2>
        {/if}
    </button>
{/if}

<style lang="scss">
    @use 'sass:list';

    $colors: (
        'gray':   $gray-5   $gray-4,
        'blue':   $blue-5   $blue-4,
        'green':  $green-5  $green-4,
        'yellow': $yellow-5 $yellow-4,
        'orange': $orange-5 $orange-4,
        'red':    $red-5    $red-4,
        'purple': $purple-5 $purple-4,
        'pink':   $pink-5   $pink-4,
        'coral':  $coral-5  $coral-4,
    );
    
    
    @each $name, $col in $colors {        
        .#{$name} {
            background-color: list.nth($col, 1);
            &:hover {
                background-color: list.nth($col, 2);

                h2 {
                    color: $white;
                }
            }
        }
    }

    * {
        transition: 0.7s all;
    }

    a, button {
        padding: 2vh 1vw;
        margin: 0.5vh 0.5vw;
        border-radius: 10px;
        display: grid;
        align-items: center;
        align-content: center;
        cursor: pointer;
        outline: none;
        border: 0;

        --hover-color: #{$purple-1};
    }

    h2 {
        color: $white;
    }

    // (a, button):not(.disable):hover {
    //     background-color: map-get($colors, '#{color}-5') !important;
    //     border-radius: 18px;
    //     box-shadow: 0 0 23px 4px $gray-9;
    // }
    
    .disabled {
        cursor: not-allowed;
        filter: grayscale(0.75);
    }

</style>