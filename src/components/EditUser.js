import React from 'react';
import axios from 'axios';

export default class EditUser extends React.Component{
	constructor(props) {
		super(props);
		//Set blank user info
		this.state = {username: '', password: '', fname: '', 
					  surname: '', accountType: '', message: ''};
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.handleChangePassword = this.handleChangePassword.bind(this);
    	this.handleChangeFname = this.handleChangeFname.bind(this);
    	this.handleChangeSurname = this.handleChangeSurname.bind(this);
    	this.handleChangeAccountType = this.handleChangeAccountType.bind(this);
    	this.editUser = this.editUser.bind(this);
    	this.submit = this.submit.bind(this);
	}

	//Update state.username to form value
	handleChangeUsername(event) {
	   this.setState({username: event.target.value});
	}

	//Update state.password to form value
	handleChangePassword(event) {
	  this.setState({password: event.target.value});
	}

	//Update state.fname to form value
	handleChangeFname(event) {
	  this.setState({fname: event.target.value});
	}

	//Update state.surname to form value
	handleChangeSurname(event) {
	  this.setState({surname: event.target.value});
	}

	//Update state.accountType to form value
	handleChangeAccountType(event) {
	  this.setState({accountType: event.target.value});
	}

	//Show modal pop up
	submit(event) {
		$('#editUserModal').modal('show');
  		event.preventDefault();
	}

	editUser(){
		axios.post('/adminEditUser', {username: this.state.username, 
									  password: this.state.password,
									  fname: this.state.fname, 
									  surname: this.state.surname,
									  accountType: this.state.accountType})
		      	.then(function(response) {
		      		console.log(response.data);
		      		if (response.data.username == undefined) {
		      			//if username is not in database
		      			alert("Username not found");
		      		} else {
		      			this.refs.message.innerText = 'Username = ' + response.data.username + 
			      			'  Password = ' + response.data.password + 
			      			'  First Name = ' + response.data.firstname +
			      			'  Surname = ' + response.data.surname +
			      			'  Account Type = ' + response.data.accounttype;
		      		}		      		
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.message.innerText = "bad input";
    				console.log(error.message);
  				}.bind(this));
	}

	render(){
		return(
		<div id='edituser'>
			<div className="panel-body">
			<form id="usereditform" method="post" onSubmit={this.submit}>
				<div className="form-group">
					<label for="username">Username:</label>
					<input type="text" className="form-control" id="editUsername" name="username" placeholder="Enter the username of the user you wish to edit"
					pattern="[A-Za-z]+" required onChange={this.handleChangeUsername}/>
				</div>

				<div className="form-group">
					<label for="pwd">Password:</label>
					<input type="password" className="form-control" id="editPwd" name="password"
					pattern="[A-Za-z]+" onChange={this.handleChangePassword}/>
				</div>
				
				<div className="form-group">
					<label for="fname">First Name:</label>
					<input type="text" className="form-control" id="editFname" name="fname"
					pattern="[A-Za-z]+" onChange={this.handleChangeFname}/>
				</div>
						
				<div className="form-group">
					<label for="surname">Last Name:</label>
					<input type="text" className="form-control" id="editSurname" name="surname"
					pattern="[A-Za-z]+" onChange={this.handleChangeSurname}/>
				</div>

				<div className="form-group">
					<label for="accountType">Account Type:</label>
					<input type="text" className="form-control" id="editAccountType" name="accountType"
					pattern="[A-Za-z]+" onChange={this.handleChangeAccountType}/>
				</div>

				<input className="btn btn-default" id="editButton" type="submit" value="Edit User Info"></input>
			</form>
			<div id="message" ref="message"></div>
			</div>
			<div className = "modal fade" id = "editUserModal" tabindex = "-1" role = "dialog" 
			   aria-labelledby = "myModalLabel" aria-hidden = "true">					
			  	<div className = "modal-dialog">
			    	<div className = "modal-content">						         
						<div className = "modal-header">
							<button type = "button" className = "close" data-dismiss = "modal" aria-hidden = "true">
							      &times;
							</button>
							<h4 className = "modal-title" id = "myModalLabel">
							   Confirm Edit User
							</h4>
						</div>
						<div className = "modal-body">
							<p>Username: {this.state.username}</p>
							<p>Password: {this.state.password}</p>
							<p>First Name: {this.state.fname}</p>
							<p>Surname: {this.state.surname}</p>
							<p>AccountType: {this.state.accountType}</p>
							<p>Message: {this.state.message}</p>
						</div>
						<div className = "modal-footer">
							<button type = "button" className = "btn btn-default" data-dismiss = "modal">
							   Cancel
							</button>
							<button type = "button" className = "btn btn-primary" data-dismiss = "modal" onClick={this.editUser}>
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