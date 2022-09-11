import React, { useContext } from 'react'
import { Button } from 'react-native'

import { TokenContext, UsernameContext } from '../Contexte/Context';

export default function SignOutScreen ({ navigation, route }) {
	const[token, setToken] = useContext(TokenContext);
	const[username, setUsername] = useContext(UsernameContext)
	return <Button title='Sign me out' onPress={() => {setToken(null); setUsername("");navigation.navigate('Home')}} />
}