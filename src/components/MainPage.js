import React from 'react';
import Logout from './Logout.js';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';


export default class MainPage extends React.Component {
	constructor() {
		super();
		//Get this data from the database
		this.state ={
			user: {
				username:"Reid", 
				rating: 5, 
				attending: {
					{name:"event1"},
					{name:"event2"}
				}
			}
			events: {
				{name: "event1"},
				{name: "event2"},
				{name: "event3"}
			}
		}
	}
// componentdidmount (ajax call to get all events)

	render() {
	return (
		<div className="row">
			<div className="col-sm-4">
				<UserInfo
					user = {this.state.user};
				/>
				<Logout/>
			</div>
			<div className="col-sm-8" >
				<EventManager
					events = {this.state.events};
				/>
			</div>
		</div>
	);
	}
}

