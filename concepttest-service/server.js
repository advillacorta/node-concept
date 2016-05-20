// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var config	   = require('./config/database');
var mongoose   = require('mongoose');
var passport   = require('passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.database);

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

// Passport
app.use(passport.initialize());

// pass passport for configuration
require('./config/passport')(passport);

// Routes for our service
var router = express.Router(); 

// Default route
router.get('/', function(req, res) {
	res.json({ message: 'REST Service working!' });
});

router.use('/user', require('./app/routers/UserRouter'));
router.use('/position', require('./app/routers/PositionRouter'));
router.use('/skillLevel', require('./app/routers/SkillLevelRouter'));
router.use('/skillType', require('./app/routers/SkillTypeRouter'));
router.use('/skill', require('./app/routers/SkillRouter'));
router.use('/question', require('./app/routers/QuestionRouter'));
router.use('/test', require('./app/routers/TestRouter'));
router.use('/customer', require('./app/routers/CustomerRouter'));
router.use('/project', require('./app/routers/ProjectRouter'));
router.use('/assignment', require('./app/routers/AssignmentRouter'));

// Register our routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('REST service listening on port ' + port);