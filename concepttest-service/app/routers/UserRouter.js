var express    = require('express');
var router     = express.Router();
var User       = require('./../models/User');
var config	   = require('./../../config/database');
var jwt        = require('jwt-simple');

/*

*/
router.post('/signin', function(req, res)
{
	User.findOne({
		username: req.body.username
	}, 
	function(error, user)
	{
	   if(error) { throw error; }

	   if(!user)
	   {
	   	   res.send({success: false, message: 'Authentication failed. User not found.'});
	   }
	   else
	   {
	   	   user.comparePassword(req.body.password, 
	   	   function (error, isMatch) 
	   	   {
		        if(isMatch && !error) 
		        {
		          	// if user is found and password is right create a token
		          	var token = jwt.encode(user, config.secret);
		          	// return the information including token as JSON
		          	res.json({success: true, token: 'JWT ' + token});
		        } 
		        else 
		        {
		          	res.send({success: false, message: 'Authentication failed. Wrong password.'});
		        }
	   	   });
	   }
    }
  );
});

/*

*/
router.post('/signup', function(req, res)
{
	if(!req.body.username || !req.body.password)
	{
		res.json({ success: false, msg: 'Debe ingresar un nombre de usuario y password' });
	}
	else
	{
		var newUser = new User(
		{
			username: req.body.username,
			password: req.body.password
		});

		newUser.save(function(error)
		{
			if(error)
			{
				res.json({ success: false, message: "Ya existe un usuario." });
			}

			res.json({ success: true, message: "Usuario creado satisfactoriamente." });
		});
	}
});

module.exports = router;