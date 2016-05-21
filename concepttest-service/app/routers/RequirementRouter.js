var express    = require('express');
var router     = express.Router();
var passport   = require('passport');
var config	   = require('./../../config/database');
var jwt        = require('jwt-simple');
var User       = require('./../models/User');
var Requirement       = require('./../models/Requirement');
var mongoose = require('mongoose');

/*
	Retrieves all requirements
*/
router.get('/', function(request, response)
{
	Requirement.find(function(error, requirements)
	{
		if(error) { response.send(error); }

		response.status(200).json(requirements);
	});
});

/*
	Retrieves the requirement identified by the requested id.
*/
router.get('/:requirementId', function(request, response)
{
	Requirement.findById(request.params.requirementId, function(error, requirement)
	{
		if(error) { response.send(error); }
		response.status(200).json(requirement);
	});
});

/*
	Retrieves all requirements for a specific customer
*/
router.get('/customer/:customerId', function(request, response)
{
	Requirement.find({
		customer: request.params.customerId
	}, function(error, requirements)
	{
		if(error) { response.send(error); }
		response.status(200).json(requirements);
	});
});


/*
	Creates a new requirement
*/
router.post('/', function(request, response)
{
	var requirement = new Requirement();
	requirement.name = request.body.name;
	requirement.description = request.body.description;
	requirement.customer = request.body.customer;

	requirement.save(function(error)
	{
        if(error) { response.send(error); }
        response.status(200).json({ message: 'Requirement created successfully.' });
	});
});

/*
	Updates a requirement
*/
router.put('/:requirementId', function(request, response)
{
	Requirement.findById(request.params.requirementId, function(error, requirement)
	{
		if(error) { response.send(error); }

		requirement.name = request.body.name;
		requirement.description = request.body.description;
		requirement.customer = request.body.customer;

		requirement.save(function(error)
		{
	        if(error) { response.send(error); }
	        response.status(200).json({ message: 'Requirement updated successfully.' });
		});
	});
});

/*
	Deletes a requirement
*/
router.delete('/:requirementId', function(request, response)
{
	Requirement.remove({
		_id: request.params.requirementId
	}, function(error, requirement)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Requirement deleted successfully.' });
	});
});

module.exports = router;