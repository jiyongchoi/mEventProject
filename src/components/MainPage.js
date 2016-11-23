import React from 'react';
import Logout from './Logout.js';


export default class MainPage extends React.Component {

// componentdidmount (ajax call to get all events)


	  render() {
	    return (
	      <div className="MainPage">
	        <div className="MainSection">
	        	<Logout/>
	        	<p>THIS IS WHERE CURRENT USER PREVIEW GOES</p>
	        	<h3>Events</h3>
	        	<p>THIS IS WHERE THE SORT BY SELECTOR GOES</p>
	        	<p>THIS IS WHERE THE EVENT PREVIEWS GO</p>
	        </div>
	      </div>
	    );
	  }
}

