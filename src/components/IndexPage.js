// src/components/IndexPage.js

import React from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import TopNav from './TopNav';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="LoginSection">
          <TopNav/>
          <LoginForm/>
          <SignupForm/>
        </div>
      </div>
    );
  }
}

