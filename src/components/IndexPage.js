// src/components/IndexPage.js

import React from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import TopNav from './TopNav';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <LoginForm/>
        </div>
        <div className="col-sm-6">
          <SignupForm/>
        </div>
      </div>
    );
  }
}

