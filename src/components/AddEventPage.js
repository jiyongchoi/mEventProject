import React from 'react';
import axios from 'axios';
import MainTopNav from './MainTopNav';

export default class AddEventPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
					eventid: 1,
					title: '',
					description: '',
					isCertified: false,
					location: '', 
					starttime: '', 
					genre:'', 
					max_participants:'', 
					min_participants:'',
					host: '',
					rating: '0'
				};
    	this.handleChangeLocation = this.handleChangeLocation.bind(this);
    	this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    	this.handleChangeGenre = this.handleChangeGenre.bind(this);
    	this.handleChangeMaxParticipants = this.handleChangeMaxParticipants.bind(this);
    	this.handleChangeMinParticipants = this.handleChangeMinParticipants.bind(this);
    	this.handleChangeTitle = this.handleChangeTitle.bind(this);
    	this.handleChangeDescription = this.handleChangeDescription.bind(this);
    	this.submit = this.submit.bind(this);
    	
	}

	componentDidMount() {
		axios.get('/events?type=max')
  			.then(
  				res => {
  					const eventid = res.data.getmaxeventid;
			        this.setState({ eventid });
			    }
			).catch(function (error) {
				console.log(error.message);
			});
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

 	handleChangeTitle(event){
 		this.setState({title: event.target.value});
 	}

 	handleChangeDescription(event){
 		this.setState({description: event.target.value});
 	}

 	submit(event){
 		//Submit form
  		event.preventDefault();
  		//Get the max eventid from the database
  		
		alert(JSON.stringify(this.state));
		axios.post('/addevent', this.state)
	      	.then(function (response) {
	      		if (typeof response.data.redirect == 'string') {
					window.location = response.data.redirect;
				}
			}).catch(function (error) {
				alert(this.state);
				console.log(error.message);
			});
 	}

	render(){
		const id = this.props.params.id;
		var username={userID: id};

		return( 
			<div className="container">
				<MainTopNav
					username={username}
				/>
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
								<input type="datetime-local" className="form-control" id="addTime" name="starttime" required  onChange={this.handleChangeStartTime}/>
							</div> 
	                        <div className="form-group">
								<label for="genre">Genre:</label>
								<select className="form-control" id="addGenre" name="genre" required onChange={this.handleChangeGenre}>
									<option>sports</option>
									<option>arts</option>
									<option>science</option>
									<option>social</option>
									<option>others</option>
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
							<input className="btn btn-default" id="statusButton" type="submit" value="Add Event"></input>
						</form>
				    </div>
			  	</div>
			</div>
		);
	}
}