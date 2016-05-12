var express    = require('express');
var router     = express.Router();
var passport   = require('passport');
var config	   = require('./../../config/database');
var jwt        = require('jwt-simple');
var User       = require('./../models/User');
var Question      = require('./../models/Question');

/*
	Retrieves all questions
*/
router.get('/', function(request, response)
{
	Question.find(function(error, questions)
	{
		if(error) { response.send(error); }
		response.status(200).json(questions);
	});
});

/*
	Retrieves the question identified by the requested id.
*/
router.get('/:questionId', function(request, response)
{
	Question.findById(request.params.questionId, function(error, question)
	{
		if(error) { response.send(error); }
		response.status(200).json(question);
	});
});

/*
	Retrieves all questions that matches to the requested skillType
*/
router.get('/skillType/:skillTypeId', function(request, response)
{
	Question.find({
		skillType: request.params.skillTypeId
	}, function(error, questions)
	{
		if(error) { response.send(error); }
		response.status(200).json(questions);
	});
});

/*
	Retrieves all questions that matches to the requested skill
*/
router.get('/skill/:skillId', function(request, response)
{
	Question.find({
		skill: request.params.skillId
	}, function(error, questions)
	{
		if(error) { response.send(error); }
		response.status(200).json(questions);
	});
});

/*
	Creates a question in the database
*/
router.post('/', function(request, response)
{
	var question = new Question();
	question.skillType = request.body.skillType;
	question.skill = request.body.skill;
	question.description = request.body.description;
	question.isMultipleChoice = request.body.isMultipleChoice;
	question.answers = [];

	for(var i in request.body.answers)
	{
		var answer = request.body.answers[i];
		question.answers.push(answer);
	}

	question.save(function(error)
	{
        if(error) { response.send(error); }
        response.status(200).json({ message: 'Question created successfully.' });
	});
});

/*
	Updates a question in the database
*/
router.put('/:questionId', function(request, response)
{
	Question.findById(request.params.questionId, function(error, question)
	{
		if(error) { response.send(error); }

		question.skillType = request.body.skillType;
		question.skill = request.body.skill;
		question.description = request.body.description;
		question.isMultipleChoice = request.body.isMultipleChoice;
		question.answers = [];

		for(var i in request.body.answers)
		{
			var answer = request.body.answers[i];
			question.answers.push(answer);
		}

		question.save(function(error)
		{
	        if(error) { response.send(error); }
	        response.status(200).json({ message: 'Question updated successfully.' });
		});
	});
});

/*
	Deletes a question from the database
*/
router.delete('/:questionId', function(request, response)
{
	Question.remove({
		_id: request.params.questionId
	}, function(error, question)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Question deleted successfully.' });
	});
});

module.exports = router;