import type { langs } from '$lib/draw';
import { error, type ServerLoad } from '@sveltejs/kit';
import { PASSWORD } from '$env/static/private';

export const load = (async ({ fetch }) => {
    const req = new Request("https://langs.shadygoat.eu", {
        headers: {
            Authentication: PASSWORD,
        }
    })

    const resp = await fetch(req)
    if (resp.status != 200) {
        throw error(501, "Couldn't load data ://")
    }
	const respB = await resp.json()
    
	return {
        langs: respB as langs
	};
}) satisfies ServerLoad;
