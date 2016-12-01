import React from 'react';
import TopNav from './TopNav';
import Collapsible from 'react-collapsible';

export default class AdminPage extends React.Component {
	render() {
		console.log(document.cookie);
		return (
		<div className="container-fluid">
			<Collapsible trigger="Edit User">
			<div>Edit User goes here</div>
			</Collapsible>

			<Collapsible trigger="Delete User">
			<div>Delete User</div>
			</Collapsible>			
			
			<Collapsible trigger="Edit Event">
			<div>Edit Event</div>
			</Collapsible>
			
			<Collapsible trigger="Certify Event">
			<div>Certify Event</div>
			</Collapsible>
			
			<Collapsible trigger="Clear Database">
			<div>Certify Event</div>
			</Collapsible>
		</div>
		);
	}
}