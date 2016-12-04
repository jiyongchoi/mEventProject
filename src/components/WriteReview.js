// src/components/WriteReview.js

import React from 'react';
import axios from 'axios';

/*
* Express a module for leaving a review and rating for an event, 
* specified by this.props.eventid
*/
export default class WriteReview extends React.Component{

	// The contructor of the WriteReview class
	constructor(props) {
		super(props);
		this.state = {reviewText: "", reviewRating: 0};
		this.changeText = this.changeText.bind(this);
		this.changeRating = this.changeRating.bind(this);
		this.submitReview = this.submitReview.bind(this);
	}

	// Set reviewText as the client types and changes the review text
	changeText(event) {
		this.setState({reviewText: event.target.value});
	}

	// Set reviewRating as the client types and changes the rating number 
	changeRating(event) {
		this.setState({reviewRating: event.target.value})
	}

	/*
	* Submit the review of the event through an ajax call
	*/
	submitReview(event) {
		axios.post('/reviews', {reviewText: this.state.reviewText, 
								eventid: this.props.eventid,
								rating: parseInt(this.state.reviewRating)})
			.then(function(response){
				this.setState({reviewText: "", reviewRating: ""});
				alert(response.data);
				location.reload();
				this.refs.submitoutcome.innerText = response.data;
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}.bind(this));
	}

	/*
	* Express what the DOM will look like in the following order:
	* 1) A section to place a review 
	* 2) A section to place a rating
	*/
	render(){
		return (
		<div className="panel panel-default">
			<div className="panel-heading">Review</div>
			<div className="panel-body">
			  	<form onSubmit={this.submitReview}>
				    <div className="form-group">
				    	<label for="comment">Leave a Review:</label>
				    	<textarea maxLength="1000" placeholder="Great Review!" class="form-control" rows="3" id="comment" value={this.state.reviewText}
				    		required onChange={this.changeText}>
				    	</textarea>
				    	<label>Leave a rating (out of 5, higher being better):</label>
				    	<input type="number" placeholder="0-5"
						min="0" max="5" required value={this.state.reviewRating} onChange={this.changeRating}/>
						 <input className="btn btn-default" type="submit"></input>
				    </div>
			  </form>
			</div>
			<div ref="submitoutcome"></div>
		</div>


			
		);
	}
}