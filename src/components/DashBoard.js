import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import {Context} from './Context';
import AddingForm from './AddingForm';
import StatusList from './StatusList.js';
import ProjectService from '../services/ProjectService';
import TaskService from '../services/TaskService';
import '../css/dashboard.min.css';


export default function DashBoard (props) {
	const {id} = useParams();
	const {currentUser} = useContext(Context);
	const projectService = new ProjectService();
	const taskService = new TaskService();

	const [tasks, setTasks] = useState([]);
	const [project, setProject] = useState({})
	const [users, setUsers] = useState([]);
	const [taskIdToChange, setTaskIdToChange] = useState('');
	const [showModal, setShowModal] = useState(false);


	useEffect(() => {
		async function getDashboardData() {
			const projectId = id.slice(1);
			const userProject = await projectService.getAllInformationAboutProject(projectId);
			const allTasks = await taskService.getAllTasksByProjectId(projectId);
			setProject(userProject);
			setUsers(userProject.users);
			setTasks(allTasks);
		}
		getDashboardData();
	}, []);


	const fetchTasks = async () => {
		const projectId = id.slice(1);
		const allTasks = await taskService.getAllTasksByProjectId(projectId);
		setTasks(allTasks);
	}

	const updateTask = async (newStatus) => {
		try {
			const data = {
			"taskId": taskIdToChange,
			"status": newStatus
			};
			const update = await taskService.taskStatusUpdate(data);
			if (update === 1) {
				fetchTasks();
			}
		} catch (e) {
			console.log(e);
			console.log("Error with updating tasks");
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

	const showMyTasks = (e) => {
		const elem = e.target;
		if (elem.classList.contains('dashboard__sidebar_btn')) {
			const otherBtns = document.querySelectorAll('.dashboard__sidebar_btn');
			otherBtns.forEach(btn => {
				btn.classList.remove('active__link');
			});
		
			elem.classList.add('active__link');
			setTasks(tasks=> {
				const newTasks = tasks.filter(task=> task.userId === currentUser.id);
				return newTasks;
			});
		}
	}

	const showAllTasks = (e) => {
		const elem = e.target;
		if (elem.classList.contains('dashboard__sidebar_btn')) {
			const otherBtns = document.querySelectorAll('.dashboard__sidebar_btn');
			otherBtns.forEach(btn => {
				btn.classList.remove('active__link');
			});
			elem.classList.add('active__link');
			fetchTasks();
		}
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
				fetchTasks();
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
		tasks: tasks,
		project: project,
		dragStartHandler:  (e) => dragStartHandler(e),
		dropHandler: (e) => dropHandler(e),
		dragOverHandler: (e) => dragOverHandler(e),
		dragLeaveHandler: (e) => dragLeaveHandler(e)
	}

	return (
		<>
			<Context.Provider value={{users, fetchTasks}}>
				<AddingForm
					addTask={(title, userId) => addTask(title, userId)}
					closeModal={() => closeModal()}
					project={project}
					modalClassName={modalClassName}
					users={users}/>
					<div className="dashboard">
						<div className="dashboard__sidebar">
							<div className="dashboard__sidebar_title">
								{project.projectName}
							</div>
							<div className="dashboard__sidebar_btn" onClick={(e) => showMyTasks(e)}>
								My Tasks
							</div>
							<div className="dashboard__sidebar_btn" onClick={(e) => showAllTasks(e)}>
								All Tasks
							</div>
							<div className="dashboard__sidebar_btn" onClick={() => openModal()}>
								New Task
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