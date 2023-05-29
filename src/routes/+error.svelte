<script lang="ts">
    import { page } from "$app/stores"

    $: msg = typeof $page.error == "string" ? $page.error : $page.error?.message

    $: console.error(msg)
</script>

<h1>
    {msg}
</h1>

<style lang="scss">
    h1 {
        margin-top: 30vh;
        color: $danger;
    }
</style>