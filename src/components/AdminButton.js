import React from 'react';

export default function AdminButton (props) {

	const {showProjectsTable, showUsersTable} = props;
	return (
		<li className="nav-item dropdown">
			<div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Administration
			</div>
			<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
				<li  onClick={showProjectsTable}>
					<div className="dropdown-item">Projects</div>
				</li>
				<li  onClick={showUsersTable}>
					<div className="dropdown-item">Users</div>
				</li>
			</ul>
		</li>
	)
}