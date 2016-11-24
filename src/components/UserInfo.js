import React from 'react';

export default class UserInfo extends React.Component{

	constructor(props) {
		super();
		//Get this info from the database
		

	}

	render(){
		//const { user: {username, rating} } = this.props;

		
		return (
			<div className="panel panel-default">
				<div className="panel-heading">User</div>
				<div className="panel-body">
					<div>Username</div>
					<div>Rating</div>
					<div>List of Events</div>
				</div>
			</div>
		);
	}

}
