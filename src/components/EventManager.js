import React from 'react';
import EventPreview from './EventPreview';

export default class EventManager extends React.Component{
	render(){

		const {events} = this.props;

		return (
		<div className="panel-group">
			{
	          Object.values(events).map((eventPreview, i) => {
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
