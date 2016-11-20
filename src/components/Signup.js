import React from 'react';
import axios from 'axios';


export default class LoginForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {username: '', password: ''};
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

  	submit(event){
  		// Submit form via AJAX
		axios.post('/user?username='+this.state.username+'&password='+this.state.password)
		      	.then(function (response) {
		      		console.log(response.data)}).catch(function (error) {
    				console.log(error);
  					});
  		event.preventDefault();
/*
  		console.log($('#AddAppl').serialize());
        $.ajax({
            url: '/applicants' ,
            type: 'POST',
            data: $('#AddAppl').serialize(),
            success: function(res) {
                //Print Success or Error: duplicate student number
                resultObj = JSON.parse(res);
                let result = $('#AddApplResult');
                result.text(resultObj.text);
                alert(resultObj.text);
            }
        });*/
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
						pattern="[A-Za-z]+" required value={this.state.password} onChange={this.handleChangePassword}/>
					</div>
					/*<div class="form-group">
						<label for="pwd">Confirm Password:</label>
						<input type="password" class="form-control" id="pwd">
					</div>*/
					//<button type="submit" class="btn btn-default">Submit</button>         
		            <input className="btn btn-default" id="statusButton" type="submit" value="Submit"></input>
		        </form>
			</div>

		);
	}
}