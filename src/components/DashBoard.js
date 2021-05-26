import React, {useState, useEffect} from 'react';
import {Context} from './Context';
import Navbar from './Navbar';
import UsersTable from './UsersTable';
import ProjectsTable from './ProjectsTable';
import AddingForm from './AddingForm';
import StatusList from './StatusList.js';
import ProjectService from '../services/ProjectService';
import TaskService from '../services/TaskService';
import UserService from '../services/UserService';
import '../css/dashboard.min.css';


export default function DashBoard (props) {
	const projectService = new ProjectService();
	const taskService = new TaskService();
	const userService = new UserService();

	const [currentUser] = useState(props.currentUser);
	const [tasks, setTasks] = useState([]);
	const [project, setProject] = useState({});
	const [users, setUsers] = useState([]);
	const [taskIdToChange, setTaskIdToChange] = useState('');
	const [showUsers, setShowUsers] = useState(false);
	const [showProjects, setShowProjects] = useState(false);
	const [showStatusList, setShowStatusList] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const updateTask = async (newStatus) => {
		try {
				const data = {
				"taskId": taskIdToChange,
				"status": newStatus
			};
			const update = await taskService.taskStatusUpdate(data);
			if (update) {
				fetchTasks();
			} else {
				console.log("Error with updating tasks");
				return;
			}
		} catch (e) {
			console.log(e);
			console.log("Error with updating tasks");
		}
	}

	const showProjectsTable = async () => {
		const allProjects =  await projectService.getAllProjects();
		setProject(allProjects);
		setShowUsers(false);
		setShowProjects(true);
	}

	const showUsersTable = async () => {
		const allUsers = await userService.getAllUsers();
		setUsers(allUsers);
		setShowProjects(false)
		setShowUsers(true);
	}

	const openStatusList = async (projectId) => {
		try {
			const project = await projectService.getAllInformationAboutProject(projectId);
			const tasks = await taskService.getAllTasksByProjectId(projectId);
			setProject(project);
			setTasks(tasks);
			setUsers(project.users);
			setShowStatusList(true);
		} catch(e) {
			console.log(e);
			console.log('OpenStatuList error');
		}
	}

	async function fetchTasks () {
		try {
			const taskService = new TaskService();
			const tasks = await taskService.getAllTasksByProjectId(project.projectId);
			if (tasks) {
				setTasks(tasks);
			} else {
				return;
			}
		} catch (e) {
			console.log(e);
			console.log("Error wit fetching tasks");
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
				fetchTasks();
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
	const {logout} = props;
	return (
		<>
			<Context.Provider value={{fetchTasks}}>
				<Navbar 
					showProjectsTable={() => showProjectsTable()}
					showUsersTable={() => showUsersTable()}
					openStatusList={(projectId) => openStatusList(projectId)}
					currentUser={currentUser} logout={logout}/>
				<AddingForm
					addTask={(title, userId) => addTask(title, userId)}
					fetchTasks={() => fetchTasks()}
					closeModal={() => closeModal()}
					project={project}
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
								{(showProjects && !showUsers) ? <ProjectsTable project={project}/> : null}
								{(showUsers && !showProjects) ? <UsersTable users={users}/> : null}
								{showStatusList
								?	
								<>
									<StatusList key="1"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 1 }/>
									<StatusList key="2"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 2 }/>
									<StatusList key="3"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 3 }/>
								</>
								: null}

							</div>
						</div>
				</div>
			</Context.Provider>
		</>
	)
}