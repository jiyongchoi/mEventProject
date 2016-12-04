// src/server.js

import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import path from 'path';
import bodyParser from 'body-parser';
import accessDB from './accessDB';

// session will persist
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

/*
* Redirect to index page if session is not active
*/
function checkAuth(req, res, next) {
  if (!req.session.username) {
    return res.redirect("/");
  } else {
    next();
  }
}

/*
* Redirect to index page if the current session is not an admin
*/
function checkAdmin(req, res, next) {
  if (!req.session.accountType == 'admin') {
    return res.redirect("/");
  } else {
    next();
  }
}

/*
* Send identity of current session to front end
*/
app.get('/current_session', function(req, res) {
	console.log(req.session.username);
	if (!req.session.username) {
		return res.send("not active");
	}
	else {
		return res.status(200).send(req.session.username);
	}
});

/*
* These are RESTful calls for the front end to make ajax calls to 
*/
//this section is for users
app.post('/userlogin', accessDB.verifyUser); 
app.post('/user', accessDB.postUser);
app.delete('/user', checkAuth, checkAdmin, accessDB.deleteUser); 
app.post('/getuserinfo', checkAuth, accessDB.getUserInfo);

//this section is for events

app.get('/events/:id', checkAuth, accessDB.getEventsOfUser); 
app.post('/addevent', checkAuth, accessDB.addEvent);
app.get('/events', checkAuth, accessDB.getEvents); // make req.query.type in the getAllEvents function differentiate between "all", "location", or 
														// by "genre" so we do for example /events?type="all"
app.post('/events', checkAuth, accessDB.addEvent);
app.delete('/events', checkAuth, accessDB.deleteEvent);

// this section is for submitting reviews
app.post('/reviews', checkAuth, accessDB.addReview);
app.get('/reviews', checkAuth, accessDB.getReview);

// this section is for eventattendees
app.get('/eventattendees', checkAuth, accessDB.getSignedUp);
app.post('/eventattendees', checkAuth, accessDB.signupEvent);

// this section is for admin use
app.post('/adminEditUser', accessDB.editUser);
app.post('/adminEditEvent', accessDB.editEvent);
/*
* These are RESTful calls for the front-end pages
*/

// Return index page
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

// Return userpage, id is the username of the user to display
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

// Return mainpage, id is the username of the user to display
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

// Return eventpage, eventid is the eventid of the event to display
app.get('/eventpage/:eventid',  checkAuth, function(req, res) {
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

// Log current session out
app.get('/logout', checkAuth, function (req, res) {
	req.session.reset();
	res.send({redirect:"/"});
}); 

// Return add event page, id is the username of the user to add an event
app.get('/addeventpage/:id',  checkAuth, function(req, res) {
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

// Return admin page, id is the username of the user
app.get('/admin/:id', checkAdmin, function(req, res) {
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

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');