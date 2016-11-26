import React from 'react';
import Logout from './Logout.js';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';


export default class MainPage extends React.Component {
// componentdidmount (ajax call to get all events)
	constructor() {
		super();

		this.state = {
			user: { username : "Clayton", rating:"5"},
			events: {
					1 : {
							name: "event1"
						},
					2 : {
							name: "event2"
						},
					},
		};
	}

	render() {
			
		return (
	    <div className="container-fluid">
			<div className="row">
				<div className="col-sm-4">
					<UserInfo
						user={this.state.user}
					/>
				</div>
				<div className="col-sm-8" >
					<button type="button" className="btn btn-default">Events go here</button>
					<Logout/>
				</div>
			</div>
		</div>
		);
	}
}

