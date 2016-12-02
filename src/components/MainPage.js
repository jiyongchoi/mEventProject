import React from 'react';
import UserInfo from './UserInfo.js';
import EventManager from './EventManager.js';
import Actions from './Actions';
import axios from 'axios';



export default class MainPage extends React.Component {
// componentdidmount (ajax call to get all events)
	constructor() {
		super();
		this.state = {
			user: { username : "RcBobo", 
					rating:"5", 
					firstname:"Jovan", 
					surname:"Maric"}
		};
	}

	render() {
		//Gets URL paramater as username to load userinfo 
		const id = this.props.params.id;
		var username={userID: id};
		return (
	    <div className="container-fluid">
			<div className="row">
				<div className="col-sm-4">
					<UserInfo
						username={username}
					/>
					<Actions/>
				</div>
				<div className="col-sm-8" >
					<EventManager/>
				</div>
			</div>
		</div>
		);
	}
}

