var express    = require('express');
var router     = express.Router();
var passport   = require('passport');
var config	   = require('./../../config/database');
var jwt        = require('jwt-simple');
var User       = require('./../models/User');
var Assignment = require('./../models/Assignment');
var mongoose   = require('mongoose');

/*
	Retrieves all assignments
*/
router.get('/', function(request, response)
{
	Assignment.find(function(error, assignments)
	{
		if(error) { response.send(error); }

		response.status(200).json(assignments);
	});
});

/*
	Retrieves the assignment identified by the requested id.
*/
router.get('/:assignmentId', function(request, response)
{
	Assignment.findById(request.params.assignmentId, function(error, assignment)
	{
		if(error) { response.send(error); }
		response.status(200).json(assignment);
	});
});


/*
	Creates a new assignment
*/
router.post('/', function(request, response)
{
	var assignment = new Assignment();
	assignment.description = request.body.description;
	assignment.customer = request.body.customer;
	assignment.requirement = request.body.requirement;
	assignment.employees = [];

	for(var i in request.body.employees)
	{
		var employee = request.body.employees[i];
		assignment.employees.push(answer);
	}

	assignment.save(function(error)
	{
        if(error) { response.send(error); }
        response.status(200).json({ message: 'Assignment created successfully.' });
	});
});

/*
	Updates a assignment
*/
router.put('/:assignmentId', function(request, response)
{
	Assignment.findById(request.params.assignmentId, function(error, assignment)
	{
		if(error) { response.send(error); }

		assignment.description = request.body.description;
		assignment.customer = request.body.customer;
		assignment.requirement = request.body.requirement;
		assignment.employees = [];

		for(var i in request.body.employees)
		{
			var employee = request.body.employees[i];
			assignment.employees.push(answer);
		}

		assignment.save(function(error)
		{
	        if(error) { response.send(error); }
	        response.status(200).json({ message: 'Assignment updated successfully.' });
		});
	});
});

/*
	Deletes a assignment
*/
router.delete('/:assignmentId', function(request, response)
{
	Assignment.remove({
		_id: request.params.assignmentId
	}, function(error, customer)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Assignment deleted successfully.' });
	});
});

module.exports = router;