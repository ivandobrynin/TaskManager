import React from 'react';
import '../css/confirm.min.css';

export default function Confirm (props) {

	const deleteTask = (e) => {
		props.deleteTask(e);
	};

	const closeConfirm = () => {
		props.closeConfirm();
	}

	const {taskId} = props;
	return (
		<div className={props.confirmClassName}>
				<div className="confirm__modal">
					<div className="confirm__title">
						Delete task?
					</div>
					<div className="confirm__btns">
						<button data-id={taskId} onClick={(e) => deleteTask(e)}
							type="button" 
							className="confirm__btn">Delete</button>
						<button onClick={()=> closeConfirm()}
							type="button" 
							className="confirm__btn">Cancel</button>
					</div>
				</div>
		</div>
	)
}