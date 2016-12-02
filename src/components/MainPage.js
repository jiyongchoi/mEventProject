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
			preselectoption: 'all',
			selectoption: 'all'
		};

<<<<<<< HEAD
		this.getUser = this.getUser.bind(this);
		this.getEvents = this.getEvents.bind(this);
		this.selectChange = this.selectChange.bind(this);
=======
>>>>>>> fc43b6a8eabd174bfe1e6a9f2513d179341ca59e
	}


	getEvents(type) {
		var route = type;
		console.log(type);
		axios.get('/events?type=all')
			.then(function(response) {
				this.setState({events: response.data});
			}.bind(this))
			.catch(function(error){
				console.log(error.message);
			}.bind(this)); 
<<<<<<< HEAD
	}

	selectChange(event) {
		var nextSelector = document.createElement("select");

		this.setState({selectoption: event.target.value});
		if (this.state.selectoption.localeCompare("location") == 0) {
			this.refs.nextselector.appendChild()
		}
=======
>>>>>>> fc43b6a8eabd174bfe1e6a9f2513d179341ca59e
	}

	render() {
		//Gets URL paramater as username to load userinfo 
		const id = this.props.params.id;
<<<<<<< HEAD
		this.getUser(id);
		this.getEvents(this.selectoption);
=======
		var username={userID: id};
<<<<<<< HEAD
		this.getEvents();
>>>>>>> fc43b6a8eabd174bfe1e6a9f2513d179341ca59e
=======
		//this.getEvents();
>>>>>>> 699a72e9de64e7f2a1467e9d7ce8eacadcb50e33
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
					<select value={this.state.preselectoption} onChange={this.selectChange}>
					  	<option value="all">All</option>
					  	<option value="location">Location</option>
					  	<option value="genre">Genre</option>
					</select>
<<<<<<< HEAD
					<div ref="nextselector"></div>
					<EventManager
						showoption={this.state.selectoption}
					/>
=======
					<EventManager/>
>>>>>>> 699a72e9de64e7f2a1467e9d7ce8eacadcb50e33
				</div>
			</div>
		</div>
		);
	}
}

