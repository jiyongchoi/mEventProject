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
  db.one('SELECT * from appData.getUserInfo($1);', [potential_admin])
    .then(function(data) {
      if (data.accountType.localeCompare("admin") == 0) {
          //is admin, proceed
          next();
      }
      else {
          // redirect to the mainpage
          return res.redirect("/mainpage/" + potential_admin);
      }
    })
    .catch(function(error) {
      res.status.send("error verifying admin status");
      }
    );
};

exports.verifyUser = function(req, res, next) {
  var post = req.body;
  var username = post.username
  var password = post.password;
  db.one('SELECT * FROM appData.getUser($1, $2);', [username, password])
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
  db.one('SELECT * FROM appData.getUserInfo($1);', [username])
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

    db.one('SELECT * FROM appData.postUser($1, $2, $3, $4, $5);', [username, password, fname, surname, 'client'])
    .then(function (data) {
        req.session.username = username;
        res.status(200).send({redirect: "/mainpage/"+username});
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
}; 

/*exports.editUser = function(req, res, next) {
    var post = req.body;
    var username = post.username;
    var password = post.password;
    var fname = post.fname;
    var surname = post.surname;
    var accountType = post.accountType;
    var queryParam = 'UPDATE appData.UserInfo SET username = ';

    if(!(username.localeCompare('') = 0)) {
      queryParam += 'username = ' + username;
    }
    if(!(password.localeCompare('') = 0)) {
      queryParam += 'password = ' + password;
    }
    if(!(fname.localeCompare('') = 0)) {
      queryParam += 'fname = ' + fname;
    }
    if(!(surname.localeCompare('') = 0)) {
      queryParam += 'surname = ' + surname;
    }
    if(!(accountType.localeCompare('') = 0)) {
      queryParam += 'accountType = ' + accountType;
    }
    queryParam += ' WHERE username = ' + username + ';';

};*/

exports.deleteUser = function(req, res, next) {
    var post = req.body;
    var username = post.username;

    db.one('SELECT * FROM appData.deleteUser($1);', [username])
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
    db.any('SELECT * FROM appData.getEvents();')
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
    // for all future events
    if (type.localeCompare("all") == 0) {
        db.any('SELECT * FROM appData.getEvents();')
        .then(function (data) {
           console.log("EVENT LIST FROM SERVER:"+JSON.stringify(data));
           res.status(200).send(data);
        })
        .catch(function(error) {
           res.status(400).send(data);
        })
    }
    else if (type.localeCompare("genre") == 0) {
        var genre = req.query.genre;
        if (typeof genre != "undefined") {
          db.any('SELECT * FROM appData.getEventsByGenre($1);', [genre])
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
            db.any('SELECT * FROM appData.getEventsByLocation($1);', [location])
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
        db.one('SELECT * FROM appData.getMaxEventID();')
          .then(function (data) {
             console.log("MAX EVENT ID: "+ JSON.stringify(data));
             res.status(200).send(data);
          })
          .catch(function(error) {
             console.log("ERROR: "+error);
             res.status(400).send(data);
          });
    }

    else if(type.localeCompare("hosted") == 0) {
        var username = req.query.username;
        if (typeof username != "undefined") {
            db.any('SELECT * FROM appData.getEventsByHost($1);' [username])
                .then(function(data) {
                  res.status(200).send(data);
                })
                .catch(function(error) {
                  res.status(400).send("error found in backend");
                });
        }
        else {
            res.status(400).send("username undefined");
        }
        
    }
    else if(type.localeCompare("hasattended") == 0) {
        var username = req.session.username;
        var eventid = req.query.eventid;
        if (typeof eventid != "undefined") {
            db.one('SELECT * FROM appData.verifyAttendance($1, $2);' [username, eventid])
              .then(function(data) {
                  if (data.eventid != null) {
                      res.send(true);
                  }
                  else {
                      res.send(false);
                  }
              })
              .catch(function(error) {
                  res.status(400).send("error found in backend");
              });
        }
        else {
            res.status(400).send("eventid undefined");
        }

    }
    else if (type.localeCompare("eventinfo") == 0) {
        var eventid = req.query.eventid;
        if (typeof eventid != "undefined") {
            db.one('SELECT * FROM appData.getEventInfo($1);' [eventid])
              .then(function(data) {
                  if (data.eventid != null) {
                      res.send(data);
                  }
                  else {
                      res.send("no event with such eventid found");
                  }
              })
              .catch(function(error) {
                  res.status(400).send("error found in backend");
              });
        }
        else {
            res.status(400).send("eventid undefined");
        }
    }
    // no type on url
    else {
        res.status(400).send("please specify type of events-retrieving procedure");
    }
}

exports.addEvent = function(req, res, next) {
    var post = req.body;
    console.log('POST: ', post);
    var title = post.title;
    //var picture = post.picture;
    var description = post.description;
    var isCertified = post.isCertified;
    var location = post.location;
    var starttime = post.starttime;
    var genre = post.genre;
    var max_participants = parseInt(post.max_participants);
    var min_participants = parseInt(post.min_participants);
    //Person logged in will be the host
    var host = req.session.username;
    var eventid = post.eventid;
    var rating = parseInt(post.rating);

    db.one('SELECT * FROM appData.createEvent($1, $2, NULL, $3, $4, $5, $6, $7, $8, $9, $10, $11);', 
      [eventid, title, description, isCertified, location, host, starttime, genre, rating, max_participants, min_participants])
    .then(function (data) {
        console.log('ADD EVENT RESULT:', JSON.stringify(data));
        res.status(200).send({redirect: "/eventpage/"+host+"/"+eventid});
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
}; 

// get all the events, past and future
exports.getEventsOfUser = function(req, res, next) {
  //TODO
  var user = req.params.id;
  db.any('SELECT * FROM appData.getEventsAll($1)', [user])
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (error) {
      res.status(400).send(error);
    });
}

exports.deleteEvent = function(req, res, next) {
  //TODO
  var deleventid = req.params.id;
  db.one('SELECT * FROM appData.deleteEvent($1);', [deleventid])
    .then(function(data) {
      res.status(200).send("successfully deleted");
    })
    .catch(function(error) {
      res.status(400).send("error");
    });
}

exports.addReview = function(req, res, next) {
    var username = req.session.username;
    var reviewText = req.body.reviewText;
    var eventid = req.body.eventid;
    var rating = req.body.rating;
    db.one('SELECT * FROM appData.addReview($1, $2, $3, $4);', [username, eventid, reviewText, rating])
      .then(function(data) {
          res.status(200).send("added review successfully")
      })
      .catch(function(error) {
          res.status(400).send("error");
      });
}