import React from 'react';


export default class WriteReview extends React.Component{
	render(){
		return (
			<div className="container">
				<div className="row" style="margin-top:40px;">
					<div className="col-md-6">
			    	<div className="well well-sm">
			            <div className="text-right">
			                <a className="btn btn-success btn-green" href="#reviews-anchor" id="open-review-box">Leave a Review</a>
			            </div>
			        
			            <div className="row" id="post-review-box" style="display:none;">
			                <div className="col-md-12">
			                    <form accept-charset="UTF-8" action="" method="post">
			                        <input id="ratings-hidden" name="rating" type="hidden"> 
			                        <textarea className="form-control animated" cols="50" id="new-review" name="comment" placeholder="Enter your review here..." rows="5"></textarea>
			        
			                        <div className="text-right">
			                            <div className="stars starrr" data-rating="0"></div>
			                            <a className="btn btn-danger btn-sm" href="#" id="close-review-box" style="display:none; margin-right: 10px;">
			                            <span className="glyphicon glyphicon-remove"></span>Cancel</a>
			                            <button className="btn btn-success btn-lg" type="submit">Save</button>
			                        </div>
			                    </form>
			                </div>
			            </div>
			        </div> 
			         
					</div>
				</div>
			</div>
		);
	}
}