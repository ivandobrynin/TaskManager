import React, {useState, useEffect} from 'react';
import UserService from '../services/UserService';
import AssignForm from '../components/AssignForm';
export default function UsersTable() {
	
	const userService = new UserService();

	const [allUsers, setAllUsers] = useState([]);

	useEffect(async () => {
		const users = await userService.getAllUsers();
		setAllUsers(users);
	}, []);

	// const openAssignModal = () => {
	// 	setShowAssignModal(true);
	// }

	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">Id</th>
					<th scope="col">First Name</th>
					<th scope="col">LastName</th>
					<th scope="col">Role Id</th>
					<th scope="col">Show Tasks</th>
				</tr>
			</thead>
			<tbody>
				{allUsers.map(user => {
					return (
						<tr key={user.id}>
							<th scope="row">#</th>
							<td>{user.id}</td>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td>{user.roleId}</td>
							<td>
							<button
								// onClick={() => openAssignModal()}
								type="button" 
								className="btn btn-primary btn-sm">View</button>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}