import React from 'react';
import { Link } from 'react-router';


export default class EventPreview extends React.Component {
	render() {

		var { eventPreview } = {location: '', 
								starttime: '', 
								genre:'', 
								max_participants:'', 
								min_participants:'',
								host: '',
								eventID: '',
								rating: ''
							};

		if (this.props != undefined){
			var { eventPreview } = this.props;
		}
		
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<Link to={`/eventPage/${eventPreview.eventID}`}>Event {eventPreview.eventID}</Link>
				</div>
				<div className="panel-body">
					<h4>Event Name: To be added</h4>
					<h4>Host: {eventPreview.host}</h4>
					<h4>Location: {eventPreview.location}</h4>
					<h4>Time: {eventPreview.starttime}</h4>
					<h4>Genre: {eventPreview.genre}</h4>
					<h4>Max: {eventPreview.max_participants}</h4>
					<h4>Min: {eventPreview.max_participants}</h4>
					<h4>Rating: {eventPreview.rating}</h4>
				</div>
			</div>
		);
	}
}
