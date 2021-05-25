import React from 'react';

export default function ProjectTable(props) {

	const {project} = props;
	return (
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
				{project.map(currentProject => {
					return (
						<tr key={currentProject.id}>
						<th scope="row">#</th>
						<td>{currentProject.id}</td>
						<td>{currentProject.name}</td>
						<td>
						<button type="button" className="btn btn-primary btn-sm">View</button>
						</td>
					</tr>
					)
				})}
			</tbody>
		</table>
	)
}