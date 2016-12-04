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

/*
* Logs in the user by checking if username and password together exist, and
* if so, declare username to be the req.session. Also provides redirect link
* to mainpage once user is authenticated
* Used in Login.js
*/
exports.verifyUser = function(req, res, next) {
  var post = req.body;
  var username = post.username
  var password = post.password;
  db.one('SELECT * FROM appData.getUser($1, $2);', [username, password])
  .then(function (data) {
    if (data.username != null) {
      req.session.username = data.username;
      req.session.accountType = data.accountType;
      res.status(200).send({redirect: "/mainpage/" + data.username});
    }
    else {
      res.status(200).send("bad username/password");
    }
  })
  .catch(function (error) {
    res.status(400).json({
      status: 'failure',
      message: 'could not retrive user'
    })
  });
};

/*
* Gets information of user with username.
* Used in UserInfo.js
*/
exports.getUserInfo = function(req, res, next) {
  var username = req.body.username;
  db.one('SELECT * FROM appData.getUserInfo($1);', [username])
  .then(function (data) {
    if (data.username != null) {
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

/*
* Adds a new user, with default status as client
* Used in Signup.js
*/
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

/*
* Amends the information of a user with custom fields
* Used in EditUser.js
*/
exports.editUser = function(req, res, next) {
    var post = req.body;
    var username = post.username;
    var password = post.password;
    var fname = post.fname;
    var surname = post.surname;
    var accountType = post.accountType;

    db.one('SELECT * FROM appData.editUser($1, $2, $3, $4, $5);', 
            [username, password, fname, surname, accountType])
    .then(function (data) {
        res.status(200).send(data);
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
};

/*
* Deletes a user by username
* Used in DeleteUser.js
*/
exports.deleteUser = function(req, res, next) {
    var username = req.query.username;
    db.one('SELECT * FROM appData.deleteUser($1);', [username])
    .then(function (data) {
        res.status(200).send(data);
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
}; 

/*
* FUNCTIONS FOR EVENTS
*/

/*
* Retrives all events, past and future
* Used in EventManager.js
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

/*
* Retrieves events by certain condition, denoted by req.query.type
*/
exports.getEvents = function (req, res, next) {
    var type = req.query.type;
    // for all future events
    if (type.localeCompare("all") == 0) {
        db.any('SELECT * FROM appData.getEvents();')
        .then(function (data) {
           res.status(200).send(data);
        })
        .catch(function(error) {
           res.status(400).send(data);
        })
    }
    // for all future events, based on genre
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
    // finds the maximum eventid
    else if (type.localeCompare("max") == 0) {
        db.one('SELECT coalesce(getmaxeventid, 0) AS getmaxeventid FROM appData.getMaxEventID();')
          .then(function (data) {
             res.status(200).send(data);
          })
          .catch(function(error) {
             console.log("ERROR: "+error);
             res.status(400).send(data);
          });
    }
    // finds all events hosted by username
    else if(type.localeCompare("hosted") == 0) {
        var username = req.query.username;
        if (typeof username != "undefined") {
            db.any('SELECT * FROM appData.getEventsByHost($1);', [username])
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
    // retrive information about a particular event
    else if (type.localeCompare("eventinfo") == 0) {
        var eventid = parseInt(req.query.eventid);
        if (typeof eventid != "undefined") {
            db.one('SELECT * FROM appData.getEventInfo($1);', [eventid])
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

/*
* Add an event
* Used in AddEventPage.js
*/
exports.addEvent = function(req, res, next) {
    var post = req.body;
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
      [eventid, title, description, isCertified, location, host, starttime, genre, rating, min_participants, max_participants])
    .then(function (data) {
        res.status(200).send({redirect: "/eventpage/"+eventid});
    })
    .catch(function (error) {
      res.status(400).send(error);
      console.log('ERROR:', error)
    });
}; 

/*
* Retrieve all events of a user, past and future
* Used in UserEventManager.js
*/
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

/*
* Amends the information of a user with custom fields
* Used in EditUser.js
*/
exports.editEvent = function(req, res, next) {
    var post = req.body;
    var eventID = post.eventID;
    var title = post.title;
    var description = post.description;
    var isCertified = post.isCertified;
    var location = post.location;
    var starttime = post.starttime;
    var genre = post.genre;
    var maxPart = post.maxPart;
    var minPart = post.minPart;
    var host = post.host;
    console.log(post);

    db.one('SELECT * FROM appData.editEvent($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);', 
            [eventID, title, description, isCertified, location, host, starttime, genre, minPart, maxPart])
    .then(function (data) {
        res.status(200).send(data);
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
};

/*
* Delete an event
* Used in EditEvent.js
*/
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

/*
* Add review for a past event by a user who is on the attendee list
* Used in WriteReview.js
*/
exports.addReview = function(req, res, next) {
    var username = req.session.username;
    var reviewText = req.body.reviewText;
    var eventid = req.body.eventid;
    var rating = req.body.rating;
    if (verifyAttendance(username, eventid)) {
        db.one('SELECT * FROM appData.addReview($1, $2, $3, $4);', [username, eventid, reviewText, rating])
            .then(function(data) {
                return  res.status(200).send("added review successfully");
            })
            .catch(function(error) {
                return res.status(200).send("You " + username+ " have are already added review");
            });
    }
    else {
      return res.status(200).send("You are not on the attendee list or event has not happened yet");
    }
    
}

/*
* Return true if the username user is in the attendance list of eventid event
* and the event's starttime is in the past
*/
function verifyAttendance(username, eventid) {
    db.one('SELECT coalesce(eventid, 0) AS eventid FROM appData.verifyAttendance($1, $2);', [username, eventid])
        .then(function(data) {
              if (data.eventid != 0) {
                  return true;
                }
              else {
                  return false;
              }
          });
}

exports.getReview = function(req, res, next) {
    var eventid = parseInt(req.query.eventid);
    db.any('SELECT * FROM appData.review WHERE eventid=$1;', [eventid])
      .then(function(data) {
          res.status(200).send(data);
      });
}

/*
* Sign the current logged in user for an event that has not started yet,
* providing there is still space left
* Used by EventSignUp.js
*/
exports.signupEvent = function(req, res, next) {
    var username = req.session.username;
    var eventid = req.body.eventid;
    var eventmaxcapacity = find_max(eventid);
    var enrolment = enrolmentnum(eventid)
    if (eventmaxcapacity == 0 || eventmaxcapacity > enrolment) {
      db.one('SELECT * FROM appData.signupEventUser($1, $2);', [eventid, username])
          .then(function(data) {
                return res.status(200).send("You " + username+ " have been successfully added");
          })
          .catch(function(error) {
              res.status(200).send("You " + username+ " have are already been added");
          });      
    }
    else {
      return res.status(200).send("The event is at capacity");
    }
}

/*
* Return the maximum capacity of eventid event
*/
function find_max(eventid) {
  var max = 0;
  db.one('SELECT coalesce(max_participants, 0) AS max_participants FROM appData.event WHERE eventid=$1;', [eventid])
        .then(function(data){
            if (typeof data.max_participants == null) {
                max = 0;
            }
            else {
                max = data.max_participants;
            }
        })
        .catch(function(error) {
            return 0;
        });
    return max;
}

/*
* Return the enrolment number of eventid event
*/
function enrolmentnum(eventid) {
  var enrol = 0;
    db.one('SELECT coalesce(eventid, 0) as eventid, coalesce(enrolmentnum, 0) as enrolmentnum FROM appData.findCurrentEnrolNum($1);', 
          [eventid])
        .then(function(data) {
            enrol = parseInt(data.enrolmentnum);
        })
        .catch(function(error) {
            enrol = 0;
        });
    return enrol;
};
/*
* Perform a variety of tasks associated with the EventAttendees table in the backend
*/
exports.getSignedUp = function(req, res, next) {
    var eventid = parseInt(req.query.eventid);
    var username = req.session.username;
    var type = req.query.type;
    var eventmaxcapacity = 0;
    // retrieves list of attendees for an event
    if (type.localeCompare("attendlist") == 0) {
        db.any('SELECT username FROM appData.EventAttendees WHERE eventid=$1;', [eventid])
          .then(function(data) {
              return res.status(200).send(data);
          })
          .catch(function(error) {
              console.log(error);
              
              // return res.status(400).send("error in db");
          });
    }
}

exports.clearDatabase  = function(req, res, next) {
  db.one('SELECT * FROM appData.clearDatabase();')
      .then(function(data) {
          res.status(200).send("Cleared.")
      })
      .catch(function(error) {
          res.status(400).send("error");
      });
  }