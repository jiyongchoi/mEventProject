// src/components/IndexPage.js

import React from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import UserInfo from './UserInfo';
import EventManager from './EventManager';
import EventPreview from './EventPreview';
import LoginTopNav from './LoginTopNav';

export default class IndexPage extends React.Component {

	render() {
		return (
		<div className="container-fluid">
		    <div className="container">
		    	<LoginTopNav/>
				<div className="row">
					<div className="col-sm-6">
						<LoginForm/>
					</div>
					<div className="col-sm-6">
						<SignupForm/>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

