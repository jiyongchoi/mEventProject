// src/routes.js

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import MainPage from './components/MainPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="mainpage/:id" component={MainPage}/>
  </Route>
);

export default routes;