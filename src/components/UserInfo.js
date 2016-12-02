import React from 'react';
import axios from 'axios';

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
		      		console.log("GET USERINFO:"+JSON.stringify(response.data));
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
				<div className="panel-heading">User</div>
				<div className="panel-body">
					<div>Welcome {this.state.user.firstname} {this.state.user.surname}! </div>
					<div>Username: {this.state.user.username}</div>
					<div>Rating: {this.state.user.rating}</div>
					<div>List of Events Go Here</div>
				</div>
			</div>
		);
	}

}
