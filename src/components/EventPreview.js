import React from 'react';
import { Link } from 'react-router';


export default class EventPreview extends React.Component {
	render() {
		//Sets blank event info
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

		//Gets data from props
		if (this.props != undefined){
			var { eventPreview } = this.props;
		}
		
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<Link to={`/eventPage/${eventPreview.eventid}`}>Event {eventPreview.eventid}</Link>
				</div>
				<div className="panel-body">
					<h4>Event Name: {eventPreview.title}</h4>
					<Link to={`/userPage/${eventPreview.host}`}><p>Host: {eventPreview.host}</p></Link>
					<p>Location: {eventPreview.location}</p>
					<p>Time: {eventPreview.starttime}</p>
					<p>Genre: {eventPreview.genre}</p>
					<p>Max: {eventPreview.max_participants}</p>
					<p>Min: {eventPreview.min_participants}</p>
					<p>Rating: {eventPreview.rating}</p>
				</div>
			</div>
		);
	}
}
