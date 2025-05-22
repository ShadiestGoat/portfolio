import { get, writable } from "svelte/store";

export let selectedTag = writable<string>("")
export let excplicitSelect = writable<boolean>(false)

export function focusTag(t: string) {
    if (!get(excplicitSelect)) {
        selectedTag.set(t)
    }
}

export function blurTag(t: string) {
    if (!get(excplicitSelect)) {
        selectedTag.set("")
    }
}

export function selectTag(t: string) {
    if (get(excplicitSelect) && get(selectedTag) == t) {
        excplicitSelect.set(false)
        selectedTag.set("")
    } else {
        excplicitSelect.set(true)
        selectedTag.set(t)
    }
}

