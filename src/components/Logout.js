import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

export default class Logout extends React.Component {

	constructor(props) {
		super(props);	
		this.lgout = this.lgout.bind(this);

	}
	// Logs the user out and redirects them to the login page
	lgout(event) {
		axios.get("/logout")
				.then(function(response) {
					browserHistory.push(response.data.redirect);
				})
				.catch(function(error) {
					console.log(error);
				});
	}

	render() {
		return (
			<button className="btn btn-danger" onClick={this.lgout}>LOGOUT</button>
		);
	}
}