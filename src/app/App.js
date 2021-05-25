import React, {useState, useEffect} from 'react';
import Error from '../components/Error';
import UserService from '../services/UserService';
import LoginScreen from '../components/LoginScreen';
import WorkSpace from '../components/WorkSpace';
import '../css/index.css';

export default function App () {
	const userService = new UserService();
	
	const [isChecked, setIsChecked] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

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
			setCurrentUser(user);
			setIsChecked(true);
			setLoginFailed(false);
		} catch(e) {
			console.log(e);
			localStorage.removeItem("localData");
			setIsChecked(false);
			setLoginFailed(true);
		}
	}
	console.log(isChecked);
	console.log(loginFailed);
	if (loginFailed === true) {
			return (
					<Error/>
			)
	}
	return (
			<>
				{isChecked === true
					? <WorkSpace currentUser={currentUser} logout={() => logout()}/> 
					: <LoginScreen authorization={(data) => authorization(data)}/>}
			</>
	)
}

