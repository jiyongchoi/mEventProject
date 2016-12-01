import React from 'react';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';
import Actions from './Actions';
import axios from 'axios';
import authen from './authen.js';


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

		this.getUser = this.getUser.bind(this);

	}

	getUser(id){
		//alert("GetUser "+id);
		//alert(this.session);
		axios.post('/getuserinfo', {username: id})
		      	.then(function(response) {
		      		//alert("Resopne: "+data);
		      	}.bind(this))
		      	.catch(function (error) {
    				console.log(error.message);
  				}.bind(this));
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
<<<<<<< HEAD
		console.log("DATA_EVENTS: " + this.state.events);
=======
		
>>>>>>> a77e615fb5889b6d101cb47b1e32b611cedd2f71
	}

	render() {
		const id = this.props.params.id;
		this.getUser(id);
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
					<EventManager
						events={this.state.events}
					/>
				</div>
			</div>
		</div>
		);
	}
}

