var express    = require('express');
var router     = express.Router();
var passport   = require('passport');
var config	   = require('./../../config/database');
var jwt        = require('jwt-simple');
var User       = require('./../models/User');
var Skill      = require('./../models/Skill');

/*

*/
router.get('/', passport.authenticate('jwt', { session: false }), function(request, response)
{
	var token = getToken(request.headers);
	if(token)
	{
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(error, user)
		{
			if(error) { throw error; }

			if(!user)
			{
				return res.status(403).send({ success: false, message: 'Authentication failed. User not found.' });
			}
			else
			{
				Skill.find(function(error, skills)
				{
					if(error) { response.send(error); }
					response.status(200).json(skills);
				});
			}
		});
	}
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

getToken = function(headers)
{
	if(headers && headers.authorization)
	{
		var parted = headers.authorization.split(' ');
		if(parted.length === 2)
		{
			return parted[1];
		}
		else
		{
			return null;
		}
	}
	else
	{
		return null;
	}
};

module.exports = router;