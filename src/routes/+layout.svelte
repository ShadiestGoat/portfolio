<script lang="ts">
	import Head from '$lib/head.svelte';
	import '../app.scss';
	import '@fontsource/roboto';
	import '@fortawesome/fontawesome-free/css/all.min.css';

</script>

<Head />

<main>
	<slot />
</main>

<style lang="scss">
	main {
		// scroll-snap-align: st;
		scroll-snap-type: y proximity;
		height: 100vh;
		overflow-y: auto;
		scroll-behavior: smooth;
	}
</style>