import React from 'react';
import axios from 'axios';

export default class ClearDatabase extends React.Component {
	render() {
		return(
		<div id="cleardatabase">
			<div className="panel-body">
				<input className="btn btn-default" id="clearButton" type="submit" value="Clear Database"></input>
			</div>
		</div>
		);
	}
}