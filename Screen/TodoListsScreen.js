import React, { useContext, useState, useEffect } from 'react';
import { TextInput, Button, View, Text, FlatList, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import { UsernameContext, TokenContext } from "../Contexte/Context";
import { createTaskList, getTaskList } from "../components/API";
import TodoList from "../components/TodoList";

export default function HomeScreen () {
	const [taskListName, setTaskListName] = useState("");
	const [username, SetUsername] = useContext(UsernameContext);
	const [token, setToken] = useContext(TokenContext);
	const [error, setError] = useState("");
	const [todoLists, setTodoLists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const createList = () => {
		createTaskList(taskListName, username, token).then(res => {
			const tempTaskList = res.taskLists[0]
			const newTodoList = [...todoLists, {
				id: tempTaskList.id,
				title: tempTaskList.title,
				owner: tempTaskList.owner
			}];
			setTodoLists(newTodoList);
		}).catch(err => {
			setError(err)
		});
		setTaskListName("");
	}

	const deleteTodoList = (id) => {
		const newTodoList = todoLists.filter(item => item.id != id);
		const deleteTodo = todoLists.filter(item => item.id == id);

		setTodoLists(newTodoList);
	}

	const getList = () => {
		getTaskList(username, token).then(res => {
			setTodoLists(res);
			setIsLoading(false);
		}).catch(err => {
			setError(err);
		})
	}

	useEffect(() => {
		getList();
	}, []);

	return (
		<View>
		{isLoading ? (
			<ActivityIndicator size="large"/>
		):(
			<View>
				<Text>Create Task List</Text>
				<TextInput
					onChangeText={setTaskListName}
					placeholder='Task list name'
					value={taskListName}
				/>
				<button onClick={createList}> Create list ! </button>
				<Text>{error}</Text>
				<FlatList
					numColumns={5}
					numRow={15}
					data={todoLists}
					renderItem={(item) => <TodoList id={item} deleteTodoList={deleteTodoList} />}
				/>
			</View>
		)}
		</View>
	)
}
