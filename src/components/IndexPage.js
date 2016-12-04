import React from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import LoginTopNav from './LoginTopNav';

export default class IndexPage extends React.Component {

	render() {
		//Login page. Contains login and sign up components
		//Loads special login navbar with little functionality
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

