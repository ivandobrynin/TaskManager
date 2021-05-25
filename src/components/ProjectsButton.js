import React, {useState, useEffect} from 'react';
import UserService from '../services/UserService';

export default function ProjectsButton (props) {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		async function fn () {
			const userService = new UserService();
			const userProjects = await userService.getUserProject(props.currentUser.id);
			if (userProjects) {
				setProjects(userProjects.projects);
			}
		}
		fn();
	}, [props.currentUser.id]);
	//infinite loop
	const openDashboard = (e) => {
		const projectId = e.target.getAttribute('data-id');
		props.openDashboard(projectId);
	}
	return (
		<li className="nav-item dropdown">
		<div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
			My Projects
		</div>
		<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
			{projects.map(project => {
				return (
					<li onClick={(e) => openDashboard(e)}
							key={project.id} 
							data-id={project.id}>
						<div data-id={project.id} className="dropdown-item">{project.name}</div></li>
				)
			})}
		</ul>
	</li>
	)
}