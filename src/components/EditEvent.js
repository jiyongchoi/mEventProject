import React from 'react';
import axios from 'axios';
import MainTopNav from './MainTopNav';

export default class EditEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {eventID: '', title: '', description: '', 
					  isCertified: false, location: '', starttime: '',
					  genre: '', maxPart: '', minPart: '', 
					  host: '', message: ''};
    	this.handleChangeEventID = this.handleChangeEventID.bind(this);
    	this.handleChangeTitle = this.handleChangeTitle.bind(this);
    	this.handleChangeDescription = this.handleChangeDescription.bind(this);
    	this.handleChangeIsCertified = this.handleChangeIsCertified.bind(this);
    	this.handleChangeLocation = this.handleChangeLocation.bind(this);
    	this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    	this.handleChangeGenre = this.handleChangeGenre.bind(this);
    	this.handleChangeMaxPart = this.handleChangeMaxPart.bind(this);
    	this.handleChangeMinPart = this.handleChangeMinPart.bind(this);
    	this.handleChangeHost = this.handleChangeHost.bind(this);
    	this.editEvent = this.editEvent.bind(this);
    	this.submit = this.submit.bind(this);
	}

	// Sets state.eventID to be the form field
	handleChangeEventID(event) {
	   this.setState({eventID: event.target.value});
	}

	// Sets state.title to the form field
	handleChangeTitle(event) {
	  this.setState({title: event.target.value});
	}

	// Sets state.description to the form field
	handleChangeDescription(event) {
	  this.setState({description: event.target.value});
	}

	// Sets state.isCertified to the form field
	handleChangeIsCertified(event) {
	  this.setState({isCertified: event.target.value});
	}

	// Sets state.location to the form field
	handleChangeLocation(event) {
	  this.setState({location: event.target.value});
	}

	// Sets state.starttime to the form field
	handleChangeStartTime(event) {
	  this.setState({starttime: event.target.value});
	}

	// Sets state.genre to the form field
	handleChangeGenre(event) {
	  this.setState({genre: event.target.value});
	}

	// Sets state.maxPart to the form field
	handleChangeMaxPart(event) {
	  this.setState({maxPart: event.target.value});
	}

	// Sets state.minPart to the form field
	handleChangeMinPart(event) {
	  this.setState({minPart: event.target.value});
	}

	// Sets state.host to the form field
	handleChangeHost(event) {
	  this.setState({host: event.target.value});
	}

	// Displays Modal popup. Event is only modified if Confirm is clicked in popup
	submit(event) {
		$('#editEventModal').modal('show');
  		event.preventDefault();
	}

	// Edits the attributes of the event in the database
	editEvent(){
		axios.post('/adminEditEvent', {eventID: this.state.eventID, 
									  title: this.state.title,
									  description: this.state.description, 
									  isCertified: this.state.isCertified,
									  location: this.state.location,
									  starttime: this.state.starttime, 
									  genre: this.state.genre,
									  maxPart: this.state.maxPart, 
									  minPart: this.state.minPart,
									  host: this.state.host})
		      	.then(function(response) {
		      		// If edit is succesful, render a message with the modified attributes
		      		this.refs.message.innerText = 'Event ID = ' + response.data.eventid
		      									   + ' Title = ' + response.data.title
		      									   + ' Description = ' + response.data.description
		      									   + ' Is Certified = ' + response.data.iscertified
		      									   + ' Location = ' + response.data.location
		      									   + ' Start Time = ' + response.data.starttime
		      									   + ' Genre = ' + response.data.genre
		      									   + ' Max Participants = ' + response.data.max_participants
		      									   + ' Min Participants = ' + response.data.min_participants
		      									   + ' Host = ' + response.data.host;
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.message.innerText = "bad input";
    				console.log(error.message);
  				}.bind(this));
	}

	render(){
		return(
			<div id='editevent'>
				<div className="panel-body">
				<form id="userdeleteform" method="post" onSubmit={this.submit}>
					<div className="form-group">
						<label for="eventid">EventID:</label>
						<input type="number" min="1" className="form-control" id="editid" name="eventid"
						placeholder="Enter the EventID of the Event you wish to edit" 
						required onChange={this.handleChangeEventID}/>
					</div>
				
					<div className="form-group">
						<label for="title">Title:</label>
						<input type="text" className="form-control" id="editTitle" name="title"
						pattern="[A-Za-z]+" onChange={this.handleChangeTitle}/>
					</div>

					<div className="form-group">
						<label for="description">Description:</label>
						<textarea className="form-control" rows="3" id="editDescription" name="description" 
						onChange={this.handleChangeDescription}/>
					</div>
					
					<div className="form-group">
						<label for="isCertified">Certification:</label>
						<select className="form-control" id="editCertification" name="isCertified" 
						required onChange={this.handleChangeIsCertified}>
							<option>true</option>
							<option>false</option>
						</select>
					</div>

					<div className="form-group">
						<label for="location">Location:</label>
						<input type="text" className="form-control" id="editLocation" name="location"
						pattern="[A-Za-z]+" onChange={this.handleChangeLocation}/>
					</div>

					<div className="form-group">
						<label for="starttime">Start Time:</label>
						<input type="datetime-local" className="form-control" id="editStartTime" name="starttime"
						required onChange={this.handleChangeStartTime}/>
					</div>

					<div className="form-group">
						<label for="genre">Genre:</label>
						<select className="form-control" id="editGenre" name="genre" required onChange={this.handleChangeGenre}>
							<option>sports</option>
							<option>arts</option>
							<option>science</option>
							<option>social</option>
							<option>other</option>
						</select>
					</div>

					<div className="form-group">
						<label for="max_participants">Max Participants:</label>
						<input type="number" className="form-control" id="editMaxParticipants" min={this.state.min_participants}
						name="max_participants"  required onChange={this.handleChangeMaxPart}/>
					</div>

					<div className="form-group">
						<label for="min_participants">Min Participants:</label>
						<input type="number" className="form-control" id="editMinParticipants" 
						name="min_participants" min="1" required onChange={this.handleChangeMinPart}/>
					</div>

					<div className="form-group">
						<label for="host">Host:</label>
						<input type="text" className="form-control" id="editHost" name="host"
						pattern="[A-Za-z]+" onChange={this.handleChangeHost}/>
					</div>

					<input className="btn btn-default" id="editButton" type="submit" value="Edit Event Info"></input>
					</form>
					<div id="message" ref="message"></div>
				</div>
				<div className = "modal fade" id = "editEventModal" tabindex = "-1" role = "dialog" 
			   aria-labelledby = "myModalLabel" aria-hidden = "true">					
			  	<div className = "modal-dialog">
			    	<div className = "modal-content">						         
						<div className = "modal-header">
							<button type = "button" className = "close" data-dismiss = "modal" aria-hidden = "true">
							      &times;
							</button>
							<h4 className = "modal-title" id = "myModalLabel">
							   Confirm Edit User
							</h4>
						</div>
						<div className = "modal-body">
							<p>EventID: {this.state.eventID}</p>
							<p>Title: {this.state.title}</p>
							<p>Description: {this.state.description}</p>
							<p>isCertified: {this.state.isCertified}</p>
							<p>Location: {this.state.location}</p>
							<p>Time: {this.state.starttime}</p>
							<p>Genre: {this.state.genre}</p>
							<p>Max Participants: {this.state.maxPart}</p>
							<p>minPart: {this.state.minPart}</p>
							<p>host: {this.state.host}</p>
						</div>
						<div className = "modal-footer">
							<button type = "button" className = "btn btn-default" data-dismiss = "modal">
							   Cancel
							</button>
							<button type = "button" className = "btn btn-primary" data-dismiss = "modal" onClick={this.editEvent}>
							   Confirm
							</button>
						</div>
			      	</div>
			   	</div>
				</div>
			</div>
		);
	}
}