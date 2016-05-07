// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://' + process.env.IP + '/concept');

// Set listening port
var port = 8082;

//CORS middleware
var allowCrossDomain = 
function(req, res, next) 
{
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
}

app.use(allowCrossDomain);

// Routes for our service
var router = express.Router(); 

// Default route
router.get('/', function(req, res) {
	res.json({ message: 'REST Service working!' });
});

router.use('/skillLevel', require('./app/routers/SkillLevelRouter'));
router.use('/skillType', require('./app/routers/SkillTypeRouter'));
router.use('/skill', require('./app/routers/SkillRouter'));

// Register our routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('REST service listening on port ' + port);