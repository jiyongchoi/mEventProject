import React from 'react';
import axios from 'axios';

export default class EventSignUp extends React.Component {
	constructor(props) {
		super(props);	
		this.signupevent = this.signupevent.bind(this);
	}

	signupevent(event) {
		axios.post('/eventattendees', {eventid: this.props.eventid})
			.then(function(response){
				alert(response.data);
				this.forceUpdate();
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}.bind(this));
	}

	render() {
		return (
			<div className="col-sm-2">
				<button className="btn btn-primary btn-lg" onClick={this.signupevent}>SIGN UP FOR THIS EVENT</button>
			</div>

		)
	}
}