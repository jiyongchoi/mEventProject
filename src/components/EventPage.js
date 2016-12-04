import React from 'react';
import axios from 'axios';
import WriteReview from './WriteReview';
import EventSignUp from './EventSignUp';
import MainTopNav from './MainTopNav';
import UserInfo from './UserInfo';

export default class EventPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {eventinfo:{}, attendees:[], 
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
		this.attendeeList = this.attendeeList.bind(this);
		this.attendeeList();
		this.signedUp = this.signedUp.bind(this);
		this.signedUp();
	}

	hasAttended() {
		axios.get('/events?type=hasattended&eventid='+this.props.params.eventid)
			.then(function(response) {
				this.setState({hasAttended: response.data});
			}.bind(this))
			.catch(function(error) {
				console.log(error);
			}.bind(this));
	}

	getEventInfo() {
		axios.get('/events?type=eventinfo&eventid='+this.props.params.eventid)
				.then(function(response) {
					this.setState({eventinfo: response.data})
				}.bind(this))
				.catch(function(error) {
					console.log(error);
				}.bind(this));
	}

	hasHappened() {
		axios.get('/events?type=eventhappened&eventid='+this.props.params.eventid)
			.then(function(response) {
				this.setState({hasHappened: response.data});
			}.bind(this))
			.catch(function(error) {
				console.log(error);
			}.bind(this));
	}

	atCapacity() {
		axios.get('/eventattendees?type=capacity&eventid='+this.props.params.eventid)
				.then(function(response) {
					this.setState({atCapacity: response.data});
				}.bind(this))
				.catch(function(error) {
					console.log(error);
				}.bind(this));

	}

	attendeeList() {
		axios.get('/eventattendees?type=attendlist&eventid='+this.props.params.eventid)
		.then(function(response) {
			console.log(response.data);
			var attendeearray = [];
			var index = 0;
			for (index in response.data) {
				console.log(response.data[index].username);
				attendeearray.push(response.data[index].username);
			}
			this.setState({attendees: attendeearray});
			console.log(this.state.attendees);

		}.bind(this))
		.catch(function(error) {
			console.log("attned!!!!!");
			console.log(error);
		}.bind(this));
	}

	signedUp() {
		axios.get('/eventattendees?type=already&eventid='+this.props.params.eventid)
			.then(function(response) {
				this.setState({signedUp: response.data});
			}.bind(this))
			.catch(function(error) {
				console.log(error);
			}.bind(this));
	}

	// render 
	render(){
		const eventid = this.props.params.eventid;
		//Search for this id eventId from database

		return (
		<div className="container">
			<MainTopNav />
			<div className="panel panel-default">
				<div className="panel-body">
					<div className="jumbotron">
						<h1>Event Name: {this.state.eventinfo.title}</h1> 
					</div>
					<h3>EventID: {this.state.eventinfo.eventid}</h3>
					<h3>Host: {this.state.eventinfo.host}</h3>
					<h3>Location: {this.state.eventinfo.location}</h3>
					<h3>Start Time: {this.state.eventinfo.starttime}</h3>
					<h3>Genre: {this.state.eventinfo.genre}</h3>
					<h3>Max Participants: {this.state.eventinfo.max_participants}</h3>
					<h3>Min Participants: {this.state.eventinfo.min_participants}</h3>
				</div>
			</div>
			<div className="panel-group">
					<h3>List of Attendees</h3>
					{
			          this.state.attendees.map((attendee, i) => {
			            return (
			            	<UserInfo username={{userID: attendee}} />
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