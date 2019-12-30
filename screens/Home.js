import React from "react"
import {
	StyleSheet,
	View,
	FlatList,
	AsyncStorage,
	Modal,
	BackHandler
} from "react-native"
import Constants from "expo-constants"

import { useSelector, useDispatch } from "react-redux"

import Header from "../components/header"
import Note from "../components/note"
import NewNote from "../components/newnoteprompt"
import NoteScreen from "./NoteScreen"

import { changeNotes, changeOpenNote, hidetoggle } from "../actions"

// import * as SQLite from "expo-sqlite"
// const db = SQLite.openDatabase("notes.db")

function Home() {
	const dispatch = useDispatch()

	const notes = useSelector(state => state.notes)
	const openNote = useSelector(state => state.openNote)
	const toggle = useSelector(state => state.toggle)

	const [singleNote, changeSingleNote] = React.useState({})

	const setStates = async () => {
		// await AsyncStorage.setItem("notes", "[]")

		let n = JSON.parse(await AsyncStorage.getItem("notes"))
		if (n) {
			dispatch(changeNotes(n))
		}
	}
	React.useEffect(() => {
		setStates()
		// db.transaction(tx => {
		// 	tx.executeSql(
		// 		"create table if not exists notes(id number, title text, body text, deleted boolean);"
		// 	)
		// })
		// alert(JSON.stringify(db))
		// db.transaction(tx => {
		// 	tx.executeSql("select * from notes;", [], (_, { rows }) => {
		// 		alert(JSON.stringify(rows))
		// 	})
		// })
		// alert(JSON.stringify(db))
	}, [])

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "rgb(33, 33, 33)",
			paddingTop: Constants.statusBarHeight,
			justifyContent: "space-between",
			zIndex: 2
		},
		new: {
			zIndex: 2
		},
		body: {
			height: "100%",
			backgroundColor: "rgb(33, 33, 33)",
			paddingLeft: 20,
			paddingRight: 20,
			marginTop: 20
		}
	})

	const remove = async i => {}
	const open = e => {
		dispatch(changeOpenNote())
		changeSingleNote(e)
	}
	BackHandler.addEventListener("hardwareBackPress", () => {
		if (!toggle) {
			BackHandler.exitApp()
			return
		}
		dispatch(hidetoggle())
		return true
	})
	return (
		<View style={styles.container}>
			<NoteScreen visible={openNote} data={singleNote}></NoteScreen>
			<Header></Header>
			<FlatList
				data={notes}
				renderItem={({ item }) => <Note data={item} onOpen={open} />}
				keyExtractor={item => item.id}
				style={styles.body}
			/>
			<NewNote style={styles.new}></NewNote>
		</View>
	)
}

export default React.memo(Home)
