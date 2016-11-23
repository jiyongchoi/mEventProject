import React from 'react';


export default class WriteReview extends React.Component{
	render(){
		return (
		<div className="panel panel-default">
			<div className="panel-heading">Review</div>
			<div className="panel-body">
			  	<form>
				    <div className="form-group">
				    	<label for="comment">Leave a Review:</label>
				    	<textarea class="form-control" rows="3" id="comment"></textarea>
				    </div>
			  </form>
			</div>
		</div>


			
		);
	}
}