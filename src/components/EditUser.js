import React from 'react';
import axios from 'axios';

export default class EditUser extends React.Component{
	constructor(props) {
		super(props);
		this.state = {username: '', password: '', fname: '', 
					  surname: '', accountType: '', message: ''};
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.handleChangePassword = this.handleChangePassword.bind(this);
    	this.handleChangeFname = this.handleChangeFname.bind(this);
    	this.handleChangeSurname = this.handleChangeSurname.bind(this);
    	this.handleChangeAccountType = this.handleChangeAccountType.bind(this);
    	this.submit = this.submit.bind(this);
	}

	handleChangeUsername(event) {
	   this.setState({username: event.target.value});
	}

	handleChangePassword(event) {
	  this.setState({password: event.target.value});
	}

	handleChangeFname(event) {
	  this.setState({fname: event.target.value});
	}

	handleChangeSurname(event) {
	  this.setState({surname: event.target.value});
	}

	handleChangeAccountType(event) {
	  this.setState({accountType: event.target.value});
	}


	submit(event) {
		axios.post('/adminEditUser', {username: this.state.username, 
									  password: this.state.password,
									  fname: this.state.fname, 
									  surname: this.state.surname,
									  accountType: this.state.accountType})
		      	.then(function(response) {
		      		console.log(response.data);
		      		this.refs.message.innerText = 'Username = ' + response.data.username + 
		      			'  Password = ' + response.data.password + 
		      			'  First Name = ' + response.data.firstname +
		      			'  Surname = ' + response.data.surname +
		      			'  Account Type = ' + response.data.accounttype;
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.message.innerText = "bad input";
    				console.log(error.message);
  				}.bind(this));
  		event.preventDefault();
	}

	render(){
		return(
		<div id='edituser'>
			<div className="panel-body">
			<form id="userloginform" method="post" onSubmit={this.submit}>
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
		</div>
		);
	}
}