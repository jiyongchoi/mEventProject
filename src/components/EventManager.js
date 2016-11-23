import React from 'react';
import Event from './Event';

export default class EventManager extends React.Component{

	render(){
		const { events } = this.props;

		return (
		<div className="panel-group">
			{
	          Object.values(events).map((event, i) => {
	            return (
	              <Event
	                event={event}
	              />
	            );
	          })
	        }
        </div>
		);
	}
}