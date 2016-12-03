import React from 'react';
import Logout from './Logout.js';
import Actions from './Actions';
import UserInfo from './UserInfo';
import UserEventManager from './UserEventManager';
import MainTopNav from './MainTopNav';

export default class UserPage extends React.Component {

  render() {
    const id = this.props.params.id;
    var username={userID: id};
    return (
<<<<<<< HEAD
      <div>
        <div>
        	<UserInfo username={username}/>
        	<UserEventManager username={username}/>
        	<Actions/>
=======
      <div className="container-fluid">
        <MainTopNav username={username} />
        <div className="row">
          <div className="col-sm-4">
          	<UserInfo username={username}/>
          </div>
          <div className="col-sm-8" >
        	 <UserEventManager username={username}/>
          </div>
>>>>>>> f5db0cda54144278b27200cffdba07bb5515717f
        </div>
      </div>
    );
  }
}

