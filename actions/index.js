export function changeToggle() {
	return {
		type: "SET_TOGGLE"
	}
}
export function changeNotes(payload) {
	return {
		type: "SET_NOTES",
		payload
	}
}
export function changeOpenNote() {
	return {
		type: "SET_OPEN"
	}
}

export function hidetoggle(){
	return {
		type: "HIDE_TOGGLE"
	}
}