var express    = require('express');
var router     = express.Router();
var SkillType  = require('./../models/SkillType');

/*

*/
router.get('/', function(request, response)
{
	SkillType.find(function(error, skillTypes)
	{
		if(error) { response.send(error);}
		response.status(200).json(skillTypes);
	});
});

/*

*/
router.get('/:skillTypeId', function(request, response)
{
	var id = request.params.skillTypeId;
	SkillType.findById(id, function(error, skillType)
	{
		if(error) { response.send(error);}
		response.status(200).json(skillType);
	});	
});

/*

*/
router.post('/', function(request, response)
{
	var skillType = new SkillType();
	skillType.name = request.body.name;
	skillType.description = request.body.description;

	skillType.save(function(error)
	{
		if(error) { response.send(error);}
		response.status(200).json({ message: 'Skill type created successfully.' });
	});
});

/*

*/
router.put('/:skillTypeId', function(request, response)
{
	SkillType.findById(request.params.skillTypeId, function(error, skillType)
	{
		if(error) { response.send(error); }

		skillType.name = request.body.name;
		skillType.description = request.body.description;

		skillType.save(function(error)
		{
			if(error) { response.send(error); }
			response.status(200).json({ message: 'Skill type updated successfully.' });
		});
	});
});

/*

*/
router.delete('/:skillTypeId', function(request, response)
{
	SkillType.remove({
		_id: request.params.skillTypeId
	},
	function(error, skillType)
	{
		if(error) { response.send(error); }
		response.status(200).json({ message: 'Skill type deleted successfully.' });
	});
});


module.exports = router;