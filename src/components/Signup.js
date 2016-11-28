import React from 'react';
import axios from 'axios';


export default class LoginForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {username: '', password: '', fname: '', surname: ''};
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.handleChangePassword = this.handleChangePassword.bind(this);
    	this.handleChangeFname = this.handleChangeFname.bind(this);
    	this.handleChangeSurname = this.handleChangeSurname.bind(this);
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

  	submit(event){
  		// Submit form via AJAX
		axios.post('/user', {username: this.state.username, password: this.state.password, fname: this.state.fname, surname: this.state.surname})
		      	.then(function (response) {
		      		if (typeof response.data.redirect == 'string') {
						window.location = response.data.redirect;
					}
				}).catch(function (error) {
    				console.log(error.message);
  				});
  		event.preventDefault();
  	}

	render(){
		return (
		<div id="signup" >
			<div className="panel panel-default">
				<div className="panel-heading">Sign Up</div>
				<div className="panel-body">
					<form id="signupform" method="get" onSubmit={this.submit}>
						<div className="form-group">
							<label for="username">Username:</label>
							<input type="text" className="form-control" id="usernamesignup" name="username" placeholder="username"
							pattern="[A-Za-z]+" required  onChange={this.handleChangeUsername}/>
						</div>
						
						<div className="form-group">
							<label for="pwd">Password:</label>
							<input type="password" className="form-control" id="passwordsignup" name="password"
							pattern="[A-Za-z]+" required  onChange={this.handleChangePassword}/>
						</div>

						<div className="form-group">
							<label for="fname">First Name:</label>
							<input type="text" className="form-control" id="fnamesignup" name="fname"
							pattern="[A-Za-z]+" required onChange={this.handleChangeFname}/>
						</div>

						<div className="form-group">
							<label for="surname">Last Name:</label>
							<input type="text" className="form-control" id="surnamesignup" name="surname"
							pattern="[A-Za-z]+" required onChange={this.handleChangeSurname}/>
						</div>

						<input className="btn btn-default" id="statusButton" type="submit" value="Sign Up"></input>
					</form>
				</div>
			</div>
		</div>
		);
	}
}
