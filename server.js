var express = require('express');
var dbQueries = require('./dbQueries');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/'));

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({     
    extended: true
}));

app.get('/', function(req, res) {
	res.sendfile('public/index.html');
});

app.get('/user', dbQueries.getUser);
//app.post('/user', routes.postUser);
//app.delete('/user', routes.deleteUser);

app.listen(3000);
console.log('Listening on port 3000...');