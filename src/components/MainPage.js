import React from 'react';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';
import Actions from './Actions';
import axios from 'axios';
import MainTopNav from './MainTopNav';

export default class MainPage extends React.Component {
// componentdidmount (ajax call to get all events)
	constructor() {
		super();
		this.state = { userID: "" };
		this.getLoggedInUser = this.getLoggedInUser.bind(this);
		this.getLoggedInUser();
	}

	getLoggedInUser(){
		axios.get('/current_session')
		      	.then(function(response) {
		      		console.log("CURRENT SESSION USER:"+JSON.stringify(response.data));
		      		//Sets the user info to the logged in user
		      		this.setState({ userID: response.data});
		      		//this.getUserInfo(response.data);
		      	}.bind(this))
		      	.catch(function (error) {
    				console.log(error.message);
  				}.bind(this));
	}

	render() {
		//Gets URL paramater as username to load userinfo 
		let userIsLoggedIn = null;
		if(this.state.userID.localeCompare("") == 0){
			userIsLoggedIn = <div>Loading User</div>;
		} else {
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

