// src/components/EventPage.js

import React from 'react';
import axios from 'axios';
import WriteReview from './WriteReview';
import EventSignUp from './EventSignUp';
import MainTopNav from './MainTopNav';
import UserInfo from './UserInfo';

/*
* Express an event's attributes, and display its attendees, 
* an option to review, and an option to sign up for it.
* This page expresses the event specified by the url paramter.
* The option to write a review should be given when the currently
* logged-in user is in its attendee list and it starttime is 
* in the past
* The option to sign up for an event should happen if its starttime
* has not passed yet, the current logged-in user is not yet on the 
* attendee list, and the event is not at capacity
*/
export default class EventPage extends React.Component {

	// The contructor of the EventPage class
	constructor(props) {
		super(props);
		this.state = {eventinfo:{}, attendees:[], reviews: []};
		this.getEventInfo = this.getEventInfo.bind(this);
		this.getEventInfo();
		this.attendeeList = this.attendeeList.bind(this);
		this.attendeeList();
		this.getReviews = this.getReviews.bind(this);
		this.getReviews();
	}


	/*
	* Retrieve the attribute values of this page's event
	*/
	getEventInfo() {
		axios.get('/events?type=eventinfo&eventid='+this.props.params.eventid)
				.then(function(response) {
					this.setState({eventinfo: response.data});
				}.bind(this))
				.catch(function(error) {
					this.setState({eventinfo: {}});
				}.bind(this));
	}

	/*
	* Retrieve the attendee list of this page's event
	*/
	attendeeList() {
		axios.get('/eventattendees?type=attendlist&eventid='+this.props.params.eventid)
		.then(function(response) {
			var attendeearray = [];
			var index = 0;
			for (index in response.data) {
				attendeearray.push(response.data[index].username);
			}
			this.setState({attendees: attendeearray});
		}.bind(this))
		.catch(function(error) {
			this.setState({attendees: []});
		}.bind(this));
	}

	getReviews() {
		axios.get('/reviews?eventid='+this.props.params.eventid)
			.then(function(response) {
				this.setState({reviews:response.data});
			}.bind(this));
	}

	/*
	* Express what the DOM will look like in the following order:
	* 1) The event attributes
	* 2) List of Attendees
	* 3) List of Reviews
 	* 4) Status on this event's capacity
	* 5) Status of whether current logged in user is in the list
	* 6) A WriteReview section, if the user is in its attendee list and it starttime is 
	* in the past
	* 7) A UserSignUp section, if its starttime has not passed yet, 
	* the current logged-in user is not yet on the 
	* attendee list, and the event is not at capacity
	*/
	render(){
		const eventid = this.props.params.eventid;
		//Search for this id eventId from database
		return (
		<div className="container">
			<MainTopNav />
			<div className="panel panel-default">
				<div className="panel-body">
					<div className="jumbotron">
						<h1>Event Name: </h1>
						<h1>{this.state.eventinfo.title}</h1> 
					</div>
					<h3>EventID: {this.state.eventinfo.eventid}</h3>
					<h3>Host: {this.state.eventinfo.host}</h3>
					<h3>Location: {this.state.eventinfo.location}</h3>
					<h3>Certified: {this.state.eventinfo.iscertified? "True" : "False"}</h3>
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
	        	<h3>List of Reviews</h3>
	        	{
			          this.state.reviews.map((review, i) => {
			            return (
			            	<div>
			            	<p>Review {i+1}</p>
			            	<p>Comment: {review.reviewtext}</p> 
			            	<p>Rating: {review.reviewrating}</p>
			            	</div>
			            );
			          })
			    }
	        </div>
			<WriteReview eventid={this.props.params.eventid}/>
			<EventSignUp eventid={this.props.params.eventid}/>
		</div>

		);
	}
}