import React from 'react';
import Logout from './Logout.js';

export default class UserPage extends React.Component {

  render() {
    return (
      <div className="user">
        <div className="UserSection">
        	<Logout/>
        </div>
      </div>
    );
  }
}

