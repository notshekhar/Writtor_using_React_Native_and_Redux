import { combineReducers } from "redux"

import toggleReducer from "./toggle"
import noteReducer from "./notes"
import opennoteReducer from "./opennoteReducer"

const reducer = combineReducers({
	toggle: toggleReducer,
	notes: noteReducer,
	openNote: opennoteReducer
})

export default reducer 

