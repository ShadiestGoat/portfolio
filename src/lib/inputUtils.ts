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

export function inputWrapper(h: (e: AnyInputEvent) => void): Record<'on:click' | 'on:keypress', ((e: AnyInputEvent) => void)> {
	const f = function (e: AnyInputEvent) {
		if (!shouldContinueEvent(e)) {
			return
		}

		h(e)
	}

	return {
		"on:click": f,
		"on:keypress": f,
	}
}