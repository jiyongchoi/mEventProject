import React from 'react';
import axios from 'axios';
import Logout from './Logout.js';
import { Link } from 'react-router';


export default class Actions extends React.Component {

	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Actions</div>
				<div className="panel-body">
					<Link activeClassName="active" to={`/addeventpage`}>
						<button type="button" className="btn btn-primary">Add Event</button>
					</Link>
					<Logout/>
				</div>
			</div>
		);
	}


}