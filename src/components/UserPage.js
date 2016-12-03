import React from 'react';
import Logout from './Logout.js';
import Actions from './Actions';
import UserInfo from './UserInfo';
import UserEventManager from './UserEventManager';

export default class UserPage extends React.Component {

  render() {
    const id = this.props.params.id;
    var username={userID: id};
    return (
      <div>
        <div>
        	<UserInfo username={username}/>
        	<UserEventManager username={username}/>
        	<Actions/>
        </div>
      </div>
    );
  }
}

