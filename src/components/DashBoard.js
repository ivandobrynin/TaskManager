import React, {useState, useEffect} from 'react';
import AddingForm from '../components/AddingForm';
import StatusList from './StatusList.js';
import TaskService from '../services/TaskService';
import '../css/dashboard.min.css';


export default function DashBoard (props) {

	
	const [currentUser] = useState(props.currentUser);
	const [tasks, setTasks] = useState(props.tasks);
	const [project] = useState(props.project);
	const [users] = useState(props.users);
	const [taskIdToChange, setTaskIdToChange] = useState('');
	const [showModal, setShowModal] = useState(false);

	const updateTask = async (newStatus) => {
		const taskService = new TaskService();
		const data = {
			"taskId": taskIdToChange,
			"status": newStatus
		};
		const update = await taskService.taskStatusUpdate(data);
		if (update) {
			const tasks = await taskService.getAllTasksByProjectId(project.projectId);
			setTasks(tasks);
		} else {
			console.log("Error with updatind task")
		}
	}

	const dragStartHandler = (e) => {
		setTaskIdToChange(e.target.id);
	}

	const dragOverHandler = (e) => {
		e.preventDefault();
		e.currentTarget.style.background = '#a0a0a062';
	}

	const dragLeaveHandler = (e) => {
		e.currentTarget.style.background = 'none'
	}

	const dropHandler = (e) => {
		e.preventDefault();
		const newStatus = e.currentTarget.getAttribute('data-id');
		e.currentTarget.style.background = 'none';
		e.currentTarget.childNodes.forEach(item => {
			item.style.display = ''
		});
		updateTask(newStatus);
	}

	const openModal = () => {
		setShowModal(true);
	}

	const closeModal = () => {
		setShowModal(false);
	}
	const tasksToShow = currentUser.roleId === 3 
	? tasks.filter(task => task.userId === currentUser.id)
	: tasks;

	let modalClassName;
	showModal ? modalClassName = 'addingForm active' : modalClassName = 'addingForm';

	let statusListProps = {
		tasks: tasksToShow,
		currentUser: currentUser,
		project: project,
		usersOnProject: users,
		dragStartHandler:  (e) => dragStartHandler(e),
		dropHandler: (e) => dropHandler(e),
		dragOverHandler: (e) => dragOverHandler(e),
		dragLeaveHandler: (e) => dragLeaveHandler(e)
	}
	return (
		<>
			<AddingForm
				closeModal={() => closeModal()}
				projectId={project.projectId}
				modalClassName={modalClassName}
				users={users}/>
			
			<div className="container">
				<div className="dashBoard">
					<div className="dashBoard__btn">
						<button 
						type="button" 
						className="btn btn-secondary"
						onClick={() => openModal()}>NewTask</button>
					</div>
						<div className="dashBoard__wrapper">
							<StatusList key="1"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 1 }/>
							<StatusList key="2"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 2 }/>
							<StatusList key="3"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 3 }/>
						</div>
					</div>
			</div>
		</>
	)
}