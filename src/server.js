import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import path from 'path';
import bodyParser from 'body-parser';
import accessDB from './accessDB';

// var express = require('express');
//var dbQueries = require('./dbQueries');
// var bodyParser = require('body-parser');

var app = Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));
app.use( bodyParser.json() );      
 app.use(bodyParser.urlencoded({     
    extended: true
 }));

app.get('/', function(req, res) {
	match({routes, location: req.url},
		function (err, renderProps) {
			if (err) {
				return res.status(500).send(err.message);
			}
			let markup;
			if (renderProps) {
				markup = renderToString(<RouterContext {...renderProps}/>);
			}
			return res.render('index', { markup });
		});
});

// app.get('/', function(req, res) {
// 	res.sendfile('public/index.html');
// });

 app.get('/user', accessDB.getUser); // ajax
 app.get('/userpage', function(req, res) {
 	match({routes, location: req.url},
		function (err, renderProps) {
			if (err) {
				return res.status(500).send(err.message);
			}
			let markup;
			if (renderProps) {
				markup = renderToString(<RouterContext {...renderProps}/>);
			}
			return res.render('index', { markup });
		});
 });
//app.post('/user', routes.postUser);
//app.delete('/user', routes.deleteUser);

app.listen(3000);
console.log('Listening on port 3000...');