<script lang="ts">
    export let icon: string;
    export let content: string;
    export let link = "";

    async function onClick(e: MouseEvent | KeyboardEvent) {
        if (link) {
            return
        }

        if (((e as KeyboardEvent).key && ["Enter", "Space"].includes((e as KeyboardEvent).key)) || e.type == "click") {
            e.preventDefault()
            await navigator.clipboard.writeText(content)
        }
    }
</script>

<svelte:element on:click={onClick} on:keypress={onClick} tabindex="0" class="contact col hover-border" this={link ? "a" : "div"} href={link} target="_blank" referrerpolicy="no-referrer">
    <div class="ico-wrapper">
        <i class="{icon}"></i>
    </div>
    <h3>{content}</h3>
</svelte:element>

<style lang="scss">
    .ico-wrapper {
        font-size: 5rem;
        text-align: center;

        i {
            transition: 0.25s;
        }
    }

    .col {
        flex: 1 1 auto;
    }
    
    .contact {
        border: $frame;
        padding: 2vh 2vw;
        border-radius: 10px;
        transition: 0.25s;
        cursor: pointer;
        color: $info;

        background: $bg;

        &:hover {
            transform: scale(1.1);
            padding: 1vh 1vw;

            .ico-wrapper i {
                color: $purple-1;
            }
        }
    }
</style>