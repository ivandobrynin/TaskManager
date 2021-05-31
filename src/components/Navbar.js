import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../components/Context';
import '../css/navbar.min.css';

export default function Navbar(props) {
	let id;

	const {currentUser} = useContext(Context);
	const {logout} = props;
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light navbar__border">
				<div className="container-fluid">
					<div className="navbar-brand">ZM</div>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item navbar__link">
								<Link to="/">Home</Link>
							</li>
							<li className="nav-item navbar__link">
								<Link to={`/dashboard/:${id}`}>Board</Link>
							</li>
							<li className="nav-item navbar__link">
								<Link to="/projects">Projects</Link>
							</li>
							<li className="nav-item navbar__link">
								<Link to="/users">Users</Link>
							</li>
						</ul>
						<div className="navbar__right">
							<div className="navbar__right_name">{currentUser.firstName + ' ' + currentUser.lastName}</div>
							<div className="navbar__right_btn ">
								<button type="button" className="button__grey"
									onClick={logout}>Logout</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}