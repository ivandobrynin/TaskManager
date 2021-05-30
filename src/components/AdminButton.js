import React from 'react';
import {Link} from 'react-router-dom';

export default function AdminButton () {

	return (
		<li className="nav-item dropdown">
			<div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Administration
			</div>
			<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
				<li>
					<div className="dropdown-item">
						<Link to="/projects">Projects</Link>
					</div>
				</li>
				<li>
					<div className="dropdown-item">
						<Link to="/users">Users</Link>
					</div>
				</li>
				<li>
					<div className="dropdown-item">
						<Link to="/dashboard">Dashboard</Link>
					</div>
				</li>
			</ul>
		</li>
	)
}