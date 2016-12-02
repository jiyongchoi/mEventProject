import React from 'react';

export default class MainPage extends React.Component {
	//AJAX CALL
	render(){
		const id = this.props.params.id;
		//Search for this id eventId from database

		return (
		<div className="container">
			<div className="panel panel-default">
				<div className="panel-body">
					<div className="jumbotron">
						<h1>Event Name:</h1> 
					</div>
				<h1>EventID: {id}</h1>
				<h1>Host: </h1>
				<h1>Location: </h1>
				<h1>Start Time: </h1>
				<h1>Genre: </h1>
				<h1>Rating: </h1>
				<h1>Max Participants: </h1>
				<h1>Min Participants: </h1>
				<h1>Attending: </h1>
				</div>
			</div>
		</div>

		);
	}
}