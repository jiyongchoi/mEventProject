import React from 'react';
import axios from 'axios';

export default class DeleteUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: '',  message: ''};
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.deleteUser = this.deleteUser.bind(this);
    	this.submit = this.submit.bind(this);
	}

	handleChangeUsername(event) {
	   this.setState({username: event.target.value});
	}
	
	submit(event) {
		$('#deleteUserModal').modal('show');
		console.log(this.state.username);		
  		event.preventDefault();
	}

	deleteUser() {
		axios.delete('/user?username=' + this.state.username, {username: this.state.username})
		      	.then(function(response) {
		      		this.refs.message.innerText = 'User ' + this.state.username + ' deleted.';
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.message.innerText = "bad input";
    				console.log(error.message);
  				}.bind(this));
	}

	render(){
		return(
		<div id="deleteuser">
			<div className="form-group">
				<div className="panel-body">
				<form id="userdeleteform" method="post" onSubmit={this.submit}>
					<label for="username">Username:</label>
					<input type="text" className="form-control" id="deleteUsername" name="username" placeholder="Enter the username of the user you wish to delete"
					pattern="[A-Za-z]+" required onChange={this.handleChangeUsername}/>
					<input className="btn btn-default" id="deleteButton" type="submit" value="Delete User"></input>
				</form>
				<div id="message" ref="message"></div>
				</div>
			</div>
			<div className = "modal fade" id = "deleteUserModal" tabindex = "-1" role = "dialog" 
			   aria-labelledby = "myModalLabel" aria-hidden = "true">					
			  	<div className = "modal-dialog">
			    	<div className = "modal-content">						         
						<div className = "modal-header">
							<button type = "button" className = "close" data-dismiss = "modal" aria-hidden = "true">
							      &times;
							</button>
							<h4 className = "modal-title" id = "myModalLabel">
							   Confirm Delete User
							</h4>
						</div>
						<div className = "modal-body">
							<p>Username: {this.state.username}</p>
						</div>
						<div className = "modal-footer">
							<button type = "button" className = "btn btn-default" data-dismiss = "modal">
							   Cancel
							</button>
							<button type = "button" className = "btn btn-primary" data-dismiss = "modal" onClick={this.deleteUser}>
							   Confirm
							</button>
						</div>
			      	</div>
			   	</div>
			</div>
		</div>
		);
	}
}