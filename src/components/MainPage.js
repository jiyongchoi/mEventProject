import React from 'react';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';
import Actions from './Actions';
import axios from 'axios';



export default class MainPage extends React.Component {
// componentdidmount (ajax call to get all events)
	constructor() {
		super();

		this.state = {
			user: { username : "RcBobo", 
					rating:"5", 
					firstname:"Jovan", 
					surname:"Maric"},
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


	getEvents() {
		axios.get('/events?type=all')
			.then(function(response) {
				this.setState({events: response.data});
			}.bind(this))
			.catch(function(error){
				console.log(error.message);
			}.bind(this)); 
	}

	render() {
		//Gets URL paramater as username to load userinfo 
		const id = this.props.params.id;
		var username={userID: id};
		//this.getEvents();
		return (
	    <div className="container-fluid">
			<div className="row">
				<div className="col-sm-4">
					<UserInfo
						username={username}
					/>
					<Actions/>
				</div>
				<div className="col-sm-8" >
					<select>
					  <option value="volvo">Volvo</option>
					  <option value="saab">Saab</option>
					  <option value="opel">Opel</option>
					  <option value="audi">Audi</option>
					</select>
					<EventManager/>
				</div>
			</div>
		</div>
		);
	}
}

