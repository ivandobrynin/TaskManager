import React, {useState} from 'react';
import '../css/loginScreen.min.css';

export default function LoginScreen (props) {

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const changeLog = (e) => {
		setLogin(e.target.value);
	}
	const changePass = (e) => {
		setPassword(e.target.value);
	}
	const authorization = () => {
		let data = {
			login: login,
			password: password
		};
		props.authorization(data);
	}

	const onHandleKeyPress = (event) => {
		if (event.key === 'Enter') {
			authorization();
		}
	}
		
		return (
			<div className="login">
				<div className="login__content">
					<h1 className="login__title">zm</h1>
					<div className="login__wrapper" onKeyPress={onHandleKeyPress}>
						<input 
							onChange={changeLog}
							className="login__input" 
							placeholder="Login"></input>
						<input 
							onChange={changePass}
							className="login__input" 
							placeholder="Password"></input>
						<div className="login__btns">
							<button
								type="button" 
								className="btn btn-outline-secondary">Sign up</button>
							<button 
								onClick={() => authorization()}
								type="button" 
								className="btn btn-secondary">Sign in</button>
						</div>
					</div>
				</div>
			</div>
		)
};