import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ProjectService from '../services/ProjectService';
import '../css/projectsTable.min.css';

export default function ProjectTable() {
	const projectService = new ProjectService();
	const [allProjects, setAllProjects] = useState([])

	useEffect(async () => {
		const projects = await projectService.getAllProjects();
		setAllProjects(projects);
	}, []);


	return (
		<div className="projectsTable">
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
								<div className="link">
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