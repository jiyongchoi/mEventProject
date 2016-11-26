import React from 'react';
import { Link } from 'react-router';


export default class EventPreview extends React.Component {
	render() {

		var { eventPreview } = { eventID: 0, name: "default", location: "Bermuda", host: "Obama"};

		if (this.props != undefined){
			var { eventPreview } = this.props;
		}
		
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<Link to={`/eventPage/${eventPreview.eventID}`}>{eventPreview.name}</Link>
				</div>
				<div className="panel-body">
					<h4>Event Name: {eventPreview.name}</h4>
					<h4>Location: {eventPreview.location}</h4>
					<h4>Host: {eventPreview.host}</h4>
				</div>
			</div>
		);
	}
}
