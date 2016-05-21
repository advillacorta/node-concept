var express    = require('express');
var router     = express.Router();
var passport   = require('passport');
var config	   = require('./../../config/database');
var jwt        = require('jwt-simple');
var User       = require('./../models/User');
var Customer       = require('./../models/Customer');
var mongoose = require('mongoose');

/*
	Retrieves all customers
*/
router.get('/', function(request, response)
{
	Customer.find(
	{
		isActive: true
	}, function(error, customers)
	{
		if(error) { response.send(error); }

		response.status(200).json(customers);
	});
});

/*
	Retrieves the customer identified by the requested id.
*/
router.get('/:customerId', function(request, response)
{
	Customer.findById(request.params.customerId, function(error, customer)
	{
		if(error) { response.send(error); }
		response.status(200).json(customer);
	});
});


/*
	Creates a new customer
*/
router.post('/', function(request, response)
{
	var customer = new Customer();
	customer.name = request.body.name;
	customer.address = request.body.address;
	customer.phoneNumber = request.body.phoneNumber;
	customer.isActive = request.body.isActive;

	customer.save(function(error)
	{
        if(error) { response.send(error); }
        response.status(200).json({ message: 'Customer created successfully.' });
	});
});

/*
	Updates a customer
*/
router.put('/:customerId', function(request, response)
{
	Customer.findById(request.params.customerId, function(error, customer)
	{
		if(error) { response.send(error); }

		customer.name = request.body.name;
		customer.address = request.body.address;
		customer.phoneNumber = request.body.phoneNumber;
		customer.isActive = request.body.isActive;

		customer.save(function(error)
		{
	        if(error) { response.send(error); }
	        response.status(200).json({ message: 'Customer updated successfully.' });
		});
	});
});

/*
	Deletes a customer
*/
router.delete('/:customerId', function(request, response)
{
	Customer.remove({
		_id: request.params.customerId
	}, function(error, customer)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Customer deleted successfully.' });
	});
});

module.exports = router;