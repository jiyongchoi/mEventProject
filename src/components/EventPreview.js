import React from 'react';
import { Link } from 'react-router';


export default class EventPreview extends React.Component {
  render() {
    return (
    <div className="container">
      <Link to={`/eventpage/${this.props.id}`}>
        <div className="event-preview">
        	<div className="list-group">
        		<h4 className="hostname">{this.props.host}</h4>
          		<h4 className="name">{this.props.name}</h4>
          		<h4 className="location">{this.props.location}</h4>
          		<h4 className="time">{this.props.time}</h4>
          	</div>
        </div>
      </Link>
    </div>
    );
  }
}
