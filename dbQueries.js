var pgp = require('pg-promise')(/*options*/)
pgp.pg.defaults.ssl = true;
var db = pgp('postgres://vsxebhuzjkklry:-zfG7Ek8uDVo1Rh7VEcyYSy0AR@ec2-23-23-224-174.compute-1.amazonaws.com:5432/d6utk5i40rffqd');

module.exports = {
  getUser: getUser
};

function getUser(req, res, next) {
	db.one('SELECT * FROM appData.UserInfo')
  .then(function (data) {
    console.log('DATA:', data)
    res.status(200)
    .json({
          status: 'success',
          data: data,
          message: 'Retrieved user'
    });
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  });
}; 