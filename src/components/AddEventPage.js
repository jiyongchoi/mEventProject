import React from 'react';
import axios from 'axios';
import MainTopNav from './MainTopNav';
import {browserHistory} from 'react-router'; 

export default class AddEventPage extends React.Component {
	constructor(props) {
		super(props);
		//Set blank event 
		this.state = {
					eventid: 1,
					title: '',
					description: '',
					isCertified: false,
					location: '', 
					starttime: '', 
					genre:'sports', 
					max_participants:'', 
					min_participants:'',
					rating: '0'
				};
    	this.handleChangeLocation = this.handleChangeLocation.bind(this);
    	this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    	this.handleChangeGenre = this.handleChangeGenre.bind(this);
    	this.handleChangeMaxParticipants = this.handleChangeMaxParticipants.bind(this);
    	this.handleChangeMinParticipants = this.handleChangeMinParticipants.bind(this);
    	this.handleChangeTitle = this.handleChangeTitle.bind(this);
    	this.handleChangeDescription = this.handleChangeDescription.bind(this);
    	this.createEvent = this.createEvent.bind(this);
    	this.submit = this.submit.bind(this);    	
	}

	componentDidMount() {
		//Get the highest eventID + 1 from the database
		//Use that value as the unique eventID
		axios.get('/events?type=max')
  			.then(
  				res => {
  					const eventid = res.data.getmaxeventid;
  					//Set eventID
			        this.setState({ eventid });
			    }
			).catch(function (error) {
				console.log(error.message);
			});
	}

	//Update state.location to form value
	handleChangeLocation(event) {
    	this.setState({location: event.target.value});
 	}

	//Update state.starttime to form value
 	handleChangeStartTime(event) {
    	this.setState({starttime: event.target.value});
 	}

 	//Update state.genre to form value
 	handleChangeGenre(event){
 		this.setState({genre: event.target.value});
 	}

 	//Update state.max_participants to form value
 	handleChangeMaxParticipants(event){
 		this.setState({max_participants: event.target.value});
 	}

 	//Update state.min_participants to form value
 	handleChangeMinParticipants(event){
 		this.setState({min_participants: event.target.value});
 	}

 	//Update state.title to form value
 	handleChangeTitle(event){
 		this.setState({title: event.target.value});
 	}

 	//Update state.description to form value
 	handleChangeDescription(event){
 		this.setState({description: event.target.value});
 	}

 	//On submit show modal popup
 	submit(event){
  		event.preventDefault();
 	}

 	// Create event in database
 	createEvent(){
 		axios.post('/addevent', this.state)
	      	.then(function (response) {
	      		if (typeof response.data.redirect == 'string') {
	      			//If create was sucessful redirect to eventpage
	      			alert("Event Created Successful! Redirecting to eventpage...");
					browserHistory.push(response.data.redirect);
				}
			}).catch(function (error) {
				//If an error occured show error hint
				alert("Error creating event. "+error.response.data.hint);
				console.log(error.message);
			});
 	}

	render(){
		return( 
			<div className="container-fluid">
				<MainTopNav/>
				<div className="panel panel-default">
				    <div className="panel-heading">Add Event</div>
				    <div className="panel-body">
						<form id="addEventForm" method="get" onSubmit={this.submit}>
							<div className="form-group">
								<label for="title">Title:</label>
								<input type="text" className="form-control" id="addtitle" name="title" placeholder="Title"
								 required  onChange={this.handleChangeTitle}/>
							</div> 
							<div className="form-group">
								<label for="description">Description:</label>
						    	<textarea className="form-control" rows="3" id="addDescription"
						    	 name="description" placeholder="Description"
						    	 required  onChange={this.handleChangeDescription}/>
							</div> 
							<div className="form-group">
								<label for="location">Location:</label>
								<input type="text" className="form-control" id="addLocation" name="location" placeholder="location"
								required  onChange={this.handleChangeLocation}/>
							</div> 
	                        <div className="form-group">
								<label for="starttime">Time:</label>
								<input type="datetime-local" className="form-control" id="addTime" name="starttime" placeholder="YYYY-MM-DD HH:MM PM"
								 required  onChange={this.handleChangeStartTime}/>
							</div> 
	                        <div className="form-group">
								<label for="genre">Genre:</label>
								<select className="form-control" id="addGenre" name="genre" required onChange={this.handleChangeGenre}>
									<option>sports</option>
									<option>arts</option>
									<option>science</option>
									<option>social</option>
									<option>other</option>
								</select>
							</div>
	                         <div className="form-group">
	                         	<div className="row">
									<div className="col-sm-4">
										<label for="min_participants">Min Participants:</label>
										<input type="number" name="min_participants" min="1" placeholder="1"
										className="form-control" required onChange={this.handleChangeMinParticipants}/>
									</div>
									<div className="col-sm-4">
										<label for="max_participants">Max Participants:</label>
										<input type="number" name="max_participants" min={this.state.min_participants} placeholder="2"
										className="form-control" required onChange={this.handleChangeMaxParticipants}/>
									</div>
								</div>
							</div>  
							<input className="btn btn-primary" id="statusButton" type="submit" value="Add Event"
							data-toggle = "modal" data-target = "#myModal"></input>
						</form>

						<div className = "modal fade" id = "myModal" tabindex = "-1" role = "dialog" 
						   aria-labelledby = "myModalLabel" aria-hidden = "true">					
						  	<div className = "modal-dialog">
						    	<div className = "modal-content">						         
									<div className = "modal-header">
										<button type = "button" className = "close" data-dismiss = "modal" aria-hidden = "true">
										      &times;
										</button>
										<h4 className = "modal-title" id = "myModalLabel">
										   Confirm Event Details
										</h4>
									</div>
									<div className = "modal-body">
										<p>title: {this.state.title}</p>
										<p>description: {this.state.description}</p>
										<p>location: {this.state.location}</p>
										<p>Time: {this.state.starttime}</p>
										<p>Genre: {this.state.genre}</p>
										<p>Max Participants: {this.state.max_participants}</p>
										<p>Min Participants: {this.state.min_participants}</p>
									</div>
									<div className = "modal-footer">
										<button type = "button" className = "btn btn-default" data-dismiss = "modal">
										   Cancel
										</button>
										<button type = "button" className = "btn btn-primary" data-dismiss = "modal" onClick={this.createEvent}>
										   Add Event
										</button>
									</div>

						      	</div>
						   	</div>
						</div>
				    </div>
			  	</div>
			</div>
		);
	}
}