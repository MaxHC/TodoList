import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TodoListsScreen from '../Screen/TodoListsScreen';
import HomeScreen from '../Screen/HomeScreen';
import SignInScreen from '../Screen/SignInScreen';
import SignOutScreen from '../Screen/SignOutScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import { TokenContext } from '../Contexte/Context';

export default function Navigation () {
	const Tab = createBottomTabNavigator();
  return (
	<TokenContext.Consumer>
		{([token, setToken]) => (
			<NavigationContainer>
				{token == null ? (
				<Tab.Navigator>
					<Tab.Screen name='SignIn' component={SignInScreen} />
					<Tab.Screen name='SignUp' component={SignUpScreen} />
				</Tab.Navigator>
			) : (
				<Tab.Navigator>
					<Tab.Screen name='Home' component={HomeScreen} />
					<Tab.Screen name='TodoLists' component={TodoListsScreen} />
					<Tab.Screen name='SignOut' component={SignOutScreen} />
				</Tab.Navigator>
		  	)}
		</NavigationContainer>
		)}
	</TokenContext.Consumer>
  )
}