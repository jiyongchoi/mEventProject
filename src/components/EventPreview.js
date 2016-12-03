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
								eventid: '',
								rating: '',
								title:''
							};
		var username = '';

		if (this.props != undefined){
			var { eventPreview, username } = this.props;
			

		}
		
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<Link to={`/eventPage/${username}/${eventPreview.eventid}`}>Event {eventPreview.eventid}</Link>
				</div>
				<div className="panel-body">
					<h4>Event Name: {eventPreview.title}</h4>
					<p>Host: {eventPreview.host}</p>
					<p>Location: {eventPreview.location}</p>
					<p>Time: {eventPreview.starttime}</p>
					<p>Genre: {eventPreview.genre}</p>
					<p>Max: {eventPreview.max_participants}</p>
					<p>Min: {eventPreview.max_participants}</p>
					<p>Rating: {eventPreview.rating}</p>
				</div>
			</div>
		);
	}
}
