import React from 'react';

export default class UserInfo extends React.Component{
	render(){
		//const { user } = this.props;

		var { user } = { username: "default", rating: "5 "};

		if(this.props != undefined){
			var { user } = this.props;
		}
		
		return (
			<div className="panel panel-default">
				<div className="panel-heading">User</div>
				<div className="panel-body">
					<div>Username: {user.username}</div>
					<div>Rating: {user.rating}</div>
					<div>List of Events Go Here</div>
				</div>
			</div>
		);
	}

}
