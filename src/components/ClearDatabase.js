import React from 'react';
import axios from 'axios';

export default class ClearDatabase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {message: ''};
    	this.submit = this.submit.bind(this);
	}

	submit(event) {
		axios.delete('/adminClearDatabase')
		      	.then(function(response) {
		      		this.refs.message.innerText = 'Database cleared.';
		      	}.bind(this))
		      	.catch(function (error) {
		      		this.refs.message.innerText = "Error, see log.";
    				console.log(error.message);
  				}.bind(this));
  		event.preventDefault();
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
		</div>
		);
	}
}