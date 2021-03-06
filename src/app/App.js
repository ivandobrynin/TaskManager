import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Context} from '../components/Context';
import UserService from '../services/UserService';
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

	const [currentUser, setCurrentUser] = useState(null);
	const [userAuthenticated , setUserAuthenticated ] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("currentUser"));
		if (user) {
			setCurrentUser(user);
			setUserAuthenticated(true);
			setLoginFailed(false);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("currentUser", JSON.stringify(currentUser));
	});

	const logout = () => {
		localStorage.removeItem("currentUser");
		setCurrentUser(null);
		setUserAuthenticated(false);
		setLoginFailed(false);
	}
	
	const authorization = async (data) => {
		try {
			const user = await userService.userLogin(data);
			if (!user) {
				setUserAuthenticated(false);
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
			setUserAuthenticated(true);
			setLoginFailed(false);
		} catch(e) {
			console.log(e);
			localStorage.removeItem("localData");
			setUserAuthenticated(false);
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
						{userAuthenticated
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

