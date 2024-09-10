import type { langs } from '$lib/draw';
import { error, type ServerLoad } from '@sveltejs/kit';
import { PASSWORD } from '$env/static/private';

export const load = (async ({ fetch }) => {
    const req = new Request("https://lang-cache.lucydryaeva.com", {
        headers: {
            Authentication: PASSWORD,
        }
    })

    let respB: langs

    try {
        const resp = await fetch(req)
        if (resp.status != 200) {
            throw error(501, "Couldn't load data ://")
        }

        respB = await resp.json()
    } catch (err) {
        console.error(err)
        throw error(501, err as string)
    }
    
	return {
        langs: respB
	};
}) satisfies ServerLoad;
