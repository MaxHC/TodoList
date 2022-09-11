import React, { useContext } from 'react';
import { Text } from 'react-native';

import { UsernameContext } from "../Contexte/Context";

export default function HomeScreen () {
	const [username, setUsername] = useContext(UsernameContext)
	return (
	<>
		<Text>Welcome !</Text>
		<Text>You are logged as {username}</Text>
	</>
	)
}