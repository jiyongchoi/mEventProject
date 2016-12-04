import React from 'react';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';
import axios from 'axios';
import MainTopNav from './MainTopNav';

export default class MainPage extends React.Component {
	constructor() {
		super();
		this.state = { userID: "" };
		this.getLoggedInUser = this.getLoggedInUser.bind(this);
		//Gets the currently logged in User
		this.getLoggedInUser();
	}

	getLoggedInUser(){
		//Gets currently logged in user from server
		axios.get('/current_session')
		      	.then(function(response) {
		      		console.log("CURRENT SESSION USER:"+JSON.stringify(response.data));
		      		//Sets the user to the logged in user
		      		this.setState({ userID: response.data});
		      	}.bind(this))
		      	.catch(function (error) {
    				console.log(error.message);
  				}.bind(this));
	}

	render() {
		//Check if user has been loaded from the server
		let userIsLoggedIn = null;
		if(this.state.userID.localeCompare("") == 0){
			//If call to server is not yet complete.
			//Show user loading
			userIsLoggedIn = <div>Loading User</div>;
		} else {
			//If username has been set from the server
			//Load the UserInfo
			userIsLoggedIn = <UserInfo username={this.state}/>
		}
		return (
	    <div className="container-fluid">
		    	<MainTopNav />
				<div className="row">
					<div className="col-sm-4">
						{userIsLoggedIn}
					</div>
					<div className="col-sm-8" >
						<EventManager/>
					</div>
				</div>
		</div>
		);
	}
}

