import React, { Component } from "react"
import {
	View,
	TextInput,
	StyleSheet,
	Keyboard,
	Button,
	Alert,
	AsyncStorage
} from "react-native"

import { useSelector, useDispatch } from "react-redux"
import { changeNotes, changeToggle } from "../actions"

function NewNote(prop) {
	const [height, changeHeight] = React.useState(300)
	const [title, changeTitle] = React.useState("")
	const [body, changeBody] = React.useState("")
	const notes = useSelector(state => state.notes)
	const toggle = useSelector(state => state.toggle)
	const dispatch = useDispatch()

	const setId = async () => {
		let n = JSON.parse(await AsyncStorage.getItem("notes"))
		if (n.length>0) {
			dispatch(changeId(n.length))
		}
	}
	React.useEffect(() => {
		setId()
	}, [])
	const styles = StyleSheet.create({
		newprompt: {
			padding: 10,
			width: "100%",
			backgroundColor: "rgb(26, 26, 26)",
			padding: 10,
			borderColor: "rgb(16, 16, 16)",
			borderWidth: 2,
			borderRadius: 20,
			elevation: 10,
			height: height
		},
		input: {
			borderRadius: 200,
			backgroundColor: "rgb(33, 33, 33)",
			height: 50,
			borderWidth: 2,
			borderColor: "rgb(16, 16, 16)",
			padding: 10,
			textAlign: "center",
			color: "rgb(180, 180, 180)"
		},
		body: {
			borderRadius: 20,
			backgroundColor: "rgb(33, 33, 33)",
			height: 150,
			borderWidth: 2,
			borderColor: "rgb(16, 16, 16)",
			padding: 10,
			textAlign: "center",
			color: "rgb(180, 180, 180)",
			marginTop: 10
		},
		add: {
			borderRadius: 200,
			backgroundColor: "rgb(16, 16, 16)",
			height: 50,
			borderWidth: 2,
			borderColor: "rgb(16, 16, 16)",
			textAlign: "center",
			color: "white",
			marginTop: 10,
			overflow: "hidden",
			justifyContent: "center"
		},
		addButton: {
			flex: 1
		}
	})

	Keyboard.addListener("keyboardDidShow", e => {
		changeHeight(300 + e.endCoordinates.height)
	})
	Keyboard.addListener("keyboardDidHide", () => {
		changeHeight(300)
	})

	const addnew = async () => {
		if (title == "") {
			Alert.alert("Title cann't be empty")
			return
		}
		if (title.length > 20) {
			Alert.alert("Title length cann' exced by 20")
			return
		}
		let a = [{ body, title, id: notes.length, deleted: false }, ...notes]
		await AsyncStorage.setItem("notes", JSON.stringify(a))
		dispatch(changeNotes(a))
		changeTitle("")
		changeBody("")
		dispatch(changeToggle())
	}

	if (!toggle) return <View></View>

	return (
		<View style={styles.newprompt}>
			<TextInput
				value={title}
				placeholder="Title"
				style={styles.input}
				onChangeText={e => changeTitle(e)}></TextInput>
			<TextInput
				value={body}
				placeholder="Add a note"
				style={styles.body}
				onChangeText={e => changeBody(e)}
				multiline={true}></TextInput>
			<View style={styles.add}>
				<Button
					title="Add"
					color="rgb(16, 16, 16)"
					onPress={addnew}
					style={styles.addButton}></Button>
			</View>
		</View>
	)
}

export default React.memo(NewNote)
