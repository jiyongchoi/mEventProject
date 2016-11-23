// src/components/Layout.js

import React from 'react';
import TopNav from './TopNav';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
		<TopNav/>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            Test for mEvent
          </p>
        </footer>
      </div>
    );
  }
}
