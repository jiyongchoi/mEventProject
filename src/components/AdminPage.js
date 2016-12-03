import React from 'react';
import Collapsible from 'react-collapsible';
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import EditEvent from "./EditEvent";
import ClearDatabase from "./ClearDatabase";
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
						<EditEvent/>
					</Collapsible>
				</div>
			</div>

			
			<div className="panel panel-default">
				<div className="panel-heading">
					<Collapsible trigger="Clear Database">
						<ClearDatabase/>
					</Collapsible>
				</div>
			</div>
		</div>
		);
	}
}