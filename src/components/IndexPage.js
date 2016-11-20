// src/components/IndexPage.js

import React from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="LoginSection">
          <LoginForm/>
          <SignupForm/>
        </div>
      </div>
    );
  }
}

