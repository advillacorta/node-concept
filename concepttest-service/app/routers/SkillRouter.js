var express    = require('express');
var router     = express.Router();
var Skill      = require('./../models/Skill');

/*

*/
router.get('/', function(request, response)
{
	Skill.find(function(error, skills)
	{
		if(error) { response.send(error); }
		response.status(200).json(skills);
	});
});

/*

*/
router.get('/:skillId', function(request, response)
{
	var id = request.params.skillId;
	Skill.findById(id, function(error, skill)
	{
		if(error) { response.send(error); }
		response.status(200).json(skill);
	});
});

/*

*/
router.post('/', function(request, response)
{
	var skill = new Skill();
	skill.name = request.body.name;
	skill.description = request.body.description;
	skill.type = request.body.type;

	skill.save(function(error)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Skill created successfully.' });
	});
});

/*

*/
router.put('/:skillId', function(request, response)
{
	Skill.findById(request.params.skillId, function(error, skill)
	{
		if(error) { response.send(error); }

		skill.name = request.body.name;
		skill.description = request.body.description;
		skill.type = request.body.type;

		skill.save(function(err)
		{
			if(error) { response.send(error); }
			response.status(200).json({ message: 'Skill updated successfully.' });
		});
	});
});

/*

*/
router.delete('/:skillId', function(request, response)
{
	Skill.remove({
		_id: request.params.skillId
	},
	function(error, skill)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Skill deleted successfully.' });
	});
});

module.exports = router;