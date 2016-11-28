import React from 'react';
import TopNav from './TopNav';

export default class AdminPage extends React.Component {
	render() {
		console.log(document.cookie);
		return (
		<div className="container-fluid">
			<button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#EditUser">
			Edit User
			</button>
			<div id="EditUser" className="collapse-in">
			Hello
			</div>
			
			<button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#DeleteUser">
			Delete User
			</button>
			<div id="DeleteUser" className="collapse-in">
			//Delete user object
			</div>
			
			<button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#EditEvent">
			Edit Event
			</button>
			<div id="EditEvent" className="collapse-in">
			//Edit event object
			</div>
			
			<button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#CertifyEvent">
			Certify Event
			</button>
			<div id="CertifyEvent" className="collapse-in">
			//Certify event object
			</div>
			
			<button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#ClearDatabase">
			Clear Database
			</button>
			<div id="ClearDatabase" className="collapse-in">
			//Clear Database object
			</div>
		</div>
		);
	}
}