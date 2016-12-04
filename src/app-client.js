import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
	//Loads React rendered Pages at main on index.html
  	ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};