// src/components/Layout.js

import React from 'react';
import TopNav from './TopNav';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
		    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
        <TopNav/>
        <div className="app-content">{this.props.children}</div>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 
      </div>
    );
  }
}
