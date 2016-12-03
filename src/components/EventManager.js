import React from 'react';
import EventPreview from './EventPreview';
import axios from 'axios';

export default class EventManager extends React.Component{
	constructor(props) {
		super(props);
		//Set blank event list
		this.state = { events: [] };
		this.getEvents = this.getEvents.bind(this);
		//Call function to get user for given username
		this.getEvents();
		this.sortByName = this.sortByName.bind(this);
		this.sortByGenre = this.sortByGenre.bind(this);
		this.sortByEventID = this.sortByEventID.bind(this);
	}

	getEvents() {
		axios.get('/events?type=all')
			.then(function(response) {
				console.log("GET EVENTLIST: "+JSON.stringify(response.data));
				this.setState({events: response.data});
			}.bind(this))
			.catch(function(error){
				console.log(error.message);
			}.bind(this)); 
	}

	sortByGenre() {
		let sorted = this.state.events.sort(function(a, b) {
		  var nameA = a.genre.toUpperCase(); // ignore upper and lowercase
		  var nameB = b.genre.toUpperCase(); // ignore upper and lowercase
		  if (nameA < nameB) {
		    return -1;
		  }
		  if (nameA > nameB) {
		    return 1;
		  }

		  // names must be equal
		  return 0;
		});
		this.setState({events: sorted});
	}

	sortByName() {
		let sorted = this.state.events.sort(function(a, b) {
		  var nameA = a.title.toUpperCase(); // ignore upper and lowercase
		  var nameB = b.title.toUpperCase(); // ignore upper and lowercase
		  if (nameA < nameB) {
		    return -1;
		  }
		  if (nameA > nameB) {
		    return 1;
		  }

		  // names must be equal
		  return 0;
		});
		this.setState({events: sorted});
	}

	sortByEventID(){
		let sorted = this.state.events.sort(function(a, b) {
		  return a.eventid - b.eventid;
		});
		this.setState({events: sorted});
	}

	componentDidMount () {
		//alert("componentDidMount");
	}

	render(){

		//const {events} = this.props;
		//alert("Events: "+JSON.stringify(this.state.events));
		return (
		<div className="container">
			<div className="row">
				<div className="dropdown">
				    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Sort By
				    <span className="caret"></span></button>
				    <ul className="dropdown-menu">					
						<li><a onClick={this.sortByEventID}>EventID</a></li>
						<li><a onClick={this.sortByGenre}>Genre</a></li>
						<li><a onClick={this.sortByName}>Name</a></li>
				    </ul>
				</div>				
			</div>
			<div className="row">
				<div className="panel-group">
					{
			          this.state.events.map((eventPreview, i) => {
			            return (
				            <EventPreview
				              eventPreview={eventPreview}
				              key={`event-${i}`}
				            />
			            );
			          })
			        }
	        	</div>
	        </div>
        </div>
		);
	}
}
