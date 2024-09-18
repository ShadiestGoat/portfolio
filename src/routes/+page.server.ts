import type { Langs } from '$lib/draw';
import { error, type ServerLoad } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const load = (async ({ fetch }) => {
    const req = new Request(env.LANGS_LOC ?? "https://lang-cache.lucydryaeva.com", {
        headers: {
            Authentication: env.PASSWORD,
        }
    })

    let respB: Langs

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
