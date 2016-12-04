import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';


export default class UserInfo extends React.Component{
	constructor(props) {
		super(props);
		//Set blank user
		this.state = {
			user: { username : "", 
					rating:"", 
					firstname:"", 
					surname:""}
		};
		this.getUserInfo = this.getUserInfo.bind(this);
		//Call function to get user for given username
		this.getUserInfo(props.username.userID);
	}

	//Makes Call to the server to get the users information
	getUserInfo(id){
		axios.post('/getuserinfo', {username: id})
		      	.then(function(response) {
		      		//Sets user to the info gotten from the server
		      		this.setState({user: response.data});
		      	}.bind(this))
		      	.catch(function (error) {
    				console.log(error.message);
  				}.bind(this));
	}

	//Loads page based on User Information from the server
	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
				<Link to={`/userpage/${this.state.user.username}`}>User {this.state.user.username}</Link>
				</div>
				<div className="panel-body">
					<div>{this.state.user.firstname} {this.state.user.surname}! </div>
					<div>Username: {this.state.user.username}</div>
				</div>
			</div>
		);
	}

}
