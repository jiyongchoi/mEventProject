var pgp = require('pg-promise')(/*options*/)
pgp.pg.defaults.ssl = true;
var db = pgp('postgres://vsxebhuzjkklry:-zfG7Ek8uDVo1Rh7VEcyYSy0AR@ec2-23-23-224-174.compute-1.amazonaws.com:5432/d6utk5i40rffqd');

// module.exports = {
//   getUser: getUser
// };

/*
* User and password validation, POST function
*/
exports.verifyUser = function(req, res, next) {
  var post = req.body;
  var username = post.username
  var password = post.password;
  db.one('SELECT * FROM getUser($1, $2);', [username, password])
  .then(function (data) {
    if (data.username != null) {
      req.session.username = data.username;
      console.log(data);
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

exports.postUser = function(req, res, next) {
    var post = req.body;
    var username = post.username;
    var password = post.password;
//    var fname = post.fname;
//    var surname = post.surname;

    db.one('SELECT * FROM postUser($1, $2, NULL, NULL);', [username, password])
    .then(function (data) {
        console.log('DATA:', data);
        req.session.username = username;
        res.status(200).send({redirect: "/mainpage/"+username});
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
}; 

exports.getAllEvents = function(req, res, next) {
    db.one('SELECT * FROM getEvents();')
        .then(function (data) {
          return res.status(200).send(data);
        })
        .catch(function(error) {
          return res.status(200).send(data);
        })
}
