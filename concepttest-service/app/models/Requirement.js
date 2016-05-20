// app/models/Requirement.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RequirementSchema = new Schema({
	name: String,
	description: String,
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer'
	}
},
{
	collection: 'Requirements',
	timestamps: true
});

module.exports = mongoose.model('Requirement', RequirementSchema);