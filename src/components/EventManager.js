import React from 'react';
import Event from './Event';

export default class EventManager extends React.Component{
	render(){
		//var events = ["default"];

		//if (this.props != undefined){
		//	events = this.props;
		//}

		const {events} = this.props;

		//alert(JSON.stringify(events));
		//{"1":{"id":1,"name":"Design Patterns: Elements of Reusable Object-Oriented Software","price":57.71,"quantity":1},"2":{"id":2,"name":"React: Up & Running: Building Web Applications","price":42.81,"quantity":1}}
		//{"1":{"name":"event1"},"2":{"name":"event2"}}
		//{"events":{"1":{"name":"event1"},"2":{"name":"event2"}}}
		//var bombs = Object.values(events);
		//[{"1":{"name":"event1"},"2":{"name":"event2"}}]
		//alert(JSON.stringify(bombs));

		return (
		<div className="panel-group">
			
			<div>Events Go Here</div>
        </div>
		);
	}
}
