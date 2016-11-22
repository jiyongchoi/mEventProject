import React from 'react';
import axios from 'axios';


export default class LoginForm extends React.Component{
  	constructor(props) {
  		super(props);
  		this.state = {username: '', password: '', fname: '', surname: ''};
      	this.handleChangeUsername = this.handleChangeUsername.bind(this);
      	this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeFName = this.handleChangeFName.bind(this);
        this.handleChangeSurName = this.handleChangeSurName.bind(this);
      	this.submit = this.submit.bind(this);
  	}

  	handleChangeUsername(event) {
      	this.setState({username: event.target.value});
   	}

  	handleChangePassword(event) {
  		  this.setState({password: event.target.value});
  	}

    handleChangeFName(event) {
        this.setState({fname: event.target.value});
    }

    handleChangeSurName(event) {
        this.setState({surname: event.target.value});
    }

  	submit(event){
  		// Submit form via AJAX
		  axios.post('/usersignup', 
        {"username": this.state.username, "password": this.state.password,
          "fname": this.state.fname, "surname": this.state.surname
          })
		      	.then(function (response) {
		      		if (typeof response.data.redirect == 'string') {
                window.location = response.data.redirect;
              }
            }).catch(function (error) {
    				    console.log(error);
  					});
  		event.preventDefault();
  	}

	render(){
		return (
			<div class="signup" >
				<h3>Sign Up</h3>
        		<form id="signupform" method="get" onSubmit={this.submit}>
		            <div class="form-group">
    					     <label for="username">Username:</label>
						        <input type="text" className="form-control" id="usernamesignup" name="username"
						          pattern="[A-Za-z]+" required value={this.state.username} onChange={this.handleChangeUsername}/>
					       </div>
					       <div class="form-group">
      						<label for="pwd">Password:</label>
      						  <input type="password" className="form-control" id="passwordsignup" name="password"
      						    pattern="[A-Za-z0-9]+" required value={this.state.password} onChange={this.handleChangePassword}/>
					       </div>    
                 <div class="form-group">
                    <label for="firstname">First Name:</label>
                      <input type="text" className="form-control" id="firstnamesignup" name="firstname"
                      pattern="[A-Za-z]+" required value={this.state.fname} onChange={this.handleChangeFName}/>
                 </div>
                 <div class="form-group">
                    <label for="surname">Surname:</label>
                      <input type="text" className="form-control" id="surnamesignup" name="surname"
                      pattern="[A-Za-z]+" required value={this.state.surname} onChange={this.handleChangeSurName}/>
                 </div>
		            <input className="btn btn-default" id="statusButton" type="submit" value="Submit"></input>
		        </form>
			</div>
		);
	}
}