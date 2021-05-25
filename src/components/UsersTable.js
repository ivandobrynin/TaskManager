import React from 'react';

export default function UsersTable(props) {

	const {users} = props;

	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">Id</th>
					<th scope="col">First Name</th>
					<th scope="col">LastName</th>
					<th scope="col">Show Tasks</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => {
					return (
						<tr key={user.id}>
							<th scope="row">#</th>
							<td>{user.id}</td>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
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