import React, { useState, useContext } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';

import { signIn, signUp } from "../components/API";
import { TokenContext, UsernameContext } from '../Contexte/Context';

export default function SignUpScreen ({ navigation }) {
	const [user, setUser] = useState("")
	const [password, setPassword] = useState("");
	const [username, setUsername] = useContext(UsernameContext);
	const [token, setToken] = useContext(TokenContext);
	const [error, setError] = useState("");

	const verifySignUp = () => {
		signUp(user, password).then(token => {
			setToken(token);
			setUsername(user);
		})
		.catch(err => {
			setError(err);
		})
	}

	return (
		<View>
			<TextInput
				onChangeText={setUser}
				placeholder='Username'
				value={user}
			/>

			<TextInput
				onChangeText={setPassword}
				placeholder='Password'
				value={password}
				secureTextEntry={true}
			/>

			<button onClick={verifySignUp}> Sign Up </button>

			<Text>{error}</Text>
		</View>
	)
}