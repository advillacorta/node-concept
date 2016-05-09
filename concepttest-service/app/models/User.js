// app/models/User.js

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	username: 
	{
        type: String,
        unique: true,
        required: true
    },
	password: 
	{
        type: String,
        required: true
    },
},
{
	collection: 'Users',
	timestamps: true
});

userSchema.pre('save', function(next)
{
	var user = this;

	if(this.isModified('password') || this.isNew)
	{
		bcrypt.genSalt(10, function(error, salt)
		{
			if(error) { return next(error); }

			bcrypt.hash(user.password, salt, null, function(error, hash)
			{
				if(error) { return next(error); }

				user.password = hash;
				next();
			});
		});
	}
});

userSchema.methods.comparePassword = function(password, cb)
{
	bcrypt.compare(password, this.password, function(error, isMatch)
	{
		if(error) { return cb(error); }
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);