import React, { useContext } from 'react';

import { TokenContext } from '../Contexte/Context';

//const [TOKEN, setToken] = useContext(TokenContext);

const API_URL = 'http://127.0.0.1:4000'

const SIGN_IN =
	'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
	'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const CREATE_TASK_LIST = 
	'mutation($title:String!, $owner:String!){createTaskLists(input: {title: $title,owner: {connect: {where: {username: $owner}}}}){taskLists{id title owner{username}}}}'

const GET_TASK_LIST = 
	'query($owner:String!){taskLists(where: { owner: {username: $owner}}){id title}}'

const DELETE_TASK_LIST =
	'mutation($taskListID:ID!){deleteTaskLists(where: {id: $taskListID}){nodesDeleted relationshipsDeleted}}'

const ADD_TASK =
	'mutation($content:String!, $taskListID:ID!){createTasks(input: {content: $content, belongsTo: {connect: {where: {id: $taskListID}}}}){tasks{id done content}}}'

const GET_TASKS = 
	'query($taskListId:ID!){tasks(where: {belongsTo: {id: $taskListId}}){id content done}}'

const UPDATE_TASK =
	'mutation($taskID:ID!, $state:Boolean!){updateTasks(where: {id: $taskID}, update: {done: $state}){tasks{id content done}}}'

const UPDATE_TASKS_OF_LIST =
	'mutation($taskListID:ID!, $state:Boolean!){updateTasks(where: {belongsTo: {id: $taskListID}}, update: {done: $state}){tasks{id content done}}}'

const DELETE_TASK =
	'mutation($taskID:ID!){deleteTasks(where: {id: $taskID}){nodesDeleted}}'

export function signIn (username, password) {
	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: SIGN_IN,
			variables: {
				username: username,
				password: password
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.signIn
		})
		.catch(error => {
			throw error
		})
}

export function signUp (username, password) {
	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: SIGN_UP,
			variables: {
				username: username,
				password: password
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.signUp
		})
		.catch(error => {
			throw error
		})
}

export function createTaskList (title, owner, token) {

	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			query: CREATE_TASK_LIST,
			variables: {
				title: title,
				owner: owner
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.createTaskLists
		})
		.catch(error => {
			throw error
		})
}

export function getTaskList (owner, token) {

	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			query: GET_TASK_LIST,
			variables: {
				owner: owner
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.taskLists
		})
		.catch(error => {
			throw error
		})
}

export function deleteTaskList (taskListID, token) {
	
	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			query: DELETE_TASK_LIST,
			variables: {
				taskListID: taskListID
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.deleteTaskLists
		})
		.catch(error => {
			throw error
		})
}

export function addTask (content, taskListID, token) {
	
	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			query: ADD_TASK,
			variables: {
				content: content,
				taskListID: taskListID
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.createTasks
		})
		.catch(error => {
			throw error
		})
}

export function getTasks (taskListId, token) {

	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			query: GET_TASKS,
			variables: {
				taskListId: taskListId
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.tasks
		})
		.catch(error => {
			throw error
		})
}

export function updateTask (state, taskID, token) {
	
	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			query: UPDATE_TASK,
			variables: {
				state: state,
				taskID: taskID
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.updateTasks
		})
		.catch(error => {
			throw error
		})
}

export function updateTasksOfList (state, taskListID, token) {
	
	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			query: UPDATE_TASKS_OF_LIST,
			variables: {
				state: state,
				taskListID: taskListID
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.updateTasks
		})
		.catch(error => {
			throw error
		})
}

export function deleteTask (taskID, token) {
	
	return fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			query: DELETE_TASK,
			variables: {
				taskID: taskID
			}
		})
	})
		.then(response => {
			return response.json()
		})
		.then(jsonResponse => {
			if (jsonResponse.errors != null){
				throw(jsonResponse.errors[0].message)
			}
			return jsonResponse.data.deleteTasks
		})
		.catch(error => {
			throw error
		})
}