import React from 'react';
import Logout from './Logout.js';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';
import axios from 'axios';
import authen from './authen.js';


export default class MainPage extends React.Component {
// componentdidmount (ajax call to get all events)
	constructor() {
		super();

		this.state = {
			user: { username : "Clayton", rating:"5"},
			events: []
			// events: {
			//         1: {
			//           eventID: 1,
			//           name: 'event1',
			//           location: 'Toronto',
			//           host: 'Paul',
			//         },
			//         2: {
			//           eventID: 2,
			//           name: 'event2',
			//           location: 'Toronto',
			//           host: 'Alex',
			//         },
			//         3: {
			//           eventID: 3,
			//           name: 'event3',
			//           location: 'Toronto',
			//           host: 'Jovan',
			//         },
			//       },
		};
	}

	componentDidMount() {
		// console.log("asdfasdf");
		axios.get('/allevents')
			.then(function(response) {
				this.setState({events: response.data})
			}.bind(this))
			.catch(function(error) {
				console.log(error);
			}.bind(this));
		console.log("DATA_EVENTS: " + this.state.events);
	}

	render() {
		return (
	    <div className="container-fluid">
			<div className="row">
				<div className="col-sm-4">
					<UserInfo
						user={this.state.user}
					/>
					<Logout/>
				</div>
				<div className="col-sm-8" >
					<EventManager
						events={this.state.events}
					/>
				</div>
			</div>
		</div>
		);
	}
}

