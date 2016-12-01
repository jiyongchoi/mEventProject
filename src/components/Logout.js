import React from 'react';
import axios from 'axios';
// import localStorage from 'react-localstorage';

export default class Logout extends React.Component {

	constructor(props) {
		super(props);	
		this.lgout = this.lgout.bind(this);

	}

	lgout(event) {
		axios.get("/logout")
				.then(function(response) {
					localStorage.removeItem("token");
					window.location = response.data.redirect;
				})
				.catch(function(error) {
					console.log(error);
				});
	}

	render() {
		return (
			<div class="logout">
				<button className="btn btn-danger" onClick={this.lgout}>LOGOUT</button>
			</div>

		)
	}
}