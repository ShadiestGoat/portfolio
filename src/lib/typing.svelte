<!-- Some of this has been inspired/reimplented from https://github.com/2705srinivas/svelte-typing-animated/blob/master/src/TypingAnimated.svelte -->

<script lang="ts">
    export let text: string[]
    const delayAddKeys = 230
    const delayRmKeys  = 205
    const delayIndices = 1000

    function overflow(i: number, max: number): number {
        if (i < 0) return 0
        if (i > max) return 0
        return i
    }

    let targetI = 0

    let state = ""

    const type = () => {
        let targetStr = text[targetI]
        const stateLength = state.trim().length
        let length = targetStr.length <= stateLength ? targetStr.length : stateLength
        let targetIndex = 0

        for (let i = 0; i <= length; i++) {
            if (targetStr[i] == state[i]) continue
            targetIndex = i
            break
        }

        let delay = delayIndices

        if (targetIndex < stateLength) {
            state = state.slice(0, -1)
            delay = delayRmKeys
        } else if (targetIndex == stateLength) {
            state += targetStr[targetIndex]
            if (targetStr == state) {
                targetI = overflow(targetI + 1, text.length-1)
            } else {
                delay = delayAddKeys
            }
        }

        setTimeout(type, delay)
    }

    setTimeout(type, 400)
</script>

<style>
    .cursor {
        animation: cursor 500ms cubic-bezier(1,0,0,1) infinite alternate;
    }

    @keyframes cursor {
        from{
            opacity: 0
        }
        to{
            opacity: 1;
        }
    }
    span {
        font-family: monospace;
        font-weight: lighter;
        color: var(--color-primary);
    }
</style>

<span title={text.join(", ")}>{state}<span class="cursor">│</span>
</span>