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
    return res.redirect("/");
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

/*
* These are RESTful calls for the front end to make ajax calls to 
*/
//this section is for users
app.post('/userlogin', accessDB.verifyUser); // back-end DB route, for login.js

app.post('/user', accessDB.postUser); // for signup.js

app.delete('/user', checkAuth, accessDB.deleteUser); 

app.post('/getuserinfo', checkAuth, accessDB.getUserInfo);

app.get('/user', checkAuth, accessDB.getUserInfo);



//this section is for events
app.get('/events/:id', checkAuth, accessDB.getEventsOfUser); 
app.post('/addevent', checkAuth, accessDB.addEvent);
app.get('/events', checkAuth, accessDB.getEvents); // make req.query.type in the getAllEvents function differentiate between "all", "location", or 
														// by "genre" so we do for example /events?type="all"
app.post('/events', checkAuth, accessDB.addEvent);
app.delete('/events', checkAuth, accessDB.deleteEvent);

app.post('/reviews', checkAuth, accessDB.addReview);


/*
* These are RESTful calls for the front-end pages
*/
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

app.get('/eventpage/:id/:eventid',  checkAuth, function(req, res) {
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

app.get('/admin/:id', accessDB.verifyAdmin, function(req, res) {
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
})

app.post('/adminEditUser', accessDB.editUser);

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');