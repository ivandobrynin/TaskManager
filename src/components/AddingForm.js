import React, {useState, useContext, useEffect} from 'react';
import {Context} from './Context';
import TaskService from '../services/TaskService';
import '../css/addingForm.min.css';

export default function AddingForm (props) {
	
	const [users, setUsers] = useState(props.users);
	const [title, setTitle] = useState('');
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (props.users !== users) {
			setUsers(props.users);
		}
	}, [props.users]);

	const onChangeHandler = (e) => {
		setTitle(e.target.value);
	}

	const onSelectHandler = (e) => {
		setUserId(e.target.value);
	}

	const addTask = () => {
		props.addTask(title, userId);
		setTitle('');
	}

	const closeModal = () => {
		props.closeModal();
		setTitle('');
	}

	let developers = users.filter(user => user.roleId === 3);
	developers = developers.map(user => {
		return {
			name: user.firstName + ' ' + user.lastName,
			id: user.id
		}
	});
	return (
		<div className={props.modalClassName}>
			<form className="addingForm__modal">
				<div className="addingForm__title">New Task</div>
				<div className="addingForm__textarea">
					<label htmlFor="textarea">Enter your task here</label>
					<textarea id="textarea" value={title} maxLength="200" onChange={(e)=> onChangeHandler(e)} type="text"></textarea>
				</div>
				{title.length >= 200 
				? 
					<div className="taskModalEdit__textAreaError">Max length is 200 characters</div>
				:
				<div className="taskModalEdit__textAreaError"></div>}
				<div className="addingForm__select">
					<label htmlFor="select">Choose a developer</label>
					<select id="select" className="select"
						required
						onChange={(e)=> onSelectHandler(e)}>
							<option value={null}></option>
						{developers.map(developer => {
							return (
								<option key={developer.id} value={developer.id}>{developer.name}</option>
							)
						})}
					</select>
					<div className="addingForm__success">New Task has been added</div>
					<div className="addingForm__error">Something wrong</div>
				</div>
				<div className="addingForm__btns">
				<button onClick={()=> addTask()}
						type="button" 
						className="btn btn-primary">Add task</button>
					<button onClick={()=> closeModal()}
						type="button" 
						className="btn btn-primary">Cancel</button>
				</div>
			</form>
		</div>
	)
}