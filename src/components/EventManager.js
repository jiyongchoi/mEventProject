import React from 'react';
import EventPreview from './EventPreview';
import axios from 'axios';

export default class EventManager extends React.Component{
	constructor(props) {
		super(props);
		//Set blank event list
		this.state = { events: [] };
		this.getEvents = this.getEvents.bind(this);
		//Call function to get user for given username
		this.getEvents();
	}

	getEvents() {
		axios.get('/events?type=all')
			.then(function(response) {
				console.log("GET EVENTLIST: "+JSON.stringify(response.data));
				this.setState({events: response.data});
			}.bind(this))
			.catch(function(error){
				console.log(error.message);
			}.bind(this)); 
	}



	render(){

		//const {events} = this.props;
		//alert("Events: "+JSON.stringify(this.state.events));
		return (
		<div className="panel-group">
			{
	          this.state.events.map((eventPreview, i) => {
	            return (
	              <EventPreview
	                eventPreview={eventPreview}
	                key={`event-${i}`}
	              />
	            );
	          })
	        }
        </div>
		);
	}
}
