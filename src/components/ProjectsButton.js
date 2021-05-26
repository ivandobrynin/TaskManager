import React, {useState, useEffect} from 'react';
import UserService from '../services/UserService';

export default function ProjectsButton (props) {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		if (!props.currentUser) {
			return;
		}
		const fetchData = () => {
			const userService = new UserService();
			return userService.getUserProject(props.currentUser.id)
			.then(response => setProjects(response.projects));
		}
		fetchData();
	}, [props.currentUser]);

	const openStatusList = (e) => {
		const projectId = e.target.getAttribute('data-id');
		props.openStatusList(projectId);
	}
	return (
		<li className="nav-item dropdown">
		<div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
			My Projects
		</div>
		<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
			{projects.map(project => {
				return (
					<li onClick={(e) => openStatusList(e)}
							key={project.id} 
							data-id={project.id}>
						<div data-id={project.id} className="dropdown-item">{project.name}</div></li>
				)
			})}
		</ul>
	</li>
	)
}