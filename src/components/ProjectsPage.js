import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../components/Context';
import ProjectService from '../services/ProjectService';
import UserService from '../services/UserService';
import '../css/projectsPage.min.css';

export default function ProjectTable() {
	const {currentUser} = useContext(Context);
	const userService = new UserService();
	const projectService = new ProjectService();
	const [allProjects, setAllProjects] = useState([]);

	useEffect(() => {
		if (currentUser) {
			if (currentUser.roleId === 1) {
				async function fn () {
					const projects = await projectService.getAllProjects();
					setAllProjects(projects);
				}
				fn();
			} else {
				async function fn () {
					const projects = await userService.getUserProject(currentUser.id);
					setAllProjects(projects.projects);
				}
				fn();
			}
		}
	}, []);


	return (
		<div className="projectsPage">
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">Id</th>
						<th scope="col">Name</th>
						<th scope="col">Show Tasks</th>
					</tr>
				</thead>
				<tbody>
					{allProjects.map(currentProject => {
						return (
							<tr key={currentProject.id}>
							<th scope="row">#</th>
							<td>{currentProject.id}</td>
							<td>{currentProject.name}</td>
							<td>
								<div className="projectsPage__link">
									<Link to={`/dashboard/:${currentProject.id}`}>View</Link>
								</div>
							</td>
						</tr>
						)
					})}
				</tbody>
			</table>
		</div>

	)
}