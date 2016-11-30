import React from 'react';
import axios from 'axios';
import Logout from './logout';
import { Link } from 'react-router';


export default class Actions extends React.Component {
	constructor(props) {
		super(props);
		//const id = this.props.params.id;
		this.addEvent = this.addEvent.bind(this);
	}

	addEvent(event) {
		axios.get("/addeventpage")
				.then(function(response) {
					window.location = response.data.redirect;
				})
				.catch(function(error) {
					console.log(error);
				});
	}

	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Actions</div>
				<div className="panel-body">
					<Link to={`/addeventpage`}>Add Event</Link>
					<Logout/>
				</div>
			</div>
		);
	}


}