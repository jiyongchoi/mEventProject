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

		this.getUser = this.getUser.bind(this);
		this.getEvents = this.getEvents.bind(this);
		this.selectChange = this.selectChange.bind(this);
	}

	getUser(id) {
		//alert("GetUser "+id);
		//alert(this.session);
		axios.post('/getuserinfo', {username: id})
		      	.then(function(response) {
		      		this.setState({user: response.data});
		      		//alert("Resopne: "+data);
		      	}.bind(this))
		      	.catch(function (error) {
    				console.log(error.message);
  				}.bind(this));
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
	}

	selectChange(event) {
		var nextSelector = document.createElement("select");

		this.setState({selectoption: event.target.value});
		if (this.state.selectoption.localeCompare("location") == 0) {
			this.refs.nextselector.appendChild()
		}
	}

	render() {
		const id = this.props.params.id;
		this.getUser(id);
		this.getEvents(this.selectoption);
		return (
	    <div className="container-fluid">
			<div className="row">
				<div className="col-sm-4">
					<UserInfo
						user={this.state.user}
					/>
					<Actions/>
				</div>
				<div className="col-sm-8" >
					<select value={this.state.preselectoption} onChange={this.selectChange}>
					  	<option value="all">All</option>
					  	<option value="location">Location</option>
					  	<option value="genre">Genre</option>
					</select>
					<div ref="nextselector"></div>
					<EventManager
						showoption={this.state.selectoption}
					/>
				</div>
			</div>
		</div>
		);
	}
}

