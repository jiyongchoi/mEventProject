// src/routes.js

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import MainPage from './components/MainPage';
// import authen from './components/authen';
import axios from 'axios';
// import localStorage from 'react-localstorage';


// function alreadyAuthen(nextState, replace, cb) {
// 	// for already logged in state
// 	let current_session = '';
// 	axios.get("/current_session")
// 		.then(function(response) {
// 			current_session = response.data;	
// 		})
// 		.catch(function(error) {
// 			console.log(error);
// 		});
// 	if (current_session.localeCompare("") != 0) {
// 		replace({
//       		pathname: '/mainpage' + current_session,
//       		state: { nextPathname: nextState.location.pathname }
//     	});
// 	}

// 	cb();

// }

function loggedOut(nextState, replace, cb) {
	let current_session = '';
	axios.get("/current_session")
		.then(function(response) {
			current_session = response.data;	
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		}.bind(this));
	console.log("SESSION: " + current_session);
	// if (current_session.localeCompare("") == 0) {
	// 	replace({
 //      		pathname: '/',
 //      		state: { nextPathname: nextState.location.pathname }
	// 	})
	// }
	var tok = JSON.parse(localStorage.getItem('token'));
	console.log("TOKEN: " + tok);
	if (JSON.parse(localStorage.getItem("token"))) {
		replace({
      		pathname: '/',
      		state: { nextPathname: nextState.location.pathname }
		});
	}

	cb();
}

function alreadyAuthen(nextState, replace, cb) {
	let current_session = '';
	axios.get("/current_session")
		.then(function(response) {
			current_session = response.data;	
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		}.bind(this));
	console.log("asdfasdf");
	console.log("session: " + current_session);
	var tok = JSON.parse(localStorage.getItem('token'));
	console.log("token: " + tok);
	if (JSON.parse(localStorage.getItem("token"))) {
		replace({
      		pathname: '/mainpage/' + current_session,
      		state: { nextPathname: nextState.location.pathname }
    	});
	}
	cb();
}

// function loggedOut(nextState, replace, cb) {
// 	// if (typeof localStorage.token == "undefined") {
// 	// 	replace({
//  //      		pathname: '/',
//  //      		state: { nextPathname: nextState.location.pathname }
// 	// 	})
// 	// }
// 	if (localStorage.token) {
// 		replace({
//       		pathname: '/mainpage',
//       		state: { nextPathname: nextState.location.pathname }
//     	});
// 	}
// 	cb();
// }

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} onEnter={alreadyAuthen}/>
    <Route path="mainpage/:id" component={MainPage} onEnter={loggedOut}/>
  </Route>
);

export default routes;

// onEnter={alreadyAuthen}