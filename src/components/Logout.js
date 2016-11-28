import React from 'react';
import axios from 'axios';

export default class Logout extends React.Component {

	constructor(props) {
		super(props);	
		this.lgout = this.lgout.bind(this);

	}

	lgout(event) {
		axios.get("/logout")
				.then(function(response) {
					delete window.localStorage.token;
					window.location = response.data.redirect;
				})
				.catch(function(error) {
					console.log(error);
				});
	}

	render() {
		return (
			<div class="logout">
				<button class="btn btn-danger" onClick={this.lgout}>LOGOUT</button>
			</div>

		)
	}
}