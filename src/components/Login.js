// src/components/Login.js

import React from 'react';
import axios from 'axios';


export default class LoginForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {username: '', password: '', errormessage: ''};
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.handleChangePassword = this.handleChangePassword.bind(this);
    	this.submit = this.submit.bind(this);
	}

	handleChangeUsername(event) {
	   this.setState({username: event.target.value});
	}

	handleChangePassword(event) {
	  this.setState({password: event.target.value});
	}



	submit(event) {
		axios.post('/userlogin', {username: this.state.username, password: this.state.password})
		      	.then(function(response) {
		      		if (typeof response.data.redirect == 'string') {
						window.location = response.data.redirect;
					}
		      	})
		      	.catch(function (error) {
    				console.log(error.message);
  				});
  		this.refs.errormessage.innerText = "bad input";
  		event.preventDefault();
	}



	render(){
		return (
		<div className="panel panel-primary">
			<div className="panel-heading">Login</div>
			<div className="panel-body">
				<form id="userloginform" method="get" onSubmit={this.submit}>
					<div className="form-group">
						<label for="username">Username:</label>
						<input type="text" className="form-control" id="usernamelogin" name="username" placeholder="username"
						pattern="[A-Za-z]+" required  onChange={this.handleChangeUsername}/>
					</div>
					<div className="form-group">
						<label for="pwd">Password:</label>
						<input type="password" className="form-control" id="passwordsignup" name="password"
						pattern="[A-Za-z]+" required  onChange={this.handleChangePassword}/>
					</div>         
					<input className="btn btn-default" id="statusButton" type="submit" value="Sign Up"></input>
				</form>
		        <div id="errormessage" ref="errormessage"></div>
			</div>
		</div>
		);
	}
}
