import React from "react"
import { View, Button, StyleSheet, Text, AsyncStorage } from "react-native"

import { useDispatch, useSelector } from "react-redux"
import { changeToggle, changeNotes } from "../actions"

function Header(props) {
	const dispatch = useDispatch()
	const notes = useSelector(state => state.notes)

	const deleteAll = async () => {
		let n = notes
		n = n.map(e => ({ title: e.title, body: e.body, id: e.id, deleted: true }))
		dispatch(changeNotes(n))
		await AsyncStorage.setItem("notes", JSON.stringify(n))
	}

	return (
		<View style={styles.header}>
			<View style={styles.button}>
				<Button
					title="Delete All"
					color="rgb(33, 33, 33)"
					onPress={deleteAll}></Button>
			</View>
			<Text style={styles.text}>Writtor</Text>
			<View style={styles.button}>
				<Button
					title="Write New"
					color="rgb(33, 33, 33)"
					onPress={() => {
						dispatch(changeToggle())
					}}></Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		top: 0,
		left: 0,
		width: "100%",
		height: 60,
		flexDirection: "row",
		paddingLeft: 20,
		paddingRight: 20,
		justifyContent: "space-between",
		alignItems: "center",
		alignContent: "space-between",
		backgroundColor: "rgb(26, 26, 26)",
		elevation: 10,
		borderBottomColor: "rgb(16, 16, 16)",
		borderBottomWidth: 2
	},
	button: {
		borderRadius: 200,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "rgb(16, 16, 16)",
		elevation: 10
	},
	text: {
		color: "rgb(150, 150, 150)",
		fontFamily: "serif"
	}
})

export default React.memo(Header)
