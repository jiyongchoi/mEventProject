// src/components/TopNav.js

import React from 'react';
import { Link } from 'react-router';
import Logout from './Logout';

export default class TopNav extends React.Component{
	render(){
		var { username } = {userID: '' };

		if (this.props != undefined){
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
		            	<Link activeClassName="active" to={`/addeventpage`}>Add Event</Link>
		            </li>
		            <li>
		            	<Link activeClassName="active" to={`/admin/${username.userID}`}>Admin</Link>
		            </li>
		            <li>
		            	<Logout/>
		            </li>
		          </ul>
		        </div>
		     </nav>
		);
	}
}