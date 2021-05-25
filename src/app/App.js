import React, {useState, useEffect} from 'react';
import Error from '../components/Error';
import UserService from '../services/UserService';
import LoginScreen from '../components/LoginScreen';
import Interface from '../components/interface';
import '../css/index.css';

export default function App () {
	const userService = new UserService();
	
	const [isChecked, setIsChecked] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("localData"));
		if (data) {
			setCurrentUser(data.currentUser);
			setIsChecked(true);
			setLoginFailed(false);
		}
	}, []);

	useEffect(() => {
		const localData = {
			currentUser: currentUser,
		}
		localStorage.setItem("localData", JSON.stringify(localData));
	});

	const logout = () => {
		localStorage.removeItem('localData');
		setCurrentUser({});
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

	if (loginFailed === true) {
			return (
					<Error/>
			)
	}
	return (
			<>
				{isChecked === true
					? <Interface currentUser={currentUser} logout={() => logout()}/> 
					: <LoginScreen authorization={(data) => authorization(data)}/>}
			</>
	)
}

