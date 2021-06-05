import React, {useState, useContext} from 'react';
import TaskService from '../services/TaskService';
import TaskModalEdit from '../components/TaskModalEdit';
import Confirm from '../components/Confirm';
import {Context} from '../components/Context';
import '../css/task.min.css';

export default function Task (props) {
	const {task} = props;
	const {users, fetchTasks} = useContext(Context);

	const [showMoreInformation, setShowMoreInformation] = useState(false);
	const [showTaskModalEdit, setShowTaskModalEdit] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const getClassName = (taskStatus) => {
		switch(taskStatus) {
			case 1:
				return 'task task__backlog';
			case 2:
				return'task task__inProgress';
			case 3:
				return 'task task__done';
			default:
				return undefined;
			};
	}

	const showMore = (e) => {
		const elem = e.target.parentNode.parentNode.parentNode.parentNode;
		if (e.target.classList.contains('fa-arrow-down')) {
			e.target.classList.remove('fa-arrow-down')
			e.target.classList.add('fa-arrow-up');
			elem.classList.add('task__increased');
			setShowMoreInformation(true);
		} else {
			e.target.classList.remove('fa-arrow-up')
			e.target.classList.add('fa-arrow-down');
			elem.classList.remove('task__increased');
			setShowMoreInformation(false);
		}
	};

	const openTaskModalEdit = () => {
		setShowTaskModalEdit(true)
	}
	
	const closeTaskModalEdit = () => {
		setShowTaskModalEdit(false);
	}

	const showConfirm = () => {
		setShowConfirmModal(true);
	}

	const closeConfirm = () => {
		setShowConfirmModal(false);
	}
	
	
	const deleteTask = async (e) => {
		try {
			const taskId = e.target.getAttribute('data-id');
			const taskService = new TaskService();
			const res =  await taskService.deleteTask(taskId);
			if (res) {
				fetchTasks();
			} else {
				console.log("Что-то пошло не туда");
			}
			closeConfirm();
		} catch (e) {
			console.log(e);
			console.log("Error with deleting task");
		}

	};
	const userName = task.user ? task.user.firstName + ' ' + task.user.lastName : '';
	let taskClassName = getClassName(task.status);
	let taskText;
	if (!showMoreInformation && task.title.length > 45) {
		taskText = task.title.substring(0, 45) + '...';
	} else {
		taskText = task.title
	}

	let confirmClassName;
	showConfirm ? confirmClassName = 'confirm active' : confirmClassName = 'confirm';

	let taskModalClassName;
	showTaskModalEdit ? taskModalClassName = 'taskModalEdit active' : taskModalClassName = 'taskModalEdit';

	const showDeveloper = true
	return (
		<>
			{showConfirmModal
			? 
				<Confirm 
					confirmClassName={confirmClassName} 
					taskId={task.id}
					deleteTask={(e) => deleteTask(e)} 
					closeConfirm={() => closeConfirm()}/>
			: null }
			{showTaskModalEdit
			? <TaskModalEdit 
				task={task} 
				users={users} 
				taskModalClassName={taskModalClassName} 
				closeTaskModalEdit={()=> closeTaskModalEdit()}/>
			: null}
			<div draggable={true}
				key={task.id}
				id={task.id}
				data-status={task.status}
				className={taskClassName}>
			<div className="task__text">
				<div className="task__title">{taskText}</div>
			</div>
			<div className="task__divider"></div>
			<div className="task__info">
				<div className="task__executor">
					{showDeveloper === true 
					? 
					<div>
						<div className="task__subtitle">Исполнитель: {userName} </div> 
					</div>
					: null}
				</div>
				<div className="task__icons">
					<div className="task__arrow">
						<i className="fa fa-arrow-down" aria-hidden="true" onClick={(e) => showMore(e)}></i>
					</div>
					<div className="task__edit">
						<i className="fa fa-pencil" data-id={task.id} data-status={task.status} onClick={() => openTaskModalEdit()} aria-hidden="true"></i>
					</div>
					<div className="task__delete">
						<i className="fa fa-trash" data-id={task.id} onClick={() => showConfirm()}  aria-hidden="true"></i>
					</div>
				</div>
			</div>
		</div>
		</>
	)
};
