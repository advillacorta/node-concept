var express    = require('express');
var router     = express.Router();
var passport   = require('passport');
var config	   = require('./../../config/database');
var jwt        = require('jwt-simple');
var User       = require('./../models/User');
var TestType   = require('./../models/TestType');
var Test       = require('./../models/Test');
var mongoose = require('mongoose');

/*
	Retrieves all tests
*/
router.get('/', function(request, response)
{
	Test.find(function(error, tests)
	{
		if(error) { response.send(error); }

		response.status(200).json(tests);
	});
});

router.get('/types/all', function(request, response)
{
	TestType.find(function(error, testTypes)
	{
		if(error) { response.send(error); }

		response.status(200).json(testTypes);
	});
});

/*
	Retrieves the test identified by the requested id.
*/
router.get('/:testId', function(request, response)
{
	Test.findById(request.params.testId, function(error, test)
	{
		if(error) { response.send(error); }
		response.status(200).json(test);
	});
});

/*
	Retrieves active tests only
*/
router.get('/state/:state', function(request, response)
{
	var state;
	if(request.params.state == 'active') { state = true; } else { state = false; }
	
	Test.find(
	{
		isActive: state
	}, function(error, tests)
	{
		if(error) { response.send(error); }

		response.status(200).json(tests);
	});
});

/*
	Creates a new test
*/
router.post('/', function(request, response)
{
	var test = new Test();
	test.name = request.body.name;
	test.isActive = request.body.isActive;

	for(var i in request.body.questions)
	{
		var question = request.body.questions[i];
		test.questions.push(question);
	}

	test.save(function(error)
	{
        if(error) { response.send(error); }
        response.status(200).json({ message: 'Test created successfully.' });
	});
});

/*
	Updates a test
*/
router.put('/:testId', function(request, response)
{
	Test.findById(request.params.testId, function(error, test)
	{
		if(error) { response.send(error); }

		test.name = request.body.name;
		test.isActive = request.body.isActive;
		test.questions = [];

		for(var i in request.body.questions)
		{
			var question = request.body.questions[i];
			test.questions.push(question);
		}

		test.save(function(error)
		{
	        if(error) { response.send(error); }
	        response.status(200).json({ message: 'Test updated successfully.' });
		});
	});
});

/*
	Deletes a test
*/
router.delete('/:testId', function(request, response)
{
	Test.remove({
		_id: request.params.testId
	}, function(error, question)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Test deleted successfully.' });
	});
});

module.exports = router;