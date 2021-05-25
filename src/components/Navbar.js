import React, {useState} from 'react';
import AdminButton from '../components/AdminButton';
import ProjectsButton from '../components/ProjectsButton';

export default function Navbar(props) {

	const [currentUser] = useState(props.currentUser);
	
	const {showProjectsTable, showUsersTable, openDashboard, logout} = props;
	
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<div className="navbar-brand">ZM</div>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">Home</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Link</a>
							</li>
							{currentUser.roleId === 1
							? 
								<AdminButton 
									showProjectsTable={showProjectsTable}
									showUsersTable={showUsersTable}/>
							: 
								<ProjectsButton 
									currentUser={currentUser}
									openDashboard={openDashboard}/>}
						</ul>
						<button type="button" className="btn btn-secondary"
						onClick={logout}>Logout</button>
					</div>
				</div>
			</nav>
		</>
	)
}