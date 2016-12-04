import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';


export default class LoginForm extends React.Component{
	constructor(props) {
		super(props);
		//Sets blank username, and password
		this.state = {username: '', password: '', errormessage: ''};
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.handleChangePassword = this.handleChangePassword.bind(this);
    	this.submit = this.submit.bind(this);
	}

	//On change to username form, update state.username
	handleChangeUsername(event) {
	   this.setState({username: event.target.value});
	}

	//On change to password form, update state.username
	handleChangePassword(event) {
	  this.setState({password: event.target.value});
	}

	//On submit, check if user and password exists in the database
	submit(event) {
		axios.post('/userlogin', {username: this.state.username, password: this.state.password})
		      	.then(function(response) {
		      		if (typeof response.data.redirect == 'string') {
		      			//Redirects to mainpage if username and password are correct
		      			browserHistory.push(response.data.redirect);
					}
					else {
						this.refs.errormessage.innerText = "invalid input";
					}
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.errormessage.innerText = "invalid username and password";
    				console.log(error.message);
  				}.bind(this));
  		event.preventDefault();
	}

	render(){
		//Render login form 
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
