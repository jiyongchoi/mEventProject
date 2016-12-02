import React from 'react';
import Logout from './Logout.js';
import UserInfo from './UserInfo';
import UserEventManager from './UserEventManager';

export default class UserPage extends React.Component {

  render() {
  	const user = this.props.params.id;
    return (
      <div>
        <div>
        	<UserInfo id={user}/>
        	<UserEventManager id={user}/>
        	<Logout/>
        </div>
      </div>
    );
  }
}

