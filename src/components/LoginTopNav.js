// src/components/TopNav.js

import React from 'react';
import { Link } from 'react-router';

export default class TopNav extends React.Component{
	render(){
		return(
			<nav className="navbar navbar-inverse navbar-static-top">
		        <div className="container-fluid">
		          <div className="navbar-header">
		            <a className="navbar-brand">mEvent</a>
		          </div>
		          <ul className="nav navbar-nav">
		            <li>
		            <Link activeClassName="active" to={`/`}>Login</Link>
		            </li>
		          </ul>
		        </div>
		     </nav>
		);
	}
}