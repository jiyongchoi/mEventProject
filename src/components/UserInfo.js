import React from 'react';

export default class UserInfo extends React.Component{

	render(){
		return (
			<div className="container">
			  //<h2>List Group With Linked Items</h2>
			  <div className="list-group">
			    <a href="#" className="list-group-item">UserName:</a>
			    <a href="#" className="list-group-item">Rating:</a>
			    <a href="#" className="list-group-item">Events:</a>
			  </div>
			</div>
		);
	}

}