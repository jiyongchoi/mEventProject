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

app.get('/current_session', function(req, res) {
	console.log(req.session.username);
	if (!req.session.username) {
		return res.send("not active");
	}
	else {
		return res.status(200).send(req.session.username);
	}
});

app.post('/userlogin', accessDB.verifyUser); // back-end DB route

app.post('/usersignup', accessDB.postUser); // back-end DB route

app.get('/allevents', checkAuth, accessDB.getAllEvents);

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

/*function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}*/

app.get('/logout', checkAuth, function (req, res) {
	req.session.reset();
	res.send({redirect:"/"});
}); 

app.post('/user', accessDB.postUser);
//app.delete('/user', routes.deleteUser);

app.listen(3000);
console.log('Listening on port 3000...');