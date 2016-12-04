import React from 'react';
import axios from 'axios';

export default class ClearDatabase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {message: ''};
		this.clearDatabase = this.clearDatabase.bind(this);
    	this.submit = this.submit.bind(this);
	}

	submit(event) {
		$('#deleteDatabaseModal').modal('show');
  		event.preventDefault();
	}

	clearDatabase(){
		axios.delete('/adminClearDatabase')
		      	.then(function(response) {
		      		this.refs.message.innerText = 'Database cleared.';
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.message.innerText = "Error, see log.";
    				console.log(error.message);
  				}.bind(this));
	}

	render() {
		return(
		<div id='clear'>
			<div className="panel-body">
				<form id="cleardatabaseform" method="post" onSubmit={this.submit}>
					<div id="cleardatabase">
						<div className="panel-body">
							<input className="btn btn-default" id="clearButton" type="submit" value="Clear Database"></input>
						</div>
					</div>
				</form>
				<div id="message" ref="message"></div>
			</div>
			<div className = "modal fade" id = "deleteDatabaseModal" tabindex = "-1" role = "dialog" 
			   aria-labelledby = "myModalLabel" aria-hidden = "true">					
			  	<div className = "modal-dialog">
			    	<div className = "modal-content">						         
						<div className = "modal-header">
							<button type = "button" className = "close" data-dismiss = "modal" aria-hidden = "true">
							      &times;
							</button>
							<h4 className = "modal-title" id = "myModalLabel">
							   Confirm Delete Database
							</h4>
						</div>
						<div className = "modal-body">
							<p>Are you sure you want to clear the database?</p>
						</div>
						<div className = "modal-footer">
							<button type = "button" className = "btn btn-default" data-dismiss = "modal">
							   Cancel
							</button>
							<button type = "button" className = "btn btn-primary" data-dismiss = "modal" onClick={this.clearDatabase}>
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