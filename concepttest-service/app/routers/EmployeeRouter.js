var express    = require('express');
var router     = express.Router();
var passport   = require('passport');
var config	   = require('./../../config/database');
var jwt        = require('jwt-simple');
var User       = require('./../models/User');
var Employee   = require('./../models/Employee');
var mongoose   = require('mongoose');

/*
	Retrieves all employees
*/
router.get('/', function(request, response)
{
	Employee.find(function(error, employees)
	{
		if(error) { response.send(error); }

		response.status(200).json(employees);
	});
});

/*
	Retrieves all assignable employees
*/
router.get('/state/available', function(request, response)
{
	Employee.find(
	{
		isAssigned: false
	}, function(error, employees)
	{
		if(error) { response.send(error); }

		response.status(200).json(employees);		
	})
});

/*
	Retrieves the employee identified by the requested id.
*/
router.get('/:employeeId', function(request, response)
{
	Employee.findById(request.params.employeeId, function(error, employee)
	{
		if(error) { response.send(error); }
		response.status(200).json(employee);
	});
});


/*
	Creates a new employee
*/
router.post('/', function(request, response)
{
	var employee = new Employee();
	employee.name = request.body.name;
	employee.paternalLastName = request.body.paternalLastName;
	employee.maternalLastName = request.body.maternalLastName;
	employee.birthdate = request.body.birthdate;
	employee.phoneNumber = request.body.phoneNumber;
	employee.cellphoneNumber = request.body.cellphoneNumber;
	employee.email = request.body.email;
	employee.gender = request.body.gender;
	employee.documentNumber = request.body.documentNumber;
	employee.documentType = request.body.documentType;
	employee.isAssigned = false;
	employee.skills = [];

	for(var i in request.body.skills)
	{
		var skill = request.body.skills[i];
		employee.skills.push(answer);
	}

	employee.save(function(error)
	{
        if(error) { response.send(error); }
        response.status(200).json({ message: 'Employee created successfully.' });
	});
});

/*
	Updates an employee
*/
router.put('/:employeeId', function(request, response)
{
	Employee.findById(request.params.employeeId, function(error, employee)
	{
		if(error) { response.send(error); }

		employee.name = request.body.name;
		employee.paternalLastName = request.body.paternalLastName;
		employee.maternalLastName = request.body.maternalLastName;
		employee.birthdate = request.body.birthdate;
		employee.phoneNumber = request.body.phoneNumber;
		employee.cellphoneNumber = request.body.cellphoneNumber;
		employee.email = request.body.email;
		employee.gender = request.body.gender;
		employee.documentNumber = request.body.documentNumber;
		employee.documentType = request.body.documentType;
		employee.isAssigned = false;
		employee.skills = [];

		for(var i in request.body.skills)
		{
			var skill = request.body.skills[i];
			employee.skills.push(answer);
		}

		employee.save(function(error)
		{
	        if(error) { response.send(error); }
	        response.status(200).json({ message: 'Employee updated successfully.' });
		});
	});
});

/*
	Updates the assigned state of the employee
*/
router.put('/setavailable/:employeeId/:isAssigned', function(request, response)
{
	Employee.findById(request.params.employeeId, function(error, employee)
	{
		if(error) { response.send(error); }

		employee.isAssigned = request.params.isAssigned;
		employee.save(function(error)
		{
			if(error) { response.send(error); }
			response.status(200).json({ message: 'Employee availability updated.' });
		});
	});
});

/*
	Deletes a employee
*/
router.delete('/:employeeId', function(request, response)
{
	Employee.remove({
		_id: request.params.employeeId
	}, function(error, employee)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Employee deleted successfully.' });
	});
});

module.exports = router;