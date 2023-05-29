<script lang="ts">
    const desc = "Hi there! My name is Lucy Dryaeva, I am a fullstack developer, specializing in Go, SQL, SCSS and TypeScript with special love for Svelte. I am very open to learning new frameworks and stacks, and would love to work with your setup, especially if it's low level and complex!"
    const title = "Lucy Dryaeva - The Fullstack Developer"
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={desc}>

    <meta property="og:image" content="https://shadygoat.eu/pfp.png" />
    <meta property="og:description" content={desc} />
    <meta property="og:title" content={title} />
    
    <meta name="theme-color" content="#0D1117" />
</svelte:head>
