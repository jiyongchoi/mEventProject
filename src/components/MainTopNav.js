import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import {browserHistory} from 'react-router';


export default class TopNav extends React.Component{
	constructor(props) {
		super(props);	
		this.lgout = this.lgout.bind(this);
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
		var { username } = {userID: '' };

		if (this.props != undefined){
			//get the username for the logged in user
			var { username } = this.props;
		}

		return(
			<nav className="navbar navbar-inverse navbar-static-top">
		        <div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand">mEvent</a>
					</div>
					<ul className="nav navbar-nav">
						<li>
							<Link activeClassName="active" to={`/mainpage/${username.userID}`}>Home</Link>
						</li>
						<li>
							<Link activeClassName="active" to={`/addeventpage/${username.userID}`}>Add Event</Link>
						</li>
						<li>
							<Link activeClassName="active" to={`/admin/${username.userID}`}>Admin</Link>
						</li>
		          	</ul>
		          	<ul className="nav navbar-nav navbar-right">
						<li><a>You are logged in as {username.userID}</a></li>
						<li>
							<a onClick={this.lgout}><span className="glyphicon glyphicon-log-out"></span>Logout</a>
						</li>
					</ul>
		        </div>
		     </nav>
		);
	}
}