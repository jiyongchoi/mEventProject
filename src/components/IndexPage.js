// src/components/IndexPage.js

import React from 'react';
import LoginForm from './Login';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="LoginSection">
          <LoginForm/>
        </div>
      </div>
    );
  }
}

