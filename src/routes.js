// src/routes.js

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import MainPage from './components/MainPage';

import EventPage from './components/EventPage';
import AddEventPage from './components/AddEventPage';
import AdminPage from './components/AdminPage';

import axios from 'axios';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} />
    <Route path="mainpage/:id" component={MainPage}/>
    <Route path="userpage/:id" component={UserPage}/>
    <Route path="eventpage/:id/:eventid" component={EventPage}/>
    <Route path="addeventpage/:id" component={AddEventPage}/>
    <Route path="admin/:id" component={AdminPage}/>
  </Route>
);

export default routes;

// onEnter={alreadyAuthen}