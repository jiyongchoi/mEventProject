import React from 'react';


export default class AddEventPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {location: '', starttime: '', genre:'', max_participants:'', min_participants:''};
    	this.handleChangeLocation = this.handleChangeLocation.bind(this);
    	this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    	this.handleChangeGenre = this.handleChangeGenre.bind(this);
    	this.handleChangeMaxParticipants = this.handleChangeMaxParticipants.bind(this);
    	this.handleChangeMinParticipants = this.handleChangeMinParticipants.bind(this);
    	this.submit = this.submit.bind(this);
	}

	handleChangeLocation(event) {
    	this.setState({location: event.target.value});
 	}

 	handleChangeStartTime(event) {
    	this.setState({starttime: event.target.value});
 	}

 	handleChangeGenre(event){
 		this.setState({genre: event.target.value});
 	}

 	handleChangeMaxParticipants(event){
 		this.setState({max_participants: event.target.value});
 	}

 	handleChangeMinParticipants(event){
 		this.setState({min_participants: event.target.value});
 	}

 	submit(event){
 		//Submit form
  		event.preventDefault();
 		if(this.state.max_participants > this.state.min_participants){
 			alert(JSON.stringify(this.state));
 		} else {
 			alert("Must have greater max participants than min participants");
 		}
 	}

	render(){
		return( 
			<div class="container">
				<div class="panel panel-default">
				    <div class="panel-heading">Add Event</div>
				    <div class="panel-body">
						<form id="addEventForm" method="get" onSubmit={this.submit}>
							<div class="form-group">
								<label for="location">Location:</label>
								<input type="text" class="form-control" id="addLocation" name="location" placeholder="location"
								pattern="[A-Za-z]+" required  onChange={this.handleChangeLocation}/>
							</div> 
	                        <div class="form-group">
								<label for="starttime">Time:</label>
								<input type="datetime-local" class="form-control" id="addTime" name="starttime" required  onChange={this.handleChangeStartTime}/>
							</div> 
	                        <div class="form-group">
								<label for="genre">Genre:</label>
								<input type="text" class="form-control" id="addGenre" name="genre" placeholder="genre"
								pattern="[A-Za-z]+" required  onChange={this.handleChangeGenre}/>
							</div>
	                         <div class="form-group">
								<label for="max_participants">Max Participants:</label>
								<input type="text" class="form-control" id="addMaxParticipants" name="max_participants" placeholder="Max Participants"
								pattern="[0-9]+" required  onChange={this.handleChangeMaxParticipants}/>
							</div> 
	                         <div class="form-group">
								<label for="min_participants">Min Participants:</label>
								<input type="text" class="form-control" id="addMinParticipants" name="min_participants" placeholder="Min Participants"
								pattern="[0-9]+" required  onChange={this.handleChangeMinParticipants}/>
							</div> 
							<input class="btn btn-default" id="statusButton" type="submit" value="Add Event"></input>
						</form>
				    </div>
			  	</div>
			</div>
		);
	}
}