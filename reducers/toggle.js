export default function toggleReducer(state = false, action) {
	switch (action.type) {
		case "SET_TOGGLE":
			return !state
		case "HIDE_TOGGLE":
			return (state) ? !state : state
		default:
			return state
	}
}
