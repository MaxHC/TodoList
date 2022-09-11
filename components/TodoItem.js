import React, {useState, useContext} from "react";
import { View, StyleSheet, Switch, Text, Image, TouchableOpacity } from 'react-native';

import { deleteTask, updateTask } from './API'
import { TokenContext } from '../Contexte/Context'

export default function TodoItem(props){
	const [token, setToken] = useContext(TokenContext);
	const [item, setItem] = useState(props.item.item);
	const [error, setError] = useState("");
	
	const toggleSwitch = () => {
		updateTask(!item.done, item.id, token).then(res => {
			item.done = !item.done;
			props.updateCount(item.done ? 1 : -1);
			props.updateDisplay();
		}).catch(err => {
			setError(err);
		})
	}
	
	const delTask = () => {
		deleteTask(item.id, token).then(res => {
			props.deleteTodo(item.id);
		}).catch(err => {
			setError(err);
		})
	};
	
	return (
		<View style={styles.content}>
			<Text style={[styles.texts, {textDecorationLine: item.done ? 'line-through' : 'none'}]}>{item.content}</Text>
			<TouchableOpacity
				onPress={delTask}
			>
				<Image source={require('../assets/trash-can-outline.png')} style={styles.trash}/>
			</TouchableOpacity>
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={item.done ? "#f5dd4b" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={item.done}
			/>
			<Text>{error}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		flexDirection:'row',
		border: '1px solid #CECECE',
		borderRadius: 20,
	},

	/*text: {
		marginLeft: 10,
		width: 150
	},*/

	trash: {
		height:20,
		width:20,
		marginLeft: 10,
		marginRight: 10,
	}, 
})