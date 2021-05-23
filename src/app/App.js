import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Error from '../components/Error';
import TaskService from '../services/TaskService';
import UserService from '../services/UserService';
import ProjectService from '../services/ProjectService';
import AboutProject from '../components/AboutProject';
import DashBoard from '../components/DashBoard';
import LoginScreen from '../components/LoginScreen';
import '../css/index.css';

export default function App () {
	const userService = new UserService();
	const taskService = new TaskService();
	const projectService = new ProjectService();
	
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [tasks, setTasks] = useState([]);
	const [project, setProject] = useState([]);
	const [allProjects, setAllProjects] = useState([]);
	const [usersOnProject, setUsersOnProject] = useState([]);
	


	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("localData"));
		if (data) {
			setCurrentUser(data.currentUser);
			setTasks(data.tasks);
			setProject(data.project);
			setUsersOnProject(data.usersOnProject);
			setIsChecked(true);
			setLoginFailed(false);
		}
	}, []);

	useEffect(() => {
		const localData = {
			currentUser: currentUser,
			tasks: tasks,
			project: project,
			usersOnProject: usersOnProject
		}
		localStorage.setItem("localData", JSON.stringify(localData));
	});

	const changeLog = (e) => {
		setLogin(e.target.value);
	}
	const changePass = (e) => {
		setPassword(e.target.value);
	}

	const selectProjectId = async (index) => {
		console.log("select");
		const project = await projectService.getAllInformationAboutProject(index);
		const users = project.users;
		const tasks = await taskService.getAllTasksByProjectId(index);
		console.log("project",project);
		setProject(project);
		setTasks(tasks);
		setUsersOnProject(users);
	}
	const logout = () => {
		localStorage.removeItem('localData');
		setCurrentUser({});
		setTasks([]);
		setProject([])
		setIsChecked(false);
		setLoginFailed(false);
	}
	const authorization = async (data) => {
		try {
			const user = await userService.userLogin(data);
			const currentUser = {
				id:user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				roleId: user.roleId
			}
			const localData = {
				currentUser: currentUser
			}
			localStorage.setItem("localData", JSON.stringify(localData));
			setCurrentUser(currentUser);
			setIsChecked(true);
			setLoginFailed(false);
		} catch(e) {
			console.log(e);
			console.log("authorization")
		}
	}

	const getUserProject = async (userId) => {
		try {
			const userProject = await userService.getUserProject(userId);
			setProject(userProject.projects);
		} catch (e) {
			console.log(e);
			console.log("getUserProject");
		}
	}

	const getAllUsersOnProject = async (projectId) => {
		try {
			const project = await projectService.getAllInformationAboutProject(projectId);
			const users = project.users;
			setProject(project);
			setUsersOnProject(users);
		}catch(e) {
			console.log(e);
			console.log("getAllUsersOnProject");
		}
	}

	const getAllTasksByProjectId = async (projectId) => {
		try {
			const tasks = await taskService.getAllTasksByProjectId(projectId);
			setTasks(tasks);
		} catch (e) {
			console.log(e);
			console.log("getAllTasksByProjectId");
		}
	}

	const getAllProjects = async () => {
		try {
			const allProjects = await projectService.getAllProjects();
			setProject(allProjects);
		} catch (e) {
			console.log(e);
			console.log("getAllProjects");
		}
	}


	const sendData = async (data) => {
		try {
			const user = await userService.userLogin(data);
			const currentUser = {
				id:user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				roleId: user.roleId
			}
			const localData = {
				currentUser: currentUser,
				tasks: tasks,
				project: project,
				usersOnProject: usersOnProject
			}
			localStorage.setItem("localData", JSON.stringify(localData));
				if (user.roleId === 1) {
					const allProjects = await projectService.getAllProjects();
					setCurrentUser(currentUser);
					setProject(allProjects);
					setIsChecked(true);
					setLoginFailed(false);
				} else {
					let id = currentUser.id;
					const userProject = await userService.getUserProject(id);
					const projectId = userProject.projects[0].id;
					const project = await projectService.getAllInformationAboutProject(projectId);
					const users = project.users;
					const tasks = await taskService.getAllTasksByProjectId(projectId);
					setCurrentUser(currentUser);
					setProject(userProject.projects);
					setTasks(tasks);
					setUsersOnProject(users);
					setIsChecked(true);
					setLoginFailed(false);
			}
		} catch (e) {
			console.log(e);
			setCurrentUser(null);
			setIsChecked(false);
			setLoginFailed(true);
		}
	}

	const dashboardProps = {
		currentUser: currentUser,
		tasks: tasks,
		project: project,
		usersOnProject: usersOnProject,
		logout: () => logout(),
		selectProjectId: (projectId) => selectProjectId(projectId)
	}
	if (loginFailed === true) {
			return (
					<Error/>
			)
	}
	return (
		<div className="container">
			<Router>
			
				{isChecked === false
					? <LoginScreen 
						sendData={(data) => sendData(data)} 
						changeLog={changeLog} 
						changePass={changePass}/>
					: <div>
							<Link className="router__link" to="/">dashboard</Link>
							<Link className="router__link" to="/about/">about</Link>
						</div>}


				<Route path="/" exact>
					<DashBoard dashboardProps={dashboardProps}/>
				</Route>
				<Route path="/about/" component={AboutProject}/>
			</Router>
		</div>
	)
}

