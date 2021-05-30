import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Context} from '../components/Context';
import ProjectService from '../services/ProjectService';
import UserService from '../services/UserService';
import TaskService from '../services/TaskService';
import LoginScreen from '../components/LoginScreen';
import HomePage from '../components/HomePage';
import ProjectsPage from '../components/ProjectsPage';
import UsersPage from '../components/UsersPage';
import DashBoard from '../components/DashBoard';
import Navbar from '../components/Navbar';
import Error from '../components/Error';
import '../css/index.css';

export default function App () {
	const userService = new UserService();
	const projectService = new ProjectService();
	const taskService = new TaskService();

	const [currentUser, setCurrentUser] = useState(null);
	const [isChecked, setIsChecked] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("currentUser"));
		if (user) {
			setCurrentUser(user);
			setIsChecked(true);
			setLoginFailed(false);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("currentUser", JSON.stringify(currentUser));
	});

	const logout = () => {
		localStorage.removeItem("currentUser");
		setCurrentUser(null);
		setIsChecked(false);
		setLoginFailed(false);
	}
	
	const authorization = async (data) => {
		try {
			const user = await userService.userLogin(data);
			if (!user) {
				setIsChecked(false);
				setLoginFailed(true);
				return;
			}
			const userData = {
				id:user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				roleId: user.roleId
			}
			localStorage.setItem("currentUser", JSON.stringify(userData));
			setCurrentUser(userData);
			setIsChecked(true);
			setLoginFailed(false);
		} catch(e) {
			console.log(e);
			localStorage.removeItem("localData");
			setIsChecked(false);
			setLoginFailed(true);
		}
	}

	if (loginFailed === true) {
			return (
					<Error/>
			)
	}
	return (
			<>
				<Context.Provider value={{currentUser}}>
					<Router>
						{isChecked === true
						? <>
							<Navbar
								currentUser={currentUser} logout={logout}/>
							<HomePage
								exact
								path="/"
								currentUser={currentUser}/>
							</>
						: <LoginScreen authorization={(data) => authorization(data)}/>}

						<Route path="/projects">
							<ProjectsPage/>
						</Route>
						<Route path="/users">
							<UsersPage/>
						</Route>
						<Route path="/dashboard/:id">
							<DashBoard currentUser={currentUser}/>
						</Route>
					</Router>
				</Context.Provider>
			</>
	)
}

