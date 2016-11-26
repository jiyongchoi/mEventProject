import React from 'react';
import Logout from './Logout.js';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';


export default class MainPage extends React.Component {
	constructor() {
		super();
		//this.state.user = {username:'Reid', rating: '5'};

		//Get this data from the database
		/*this.state ={
			user: {
				username:"Reid", 
				rating: 5, 
				attending: [
					{name:"event1"},
					{name:"event2"}
				]
			},
			events: [
				{name: "event1"},
				{name: "event2"},
				{name: "event3"}
			]
		}*/
	}
// componentdidmount (ajax call to get all events)

	render() {
	console.log(document.cookie);
	return (
    <div className="container-fluid">
		<div className="row">
			<div className="col-sm-4">
				<UserInfo/>
				<Logout/>
			</div>
			<div className="col-sm-8" >
				<button type="button" className="btn btn-default">Events go here</button>
			</div>
		</div>
	</div>
	);
	}
}

