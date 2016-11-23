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
			<div class="login" >
				<h3>LOGGING IN!!!!!!!!!!!!!!!!!!!!</h3>
        		<form id="userloginform" method="get" onSubmit={this.submit}>
		            <label>
		                <span>Username: </span>
		                <input type="text" id="usernamelogin" name="username" placeholder="e.g. jayfan1000" 
		                pattern="[A-Za-z0-9]+" required value={this.state.username} onChange={this.handleChangeUsername}></input>
		            </label> <br></br>
		            <label>
		                <span>Password: </span>
		                <input type="text" id="passwordlogin" name="password" placeholder="e.g. bluejayfan1000" 
		                pattern="[A-Za-z0-9]+" required value={this.state.password} onChange={this.handleChangePassword}></input>
		            </label> <br></br>            
		            <input class="submitbutton" id="statusButton" type="submit" value="Submit"></input>
		        </form>
		        <div id="errormessage" ref="errormessage"></div>
			</div>
		);
	}
}
