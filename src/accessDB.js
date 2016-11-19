var pgp = require('pg-promise')(/*options*/)
pgp.pg.defaults.ssl = true;
var db = pgp('postgres://vsxebhuzjkklry:-zfG7Ek8uDVo1Rh7VEcyYSy0AR@ec2-23-23-224-174.compute-1.amazonaws.com:5432/d6utk5i40rffqd');

module.exports = {
  getUser: getUser
};


function getUser(req, res, next) {

  // we can only use req.params or req.query
  // let's use req.query for now
  // source: http://expressjs.com/en/api.html
	// var username = req.params.query.username;
	// var password = req.params.query.password;
  var username = req.query.username;
  console.log(username);
  var password = req.query.password;
<<<<<<< HEAD
  db.one('SELECT * FROM getUser(' + username + ', ' + password + ')')
=======
	db.one('SELECT * FROM getUser($1, $2);', [username, password])
>>>>>>> bd11052906221cfc67294e45616cb84ce9302eee
  .then(function (data) {
    console.log('DATA:', data)
    res.status(200)
    .json({
          status: 'success',
          data: data,
          message: 'Retrieved user.'
    });
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.status(400).json({
      status: 'failure',
      message: 'could not retrive user'
    })
  });
}; 

function postUser(req, res, next) {
	var username = req.params.query.username;
	var password = req.params.query.password;
	db.one('SELECT * FROM postUser(' + username + ', ' + password + ')')
  .then(function (data) {
    console.log('DATA:', data)
    res.status(200)
    .json({
          status: 'success',
          data: data,
          message: 'Inserted user.'
    });
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  });
}; 
