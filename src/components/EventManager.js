import React from 'react';
import EventPreview from './EventPreview';
import axios from 'axios';

export default class EventManager extends React.Component{
	constructor(props) {
		super(props);
		//Set blank event list
		this.state = { events: [] };
		this.getEvents = this.getEvents.bind(this);
		//Get all events from server
		this.getEvents('all');
		this.sortByName = this.sortByName.bind(this);
		this.sortByGenre = this.sortByGenre.bind(this);
		this.sortByEventID = this.sortByEventID.bind(this);
		this.searchSports = this.searchSports.bind(this);
		this.searchArts = this.searchArts.bind(this);
		this.searchScience = this.searchScience.bind(this);
		this.searchSocial = this.searchSocial.bind(this);
		this.searchOther = this.searchOther.bind(this);
		this.searchAll = this.searchAll.bind(this);
	}

	getEvents(type) {
		//Get Events from the server based on type query string
		axios.get('/events?type=' + type)
			.then(function(response) {
				//Set events array to array from database
				this.setState({events: response.data});
			}.bind(this))
			.catch(function(error){
				console.log(error.message);
			}.bind(this)); 
	}

	//Sort events by genre
	sortByGenre() {
		//Get genre sorted version of events
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
		//Get title sorted version of events
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
		//Get eventid sorted version of events		
		let sorted = this.state.events.sort(function(a, b) {
		  return a.eventid - b.eventid;
		});
		this.setState({events: sorted});
	}

	//Get events based on sports genre
	searchSports(){
		this.getEvents('genre&genre=sports');
	}

	//Get events based on arts genre
	searchArts(){
		this.getEvents('genre&genre=arts');
	}

	//Get events based on science genre
	searchScience(){
		this.getEvents('genre&genre=science');
	}

	//Get events based on social genre
	searchSocial(){
		this.getEvents('genre&genre=social');
	}

	//Get events based on other genre
	searchOther(){
		this.getEvents('genre&genre=other');
	}

	//Get all events in the database
	searchAll(){
		this.getEvents('all');
	}


	render(){
		return (
		<div className="container-fluid">
			<div className="row">
				<div className="btn-group">
					<div className="btn-group">
					    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Sort By
					    <span className="caret"></span></button>
					    <ul className="dropdown-menu">					
							<li><a onClick={this.sortByEventID}>EventID</a></li>
							<li><a onClick={this.sortByGenre}>Genre</a></li>
							<li><a onClick={this.sortByName}>Name</a></li>
					    </ul>
					</div>	
					<div className="btn-group">
					    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Search For
					    <span className="caret"></span></button>
					    <ul className="dropdown-menu">	
							<li><a onClick={this.searchAll}>All</a></li>				
							<li><a onClick={this.searchSports}>Sports</a></li>
							<li><a onClick={this.searchArts}>Arts</a></li>
							<li><a onClick={this.searchScience}>Science</a></li>
							<li><a onClick={this.searchSocial}>Social</a></li>
							<li><a onClick={this.searchOther}>Other</a></li>
					    </ul>
					</div>	
				</div>		
			</div>
			<hr/>
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
