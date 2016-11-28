import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import path from 'path';
import bodyParser from 'body-parser';
import accessDB from './accessDB';

var session = require("client-sessions");
var uuid = require('node-uuid');
var app = Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({     
    extended: true
}));

app.use(session({
  cookieName: 'session',
  secret: uuid.v1()
}))

function checkAuth(req, res, next) {
  if (!req.session.username) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

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

 app.post('/userlogin', accessDB.verifyUser); // back-end DB route

 app.post('/user', accessDB.postUser);

 app.delete('/user', accessDB.deleteUser);

 app.get('/allevents', accessDB.getAllEvents);

 app.get('/userpage/:id', checkAuth, function(req, res) {
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

app.get('/mainpage/:id', checkAuth, function(req, res) {
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

app.get('/eventpage/:id',  checkAuth, function(req, res) {
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

app.get('/logout', checkAuth, function (req, res) {
	req.session.reset();
	res.send({redirect:"/"});
}); 

app.listen(3000);
console.log('Listening on port 3000...');