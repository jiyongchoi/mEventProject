import React from 'react';
import axios from 'axios';

export default class EventPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {event:{}};
		this.getEvent = this.getEvents.bind(this);
		//Call function to get user for given username
		this.getEvent();
	}

	getEvent() {
		super(props);
		
	}
	//AJAX CALL call get('/events?type=rating')
	render(){
		const eventid = this.props.params.id;
		//Search for this id eventId from database

		return (
		<div className="container">
			<div className="panel panel-default">
				<div className="panel-body">
					<div className="jumbotron">
						<h1>Event Name:</h1> 
					</div>
				<h1>EventID: {id}</h1>
				<h1>Host: </h1>
				<h1>Location: </h1>
				<h1>Start Time: </h1>
				<h1>Genre: </h1>
				<h1>Rating: </h1>
				<h1>Max Participants: </h1>
				<h1>Min Participants: </h1>
				<h1>Attending: </h1>
				</div>
			</div>
		</div>

		);
	}
}