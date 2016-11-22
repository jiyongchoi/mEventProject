var pgp = require('pg-promise')(/*options*/)
pgp.pg.defaults.ssl = true;
var db = pgp('postgres://vsxebhuzjkklry:-zfG7Ek8uDVo1Rh7VEcyYSy0AR@ec2-23-23-224-174.compute-1.amazonaws.com:5432/d6utk5i40rffqd');

// module.exports = {
//   getUser: getUser
// };


exports.getUser = function(req, res, next) {

  // we can only use req.params or req.query
  // let's use req.query for now
  // source: http://expressjs.com/en/api.html
	// var username = req.params.query.username;
	// var password = req.params.query.password;
  var username = req.query.username;
  console.log(username);
  var password = req.query.password;
	db.one('SELECT * FROM getUser($1, $2);', [username, password])
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
      res.status(200).send('Bad username/password');
    }
    // console.log('DATA:', data)
    // res.status(200)
    // .json({
    //       status: 'success',
    //       data: data,
    //       message: 'Retrieved user.'
    // });
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
    console.log(post);
    var username = post.username;
    var password = post.password;
    var fname = post.fname;
    var surname = post.surname;
    console.log(fname);
    // var username = req.params.query.username;
    // var password = req.params.query.password;
    db.one('SELECT * FROM postUser($1, $2, $3, $4);', [username, password, fname, surname])
    .then(function (data) {
      // console.log('DATA:', data)
      // res.status(200)
      // .json({
      //       status: 'success',
      //       data: data,
      //       message: 'Inserted user.'
      // });
        console.log('DATA:', data);
        req.session.username = username;
        res.status(200).send({redirect: "/mainpage/"+username});
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    });
}; 
