import React from 'react';
import axios from 'axios';

export default class DeleteUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: '',  message: ''};
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.submit = this.submit.bind(this);
	}

	handleChangeUsername(event) {
	   this.setState({username: event.target.value});
	}
	
	submit(event) {
		console.log(this.state.username);
		axios.delete('/user?username=' + this.state.username, {username: this.state.username})
		      	.then(function(response) {
		      		this.refs.message.innerText = 'User ' + this.state.username + ' deleted.';
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.message.innerText = "bad input";
    				console.log(error.message);
  				}.bind(this));
  		event.preventDefault();
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
		</div>
		);
	}
}