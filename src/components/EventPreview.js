import React from 'react';
import { Link } from 'react-router';


export default class EventPreview extends React.Component {
	render() {

		var { eventPreview } = { eventId: 0, name: "default", location: "Bermuda Triangle", host: "Barrack Obama"};

		if (this.props != undefined){
			var { eventPreview } = this.props;
		}
		
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Event</div>
				<div className="panel-body">
					<div>{eventPreview.name}</div>
					<div>{eventPreview.location}</div>
					<div>{eventPreview.host}</div>
				</div>
			</div>
		);
	}
}
