import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import {browserHistory} from 'react-router';


export default class TopNav extends React.Component{
	constructor(props) {
		super(props);
		//Set blank user
		this.state = {
					user: { username : "", 
					firstname:"", 
					surname:"",
					accounttype: ""}
		};
		this.lgout = this.lgout.bind(this);
		//gets currently logged in user
		this.loggedInUser = this.loggedInUser.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);	
		this.loggedInUser();
	}

	loggedInUser(){
		axios.get('/current_session')
		      	.then(function(response) {
		      		console.log("CURRENT SESSION USER:"+JSON.stringify(response.data));
		      		//Sets the user info to the logged in user
		      		this.getUserInfo(response.data);
		      	}.bind(this))
		      	.catch(function (error) {
    				console.log(error.message);
  				}.bind(this));
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

	//Logs out user
	lgout(event) {
		//Makes server call to log out user from server
		axios.get("/logout")
				.then(function(response) {
					browserHistory.push(response.data.redirect);
					//window.location = response.data.redirect;
				})
				.catch(function(error) {
					console.log(error);
				});
	}

	render(){
		//Show a Link to admin page if user admin
		let adminlink = <div></div>;
		if(this.state.user.accounttype.localeCompare("admin") == 0){
			adminlink = <Link activeClassName="active" to={`/admin/${this.state.user.username}`}>Admin</Link>;
		};

		return(
			<nav className="navbar navbar-inverse navbar-static-top">
		        <div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand">mEvent</a>
					</div>
					<ul className="nav navbar-nav">
						<li>
							<Link activeClassName="active" to={`/mainpage/${this.state.user.username}`}>Home</Link>
						</li>
						<li>
							<Link activeClassName="active" to={`/addeventpage/${this.state.user.username}`}>Add Event</Link>
						</li>
						<li>
							{adminlink}
						</li>
		          	</ul>
		          	<ul className="nav navbar-nav navbar-right">
						<li><a>You are logged in as {this.state.user.username}</a></li>
						<li>
							<a onClick={this.lgout}><span className="glyphicon glyphicon-log-out"></span>Logout</a>
						</li>
					</ul>
		        </div>
		     </nav>
		);
	}
}