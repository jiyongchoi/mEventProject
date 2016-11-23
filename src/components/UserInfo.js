import React from 'react';

export default class UserInfo extends React.Component{

	constructor(props) {
		super(props);
		//Get this info from the database
		const { user: {username, rating, attending} } = this.props;
		

	}

	render(){
		return (
		<div className="panel panel-default">
			<div className="panel-heading">{username}</div>
			<div className="panel-body">
			    <a href="#" className="list-group-item">{username}</a>
			    <a href="#" className="list-group-item">{rating}</a>
			    <a href="#" className="list-group-item">List of Events</a>
			</div>
		</div>
		);
	}

}