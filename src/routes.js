// src/routes.js

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import MainPage from './components/MainPage';
// import authen from './components/authen';
import axios from 'axios';


function alreadyAuthen(nextState, replace, cb) {
	// for already logged in state
	let current_session = '';
	axios.get("/current_session")
		.then(function(response) {
			current_session = response.data;	
		})
		.catch(function(error) {
			console.log(error);
		});
	if (current_session.localeCompare("") != 0) {
		replace({
      		pathname: '/mainpage' + current_session,
      		state: { nextPathname: nextState.location.pathname }
    	});
	}

	cb();

}

function loggedOut(nextState, replace, cb) {
	let current_session = '';
	axios.get("/current_session")
		.then(function(response) {
			current_session = response.data;	
		})
		.catch(function(error) {
			console.log(error);
		});
	if (current_session.localeCompare("") == 0) {
		replace({
      		pathname: '/',
      		state: { nextPathname: nextState.location.pathname }
		})
	}

	cb();
}

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} onEnter={alreadyAuthen}/>
    <Route path="mainpage/:id" component={MainPage} onEnter={loggedOut}/>
  </Route>
);

export default routes;

// onEnter={alreadyAuthen}