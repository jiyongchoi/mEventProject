import React from 'react';
import axios from 'axios';

export default class EventPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {eventinfo:{}, attendees:{}, hasAttended: false};
		this.hasAttended = this.hasAttended.bind(this);
		this.hasAttended();
		this.getEventInfo = this.getEventInfo.bind(this);
		this.getEventInfo();
	}

	hasAttended() {
		axios.get('/events?type=hasattended&eventid='+this.props.params.eventid)
			.then(function(response) {
				this.setState({hasAttended: response.data});
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}.bind(this))
	}

	getEventInfo() {
		axios.get('/events?type=eventinfo&eventid='+this.props.params.eventid)
				.then(function(response) {
					this.setState({eventinfo: response.data})
				}.bind(this))
				.catch(function(error) {
					alert(error);
				}.bind(this))
	}

	//AJAX CALL call get('/events?type=event')
	render(){
		const eventid = this.props.params.eventid;
		//Search for this id eventId from database

		return (
		<div className="container">
			<div className="panel panel-default">
				<div className="panel-body">
					<div className="jumbotron">
						<h1>Event Name:</h1> 
					</div>
				<h1>EventID: {this.state.eventinfo.eventid}</h1>
				<h1>Host: {this.state.eventinfo.host}</h1>
				<h1>Location: {this.state.eventinfo.location}</h1>
				<h1>Start Time: {this.state.eventinfo.starttime}</h1>
				<h1>Genre: {this.state.eventinfo.genre}</h1>
				<h1>Max Participants: {this.state.eventinfo.max_participants}</h1>
				<h1>Min Participants: {this.state.eventinfo.min_participants}</h1>
				</div>
			</div>
			{this.state.hasAttended ? <WriteReview eventid={this.props.params.eventid}/>:
					<p>You may not leave a review</p>}
		</div>

		);
	}
}