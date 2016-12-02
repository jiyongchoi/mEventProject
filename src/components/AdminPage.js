import React from 'react';
import TopNav from './TopNav';
import Collapsible from 'react-collapsible';
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
export default class AdminPage extends React.Component {
	render() {
		console.log(document.cookie);
		return (
		<div className="panel-group">
			<div className="panel panel-default">
				<div className="panel-heading">
					<Collapsible trigger="Edit User">
						<EditUser/>
					</Collapsible>
				</div>
			</div>

			<div className="panel panel-default">
				<div className="panel-heading">
					<Collapsible trigger="Delete User">
						<DeleteUser/>
					</Collapsible>
				</div>
			</div>
		
			
			<div className="panel panel-default">
				<div className="panel-heading">
					<Collapsible trigger="Edit Event">
						Edit Event
					</Collapsible>
				</div>
			</div>

			<div className="panel panel-default">
				<div className="panel-heading">
					<Collapsible trigger="Certify Event">
						Certify Event
					</Collapsible>
				</div>
			</div>
			
			<div className="panel panel-default">
				<div className="panel-heading">
					<Collapsible trigger="Clear Database">
						Clear Database
					</Collapsible>
				</div>
			</div>
		</div>
		);
	}
}