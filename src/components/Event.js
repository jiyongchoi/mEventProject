import React from 'react';


export default class Event extends React.Component{

	render(){
		//const { event : { name } } = this.props;
		//alert(JSON.stringify(this.props));
		//{"event":{"name":"event1"}}
			<div className="panel panel-default">
				<div className="panel-heading">name</div>
				<div className="panel-body">
					<div className="list-group">
					    <h4 className="hostname">Host Here</h4>
		          		<h4 className="name">Name Here</h4>
		          		<h4 className="location">Location Here</h4>
		          		<h4 className="time">Time Here</h4>
				  	</div>
				</div>
			</div>
	}
}