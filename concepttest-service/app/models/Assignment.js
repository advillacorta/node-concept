// app/models/Assignment.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AssignmentSchema = new Schema({
	description: String,
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer'
	},
	requirement: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Requirement'
	},
	employees: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Employee'
	}]
},
{
	collection: 'Assignments',
	timestamps: true
});

module.exports = mongoose.model('Assignment', AssignmentSchema);