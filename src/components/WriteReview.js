import React from 'react';
import axios from 'axios';

export default class WriteReview extends React.Component{
	constructor(props) {
		super(props);
		this.state = {reviewText: "", reviewRating: ""};
		this.changeText = this.changeText.bind(this);
		this.changeRating = this.changeRating.bind(this);
		this.submitReview = this.submitReview.bind(this);
		
	}

	changeText(event) {
		this.setState({reviewText: event.target.value});
	}

	changeRating(event) {
		this.setState({reviewRating: event.target.value})
	}

	submitReview(event) {
		//AJAX CALL to post /reviews, send reviewtext and the eventid
		axios.post('/reviews', {reviewText: this.state.reviewText, 
								eventid: this.props.eventid,
								rating: parseInt(this.state.reviewRating)})
			.then(function(response){
				this.setState({reviewText: "", reviewRating: ""});
				this.refs.submitoutcome.innerText = response.data;
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}.bind(this));
	}

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
				    	<input type="text" placeholder="0-5"
						pattern="[0-5]" required value={this.state.reviewRating} onChange={this.changeRating}/>
				    </div>
			  </form>
			</div>
			<div ref="submitoutcome"></div>
		</div>


			
		);
	}
}