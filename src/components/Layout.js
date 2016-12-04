import React from 'react';

export default class Layout extends React.Component {
  render() {
  	//Top level. All children pages are loaded from here
  	//Load bootstrap and jQuery here
    return (
      <div className="app-container">
	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
	    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 

        <div className="app-content">{this.props.children}</div>

        <footer className="footer">
        	<p className="text-muted">  
        		<span className="glyphicon glyphicon-copyright-mark"></span>
        		 Alexandru Baluta, Ji Yong Choi, Lukas Frantzke, Jovan Maric
        	</p>
        </footer>
      </div>
    );
  }
}
