import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import {Context} from './Context';
import AddingForm from './AddingForm';
import StatusList from './StatusList.js';
import ProjectService from '../services/ProjectService';
import TaskService from '../services/TaskService';
import UserService from '../services/UserService';
import '../css/dashboard.min.css';


export default function DashBoard (props) {
	const {id} = useParams();
	const {currentUser} = useContext(Context);
	console.log("DASHBOARD RENDER")
	const projectService = new ProjectService();
	const taskService = new TaskService();
	const userService = new UserService();

	const [tasks, setTasks] = useState([]);
	const [project, setProject] = useState({})
	const [users, setUsers] = useState([]);
	const [taskIdToChange, setTaskIdToChange] = useState('');
	const [showModal, setShowModal] = useState(false);


	useEffect(async () => {
		console.log("useEffect")
		const projectId = id.slice(1);
		const userProject = await projectService.getAllInformationAboutProject(projectId);
		const allTasks = await taskService.getAllTasksByProjectId(projectId);
		console.log(userProject);
		console.log(allTasks);
		console.log(userProject);
		setProject(userProject);
		setUsers(userProject.users);
		setTasks(allTasks);
	}, [tasks]);


	const updateTask = async (newStatus) => {
		try {
				const data = {
				"taskId": taskIdToChange,
				"status": newStatus
			};
			return await taskService.taskStatusUpdate(data);
		} catch (e) {
			console.log(e);
			console.log("Error with updating tasks");
		}
	}



	// async function fetchTasks () {
	// 	console.log("FETCH")
	// 	try {
	// 		const taskService = new TaskService();
	// 		const tasks = await taskService.getAllTasksByProjectId(project.projectId);
	// 		if (tasks) {
	// 			setTasks(tasks);
	// 		} else {
	// 			return;
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 		console.log("Error wit fetching tasks");
	// 	}
	// }



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
	const showMyTasks = async () => {
		// const AllTasks = await taskService.getAllTasksByUserId(project.id, currentUser.id);
		// console.log(AllTasks);
		// setTasks(AllTasks);
		console.log("showing my tasks")
	}

	const showAllTasks = async () => {
		// const allTasks = await taskService.getAllTasksByProjectId(myProject.id);
		// console.log(allTasks);
		// setTasks(allTasks);
		console.log("showing all tasks");
	}
	const openModal = () => {
		setShowModal(true);
	}

	const closeModal = () => {
		setShowModal(false);
	}

	const addTask = async (title, userId) => {
		try {
			const addingData = {
				title: title,
				projectId: project.projectId,
				userId: userId,
				status: 1
			};
			const success = document.querySelector(".addingForm__success");
			const error = document.querySelector(".addingForm__error");
			const res = await taskService.postNewTask(addingData);
			if (res) {
				success.style.display = 'block';
			} else {
				error.style.display = 'block';
			}
			setTimeout(() => {
				success.style.display = 'none';
				error.style.display = 'none';
				closeModal();
			}, 1000);
		} catch(e) {
			console.log(e);
			console.log("Error with adding new task");
		}
	}

	let modalClassName;
	showModal ? modalClassName = 'addingForm active' : modalClassName = 'addingForm';

	let statusListProps = {
		currentUser: currentUser,
		tasks: tasks,
		currentUser: currentUser,
		project: project,
		dragStartHandler:  (e) => dragStartHandler(e),
		dropHandler: (e) => dropHandler(e),
		dragOverHandler: (e) => dragOverHandler(e),
		dragLeaveHandler: (e) => dragLeaveHandler(e)
	}

	return (
		<>
			<Context.Provider value={{users}}>
				<AddingForm
					addTask={(title, userId) => addTask(title, userId)}
					closeModal={() => closeModal()}
					project={project}
					modalClassName={modalClassName}
					users={users}/>
					<div className="dashboard">
						<div className="dashboard__sidebar">
							<div className="dashboard__sidebar_btn" onClick={() => showMyTasks()}>
								<p>My Tasks</p>
							</div>
							<div className="dashboard__sidebar_btn" onClick={() => showAllTasks()}>
								<p>All Tasks</p>
							</div>
							<div className="dashboard__sidebar_btn" onClick={() => openModal()}>
								<p>New Task</p>
							</div>																													
						</div>
						<div className="dashboard__content">
							<StatusList key="1"  statusListProps={statusListProps} statusId={ 1 }/>
							<StatusList key="2"  statusListProps={statusListProps} statusId={ 2 }/>
							<StatusList key="3"  statusListProps={statusListProps} statusId={ 3 }/>
						</div>
					</div>
			</Context.Provider>
		</>
	)
}