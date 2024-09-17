export type AnyInputEvent = KeyboardEvent | MouseEvent

export function shouldContinueEvent(e: AnyInputEvent): boolean {
	const k = (e as KeyboardEvent).key
	if (!k) {
		return true
	}
	
	if (k == " " || k == "Space" || k == "Enter") {
		return true
	}
	
	return false
}

export function mkInputHandler(h: (e: AnyInputEvent) => void): ((e: AnyInputEvent) => void) {
	return (e) => {
		if (!shouldContinueEvent(e)) {
			return
		}

		h(e)
	}
}

// Sigh... waiting for svelte 5
// export function inputWrapper(h: (e: AnyInputEvent) => void): Record<'on:click' | 'on:keypress', ((e: AnyInputEvent) => void)> {
// 	const f = mkInputHandler(h)
// 	return {
// 		"on:click": f,
// 		"on:keypress": f,
// 	}
// }