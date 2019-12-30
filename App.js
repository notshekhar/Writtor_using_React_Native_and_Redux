import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"

import reducer from "./reducers"

const store = createStore(reducer)
import Home from "./screens/Home"

function App() {
	return (
		<Provider store={store}>
			<Home></Home>
		</Provider>
	)
}
export default React.memo(App)
