import React, {useState} from 'react';
import ProjectService from '../services/ProjectService';
import UserService from '../services/UserService';
import Navbar from './Navbar';
import ProjectsTable from './ProjectsTable';
import UsersTable from './UsersTable';
import TaskService from '../services/TaskService';
import DashBoard from './DashBoard';
import '../css/interface.min.css';


export default function Interface (props) {

	const [project, setProject] = useState([]);
	const [users, setUsers] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [showUsers, setShowUsers] = useState(false);
	const [showProjects, setShowProjects] = useState(false);
	const [showDashboard, setShowDashboard] = useState(false);
	const projectService = new ProjectService();
	const userService = new UserService();
	const taskService = new TaskService();
	
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

	const openDashboard = async (projectId) => {
		const project = await projectService.getAllInformationAboutProject(projectId);
		const tasks = await taskService.getAllTasksByProjectId(projectId);
		setProject(project);
		setUsers(project.users);
		setTasks(tasks);
		setShowDashboard(true);
	}

	const {currentUser, logout} = props;
	return (
		<>
			<Navbar 
				showProjectsTable={() => showProjectsTable()}
				showUsersTable={() => showUsersTable()}
				openDashboard={(projectId) => openDashboard(projectId)}
				currentUser={currentUser} logout={logout}/>
			{(showProjects && !showUsers) ? <ProjectsTable project={project}/> : null}
			{(showUsers && !showProjects) ? <UsersTable users={users}/> : null}
			{(showDashboard && !showUsers && !showProjects)
				?
				<DashBoard
					project={project}
					users={users}
					tasks={tasks}
					currentUser={currentUser}
					openDashboard={(projectId) => openDashboard(projectId)}/>
				: null}
		</>
	)
}