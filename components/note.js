import React from "react"
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	AsyncStorage
} from "react-native"

import { useDispatch, useSelector } from "react-redux"
import { changeNotes } from "../actions"

function Note(props) {
	const dispatch = useDispatch()
	const notes = useSelector(state => state.notes)

	const remove = async () => {
		let n = notes
		n = n.map(e => {
			return e.id == props.data.id
				? { title: e.title, body: e.body, id: e.id, deleted: true }
				: e
		})
		dispatch(changeNotes(n))
		await AsyncStorage.setItem("notes", JSON.stringify(n))
	}
	const undo = async () => {
		let n = notes
		n = n.map(e => {
			return e.id == props.data.id
				? { title: e.title, body: e.body, id: e.id, deleted: false }
				: e
		})
		dispatch(changeNotes(n))
		await AsyncStorage.setItem("notes", JSON.stringify(n))
	}

	if (props.data.deleted) {
		return (
			<View>
				<TouchableOpacity onPress={undo}>
					<View style={styles.deletedNote}>
						<Text style={styles.deletedText}>
							This note is deleted. Tap to undo
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
	// if (props.data.deleted) return <View></View>
	return (
		<TouchableOpacity
			onPress={() => props.onOpen(props.data)}
			onLongPress={remove}>
			<View style={styles.note}>
				<Text style={styles.text}>{props.data.title}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	note: {
		backgroundColor: "rgb(26, 26, 26)",
		marginBottom: 10,
		borderColor: "rgb(16,16,16)",
		borderWidth: 2,
		borderRadius: 200,
		padding: 20
	},
	text: {
		color: "rgb(150, 150, 150)",
		fontSize: 15
	},
	deletedNote: {
		backgroundColor: "rgb(26, 26, 26)",
		marginBottom: 10,
		borderColor: "rgb(0,0,0)",
		borderWidth: 2,
		borderRadius: 200,
		padding: 5,
		paddingLeft: 20,
		borderStyle: "dotted"
	},
	deletedText: {
		color: "rgb(120, 120, 120)",
		fontSize: 14,
		fontFamily: "serif",
		fontStyle: "italic"
	}
})
export default React.memo(Note)
