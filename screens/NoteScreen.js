import React from "react"
import {
	Modal,
	Text,
	StyleSheet,
	View,
	Image,
	ScrollView,
	TouchableOpacity
} from "react-native"

import { useDispatch } from "react-redux"
import { changeOpenNote } from "../actions"


function NoteScreen(prop) {
	const dispatch = useDispatch()
	return (
		<Modal visible={prop.visible} animationType="slide">
			<View style={styles.modal}>
				<TouchableOpacity onPress={() => dispatch(changeOpenNote())}>
					<View style={styles.back}>
						<Image
							style={styles.backIcon}
							source={require("../assets/back.png")}
						/>
					</View>
				</TouchableOpacity>
				<View style={styles.title}>
					<Text style={styles.text}>{prop.data.title}</Text>
				</View>
				<ScrollView style={styles.body}>
					<Text style={styles.text}>{prop.data.body}</Text>
				</ScrollView>
			</View>
		</Modal>
	)
}
const styles = StyleSheet.create({
	modal: {
		flex: 1,
		backgroundColor: "rgb(33,33,33)"
	},
	title: {
		backgroundColor: "rgb(26, 26, 26)",
		alignItems: "center",
		height: 60,
		justifyContent: "center",
		borderBottomColor: "rgb(16, 16, 16)",
		borderBottomWidth: 2
	},
	text: {
		color: "rgb(150, 150, 150)",
		fontSize: 18,
		fontFamily: "sans-serif"
	},
	back: {
		width: "100%",
		height: 30,
		paddingLeft: 20,
		backgroundColor: "rgb(26, 26, 26)",
		paddingTop: 10,
	},
	body: {
		padding: 20
	},
	backIcon: {
		height: 20,
		width: 30
	}
})
export default React.memo(NoteScreen)
