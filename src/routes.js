// src/routes.js

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import MainPage from './components/MainPage';
import EventPage from './components/EventPage';
import AddEventPage from './components/AddEventPage';
import axios from 'axios';

let current_session = '';
/*
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
}*/

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} />
    <Route path="mainpage/:id" component={MainPage}/>
    <Route path="eventpage/:id" component={EventPage}/>
    <Route path="addeventpage" component={AddEventPage}/>
  </Route>
);

export default routes;