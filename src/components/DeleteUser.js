import React from 'react';
import axios from 'axios';

var alertText = "Are you sure you want to delete this user?"

export default class DeleteUser extends React.Component{
	

	render(){

		return(
		<div id="deleteuser">
			<div className="form-group">
				<div className="panel-body">
					<label for="username">Username:</label>
					<input type="text" className="form-control" id="editUsername" name="username" placeholder="Enter the username of the user you wish to delete"
					pattern="[A-Za-z}+" required/>
					<input className="btn btn-default" id="deleteButton" type="submit" value="Delete User"></input>
				</div>
			</div>
		</div>
		);
	}
}