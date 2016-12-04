// src/components/Login.js

import React from 'react';
import axios from 'axios';

import {browserHistory} from 'react-router';

/*
* Express the form to authenticate and log in a client
*/
export default class LoginForm extends React.Component{
	// the constructor for the loginform class
	constructor(props) {
		super(props);
		this.state = {username: '', password: '', errormessage: ''};
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.handleChangePassword = this.handleChangePassword.bind(this);
    	this.submit = this.submit.bind(this);
	}

	// Set state.username as the client types and changes the username text
	handleChangeUsername(event) {
	   this.setState({username: event.target.value});
	}

	// Set state.password as the client types and changes the password text
	handleChangePassword(event) {
	  this.setState({password: event.target.value});
	}

	/*
	* Submit the form with the username and password. 
	* If a redirect string is returned, it means authentication was sucessful
	* and the page will redirect to the path specified by the string
	* Else, print a statement on the DOM that says "bad input"
	*/
	submit(event) {
		axios.post('/userlogin', {username: this.state.username, password: this.state.password})
		      	.then(function(response) {
		      		if (typeof response.data.redirect == 'string') {

		      			//alert(response.data.redirect);
		      			browserHistory.push(response.data.redirect);
						//window.location = response.data.redirect;
					}
					else {
						this.refs.errormessage.innerText = "bad input";
					}
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.errormessage.innerText = "bad input";
    				console.log(error.message);
  				}.bind(this));
  		event.preventDefault();
	}

	/*
	* Express the DOM with login form
	*/
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
					<input className="btn btn-default" id="statusButton" type="submit" value="Login"></input>
				</form>
		        <div id="errormessage" ref="errormessage"></div>
			</div>
		</div>
		);
	}
}
