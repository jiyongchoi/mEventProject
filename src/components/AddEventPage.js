import React from 'react';
import axios from 'axios';


export default class AddEventPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {location: '', 
					starttime: '', 
					genre:'', 
					max_participants:'2', 
					min_participants:'1',
					host: 'test',
					eventID: '202',
					rating: '0'
				};
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
		alert(JSON.stringify(this.state));
		axios.post('/addevent', this.state)
	      	.then(function (response) {
	      		if (typeof response.data.redirect == 'string') {
					window.location = response.data.redirect;
				}
			}).catch(function (error) {
				console.log(error.message);
			});
 	}

	render(){
		return( 
			<div className="container">
				<div className="panel panel-default">
				    <div className="panel-heading">Add Event</div>
				    <div className="panel-body">
						<form id="addEventForm" method="get" onSubmit={this.submit}>
							<div className="form-group">
								<label for="location">Location:</label>
								<input type="text" className="form-control" id="addLocation" name="location" placeholder="location"
								pattern="[A-Za-z]+" required  onChange={this.handleChangeLocation}/>
							</div> 
	                        <div className="form-group">
								<label for="starttime">Time:</label>
								<input type="datetime-local" className="form-control" id="addTime" name="starttime" required  onChange={this.handleChangeStartTime}/>
							</div> 
	                        <div className="form-group">
								<label for="genre">Genre:</label>
								<input type="text" className="form-control" id="addGenre" name="genre" placeholder="genre"
								pattern="[A-Za-z]+" required  onChange={this.handleChangeGenre}/>
							</div>
	                         <div className="form-group">
	                         	<div className="row">
									<div className="col-sm-4">
										<label for="min_participants">Min Participants:</label>
										<input type="number" name="min_participants" min="1" placeholder="1"
										className="form-control" onChange={this.handleChangeMinParticipants}/>
									</div>
									<div className="col-sm-4">
										<label for="max_participants">Max Participants:</label>
										<input type="number" name="max_participants" min={this.state.min_participants} placeholder="2"
										className="form-control" onChange={this.handleChangeMaxParticipants}/>
									</div>
								</div>
							</div>  
							<input className="btn btn-default" id="statusButton" type="submit" value="Add Event"></input>
						</form>
				    </div>
			  	</div>
			</div>
		);
	}
}