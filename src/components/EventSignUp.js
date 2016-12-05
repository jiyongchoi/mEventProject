// src/components/EventSignUp.js

import React from 'react';
import axios from 'axios';

/*
* Express the mechanism to sign up the current logged in user to the eventid event
*/
export default class EventSignUp extends React.Component {
	constructor(props) {
		super(props);	
		this.signupevent = this.signupevent.bind(this);
	}

	// Make ajax call to the server to sign up the currently logged in user
	signupevent(event) {
		axios.post('/eventattendees', {eventid: this.props.eventid})
			.then(function(response){
				console.log(response.data);
				alert(response.data);
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}.bind(this));
		event.preventDefault();
	}

	// Express the button that, on click, will trigger the ajax call to submit user
	render() {
		return (
			<div className="col-sm-2">
				<button className="btn btn-primary btn-lg" 
					onClick={this.signupevent}>SIGN UP FOR THIS EVENT</button>
			</div>

		)
	}
}