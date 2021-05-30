// import React, {useState} from 'react';
// import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
// import ProjectService from '../services/ProjectService';
// import TaskService from '../services/TaskService';
// import UserService from '../services/UserService';
// import DashBoard from '../components/DashBoard';
// import ProjectsTable from '../components/ProjectsTable';
// import UsersTable from './UsersTable';

// export default function MainPage (props) {
// 	const projectService = new ProjectService();
// 	const taskService = new TaskService();
// 	const userService = new UserService();

// 	const [currentUser] = useState(props.currentUser);
// 	const [project, setProject] = useState({});
// 	const [tasks, setTasks] = useState([]);
// 	const [users, setUsers] = useState([]);
// 	const [showDashBoard, setShowDashbard] = useState(false);
	
// 	const openDashBoard = async (projectId) => {
// 		try {
// 			const project = await projectService.getAllInformationAboutProject(projectId);
// 			const tasks = await taskService.getAllTasksByProjectId(projectId);
// 			setProject(project);
// 			setTasks(tasks);
// 			setUsers(project.users);
// 			setShowDashbard(true);
// 		} catch(e) {
// 			console.log(e);
// 			console.log('OpenDashBoard error');
// 		}
// 	}
//  	return (
// 	 <>
// 			<Route path="/projects">
// 				<ProjectsTable/>
// 			</Route>
// 			<Route path="/users">
// 				<UsersTable/>
// 			</Route>
// 			<Route path="/dashboard/:id">
// 				<DashBoard currentUser={currentUser}/>
// 			</Route>
// 		</>
// 	)
// }