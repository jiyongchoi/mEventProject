// src/routes.js

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import MainPage from './components/MainPage';
import authen from './components/authen';
import axios from 'axios';

let current_session = '';

function alreadyAuthen(nextState, replace) {
	axios.get("/current_session")
		.then(function(response) {
			
		})
		
	if (!authen.loggedIn()) {
		replace({
	      pathname: '/mainpage/' + current_session,
	      state: { nextPathname: nextState.location.pathname }
	    });
	}
}

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} onEnter={alreadyAuth}/>
    <Route path="mainpage/:id" component={MainPage}/>
  </Route>
);

export default routes;