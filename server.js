var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/'));

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({     
    extended: true
}));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/user', routes.getUser);
app.post('/user', routes.postUser);
app.delete('/user', routes.deleteUser);

app.listen(3000);
console.log('Listening on port 3000...');