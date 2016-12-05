var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();

chai.use(chaiHttp);


describe('Tests', function() {
  it('should get userinfo on /userinfo POST', function(done) {
  		chai.request(server);
  			.post('/userinfo')
  			.send({username: 'test', password: 'test'})
  			.end(function(err, res){
		      res.should.have.status(200);
		      res.body.redirect.should.equal('/mainpage/test');
      			done();
    		});
  	});
});