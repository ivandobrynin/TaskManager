// import React, {useState, useEffect} from 'react';
// import '../css/addingForm.min.css';

// export default function AssignForm (props) {
	
// 	const [projectId, setProjectId] = useState(props.projectId);
// 	const [userId, setUser] = useState(null);
	

// 	useEffect(() => {
// 		if (props.userId !== userId) {
// 			setUsers(props.userId);
// 		}
// 	}, [props.userId, userId]);

// 	const onSelectHandler = (e) => {
// 		setProjectId(e.target.value);
// 	}

// 	const assignUser = () => {
// 		props.assignUser(projectId, userId);
// 		setTitle('');
// 	}

// 	const closeModal = () => {
// 		props.closeModal();
// 		setTitle('');
// 	}

// 	return (
// 		<div className={props.modalClassName}>
// 			<form className="addingForm__modal">
// 				<div className="addingForm__title">Choose project</div>
// 				<div className="addingForm__select">
// 					<label htmlFor="select">Choose project</label>
// 					<select id="select" className="select"
// 						required
// 						onChange={(e)=> onSelectHandler(e)}>
// 							<option value={null}></option>
// 						{developers.map(developer => {
// 							return (
// 								<option key={developer.id} value={developer.id}>{developer.name}</option>
// 							)
// 						})}
// 					</select>
// 					<div className="addingForm__success">User has been assigned</div>
// 					<div className="addingForm__error">Something wrong</div>
// 				</div>
// 				<div className="addingForm__btns">
// 				<button onClick={()=> assignUser()}
// 						type="button" 
// 						className="btn btn-primary">Assign</button>
// 					<button onClick={()=> closeModal()}
// 						type="button" 
// 						className="btn btn-primary">Cancel</button>
// 				</div>
// 			</form>
// 		</div>
// 	)
// }