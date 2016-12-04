// src/components/UserPage.js

import React from 'react';
import Logout from './Logout.js';
import UserInfo from './UserInfo';
import UserEventManager from './UserEventManager';
import MainTopNav from './MainTopNav';

/*
* Express the User (with eventname in the url argument) with its attributes, 
* the events the user are a host for, and the events the user is in the
* attendee list for.
*/
export default class UserPage extends React.Component {

  /*
  * Express what the DOM will look like in the following order:
  * 1) the user's information
  * 2) the usereventmanager, which will display the hosted events, 
  * and the attendee events
  */
  render() {
    const id = this.props.params.id;
    var username={userID: id};
    return (

      <div className="container-fluid">
        <MainTopNav />
        <div className="row">
          <div className="col-sm-4">
          	<UserInfo username={username}/>
          </div>
          <div className="col-sm-8" >
        	 <UserEventManager username={username}/>
          </div>
        </div>
      </div>
    );
  }
}

