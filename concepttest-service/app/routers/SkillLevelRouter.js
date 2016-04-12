var express    = require('express');
var router     = express.Router();
var SkillLevel = require('./../models/SkillLevel');

/*

*/
router.get('/', function(request, response)
{
	SkillLevel.find(function(error, skillLevels)
	{
		if(error) { response.send(error); }
		response.status(200).json(skillLevels);
	});
});

/* 

*/
router.get('/:skillLevelId', function(request, response)
{
	var id = request.params.skillLevelId;
	SkillLevel.findById(id, function(error, skillLevel)
	{
		if(error) { response.send(error); }
		response.status(200).json(skillLevel);
	});
});

/*

*/
router.post('/', function(request, response)
{
	var skillLevel = new SkillLevel();
	skillLevel.name = request.body.name;
	skillLevel.description = request.body.description;
	skillLevel.min = request.body.min;
	skillLevel.max = request.body.max;
	skillLevel.skill = request.body.skill;

	skillLevel.save(function(error)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Skill level created successfully.' });
	});
});

/*

*/
router.put('/:skillLevelId', function(request, response)
{
	SkillLevel.findById(request.params.skillLevelId, function(error, skillLevel)
	{
		skillLevel.name = request.body.name;
		skillLevel.description = request.body.description;
		skillLevel.min = request.body.min;
		skillLevel.max = request.body.max;
		skillLevel.skill = request.body.skill;

		skillLevel.save(function(error)
		{
			if(error) { response.send(error); }
			response.status(200).json({ message: 'Skill level updated successfully.' });
		})
	});
});

/*

*/
router.delete('/:skillLevelId', function(request, response)
{
	SkillLevel.remove({
		_id: request.params.skillLevelId
	},
	function(error, skillLevel)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Skill level deleted successfully.' });
	});
});

module.exports = router;