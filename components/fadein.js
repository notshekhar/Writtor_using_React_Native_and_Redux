import React, { useState, useEffect } from "react"
import { Animated, View } from "react-native"

export default function FadeInView(props) {
	const [fadeAnim] = useState(new Animated.Value(0)) // Initial value for opacity: 0
	const time = props.time
	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: time
		}).start()
	}, [])
	const [height] = useState(new Animated.Value(0)) // Initial value for opacity: 0

	useEffect(() => {
		Animated.timing(height, {
			toValue: props.height,
			duration: time
		}).start()
	}, [])

	return (
		<Animated.View // Special animatable View
			style={{
				...props.style,
				opacity: fadeAnim,
				height: height
				// Bind opacity to animated value
			}}>
			{props.children}
		</Animated.View>
	)
}
