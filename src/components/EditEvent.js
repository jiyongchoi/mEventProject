import React from 'react';
import axios from 'axios';
import MainTopNav from './MainTopNav';

export default class EditEvent extends React.Component {
	render(){
		return(
			<div id='editevent'>
				<div className="panel-body">
					<div className="form-group">
						<label for="eventid">EventID:</label>
						<input type="number" min="1" className="form-control" id="editid" name="eventid"
						placeholder="Enter the EventID of the Event you wish to edit" required/>
					</div>
				
					<div className="form-group">
						<label for="title">Title:</label>
						<input type="text" className="form-control" id="editTitle" name="title"
						pattern="[A-Za-z]+"/>
					</div>

					<div className="form-group">
						<label for="description">Description:</label>
						<input type="text" className="form-control" id="editDescription" name="description"
						pattern="[A-Za-z]+"/>
					</div>
					
					<div className="form-group">
						<label for="isCertified">Certification:</label>
						<input type="text" className="form-control" id="editCertification" name="isCertified"
						pattern="[A-Za-z]+"/>
					</div>

					<div className="form-group">
						<label for="location">Location:</label>
						<input type="text" className="form-control" id="editLocation" name="location"
						pattern="[A-Za-z]+"/>
					</div>

					<div className="form-group">
						<label for="starttime">Start Time:</label>
						<input type="datetime-local" className="form-control" id="editStartTime" name="starttime"/>
					</div>

					<div className="form-group">
						<label for="genre">Genre:</label>
						<input type="text" className="form-control" id="editGenre" name="genre"
						pattern="[A-Za-z]+"/>
					</div>

					<div className="form-group">
						<label for="max_participants">Max Participants:</label>
						<input type="number" className="form-control" id="editMaxParticipants" name="max_participants"/>
					</div>

					<div className="form-group">
						<label for="min_participants">Min Participants:</label>
						<input type="number" className="form-control" id="editMinParticipants" name="min_participants"/>
					</div>

					<div className="form-group">
						<label for="host">Host:</label>
						<input type="text" className="form-control" id="editHost" name="host"
						pattern="[A-Za-z]+"/>
					</div>
				</div>
			</div>
		);
	}
}