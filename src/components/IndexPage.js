// src/components/IndexPage.js

import React from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import UserInfo from './UserInfo';
import EventManager from './EventManager';

export default class IndexPage extends React.Component {

	constructor() {
		super();

		this.state = {
			user: { username : "Clayton", rating:"5"},
			events: {
					1 : {
							name: "event1"
						},
					2 : {
							name: "event2"
						},
					},
		};
	}

	render() {
		return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-6">
					<LoginForm/>
				</div>
				<div className="col-sm-6">
					<SignupForm/>
				</div>
			</div>
		</div>
		);
	}
}

