var pgp = require('pg-promise')(/*options*/)
pgp.pg.defaults.ssl = true;
var db = pgp('postgres://vsxebhuzjkklry:-zfG7Ek8uDVo1Rh7VEcyYSy0AR@ec2-23-23-224-174.compute-1.amazonaws.com:5432/d6utk5i40rffqd');

/*
* FUNCTIONS FOR USERS
*/

/*
* User and password validation, POST function
*/

exports.verifyAdmin = function (req, res, next) {
  var potential_admin = req.params.id;
  db.one('SELECT * from getUserInfo($1);', [potential_admin])
    .then(function(data) {
      if (data.accountType.localeCompare("admin") = 0) {
          //is admin, proceed
          next();
      }
      else {
          // redirect to the mainpage
          return res.redirect("/mainpage/" + potential_admin);
      }
    })
    .catch(error) {
      res.status.send("error verifying admin status");
    }
}

exports.verifyUser = function(req, res, next) {
  var post = req.body;
  var username = post.username
  var password = post.password;
  db.one('SELECT * FROM getUser($1, $2);', [username, password])
  .then(function (data) {
    if (data.username != null) {
      req.session.username = data.username;
      //res.send("User verified");
      res.status(200).send({redirect: "/mainpage/" + data.username});
    }
    else {
      res.status(200).send("bad username/password");
    }
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.status(400).json({
      status: 'failure',
      message: 'could not retrive user'
    })
  });
};


exports.getUserInfo = function(req, res, next) {
  var username = req.body.username;
  db.one('SELECT * FROM getUserInfo($1);', [username])
  .then(function (data) {
    if (data.username != null) {
      req.session.username = data.username;
      res.status(200).send(data);
    }
    else {
      res.status(200).send("bad username");
    }
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.status(400).json({
      status: 'failure',
      message: 'could not retrive user'
    })
  });
};

exports.postUser = function(req, res, next) {
    var post = req.body;
    var username = post.username;
    var password = post.password;
    var fname = post.fname;
    var surname = post.surname;

    db.one('SELECT * FROM postUser($1, $2, $3, $4, $5);', [username, password, fname, surname, 'client'])
    .then(function (data) {
        req.session.username = username;
        res.status(200).send({redirect: "/mainpage/"+username});
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
}; 

exports.deleteUser = function(req, res, next) {
    var post = req.body;
    var username = post.username;

    db.one('SELECT * FROM deleteUser($1);', [username])
    .then(function (data) {
        res.status(200).send('Success');
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
}; 

/*
* FUNCTIONS FOR EVENTS
*/
exports.getAllEvents = function(req, res, next) {
    db.any('SELECT * FROM getEvents();')
        .then(function (data) {
          console.log('EVENTDATA: ' + data);
           res.status(200).send(data);
        })
        .catch(function(error) {
           res.status(400).send(data);
        })
}

exports.getEvents = function (req, res, next) {
    var type = req.query.type;
    if (type.localeCompare("all") == 0) {
        db.any('SELECT * FROM getEvents();')
        .then(function (data) {
           console.log("FROM SERVER:"+data);
           res.status(200).send(data);
        })
        .catch(function(error) {
           res.status(400).send(data);
        })
    }
    else if (type.localeCompare("genre") == 0) {
        var genre = req.query.genre;
        if (typeof genre != "undefined") {
          db.any('SELECT * FROM getEventsByGenre($1);', [genre])
          .then(function (data) {
             res.status(200).send(data);
          })
          .catch(function(error) {
             res.status(400).send(data);
          })
        }
        else {
          res.status(400).send("Please Enter Genre");
        }
        
    }
    else if (type.localeCompare("location") == 0) {
        var location = req.query.location;
        if (typeof location != "undefined") { 
            db.any('SELECT * FROM getEventsByLocation($1);', [location])
              .then(function (data) {
                 res.status(200).send(data);
              })
              .catch(function(error) {
                 res.status(400).send(data);
              })
        }
        else {
          res.status(400).send("Please Enter Location");
        }
    }

    else if (type.localeCompare("max") == 0) {
        console.log("Getting max eventid");
        db.one('SELECT * FROM getMaxEventID();')
          .then(function (data) {
             console.log("MAX EVENT ID: "+data);
             res.status(200).send(data);
          })
          .catch(function(error) {
             console.log("ERROR: "+error);
             res.status(400).send(data);
          })
    }

    // for EventPage
    else if (type.localeCompare("eventid") == 0) {
        var eventid = req.query.eventid;
        db.one('SELECT * FROM ', [])
    }
}

exports.addEvent = function(req, res, next) {
    var post = req.body;
    console.log('POST: ', post);
    var location = post.location;
    var starttime = post.starttime;
    var genre = post.genre;
    var max_participants = parseInt(post.max_participants);
    var min_participants = parseInt(post.min_participants);
    //Person logged in will be the host
    var host = req.session.username;
    var eventid = post.eventid;
    var rating = parseInt(post.rating);

    db.one('SELECT * FROM createEvent($1, $2, $3, $4, $5, $6, $7, $8);', [eventid, location, host, starttime, genre, rating, max_participants, min_participants])
    .then(function (data) {
        console.log('FROM SERVER:', data);
        res.status(200).send({redirect: "/eventpage/"+eventid});
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
}; 

// get all the events, past and future
exports.getEventsOfUser = function(req, res, next) {
  //TODO
  var user = req.params.id;
  db.any('SELECT * FROM getEventsAll($1)', [user])
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (error)) {
      res.status(400).send(error);
    }
}

exports.deleteEvent = function(req, res, next) {
  //TODO
  var deleventid = req.params.id;
  db.one('SELECT * FROM deleteEvent($1);', [deleventid])
    .then(function(data) {
      res.status(200).send("successfully deleted");
    })
    .catch(function(error) {
      res.status(400).send("error");
    });
}