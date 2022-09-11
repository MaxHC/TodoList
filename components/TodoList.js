import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Image, FlatList, ActivityIndicator } from 'react-native';

import { addTask, getTasks, deleteTaskList, updateTasksOfList } from './API'
import { TokenContext } from '../Contexte/Context'
import TodoItem from './TodoItem'

export default function TodoList(props) {
	const [name, setName] = useState(props.id.item.title);
	const [id, setId] = useState(props.id.item.id);
	const [taskName, setTaskName] = useState("");
	const [token, setToken] = useContext(TokenContext);
	const [error, setError] = useState("");
	const [todos, setTodos] = useState(null);
	const [display, setDisplay] = useState(todos);
	const [displayed, setDisplayed] = useState("Tous");
	const [nbFinished, setNbFinished] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const delTaskList = () => {
		deleteTaskList(id, token).then(res => {
			props.deleteTodoList(id);
		}).catch(err => {
			setError(err);
		})
	}

	const displayer = () => {
		if (displayed == "Fini"){
			displayFinished();
		} else if (displayed == "Non fini"){
			displayNonFinished();
		} else {
			displayAll();
		}
	}

	const displayAll = () => {
		setDisplay(todos);
	}

	const displayFinished = () => {
		const newDisplay = todos.filter(item => item.done == true);
		setDisplay(newDisplay);
	}

	const displayNonFinished = () => {
		const newDisplay = todos.filter(item => item.done == false);
		setDisplay(newDisplay);
	}

	const updateCount = (value) => {setNbFinished(nbFinished+value)}

	const createTask = () => {
		addTask(taskName, id, token).then(res => {
			const tempTask = res.tasks[0]
			const newTodo = [...todos, {
        		id: tempTask.id,
        		content: tempTask.content,
        		done: tempTask.done
    		}];
    		setTodos(newTodo);
    		displayer();
		}).catch(err => {
			setError(err);
		})
		setTaskName("");
	}

	const deleteTodo = (id) => {
		const newTodo = todos.filter(item => item.id != id);
		const deleteTodo = todos.filter(item => item.id == id);

		if(deleteTodo[0].done){
			updateCount(-1);
		}

		setTodos(newTodo);
		displayer();
	}

	const getTodo = () => {
		getTasks(id, token).then(res => {
			setTodos(res);
			setDisplay(res);
			setNbFinished(res.filter((item)=>item.done).length);
			setIsLoading(false);
		}).catch(err => {
			setError(err);
		})
	}

	const updateAll = (state) => {
		updateTasksOfList(state, id, token).then(res => {
			for(let task of todos){
				if(task.done != state){ //swap done state
					task.done = state;
					updateCount(state?1:-1); //if undone to done : +1, if done to undone : -1
				}
			}
			setNbFinished(todos.filter((item)=>item.done).length)
			displayer()
		}).catch(err => {
			setError(err);
		})
	}

	useEffect(() => {
		getTodo();
	}, []);

	useEffect(() => {
		displayer();
	}, [displayed]);

	useEffect(() => {
		displayer();
	}, [todos]);
	
	return (
		<View style={styles.list}>
			{isLoading ? (
				<ActivityIndicator />
			):(
				< >
				<Text>Liste : {name}</Text>
				<Text>Tache fini : {nbFinished}</Text>
				<Text>Affichage : {displayed}</Text>
				<TouchableOpacity style={{flexDirection:'row'}} onPress={delTaskList}>
					<Text>Supprimer la liste </Text>
					<Image
						source={require('../assets/trash-can-outline.png')}
						style={{ height: 24, width: 24 }}
					/>
				</TouchableOpacity>

				<FlatList
					style={{ paddingLeft: 10 }}
					data={display}
					renderItem={(item) => <TodoItem item={item} updateCount={updateCount} deleteTodo={deleteTodo} updateDisplay={displayer} />} 
				/>

				<TextInput
					onChangeText={setTaskName}
					placeholder='Task name'
					value={taskName}
				/>
				<button onClick={createTask}> Create Task ! </button>			
				<Text>{error}</Text>
				<Button style={styles.button} title="Tout afficher" onPress={() => {setDisplayed("Tous")}} />
	      		<Button style={styles.button} title="Fini" onPress={() => {setDisplayed("Fini")}} />
	      		<Button style={styles.button} title="Non finis" onPress={() => {setDisplayed("Non fini")}} /> 
	      		<Button style={styles.button} title="Tous cocher" onPress={() => {updateAll(true)}} /> 
	      		<Button style={styles.button} title="Tous décocher" onPress={() => {updateAll(false)}} />
	      		< />
      		)}
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		alignSelf: 'flex-start',
		border: '1px solid black',
		padding: '10px',
		marginLeft: '1%',
		marginTop: '1%',
    	alignItems: 'center',
    	justifyContent: 'center',
    	width: '18%'
	},
})