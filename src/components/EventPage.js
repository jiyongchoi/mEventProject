import React from 'react';
import axios from 'axios';
import WriteReview from './WriteReview';
import EventSignUp from './EventSignUp';

export default class EventPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {eventinfo:{}, attendees:{}, 
					hasAttended: false, hasHappened: false, 
					signedUp: false, atCapacity: false};
		this.hasAttended = this.hasAttended.bind(this);
		this.hasAttended();
		this.getEventInfo = this.getEventInfo.bind(this);
		this.getEventInfo();
		this.hasHappened = this.hasHappened.bind(this);
		this.hasHappened();
		this.signedUp = this.signedUp.bind(this);
		this.signedUp();
		this.atCapacity = this.atCapacity.bind(this);
		this.atCapacity();
		// render capaticy status
	}

	hasAttended() {
		axios.get('/events?type=hasattended&eventid='+this.props.params.eventid)
			.then(function(response) {
				this.setState({hasAttended: response.data});
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}.bind(this));
	}

	getEventInfo() {
		axios.get('/events?type=eventinfo&eventid='+this.props.params.eventid)
				.then(function(response) {
					this.setState({eventinfo: response.data})
				}.bind(this))
				.catch(function(error) {
					alert(error);
				}.bind(this));
	}

	hasHappened() {
		axios.get('/events?type=eventhappened&eventid='+this.props.params.eventid)
			.then(function(response) {
				this.setState({hasHappened: response.data});
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}.bind(this));
	}

	atCapacity() {
		axios.get('/eventattendees?type=capacity&eventid='+this.props.params.eventid)
				.then(function(response) {
					this.setState({atCapacity: response.data});
				}.bind(this))
				.catch(function(error) {
					alert(error);
				}.bind(this));

	}

	attendeeList() {
		axios.get('/eventattendees?type=attendlist&eventid='+this.props.params.eventid)
		.then(function(response) {
			this.setState({attendees: response.data});
		}.bind(this))
		.catch(function(error) {
			alert(error);
		}.bind(this));
	}

	signedUp() {
		axios.get('/eventattendees?type=already&eventid='+this.props.params.eventid)
			.then(function(response) {
				this.setState({signedUp: response.data});
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}.bind(this));
	}

	// render 
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
			<div className="panel-group">
					{
			          this.state.attendees.map((attendee, i) => {
			            return (
			            	<h4>{attendee}</h4>
			            );
			          })
			        }
	        	</div>
			<div className="panel panel-default">
				{this.state.atCapacity ? (
					<p>This Event is Full</p>) : (
					<p>This Event is Not Full</p>
				)}
			</div>
			<div className="panel panel-default">
				{this.state.signedUp ?
					(<p>You are on the attendee list</p>):
					(<p>You are not on the attendee list</p>)}
			</div>
			<div className="panel panel-default">
				{this.state.hasAttended ? 
					(<WriteReview eventid={this.props.params.eventid}/>) : 
					(<p>You may not leave a review</p>)}
			</div>
			<div className="panel panel-default"> 
				{(!this.state.hasHappened && !this.state.signedUp && !this.state.atCapacity) ? 
					(<EventSignUp eventid={this.props.params.eventid}/>):
					(<p>You May Not Sign Up For This Event</p>) }
			</div>

		</div>

		);
	}
}