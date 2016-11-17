// src/components/TopNav.js

import React from 'react';
import { Link } from 'react-router';

export default class TopNav extends React.Component{
	render(){
		return(
			<nav className="navbar navbar-default">
				<ul className="nav navbar-nav">
					<li><Link to='/'><span>Home</span></Link></li>
					<li><a href="#">Login</a></li>
				</ul>
          	</nav>
		);
	}
}