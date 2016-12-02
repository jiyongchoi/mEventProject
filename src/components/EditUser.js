import React from 'react';
import axios from 'axios';

export default class EditUser extends React.Component{
	render(){
		return(
		<div id='edituser'>
			<div className="panel-body">
				<div className="form-group">
					<label for="username">Username:</label>
					<input type="text" className="form-control" id="editUsername" name="username" placeholder="Enter the username of the user you wish to edit"
					pattern="[A-Za-z}+" required/>
				</div>

				<div className="form-group">
					<label for="pwd">Password:</label>
					<input type="password" className="form-control" id="editPwd" name="password"
					pattern="[A-Za-z]+"/>
				</div>
				
				<div className="form-group">
					<label for="fname">First Name:</label>
					<input type="text" className="form-control" id="editFname" name="fname"
					pattern="[A-Za-z]+"/>
				</div>
						
				<div className="form-group">
					<label for="surname">Last Name:</label>
					<input type="text" className="form-control" id="editSurname" name="surname"
					pattern="[A-Za-z]+"/>
				</div>

				<input className="btn btn-default" id="editButton" type="submit" value="Edit User Info"></input>
			</div>
		</div>
		);
	}
}