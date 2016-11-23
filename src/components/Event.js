import React from 'react';


export default class Event extends React.Component{

	render(){
		const { event: { name } } = this.props;

		<div className="container">
			<div className="panel panel-default">
				<div className="panel-heading">{name}</div>
				<div className="panel-body">
					<div className="list-group">
					    <h4 className="hostname">{this.props.host}</h4>
		          		<h4 className="name">{this.props.name}</h4>
		          		<h4 className="location">{this.props.location}</h4>
		          		<h4 className="time">{this.props.time}</h4>
				  	</div>
				</div>
			</div>
		</div>
	}
}