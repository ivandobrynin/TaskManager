import React from 'react';

export default function ProjectTable(props) {

	const openStatusList = (e) => {
		const projectId = e.target.getAttribute('data-id');
		props.openStatusList(projectId);
	}

	const {allProjects} = props;
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
				{allProjects.map(currentProject => {
					return (
						<tr key={currentProject.id}>
						<th scope="row">#</th>
						<td>{currentProject.id}</td>
						<td>{currentProject.name}</td>
						<td>
						<button
							data-id={currentProject.id}
							onClick={(e) => openStatusList(e)}
							type="button" className="btn btn-primary btn-sm">View</button>
						</td>
					</tr>
					)
				})}
			</tbody>
		</table>
	)
}